import {
    existsSync,
    watch,
    watchFile
} from "fs";
import * as fs from "fs/promises";
import * as c from 'child_process';
import * as path from "path";
import chalk from 'chalk';
import { TestUnitData, makeSpanInfo, makeUnitsFromTest, removeByteOrderMark, splitContentByNewlines } from "./s-maps.js";
import { Key, input, inputRegex, keyIs, menu, menuRender, readline, selection, yesNoPrompt } from "cli-utils-lib/read-line";
import { makeNoteService } from "cli-utils-lib/notes";

enum Target { Fixed = 1, Original = 1<<2, All = Fixed | Original}
type TestStatus = {
    testName: string;
    status: "RUNNING" | "SUCCESS" | "FAILED";
    output: string;
    error: string;
    wait: Promise<TestStatus>
    live: boolean;
    childProcess: c.ChildProcess;
}

type TestFile = {
    file: string;
    config?: string;
    errors: string[];
}

const { runDiff } = (function () {
    if (process.platform === 'win32') {
        return {
            runDiff(l: { path: string, name: string }, r: { path: string, name: string }) {
                if (existsSync(l.path) && existsSync(r.path)) {
                    c.exec(`"C:\\Program Files\\TortoiseGit\\bin\\TortoiseGitMerge.exe" /base:${l.path} /basename:${l.name} /mine:${r.path} /minename:${r.name}`)
                }
            }
        };
    }
    else {
        return {
            runDiff(l: { path: string, name: string }, r: { path: string, name: string }) {
                if (existsSync(l.path) && existsSync(r.path)) {
                    c.exec(`git diff --no-index ${l.path} ${r.path}`);
                }
            }
        };
    }
})();
function debounce<A extends any[], R>(delay: number, fn: (...args: A) => Promise<R>): (...args: A) => Promise<R> {
    let timeoutId: NodeJS.Timeout | null = null;

    return (...args: A): Promise<R> => {
        return new Promise<R>((resolve, reject) => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(() => {
                fn(...args)
                    .then(resolve)
                    .catch(reject);
            }, delay);
        });
    };
}
async function main() {
    const tscBaselineDir = "tests/baselines/local/";
    const originalDir = "tests/baselines/local/isolated-declarations/original/";
    const originalTscDir = "tests/baselines/local/isolated-declarations/original-tsc/";
    const fixedDir = "tests/baselines/local/isolated-declarations/auto-fixed/";
    const fixedTscDir = "tests/baselines/local/isolated-declarations/auto-fixed-tsc/";

    const notesService = makeNoteService<TestFile, Filter>({
        key: (test) =>  test?.file + (test?.config ?? ""),
        displayFilter: (filter: Filter) => {
            return filter.negate ? `!(${displayFilterWorker(filter)})`: displayFilterWorker(filter);
            function displayFilterWorker(filter: Filter) {
                switch (filter.type) {
                    case "test-errors": return `errors like ${filter.regex}`;
                    case "diff-output": return `has ${filter.value} baseline`;
                    case "diff-reason": return `diff for ${
                        filter.diffType === Target.Fixed ? "fixed":
                        filter.diffType === Target.Original ? "original":
                        "any"
                    } is ${filter.value}`
                }
            }
        },
        getFilter: (filter: Filter): (test: TestFile) => boolean => {
            switch (filter.type) {
                case "test-errors": {
                    const regex = new RegExp(filter.regex);
                    return (test) => test.errors.some(e => regex.test(e));
                }
                case "diff-reason": {
                    const value = filter.value;
                    if(filter.diffType & Target.All) {
                        return (test) => 
                            diffReasonRef.ref.originalReasonsByTest[test.file] === value ||
                            diffReasonRef.ref.fixReasonByTest[test.file] === value;
                    }
                    else if(filter.diffType & Target.Fixed) {
                        return (test) => 
                            diffReasonRef.ref.fixReasonByTest[test.file] === value;
                    }
                    else if(filter.diffType & Target.Original) {
                        return (test) => 
                            diffReasonRef.ref.originalReasonsByTest[test.file] === value;
                    } 
                    else {
                        throw new Error();
                    }
                }
                case "diff-output":{
                    const type = filter.value
                    return file => {
                        return makeTestFileBaseline(file.file, file.config)
                            .filter(o => o.name === type)
                            .some(f => existsSync(f.local));
                    }
                }
            }
        },
        getRecords: () => allTests,
        getVisibleRecords: () => filteredTests,
        notesFile: "./notes.json",
        getFilterOptions: () => [
            { customType: "diff-output", name: "Has Baseline Of type" },
            { customType: "diff-reason", name: "Diff reason" },
            { customType: "test-errors", name: "Test error" },
        ],
        makeFilter,
        async onFiltersUpdated(f) {
            
        },
        async onNotesChanged(notes) {
            
        },
    })
    async function makeFilter(type: Filter['type'], negate: boolean): Promise<Filter | undefined> {
        if (type === "diff-reason") {
            loadDiffReasons();
            const diffType = await menu({
                message: "Diff type",
                choices: [
                    { name: "All", colum: "allReasons" as const, flag: Target.All },
                    { name: "Fixed", colum: "fixedReasons" as const, flag: Target.Fixed },
                    { name: "Original", colum: "originalReasons" as const, flag: Target.Original },
                ]
            })

            if(diffType === null) return;
            const value = await menu({
                message: "Diff value:",
                choices: (await diffReasons)[diffType.colum].map(r => {
                    const count = notesService.getCount({ type: "diff-reason", value: r.value, diffType: diffType.flag, negate: false });
                    return {
                        name: `${r.value} (${count})`,
                        count,
                        value: r.value
                    }
                }).filter(m => m.count !== 0).sort((a, b) => b.count - a.count)
            })
            if(value === null) return;
            return { type: "diff-reason", diffType: diffType.flag, value: value.value, negate  };
        }
        else if(type === "diff-output") {
            const name = await menu({
                message: "Type",
                choices: makeTestFileBaseline("foo.ts", "(config)").map(v => ({
                    name: v.name
                }))
            })
            if(!name) return;
            return { type: "diff-output", value: name.name, negate };
        }
        else if (type === "test-errors") {
            const regex = await inputRegex();
            if (!regex) return;
            return { type: "test-errors", regex, negate };
        } 
        else {
            throw new Error();
        }
    }
    const reloadOnChange = debounce(500, async () => {
        console.log("Files changed reloading")
        await readTests();
        await reloadNotes();
        notesService.reloadNotes();
        readline.cancelRequest();
        applyFilters();
    });

    function applyFilters(filters = notesService.getNotes().filters) {
        filteredTests = notesService.applyFilters(allTests, filters)
    }
    await reloadNotes();
    
    async function reloadNotes() {
        if (existsSync('./notes.json')) {
            try {
                const notes = notesService.reloadNotes();
                let hasMissingTests = false;
                for (const testName of Object.keys(notes.records)) {
                    const testMatch = /(?<file>[^(]*)(?<config>\s*\([^)]*\))?/.exec(testName);
                    if (!allFilesMap.has(testName)) {
                        hasMissingTests = true;
                        notesService.setNoteValueByKey(testName, 'non-failed', "yes");
                        allFilesMap.set(testName, {
                            file: testMatch?.groups?.file!,
                            config: testMatch?.groups?.config!,
                            errors: []
                        });
                    }
                };
                if (hasMissingTests) {
                    updateTestsFromMap();
                    readline.cancelRequest();
                }
            } catch (e) {

            }
        }
    }
    const reloadNotesOnChanged = debounce(500, reloadNotes);
    watch(".", { recursive: false, persistent: false }, async (event, file) => {
        if (file === "manual.txt" || file === "log.txt") {
            await reloadOnChange()
        }
        if (file === "notes.json") {
            await reloadNotesOnChanged();
        }
    })
        
    let diffReasons = loadDiffReasons();
    let diffReasonRef: { ref: Awaited<typeof diffReasons> } = {
        ref: {fixedReasons: [], fixReasonByTest: {}, originalReasons: [], originalReasonsByTest: {}, allReasons: []}
    }
    async function loadDiffReasons() {
        const start = Date.now();
        const caseDir = `tests/cases`;
        const files = await fs.readdir(caseDir, { recursive: true, withFileTypes: true })
        const originalReasons: Record<string, number> = {}
        const allReasons: Record<string, number> = {}
        const fixedReasons: Record<string, number> = {}
        const fixReasonByTest: Record<string, string> = {}
        const originalReasonsByTest: Record<string, string> = {}
        for(let f of files) {
            if(f.isDirectory()) continue;
            const fullPath = path.join(f.path, f.name).replaceAll("\\", "/");
            const testFileContent = await fs.readFile(fullPath, { encoding: "utf8"});

            const fixed = testFileContent.match(/\/\/\s*@isolatedDeclarationFixedDiffReason:\s*(.*)(\r\n|\n)/);
            const fReason = fixed && fixed[1];
            if(fReason) {
                allReasons[fReason] = (allReasons[fReason] ?? 0)+ 1
                fixedReasons[fReason] = (fixedReasons[fReason] ?? 0)+ 1
                fixReasonByTest[fullPath] = fReason
            }
            const original =testFileContent.match(/\/\/\s*@isolatedDeclarationDiffReason:\s*(.*)(\r\n|\n)/);
            const oReason = original && original[1];
            if(oReason) {
                allReasons[oReason] = (allReasons[oReason] ?? 0)+ 1
                originalReasons[oReason] = (originalReasons[oReason] ?? 0)+ 1
                originalReasonsByTest[fullPath] = oReason
            }
        }

        const result = {
            originalReasonsByTest,
            fixReasonByTest,
            allReasons: Object.entries(allReasons).map(([value, frequency]) => ({ value, frequency })),
            fixedReasons: Object.entries(fixedReasons).map(([value, frequency]) => ({ value, frequency })),
            originalReasons: Object.entries(originalReasons).map(([value, frequency]) => ({ value, frequency })),
        }
        diffReasonRef.ref = result;
        // console.log(`Finished Loading reasons in ${(Date.now() - start)/1000}s`);
        applyFilters();
        return result;
    }
    let showMenu = false;
    let allTestStatus: Array<TestStatus> = []
    type Filter = { 
        negate: boolean;
    } & ({
        type: "test-errors",
        regex: string,
    } | {
        type: "diff-reason",
        diffType: Target,
        value: string,
    }| {
        type: "diff-output",
        value: string,
    });
    
    function runCommand(name: string, command: string, disableDebug = false, envOverride: Record<string, string> = {}) {
        const env = { ...process.env, ...envOverride };
        if (disableDebug) {
            delete env.VSCODE_INSPECTOR_OPTIONS;
            delete env.VSCODE_INJECTION;
        }
        const result = c.exec(command, {
            encoding: "utf-8",
            env: {
                ...env,
                MOCHA_COLORS: "true",
                COLUMNS: `${process.stdout.columns}`,
                RUN_NAME: name,
            }
        });
        result.stdout?.on("data", function (data) {
            if(!data) return;
            if (testStatus) {
                if (testStatus.live) {
                    process.stdout.write(data.toString());
                }
                testStatus.output += data.toString()
            }
        });
        result.stderr?.on("data", function (data) {
            if(!data) return;
            if (testStatus) {
                if (testStatus.live) {
                    process.stderr.write(data.toString());
                }
                testStatus.error += data.toString()
            }
        });

        result.on("error", (err) => {
            console.log(err);
        })
        const resultPromise = new Promise<TestStatus>((r) => {
            result.on("exit", (code) => {
                if (!testStatus) return;
                if (code !== 0) {
                    testStatus.status = "FAILED";
                } else {
                    testStatus.status = "SUCCESS";
                }
                r(testStatus);
                readline.cancelRequest();
            })
        });
        const testStatus: typeof allTestStatus[number] = {
            status: "RUNNING",
            wait: resultPromise,
            testName: name,
            output: `disableDebug = ${disableDebug} 
${command}
`,
            error: "",
            live: false,
            childProcess: result,
        }
        allTestStatus.push(testStatus);
        while (allTestStatus.length > 5 && allTestStatus[0].status !== "RUNNING") {
            allTestStatus.shift();
        }
        return resultPromise;
    }
    function makeFilesFromResult(content: string) {
        const fileNameRegex = `^//// \\[(.*)\\]$`;
        let currentFileName: string | undefined = undefined;
        let currentFileContent = "";
        const result: { sources: TestUnitData[], declarations: TestUnitData[], maps: TestUnitData[] } = {
            sources: [],
            declarations: [],
            maps: []
        }
        let resultFiles: TestUnitData[] = result.sources;
        for (const line of splitContentByNewlines(content)) {
            let match;

            if (line === "/// [Declarations Maps] ////"
                || line === "/// [Declarations] ////"
                || (match = line.match(new RegExp(fileNameRegex)))) {

                if (currentFileName) {
                    resultFiles.push({
                        content: currentFileContent,
                        name: currentFileName
                    })
                }
                currentFileContent = "";
                currentFileName = match?.[1];
                if (line === "/// [Declarations Maps] ////") {
                    resultFiles = result.maps;
                }
                if (line === "/// [Declarations] ////") {
                    resultFiles = result.declarations;
                }
            } else {
                if (currentFileContent !== "") {
                    // End-of-line
                    currentFileContent = currentFileContent + "\n";
                }
                currentFileContent = currentFileContent + line;
            }
        }
        if (currentFileName) {
            resultFiles.push({
                content: currentFileContent,
                name: currentFileName
            })
        }
        return result;
    }
    async function formatMaps(mapsFile: string, testFile: string) {
        const { declarations, maps, sources } = makeFilesFromResult(await fs.readFile(mapsFile, { encoding: "utf-8" }));
        const header = path.basename(testFile);
        let formattedResult = "//// [" + header + "] ////\r\n\r\n";
        for (const file of maps) {
            formattedResult += "//// [" + file.name + "]\r\n";
            formattedResult += await makeSpanInfo(sources, declarations, splitContentByNewlines(removeByteOrderMark(file.content))[0]);
        }
        return formattedResult;
    }
    function reference(s: string) {
        return s.replace("/local/", "/reference/");
    }
    function formatted(s: string) {
        return s + ".f";
    }
    type Command = {
        shortcut: string | null;
        name: string;
        params?: any[];
        run(key: Key, ...a: any[]): Promise<boolean | void>;
        hide?(): boolean;
        test?(key: Key): boolean;
    }

    function makeTestFileBaseline(testPath: string, config: string | undefined) {
        const ext = path.extname(testPath);
        const baseNameWithExt = path.basename(testPath);
        const baseName = baseNameWithExt.substring(0, baseNameWithExt.length - ext.length);
        const fixedTestFile = `tests/auto-fixed/${baseName}${config ?? ""}${ext}`;
        const testKey = testPath + (config ?? "");

        function makeFiles(baselineDir: string, fixAttributeName: string, category: string, diffType = "ts", dirs = {
            diff: "diff",
            base: "tsc",
            changed: "dte"
        }) {
            const ext = `.d.${diffType}`
            const diffFile = baselineDir + dirs.diff + "/" + baseName + (config ?? "") + ext + ".diff";
            const baseFile = baselineDir + dirs.base + "/" + baseName + (config ?? "") + ext;
            const changedFile = baselineDir + dirs.changed + "/" + baseName + (config ?? "") + ext;

            const refDiffFile = reference(diffFile);
            const refBaseFile = reference(baseFile);
            const refChangedFile = reference(changedFile);
            const typed = (s: string) => `${s}.${diffType}`
            let dtsDiff;
            let mapDiff;
            return [
                { name: typed(dirs.diff), category, local: diffFile, ref: refDiffFile, fixAttributeName },
                dtsDiff = { name: typed(dirs.base), category, local: baseFile, ref: refBaseFile, fixAttributeName },
                mapDiff = { name: formatted(typed(dirs.base)), category, local: formatted(baseFile), ref: formatted(refBaseFile), fixAttributeName },

                { name: typed(dirs.changed), category, local: changedFile, ref: refChangedFile, localDiff: dtsDiff, fixAttributeName },
                { name: formatted(typed(dirs.changed)), category, local: formatted(changedFile), ref: formatted(refChangedFile), localDiff: mapDiff, fixAttributeName },
            ]
        }

        const tsBaseLine = tscBaselineDir + baseName + (config ?? "");
        const tsReference = reference(tscBaselineDir + baseName + (config ?? ""));
        return [
            ...makeFiles(fixedDir, "isolatedDeclarationFixedDiffReason", "Fixed"),
            ...makeFiles(fixedDir, "isolatedDeclarationFixedDiffReason", "Fixed", "ts.map"),
            ...makeFiles(originalDir, "isolatedDeclarationDiffReason", "Original"),
            // ...makeFiles(originalTscDir, "isolatedDeclarationDiffReason", "Original-TSC", undefined,  { diff: "diff", base: "tsc-non-id", changed: "tsc-with-id" }),
            // ...makeFiles(fixedTscDir, "isolatedDeclarationFixedDiffReason", "Fixed-TSC", undefined,  { diff: "diff", base: "tsc-non-id", changed: "tsc-with-id" }),

            { name: "ts-js", local: tsBaseLine + ".js", ref: tsReference + ".js", category: "TSC" },
            { name: "ts-sym", local: tsBaseLine + ".symbols", ref: tsReference + ".symbols", category: "TSC" },
            { name: "ts-types", local: tsBaseLine + ".types", ref: tsReference + ".types", category: "TSC" },
            { name: "ts-error", local: tsBaseLine + ".errors.txt", ref: tsReference + ".errors.txt", category: "TSC" },
        ] as const

    }
    async function doCommands(testPath: null | string, config: string | undefined, errors: string[]) {
        const commands: Array<Command> = [{
            shortcut: "q",
            name: "Quit",
            async run() {
                process.exit();
            }
        }, {
            shortcut: "f",
            name: "Filter by notes",
            async run() {
                return await notesService.notesMenu();
            }
        }, {
            shortcut: "w",
            name: "Wait for last test",
            hide: () => allTestStatus.length === 0,
            async run() {
                const testStatus = allTestStatus.at(-1);
                if (testStatus === undefined) {
                    await readline.keyIn("No currently active tasks.");
                    return;
                }
                console.log(`=== WAITING FOR ${testStatus.testName} ===`)
                if(testStatus.output === undefined) debugger;
                process.stdout.write(testStatus.output);
                testStatus.live = true;

                const key = await Promise.race([testStatus.wait.then(() => null), readline.keyIn()]);
                if (key && keyIs(key, "k")) {
                    testStatus.childProcess.kill();
                }
                if (testStatus.status !== "RUNNING") {
                    while (await readline.keyIn("Done. Press any key.") == null);
                } else {
                    testStatus.live = false;
                }
            }
        }, {
            shortcut: "t",
            name: "Show test results",
            test: () => allTestStatus.length === 0,
            async run() {
                const running = allTestStatus.filter(p => p.status === "RUNNING");
                const finished = allTestStatus.filter(p => p.status !== "RUNNING");
                allTestStatus = running;
                for (const testStatus of finished) {
                    process.stdout.write(testStatus.output);
                    if (testStatus.error) {
                        process.stderr.write(testStatus.error);
                    }
                    await readline.keyIn("Done. Press any key.");
                };
            }
        }, {
            shortcut: "n",
            name: "Next",
            async run() {
                notesService.jumpToOffset(1);
                return true;
            }
        }, {
            shortcut: '0',
            name: "Go to start",
            async run() {
                notesService.jumpTo(0);
                return true;
            }
        }, {
            shortcut: "p",
            name: "Prev test",
            async run() {
                notesService.jumpToOffset(-1);
                return true;
            }
        }, {
            shortcut: "a",
            name: "Run All/ Failed",
            async run() {
                const k = await readline.keyIn(`Do you want to run all? (y - all, f - failed, other - bail)`);
                const currentFileDir = path.dirname(process.argv[1]);
                const isattyOverride = `--require "${path.join(currentFileDir, "override-tty.cjs").replaceAll("\\", "/")}"`;
                const NODE_OPTIONS = isattyOverride + " " + process.env.NODE_OPTIONS;
                const command = keyIs(k, "y") ? `hereby runtests-parallel` :
                    keyIs(k, "f") ? `hereby runtests --failed` :
                        undefined;
                if (command !== undefined) {
                    runCommand(command, command, true, { NODE_OPTIONS }).then(async test => {
                        await fs.writeFile("./log.txt", test.output);
                    });
                } else if (k != null) {
                    readline.overrideNextKey(k);
                }
            }
        }, {
            shortcut: "m",
            name: "Toggle menu",
            async run() {
                showMenu = !showMenu;
            }
        }]
        let header = (command: Command) => `No tests ${
            allTests.length !== filteredTests.length ? `(${allTests.length})` : `` 
        } ${
            notesService.getCurrentFilterDisplay()
        }`;
        let getDynamicCommands = (): Command[] => [];
        if (testPath) {

            const ext = path.extname(testPath);
            const baseNameWithExt = path.basename(testPath);
            const baseName = baseNameWithExt.substring(0, baseNameWithExt.length - ext.length);
            const fixedTestFile = `tests/auto-fixed/${baseName}${config ?? ""}${ext}`;
            const testKey = testPath + (config ?? "");

            const tsBaseLine = tscBaselineDir + baseName + (config ?? "");
            const tsReference = reference(tscBaselineDir + baseName + (config ?? ""));
            const files = makeTestFileBaseline(testPath, config, )

            
            files
                .filter(d => d.local.endsWith(".map") && (d.name.indexOf("tsc") !== -1 || d.name.indexOf("dte") !== -1))
                .map(async c => {
                    if (existsSync(c.local)) {
                        await fs.writeFile(formatted(c.local), await formatMaps(c.local, testPath))
                    }
                    if (existsSync(c.ref)) {
                        await fs.writeFile(formatted(c.ref), await formatMaps(c.ref, testPath))
                    }
                });

            function getExistingFiles() {
                return files.map(f => ({
                    fileInfo: f,
                    ...f,
                    local: existsSync(f.local) ? f.local : undefined,
                    ref: existsSync(f.ref) ? f.ref : undefined,
                })).filter(f => f.local || f.ref);
            }
            getDynamicCommands = () => {
                return [{
                        shortcut: null,
                        name: `Run Command`,
                        async run(key: Key) {
                            let cmd = commands.find(cmd => cmd.shortcut && keyIs(key, cmd.shortcut));
                            return await cmd?.run(key);
                        },
                    },
                    ...getExistingFiles().flatMap((f): Command[] => [{
                        shortcut: null,
                        params: [f.local],
                        name: `With file ${f.local}`,
                        async run(key: Key) {
                            let cmd = commands.find(cmd => cmd.shortcut && keyIs(key, cmd.shortcut));
                            return await cmd?.run(key, [f])
                        },
                    }, {
                        shortcut: null,
                        params: [f.ref],
                        name: `With file ${f.ref}`,
                        async run(key: Key) {
                            let cmd = commands.find(cmd => cmd.shortcut && keyIs(key, cmd.shortcut));
                            return await cmd?.run(key, [f])
                        },
                    }]).filter(c => !!c.params?.[0])
                ]
            }
            header = (cmd) => {
                let out = `${cmd.shortcut ?? ">"}: ${cmd.name}\n`
                function log(text: string) { 
                    out += text + '\n'
                }
                log(`${filteredTests.indexOf(notesService.getCurrent())} of ${filteredTests.length} ${allTests.length !== filteredTests.length ? `(${allTests.length})` : ``
                    } ${notesService.getCurrentFilterDisplay()}`);

                log(baseName);
                log(testPath);
                log(fixedTestFile);
                log(notesService.getDefaultColumnContent());
                if (errors.length) {
                    log(chalk.red("Errors:"));
                    errors.forEach(c => log(chalk.magenta(c)));
                }

                const existingFiles = getExistingFiles();
                const nameColumns = Math.max(...existingFiles.map(f => f.name.length));
                existingFiles.forEach(({ local = "", ref = "", name, category }, index) => {
                    if (existingFiles[index - 1]?.category !== category) {
                        log(chalk.bold(category));
                    }
                    const allColumns = process.stdout.columns;
                    const fileColumns = Math.trunc((allColumns - nameColumns - 4) / 2);
                    function fileName(file: string, color: 'red' | 'green') {
                        let result = file.padEnd(fileColumns);
                        if(cmd.params?.[0] === file) {
                            result = chalk.bold(result);
                        }
                        result = chalk[color](result);
                        return result;
                    }
                    if (local.length < fileColumns && ref.length < fileColumns) {
                        log(`${name.padStart(nameColumns, " ")} ${fileName(local, "red")} ${fileName(ref, "green")}`);
                    } else {
                        if (local) {
                            log(`${name.padStart(nameColumns, " ")} L: ${fileName(local, "red")}`);
                        }
                        if (ref) {
                            log(`${name.padStart(nameColumns, " ")} R: ${fileName(ref, "green")}`);
                        }
                    }
                });
                return out;
            }
            commands.push({
                shortcut: "v",
                name: "View notes",
                async run() {
                    await notesService.viewNotes();
                }
            }, {
                shortcut: "e",
                name: "Edit notes",
                async run() {
                    await notesService.editNotes();
                }
            }, {
                shortcut: "u",
                name: "Update diff reason",
                async run() {
                    const command = await menu({
                        message: "Command:",
                        choices: [
                            { shortcut:"l", name:"Copy diff reason to local & reference", command: "copy" as const },
                            { shortcut:"f", name:"Update fixed diff reason", command: "update" as const, target: Target.Fixed },
                            { shortcut:"o", name:"Update original diff reason", command: "update" as const, target: Target.Original},
                            { shortcut:"a", name:"Remove all diff reasons", command: "remove" as const, target: Target.All },
                            { name:"Remove fixed diff reason", command: "remove" as const, target: Target.Fixed},
                            { name:"Remove original diff reason", command: "remove" as const, target: Target.Original},
                        ]
                    });
                    if(!command) return;

                    let testFileContent = await fs.readFile(testPath, { encoding: "utf-8" });
                    let updateAll = false;
                    if(command.command === "update") {
                        const reasons = (await diffReasons)[command.target === Target.Fixed ? "fixedReasons": "originalReasons"];
                        const textSelection = await menu({
                            message: "Select reason",
                            choices: [
                                { name: "--New text--", type: "new-text" as const },
                                ...reasons.map(r => ({
                                    ...r,
                                    name: `${r.value} (${r.frequency})`,
                                    type: "value" as const
                                })).sort((a, b) => b.frequency - a.frequency)
                            ]
                        })
                        if(!textSelection) return;
                        let value = textSelection.type === "value" ? textSelection.value : await input({
                            message: "Enter reason",
                        })
                        if(!value) return;
                        function updateDiffReason(kind: string) {
                            let hasMatched = false;
                            testFileContent = testFileContent.replace(new RegExp(`\\/\\/\\s*@${kind}:\\s*.*(\\r\\n|\\n)`), m => {
                                hasMatched = true;
                                let nl = m[m.length - 2] === '\r' ? '\r\n': '\n';
                                return `${m.split(':')[0].trimStart()}: ${value}${nl}`;
                            });
                            if(!hasMatched) {
                                let index = 0;
                                let nextLine; 
                                while(
                                    nextLine = testFileContent.indexOf('\n', index), 
                                    testFileContent.substr(index, 40).match(/^\/\/\s*@(?!filename)/)) {
                                    index = nextLine +1;
                                }
                                let nl = testFileContent[nextLine -1] === '\r' ? '\r\n': '\n';
                                testFileContent = testFileContent.substring(0, index) + 
                                    `// @${kind}: ${value}` + nl + 
                                    testFileContent.substring(index);
                            }
                        }
                        if (command.target & Target.Fixed) {
                            updateDiffReason('isolatedDeclarationFixedDiffReason');
                            updateAll = true;
                        }
                        if (command.target & Target.Original) {
                            updateDiffReason('isolatedDeclarationDiffReason');
                            updateAll = true;
                        }
                    }
                    if(command.command ==="remove") {
                        if (command.target & Target.Fixed) {
                            testFileContent = testFileContent.replace(/\/\/\s*@isolatedDeclarationFixedDiffReason:\s*.*(\r\n|\n)/, "");
                            await removeAll("isolatedDeclarationFixedDiffReason");
                            updateAll = true;
                        }
                        if (command.target & Target.Original) {
                            testFileContent = testFileContent.replace(/\/\/\s*@isolatedDeclarationDiffReason:\s*.*(\r\n|\n)/, "");
                            await removeAll("isolatedDeclarationDiffReason");
                            updateAll = true;
                        }
                    }

                    if(updateAll) {
                        await fs.writeFile(testPath, testFileContent);
                    }

                    async function removeAll(fixAttributeName: string) {
                        await Promise.all(files
                            .filter(f => 'fixAttributeName' in f && f.fixAttributeName === fixAttributeName)
                            .flatMap(f => [
                                fs.rm(f.local).catch(() => {}),
                                fs.rm(f.ref).catch(() => {}),
                            ]));
                    }
                    async function updateDiffReason(file: string,  fixAttributeName: string) {
                        if (!existsSync(file)) return;
                        const reason = testFileContent.match(new RegExp(`@${fixAttributeName}:\\s*(.*)`));
                        if (!reason) return;
                        const diff = await fs.readFile(file, { encoding: "utf-8" });
                        const updated = diff.replace(new RegExp("// \\[\\[Reason: .*\\]\\] ////"), `// [[Reason: ${reason[1]}]] ////`)
                        await fs.writeFile(file, updated);
                    }
                    loadDiffReasons();
                    await Promise.all(files.map(async f => {
                        if (!('fixAttributeName' in f && f.fixAttributeName)) return;
                        const fixAttributeName = f.fixAttributeName;
                        updateDiffReason(f.local, fixAttributeName)
                        updateDiffReason(f.ref, fixAttributeName)
                    }));
                }
            }, {
                shortcut: "r",
                name: "Run",
                async run() {
                    console.log("Running");
                    await Promise.all([fixedTestFile, ...files.map(f => f.local)].map(async local => {
                        if (existsSync(local)) {
                            await fs.rm(local);
                        }
                    }));
                    let disableDebug = false;
                    if (process.env.VSCODE_INJECTION) {
                        const r = await readline.keyIn("Debug? (y - yes, q - bail, other - no debugger)");
                        if (keyIs(r, "q")) {
                            return;
                        }
                        const isYes = keyIs(r, "y");
                        disableDebug = !isYes;
                        if (r && disableDebug) {
                            readline.overrideNextKey(r);
                        }
                        if (!disableDebug) {
                            // watch if debugging
                            readline.overrideNextKey({ name: "w" });
                        }
                    }
                    runCommand(baseName, `node node_modules/mocha/bin/_mocha -g /${baseName}\\. -t 400000  ./built/local/run.js`, disableDebug)
                }
            }, {
                shortcut: "l",
                name: "Compare local files",
                async run(key: Key, fileSubset: typeof files = files) {
                    let hasDiff = false
                    const useReferenceForDiff = !!key.shift;
                    await Promise.all(fileSubset.map(async f => {
                        if (!('localDiff' in f && f.localDiff)) return;

                        const dte =
                            existsSync(f.local) ? { path: f.local, name: `${f.category}-${f.name}-Local-${baseNameWithExt}` } :
                                useReferenceForDiff && existsSync(f.ref) ? { path: f.ref, name: `${f.category}-${f.name}-Ref-${baseNameWithExt}` } :
                                    undefined
                        if (!dte) return;

                        const tsc =
                            existsSync(f.localDiff.local) ? { path: f.localDiff.local, name: `${f.category}-${f.localDiff.name}-Local-${baseNameWithExt}` } :
                                useReferenceForDiff && existsSync(f.localDiff.ref) ? { path: f.localDiff.ref, name: `${f.category}-${f.localDiff.name}-Ref-${baseNameWithExt}` } :
                                    undefined
                        if (!tsc) return;

                        const dteContent = await fs.readFile(dte.path, { encoding: "utf-8" })
                        const tscContent = await fs.readFile(tsc.path, { encoding: "utf-8" })
                        if (dteContent === tscContent) return;
                        hasDiff = true;
                        runDiff(tsc, dte);
                    }));
                    if (!hasDiff) {
                        await readline.keyIn("No differences found");
                    }
                }
            }, {
                shortcut: "d",
                name: "Compare with reference",
                async run(key: Key, fileSubset: typeof files = files) {
                    let hasDiff = false
                    await Promise.all(fileSubset.map(async ({ local, ref, name, category }) => {
                        if (!existsSync(local) || !existsSync(ref)) return
                        const dteContent = await fs.readFile(local, { encoding: "utf-8" })
                        const tscContent = await fs.readFile(ref, { encoding: "utf-8" })
                        if (dteContent === tscContent) return;
                        hasDiff = true;
                        runDiff(
                            { path: local, name: `${name}-Local-${baseNameWithExt}` },
                            { path: ref, name: `${category}-${name}-Reference-${baseNameWithExt}` },
                        )
                    }));
                    if (!hasDiff) {
                        await readline.keyIn("No differences found");
                    }
                }
            }, {
                shortcut: "o",
                name: "Open all files",
                async run(key: Key, fileSubset: typeof files = files) {
                    fileSubset.flatMap(f => [f.local, f.ref]).forEach(f => {
                        if (existsSync(f)) {
                            c.exec(`code ${f}`)
                        }
                    })
                }
            }, {
                shortcut: "c",
                name: "Accept new baseline",
                async run(key: Key, fileSubset: typeof files = files) {
                    await Promise.all(fileSubset.map(async ({ local, ref }) => {
                        if (existsSync(local) && !local.endsWith(".f")) {
                            await fs.copyFile(local, ref);
                        }
                    }));
                }
            }, {
                shortcut: "x",
                name: "Delete references",
                async run() {
                    await Promise.all(files.map(async ({ local, ref }) => {
                        if (existsSync(ref) && !ref.endsWith(".f")) {
                            await fs.rm(ref);
                        }
                    }));
                }
            }, {
                shortcut: "n",
                name: "Next",
                async run() {
                    files.filter(f => f.local.endsWith(".f")).forEach(f => {
                        if (existsSync(f.local)) {
                            fs.rm(f.local);
                        }
                        if (existsSync(f.ref)) {
                            fs.rm(f.ref);
                        }
                    })
                    notesService.jumpToOffset(1);
                    return true;
                }
            });
        }
        let lastChoice = 0;
        while (true) {
            console.log('\x1b[2J');
            const choices =  [
                ...getDynamicCommands(),
                // ...allTestStatus.map((t): Command => ({
                //     key: null,
                //     name: `Watch ${t.testName}`,
                //     params: [t],
                //     async run(key: Key) {
                //         commands.find(c => c.key === "w")?.run(key, [t]);
                //     }
                // })),
                ...commands
            ]
            const sel =  await selection({
                message: "",
                choices,
                default: lastChoice,
                commandDecoder(key, options, selected, next) {
                    const selectedCommand = commands.find(c => c.shortcut && keyIs(key, c.shortcut));
                    const currentSelection = options.choices[selected];
                    if(selectedCommand) {
                        if(currentSelection.shortcut === null) return { name: "return" };
                        const choiceIndex = options.choices.indexOf(selectedCommand);
                        if(choiceIndex !== -1) return { name: "select", index: choiceIndex };
                    }
                    const command = next?.(key, options, selected, next);
                    if (!showMenu && command) {
                        if(command.name === "down") {
                            if (options.choices[selected + 1]?.shortcut !== null) {
                                return { name: "skip", index: 0 }
                            }
                        }
                        if(command.name === "up") {
                            if (options.choices[selected - 1]?.shortcut !== null) {
                                return { name: "skip", index: choices.findLastIndex((c: Command) => c.shortcut === null) }
                            }
                        }
                    }
                    return command;
                },
                render(options, selection) {
                    const cmd = options.choices[selection];
                    let out = header(cmd) + "\n";
                    allTestStatus.forEach(t => {
                        out += `Test for ${t.testName} is ${t.status}\n`;
                    });
                    if (showMenu) {
                        const cols = 4;
                        commands.forEach((c, i) => {
                            const test = 'hide' in c && c.hide && c.hide();
                            if (test !== true && c.shortcut) {
                                const key = c.shortcut;
                                let menuName = `${key}: ${c.name}`.padEnd(45);
                                if(c === cmd) {
                                    menuName = chalk.bold(chalk.blue(menuName));
                                }
                                out += menuName;
                            }
                            if (i % cols === cols - 1) {
                                out+= "\n";
                            }
                        })
                    }
                    return out;
                },
            });
            lastChoice = sel?.index ?? lastChoice;
            if (sel === null) {
                continue;
            }
            if (await sel.selection?.run(sel.key)) {
                break;
            }

        }
    }

    const allFilesMap = new Map<string, TestFile>();
    function updateTestsFromMap() {
        allTests = [...allFilesMap.values()].sort((a, b) => a.file.localeCompare(b.file) || a.config?.localeCompare(b?.config ?? "") || 0);
    }
    async function readTests() {
        let currentTest: TestFile | undefined;
        allFilesMap.clear();
        function add(file: string | undefined, config: string | undefined) {
            if (file === undefined) return;
            config = config?.replaceAll("@", "").replaceAll(" ", "").replaceAll(":", "=")!;
            file = file.replaceAll("\\", "/");
            const fullName = `${file}${config ?? ""}`;
            currentTest = allFilesMap.get(fullName);
            notesService.setNoteValueByKey(file + (config ?? ""), 'non-failed', undefined);
            if (currentTest) return;
            allFilesMap.set(fullName, currentTest = { file, config, errors: [] });
        }

        if (existsSync("manual.txt")) {
            (await fs.readFile("manual.txt", { encoding: "utf-8" })).split(/(\r\n)|(\n)/).forEach(l => {
                if (!l || l.trim() === "" || l.startsWith("#")) return;
                // const test = /(?<file>tests\/cases[^\s]*)(?<config> \([^)]*\)/.exec(l);
                const test = /(?<file>[^(]*)(?<config>\s*\([^)]*\))?/.exec(l);
                add(test?.groups?.file, test?.groups?.config);
            });

        }

        if (existsSync("log.txt")) {
            const text = await fs.readFile("log.txt", { encoding: "utf-8" });
            const lines = text.split(/(\r\n)|(\n)/);

            for (const line of lines) {
                const testLineMatch =
                    /\s*((conformance)|(compiler)) tests for (?<file>tests\/cases[^\s]*)(?<config> \([^)]*\))?/.exec(line)
                // ?? /Correct .* (?<file>tests\/cases[^\s:"]*)/.exec(line);
                if (testLineMatch) {
                    const file = testLineMatch.groups?.file;
                    const config = testLineMatch.groups?.config
                    add(file, config);
                }
                const error = /(Error:\s*)+ (?<error>.*)/.exec(line)
                if (error && currentTest && error.groups?.error) {
                    currentTest.errors.push(error.groups.error);
                }
            }
        }
        updateTestsFromMap();
    }

    let allTests: TestFile[] = [];
    await readTests();
    let filteredTests: TestFile[] = [];
    applyFilters();
    while (true) {
        const f = notesService.getCurrent();
        if (!f) {
            notesService.jumpTo(0)
        }
        notesService.saveNotes();
        const { file, config, errors } = f ?? { file: null, config: null, errors: null };
        await doCommands(file, config, errors ?? []);
    }
}

main();

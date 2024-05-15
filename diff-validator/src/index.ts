import { keyIs, menu, selection, yesNoPrompt } from 'cli-utils-lib/read-line'
import { makeNoteService } from 'cli-utils-lib/notes'
import chalk from 'chalk';
import { getDiffFiles, getDiff, getAdditionsAndDeletions, getTestName, getLineDiffs, exec, hasSignificantDiff, isTypeReuseDiff } from './diffing.js';


const queues = Array.from({ length: 7 }).map(() => Promise.resolve());
let queueIndex = 0;
const baseCommit = process.argv[2];
main(baseCommit);

function enqueueTask<T>(fn: () => Promise<T>) {
    const localQueueIndex = queueIndex % queues.length;
    queueIndex++;
    const oldTask = queues[localQueueIndex];
    const queued = (async function () {
        await oldTask;
        return await fn();
    })();
    queues[localQueueIndex] = queued as Promise<void>;
    return queued;
}


type DiffFile = {
    fileName: string,
    hasSignificantDiff: boolean | undefined,
    diff(): Promise<string[]>
}

async function main(baseCommit: string) {
    const notesService = makeNoteService<DiffFile, Filter>({
        notesFile: "./differ-state.json",
        getRecords: () => typeFiles,
        displayFilter(filter: Filter) {
            switch (filter.type) {
                case 'has-significant-diff': return "has significant diff";
                default: throw new Error();
            }
        },
        getFilter(filter: Filter) {
            switch (filter.type) {
                case 'has-significant-diff': return f => f.hasSignificantDiff !== false
                default: throw new Error();
            }
        },
        getVisibleRecords: () => filteredTests,
        onFiltersUpdated: async (filters) => {
            applyFilters(filters);
        },
        async onNotesChanged(notes) {

        },
        key: t => t.fileName,
        getFilterOptions: () => [{ customType: 'has-significant-diff', name: "Has Significant Diff" }],
        async makeFilter(type, negate) {
            if (type === "has-significant-diff") {
                return { type: "has-significant-diff", negate }
            }
            throw new Error();
        },
    })
    let typeFiles: DiffFile[] = await reloadTestDiff();
    let invalidFilter = true;
    async function reloadTestDiff() {
        const files = await getDiffFiles(baseCommit);

        return files
            .filter(f => f.endsWith(".types"))
            .map((f) => {
                let fileHasSignificantDiff: boolean | undefined = undefined;
                async function doDiff() {
                    const lines = await getDiff(f, baseCommit);
                    fileHasSignificantDiff = false
                    for (const { map } of getAdditionsAndDeletions(lines)) {
                        if (map(hasSignificantDiff).some((e) => e)) {
                            fileHasSignificantDiff = true;
                            break;
                        }
                    }
                    invalidFilter = true;
                    return lines;
                }
                let diffData: Promise<string[]> | undefined = enqueueTask(() => doDiff());
                return {
                    fileName: f,
                    get hasSignificantDiff() {
                        return fileHasSignificantDiff;
                    },
                    diff() {
                        return diffData ?? doDiff()
                    }
                }
            });
    }
    let filteredTests = typeFiles;
    type Filter = {
        type: "has-significant-diff",
        negate: boolean
    }
    function applyFilters(filters = notesService.getNotes().filters) {
        filteredTests = notesService.applyFilters(typeFiles, filters);
        invalidFilter = false;
        if(!notesService.getCurrent()) {
            notesService.jumpTo(0);
        }
    }
    let colOffset = 0;
    let diffOffset = 0;
    let showTypeDiff = false;
    let showOnlySignificant = false;
    let showMenu = false;
    while (true) {
        console.clear();
        const f = notesService.getCurrent();
        const needsDiff = notesService.getNotes().filters.some(s => s.type === "has-significant-diff");
        if (f !== undefined && f.hasSignificantDiff === undefined && needsDiff) {
            console.log(`Loading file ${typeFiles.indexOf(f)} of ${typeFiles.length}`)
            await f.diff();
            continue;
        }
        if (invalidFilter) {
            applyFilters();
            continue;
        }

        notesService.saveNotes();
        const commands = await (f ? showFileInfo(f) : noFile());
        commands.push(
            {
                shortcut: "f", name: "Filter", order: 3, action: async () => {
                    await notesService.notesMenu();
                },
            },
            {
                shortcut: "l", name: "Reload", order: 3, action: async () => {
                    await reloadTestDiff();
                    await applyFilters();
                },
            },
            {
                shortcut: "c", name: "Category Actions", order: 3, action: async () => {
                    await notesService.columnMenu("categories");
                }
            },
            {
                shortcut: "m", name: "Show Menu", action: async () => {
                    showMenu = !showMenu;
                },
            },
            {
                shortcut: "t", 
                name: showOnlySignificant ? 
                    "Show All Diffs   " : 
                    "Hide trivial diff", 
                action: async () => {
                    showOnlySignificant = !showOnlySignificant;
                },
            }
        );

        const result = await selection({
            choices: commands,
            message: "",
            commandDecoder(key, options) {
                const selectedCommand = commands.find(c => c.shortcut && keyIs(key, c.shortcut));
                if (selectedCommand) {
                    const choiceIndex = options.choices.indexOf(selectedCommand);
                    if (choiceIndex !== -1) return { name: "select", index: choiceIndex };
                }
                return { name: "none" }
            },
            render() {
                let out = "";
                if (showMenu) {

                    const visibleCommands = commands.filter(c => c.order != null).sort((a, b) => (a.order! - b.order!));
                    const maxKey = Math.max(...visibleCommands.map(c => c.shortcut.length + 1));
                    const maxName = Math.max(...visibleCommands.map(l => l.name.length + 5));
                    const cols = Math.trunc(process.stdout.columns / (maxKey + maxName));
                    const pad =Math.trunc(process.stdout.columns / cols) - maxKey - 2;
                    visibleCommands.forEach((c, i) => {
                        const key = c.shortcut;
                        let menuName = `${key.padStart(maxKey - 1)}: ${c.name.padEnd(pad)}`;
                        out += menuName;
                        if (i % cols === cols - 1) {
                            out += "\n";
                        }
                    })
                }
                return out;
            },
        })
        if (!result) continue;
        await result.selection.action();

    }

    async function noFile() {
        console.log(`\n\n\nNo files were found ${notesService.getCurrentFilterDisplay()}`);
        return [];
    }
    async function showFileInfo(f: DiffFile) {
        const lines = await f.diff();

        let currentDiff = 0;
        const allRows = process.stdout.rows;
        const diffViewWindowSize = allRows - (showMenu ? 4 : 3);
        const columns = process.stdout.columns;
        let buffer = (function() {
            let text = ""
            let rows = 0;
            let suppressAfter: number | undefined = undefined
            return {
                write(s: string) {  
                    if(suppressAfter !== undefined && suppressAfter <= rows) return;
                    text +=s;
                },
                writeln(s: string = '') { 
                    if(suppressAfter !== undefined && suppressAfter <= rows) return;
                    text += s + "\n"; 
                    rows++;
                },
                flush() { process.stdout.write(text); text = ""; },
                get rows() { return rows;},
                suppressAfter(line: undefined | number) {
                    suppressAfter = line;
                }
            }
        })();
        buffer.writeln();
        buffer.writeln();
        buffer.writeln(`File ${filteredTests.indexOf(f) + 1} of ${filteredTests.length} (${typeFiles.indexOf(f) + 1} of ${typeFiles.length})  ${notesService.getCurrentFilterDisplay()}`);
        buffer.writeln(chalk.bold(chalk.cyan(getTestName(f.fileName))));
        buffer.writeln(chalk.bold(chalk.blue(f.fileName)));
        buffer.writeln(notesService.getDefaultColumnContent());
        buffer.suppressAfter(diffViewWindowSize);
        let maxLineLength = 0;
        let nextLineDiff = Number.MAX_SAFE_INTEGER;
        diffLoop:
        for (const d of getAdditionsAndDeletions(lines)) {
            let writeFirstLine = true;
            for (const { added, removed } of d.map((added, removed) => ({ added, removed }))) {
                if (showOnlySignificant && !hasSignificantDiff(added, removed)) continue;
                currentDiff++;
                if (currentDiff < diffOffset) continue;
                if (buffer.rows >= diffViewWindowSize) break diffLoop;

                if (writeFirstLine) {
                    writeFirstLine = false;
                    buffer.writeln(lines[d.start - 1].substring(colOffset, colOffset + columns));
                }
                const lineDiff = getLineDiffs(added ?? "", removed ?? "");

                const isType = isTypeReuseDiff(added ?? "", removed ?? "");
                if (showTypeDiff || !isType) {
                    buffer.writeln(chalk.green((lineDiff.added ?? "").substring(colOffset, colOffset + columns)));
                    buffer.writeln(chalk.red((lineDiff.removed ?? "").substring(colOffset, colOffset + columns)));
                }
                maxLineLength = Math.max(maxLineLength, added?.length ?? 0, removed?.length ?? 0)
                let printedSize = 0;
                const diffs = lineDiff.diffs;
                for (const { type, text } of diffs) {
                    const printedText = !isType ?
                        (type === "same" ? " " : "~").repeat(Math.min(text.length, columns - printedSize + colOffset)) :
                        text.substring(0, columns - printedSize + colOffset);

                    const color = type === "added" ? chalk.green :
                        type === "removed" ? chalk.red :
                        type === "unknown" ? chalk.magenta :
                        type === "new-reuse" ? chalk.greenBright :
                        type === "reverted-reuse" ? chalk.redBright :
                        chalk.gray;
                    if (colOffset <= printedSize + printedText.length) {
                        buffer.write(color(printedText.substring(colOffset - printedSize)));
                    }
                    if (printedText.length !== text.length) {
                        for(const { type, start } of diffs) {
                            // Look for next diff location
                            if(type !== "same") {
                                nextLineDiff = Math.min(nextLineDiff, start);
                                break;
                            }
                        }
                        break;
                    };
                    printedSize += printedText.length;
                }
                buffer.writeln();
            }
        }
        const hasHiddenLines = buffer.rows === diffViewWindowSize;
        buffer.suppressAfter(undefined);
        while(buffer.rows < diffViewWindowSize) buffer.writeln();
        const moreLinesMsg = "Use ⬆/⬇ for more diffs";
        buffer.write(`Ln: ${diffOffset.toString().padStart(4)} ${hasHiddenLines ? chalk.bold(chalk.redBright(moreLinesMsg)) : " ".repeat(moreLinesMsg.length)}`);
        const moreColumnsMsg = "Use ⬅/➡ to scroll line";
        buffer.write(` Col: ${colOffset.toString().padStart(4)} ${maxLineLength - colOffset > columns ? chalk.bold(chalk.redBright(moreColumnsMsg)) : " ".repeat(moreColumnsMsg.length)}`)
        buffer.write(` Short Type Diff: ${chalk.blue((!showTypeDiff).toString().padStart(5))} (s)   `);
        buffer.write(` Hide trivial diff: ${chalk.blue((showOnlySignificant).toString().padStart(5))} (t)   `);
        buffer.write(` Show menu (m)`);
        buffer.writeln();
        buffer.flush();

        return [
            {
                shortcut: "v", name: "View Notes", order: 5, action: async () => {
                    await notesService.viewNotes();
                }
            }, {
                shortcut: "e", name: "Edit notes", order: 4, action: async () => {
                    await notesService.editNotes();
                }
            }, {
                shortcut: "0", name: "Jum to start", order: 7.5, action: async () => {
                    notesService.jumpTo(0);
                    diffOffset = 0;
                    colOffset = 0;
                }
            }, {
                shortcut: "d", name: "View Next Diff", order: 8, action: async () => {
                    // We have something to see to the right
                    if (maxLineLength - colOffset > columns  && nextLineDiff !== Number.MAX_SAFE_INTEGER) {
                        colOffset = Math.max(0, nextLineDiff - 10);
                    }
                    // We have something to see below
                    else if (hasHiddenLines) {
                        colOffset = 0;
                        diffOffset = currentDiff - 1;
                    }
                    else {
                        colOffset = 0;
                        diffOffset = 0
                        notesService.jumpToOffset(1);
                    }
                }
            }, {
                shortcut: "end", name: "Line End", order: 14, action: async () => {
                    colOffset = maxLineLength - columns;
                }
            }, {
                shortcut: "home", name: "Line Home", order: 13, action: async () => {
                    colOffset = 0;
                }
            }, {
                shortcut: "pagedown", name: "Page down", order: 16, action: async () => {
                    diffOffset = currentDiff - 1;
                }

            }, {
                shortcut: "pageup", name: "Page Up", order: 15, action: async () => {
                    diffOffset = Math.max(0, Math.trunc(diffOffset - (diffViewWindowSize / (showTypeDiff ? 2 : 4))));
                }
            }, {
                shortcut: "up", name: "Text Up", order: 12, action: async () => {
                    diffOffset = Math.max(0, diffOffset - 1);
                }
            }, {
                shortcut: "down", name: "Text Down", order: 11, action: async () => {
                    diffOffset++;
                }
            }, {
                shortcut: 'left', name: "Line Left", order: 10, action: async () => {
                    colOffset = Math.max(0, colOffset - 10);
                }
            }, {
                shortcut: 'right', name: "Line Right", order: 9, action: async () => {
                    colOffset += 10;
                }
            }, {
                shortcut: 's', name: "Show expanded type diffs", action: async () => {
                    showTypeDiff = !showTypeDiff;
                }

            }, {
                shortcut: "r", name: "Revert files", order: 17, action: async () => {

                    async function revertFile(files: DiffFile[]) {
                        for (let f of files) {
                            console.log(`reverting file ${f.fileName}`)
                            await exec(`git checkout ${f.fileName}`, "./");
                            typeFiles.splice(typeFiles.indexOf(f), 1);
                        }
                    }
                    await withFiles("What should we revert?", revertFile);
                }
            }, {
                shortcut: 'a', name: "Add files", order: 18, action: async () => {

                    async function stageFile(files: DiffFile[]) {
                        for (let f of files) {
                            console.log(`adding file ${f.fileName}`)
                            await exec(`git add ${f.fileName}`, "./");
                            typeFiles.splice(typeFiles.indexOf(f), 1);
                        }
                    }
                    await withFiles("What should we add?", stageFile);
                }
            }, {
                shortcut: "n", name: "Next File", order: 6, action: async () => {
                    colOffset = 0;
                    diffOffset = 0;
                    notesService.jumpToOffset(1)
                }
            }, {
                shortcut: "p", name: "Prev File", order: 7, action: async () => {
                    colOffset = 0;
                    diffOffset = 0;
                    notesService.jumpToOffset(-1)
                }
            }
        ];
        async function withFiles(message: string, fn: (files: DiffFile[]) => Promise<void>) {
            const option = await menu({
                message,
                choices: [
                    { type: "current" as const, name: "Current" },
                    { type: "filtered" as const, name: "Current Filter" },
                    { type: "not-filtered" as const, name: "Not in current filter" },
                ]
            })
            if (!option) return;

            const confirm = await yesNoPrompt({
                message: "Are you sure?"
            })
            if (confirm) {

                switch (option.type) {
                    case 'current':
                        await fn([f])
                        break;
                    case 'filtered':
                        await fn(filteredTests);
                        break;
                    case 'not-filtered':
                        const negatedFilters = notesService.getNotes().filters.map(f => Object.assign({}, f, { negate: !f.negate }))
                        applyFilters(negatedFilters);
                        await fn(filteredTests);
                        applyFilters();
                        break;
                }


            }
        }
    }
}



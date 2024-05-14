import * as fs from 'fs'
import * as path from 'path'
import * as childProcess from "child_process";
import diff_match_patch, * as d from "diff-match-patch"

export function getTestName(f: string) {
    const lines = fs.readFileSync(f, { encoding: "utf-8"}).split("\n");
    const testFileMatch = /\[(?<testName>.*)\]/.exec(lines[0]);
    return testFileMatch?.groups?.testName ?? "Not found";
}

export function hasSignificantDiff(added: string | undefined, removed: string| undefined) {
    if(removed === undefined || added === undefined) {
        return removed !== added;
    }
    if (added.length !== removed.length) return true;
    for (let i = 1; i < added.length; i++) {
        if (added[i] !== removed[i] && !(removed[i] === "^" && added[i] === " ")) {
            return true
        }
    }
    return false;
}

type LineDiffType = "same" | "added" | "removed" | "unknown" | "new-reuse" | "reverted-reuse";
export function getLineDiffs(added: string, removed: string) {
    const differ = new d.default();
    differ.Match_Threshold = 4;
    const diffs = differ.diff_main(added, removed);
    differ.diff_cleanupSemantic(diffs);
    
    function reconstruct(original: string, diffs: diff_match_patch.Diff[], sign: 1|-1) {
        let r: string[] = [];
        let sizeDiff = 0;
        let originIndex = 0;
        for(let d of diffs) {
            switch(d[0] * sign) {
                case 1:
                    r.push(original.substring(originIndex, originIndex + d[1].length));
                    originIndex+= d[1].length
                    sizeDiff-= d[1].length;
                    break;
                case -1:
                    sizeDiff+= d[1].length;
                    break;
                case 0: 
                    if(sizeDiff >= 0) {
                        r.push("·".repeat(Math.max(0, sizeDiff)));
                        sizeDiff = 0;
                    }
                    else {
                        for(let l = r.length -1; l>=0;l--) {
                            if(r[l][0] === '·') {
                                if(r[l].length < -sizeDiff) {
                                    sizeDiff+=r[l].length;
                                    r.splice(l, 1);
                                }else {
                                    r[l] = r[l].substring(0, r[l].length + sizeDiff);
                                    sizeDiff = 0;
                                }
                            }
                            if(sizeDiff === 0){
                                break;
                            }
                        }
                    }
                    r.push(original.substring(originIndex, originIndex + d[1].length));
                    originIndex+= d[1].length
            }
        }
        return r.join('');
    }
    diffs.push([0, '']);
    const addedWithSpaces =  reconstruct(added, diffs, -1);
    const removedWithSpaces = reconstruct(removed, diffs, 1);
    if(added.length === removed.length && (addedWithSpaces.length !== added.length || removed.length !== removedWithSpaces.length)) {
        debugger;
    }
    return { added: addedWithSpaces, removed: removedWithSpaces, diffs: getLineDiffs(addedWithSpaces, removedWithSpaces) };
    function* getLineDiffs(added: string, removed: string) {
        let lastType: LineDiffType = "same";
        let startIndex = 0;
        function makeSpan(i: number) {
            const text = 
                lastType === "added" ? added.substring(startIndex, i) :
                lastType === "new-reuse" ? "^".repeat(i - startIndex) :
                lastType === "reverted-reuse" ? "^".repeat(i - startIndex) :
                lastType === "removed" ? removed.substring(startIndex, i) :
                lastType === "unknown"? "^".repeat(i - startIndex) :
                added.substring(startIndex, i) ;
            return { type: lastType, start: startIndex, end: i, text }
        }
        const length = Math.max(added.length, removed.length)
        for (let i = 0; i < length; i++) {
            let newType: LineDiffType;
            if(added[i] === removed[i]) {
                newType = "same";
            }
            else if((added[i] === "·" || added[i] === " " || added[i] === undefined) && removed[i] !== undefined) {
                newType = removed[i] === "^" || removed[i] === "·" ? "new-reuse" : "removed"
            } 
            else if(removed[i] === "·" || removed[i] === " " || removed[i] === undefined) {
                newType = added[i] === "^" || added[i] === "·" ? "reverted-reuse" : "added"
            } else {
                newType = "unknown";
            }
            if (newType !== lastType) {

                yield makeSpan(i);

                lastType = newType;
                startIndex = i;
            }
        }
        yield makeSpan(length);
    }
}

export function* getAdditionsAndDeletions(diffLines: string[]) {
    for (let i = 4; i < diffLines.length; i++) {
        if (diffLines[i][0] === "-") {
            const  removedStart = i, start = i;
            while(diffLines[i][0] === "-") i++;
            const removedEnd = i;
            const addedStart = i;
            while(diffLines[i][0] === "+") i++;
            const addedEnd =i
            const end = i;
            yield {
                start,
                end,
                removedStart,
                removedEnd,
                addedStart,
                addedEnd,
                map<T>(fn: (added: string| undefined, removed: string| undefined, index: number) => T): T[] {
                    return Array
                        .from({ length: Math.max(addedEnd - addedStart, removedEnd - removedStart) })
                        .map((_, i) => fn(
                            (i + addedStart) < addedEnd ? diffLines[i+addedStart]: undefined,
                            (i + removedStart) < removedEnd ? diffLines[i+removedStart]: undefined,
                            i,
                        ))
                }
            }
        }
    }
}
export async function getDiff(file: string, baseCommit: string) {
    const result = await exec(`git diff ${baseCommit??""} ${file}`, ".");
    return result.stdout.split(/\r?\n/);
}

export async function getDiffFiles(baseCommit: string) {
    const result = await exec(`git diff --name-only ${baseCommit??""}`, ".");
    return result.stdout.split('\n');
}


type ExecuteResult = {
    error: childProcess.ExecException | null
    stdout: string,
    stderr: string,
}
export function exec(cmd: string, dir: string, showOutput = false) {
    return new Promise<ExecuteResult>((resolve) => {
        if (showOutput) console.log(`In ${dir} Executing: ${cmd}`);

        const ls = childProcess.spawn(cmd, [], {
            cwd: path.resolve(path.join(process.cwd(), dir)),
            shell: true
        });
        let stdout = ""
        let stderr = ""
        ls.stdout.on('data', function (data) {
            if (showOutput) {
                process.stdout.write('stdout: ' + data.toString());
            }
            stdout += data.toString();
        });

        ls.stderr.on('data', function (data) {
            if (showOutput) {
                process.stderr.write('stderr: ' + data.toString());
            }
            stderr += data.toString();
        });

        ls.on('error', function (err) {
            console.log(err);
        })
        ls.on('exit', function (code) {
            if (showOutput) console.log('exited:' + code?.toString());
            resolve({
                error: !code ? null : Object.assign(new Error(""), {
                    code,
                    cmd: cmd,
                }),
                stderr,
                stdout
            })
        });
    })
}

const typeLineRegex = /^[+-]>\s*:[\^\s]*$/;
export function isTypeReuseDiff(add: string, removed: string) {
    return !!typeLineRegex.exec(add) || !!typeLineRegex.exec(removed);
}
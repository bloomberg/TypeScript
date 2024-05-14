import { MappingItem, SourceMapConsumer, RawSourceMap } from "source-map";
import * as path from "path";

export async function makeSpanInfo(
    sources: TestUnitData[],
    dtsFiles: TestUnitData[],
    mapFileContent: string
) {
    const baseDir = ".";
    
    const allFiles = [...sources, ...dtsFiles]
    const mapData: RawSourceMap = JSON.parse(mapFileContent);
    const generated = readOrEmpty(path.join(baseDir, mapData.file));
    const generatedLines = generated?.split("\n") ?? [];
    const mappingSpans: Array<
        | MappingItem
        | {
              generatedLine: number;
              generatedColumn: number;
              generatedText: string;
              originalLine: number;
              originalColumn: number;
              sourceText: string;
          }
    > = [];
    function readOrEmpty(fileName: string) {
        try {
            let unit =  allFiles.find(f => f.name === fileName);
            if(unit === undefined) {
                const sameName = allFiles.filter(f => path.basename(f.name) === path.basename(fileName));
                if(sameName.length > 1) {
                    console.log(`Multiple candidates found when reading the file ${fileName}:`)
                    sameName.forEach((f, i) => console.log(`${i}: ${f}`));
                } else {
                    unit = sameName[0];
                }
            }
            return unit?.content;
        } catch {
            return undefined;
        }
    }
    await SourceMapConsumer.with(mapData, null, (consumer) => {
        const sources = new Map<string, string[]>();
        function getSource(name: string) {
            const fullFileName = path.join(
                baseDir,
                name ?? mapData.sources[0]
            );
            let data = sources.get(fullFileName);
            if (data === undefined) {
                let text;
                try {
                    text = readOrEmpty(fullFileName);
                } catch {
                    text = undefined;
                }
                data = text?.split("\n") ?? [];
                sources.set(name, data);
            }
            return data;
        }
        function getSpanText(
            text: (string | undefined)[],
            line: number,
            startCol: number,
            endCol: number
        ) {
            return (
                text[line - 1]?.substring(startCol, endCol) ?? "<MISSING>"
            );
        }
        let prevMapping: MappingItem | undefined;
        consumer.eachMapping(function (m) {
            if (
                prevMapping &&
                prevMapping.generatedLine === m.generatedLine
            ) {
                mappingSpans.push({
                    ...m,
                    generatedText: getSpanText(
                        generatedLines,
                        m.generatedLine,
                        prevMapping.generatedColumn,
                        m.generatedColumn
                    ),
                    sourceText: getSpanText(
                        getSource(m.source),
                        m.originalLine,
                        prevMapping.originalColumn,
                        m.originalColumn
                    ),
                });
            } else {
                mappingSpans.push(m);
            }
            prevMapping = m;
        });
    });

    return JSON.stringify(
        {
            ...mapData,
            mappings: mappingSpans,
        },
        undefined,
        2
    );
}

/** Splits the given string on \r\n, or on only \n if that fails, or on only \r if *that* fails. */
export function splitContentByNewlines(content: string) {
    // Split up the input file by line
    // Note: IE JS engine incorrectly handles consecutive delimiters here when using RegExp split, so
    // we have to use string-based splitting instead and try to figure out the delimiting chars
    let lines = content.split("\r\n");
    if (lines.length === 1) {
        lines = content.split("\n");

        if (lines.length === 1) {
            lines = content.split("\r");
        }
    }
    return lines;
}
export interface TestUnitData {
    content: string;
    name: string;
}


export interface TestCaseContent {
    testUnitData: TestUnitData[];
}


const optionRegex = /^[/]{2}\s*@(\w+)\s*:\s*([^\r\n]*)/gm; // multiple matches on multiple lines

export function makeUnitsFromTest(code: string, fileName: string): TestCaseContent {
    // List of all the subfiles we've parsed out
    const testUnitData: TestUnitData[] = [];

    const lines = splitContentByNewlines(code);

    // Stuff related to the subfile we're parsing
    let currentFileContent: string | undefined;
    let currentFileName: any;

    for (const line of lines) {
        let testMetaData: RegExpExecArray | null;
        if (testMetaData = optionRegex.exec(line)) {
            // Comment line, check for global/file @options and record them
            optionRegex.lastIndex = 0;
            const metaDataName = testMetaData[1].toLowerCase();
            if (metaDataName !== "filename") {
                continue;
            }

            // New metadata statement after having collected some code to go with the previous metadata
            if (currentFileName) {
                // Store result file
                const newTestFile = {
                    content: currentFileContent!, // TODO: GH#18217
                    name: currentFileName,
                };
                testUnitData.push(newTestFile);

                // Reset local data
                currentFileContent = undefined;
                currentFileName = testMetaData[2].trim();
            }
            else {
                // First metadata marker in the file
                currentFileName = testMetaData[2].trim();
            }
        }
        else {
            // Subfile content line
            // Append to the current subfile content, inserting a newline needed
            if (currentFileContent === undefined) {
                currentFileContent = "";
            }
            else if (currentFileContent !== "") {
                // End-of-line
                currentFileContent = currentFileContent + "\n";
            }
            currentFileContent = currentFileContent + line;
        }
    }

    // normalize the fileName for the single file case
    currentFileName = testUnitData.length > 0 || currentFileName ? currentFileName : path.basename(fileName);

    // EOF, push whatever remains
    const newTestFile2 = {
        content: currentFileContent || "",
        name: currentFileName,
    };
    testUnitData.push(newTestFile2);

    return { testUnitData };
}

export function getByteOrderMarkLength(text: string): number {
    if (text.length >= 1) {
        const ch0 = text.charCodeAt(0);
        if (ch0 === 0xfeff) return 1;
        if (ch0 === 0xfe) return text.length >= 2 && text.charCodeAt(1) === 0xff ? 2 : 0;
        if (ch0 === 0xff) return text.length >= 2 && text.charCodeAt(1) === 0xfe ? 2 : 0;
        if (ch0 === 0xef) return text.length >= 3 && text.charCodeAt(1) === 0xbb && text.charCodeAt(2) === 0xbf ? 3 : 0;
    }
    return 0;
}

export function removeByteOrderMark(text: string): string {
    const length = getByteOrderMarkLength(text);
    return length ? text.slice(length) : text;
}
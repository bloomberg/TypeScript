import * as fs from "fs/promises";

async function loadTestData(fileName: string) {
    const data:Record<string, number> = JSON.parse(await fs.readFile(fileName, { encoding: "utf-8" }))
    return  new Map(Object.entries(data).map(([test, time]) => [test, { test, time}]));
}

async function main() {
    const idTest = await loadTestData("C:/dev/TSC/TypeScript/.parallelperf.json");
    const mainTest = await loadTestData("C:/dev/TSC/ts-main/.parallelperf.json");
    
    const diff = [...mainTest.entries()].map(([key, value]) => ({
        ...value,
        path: value.test.slice(value.test.indexOf("://") + 3),
        time: (idTest.get(key)?.time ?? 0) - value.time,
        percent: (idTest.get(key)?.time ?? 0) / value.time,

    }))

    diff.sort((a, b) => b.time - a.time);

    const top = diff.slice(0, 10).sort((a, b) => a.percent - b.percent);
    console.log(top);
    console.log(top);
}

main();
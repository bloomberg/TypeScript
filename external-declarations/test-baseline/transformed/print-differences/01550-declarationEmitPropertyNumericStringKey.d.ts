// declarationEmitPropertyNumericStringKey.d.ts
declare const STATUS: {
    readonly "404": "not found";
};
declare const hundredStr = "100";
declare const obj: {
    "100": string;
};
declare const hundredNum = 100;
declare const obj2: {
    100: string;
};

// ==================
// Original test file: tsc-tests/updated-tests/compiler/declarationEmitPropertyNumericStringKey.ts
// // @declaration: true
// 
// // https://github.com/microsoft/TypeScript/issues/55292
// 
// const STATUS = {
//     ["404"]: "not found",
// } as const;
// 
// const hundredStr = "100";
// const obj = { [hundredStr]: "foo" };
// 
// const hundredNum = 100;
// const obj2 = { [hundredNum]: "bar" };
// 
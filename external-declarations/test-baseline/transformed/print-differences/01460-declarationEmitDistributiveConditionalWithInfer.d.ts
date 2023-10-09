// declarationEmitDistributiveConditionalWithInfer.d.ts
export declare const fun: (subFun: <Collection, Field extends keyof Collection>() => FlatArray<Collection[Field], 0>[]) => void;

// ==================
// Original test file: tsc-tests/updated-tests/compiler/declarationEmitDistributiveConditionalWithInfer.ts
// // @declaration: true
// // @lib: es2020
// // This function's type is changed on declaration
// export const fun = (
//     subFun: <Collection, Field extends keyof Collection>()
//         => FlatArray<Collection[Field], 0>[]): void => { };
// 
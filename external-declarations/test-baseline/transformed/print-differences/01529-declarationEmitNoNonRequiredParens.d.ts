// declarationEmitNoNonRequiredParens.d.ts
export declare enum Test {
    A = 0,
    B = 1,
    C = 2
}
export type TestType = typeof Test;
export declare const bar: Test[];

// ==================
// Original test file: tsc-tests/updated-tests/compiler/declarationEmitNoNonRequiredParens.ts
// // @declaration: true
// export enum Test {
//     A, B, C
// }
// 
// export type TestType = typeof Test;
// 
// export const bar = (null as TestType[Extract<keyof TestType, string>][]);
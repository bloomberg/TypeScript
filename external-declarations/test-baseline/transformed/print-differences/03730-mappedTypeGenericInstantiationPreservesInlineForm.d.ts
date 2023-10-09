// mappedTypeGenericInstantiationPreservesInlineForm.d.ts
export declare const test1: <T = Record<string, never>>(schema: {
    [K in keyof Required<T>]: T[K];
}) => void;
export declare function test2<T = Record<string, never>>(schema: {
    [K in keyof Required<T>]: T[K];
}): void;

// ==================
// Original test file: tsc-tests/updated-tests/compiler/mappedTypeGenericInstantiationPreservesInlineForm.ts
// // @strict: true
// // @declaration: true
// // @emitDeclarationOnly: true
// 
// // repro from #53109
// 
// export const test1 = <T = Record<string, never>>(schema: {
//     [K in keyof Required<T>]: T[K];
// }): void => {}
// 
// export function test2<T = Record<string, never>>(schema: {
//     [K in keyof Required<T>]: T[K];
// }): void {};
// 
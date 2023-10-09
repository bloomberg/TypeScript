// mappedTypeWithAsClauseAndLateBoundProperty2.d.ts
export declare const thing: {
    [K in keyof number[] as Exclude<K, "length">]: (number[])[K];
};

// ==================
// Original test file: tsc-tests/updated-tests/compiler/mappedTypeWithAsClauseAndLateBoundProperty2.ts
// // @target: ES2020
// // @declaration: true
// export const thing = (null as any as { [K in keyof number[] as Exclude<K, "length">]: (number[])[K] });
// 
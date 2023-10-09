// objectLiteralComputedNameNoDeclarationError.d.ts
export declare const Baa: {
    banana: number;
};

// ==================
// Original test file: tsc-tests/updated-tests/compiler/objectLiteralComputedNameNoDeclarationError.ts
// // @declaration: true
// const Foo = {
//     BANANA: 'banana' as 'banana',
// }
// 
// export const Baa = {
//     [Foo.BANANA]: 1
// };
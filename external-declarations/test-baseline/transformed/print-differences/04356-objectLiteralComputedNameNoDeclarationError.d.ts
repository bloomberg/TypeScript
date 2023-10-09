// objectLiteralComputedNameNoDeclarationError.d.ts
declare const Foo: {
    BANANA: "banana";
};
export declare const Baa: {
    [Foo.BANANA]: number;
};
export {};

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
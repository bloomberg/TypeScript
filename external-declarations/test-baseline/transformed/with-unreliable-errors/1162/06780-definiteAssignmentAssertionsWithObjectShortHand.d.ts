// definiteAssignmentAssertionsWithObjectShortHand.d.ts
declare const a: string | undefined;
declare const foo: {
    a: string;
};
declare const bar: {
    a?(): void;
};

// ==================
// Original test file: tsc-tests/updated-tests/conformance/controlFlow/definiteAssignmentAssertionsWithObjectShortHand.ts
// // @strict: true
// // @declaration: true
// 
// const a: string | undefined = 'ff';
// const foo: {
//     a: string;
// } = { a! }
// 
// const bar = {
//     a ? (): void { }
// }
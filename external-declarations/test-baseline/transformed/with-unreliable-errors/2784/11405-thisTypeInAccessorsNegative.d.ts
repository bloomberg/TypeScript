// thisTypeInAccessorsNegative.d.ts
interface Foo {
    n: number;
    x: number;
}
interface Bar {
    wrong: "place" | "time" | "method" | "technique";
}
declare const mismatch: {
    n: number;
    x: number;
};
declare const contextual: Foo;

// ==================
// Original test file: tsc-tests/updated-tests/conformance/types/thisType/thisTypeInAccessorsNegative.ts
// // @noImplicitAny: true
// // @noImplicitThis: true
// // @target: es5
// interface Foo {
//     n: number;
//     x: number;
// }
// interface Bar {
//     wrong: "place" | "time" | "method" | "technique";
// }
// const mismatch = {
//     n: 13,
//     get x(this: Foo) { return this.n; },
//     set x(this: Bar, n) { this.wrong = "method"; }
// }
// const contextual: Foo = {
//     n: 16,
//     get x() { return this.n; }
// }
// 
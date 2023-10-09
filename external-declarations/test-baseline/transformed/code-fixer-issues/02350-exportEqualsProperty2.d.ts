// a.d.ts
declare const _default: invalid;
export = _default;

// b.d.ts
export {};

// ==================
// Original test file: tsc-tests/updated-tests/compiler/exportEqualsProperty2.ts
// // This test is just like exportDefaultProperty2, but with `export =`.
// 
// // @Filename: a.ts
// class C {
//     static B: number;
// }
// namespace C {
//     export interface B { c: number }
// }
// 
// export = C.B;
// 
// // @Filename: b.ts
// import B = require("./a");
// const x: B = { c: B };
// 
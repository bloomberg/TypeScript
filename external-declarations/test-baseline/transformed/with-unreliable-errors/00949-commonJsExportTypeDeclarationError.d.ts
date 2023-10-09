// ./types1.d.ts
export type test = ;

// ./types2.d.ts
export type test = ;

// ./types3.d.ts
import test from "./test";
export type test = test;

// ==================
// Original test file: tsc-tests/updated-tests/compiler/commonJsExportTypeDeclarationError.ts
// // @esModuleInterop: true
// // @checkJs: true
// // @module: commonjs
// // @target: es5
// // @outDir: ./out
// 
// // @Filename: ./test.js
// module.exports = {
//    message: ""
// }
// 
// // @Filename: ./types1.ts
// import test from "./test";
// export type test
// 
// // @Filename: ./types2.ts
// import test from "./test";
// export type test = 
// 
// // @Filename: ./types3.ts
// import test from "./test";
// export type test = test;
// 
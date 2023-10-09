// a.d.ts
declare var x: string;

// ==================
// Original test file: tsc-tests/updated-tests/compiler/jsFileCompilationDuplicateVariableErrorReported.ts
// // @allowJs: true
// // @out: out.js
// // @declaration: true
// // @filename: b.js
// var x = "hello";
// 
// // @filename: a.ts
// var x = 10; // Error reported
// 
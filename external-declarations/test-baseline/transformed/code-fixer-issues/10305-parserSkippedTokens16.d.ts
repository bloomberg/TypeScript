// parserSkippedTokens16.d.ts
declare function Foo(): any;
declare namespace M {
}
declare var x: invalid;

// ==================
// Original test file: tsc-tests/updated-tests/conformance/parser/ecmascript5/SkippedTokens/parserSkippedTokens16.ts
// foo(): Bar { }
// function Foo      (): any ¬   { }
// 4+:5
// module M {
// function a(
//     : T) { }
// }
// var x       =
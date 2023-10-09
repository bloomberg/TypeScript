// parserCastVersusArrowFunction1.d.ts
declare var v: <T>() => number;
declare var v: <T>() => number;
declare var v: <T>() => number;
declare var v: <T>() => number;
declare var v: <T>() => number;
declare var v: <T>() => number;
declare var v: <T>() => number;
declare var v: <T>() => number;

// ==================
// Original test file: tsc-tests/updated-tests/conformance/parser/ecmascript5/Generics/parserCastVersusArrowFunction1.ts
// var v = <T>(): number => 1;
// var v = <T>a;
// 
// var v = <T>(a: any): number => 1;
// var v = <T>(a: any, b: any): number => 1;
// var v = <T>(a: number = 1, b: number = 2): number => 1;
// 
// var v = <T>(a);
// var v = <T>(a, b);
// var v = <T>(a = 1, b = 2);
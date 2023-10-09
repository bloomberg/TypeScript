// superSymbolIndexedAccess5.d.ts
declare var symbol: any;
declare class Foo {
    [symbol](): number;
}
declare class Bar extends Foo {
    [symbol](): any;
}

// ==================
// Original test file: tsc-tests/updated-tests/conformance/expressions/superPropertyAccess/superSymbolIndexedAccess5.ts
// //@target: ES5
// var symbol: any;
// 
// class Foo {
//     [symbol](): number {
//         return 0;
//     }
// }
// 
// class Bar extends Foo {
//     [symbol](): any {
//         return super[symbol]();
//     }
// }
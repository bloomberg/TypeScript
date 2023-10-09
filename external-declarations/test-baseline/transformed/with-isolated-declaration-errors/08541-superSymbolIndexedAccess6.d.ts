// superSymbolIndexedAccess6.d.ts
declare var symbol: any;
declare class Foo {
    static [symbol](): number;
}
declare class Bar extends Foo {
    static [symbol](): any;
}

// ==================
// Original test file: tsc-tests/updated-tests/conformance/expressions/superPropertyAccess/superSymbolIndexedAccess6.ts
// //@target: ES5
// var symbol: any;
// 
// class Foo {
//     static [symbol](): number {
//         return 0;
//     }
// }
// 
// class Bar extends Foo {
//     static [symbol](): any {
//         return super[symbol]();
//     }
// }
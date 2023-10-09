// superSymbolIndexedAccess1.d.ts
declare var symbol: symbol;
declare class Foo {
}
declare class Bar extends Foo {
}

// ==================
// Original test file: tsc-tests/updated-tests/conformance/expressions/superPropertyAccess/superSymbolIndexedAccess1.ts
// //@target: ES6
// var symbol: symbol = Symbol.for('myThing');
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
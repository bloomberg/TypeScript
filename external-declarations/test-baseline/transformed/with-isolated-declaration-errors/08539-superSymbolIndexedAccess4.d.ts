// superSymbolIndexedAccess4.d.ts
declare var symbol: symbol;
declare class Bar {
}

// ==================
// Original test file: tsc-tests/updated-tests/conformance/expressions/superPropertyAccess/superSymbolIndexedAccess4.ts
// //@target: ES6
// var symbol: symbol = Symbol.for('myThing');
// 
// class Bar {
//     [symbol](): any {
//         return super[symbol]();
//     }
// }
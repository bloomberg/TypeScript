// ES5SymbolProperty1.d.ts
interface SymbolConstructor {
    foo: string;
}
declare var Symbol: SymbolConstructor;
declare var obj: invalid;

// ==================
// Original test file: ../tests/cases/conformance/Symbols/ES5SymbolProperty1.ts
// //@target: ES5
// interface SymbolConstructor {
//     foo: string;
// }
// var Symbol: SymbolConstructor;
// 
// var obj = {
//     [Symbol.foo]: 0
// }
// 
// obj[Symbol.foo];
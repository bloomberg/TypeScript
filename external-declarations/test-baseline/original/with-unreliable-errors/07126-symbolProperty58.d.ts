// symbolProperty58.d.ts
interface SymbolConstructor {
    foo: string;
}
declare var obj: {
    [Symbol.foo]: number;
};

// ==================
// Original test file: ../tests/cases/conformance/es6/Symbols/symbolProperty58.ts
// //@target: ES6
// interface SymbolConstructor {
//     foo: string;
// }
// 
// var obj = {
//     [Symbol.foo]: 0
// }
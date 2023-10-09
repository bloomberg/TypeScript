// parserES5SymbolProperty1.d.ts
interface I {
    [Symbol.iterator]: string;
}

// ==================
// Original test file: tsc-tests/updated-tests/conformance/parser/ecmascript5/Symbols/parserES5SymbolProperty1.ts
// //@target: ES5
// interface I {
//     [Symbol.iterator]: string;
// }
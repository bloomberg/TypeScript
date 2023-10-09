// parserES5SymbolProperty2.d.ts
interface I {
    [Symbol.unscopables](): string;
}

// ==================
// Original test file: ../tests/cases/conformance/parser/ecmascript5/Symbols/parserES5SymbolProperty2.ts
// //@target: ES5
// interface I {
//     [Symbol.unscopables](): string;
// }
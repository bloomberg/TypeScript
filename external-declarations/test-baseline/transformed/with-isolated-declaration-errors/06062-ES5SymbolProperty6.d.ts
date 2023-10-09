// ES5SymbolProperty6.d.ts
declare class C {
    [Symbol.iterator](): void;
}

// ==================
// Original test file: tsc-tests/updated-tests/conformance/Symbols/ES5SymbolProperty6.ts
// //@target: ES5
// class C {
//     [Symbol.iterator](): void { }
// }
// 
// (new C)[Symbol.iterator]
// ES5SymbolProperty5.d.ts
declare var Symbol: {
    iterator: symbol;
};
declare class C {
    [Symbol.iterator](): void;
}

// ==================
// Original test file: tsc-tests/updated-tests/conformance/Symbols/ES5SymbolProperty5.ts
// //@target: ES5
// var Symbol: { iterator: symbol };
// 
// class C {
//     [Symbol.iterator](): void { }
// }
// 
// (new C)[Symbol.iterator](0) // Should error
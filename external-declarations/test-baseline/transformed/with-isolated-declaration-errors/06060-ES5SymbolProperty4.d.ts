// ES5SymbolProperty4.d.ts
declare var Symbol: {
    iterator: string;
};
declare class C {
}

// ==================
// Original test file: tsc-tests/updated-tests/conformance/Symbols/ES5SymbolProperty4.ts
// //@target: ES5
// var Symbol: { iterator: string };
// 
// class C {
//     [Symbol.iterator](): void { }
// }
// 
// (new C)[Symbol.iterator]
// ES5SymbolProperty7.d.ts
declare var Symbol: {
    iterator: any;
};
declare class C {
}

// ==================
// Original test file: tsc-tests/updated-tests/conformance/Symbols/ES5SymbolProperty7.ts
// //@target: ES5
// var Symbol: { iterator: any };
// 
// class C {
//     [Symbol.iterator](): void { }
// }
// 
// (new C)[Symbol.iterator]
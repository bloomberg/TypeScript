// ES5SymbolProperty3.d.ts
declare var Symbol: any;
declare class C {
    [Symbol.iterator](): void;
}

// ==================
// Original test file: tsc-tests/updated-tests/conformance/Symbols/ES5SymbolProperty3.ts
// //@target: ES5
// var Symbol: any;
// 
// class C {
//     [Symbol.iterator](): void { }
// }
// 
// (new C)[Symbol.iterator]
// ES5SymbolProperty2.d.ts
declare namespace M {
    var Symbol: any;
    export class C {
        [Symbol.iterator](): void;
    }
    export {};
}

// ==================
// Original test file: tsc-tests/updated-tests/conformance/Symbols/ES5SymbolProperty2.ts
// //@target: ES5
// module M {
//     var Symbol: any;
// 
//     export class C {
//         [Symbol.iterator](): void { }
//     }
//     (new C)[Symbol.iterator];
// }
// 
// (new M.C)[Symbol.iterator];
// excessPropertyCheckWithSpread.d.ts
declare function f({ a: number }: {
    a: any;
}): void;
interface I {
    readonly n: number;
}
declare let i: I;
interface R {
    opt?: number;
}
interface L {
    opt: string;
}
declare let l: L;
declare let r: R;

// ==================
// Original test file: tsc-tests/updated-tests/compiler/excessPropertyCheckWithSpread.ts
// declare function f({ a: number }: {
//         a: any;
//     }): void
// interface I {
//     readonly n: number;
// }
// declare let i: I;
// f({ a: 1, ...i });
// 
// interface R {
//     opt?: number
// }
// interface L {
//     opt: string
// }
// declare let l: L;
// declare let r: R;
// f({ a: 1, ...l, ...r });
// 
// overloadsWithComputedNames.d.ts
declare class Person {
    ["B"](a: number): string;
    ["A"](a: string | number): number | string;
}
declare let p: Person;
declare class C {
    ["foo"](): void;
    ["bar"](): void;
}
declare const uniqueSym: unique symbol;
declare const uniqueSym2: unique symbol;
declare const sym: symbol;
declare const strUnion: 'foo' | 'bar';
declare class C1 {
    [sym](): void;
    [uniqueSym2](): void;
    [uniqueSym](): void;
}
interface I1 {
    [sym](): void;
    [uniqueSym2](): void;
    [uniqueSym](): void;
    [uniqueSym](): void;
}
declare class C2 {
    [strUnion](): void;
}
declare class I2 {
    [strUnion](): void;
}
declare class C3 {
    [1](): void;
    [2](): void;
}
interface I3 {
    [1](): void;
    [2](): void;
    [2](): void;
}

// ==================
// Original test file: tsc-tests/updated-tests/compiler/overloadsWithComputedNames.ts
// // https://github.com/microsoft/TypeScript/issues/52329
// class Person {
//     ["B"](a: number): string;
//     ["A"](a: string|number): number | string {
//       return 0;
//     }
// }
// let p: Person = new Person();
// p.A(0)
// p.B(0)
// 
// // https://github.com/microsoft/TypeScript/issues/17345
// class C {
//     ["foo"](): void
//     ["bar"](): void;
//     ["foo"]() {
//         return 0;
//     }
// }
// 
// declare const uniqueSym: unique symbol;
// declare const uniqueSym2: unique symbol;
// declare const sym: symbol;
// 
// declare const strUnion: 'foo' | 'bar';
// 
// class C1 {
//     [sym](): void;  // should error
//     [uniqueSym2](): void;   // should error
//     [uniqueSym](): void;
//     [uniqueSym]() { }
// }
// 
// interface I1 {
//     [sym](): void;  // should error
//     [uniqueSym2](): void;
//     [uniqueSym](): void;
//     [uniqueSym](): void;
// }
// 
// class C2 {
//     [strUnion](): void; // should error
//     [strUnion](): void { }
// }
// 
// class I2 {
//     [strUnion](): void; // should error
//     [strUnion](): void { }
// }
// 
// class C3 {
//     [1](): void;  // should error
//     [2](): void;
//     [2]() { }
// }
// 
// interface I3 {
//     [1](): void;
//     [2](): void;
//     [2](): void;
// }
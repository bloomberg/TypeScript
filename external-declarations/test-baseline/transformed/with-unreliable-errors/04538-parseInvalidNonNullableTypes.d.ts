// parseInvalidNonNullableTypes.d.ts
declare function f1(a: string): a is !string;
declare function f2(a: string): a is !string;
declare function f3(a: !string): void;
declare function f4(a: !number): void;
declare function f5(a: !string): void;
declare function f6(a: !number): void;
declare function f7(): !string;
declare function f8(): !string;
declare const a: any;
declare const b: !number;
declare const c: any;
declare const d: !number;

// ==================
// Original test file: tsc-tests/updated-tests/compiler/parseInvalidNonNullableTypes.ts
// // @strict: true
// 
// function f1(a: string): a is string! {
//     return true;
// }
// 
// function f2(a: string): a is !string {
//     return true;
// }
// 
// function f3(a: string!): void {}
// function f4(a: number!): void {}
// 
// function f5(a: !string): void {}
// function f6(a: !number): void {}
// 
// function f7(): string! {}
// function f8(): !string {}
// 
// const a = 1 as any!;
// const b: number! = 1;
// 
// const c = 1 as !any;
// const d: !number = 1;
// 
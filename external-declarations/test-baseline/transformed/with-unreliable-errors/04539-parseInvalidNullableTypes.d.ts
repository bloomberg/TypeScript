// parseInvalidNullableTypes.d.ts
declare function f1(a: string): a is ?string;
declare function f2(a: ?string): void;
declare function f3(a: ?number): void;
declare function f4(a: ?string): void;
declare function f5(a: ?number): void;
declare function f6(a: string): ?string;
declare const a: any;
declare const b: ?number;
declare const c: any;
declare const d: ?number;
declare let e: ?unknown;
declare let f: ?never;
declare let g: ?void;
declare let h: ?undefined;

// ==================
// Original test file: tsc-tests/updated-tests/compiler/parseInvalidNullableTypes.ts
// // @strict: true
// 
// function f1(a: string): a is ?string {
//     return true;
// }
// 
// function f2(a: string?): void {}
// function f3(a: number?): void {}
// 
// function f4(a: ?string): void {}
// function f5(a: ?number): void {}
// 
// function f6(a: string): ?string {
//     return true;
// }
// 
// const a = 1 as any?;
// const b: number? = 1;
// 
// const c = 1 as ?any;
// const d: ?number = 1;
// 
// let e: unknown?;
// let f: never?;
// let g: void?;
// let h: undefined?;
// 
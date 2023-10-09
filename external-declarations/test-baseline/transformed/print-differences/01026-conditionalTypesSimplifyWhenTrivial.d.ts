// conditionalTypesSimplifyWhenTrivial.d.ts
declare const fn1: <Params>(params: Pick<Params, Exclude<keyof Params, never>>) => Params;
declare function fn2<T>(x: Exclude<T, never>): void;
declare const fn3: <Params>(params: Pick<Params, Extract<keyof Params, keyof Params>>) => Params;
declare function fn4<T>(x: Extract<T, T>): void;
declare var x: Extract<number | string, any>;
type ExtractWithDefault<T, U, D = never> = T extends U ? T : D;
type ExcludeWithDefault<T, U, D = never> = T extends U ? D : T;
declare const fn5: <Params>(params: Pick<Params, ExcludeWithDefault<keyof Params, never, never>>) => Params;
declare function fn6<T>(x: ExcludeWithDefault<T, never>): void;
declare const fn7: <Params>(params: Pick<Params, ExtractWithDefault<keyof Params, keyof Params, never>>) => Params;
declare function fn8<T>(x: ExtractWithDefault<T, T>): void;
type TemplatedConditional<TCheck, TExtends, TTrue, TFalse> = TCheck extends TExtends ? TTrue : TFalse;
declare const fn9: <Params>(params: Pick<Params, TemplatedConditional<keyof Params, never, never, keyof Params>>) => Params;
declare function fn10<T>(x: TemplatedConditional<T, never, never, T>): void;
declare const fn11: <Params>(params: Pick<Params, TemplatedConditional<keyof Params, keyof Params, keyof Params, never>>) => Params;
declare function fn12<T>(x: TemplatedConditional<T, T, T, never>): void;
declare var z: any;
declare const zee: any;

// ==================
// Original test file: tsc-tests/updated-tests/compiler/conditionalTypesSimplifyWhenTrivial.ts
// // @strict: true
// const fn1 = <Params>(
//     params: Pick<Params, Exclude<keyof Params, never>>,
// ): Params => params;
// 
// function fn2<T>(x: Exclude<T, never>): void {
//     var y: T = x;
//     x = y;
// }
// 
// const fn3 = <Params>(
//     params: Pick<Params, Extract<keyof Params, keyof Params>>,
// ): Params => params;
// 
// function fn4<T>(x: Extract<T, T>): void {
//     var y: T = x;
//     x = y;
// }
// 
// declare var x: Extract<number | string, any>; // Should be `numebr | string` and not `any`
// 
// type ExtractWithDefault<T, U, D = never> = T extends U ? T : D;
// 
// type ExcludeWithDefault<T, U, D = never> = T extends U ? D : T;
// 
// const fn5 = <Params>(
//     params: Pick<Params, ExcludeWithDefault<keyof Params, never>>,
// ): Params => params;
// 
// function fn6<T>(x: ExcludeWithDefault<T, never>): void {
//     var y: T = x;
//     x = y;
// }
// 
// const fn7 = <Params>(
//     params: Pick<Params, ExtractWithDefault<keyof Params, keyof Params>>,
// ): Params => params;
// 
// function fn8<T>(x: ExtractWithDefault<T, T>): void {
//     var y: T = x;
//     x = y;
// }
// 
// type TemplatedConditional<TCheck, TExtends, TTrue, TFalse> = TCheck extends TExtends ? TTrue : TFalse;
// 
// const fn9 = <Params>(
//     params: Pick<Params, TemplatedConditional<keyof Params, never, never, keyof Params>>,
// ): Params => params;
// 
// function fn10<T>(x: TemplatedConditional<T, never, never, T>): void {
//     var y: T = x;
//     x = y;
// }
// 
// const fn11 = <Params>(
//     params: Pick<Params, TemplatedConditional<keyof Params, keyof Params, keyof Params, never>>,
// ): Params => params;
// 
// function fn12<T>(x: TemplatedConditional<T, T, T, never>): void {
//     var y: T = x;
//     x = y;
// }
// 
// declare var z: any;
// const zee: any = z!!!; // since x is `any`, `x extends null | undefined` should be both true and false - and thus yield `any` 
// 
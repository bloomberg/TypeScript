// unusedTypeParametersNotCheckedByNoUnusedLocals.d.ts
declare function f<T>(): void;
type T<T> = {};
interface I<T> {
}
declare class C<T> {
    m<V>(): void;
}
declare let l: <T_1>() => void;

// ==================
// Original test file: tsc-tests/updated-tests/compiler/unusedTypeParametersNotCheckedByNoUnusedLocals.ts
// //@noUnusedLocals:true
// 
// function f<T>(): void { }
// 
// type T<T> = { };
// 
// interface I<T> { };
// 
// class C<T> {
//     public m<V>(): void { }
// };
// 
// let l = <T>(): void => { };
// 
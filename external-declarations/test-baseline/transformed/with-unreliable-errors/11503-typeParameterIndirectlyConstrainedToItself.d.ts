// typeParameterIndirectlyConstrainedToItself.d.ts
declare class C<U extends T, T extends U> {
}
declare class C2<T extends U, U extends V, V extends T> {
}
interface I<U extends T, T extends U> {
}
interface I2<T extends U, U extends V, V extends T> {
}
declare function f<U extends T, T extends U>(): void;
declare function f2<T extends U, U extends V, V extends T>(): void;
declare var a: {
    <U extends T, T extends U>(): void;
    <T extends U, U extends V, V extends T>(): void;
};
declare var b: <U, T>() => void;
declare var b2: <T, U, V>() => void;
declare class D<U extends T, T extends V, V extends T> {
}
type Foo<T> = [T] extends [number] ? {} : {};
declare function foo<S extends Foo<S>>(): void;

// ==================
// Original test file: tsc-tests/updated-tests/conformance/types/typeParameters/typeParameterLists/typeParameterIndirectlyConstrainedToItself.ts
// class C<U extends T, T extends U> { }
// class C2<T extends U, U extends V, V extends T> { }
// 
// interface I<U extends T, T extends U> { }
// interface I2<T extends U, U extends V, V extends T> { }
// 
// function f<U extends T, T extends U>(): void { }
// function f2<T extends U, U extends V, V extends T>(): void { }
// 
// var a: {
//     <U extends T, T extends U>(): void;
//     <T extends U, U extends V, V extends T>(): void;
// }
// 
// var b = <U extends T, T extends U>(): void => { }
// var b2 = <T extends U, U extends V, V extends T>(): void => { }
// 
// class D<U extends T, T extends V, V extends T> { }
// 
// // Repro from #25740
// 
// type Foo<T> = [T] extends [number] ? {} : {};
// function foo<S extends Foo<S>>(): void {}
// 
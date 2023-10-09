// typeParameterDirectlyConstrainedToItself.d.ts
declare class C<T extends T> {
}
declare class C2<T, U extends U> {
}
interface I<T extends T> {
}
interface I2<T, U extends U> {
}
declare function f<T extends T>(): void;
declare function f2<T, U extends U>(): void;
declare var a: {
    <T extends T>(): void;
    <T, U extends U>(): void;
};
declare var b: <T>() => void;
declare var b2: <T, U>() => void;

// ==================
// Original test file: tsc-tests/updated-tests/conformance/types/typeParameters/typeParameterLists/typeParameterDirectlyConstrainedToItself.ts
// // all of the below should be errors
// 
// class C<T extends T> { } 
// class C2<T, U extends U> { } 
// 
// interface I<T extends T> { }
// interface I2<T, U extends U> { }
// 
// function f<T extends T>(): void { }
// function f2<T, U extends U>(): void { }
// 
// var a: {
//     <T extends T>(): void;
//     <T, U extends U>(): void;
// }
// 
// var b = <T extends T>(): void => { }
// var b2 = <T, U extends U>(): void => { }
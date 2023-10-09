// genericsWithDuplicateTypeParameters1.d.ts
declare function f<x, x>(): void;
declare function f2<X, X>(a: X, b: X): X;
declare class C<X, X> {
    f<x, x>(): void;
    f2<X, X>(a: X, b: X): X;
}
interface I<X, X> {
    f<X, X>(): any;
    f2<X, X>(a: X, b: X): X;
}
declare var m: {
    a: <X, X>() => void;
    b: <X, X>(a: X, b: X) => X;
};

// ==================
// Original test file: tsc-tests/updated-tests/compiler/genericsWithDuplicateTypeParameters1.ts
// function f<x, x>(): void { }
// function f2<X, X>(a: X, b: X): X { return null; }
// class C<X, X> {
//     public f<x, x>(): void {}
//     public f2<X, X>(a: X, b: X): X { return null; }
// }
// 
// interface I<X, X> {
//     f<X, X>();
//     f2<X, X>(a: X, b: X): X;
// }
// 
// var m = {
//     a: function f<X, X>(): void {},
//     b: function f2<X, X>(a: X, b: X): X { return null; }
// }
// genericTypeReferenceWithoutTypeArgument2.d.ts
interface I<T> {
    foo: T;
}
declare var c: I;
declare var a: {
    x: I;
};
declare var b: {
    (x: I): I;
};
declare var d: {
    [x: I]: I;
};
declare var e: (x: any) => any;
declare function f(x: I): I;
declare var g: (x: any) => any;
declare class D extends I {
}
interface U extends I {
}
declare namespace M {
    interface E<T> {
        foo: T;
    }
}
declare class D2 extends M.C {
}
interface D3<T extends M.E> {
}
interface I2 extends M.C {
}
declare function h<T extends I>(x: T): void;
declare function i<T extends M.E>(x: T): void;
declare var j: C;
declare var k: any;

// ==================
// Original test file: tsc-tests/updated-tests/conformance/types/specifyingTypes/typeReferences/genericTypeReferenceWithoutTypeArgument2.ts
// // it is an error to use a generic type without type arguments
// // all of these are errors 
// 
// interface I<T> {
//     foo: T;
// }
// 
// var c: I;
// 
// var a: { x: I };
// var b: { (x: I): I };
// var d: { [x: I]: I };
// 
// var e = (x: I): any => { var y: I; return y; }
// 
// function f(x: I): I { var y: I; return y; }
// 
// var g = function f(x: I): I { var y: I; return y; }
// 
// class D extends I {
// }
// 
// interface U extends I {}
// 
// module M {
//     export interface E<T> { foo: T }
// }
// 
// class D2 extends M.C { }
// interface D3<T extends M.E> { }
// interface I2 extends M.C { }
// 
// function h<T extends I>(x: T): void { }
// function i<T extends M.E>(x: T): void { }
// 
// var j = <C>null;
// var k = <M.E>null;
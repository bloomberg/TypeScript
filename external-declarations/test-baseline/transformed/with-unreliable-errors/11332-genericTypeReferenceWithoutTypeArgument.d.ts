// genericTypeReferenceWithoutTypeArgument.d.ts
declare class C<T> {
    foo: T;
}
declare var c: C;
declare var a: {
    x: C;
};
declare var b: {
    (x: C): C;
};
declare var d: {
    [x: C]: C;
};
declare var e: (x: any) => any;
declare function f(x: C): C;
declare var g: (x: any) => any;
declare class D extends C {
}
interface I extends C {
}
declare namespace M {
    class E<T> {
        foo: T;
    }
}
declare class D2 extends M.E {
}
declare class D3<T extends M.E> {
}
interface I2 extends M.E {
}
declare function h<T extends C>(x: T): void;
declare function i<T extends M.E>(x: T): void;
declare var j: any;
declare var k: any;

// ==================
// Original test file: tsc-tests/updated-tests/conformance/types/specifyingTypes/typeReferences/genericTypeReferenceWithoutTypeArgument.ts
// // it is an error to use a generic type without type arguments
// // all of these are errors 
// 
// class C<T> {
//     foo: T;
// }
// 
// var c: C;
// 
// var a: { x: C };
// var b: { (x: C): C };
// var d: { [x: C]: C };
// 
// var e = (x: C): any => { var y: C; return y; }
// 
// function f(x: C): C { var y: C; return y; }
// 
// var g = function f(x: C): C { var y: C; return y; }
// 
// class D extends C {
// }
// 
// interface I extends C {}
// 
// module M {
//     export class E<T> { foo: T }
// }
// 
// class D2 extends M.E { }
// class D3<T extends M.E> { }
// interface I2 extends M.E { }
// 
// function h<T extends C>(x: T): void { }
// function i<T extends M.E>(x: T): void { }
// 
// var j = <C>null;
// var k = <M.E>null;
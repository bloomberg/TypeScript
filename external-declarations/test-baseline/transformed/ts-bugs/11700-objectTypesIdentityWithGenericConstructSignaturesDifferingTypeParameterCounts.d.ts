// objectTypesIdentityWithGenericConstructSignaturesDifferingTypeParameterCounts.d.ts
declare class B<U, V> {
    constructor(x: U);
}
declare class C<V, W, X> {
    constructor(x: V);
}
interface I<X, Y, Z, A> {
    new (x: X): B<X, Y>;
}
interface I2 {
    new <Y, Z, A, B>(x: Y): C<Y, Z, A>;
}
declare var a: {
    new <Z, A, B, CC, D>(x: Z): C<Z, A, B>;
};
declare var b: {
    new<A, B, C, D, E, F>(x: A): A;
};
declare function foo1b(x: B<string, string>): any;
declare function foo1b(x: B<string, string>): any;
declare function foo1c(x: C<string, number, boolean>): any;
declare function foo1c(x: C<string, number, boolean>): any;
declare function foo2(x: I<string, boolean, number, string>): any;
declare function foo2(x: I<string, boolean, number, string>): any;
declare function foo3(x: typeof a): any;
declare function foo3(x: typeof a): any;
declare function foo4(x: typeof b): any;
declare function foo4(x: typeof b): any;
declare function foo8(x: B<string, string>): any;
declare function foo8(x: I<string, string, boolean, Date>): any;
declare function foo9(x: B<string, number>): any;
declare function foo9(x: C<string, number, B<string, string>>): any;
declare function foo10(x: B<string, boolean>): any;
declare function foo10(x: typeof a): any;
declare function foo11(x: B<string, boolean>): any;
declare function foo11(x: typeof b): any;
declare function foo12(x: I<B<string, number>, number, Date, string>): any;
declare function foo12(x: C<B<string, number>, number, Date>): any;
declare function foo12b(x: I2): any;
declare function foo12b(x: C<string, string, boolean>): any;
declare function foo13(x: I<string, Date, RegExp, Date>): any;
declare function foo13(x: typeof a): any;
declare function foo14(x: I<string, Date, RegExp, boolean>): any;
declare function foo14(x: typeof b): any;

// ==================
// Original test file: tsc-tests/updated-tests/conformance/types/typeRelationships/typeAndMemberIdentity/objectTypesIdentityWithGenericConstructSignaturesDifferingTypeParameterCounts.ts
// // object types are identical structurally
// 
// class B<U, V> {
//     constructor(x: U) { return null; }
// }
// 
// class C<V, W, X> {
//     constructor(x: V) { return null; }
// }
// 
// interface I<X, Y, Z, A> {
//     new(x: X): B<X,Y>;
// }
// 
// interface I2 {
//     new <Y, Z, A, B>(x: Y): C<Y, Z, A>;
// }
// 
// var a: { new <Z, A, B, CC, D>(x: Z): C<Z, A, B>; }
// var b = { new<A, B, C, D, E, F>(x: A): A { return x; } };
// 
// function foo1b(x: B<string, string>): any;
// function foo1b(x: B<string, string>): any; // error
// function foo1b(x: any) { }
// 
// function foo1c(x: C<string, number, boolean>): any;
// function foo1c(x: C<string, number, boolean>): any; // error
// function foo1c(x: any) { }
// 
// function foo2(x: I<string, boolean, number, string>): any;
// function foo2(x: I<string, boolean, number, string>): any; // error
// function foo2(x: any) { }
// 
// function foo3(x: typeof a): any;
// function foo3(x: typeof a): any; // error
// function foo3(x: any) { }
// 
// function foo4(x: typeof b): any;
// function foo4(x: typeof b): any; // error
// function foo4(x: any) { }
// 
// function foo8(x: B<string, string>): any;
// function foo8(x: I<string, string, boolean, Date>): any; // BUG 832086
// function foo8(x: any) { }
// 
// function foo9(x: B<string, number>): any;
// function foo9(x: C<string, number, B<string, string>>): any; // error
// function foo9(x: any) { }
// 
// function foo10(x: B<string, boolean>): any;
// function foo10(x: typeof a): any; // ok
// function foo10(x: any) { }
// 
// function foo11(x: B<string, boolean>): any;
// function foo11(x: typeof b): any; // ok
// function foo11(x: any) { }
// 
// function foo12(x: I<B<string, number>, number, Date, string>): any;
// function foo12(x: C<B<string, number>, number, Date>): any; // ok
// function foo12(x: any) { }
// 
// function foo12b(x: I2): any;
// function foo12b(x: C<string, string, boolean>): any; // BUG 832086
// function foo12b(x: any) { }
// 
// function foo13(x: I<string, Date, RegExp, Date>): any;
// function foo13(x: typeof a): any; // ok
// function foo13(x: any) { }
// 
// function foo14(x: I<string, Date, RegExp, boolean>): any;
// function foo14(x: typeof b): any; // ok
// function foo14(x: any) { }
// objectTypesIdentityWithGenericCallSignaturesDifferingTypeParameterCounts.d.ts
declare class A {
    foo<T>(x: T): T;
}
declare class B<U, V> {
    foo(x: U): U;
}
declare class C<V, W, X> {
    foo(x: V): V;
}
interface I<X, Y, Z, A> {
    foo(x: X): X;
}
interface I2 {
    foo<Y, Z, A, B>(x: Y): Y;
}
declare var a: {
    foo<Z, A, B, C, D>(x: Z): Z;
};
declare var b: {
    foo<A_1, B_1, C_1, D, E, F>(x: A_1): A_1;
};
declare function foo1(x: A): any;
declare function foo1(x: A): any;
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
declare function foo5(x: A): any;
declare function foo5(x: B<string, string>): any;
declare function foo5b(x: A): any;
declare function foo5b(x: C<string, number, boolean>): any;
declare function foo6(x: A): any;
declare function foo6(x: I<string, number, boolean, Date>): any;
declare function foo7(x: A): any;
declare function foo7(x: typeof a): any;
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
declare function foo15(x: I2): any;
declare function foo15(x: C<number, B<string, string>, B<number, string>>): any;

// ==================
// Original test file: tsc-tests/updated-tests/conformance/types/typeRelationships/typeAndMemberIdentity/objectTypesIdentityWithGenericCallSignaturesDifferingTypeParameterCounts.ts
// // object types are identical structurally
// 
// class A {
//     foo<T>(x: T): T { return null; }
// }
// 
// class B<U, V> {
//     foo(x: U): U { return null; }
// }
// 
// class C<V, W, X> {
//     foo(x: V): V { return null; }
// }
// 
// interface I<X, Y, Z, A> {
//     foo(x: X): X;
// }
// 
// interface I2 {
//     foo<Y, Z, A, B>(x: Y): Y;
// }
// 
// var a: { foo<Z, A, B, C, D>(x: Z): Z }
// var b = { foo<A, B, C, D, E, F>(x: A): A { return x; } };
// 
// function foo1(x: A): any;
// function foo1(x: A): any; // error
// function foo1(x: any) { }
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
// function foo5(x: A): any;
// function foo5(x: B<string, string>): any; // ok
// function foo5(x: any) { }
// 
// function foo5b(x: A): any;
// function foo5b(x: C<string, number, boolean>): any; // ok
// function foo5b(x: any) { }
// 
// function foo6(x: A): any;
// function foo6(x: I<string, number, boolean, Date>): any; // ok
// function foo6(x: any) { }
// 
// function foo7(x: A): any;
// function foo7(x: typeof a): any; // no error, bug?
// function foo7(x: any) { }
// 
// function foo8(x: B<string, string>): any;
// function foo8(x: I<string, string, boolean, Date>): any; // error
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
// function foo12(x: C<B<string, number>, number, Date>): any; // error
// function foo12(x: any) { }
// 
// function foo12b(x: I2): any;
// function foo12b(x: C<string, string, boolean>): any; // ok
// function foo12b(x: any) { }
// 
// function foo13(x: I<string, Date, RegExp, Date>): any;
// function foo13(x: typeof a): any; // ok
// function foo13(x: any) { }
// 
// function foo14(x: I<string, Date, RegExp, boolean>): any;
// function foo14(x: typeof b): any; // ok
// function foo14(x: any) { }
// 
// function foo15(x: I2): any;
// function foo15(x: C<number, B<string, string>, B<number, string>>): any; // ok
// function foo15(x: any) { }
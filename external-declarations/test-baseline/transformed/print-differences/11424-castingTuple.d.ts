// castingTuple.d.ts
interface I {
}
declare class A {
    a: number;
}
declare class C implements I {
    c: any;
}
declare class D implements I {
    d: any;
}
declare class E extends A {
    e: any;
}
declare class F extends A {
    f: any;
}
declare enum E1 {
    one = 0
}
declare enum E2 {
    one = 0
}
declare var numStrTuple: [number, string];
declare var emptyObjTuple: [{}, {}];
declare var numStrBoolTuple: [number, string, boolean];
declare var shorter: [number, string];
declare var longer: [number, string, boolean];
declare var classCDTuple: [C, D];
declare var interfaceIITuple: [I, I];
declare var classCDATuple: [C, D, A];
declare var eleFromCDA1: A;
declare var eleFromCDA2: undefined;
declare var t10: [E1, E2];
declare var t11: [number, number];
declare var array1: {}[];
declare var unionTuple: [C, string | number];
declare var unionTuple2: [C, string | number, D];
declare var unionTuple3: [number, string | number];
declare var unionTuple4: [number, number];
declare var t3: [number, number];
declare var t9: [A, I];
declare var array1: {}[];

// ==================
// Original test file: tsc-tests/updated-tests/conformance/types/tuple/castingTuple.ts
// interface I { }
// class A { a = 10; }
// class C implements I { c: any };
// class D implements I { d: any };
// class E extends A { e: any };
// class F extends A { f: any };
// enum E1 { one }
// enum E2 { one }
// 
// // no error
// var numStrTuple: [number, string] = [5, "foo"];
// var emptyObjTuple = <[{}, {}]>numStrTuple;
// var numStrBoolTuple = <[number, string, boolean]>numStrTuple;
// var shorter = numStrBoolTuple as [number, string]
// var longer = numStrTuple as [number, string, boolean]
// var classCDTuple: [C, D] = [new C(), new D()];
// var interfaceIITuple = <[I, I]>classCDTuple;
// var classCDATuple = <[C, D, A]>classCDTuple;
// var eleFromCDA1: A = classCDATuple[2]; // A
// var eleFromCDA2: undefined = classCDATuple[5]; // C | D | A
// var t10: [E1, E2] = [E1.one, E2.one];
// var t11 = <[number, number]>t10;
// var array1 = <{}[]>emptyObjTuple;
// var unionTuple: [C, string | number] = [new C(), "foo"];
// var unionTuple2: [C, string | number, D] = [new C(), "foo", new D()];
// var unionTuple3: [number, string| number] = [10, "foo"]; 
// var unionTuple4 = <[number, number]>unionTuple3; 
// 
// // error
// var t3 = <[number, number]>numStrTuple;
// var t9 = <[A, I]>classCDTuple;
// var array1 = <number[]>numStrTuple;
// t4[2] = 10;
// 
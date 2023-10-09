// optionalParameterRetainsNull.d.ts
interface Bar {
    bar: number;
    foo: object | null;
}
declare let a: {
    test<K extends keyof Bar>(a: K, b?: Bar[K] | null | undefined): void;
};

// ==================
// Original test file: tsc-tests/updated-tests/compiler/optionalParameterRetainsNull.ts
// // @strictNullChecks: true
// interface Bar {  bar: number; foo: object | null;  }
// 
// let a = {
//   test<K extends keyof Bar> (a: K,  b?: Bar[K]  |  null): void  { }
// };
// a.test("bar", null); // ok, null is assignable to number | null | undefined
// 
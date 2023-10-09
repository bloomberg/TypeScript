// typeAssertionToGenericFunctionType.d.ts
declare var x: {
    a: <T>(x: T) => T;
    b: <T_1>(x: T_1) => void;
};

// ==================
// Original test file: tsc-tests/updated-tests/compiler/typeAssertionToGenericFunctionType.ts
// var x = {
//     a: < <T>(x: T) => T > ((x: any) => 1),
//     b: <T>(x: T): void => { x }
// }
// x.a<string>(1); // bug was that this caused 'Could not find symbol T' on return type T in the type assertion on x.a's definition
// x.b<string>(); // error
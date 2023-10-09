// accessorBodyInTypeContext.d.ts
type A = {
    get foo(): number;
};
type B = {
    set foo(v: any);
};
interface X {
    get foo(): number;
}
interface Y {
    set foo(v: any);
}

// ==================
// Original test file: tsc-tests/updated-tests/compiler/accessorBodyInTypeContext.ts
// type A = {
//     get foo() { return 0 }
// };
// 
// type B = {
//     set foo(v: any) { }
// };
// 
// interface X {
//     get foo() { return 0 }
// }
// 
// interface Y {
//     set foo(v: any) { }
// }
// 
// 
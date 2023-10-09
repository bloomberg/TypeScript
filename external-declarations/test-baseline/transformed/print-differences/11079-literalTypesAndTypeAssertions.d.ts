// literalTypesAndTypeAssertions.d.ts
declare const obj: {
    a: "foo";
    b: "foo";
    c: string;
};
declare let x1: 0 | 1;
declare let x2: number;
declare const dest: {
    a: string;
};
declare const temp: string;
declare const a: string;
declare const dest_1: {
    b: string;
};
declare const temp_1: string;
declare const b: "foo" | "bar";
declare const dest: {
    c: "bar";
};
declare const temp: any;
declare const c: string;
declare const dest_1: {
    d: "bar";
};
declare const temp_1: any;
declare const d: "foo" | "bar";

// ==================
// Original test file: tsc-tests/updated-tests/conformance/types/literal/literalTypesAndTypeAssertions.ts
// const obj = {
//     a: "foo" as "foo",
//     b: <"foo">"foo",
//     c: "foo"
// };
// 
// let x1 = 1 as (0 | 1);
// let x2 = 1;
// 
// const dest = { a: "foo" };
// const temp: string = dest.a;
// const a: string = temp === undefined ? "foo" : dest.a;
// const dest_1 = { b: "bar" };
// const temp_1: string = dest_1.b;
// const b: "foo" | "bar" = temp_1 === undefined ? "foo" as "foo" : dest_1.b;
// const dest = { c: "bar" as "bar" };
// const temp: any = dest.c;
// const c: string = temp === undefined ? "foo" : dest.c;
// const dest_1 = { d: "bar" as "bar" };
// const temp_1: any = dest_1.d;
// const d: "foo" | "bar" = temp_1 === undefined ? "foo" as "foo" : dest_1.d;
// 
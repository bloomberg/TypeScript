// contextuallyTypedBindingInitializerNegative.d.ts
interface Show {
    show: (x: number) => string;
}
declare function f({ show }: Show): void;
declare function f2({ "show": showRename }: Show): void;
declare function f3({ ["show"]: showRename }: Show): void;
interface Nested {
    nested: Show;
}
declare function ff({ nested }: Nested): void;
interface StringIdentity {
    stringIdentity(s: string): string;
}
declare const dest: {
    stringIdentity: any;
    any: any;
};
declare const stringIdentity: any;
declare const id: (s: string) => string;
interface Tuples {
    prop: [string, number];
}
declare function g({ prop }: Tuples): void;
interface StringUnion {
    prop: "foo" | "bar";
}
declare function h({ prop }: StringUnion): void;

// ==================
// Original test file: tsc-tests/updated-tests/conformance/types/contextualTypes/methodDeclarations/contextuallyTypedBindingInitializerNegative.ts
// // @noImplicitAny: true
// interface Show {
//     show: (x: number) => string;
// }
// function f({ show: showRename = v => v }: Show): void {}
// function f2({ "show": showRename = v => v }: Show): void {}
// function f3({ ["show"]: showRename = v => v }: Show): void {}
// 
// interface Nested {
//     nested: Show
// }
// function ff({ nested: nestedRename = { show: v => v } }: Nested): void {}
// 
// interface StringIdentity {
//     stringIdentity(s: string): string;
// }
// const dest: {
//     stringIdentity: any;
//     any: any;
// } = { stringIdentity: x: any => x };
// const stringIdentity: any = dest.stringIdentity;
// const id: (s: string) => string = stringIdentity === undefined ? arg => arg.length : dest.stringIdentity;
// 
// interface Tuples {
//     prop: [string, number];
// }
// function g({ prop = [101, 1234] }: Tuples): void {}
// 
// interface StringUnion {
//     prop: "foo" | "bar";
// }
// function h({ prop = "baz" }: StringUnion): void {}
// 
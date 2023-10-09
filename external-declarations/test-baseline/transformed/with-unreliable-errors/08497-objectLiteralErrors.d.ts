// objectLiteralErrors.d.ts
declare var e1: {
    a: number;
};
declare var e2: {
    a: string;
};
declare var e3: {
    a: string;
};
declare var e4: {
    a: boolean;
};
declare var e5: {
    a: {};
};
declare var e6: {
    a: number;
};
declare var e7: {
    a: number;
};
declare var e8: {
    a: number;
};
declare var e9: {
    a: number;
};
declare var e10: {
    a: number;
};
declare var e11: {
    1: number;
};
declare var e12: {
    0: number;
};
declare var e13: {
    0: number;
};
declare var e14: {
    0: number;
};
declare var e14: {
    0: number;
};
declare var e15: {
    100: number;
};
declare var e16: {
    32: number;
};
declare var e17: {
    a: number;
    b: number;
};
declare var f1: {
    readonly a: number;
};
declare var f2: {
    readonly a: string;
};
declare var f3: {
    readonly a: string;
};
declare var f4: {
    readonly a: boolean;
};
declare var f5: {
    readonly a: {};
};
declare var f6: {
    readonly a: number;
};
declare var f7: {
    readonly a: number;
};
declare var f8: {
    readonly a: number;
};
declare var f9: {
    readonly a: number;
};
declare var f10: {
    readonly a: number;
};
declare var f11: {
    readonly 1: number;
};
declare var f12: {
    readonly 0: number;
};
declare var f13: {
    readonly 0: number;
};
declare var f14: {
    readonly 0: number;
};
declare var f14: {
    readonly 0: number;
};
declare var f15: {
    readonly 100: number;
};
declare var f16: {
    readonly 32: number;
};
declare var f17: {
    readonly a: number;
    readonly b: number;
};
declare var g1: {
    a: number;
};
declare var g2: {
    a: string;
};
declare var g3: {
    a: number;
};
declare var h1: {
    x: number;
    y: number;
};

// ==================
// Original test file: tsc-tests/updated-tests/conformance/expressions/objectLiterals/objectLiteralErrors.ts
// //@Target: ES5
// 
// // Multiple properties with the same name
// var e1 = { a: 0, a: 0 };
// var e2 = { a: '', a: '' };
// var e3 = { a: 0, a: '' };
// var e4 = { a: true, a: false };
// var e5 = { a: {}, a: {} };
// var e6 = { a: 0, 'a': 0 };
// var e7 = { 'a': 0, a: 0 };
// var e8 = { 'a': 0, "a": 0 };
// var e9 = { 'a': 0, 'a': 0 };
// var e10 = { "a": 0, 'a': 0 };
// var e11 = { 1.0: 0, '1': 0 };
// var e12 = { 0: 0, 0: 0 };
// var e13 = { 0: 0, 0: 0 };
// var e14 = { 0: 0, 0x0: 0 };
// var e14 = { 0: 0, 0o0: 0 };
// var e15 = { "100": 0, 1e2: 0 };
// var e16 = { 0x20: 0, 3.2e1: 0 };
// var e17 = { a: 0, b: 1, a: 0 };
// 
// // Accessor and property with the same name
// var f1 = { a: 0, get a(): number { return 0; } };
// var f2 = { a: '', get a(): string { return ''; } };
// var f3 = { a: 0, get a(): string { return ''; } };
// var f4 = { a: true, get a(): boolean { return false; } };
// var f5 = { a: {}, get a(): {} { return {}; } };
// var f6 = { a: 0, get 'a'(): number { return 0; } };
// var f7 = { 'a': 0, get a(): number { return 0; } };
// var f8 = { 'a': 0, get "a"(): number { return 0; } };
// var f9 = { 'a': 0, get 'a'(): number { return 0; } };
// var f10 = { "a": 0, get 'a'(): number { return 0; } };
// var f11 = { 1.0: 0, get '1'(): number { return 0; } };
// var f12 = { 0: 0, get 0(): number { return 0; } };
// var f13 = { 0: 0, get 0(): number { return 0; } };
// var f14 = { 0: 0, get 0x0(): number { return 0; } };
// var f14 = { 0: 0, get 0o0(): number { return 0; } };
// var f15 = { "100": 0, get 1e2(): number { return 0; } };
// var f16 = { 0x20: 0, get 3.2e1(): number { return 0; } };
// var f17 = { a: 0, get b(): number { return 1; }, get a(): number { return 0; } };
// 
// // Get and set accessor with mismatched type annotations (only g2 is an error after #43662 implemented)
// var g1 = { get a(): number { return 4; }, set a(n: string) { } };
// var g2 = { get a() { return 4; }, set a(n: string) { } };
// var g3 = { get a(): number { return undefined; }, set a(n: string) { } };
// 
// // did you mean colon errors
// var h1: {
//     x: number;
//     y: number;
// } = {
//     x = 1,
//     y = 2,
//     #z: 3
// }
// 
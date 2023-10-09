// restParameterWithBindingPattern3.d.ts
declare function a(...[a, b]: string[]): void;
declare function b(...[...foo]: string[]): void;
declare function c(...{ 0: a, length, 3: d }: [boolean, string, number]): void;
declare function d(...[a, , , d]: [boolean, string, number]): void;
declare function e(...{ 0: a, 1: b, ...rest: rest }: [boolean, string, number]): void;

// ==================
// Original test file: tsc-tests/updated-tests/compiler/restParameterWithBindingPattern3.ts
// function a(...[a = 1, b = true]: string[]): void { }
// 
// function b(...[...foo = []]: string[]): void { }
// 
// function c(...{0: a, length, 3: d}: [boolean, string, number]): void { }
// 
// function d(...[a, , , d]: [boolean, string, number]): void { }
// 
// function e(...{0: a = 1, 1: b = true, ...rest: rest}: [boolean, string, number]): void { }
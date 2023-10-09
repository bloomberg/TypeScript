// /mod1.d.ts
/// <reference types="lib" />
export declare function foo(): Lib;

// /mod2.d.ts
/// <reference types="lib" />
export declare const bar: Lib;

// ==================
// Original test file: tsc-tests/updated-tests/compiler/typeReferenceDirectives11.ts
// // @noImplicitReferences: true
// // @declaration: true
// // @typeRoots: /types
// // @traceResolution: true
// // @types: lib
// // @out: output.js
// 
// // @currentDirectory: /
// 
// // @filename: /types/lib/index.d.ts
// 
// interface Lib { x }
// 
// // @filename: /mod1.ts
// 
// export function foo(): Lib { return {x: 1} }
// 
// // @filename: /mod2.ts
// 
// import {foo} from "./mod1";
// export const bar: Lib = foo();
// 
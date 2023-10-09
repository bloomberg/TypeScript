// /index.d.ts
export type LocalInterface = import("pkg", { assert: { "resolution-mode": "foobar" } }).RequireInterface & import("pkg", { assert: { "resolution-mode": "import" } }).ImportInterface;
export declare const a: import("pkg", { assert: { "resolution-mode": "foobar" } }).RequireInterface;
export declare const b: import("pkg", { assert: { "resolution-mode": "import" } }).ImportInterface;

// /other.d.ts
export type LocalInterface = import("pkg", { assert: {} });
export declare const a: import("pkg", { assert: {} });
export declare const b: import("pkg", { assert: {} });

// /other2.d.ts
export type LocalInterface = import("pkg", { assert: { "bad": "require" } }).RequireInterface & import("pkg", { assert: { "bad": "import" } }).ImportInterface;
export declare const a: import("pkg", { assert: { "bad": "require" } }).RequireInterface;
export declare const b: import("pkg", { assert: { "bad": "import" } }).ImportInterface;

// /other3.d.ts
export type LocalInterface = import("pkg", { assert: {} })[{
    "resolution-mode": "require";
}];
export declare const a: any;
export declare const b: any;

// /other4.d.ts
export type LocalInterface = import("pkg", { assert: {} });
export declare const a: import("pkg", { assert: {} }), Asserts1: any, RequireInterface: any;
export declare const b: import("pkg", { assert: {} }), Asserts2: any, ImportInterface: any;

// /other5.d.ts
export type LocalInterface = import("pkg", { assert: {} }).RequireInterface & import("pkg", { assert: {} }).ImportInterface;
export declare const a: import("pkg", { assert: {} }).RequireInterface;
export declare const b: import("pkg", { assert: {} }).ImportInterface;

// ==================
// Original test file: tsc-tests/updated-tests/conformance/node/nodeModulesImportTypeModeDeclarationEmitErrors1.ts
// // @module: node16,nodenext
// // @declaration: true
// // @outDir: out
// // @filename: /node_modules/pkg/package.json
// {
//     "name": "pkg",
//     "version": "0.0.1",
//     "exports": {
//         "import": "./import.js",
//         "require": "./require.js"
//     }
// }
// // @filename: /node_modules/pkg/import.d.ts
// export interface ImportInterface {}
// // @filename: /node_modules/pkg/require.d.ts
// export interface RequireInterface {}
// // @filename: /index.ts
// export type LocalInterface =
//     & import("pkg", { assert: {"resolution-mode": "foobar"} }).RequireInterface
//     & import("pkg", { assert: {"resolution-mode": "import"} }).ImportInterface;
// 
// export const a = (null as any as import("pkg", { assert: {"resolution-mode": "foobar"} }).RequireInterface);
// export const b = (null as any as import("pkg", { assert: {"resolution-mode": "import"} }).ImportInterface);
// // @filename: /other.ts
// // missing assert:
// export type LocalInterface =
//     & import("pkg", {"resolution-mode": "require"}).RequireInterface
//     & import("pkg", {"resolution-mode": "import"}).ImportInterface;
// 
// export const a = (null as any as import("pkg", {"resolution-mode": "require"}).RequireInterface);
// export const b = (null as any as import("pkg", {"resolution-mode": "import"}).ImportInterface);
// // @filename: /other2.ts
// // wrong assertion key
// export type LocalInterface =
//     & import("pkg", { assert: {"bad": "require"} }).RequireInterface
//     & import("pkg", { assert: {"bad": "import"} }).ImportInterface;
// 
// export const a = (null as any as import("pkg", { assert: {"bad": "require"} }).RequireInterface);
// export const b = (null as any as import("pkg", { assert: {"bad": "import"} }).ImportInterface);
// // @filename: /other3.ts
// // Array instead of object-y thing
// export type LocalInterface =
//     & import("pkg", [ {"resolution-mode": "require"} ]).RequireInterface
//     & import("pkg", [ {"resolution-mode": "import"} ]).ImportInterface;
// 
// export const a: any = (null as any as import("pkg", [ {"resolution-mode": "require"} ]).RequireInterface);
// export const b: any = (null as any as import("pkg", [ {"resolution-mode": "import"} ]).ImportInterface);
// // @filename: /other4.ts
// // Indirected assertion objecty-thing - not allowed
// type Asserts1 = { assert: {"resolution-mode": "require"} };
// type Asserts2 = { assert: {"resolution-mode": "import"} };
// 
// export type LocalInterface =
//     & import("pkg", Asserts1).RequireInterface
//     & import("pkg", Asserts2).ImportInterface;
// 
// export const a = (null as any as import("pkg", Asserts1: any).RequireInterface: any);
// export const b = (null as any as import("pkg", Asserts2: any).ImportInterface: any);
// // @filename: /other5.ts
// export type LocalInterface =
//     & import("pkg", { assert: {} }).RequireInterface
//     & import("pkg", { assert: {} }).ImportInterface;
// 
// export const a = (null as any as import("pkg", { assert: {} }).RequireInterface);
// export const b = (null as any as import("pkg", { assert: {} }).ImportInterface);
// 
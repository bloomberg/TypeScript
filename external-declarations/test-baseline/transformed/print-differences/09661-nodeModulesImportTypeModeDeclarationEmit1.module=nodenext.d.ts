// /index.d.ts
export type LocalInterface = import("pkg", { assert: { "resolution-mode": "require" } }).RequireInterface & import("pkg", { assert: { "resolution-mode": "import" } }).ImportInterface;
export declare const a: import("pkg").RequireInterface;
export declare const b: import("pkg", { assert: { "resolution-mode": "import" } }).ImportInterface;

// ==================
// Original test file: tsc-tests/updated-tests/conformance/node/nodeModulesImportTypeModeDeclarationEmit1.ts
// // @noImplicitReferences: true
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
//     & import("pkg", { assert: {"resolution-mode": "require"} }).RequireInterface
//     & import("pkg", { assert: {"resolution-mode": "import"} }).ImportInterface;
// 
// export const a = (null as any as import("pkg", { assert: {"resolution-mode": "require"} }).RequireInterface);
// export const b = (null as any as import("pkg", { assert: {"resolution-mode": "import"} }).ImportInterface);
// 
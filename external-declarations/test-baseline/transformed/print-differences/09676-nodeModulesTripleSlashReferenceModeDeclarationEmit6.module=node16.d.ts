// /uses.d.ts
declare const __default: RequireInterface;
export default __default;

// /index.d.ts
import obj from "./uses.js";
declare const _default: typeof obj;
export default _default;

// ==================
// Original test file: tsc-tests/updated-tests/conformance/node/nodeModulesTripleSlashReferenceModeDeclarationEmit6.ts
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
// export {};
// declare global {
//     interface ImportInterface {}
//     function getInterI(): ImportInterface;
// }
// // @filename: /node_modules/pkg/require.d.ts
// export {};
// declare global {
//     interface RequireInterface {}
//     function getInterR(): RequireInterface;
// }
// // @filename: /uses.ts
// /// <reference types="pkg" />
// const __default: RequireInterface = getInterR();
// export default __default;
// // @filename: /index.ts
// import obj from "./uses.js"
// export default (obj as typeof obj);
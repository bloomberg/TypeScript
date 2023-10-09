// mod1.d.ts
declare const _default: invalid;
export = _default;

// use.d.ts
export {};

// ==================
// Original test file: tsc-tests/updated-tests/compiler/commonJsImportClassExpression.ts
// // @Filename: mod1.ts
// export = class {
//     chunk = 1
// }
// 
// // @Filename: use.ts
// import Chunk = require('./mod1')
// declare var c: Chunk;
// c.chunk;
// 
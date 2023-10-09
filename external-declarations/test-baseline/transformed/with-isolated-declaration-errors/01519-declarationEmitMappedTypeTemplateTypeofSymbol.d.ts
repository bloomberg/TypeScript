// b.d.ts
import * as x from "./a";
export declare const timestamp: {
    [x.timestampSymbol]: true;
};

// c.d.ts
export declare const timestamp: {};

// ==================
// Original test file: tsc-tests/updated-tests/compiler/declarationEmitMappedTypeTemplateTypeofSymbol.ts
// // @strict: true
// // @declaration: true
// // @filename: a.d.ts
// export declare const timestampSymbol: unique symbol;
// 
// export declare const Timestamp: {
//     [TKey in typeof timestampSymbol]: true;
// };
// 
// export declare function now(): typeof Timestamp;
// 
// // @filename: b.ts
// import * as x from "./a";
// export const timestamp: {
//     [x.timestampSymbol]: true;
// } = x.now();
// 
// // @filename: c.ts
// import { now } from "./a";
// 
// export const timestamp: {
//     [timestampSymbol]: true;
// } = now();
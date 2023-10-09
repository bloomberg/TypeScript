// bug.d.ts
export declare const SYMBOL: unique symbol;
export interface Interface {
    readonly [SYMBOL]: string;
}
export declare function createInstance(): Interface;

// index.d.ts
export declare const spread: {};

// ==================
// Original test file: tsc-tests/updated-tests/compiler/declarationEmitReadonlyComputedProperty.ts
// // @declaration: true
// // @lib: es2015
// 
// // @filename: bug.ts
// export const SYMBOL: unique symbol = Symbol()
// 
// export interface Interface {
//   readonly [SYMBOL]: string; // remove readonly and @showEmit to see the expected error
// }
// 
// export function createInstance(): Interface {
//   return {
//     [SYMBOL]: ''
//   }
// }
// 
// // @filename: index.ts
// import { createInstance } from './bug'
// 
// export const spread: {
//     [SYMBOL]: string
// } = {
//   ...createInstance(),
// }
// dom.d.ts
export type DOMNode = Node;

// custom.d.ts
export type Node = {};

// index.d.ts
import { DOMNode } from './dom';
type Constructor = new (...args: any[]) => any;
export declare const mixin: (Base: Constructor) => new (...args: any[]) => {
    [x: string]: any;
    get(domNode: DOMNode): void;
};
export {};

// ==================
// Original test file: tsc-tests/updated-tests/compiler/declarationsForFileShadowingGlobalNoError.ts
// // @declaration: true
// // @lib: dom,es6
// // @filename: dom.ts
// export type DOMNode = Node;
// // @filename: custom.ts
// export type Node = {};
// // @filename: index.ts
// import { Node } from './custom'
// import { DOMNode } from './dom'
// 
// type Constructor = new (...args: any[]) => any
// 
// export const mixin = (Base: Constructor): {
//     new(...args: any[]): {
//         [x: string]: any
//         get(domNode: DOMNode): void
//     }
// } => {
//   return class extends Base {
//     get(domNode: DOMNode) {}
//   }
// }
// /main.d.ts
export declare class Cls {
    x: any;
}

// /mod1.d.ts
declare module "./main" {
    interface Cls {
        foo(): Lib;
    }
    namespace Cls {
        function bar(): Lib;
    }
}
export {};

// /mod2.d.ts
import { Cls } from "./main";
import "./mod1";
export declare const cls: typeof Cls;
export declare const foo: Lib;
export declare const bar: Lib;

// ==================
// Original test file: tsc-tests/updated-tests/compiler/typeReferenceDirectives9.ts
// // @noImplicitReferences: true
// // @declaration: true
// // @typeRoots: /types
// // @traceResolution: true
// // @currentDirectory: /
// 
// // @filename: /types/lib/index.d.ts
// 
// interface Lib { x }
// 
// // @filename: /main.ts
// export class Cls {
//     x: any
// }
// 
// // @filename: /mod1.ts
// /// <reference types="lib" />
// 
// import {Cls} from "./main";
// Cls.prototype.foo = function() { return undefined; }
// 
// declare module "./main" {
//     interface Cls {
//         foo(): Lib;
//     }
//     namespace Cls {
//         function bar(): Lib;
//     }
// }
// 
// // @filename: /mod2.ts
// import { Cls } from "./main";
// import "./mod1";
// 
// export const cls: typeof Cls = Cls;
// export const foo: Lib = new Cls().foo();
// export const bar: Lib = Cls.bar();
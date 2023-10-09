// child1.d.ts
import { ParentThing } from './parent';
declare module './parent' {
    interface ParentThing {
        add: (a: number, b: number) => number;
    }
}
export declare function child1(prototype: ParentThing): void;

// parent.d.ts
import './child1';
export declare class ParentThing implements ParentThing {
}

// ==================
// Original test file: tsc-tests/updated-tests/compiler/declarationEmitForModuleImportingModuleAugmentationRetainsImport.ts
// // @declaration: true
// // @filename: child1.ts
// import { ParentThing } from './parent';
// 
// declare module './parent' {
//     interface ParentThing {
//         add: (a: number, b: number) => number;
//     }
// }
// 
// export function child1(prototype: ParentThing): void {
//     prototype.add = (a: number, b: number) => a + b;
// }
// 
// // @filename: parent.ts
// import { child1 } from './child1'; // this import should still exist in some form in the output, since it augments this module
// 
// export class ParentThing implements ParentThing {}
// 
// child1(ParentThing.prototype);
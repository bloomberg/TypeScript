// foo.d.ts
export declare namespace ConstEnumOnlyModule {
    const enum ConstFooEnum {
        Some = 0,
        Values = 1,
        Here = 2
    }
}

// reexport.d.ts
import * as Foo from "./foo";
declare const _default: typeof Foo.ConstEnumOnlyModule;
export = _default;

// index.d.ts
export {};

// ==================
// Original test file: tsc-tests/updated-tests/compiler/constEnumNamespaceReferenceCausesNoImport2.ts
// // @preserveConstEnums: true
// // @noTypesAndSymbols: true
// 
// // @filename: foo.ts
// export module ConstEnumOnlyModule {
//   export const enum ConstFooEnum {
//     Some,
//     Values,
//     Here
//   }
// }
// 
// // @filename: reexport.ts
// import * as Foo from "./foo";
// export = Foo.ConstEnumOnlyModule;
// 
// // @filename: index.ts
// import Foo = require("./reexport");
// function check(x: Foo.ConstFooEnum): void {
//   switch (x) {
//     case Foo.ConstFooEnum.Some:
//       break;
//   }
// }
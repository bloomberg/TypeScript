// foo1.d.ts
declare class x {
}
export = x;

// foo2.d.ts
import foo1 = require('./foo1');
declare const _default: {
    x: typeof foo1;
};
export = _default;

// foo3.d.ts
export {};

// ==================
// Original test file: tsc-tests/updated-tests/conformance/externalModules/reexportClassDefinition.ts
// // @module: commonjs
// // @Filename: foo1.ts
// class x{}
// export = x; 
// 
// // @Filename: foo2.ts
// import foo1 = require('./foo1');
// 
// export = {
//     x: foo1
// }
// 
// // @Filename: foo3.ts
// import foo2 = require('./foo2')
// class x extends foo2.x {}
// 
// 
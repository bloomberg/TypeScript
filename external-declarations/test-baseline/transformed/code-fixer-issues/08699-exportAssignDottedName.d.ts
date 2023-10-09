// foo1.d.ts
export declare function x(): boolean;

// foo2.d.ts
import foo1 = require('./foo1');
declare const _default: typeof foo1.x;
export = _default;

// ==================
// Original test file: tsc-tests/updated-tests/conformance/externalModules/exportAssignDottedName.ts
// // @Filename: foo1.ts
// export function x(): boolean{
// 	return true;
// }
// 
// // @Filename: foo2.ts
// import foo1 = require('./foo1');
// export = foo1.x; // Ok
// 
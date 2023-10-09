// destructuringParameterDeclaration6.d.ts

// ==================
// Original test file: tsc-tests/updated-tests/conformance/es6/destructuring/destructuringParameterDeclaration6.ts
// 
// ================= CODE MOD ERROR ==============
// Could not fix file. Got stuck in a fix loop on destructuringParameterDeclaration6.ts:13:10
// TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
// a4
// 
// Error: Could not fix file. Got stuck in a fix loop on destructuringParameterDeclaration6.ts:13:10
// TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
// a4
// 
//     at fixProjectRaw (C:\dev\TSC\TypeScript\external-declarations\src\code-mod\fixer\code-fixer-applier.ts:74:23)
//     at fixTestFiles (C:\dev\TSC\TypeScript\external-declarations\src\code-mod\test-fixer\test-fixer.ts:68:5)
//     at fixTestCase (C:\dev\TSC\TypeScript\external-declarations\src\code-mod\test-fixer\test-fixer.ts:40:16)
//     at main (C:\dev\TSC\TypeScript\external-declarations\src\code-mod\test-fixer\run-test-updater.ts:74:24)
// 
// // ==================
// // Original test file: ../tests/cases/conformance/es6/destructuring/destructuringParameterDeclaration6.ts
// // // A parameter declaration may specify either an identifier or a binding pattern.
// // 
// // // Reserved words are not allowed to be used as an identifier in parameter declaration
// // "use strict"
// // 
// // // Error
// // function a({while}) { }
// // function a1({public}) { }
// // function a4([while, for, public]){ }
// // function a5(...while) { }
// // function a6(...public) { }
// // function a7(...a: string) { }
// // a({ while: 1 });
// // 
// // // No Error
// // function b1({public: x}) { }
// // function b2({while: y}) { }
// // b1({ public: 1 });
// // b2({ while: 1 });
// // 
// // 
// 
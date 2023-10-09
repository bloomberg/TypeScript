// wellKnownSymbolExpando.d.ts
declare function f(): void;
declare namespace f { }

// ==================
// Original test file: tsc-tests/updated-tests/compiler/wellKnownSymbolExpando.ts
// // @noEmit: true
// // @target: esnext
// 
// function f(): void {}
// f[Symbol.iterator] = function() {}
// 
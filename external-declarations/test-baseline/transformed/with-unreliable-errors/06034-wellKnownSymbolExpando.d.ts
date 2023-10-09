// wellKnownSymbolExpando.d.ts
declare function f(): void;

// ==================
// Original test file: tsc-tests/updated-tests/compiler/wellKnownSymbolExpando.ts
// // @noEmit: true
// // @target: esnext
// 
// function f(): void {}
// f[Symbol.iterator] = function() {}
// 
// parseArrowFunctionWithFunctionReturnType.d.ts
declare const fn: <T>() => (() => T);

// ==================
// Original test file: tsc-tests/updated-tests/compiler/parseArrowFunctionWithFunctionReturnType.ts
// const fn = <T>(): (() => T) => null as any;
// 
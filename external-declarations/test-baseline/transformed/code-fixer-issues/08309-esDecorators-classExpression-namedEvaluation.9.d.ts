// a.d.ts
declare const _default: invalid;
export = _default;

// b.d.ts
declare const _default: invalid;
export = _default;

// ==================
// Original test file: tsc-tests/updated-tests/conformance/esDecorators/classExpression/namedEvaluation/esDecorators-classExpression-namedEvaluation.9.ts
// // @target: es2022
// // @module: commonjs
// // @noEmitHelpers: true
// // @noTypesAndSymbols: true
// 
// // @filename: a.ts
// declare let dec: any;
// 
// export = @dec class { };
// 
// // @filename: b.ts
// declare let dec: any;
// 
// export = class { @dec y: any };
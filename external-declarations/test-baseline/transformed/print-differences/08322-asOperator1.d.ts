// asOperator1.d.ts
declare var as: number;
declare var x: number;
declare var y: number;
declare var z: string;
declare var j: string | number;

// ==================
// Original test file: tsc-tests/updated-tests/conformance/expressions/asOperator/asOperator1.ts
// var as = 43;
// var x = undefined as number;
// var y: number = (null as string).length;
// var z = Date as any as string;
// 
// // Should parse as a union type, not a bitwise 'or' of (32 as number) and 'string'
// var j = 32 as number|string;
// j = '';
// 
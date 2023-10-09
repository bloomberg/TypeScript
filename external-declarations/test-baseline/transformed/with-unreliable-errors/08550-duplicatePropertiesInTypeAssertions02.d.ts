// duplicatePropertiesInTypeAssertions02.d.ts
declare let x: {
    a: number;
    a: number;
};

// ==================
// Original test file: tsc-tests/updated-tests/conformance/expressions/typeAssertions/duplicatePropertiesInTypeAssertions02.ts
// // @declaration: true
// 
// let x = {} as {a: number; a: number};
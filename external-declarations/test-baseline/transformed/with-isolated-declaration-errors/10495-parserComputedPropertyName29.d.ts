// parserComputedPropertyName29.d.ts
declare class C {
    [e]: number;
    [e2]: number;
}

// ==================
// Original test file: tsc-tests/updated-tests/conformance/parser/ecmascript6/ComputedPropertyNames/parserComputedPropertyName29.ts
// //@target: ES6
// class C {
//     // yes ASI
//     [e]: number = id++
//     [e2]: number
// }
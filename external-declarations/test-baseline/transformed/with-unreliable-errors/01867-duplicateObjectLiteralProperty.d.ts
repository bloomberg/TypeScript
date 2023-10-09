// duplicateObjectLiteralProperty.d.ts
declare var x: {
    a: {
        c: number;
    };
    b: boolean;
};
declare var y: {
    a: number;
};

// ==================
// Original test file: tsc-tests/updated-tests/compiler/duplicateObjectLiteralProperty.ts
// // @target: ES5
// var x = {
//     a: 1,
//     b: true, // OK
//     a: 56,   // Duplicate
//     \u0061: "ss", // Duplicate
//     a: {
//         c: 1,
//         "c": 56, // Duplicate
//     }
// };
// 
// 
// var y = {
//     get a() { return 0; },
//     set a(v: number) { },
//     get a() { return 0; }
// };
// 
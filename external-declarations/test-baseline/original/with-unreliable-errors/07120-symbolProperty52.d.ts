// symbolProperty52.d.ts
declare var obj: {
    [Symbol.nonsense]: number;
};

// ==================
// Original test file: ../tests/cases/conformance/es6/Symbols/symbolProperty52.ts
// //@target: ES6
// var obj = {
//     [Symbol.nonsense]: 0
// };
// 
// obj = {};
// 
// obj[Symbol.nonsense];
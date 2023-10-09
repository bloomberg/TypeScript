// computedPropertyNames6_ES5.d.ts
declare var p1: number | string;
declare var p2: number | number[];
declare var p3: string | boolean;
declare var v: {
    [p1]: number;
    [p2]: number;
    [p3]: number;
};

// ==================
// Original test file: ../tests/cases/conformance/es6/computedProperties/computedPropertyNames6_ES5.ts
// // @target: es5
// var p1: number | string;
// var p2: number | number[];
// var p3: string | boolean;
// var v = {
//     [p1]: 0,
//     [p2]: 1,
//     [p3]: 2
// }
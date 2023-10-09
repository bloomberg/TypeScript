// computedPropertyNames7_ES6.d.ts
declare enum E {
    member = 0
}
declare var v: {
    [E.member]: number;
};

// ==================
// Original test file: tsc-tests/updated-tests/conformance/es6/computedProperties/computedPropertyNames7_ES6.ts
// // @target: es6
// enum E {
//     member
// }
// var v = {
//     [E.member]: 0
// }
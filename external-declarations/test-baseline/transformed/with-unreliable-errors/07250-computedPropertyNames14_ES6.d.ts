// computedPropertyNames14_ES6.d.ts
declare var b: boolean;
declare class C {
}

// ==================
// Original test file: tsc-tests/updated-tests/conformance/es6/computedProperties/computedPropertyNames14_ES6.ts
// // @target: es6
// var b: boolean;
// class C {
//     [b](): void {}
//     static [true]() { }
//     [[]]() { }
//     static [{}]() { }
//     [undefined](): void { }
//     static [null]() { }
// }
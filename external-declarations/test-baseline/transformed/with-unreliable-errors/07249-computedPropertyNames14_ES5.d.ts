// computedPropertyNames14_ES5.d.ts
declare var b: boolean;
declare class C {
}

// ==================
// Original test file: tsc-tests/updated-tests/conformance/es6/computedProperties/computedPropertyNames14_ES5.ts
// // @target: es5
// var b: boolean;
// class C {
//     [b](): void {}
//     static [true]() { }
//     [[]]() { }
//     static [{}]() { }
//     [undefined](): void { }
//     static [null]() { }
// }
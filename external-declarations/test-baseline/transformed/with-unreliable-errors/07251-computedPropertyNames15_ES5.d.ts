// computedPropertyNames15_ES5.d.ts
declare var p1: number | string;
declare var p2: number | number[];
declare var p3: string | boolean;
declare class C {
    [p1](): void;
    [p2](): void;
    [p3](): void;
}

// ==================
// Original test file: tsc-tests/updated-tests/conformance/es6/computedProperties/computedPropertyNames15_ES5.ts
// // @target: es5
// var p1: number | string;
// var p2: number | number[];
// var p3: string | boolean;
// class C {
//     [p1](): void { }
//     [p2](): void { }
//     [p3](): void { }
// }
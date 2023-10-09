// computedPropertyNames12_ES5.d.ts
declare var s: string;
declare var n: number;
declare var a: any;
declare class C {
    static [""]: number;
    [0]: number;
    [`hello bye`]: number;
}

// ==================
// Original test file: tsc-tests/updated-tests/conformance/es6/computedProperties/computedPropertyNames12_ES5.ts
// // @target: es5
// var s: string;
// var n: number;
// var a: any;
// class C {
//     [s]: number;
//     [n]: number = n;
//     static [s + s]: string;
//     [s + n] = 2;
//     [+s]: typeof s;
//     static [""]: number;
//     [0]: number;
//     [a]: number;
//     static [<any>true]: number;
//     [`hello bye`] = 0;
//     static [`hello ${a} bye`] = 0
// }
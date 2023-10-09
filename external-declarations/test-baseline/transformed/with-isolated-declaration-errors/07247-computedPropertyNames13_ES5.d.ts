// computedPropertyNames13_ES5.d.ts
declare var s: string;
declare var n: number;
declare var a: any;
declare class C {
    static [""](): void;
    [0](): void;
    [`hello bye`](): void;
}

// ==================
// Original test file: tsc-tests/updated-tests/conformance/es6/computedProperties/computedPropertyNames13_ES5.ts
// // @target: es5
// var s: string;
// var n: number;
// var a: any;
// class C {
//     [s](): void {}
//     [n](): void { }
//     static [s + s]() { }
//     [s + n]() { }
//     [+s]() { }
//     static [""](): void { }
//     [0](): void { }
//     [a](): void { }
//     static [<any>true]() { }
//     [`hello bye`](): void { }
//     static [`hello ${a} bye`]() { }
// }
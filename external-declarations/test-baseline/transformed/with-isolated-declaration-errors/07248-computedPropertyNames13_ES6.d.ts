// computedPropertyNames13_ES6.d.ts
declare var s: string;
declare var n: number;
declare var a: any;
declare class C {
    [s](): void;
    [n](): void;
    static [""](): void;
    [0](): void;
    [a](): void;
    [`hello bye`](): void;
}

// ==================
// Original test file: tsc-tests/updated-tests/conformance/es6/computedProperties/computedPropertyNames13_ES6.ts
// // @target: es6
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
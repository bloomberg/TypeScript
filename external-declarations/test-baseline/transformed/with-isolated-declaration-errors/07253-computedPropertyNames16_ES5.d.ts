// computedPropertyNames16_ES5.d.ts
declare var s: string;
declare var n: number;
declare var a: any;
declare class C {
    static set [""](v: any);
    get [0](): number;
    set [`hello bye`](v: any);
}

// ==================
// Original test file: tsc-tests/updated-tests/conformance/es6/computedProperties/computedPropertyNames16_ES5.ts
// // @target: es5
// var s: string;
// var n: number;
// var a: any;
// class C {
//     get [s](): number { return 0;}
//     set [n](v: any) { }
//     static get [s + s]() { return 0; }
//     set [s + n](v) { }
//     get [+s]() { return 0; }
//     static set [""](v: any) { }
//     get [0](): number { return 0; }
//     set [a](v: any) { }
//     static get [<any>true]() { return 0; }
//     set [`hello bye`](v: any) { }
//     get [`hello ${a} bye`]() { return 0; }
// }
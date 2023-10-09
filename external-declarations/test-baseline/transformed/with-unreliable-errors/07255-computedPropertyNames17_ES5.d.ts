// computedPropertyNames17_ES5.d.ts
declare var b: boolean;
declare class C {
    get [b](): number;
    static get [undefined](): number;
}

// ==================
// Original test file: tsc-tests/updated-tests/conformance/es6/computedProperties/computedPropertyNames17_ES5.ts
// // @target: es5
// var b: boolean;
// class C {
//     get [b](): number { return 0;}
//     static set [true](v) { }
//     get [[]]() { return 0; }
//     set [{}](v) { }
//     static get [undefined](): number { return 0; }
//     set [null](v) { }
// }
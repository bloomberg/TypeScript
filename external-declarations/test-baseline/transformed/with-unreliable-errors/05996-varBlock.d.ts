// varBlock.d.ts
declare namespace m2 {
    var a: any, b2: number, b: any;
}
declare namespace m3 {
    var a: any, b: any, c: any;
    var a1: any, b1: number;
    class C {
        constructor(c?: number);
    }
}
declare var b: number;
declare var a2: any, b2: any, c2: any;
declare var da: number;
declare var d3: any, d4: number;
declare namespace m3 {
    var dE: number;
    var d2E: any, d3E: number, d4E: number;
}
declare namespace m4 {
    var d: number;
    var d2: any, d3: number, d4: number;
    var dE: number;
    var d2E: any, d3E: number, d4E: number;
}
declare var c: any;
declare var c: any;

// ==================
// Original test file: tsc-tests/updated-tests/compiler/varBlock.ts
// module m2 {
// 
//     export var a: any, b2: number = 10, b: any;
// }
// 
// declare module m3 {
//     var a: any, b: any, c: any;
//     var a1: any, b1 = 10;
// 
//     class C {
//         constructor (public c = 10);
//     }
// }
// 
// declare var b = 10;
// 
// declare var a2: any, b2: any, c2: any;
// 
// 
// 
// declare var da = 10;
// declare var d3: any, d4 = 10;
// 
// module m3 {
//     declare var d = 10;
//     declare var d2, d3 = 10, d4 = 10;
//     export declare var dE = 10;
//     export declare var d2E: any, d3E = 10, d4E = 10;
// }
// 
// declare module m4 {
//     var d = 10;
//     var d2: any, d3 = 10, d4 =10;
//     export var dE = 10;
//     export var d2E: any, d3E = 10, d4E = 10;
// }
// 
// declare var c: any;
// declare var c = 10;
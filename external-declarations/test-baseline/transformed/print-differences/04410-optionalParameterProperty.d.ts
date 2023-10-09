// optionalParameterProperty.d.ts
declare class C {
    p: number;
}
declare class D extends C {
    p?: number | undefined;
    constructor(p?: number | undefined);
}

// ==================
// Original test file: tsc-tests/updated-tests/compiler/optionalParameterProperty.ts
// // @strictNullChecks: true
// 
// class C {
//     p: number;
// }
// 
// class D extends C { 
//     constructor(public p?: number) {
//         super();
//     }
// }
// 
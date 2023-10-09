// duplicateVarsAcrossFileBoundaries_0.d.ts
declare var x: number;
declare var y: string;

// duplicateVarsAcrossFileBoundaries_1.d.ts
declare var x: number;
declare var z: number;

// duplicateVarsAcrossFileBoundaries_2.d.ts
declare var x: number;
declare var y: string;
declare var z: number;

// duplicateVarsAcrossFileBoundaries_3.d.ts
declare var x: number;
declare var y: string;
declare var z: number;

// duplicateVarsAcrossFileBoundaries_4.d.ts
declare namespace P { }
import p = P;
declare var q: any;

// duplicateVarsAcrossFileBoundaries_5.d.ts
declare namespace Q { }
import q = Q;
declare var p: any;

// ==================
// Original test file: tsc-tests/updated-tests/compiler/duplicateVarsAcrossFileBoundaries.ts
// // @Filename: duplicateVarsAcrossFileBoundaries_0.ts
// var x = 3;
// var y = "";
// 
// // @Filename: duplicateVarsAcrossFileBoundaries_1.ts
// var x = true;
// var z = 3;
// 
// // @Filename: duplicateVarsAcrossFileBoundaries_2.ts
// var x = "";
// var y = 3;
// var z = false;
// 
// // @Filename: duplicateVarsAcrossFileBoundaries_3.ts
// var x = 0;
// var y = "";
// var z = 0;
// 
// // @Filename: duplicateVarsAcrossFileBoundaries_4.ts
// module P { }
// import p = P;
// var q: any;
// 
// // @Filename: duplicateVarsAcrossFileBoundaries_5.ts
// module Q { }
// import q = Q;
// var p: any;
// duplicateVariablesWithAny.d.ts
declare var x: any;
declare var x: number;
declare var y: string;
declare var y: string;
declare namespace N {
}
declare var z: any;
declare var z: any;

// ==================
// Original test file: tsc-tests/updated-tests/compiler/duplicateVariablesWithAny.ts
// // They should have to be the same even when one of the types is 'any'
// var x: any;
// var x = 2; //error
// 
// var y = "";
// var y: string; //error
// 
// module N {
//     var x: any;
//     var x = 2; //error
// 
//     var y = "";
//     var y; //error
// }
// 
// var z: any;
// var z: any; // ok
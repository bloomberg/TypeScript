// indexSignatureMustHaveTypeAnnotation.d.ts
interface I {
    [x: string]: any;
}
declare class C {
    [x]: string;
}
declare class C2 {
    [x: string]: any;
}

// ==================
// Original test file: ../tests/cases/compiler/indexSignatureMustHaveTypeAnnotation.ts
// interface I {
//     // Used to be indexer, now it is a computed property
//     [x]: string;
//     [x: string];
// }
// 
// class C {
//     // Used to be indexer, now it is a computed property
//     [x]: string
//     
// }
// 
// class C2 {
//     [x: string]
// }
// forwardRefInEnum.d.ts
declare enum E1 {
    X,
    X1,
    Y,
    Y1
}
declare enum E1 {
    Z = 4
}

// ==================
// Original test file: ../tests/cases/compiler/forwardRefInEnum.ts
// enum E1 {
//     // illegal case
//     // forward reference to the element of the same enum
//     X = Y, 
//     X1 = E1["Y"], 
//     // forward reference to the element of the same enum
//     Y = E1.Z,
//     Y1 = E1["Z"]
// }
// 
// enum E1 {
//     Z = 4    
// }
// 
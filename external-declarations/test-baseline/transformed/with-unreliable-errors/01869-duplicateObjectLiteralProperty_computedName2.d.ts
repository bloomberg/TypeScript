// duplicateObjectLiteralProperty_computedName2.d.ts
declare const n = 1;
declare const s = "s";
declare enum E1 {
    A = "ENUM_KEY"
}
declare enum E2 {
    B = 0
}
declare const t1: {
    [n]: number;
};
declare const t2: {
    [s]: number;
};
declare const t3: {
    [E1.A]: number;
};
declare const t4: {
    [E2.B]: number;
};

// ==================
// Original test file: tsc-tests/updated-tests/compiler/duplicateObjectLiteralProperty_computedName2.ts
// const n = 1;
// const s = "s";
// enum E1 { A = "ENUM_KEY" }
// enum E2 { B }
// 
// const t1 = {
//     [n]: 1,
//     [n]: 1, // duplicate
// }
// 
// const t2 = {
//     [s]: 1,
//     [s]: 1, // duplicate
// }
// 
// const t3 = {
//     [E1.A]: 1,
//     [E1.A]: 1, // duplicate
// }
// 
// const t4 = {
//     [E2.B]: 1,
//     [E2.B]: 1, // duplicate
// }
// 
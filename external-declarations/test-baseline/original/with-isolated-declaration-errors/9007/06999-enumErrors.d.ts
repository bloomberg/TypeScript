// enumErrors.d.ts
declare enum any {
}
declare enum number {
}
declare enum string {
}
declare enum boolean {
}
declare enum E5 {
    C
}
declare enum E9 {
    A = 0,
    B = 0
}
declare enum E10 {
    A = 0,
    B = 0
}
declare enum E11 {
    A,
    B,
    C,
    D,
    E
}
declare enum E12 {
    A = "",
    B,
    C,
    D,
    E = 2,
    F
}
declare enum E13 {
    postComma = 0,
    postValueComma = 1,
    postSemicolon = 2,
    postColonValueComma = 3,
    2 = 4,
    postColonValueSemicolon = 5,
    3 = 6
}
declare enum E14 {
    a = 0,
    b = 1,
    any = 2,
    "hello" = 3,
    1 = 4,
    c = 5,
    d = 6
}

// ==================
// Original test file: ../tests/cases/conformance/enums/enumErrors.ts
// // Enum named with PredefinedTypes
// enum any { }
// enum number { }
// enum string { }
// enum boolean { }
// 
// // Enum with computed member initializer of type Number
// enum E5 {
//     C = new Number(30)
// }
// 
// enum E9 {
//     A,
//     B = A
// }
// 
// //Enum with computed member intializer of different enum type
// // Bug 707850: This should be allowed
// enum E10 {
//     A = E9.A,
//     B = E9.B
// }
// 
// // Enum with computed member intializer of other types
// enum E11 {
//     A = true,
//     B = new Date(),
//     C = window,
//     D = {},
//     E = (() => 'foo')(),
// }
// 
// // Enum with string valued member and computed member initializers
// enum E12 {
//     A = '',
//     B = new Date(),
//     C = window,
//     D = {},
//     E = 1 + 1,
//     F = (() => 'foo')(),
// }
// 
// // Enum with incorrect syntax
// enum E13 {
//     postComma,
//     postValueComma = 1,
// 
//     postSemicolon;
//     postColonValueComma: 2,
//     postColonValueSemicolon: 3;
// };
// 
// enum E14 { a, b: any "hello" += 1, c, d}
// 
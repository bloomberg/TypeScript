// objectTypesWithOptionalProperties.d.ts
declare var a: {
    x?: number;
};
interface I {
    x?: number;
}
declare class C {
    x?: number;
}
interface I2<T> {
    x?: T;
}
declare class C2<T> {
    x?: T;
}
declare var b: {
    x: number;
};

// ==================
// Original test file: tsc-tests/updated-tests/conformance/types/objectTypeLiteral/methodSignatures/objectTypesWithOptionalProperties.ts
// // Basic uses of optional properties
// 
// var a: {
//     x?: number; // ok
// }
// 
// interface I {
//     x?: number; // ok
// }
// 
// class C {
//     x?: number; // ok
// }
// 
// interface I2<T> {
//     x?: T; // ok
// }
// 
// class C2<T> {
//     x?: T; // ok
// }
// 
// var b = {
//     x?: 1 // error
// }
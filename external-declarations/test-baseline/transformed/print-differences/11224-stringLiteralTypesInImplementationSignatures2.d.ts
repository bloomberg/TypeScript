// stringLiteralTypesInImplementationSignatures2.d.ts
declare function foo(x: any): any;
declare class C {
    foo(x: string): any;
}
interface I {
    (x: 'a'): any;
    (x: 'hi'): any;
    foo(x: 'a', y: 'a'): any;
    foo(x: 'hi', y: 'hi'): any;
}
declare var a: {
    (x: 'hi'): any;
    (x: 'a'): any;
    foo(x: 'hi'): any;
    foo(x: 'a'): any;
};
declare var b: {
    foo(x: 'hi'): void;
    foo(x: 'a'): void;
};

// ==================
// Original test file: tsc-tests/updated-tests/conformance/types/objectTypeLiteral/callSignatures/stringLiteralTypesInImplementationSignatures2.ts
// // String literal types are only valid in overload signatures
// 
// function foo(x: any): any;
// function foo(x: 'hi') { }
// 
// class C {
//     foo(x: string): any;
//     foo(x: 'hi') { }
// }
// 
// interface I {
//     (x: 'a');
//     (x: 'hi');
//     foo(x: 'a', y: 'a');
//     foo(x: 'hi', y: 'hi');
// }
// 
// var a: {
//     (x: 'hi');
//     (x: 'a');
//     foo(x: 'hi');
//     foo(x: 'a');
// }
// 
// var b = {
//     foo(x: 'hi'): void { },
//     foo(x: 'a'): void { },
// }
// 
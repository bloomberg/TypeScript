// stringLiteralTypesInImplementationSignatures.d.ts
declare function foo(x: 'hi'): void;
declare var f: (x: 'hi') => void;
declare var f2: (x: 'hi', y: 'hi') => void;
declare class C {
    foo(x: 'hi'): void;
}
interface I {
    (x: 'hi'): any;
    foo(x: 'hi', y: 'hi'): any;
}
declare var a: {
    (x: 'hi'): any;
    foo(x: 'hi'): any;
};
declare var b: {
    foo(x: 'hi'): void;
    a: (x: 'hi', y: 'hi') => void;
    b: (x: 'hi') => void;
};

// ==================
// Original test file: tsc-tests/updated-tests/conformance/types/objectTypeLiteral/callSignatures/stringLiteralTypesInImplementationSignatures.ts
// // String literal types are only valid in overload signatures
// 
// function foo(x: 'hi'): void { }
// var f = function foo(x: 'hi'): void { }
// var f2 = (x: 'hi', y: 'hi'): void => { }
// 
// class C {
//     foo(x: 'hi'): void { }
// }
// 
// interface I {
//     (x: 'hi');
//     foo(x: 'hi', y: 'hi');
// }
// 
// var a: {
//     (x: 'hi');
//     foo(x: 'hi');
// }
// 
// var b = {
//     foo(x: 'hi'): void { },
//     a: function foo(x: 'hi', y: 'hi'): void { },
//     b: (x: 'hi'): void => { }
// }
// 
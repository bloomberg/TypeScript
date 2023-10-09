// callSignaturesWithAccessibilityModifiersOnParameters.d.ts
declare function foo(x: any, private y: any): void;
declare var f: (x: any, y: any) => void;
declare var f2: (x: any, y: any) => void;
declare var f3: (x: any, y: any) => void;
declare var f4: <T>(x: T, y: T) => void;
declare function foo2(private x: string, y: number): void;
declare var f5: (x: string, y: number) => void;
declare var f6: (x: string, y: number) => void;
declare var f7: (x: string, y: number) => void;
declare var f8: <T>(x: T, y: T) => void;
declare class C {
    foo(x: any, private y: any): void;
    foo2(x: number, private y: string): void;
    foo3<T>(x: T, private y: T): void;
}
interface I {
    (private x: any, y: any): any;
    (private x: string, y: number): any;
    foo(private x: any, y: any): any;
    foo(x: number, y: string): any;
    foo3<T>(x: T, private y: T): any;
}
declare var a: {
    foo(x: any, private y: any): any;
    foo2(private x: number, y: string): any;
};
declare var b: {
    foo(x: any, y: any): void;
    a: (x: number, y: string) => void;
    b: <T>(x: T, y: T) => void;
};

// ==================
// Original test file: tsc-tests/updated-tests/conformance/types/objectTypeLiteral/callSignatures/callSignaturesWithAccessibilityModifiersOnParameters.ts
// // Call signature parameters do not allow accessibility modifiers
// 
// function foo(public x: any, private y: any): void { }
// var f = function foo(public x: any, private y: any): void { }
// var f2 = function (public x: any, private y: any): void { }
// var f3 = (x: any, private y: any): void => { }
// var f4 = <T>(public x: T, y: T): void => { }
// 
// function foo2(private x: string, public y: number): void { }
// var f5 = function foo(private x: string, public y: number): void { }
// var f6 = function (private x: string, public y: number): void { }
// var f7 = (private x: string, public y: number): void => { }
// var f8 = <T>(private x: T, public y: T): void => { }
// 
// class C {
//     foo(public x: any, private y: any): void { }
//     foo2(public x: number, private y: string): void { }
//     foo3<T>(public x: T, private y: T): void { }
// }
// 
// interface I {
//     (private x: any, public y: any);
//     (private x: string, public y: number);
//     foo(private x: any, public y: any);
//     foo(public x: number, y: string);
//     foo3<T>(x: T, private y: T);
// }
// 
// var a: {
//     foo(public x: any, private y: any);
//     foo2(private x: number, public y: string);
// };
// 
// var b = {
//     foo(public x: any, y: any): void { },
//     a: function foo(x: number, private y: string): void { },
//     b: <T>(public x: T, private y: T): void => { }
// }
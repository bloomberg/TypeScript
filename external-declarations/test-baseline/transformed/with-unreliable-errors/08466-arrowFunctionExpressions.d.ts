// arrowFunctionExpressions.d.ts
declare var a: (p: string) => number;
declare var a: (p: string) => number;
declare var b: any, any: any;
declare var b: (j: any) => number;
declare var c: number;
declare var d: any, any: any;
declare var d: (n: any) => any;
declare var d: (n: any) => any;
declare var p1: ([a]: [
    any
]) => void;
declare var p2: ([...a]: any[]) => void;
declare var p3: ([, a]: [
    any,
    any
]) => void;
declare var p4: ([, ...a]: [
    any?,
    ...any[]
]) => void;
declare var p5: ([a]: [
    number?
]) => void;
declare var p6: ({ a }: {
    a: any;
}) => void;
declare var p7: ({ a: { b } }: {
    a: {
        b: any;
    };
}) => void;
declare var p8: ({ a }: {
    a?: number;
}) => void;
declare var p9: ({ a: { b } }: {
    a?: {
        b?: number;
    };
}) => void;
declare var p10: ([{ value, done }]: [
    {
        value: any;
        done: any;
    }
]) => void;
declare class MyClass {
    m: (n: any) => any;
    p: (n: any) => this;
    fn(): void;
}
declare var arrrr: () => (m: number) => () => (n: number) => number;
declare var e: number;
declare var e: number;
declare function someFn(): void;
declare function someOtherFn(): void;
declare function outerFn(): void;
declare var f: (n: string) => () => string;
declare var g: string;
declare var g: string;
declare function someOuterFn(): (n: string) => () => () => number;
declare var h: number;
declare function tryCatchFn(): void;

// ==================
// Original test file: tsc-tests/updated-tests/conformance/expressions/functions/arrowFunctionExpressions.ts
// // ArrowFormalParameters => AssignmentExpression is equivalent to ArrowFormalParameters => { return AssignmentExpression; }
// var a = (p: string): number => p.length;
// var a = (p: string): number => { return p.length; }
// 
// // Identifier => Block is equivalent to(Identifier) => Block
// var b: any = j: any: any => { return 0; }
// var b = (j: any): number => { return 0; }
// 
// // Identifier => AssignmentExpression is equivalent to(Identifier) => AssignmentExpression
// var c: number;
// var d: any = n: any: any => c = n;
// var d = (n: any): any => c = n;
// var d: (n: any) => any;
// 
// // Binding patterns in arrow functions
// var p1 = ([a]: [
//         any
//     ]): void => { };
// var p2 = ([...a]: any[]): void => { };
// var p3 = ([, a]: [
//         any,
//         any
//     ]): void => { };
// var p4 = ([, ...a]: [
//         any?,
//         ...any[]
//     ]): void => { };
// var p5 = ([a = 1]: [
//         number?
//     ]): void => { };
// var p6 = ({ a }: {
//         a: any;
//     }): void => { };
// var p7 = ({ a: { b } }: {
//         a: {
//             b: any;
//         };
//     }): void => { };
// var p8 = ({ a = 1 }: {
//         a?: number;
//     }): void => { };
// var p9 = ({ a: { b = 1 } = { b: 1 } }: {
//         a?: {
//             b?: number;
//         };
//     }): void => { };
// var p10 = ([{ value, done }]: [
//         {
//             value: any;
//             done: any;
//         }
//     ]): void => { };
// 
// // Arrow function used in class member initializer
// // Arrow function used in class member function
// class MyClass {
//     m = (n: any): any => n + 1;
//     p = (n: any): this => n && this;
// 
//     fn(): void {
//         var m = (n) => n + 1;
//         var p = (n) => n && this;
//     }
// }
// 
// // Arrow function used in arrow function
// var arrrr = (): (m: number) => () => (n: number) => number => (m: number) => () => (n: number) => m + n;
// var e: number = arrrr()(3)()(4);
// var e: number;
// 
// // Arrow function used in arrow function used in function
// function someFn(): void {
//     var arr = (n: number) => (p: number) => p * n;
//     arr(3)(4).toExponential();
// }
// 
// // Arrow function used in function
// function someOtherFn(): void {
//     var arr = (n: number) => '' + n;
//     arr(4).charAt(0);
// }
// 
// // Arrow function used in nested function in function
// function outerFn(): void {
//     function innerFn() {
//         var arrowFn = () => { };
//         var p = arrowFn();
//         var p: void;
//     }
// }
// 
// // Arrow function used in nested function in arrow function
// var f = (n: string): () => string => {
//     function fn(x: number) {
//         return () => n + x;
//     }
//     return fn(4);
// }
// var g: string = f('')();
// var g: string;
// 
// 
// // Arrow function used in nested function in arrow function in nested function
// function someOuterFn(): (n: string) => () => () => number {
//     var arr = (n: string) => {
//         function innerFn() {
//             return () => n.length;
//         }
//         return innerFn;
//     }
//     return arr;
// }
// var h: number = someOuterFn()('')()();
// h.toExponential();
// 
// // Arrow function used in try/catch/finally in function
// function tryCatchFn(): void {
//     try {
//         var x = () => this;
//     } catch (e) {
//         var t = () => e + this;
//     } finally {
//         var m = () => this + '';
//     }
// }
// 
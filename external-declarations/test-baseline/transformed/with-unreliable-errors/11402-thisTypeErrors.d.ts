// thisTypeErrors.d.ts
declare var x1: this;
declare var x2: {
    a: this;
};
declare var x3: this[];
declare function f1(x: this): this;
interface I1 {
    a: {
        x: this;
    };
    b: {
        (): this;
    };
    c: {
        new (): this;
    };
    d: {
        [x: string]: this;
    };
    e: {
        f(x: this): this;
    };
}
declare class C1 {
    a: {
        x: this;
    };
    b: {
        (): this;
    };
    c: {
        new (): this;
    };
    d: {
        [x: string]: this;
    };
    e: {
        f(x: this): this;
    };
}
declare class C2 {
    static x: this;
    static y: any;
    static foo(x: this): this;
}
declare namespace N1 {
    var x: this;
    var y: any;
}
declare class C3 {
    x1: {
        g(x: any): any;
    };
    f(): void;
}

// ==================
// Original test file: tsc-tests/updated-tests/conformance/types/thisType/thisTypeErrors.ts
// var x1: this;
// var x2: { a: this };
// var x3: this[];
// 
// function f1(x: this): this {
//     var y: this;
//     return this;
// }
// 
// interface I1 {
//     a: { x: this };
//     b: { (): this };
//     c: { new (): this };
//     d: { [x: string]: this };
//     e: { f(x: this): this };
// }
// 
// class C1 {
//     a: { x: this };
//     b: { (): this };
//     c: { new (): this };
//     d: { [x: string]: this };
//     e: { f(x: this): this };
// }
// 
// class C2 {
//     static x: this;
//     static y = <this>undefined;
//     static foo(x: this): this {
//         return undefined;
//     }
// }
// 
// namespace N1 {
//     export var x: this;
//     export var y: any = this;
// }
// 
// class C3 {
//     x1 = {
//         g(x: this): this {
//             return undefined;
//         }
//     }
//     f(): void {
//         function g(x: this): this {
//             return undefined;
//         }
//         let x2 = {
//             h(x: this): this {
//                 return undefined;
//             }
//         }
//     }
// }
// 
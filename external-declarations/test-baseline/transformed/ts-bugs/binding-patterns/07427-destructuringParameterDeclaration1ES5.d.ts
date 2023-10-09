// destructuringParameterDeclaration1ES5.d.ts
declare function a1([a, b, [[c]]]: [number, number, string[][]]): void;
declare function a2(o: {
    x: number;
    a: number;
}): void;
declare function a3({ j, k, l: { m, n }, q: [a, b, c] }: {
    j: number;
    k: string;
    l: {
        m: boolean;
        n: number;
    };
    q: (number | string)[];
}): void;
declare function a4({ x, a }: {
    x: number;
    a: number;
}): void;
declare function b1(z?: any[]): void;
declare function b2(z?: any, o?: {
    x: number;
    y: any;
}): void;
declare function b3({ z: { x, y: { j } } }?: {
    z: {
        x: string;
        y: {
            j: number;
        };
    };
}): void;
interface F1 {
    b5(z: any, y: any, [, a, b]: [
        any,
        any,
        any
    ], { p, m: { q, r } }: {
        p: any;
        m: {
            q: any;
            r: any;
        };
    }): any;
}
declare function b6([a, z, y]?: [
    any,
    any,
    any
]): void;
declare function b7([[a], b, [[c, d]]]?: [
    [
        any
    ],
    any,
    [
        [any, any]
    ]
]): void;
declare enum Foo {
    a = 0
}
declare function c0({ z: { x, y: { j } } }: {
    z: {
        x: any;
        y: {
            j: any;
        };
    };
}): void;
declare function c1({ z }?: {
    z: number;
}): void;
declare function c2({ z }: {
    z?: number;
}): void;
declare function c3({ b }?: {
    b: number | string;
}): void;
declare function c5([a, b, [[c]]]: [
    any,
    any,
    [
        [any]
    ]
]): void;
declare function c6([a, b, [[c]]]: [
    any,
    any,
    [
        [number?]
    ]
]): void;
declare function d0(x?: any): void;
interface F2 {
    d3([a, b, c]?: [
        any,
        any,
        any
    ]): any;
    d4({ x, y, z }?: {
        x: any;
        y: any;
        z: any;
    }): any;
    e0([a, b, c]: [
        any,
        any,
        any
    ]): any;
}
declare class C2 implements F2 {
    constructor();
    d3(): void;
    d4(): void;
    e0([a, b, c]: [
        any,
        any,
        any
    ]): void;
}
declare class C3 implements F2 {
    d3([a, b, c]: [
        any,
        any,
        any
    ]): void;
    d4({ x, y, z }: {
        x: any;
        y: any;
        z: any;
    }): void;
    e0([a, b, c]: [
        any,
        any,
        any
    ]): void;
}
declare function d5({ x, y }?: {
    x: number;
    y: number;
}): void;
declare function e1({ x: number }: {
    x: any;
}): void;
declare function e2({ x }: {
    x: number;
}): void;
declare function e3({ x }: {
    x?: number;
}): void;
declare function e4({ x: [number, string, any] }: {
    x: [any, any, any];
}): void;
declare function e5({ x: [a, b, c] }: {
    x: [number, number, number];
}): void;

// ==================
// Original test file: tsc-tests/updated-tests/conformance/es6/destructuring/destructuringParameterDeclaration1ES5.ts
// // A parameter declaration may specify either an identifier or a binding pattern.
// // The identifiers specified in parameter declarations and binding patterns
// // in a parameter list must be unique within that parameter list.
// 
// // If the declaration includes a type annotation, the parameter is of that type
// function a1([a, b, [[c]]]: [number, number, string[][]]): void { }
// function a2(o: { x: number, a: number }): void { }
// function a3({j, k, l: {m, n}, q: [a, b, c]}: { j: number, k: string, l: { m: boolean, n: number }, q: (number|string)[] }): void { };
// function a4({x, a}: { x: number, a: number }): void { }
// 
// a1([1, 2, [["world"]]]);
// a1([1, 2, [["world"]], 3]);
// 
// // If the declaration includes an initializer expression (which is permitted only
// // when the parameter list occurs in conjunction with a function body),
// // the parameter type is the widened form (section 3.11) of the type of the initializer expression.
// 
// function b1(z: any[] = [undefined, null]): void { };
// function b2(z: any = null, o: {
//     x: number;
//     y: any;
// } = { x: 0, y: undefined }): void { }
// function b3({z: {x, y: {j}}}: {
//     z: {
//         x: string;
//         y: {
//             j: number;
//         };
//     };
// } = { z: { x: "hi", y: { j: 1 } } }): void { }
// 
// interface F1 {
//     b5(z: any, y: any, [, a, b]: [
//             any,
//             any,
//             any
//         ], {p, m: { q, r}}: {
//             p: any;
//             m: {
//                 q: any;
//                 r: any;
//             };
//         });
// }
// 
// function b6([a, z, y]: [
//     any,
//     any,
//     any
// ] = [undefined, null, undefined]): void { }
// function b7([[a], b, [[c, d]]]: [
//     [any],
//     any,
//     [[any, any]]
// ] = [[undefined], undefined, [[undefined, undefined]]]): void { }
// 
// b1([1, 2, 3]);  // z is widen to the type any[]
// b2("string", { x: 200, y: "string" });
// b2("string", { x: 200, y: true });
// b6(["string", 1, 2]);                    // Shouldn't be an error
// b7([["string"], 1, [[true, false]]]);    // Shouldn't be an error
// 
// 
// // If the declaration specifies a binding pattern, the parameter type is the implied type of that binding pattern (section 5.1.3)
// enum Foo { a }
// function c0({z: {x, y: {j}}}: {
//         z: {
//             x: any;
//             y: {
//                 j: any;
//             };
//         };
//     }): void { }
// function c1({z}: {
//     z: number;
// } = { z: 10 }): void { }
// function c2({z = 10}: {
//         z?: number;
//     }): void { }
// function c3({b}: { b: number|string} = { b: "hello" }): void { }
// function c5([a, b, [[c]]]: [
//         any,
//         any,
//         [[any]]
//     ]): void { }
// function c6([a, b, [[c=1]]]: [
//         any,
//         any,
//         [[number?]]
//     ]): void { }
// 
// c0({z : { x: 1, y: { j: "world" } }});      // Implied type is { z: {x: any, y: {j: any}} }
// c0({z : { x: "string", y: { j: true } }});  // Implied type is { z: {x: any, y: {j: any}} }
// 
// c1();             // Implied type is {z:number}?
// c1({ z: 1 })      // Implied type is {z:number}? 
// 
// c2({});         // Implied type is {z?: number}
// c2({z:1});      // Implied type is {z?: number}
// 
// c3({ b: 1 });     // Implied type is { b: number|string }.
// 
// c5([1, 2, [["string"]]]);               // Implied type is is [any, any, [[any]]]
// c5([1, 2, [["string"]], false, true]);  // Implied type is is [any, any, [[any]]]
// 
// // A parameter can be marked optional by following its name or binding pattern with a question mark (?)
// // or by including an initializer.
// 
// function d0(x?: any): void { }
// function d0(x = 10) { }
// 
// interface F2 {
//     d3([a, b, c]?: [
//             any,
//             any,
//             any
//         ]);
//     d4({x, y, z}?: {
//             x: any;
//             y: any;
//             z: any;
//         });
//     e0([a, b, c]: [
//             any,
//             any,
//             any
//         ]);
// }
// 
// class C2 implements F2 {
//     constructor() { }
//     d3(): void { }
//     d4(): void { }
//     e0([a, b, c]: [
//             any,
//             any,
//             any
//         ]): void { }
// }
// 
// class C3 implements F2 {
//     d3([a, b, c]: [
//             any,
//             any,
//             any
//         ]): void { }
//     d4({x, y, z}: {
//             x: any;
//             y: any;
//             z: any;
//         }): void { }
//     e0([a, b, c]: [
//             any,
//             any,
//             any
//         ]): void { }
// }
// 
// 
// function d5({x, y}: {
//     x: number;
//     y: number;
// } = { x: 1, y: 2 }): void { }
// d5();  // Parameter is optional as its declaration included an initializer
// 
// // Destructuring parameter declarations do not permit type annotations on the individual binding patterns,
// // as such annotations would conflict with the already established meaning of colons in object literals.
// // Type annotations must instead be written on the top- level parameter declaration
// 
// function e1({x: number}: {
//         x: any;
//     }): void { }  // x has type any NOT number
// function e2({x}: { x: number }): void { }  // x is type number
// function e3({x}: { x?: number }): void { }  // x is an optional with type number
// function e4({x: [number,string,any] }: {
//         x: [any, any, any];
//     }): void { }  // x has type [any, any, any]
// function e5({x: [a, b, c]}: { x: [number, number, number] }): void { }  // x has type [any, any, any]
// 
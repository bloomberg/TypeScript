// declarationsAndAssignments.d.ts
declare function f0(): void;
declare function f1(): void;
declare function f2(): void;
declare function f3(): void;
declare function f4(): void;
declare function f6(): void;
declare function f7(): void;
declare function f8(): void;
declare function f9(): void;
declare function f10(): void;
declare function f11(): void;
declare function f12(): void;
declare function f13(): void;
declare function f14([a, [b, { x, y }]]: [
    number,
    [
        string,
        {
            x: any;
            y?: boolean;
        }
    ]
]): void;
declare namespace M {
    const a: number;
    const b: number;
}
declare function f15(): {
    a: string;
    b: number;
    c: boolean;
};
declare function f16(): void;
declare function f17({ a, b, c }: {
    a?: string;
    b?: number;
    c?: boolean;
}): void;
declare function f18(): void;
declare function f19(): void;
declare function f20(v: [number, number, number]): void;
declare function f21(v: [number, string, boolean]): void;

// ==================
// Original test file: tsc-tests/updated-tests/conformance/es6/destructuring/declarationsAndAssignments.ts
// function f0(): void {
//     var [] = [1, "hello"];
//     var [x] = [1, "hello"];
//     var [x, y] = [1, "hello"];
//     var [x, y, z] = [1, "hello"];
//     var [,, x] = [0, 1, 2];
//     var x: number;
//     var y: string;
// }
// 
// function f1(): void {
//     var a = [1, "hello"];
//     var [x] = a;
//     var [x, y] = a;
//     var [x, y, z] = a;
//     var x: number | string;
//     var y: number | string;
//     var z: number | string;
// }
// 
// function f2(): void {
//     var { } = { x: 5, y: "hello" };       // Ok, empty binding pattern means nothing
//     var { x } = { x: 5, y: "hello" };     // Error, no y in target
//     var { y } = { x: 5, y: "hello" };     // Error, no x in target
//     var { x, y } = { x: 5, y: "hello" };
//     var x: number;
//     var y: string;
//     var { x: a } = { x: 5, y: "hello" };  // Error, no y in target
//     var { y: b } = { x: 5, y: "hello" };  // Error, no x in target
//     var { x: a, y: b } = { x: 5, y: "hello" };
//     var a: number;
//     var b: string;
// }
// 
// function f3(): void {
//     var [x, [y, [z]]] = [1, ["hello", [true]]];
//     var x: number;
//     var y: string;
//     var z: boolean;
// }
// 
// function f4(): void {
//     var { a: x, b: { a: y, b: { a: z }}} = { a: 1, b: { a: "hello", b: { a: true } } };
//     var x: number;
//     var y: string;
//     var z: boolean;
// }
// 
// function f6(): void {
//     var [x = 0, y = ""] = [1, "hello"];
//     var x: number;
//     var y: string;
// }
// 
// function f7(): void {
//     var [x = 0, y = 1] = [1, "hello"];  // Error, initializer for y must be string
//     var x: number;
//     var y: string;
// }
// 
// function f8(): void {
//     var [a, b, c] = [];   // Error, [] is an empty tuple
//     var [d, e, f] = [1];  // Error, [1] is a tuple
// }
// 
// function f9(): void {
//     var [a, b] = {};                // Error, not array type
//     var [c, d] = { 0: 10, 1: 20 };  // Error, not array type
//     var [e, f] = [10, 20];
// }
// 
// function f10(): void {
//     var { a, b } = {};  // Error
//     var { a, b } = [];  // Error
// }
// 
// function f11(): void {
//     var { x: a, y: b } = { x: 10, y: "hello" };
//     var { 0: a, 1: b } = { 0: 10, 1: "hello" };
//     var { "<": a, ">": b } = { "<": 10, ">": "hello" };
//     var { 0: a, 1: b } = [10, "hello"];
//     var a: number;
//     var b: string;
// }
// 
// function f12(): void {
//     var [a, [b, { x, y: c }] = ["abc", { x: 10, y: false }]] = [1, ["hello", { x: 5, y: true }]];
//     var a: number;
//     var b: string;
//     var x: number;
//     var c: boolean;
// }
// 
// function f13(): void {
//     var [x, y] = [1, "hello"];
//     var [a, b] = [[x, y], { x: x, y: y }];
// }
// 
// function f14([a = 1, [b = "hello", { x, y: c = false }]]: [
//         number,
//         [string, {
//             x: any;
//             y?: boolean;
//         }]
//     ]): void {
//     var a: number;
//     var b: string;
//     var c: boolean;
// }
// f14([2, ["abc", { x: 0, y: true }]]);
// f14([2, ["abc", { x: 0 }]]);
// f14([2, ["abc", { y: false }]]);  // Error, no x
// 
// module M {
//     const dest = [1, 2];
//     export const a: number = dest[0];
//     export const b: number = dest[1];
// }
// 
// function f15(): {
//     a: string;
//     b: number;
//     c: boolean;
// } {
//     var a = "hello";
//     var b = 1;
//     var c = true;
//     return { a, b, c };
// }
// 
// function f16(): void {
//     var { a, b, c } = f15();
// }
// 
// function f17({ a = "", b = 0, c = false }: {
//         a?: string;
//         b?: number;
//         c?: boolean;
//     }): void {
// }
// 
// f17({});
// f17({ a: "hello" });
// f17({ c: true });
// f17(f15());
// 
// function f18(): void {
//     var a: number;
//     var b: string;
//     var aa: number[];
//     ({ a, b } = { a, b });
//     ({ a, b } = { b, a });
//     [aa[0], b] = [a, b];
//     [a, b] = [b, a];  // Error
//     [a = 1, b = "abc"] = [2, "def"];
// }
// 
// function f19(): void {
//     var a, b;
//     [a, b] = [1, 2];
//     [a, b] = [b, a];
//     ({ a, b } = { b, a });
//     [[a, b] = [1, 2]] = [[2, 3]];
//     var x = ([a, b] = [1, 2]);
// }
// 
// function f20(v: [number, number, number]): void {
//     var x: number;
//     var y: number;
//     var z: number;
//     var a0: [];
//     var a1: [number];
//     var a2: [number, number];
//     var a3: [number, number, number];
//     var [...a3] = v;
//     var [x, ...a2] = v;
//     var [x, y, ...a1] = v;
//     var [x, y, z, ...a0] = v;
//     [...a3] = v;
//     [x, ...a2] = v;
//     [x, y, ...a1] = v;
//     [x, y, z, ...a0] = v;
// }
// 
// function f21(v: [number, string, boolean]): void {
//     var x: number;
//     var y: string;
//     var z: boolean;
//     var a0: [number, string, boolean];
//     var a1: [string, boolean];
//     var a2: [boolean];
//     var a3: [];
//     var [...a0] = v;
//     var [x, ...a1] = v;
//     var [x, y, ...a2] = v;
//     var [x, y, z, ...a3] = v;
//     [...a0] = v;
//     [x, ...a1] = v;
//     [x, y, ...a2] = v;
//     [x, y, z, ...a3] = v;
// }
// 
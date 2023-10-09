// validMultipleVariableDeclarations.d.ts
declare var x: number;
declare var x: number;
declare var x: number;
declare function declSpace(): void;
interface Point {
    x: number;
    y: number;
}
declare var p: Point;
declare var p: {
    x: number;
    y: number;
};
declare var p: Point;
declare var p: {
    x: number;
    y: number;
};
declare var p: {
    x: number;
    y: number;
};
declare var p: {
    x: number;
    y: number;
};
declare var p: typeof p;
declare var fn: (s: string) => number;
declare var fn: (s: string) => number;
declare var fn: (s: string) => number;
declare var fn: {
    (s: string): number;
};
declare var fn: (s: string) => number;
declare var fn: typeof fn;
declare var a: string[];
declare var a: string[];
declare var a: string[];
declare var a: string[];
declare var a: string[];
declare var a: typeof a;

// ==================
// Original test file: tsc-tests/updated-tests/conformance/statements/VariableStatements/validMultipleVariableDeclarations.ts
// // all expected to be valid
// 
// var x: number;
// var x = 2;
// if (true) {
//     var x = 3;
//     for (var x = 0; ;) { }
// }
// var x = <number>undefined;
// 
// // new declaration space, making redeclaring x as a string valid
// function declSpace(): void {
//     var x = 'this is a string';
// }
// 
// interface Point { x: number; y: number; }
// 
// var p: Point;
// var p = { x: 1, y: 2 };
// var p: Point = { x: 0, y: undefined };
// var p = { x: 1, y: <number>undefined };
// var p: { x: number; y: number; } = { x: 1, y: 2 };
// var p = <{ x: number; y: number; }>{ x: 0, y: undefined };
// var p: typeof p;
// 
// var fn = function (s: string): number { return 42; }
// var fn = (s: string): number => 3;
// var fn: (s: string) => number;
// var fn: { (s: string): number };
// var fn = <(s: string) => number> null;
// var fn: typeof fn;
// 
// var a: string[]; 
// var a: string[] = ['a', 'b']
// var a = <string[]>[];
// var a: string[] = [];
// var a: string[] = new Array<string>();
// var a: typeof a;
// 
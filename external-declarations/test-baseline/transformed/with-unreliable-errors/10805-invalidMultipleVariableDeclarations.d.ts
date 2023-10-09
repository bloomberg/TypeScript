// invalidMultipleVariableDeclarations.d.ts
interface I {
    id: number;
}
declare class C implements I {
    id: number;
    valid: boolean;
}
declare class C2 extends C {
    name: string;
}
declare class D<T> {
    source: T;
    recurse: D<T>;
    wrapped: D<D<T>>;
}
declare function F(x: string): number;
declare namespace M {
    class A {
        name: string;
    }
    function F2(x: number): string;
}
declare var a: any;
declare var a: number;
declare var a: string;
declare var a: any;
declare var a: any;
declare var a: any;
declare var b: I;
declare var b: I;
declare var b: I;
declare var f: typeof F;
declare var f: (x: number) => string;
declare var arr: string[];
declare var arr: string[];
declare var arr: string[];
declare var arr2: D<string>[];
declare var arr2: D<string>[];
declare var m: typeof M;
declare var m: typeof M;

// ==================
// Original test file: tsc-tests/updated-tests/conformance/statements/VariableStatements/invalidMultipleVariableDeclarations.ts
// interface I {
//     id: number;
// }
// 
// class C implements I {
//     id: number;
//     valid: boolean;
// }
// 
// class C2 extends C {
//     name: string;
// }
// 
// class D<T>{
//     source: T;
//     recurse: D<T>;
//     wrapped: D<D<T>>
// }
// 
// function F(x: string): number { return 42; }
// 
// module M {
//     export class A {
//         name: string;
//     }
// 
//     export function F2(x: number): string { return x.toString(); }
// }
// 
// // all of these are errors
// var a: any;
// var a = 1;
// var a = 'a string';
// var a: any = new C();
// var a: any = new D<string>();
// var a: any = M;
// 
// var b: I;
// var b: I = new C();
// var b: I = new C2();
// 
// var f: typeof F = F;
// var f = (x: number): string => '';
// 
// var arr: string[];
// var arr: string[] = [1, 2, 3, 4];
// var arr: string[] = [new C(), new C2(), new D<string>()];
// 
// var arr2: D<string>[] = [new D<string>()];
// var arr2: D<string>[] = new Array<D<number>>();
// 
// var m: typeof M;
// var m: typeof M = M.A;
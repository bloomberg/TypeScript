// emitArrowFunctionES6.d.ts
declare var f1: () => void;
declare var f2: (x: string, y: string) => void;
declare var f3: (x: string, y: number, ...rest: any[]) => void;
declare var f4: (x: string, y: number, z?: number) => void;
declare function foo(func: () => boolean): void;
declare var p1: ([a]: [
    any
]) => void;
declare var p2: ([...a]: Iterable<any>) => void;
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

// ==================
// Original test file: tsc-tests/updated-tests/conformance/es6/arrowFunction/emitArrowFunctionES6.ts
// // @target:es6
// var f1 = (): void => { }
// var f2 = (x: string, y: string): void => { }
// var f3 = (x: string, y: number, ...rest: any[]): void => { }
// var f4 = (x: string, y: number, z: number=10): void => { }
// function foo(func: () => boolean): void { }
// foo(() => true);
// foo(() => { return false; });
// 
// // Binding patterns in arrow functions
// var p1 = ([a]: [
//         any
//     ]): void => { };
// var p2 = ([...a]: Iterable<any>): void => { };
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
// subtypingWithCallSignatures2.d.ts
declare class Base {
    foo: string;
}
declare class Derived extends Base {
    bar: string;
}
declare class Derived2 extends Derived {
    baz: string;
}
declare class OtherDerived extends Base {
    bing: string;
}
declare function foo1(a: (x: number) => number[]): typeof a;
declare function foo1(a: any): any;
declare function foo2(a: (x: number) => string[]): typeof a;
declare function foo2(a: any): any;
declare function foo3(a: (x: number) => void): typeof a;
declare function foo3(a: any): any;
declare function foo4(a: (x: string, y: number) => string): typeof a;
declare function foo4(a: any): any;
declare function foo5(a: (x: (arg: string) => number) => string): typeof a;
declare function foo5(a: any): any;
declare function foo6(a: (x: (arg: Base) => Derived) => Base): typeof a;
declare function foo6(a: any): any;
declare function foo7(a: (x: (arg: Base) => Derived) => (r: Base) => Derived): typeof a;
declare function foo7(a: any): any;
declare function foo8(a: (x: (arg: Base) => Derived, y: (arg2: Base) => Derived) => (r: Base) => Derived): typeof a;
declare function foo8(a: any): any;
declare function foo9(a: (x: (arg: Base) => Derived, y: (arg2: Base) => Derived) => (r: Base) => Derived): typeof a;
declare function foo9(a: any): any;
declare function foo10(a: (...x: Derived[]) => Derived): typeof a;
declare function foo10(a: any): any;
declare function foo11(a: (x: {
    foo: string;
}, y: {
    foo: string;
    bar: string;
}) => Base): typeof a;
declare function foo11(a: any): any;
declare function foo12(a: (x: Array<Base>, y: Array<Derived2>) => Array<Derived>): typeof a;
declare function foo12(a: any): any;
declare function foo13(a: (x: Array<Base>, y: Array<Derived>) => Array<Derived>): typeof a;
declare function foo13(a: any): any;
declare function foo14(a: (x: {
    a: string;
    b: number;
}) => Object): typeof a;
declare function foo14(a: any): any;
declare function foo15(a: {
    (x: number): number[];
    (x: string): string[];
}): typeof a;
declare function foo15(a: any): any;
declare function foo16(a: {
    <T extends Derived>(x: T): number[];
    <U extends Base>(x: U): number[];
}): typeof a;
declare function foo16(a: any): any;
declare function foo17(a: {
    (x: (a: number) => number): number[];
    (x: (a: string) => string): string[];
}): typeof a;
declare function foo17(a: any): any;
declare function foo18(a: {
    (x: {
        (a: number): number;
        (a: string): string;
    }): any[];
    (x: {
        (a: boolean): boolean;
        (a: Date): Date;
    }): any[];
}): typeof a;
declare function foo18(a: any): any;
declare var r1arg1: <T>(x: T) => T[];
declare var r1arg2: (x: number) => number[];
declare var r1: (x: number) => number[];
declare var r1a: ((x: number) => number[])[];
declare var r1b: ((x: number) => number[])[];
declare var r2arg1: <T>(x: T) => string[];
declare var r2arg2: (x: number) => string[];
declare var r2: (x: number) => string[];
declare var r2a: ((x: number) => string[])[];
declare var r2b: ((x: number) => string[])[];
declare var r3arg1: <T>(x: T) => T;
declare var r3arg2: (x: number) => void;
declare var r3: (x: number) => void;
declare var r3a: ((x: number) => void)[];
declare var r3b: ((x: number) => void)[];
declare var r4arg1: <T, U>(x: T, y: U) => T;
declare var r4arg2: (x: string, y: number) => string;
declare var r4: (x: string, y: number) => string;
declare var r4a: ((x: string, y: number) => string)[];
declare var r4b: ((x: string, y: number) => string)[];
declare var r5arg1: <T, U>(x: (arg: T) => U) => T;
declare var r5arg2: (x: (arg: string) => number) => string;
declare var r5: (x: (arg: string) => number) => string;
declare var r5a: ((x: (arg: string) => number) => string)[];
declare var r5b: ((x: (arg: string) => number) => string)[];
declare var r6arg1: <T extends Base, U extends Derived>(x: (arg: T) => U) => T;
declare var r6arg2: (x: (arg: Base) => Derived) => Base;
declare var r6: (x: (arg: Base) => Derived) => Base;
declare var r6a: ((x: (arg: Base) => Derived) => Base)[];
declare var r6b: ((x: (arg: Base) => Derived) => Base)[];
declare var r7arg1: <T extends Base, U extends Derived>(x: (arg: T) => U) => (r: T) => U;
declare var r7arg2: (x: (arg: Base) => Derived) => (r: Base) => Derived;
declare var r7: (x: (arg: Base) => Derived) => (r: Base) => Derived;
declare var r7a: ((x: (arg: Base) => Derived) => (r: Base) => Derived)[];
declare var r7b: ((x: (arg: Base) => Derived) => (r: Base) => Derived)[];
declare var r8arg1: <T extends Base, U extends Derived>(x: (arg: T) => U, y: (arg2: T) => U) => (r: T) => U;
declare var r8arg2: (x: (arg: Base) => Derived, y: (arg2: Base) => Derived) => (r: Base) => Derived;
declare var r8: (x: (arg: Base) => Derived, y: (arg2: Base) => Derived) => (r: Base) => Derived;
declare var r8a: ((x: (arg: Base) => Derived, y: (arg2: Base) => Derived) => (r: Base) => Derived)[];
declare var r8b: ((x: (arg: Base) => Derived, y: (arg2: Base) => Derived) => (r: Base) => Derived)[];
declare var r9arg1: <T extends Base, U extends Derived>(x: (arg: T) => U, y: (arg2: {
    foo: string;
    bing: number;
}) => U) => (r: T) => U;
declare var r9arg2: (x: (arg: Base) => Derived, y: (arg2: Base) => Derived) => (r: Base) => Derived;
declare var r9: (x: (arg: Base) => Derived, y: (arg2: Base) => Derived) => (r: Base) => Derived;
declare var r9a: ((x: (arg: Base) => Derived, y: (arg2: Base) => Derived) => (r: Base) => Derived)[];
declare var r9b: ((x: (arg: Base) => Derived, y: (arg2: Base) => Derived) => (r: Base) => Derived)[];
declare var r10arg1: <T extends Derived>(...x: T[]) => T;
declare var r10arg2: (...x: Derived[]) => Derived;
declare var r10: (...x: Derived[]) => Derived;
declare var r10a: ((...x: Derived[]) => Derived)[];
declare var r10b: ((...x: Derived[]) => Derived)[];
declare var r11arg1: <T extends Base>(x: T, y: T) => T;
declare var r11arg2: (x: {
    foo: string;
}, y: {
    foo: string;
    bar: string;
}) => Base;
declare var r11: (x: {
    foo: string;
}, y: {
    foo: string;
    bar: string;
}) => Base;
declare var r11a: ((x: {
    foo: string;
}, y: {
    foo: string;
    bar: string;
}) => Base)[];
declare var r11b: ((x: {
    foo: string;
}, y: {
    foo: string;
    bar: string;
}) => Base)[];
declare var r12arg1: <T extends Array<Base>>(x: Array<Base>, y: T) => Derived[];
declare var r12arg2: (x: Array<Base>, y: Array<Derived2>) => Derived[];
declare var r12: (x: Base[], y: Derived2[]) => Derived[];
declare var r12a: ((x: Base[], y: Derived2[]) => Derived[])[];
declare var r12b: ((x: Base[], y: Derived2[]) => Derived[])[];
declare var r13arg1: <T extends Array<Derived>>(x: Array<Base>, y: T) => T;
declare var r13arg2: (x: Array<Base>, y: Array<Derived>) => Derived[];
declare var r13: (x: Base[], y: Derived[]) => Derived[];
declare var r13a: ((x: Base[], y: Derived[]) => Derived[])[];
declare var r13b: ((x: Base[], y: Derived[]) => Derived[])[];
declare var r14arg1: <T>(x: {
    a: T;
    b: T;
}) => T;
declare var r14arg2: (x: {
    a: string;
    b: number;
}) => Object;
declare var r14: any;
declare var r14a: ((<T>(x: {
    a: T;
    b: T;
}) => T) | ((x: {
    a: string;
    b: number;
}) => Object))[];
declare var r14b: ((<T>(x: {
    a: T;
    b: T;
}) => T) | ((x: {
    a: string;
    b: number;
}) => Object))[];
declare var r15arg1: <T>(x: T) => T[];
declare var r15: any;
declare var r16arg1: <T extends Base>(x: T) => number[];
declare var r16: {
    <T extends Derived>(x: T): number[];
    <U extends Base>(x: U): number[];
};
declare var r17arg1: <T>(x: (a: T) => T) => T[];
declare var r17: any;
declare var r18arg1: <T>(x: (a: T) => T) => T[];
declare var r18: {
    (x: {
        (a: number): number;
        (a: string): string;
    }): any[];
    (x: {
        (a: boolean): boolean;
        (a: Date): Date;
    }): any[];
};

// ==================
// Original test file: tsc-tests/updated-tests/conformance/types/typeRelationships/subtypesAndSuperTypes/subtypingWithCallSignatures2.ts
// // checking subtype relations for function types as it relates to contextual signature instantiation
// 
// class Base { foo: string; }
// class Derived extends Base { bar: string; }
// class Derived2 extends Derived { baz: string; }
// class OtherDerived extends Base { bing: string; }
// 
// declare function foo1(a: (x: number) => number[]): typeof a;
// declare function foo1(a: any): any;
// 
// declare function foo2(a: (x: number) => string[]): typeof a;
// declare function foo2(a: any): any;
// 
// declare function foo3(a: (x: number) => void): typeof a;
// declare function foo3(a: any): any;
// 
// declare function foo4(a: (x: string, y: number) => string): typeof a;
// declare function foo4(a: any): any;
// 
// declare function foo5(a: (x: (arg: string) => number) => string): typeof a;
// declare function foo5(a: any): any;
// 
// declare function foo6(a: (x: (arg: Base) => Derived) => Base): typeof a;
// declare function foo6(a: any): any;
// 
// declare function foo7(a: (x: (arg: Base) => Derived) => (r: Base) => Derived): typeof a;
// declare function foo7(a: any): any;
// 
// declare function foo8(a: (x: (arg: Base) => Derived, y: (arg2: Base) => Derived) => (r: Base) => Derived): typeof a;
// declare function foo8(a: any): any;
// 
// declare function foo9(a: (x: (arg: Base) => Derived, y: (arg2: Base) => Derived) => (r: Base) => Derived): typeof a;
// declare function foo9(a: any): any;
// 
// declare function foo10(a: (...x: Derived[]) => Derived): typeof a;
// declare function foo10(a: any): any;
// 
// declare function foo11(a: (x: { foo: string }, y: { foo: string; bar: string }) => Base): typeof a;
// declare function foo11(a: any): any;
// 
// declare function foo12(a: (x: Array<Base>, y: Array<Derived2>) => Array<Derived>): typeof a;
// declare function foo12(a: any): any;
// 
// declare function foo13(a: (x: Array<Base>, y: Array<Derived>) => Array<Derived>): typeof a;
// declare function foo13(a: any): any;
// 
// declare function foo14(a: (x: { a: string; b: number }) => Object): typeof a;
// declare function foo14(a: any): any;
// 
// declare function foo15(a: { 
//     (x: number): number[];
//     (x: string): string[]; 
// }): typeof a;
// declare function foo15(a: any): any;
// 
// declare function foo16(a: {
//     <T extends Derived>(x: T): number[];
//     <U extends Base>(x: U): number[];
// }): typeof a;
// declare function foo16(a: any): any;
// 
// declare function foo17(a: {
//     (x: (a: number) => number): number[];
//     (x: (a: string) => string): string[];
// }): typeof a;
// declare function foo17(a: any): any;
// 
// declare function foo18(a: {
//     (x: {
//         (a: number): number;
//         (a: string): string;
//     }): any[];
//     (x: {
//         (a: boolean): boolean;
//         (a: Date): Date;
//     }): any[];
// }): typeof a;
// declare function foo18(a: any): any;
// 
// var r1arg1 = <T>(x: T): T[] => [x];
// var r1arg2 = (x: number): number[] => [1];
// var r1: (x: number) => number[] = foo1(r1arg1); // any, return types are not subtype of first overload
// var r1a: ((x: number) => number[])[] = [r1arg2, r1arg1]; // generic signature, subtype in both directions
// var r1b: ((x: number) => number[])[] = [r1arg1, r1arg2]; // generic signature, subtype in both directions
// 
// var r2arg1 = <T>(x: T): string[] => [''];
// var r2arg2 = (x: number): string[] => [''];
// var r2: (x: number) => string[] = foo2(r2arg1); 
// var r2a: ((x: number) => string[])[] = [r2arg1, r2arg2];
// var r2b: ((x: number) => string[])[] = [r2arg2, r2arg1];
// 
// var r3arg1 = <T>(x: T): T => x;
// var r3arg2 = (x: number): void => { };
// var r3: (x: number) => void = foo3(r3arg1); 
// var r3a: ((x: number) => void)[] = [r3arg1, r3arg2];
// var r3b: ((x: number) => void)[] = [r3arg2, r3arg1];
// 
// var r4arg1 = <T, U>(x: T, y: U): T => x;
// var r4arg2 = (x: string, y: number): string => '';
// var r4: (x: string, y: number) => string = foo4(r4arg1); // any
// var r4a: ((x: string, y: number) => string)[] = [r4arg1, r4arg2];
// var r4b: ((x: string, y: number) => string)[] = [r4arg2, r4arg1];
// 
// var r5arg1 = <T, U>(x: (arg: T) => U): T => <T>null;
// var r5arg2 = (x: (arg: string) => number): string => '';
// var r5: (x: (arg: string) => number) => string = foo5(r5arg1); // any
// var r5a: ((x: (arg: string) => number) => string)[] = [r5arg1, r5arg2];
// var r5b: ((x: (arg: string) => number) => string)[] = [r5arg2, r5arg1];
// 
// var r6arg1 = <T extends Base, U extends Derived>(x: (arg: T) => U): T => <T>null;
// var r6arg2 = (x: (arg: Base) => Derived): Base => <Base>null;
// var r6: (x: (arg: Base) => Derived) => Base = foo6(r6arg1); // any
// var r6a: ((x: (arg: Base) => Derived) => Base)[] = [r6arg1, r6arg2];
// var r6b: ((x: (arg: Base) => Derived) => Base)[] = [r6arg2, r6arg1];
// 
// var r7arg1 = <T extends Base, U extends Derived>(x: (arg: T) => U): (r: T) => U => (r: T) => <U>null;
// var r7arg2 = (x: (arg: Base) => Derived): (r: Base) => Derived => (r: Base) => <Derived>null;
// var r7: (x: (arg: Base) => Derived) => (r: Base) => Derived = foo7(r7arg1); // any
// var r7a: ((x: (arg: Base) => Derived) => (r: Base) => Derived)[] = [r7arg1, r7arg2];
// var r7b: ((x: (arg: Base) => Derived) => (r: Base) => Derived)[] = [r7arg2, r7arg1];
// 
// var r8arg1 = <T extends Base, U extends Derived>(x: (arg: T) => U, y: (arg2: T) => U): (r: T) => U => (r: T) => <U>null;
// var r8arg2 = (x: (arg: Base) => Derived, y: (arg2: Base) => Derived): (r: Base) => Derived => (r: Base) => <Derived>null;
// var r8: (x: (arg: Base) => Derived, y: (arg2: Base) => Derived) => (r: Base) => Derived = foo8(r8arg1); // any
// var r8a: ((x: (arg: Base) => Derived, y: (arg2: Base) => Derived) => (r: Base) => Derived)[] = [r8arg1, r8arg2];
// var r8b: ((x: (arg: Base) => Derived, y: (arg2: Base) => Derived) => (r: Base) => Derived)[] = [r8arg2, r8arg1];
// 
// var r9arg1 = <T extends Base, U extends Derived>(x: (arg: T) => U, y: (arg2: { foo: string; bing: number }) => U): (r: T) => U => (r: T) => <U>null;
// var r9arg2 = (x: (arg: Base) => Derived, y: (arg2: Base) => Derived): (r: Base) => Derived => (r: Base) => <Derived>null;
// var r9: (x: (arg: Base) => Derived, y: (arg2: Base) => Derived) => (r: Base) => Derived = foo9(r9arg1); // any
// var r9a: ((x: (arg: Base) => Derived, y: (arg2: Base) => Derived) => (r: Base) => Derived)[] = [r9arg1, r9arg2];
// var r9b: ((x: (arg: Base) => Derived, y: (arg2: Base) => Derived) => (r: Base) => Derived)[] = [r9arg2, r9arg1];
// 
// var r10arg1 = <T extends Derived>(...x: T[]): T => x[0];
// var r10arg2 = (...x: Derived[]): Derived => <Derived>null;
// var r10: (...x: Derived[]) => Derived = foo10(r10arg1); // any
// var r10a: ((...x: Derived[]) => Derived)[] = [r10arg1, r10arg2];
// var r10b: ((...x: Derived[]) => Derived)[] = [r10arg2, r10arg1];
// 
// var r11arg1 = <T extends Base>(x: T, y: T): T => x;
// var r11arg2 = (x: { foo: string }, y: { foo: string; bar: string }): Base => <Base>null;
// var r11: (x: {
//     foo: string;
// }, y: {
//     foo: string;
//     bar: string;
// }) => Base = foo11(r11arg1); // any
// var r11a: ((x: {
//     foo: string;
// }, y: {
//     foo: string;
//     bar: string;
// }) => Base)[] = [r11arg1, r11arg2];
// var r11b: ((x: {
//     foo: string;
// }, y: {
//     foo: string;
//     bar: string;
// }) => Base)[] = [r11arg2, r11arg1];
// 
// var r12arg1 = <T extends Array<Base>>(x: Array<Base>, y: T): Derived[] => <Array<Derived>>null;
// var r12arg2 = (x: Array<Base>, y: Array<Derived2>): Derived[] => <Array<Derived>>null;
// var r12: (x: Base[], y: Derived2[]) => Derived[] = foo12(r12arg1); // any
// var r12a: ((x: Base[], y: Derived2[]) => Derived[])[] = [r12arg1, r12arg2];
// var r12b: ((x: Base[], y: Derived2[]) => Derived[])[] = [r12arg2, r12arg1];
// 
// var r13arg1 = <T extends Array<Derived>>(x: Array<Base>, y: T): T => y;
// var r13arg2 = (x: Array<Base>, y: Array<Derived>): Derived[] => <Array<Derived>>null;
// var r13: (x: Base[], y: Derived[]) => Derived[] = foo13(r13arg1); // any
// var r13a: ((x: Base[], y: Derived[]) => Derived[])[] = [r13arg1, r13arg2];
// var r13b: ((x: Base[], y: Derived[]) => Derived[])[] = [r13arg2, r13arg1];
// 
// var r14arg1 = <T>(x: { a: T; b: T }): T => x.a;
// var r14arg2 = (x: { a: string; b: number }): Object => <Object>null;
// var r14: any = foo14(r14arg1); // any
// var r14a: ((<T>(x: {
//     a: T;
//     b: T;
// }) => T) | ((x: {
//     a: string;
//     b: number;
// }) => Object))[] = [r14arg1, r14arg2];
// var r14b: ((<T>(x: {
//     a: T;
//     b: T;
// }) => T) | ((x: {
//     a: string;
//     b: number;
// }) => Object))[] = [r14arg2, r14arg1];
// 
// var r15arg1 = <T>(x: T): T[] => <T[]>null
// var r15: any = foo15(r15arg1); // any
// var r16arg1 = <T extends Base>(x: T): number[] => [1];
// var r16: {
//     <T extends Derived>(x: T): number[];
//     <U extends Base>(x: U): number[];
// } = foo16(r16arg1); 
// var r17arg1 = <T>(x: (a: T) => T): T[] => <T[]>null;
// var r17: any = foo17(r17arg1); // any
// var r18arg1 = <T>(x: (a: T) => T): T[] => <T[]>null;
// var r18: {
//     (x: {
//         (a: number): number;
//         (a: string): string;
//     }): any[];
//     (x: {
//         (a: boolean): boolean;
//         (a: Date): Date;
//     }): any[];
// } = foo18(r18arg1); 
// 
//// [tests/cases/compiler/isolatedDeclarationsAddUndefined.ts] ////

//// [file1.ts]
type N = 1;
export class Bar {
    c? = [2 as N] as const;
    c3? = 1 as N;
    readonly r = 1;
    f = 2;
}

//// [file2.ts]
export function foo(p = (ip = 10, v: number): void => {}): void{
}
export class Bar2 {
    readonly r = 1;
    f = 2;
}

/// [Declarations] ////



//// [file1.d.ts]
type N = 1;
export declare class Bar {
    c?: readonly [N] | undefined;
    c3?: invalid | undefined;
    readonly r = 1;
    f: number;
}
export {};

//// [file2.d.ts]
export declare function foo(p?: (ip: invalid, v: number) => void): void;
export declare class Bar2 {
    readonly r = 1;
    f: number;
}

/// [Errors] ////

file1.ts(4,11): error TS9012: Property must have an explicit type annotation with --isolatedDeclarations.
file2.ts(1,26): error TS9026: Declaration emit for this parameter requires implicitly adding undefined to it's type. This is not supported with --isolatedDeclarations.


==== file1.ts (1 errors) ====
    type N = 1;
    export class Bar {
        c? = [2 as N] as const;
        c3? = 1 as N;
              ~~~~~~
!!! error TS9012: Property must have an explicit type annotation with --isolatedDeclarations.
!!! related TS9030 file1.ts:4:5: Add a type annotation to the property c3.
        readonly r = 1;
        f = 2;
    }
    
==== file2.ts (1 errors) ====
    export function foo(p = (ip = 10, v: number): void => {}): void{
                             ~~~~~~~
!!! error TS9026: Declaration emit for this parameter requires implicitly adding undefined to it's type. This is not supported with --isolatedDeclarations.
!!! related TS9029 file2.ts:1:26: Add a type annotation to the parameter ip.
    }
    export class Bar2 {
        readonly r = 1;
        f = 2;
    }
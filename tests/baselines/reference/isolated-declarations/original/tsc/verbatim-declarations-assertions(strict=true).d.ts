//// [tests/cases/compiler/verbatim-declarations-assertions.ts] ////

//// [assertToTypeReferences.ts]
type P = { } & { name: string }

export let vLet = null! as P
export const vConst = null! as P

export function fn(p = null! as P) {}

export function fnWithRequiredDefaultParam(p = null! as P, req: number) {}

export class C {
    field = null! as P
    readonly roFiled = null! as P;
    method(p = null! as P) {}
    methodWithRequiredDefault(p = null! as P, req: number) {}

    constructor(public ctorField = null! as P) {}
}

export default null! as P;

//// [assertToTypeLiteral.ts]
export let vLet = null! as {} & { name: string }
export const vConst = null! as {} & { name: string }

export function fn(p = null! as {} & { name: string }) {}

export function fnWithRequiredDefaultParam(p = null! as {} & { name: string }, req: number) {}

export class C {
    field = null! as {} & { name: string }
    readonly roFiled = null! as {} & { name: string };
    method(p = null! as {} & { name: string }) {}
    methodWithRequiredDefault(p = null! as {} & { name: string }, req: number) {}

    constructor(public ctorField = null! as {} & { name: string }) {}

    get x() { return null! as {} & { name: string } }
    set x(v) { }
}

export default null! as {} & { name: string }


//// [assertToOtherTypes.ts]
export const vNumberLiteral = null! as 1 | 1
export const vStringLiteral = null! as "1" | "1"
export const vLiteral = null! as "1" | "1"

type R = { foo: string }

export class C {
    // under !strictNullChecks all types can be reused from the assertion
    // under strictNullChecks we need to add undefined, and we can't always know we can
    // Can't know if references contain undefined, fall back to inference
    tsResolve? = null! as R | R;
    tsResolve2? = null! as R | R | string;
    // Simple type. we can add undefined
    reuseType? = null! as ((p: R) => void) | string | string;
    reuseType2? = null! as (new (p: R) => R) | string | string;
    reuseType3? = null! as string | number | bigint | symbol | unknown | any | never | symbol;
    reuseType4? = null! as [R, R, R] | [R, R, R];
    reuseType5? = null! as R[] | R[];
    reuseType6? = null! as 1 | "2" | 1n | 1n;
    reuseType7? = null! as `A` | `A`;
    reuseType8? = null! as `${string}-ok` | `${string}-ok`;
    reuseType9? = null! as this | this;
}

//// [angularAssertionToTypeReferences.ts]
type P = { } & { name: string }

export let vLet = <P>null!
export const vConst = <P>null!

export function fn(p = <P>null!) {}

export function fnWithRequiredDefaultParam(p = <P>null!, req: number) {}

export class C {
    field = <P>null!
    optField? = <P>null!
    readonly roFiled = <P>null!;
    method(p = <P>null!) {}
    methodWithRequiredDefault(p = <P>null!, req: number) {}

    constructor(public ctorField = <P>null!) {}
}

/// [Declarations] ////



//// [angularAssertionToTypeReferences.d.ts]
type P = {} & {
    name: string;
};
export declare let vLet: P;
export declare const vConst: P;
export declare function fn(p?: P): invalid;
export declare function fnWithRequiredDefaultParam(p: invalid, req: number): invalid;
export declare class C {
    ctorField: P;
    field: P;
    optField?: invalid;
    readonly roFiled: P;
    method(p?: P): invalid;
    methodWithRequiredDefault(p: invalid, req: number): invalid;
    constructor(ctorField?: P);
}
export {};

//// [assertToOtherTypes.d.ts]
export declare const vNumberLiteral: 1 | 1;
export declare const vStringLiteral: "1" | "1";
export declare const vLiteral: "1" | "1";
type R = {
    foo: string;
};
export declare class C {
    tsResolve?: invalid;
    tsResolve2?: invalid;
    reuseType?: ((p: R) => void) | string | string | undefined;
    reuseType2?: (new (p: R) => R) | string | string | undefined;
    reuseType3?: string | number | bigint | symbol | unknown | any | never | symbol | undefined;
    reuseType4?: [R, R, R] | [R, R, R] | undefined;
    reuseType5?: R[] | R[] | undefined;
    reuseType6?: 1 | "2" | 1n | 1n | undefined;
    reuseType7?: `A` | `A` | undefined;
    reuseType8?: `${string}-ok` | `${string}-ok` | undefined;
    reuseType9?: this | this | undefined;
}
export {};

//// [assertToTypeLiteral.d.ts]
export declare let vLet: {} & {
    name: string;
};
export declare const vConst: {} & {
    name: string;
};
export declare function fn(p?: {} & {
    name: string;
}): invalid;
export declare function fnWithRequiredDefaultParam(p: invalid, req: number): invalid;
export declare class C {
    ctorField: {} & {
        name: string;
    };
    field: {} & {
        name: string;
    };
    readonly roFiled: {} & {
        name: string;
    };
    method(p?: {} & {
        name: string;
    }): invalid;
    methodWithRequiredDefault(p: invalid, req: number): invalid;
    constructor(ctorField?: {} & {
        name: string;
    });
    get x(): invalid;
    set x(v: invalid);
}
declare const _default: {} & {
    name: string;
};
export default _default;

//// [assertToTypeReferences.d.ts]
type P = {} & {
    name: string;
};
export declare let vLet: P;
export declare const vConst: P;
export declare function fn(p?: P): invalid;
export declare function fnWithRequiredDefaultParam(p: invalid, req: number): invalid;
export declare class C {
    ctorField: P;
    field: P;
    readonly roFiled: P;
    method(p?: P): invalid;
    methodWithRequiredDefault(p: invalid, req: number): invalid;
    constructor(ctorField?: P);
}
declare const _default: P;
export default _default;

/// [Errors] ////

angularAssertionToTypeReferences.ts(6,17): error TS9007: Function must have an explicit return type annotation with --isolatedDeclarations.
angularAssertionToTypeReferences.ts(8,17): error TS9007: Function must have an explicit return type annotation with --isolatedDeclarations.
angularAssertionToTypeReferences.ts(8,44): error TS9025: Declaration emit for this parameter requires implicitly adding undefined to it's type. This is not supported with --isolatedDeclarations.
angularAssertionToTypeReferences.ts(12,5): error TS9012: Property must have an explicit type annotation with --isolatedDeclarations.
angularAssertionToTypeReferences.ts(14,5): error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.
angularAssertionToTypeReferences.ts(15,5): error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.
angularAssertionToTypeReferences.ts(15,31): error TS9025: Declaration emit for this parameter requires implicitly adding undefined to it's type. This is not supported with --isolatedDeclarations.
assertToOtherTypes.ts(11,5): error TS9012: Property must have an explicit type annotation with --isolatedDeclarations.
assertToOtherTypes.ts(12,5): error TS9012: Property must have an explicit type annotation with --isolatedDeclarations.
assertToTypeLiteral.ts(4,17): error TS9007: Function must have an explicit return type annotation with --isolatedDeclarations.
assertToTypeLiteral.ts(6,17): error TS9007: Function must have an explicit return type annotation with --isolatedDeclarations.
assertToTypeLiteral.ts(6,44): error TS9025: Declaration emit for this parameter requires implicitly adding undefined to it's type. This is not supported with --isolatedDeclarations.
assertToTypeLiteral.ts(11,5): error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.
assertToTypeLiteral.ts(12,5): error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.
assertToTypeLiteral.ts(12,31): error TS9025: Declaration emit for this parameter requires implicitly adding undefined to it's type. This is not supported with --isolatedDeclarations.
assertToTypeLiteral.ts(16,9): error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations.
assertToTypeLiteral.ts(17,11): error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations.
assertToTypeReferences.ts(6,17): error TS9007: Function must have an explicit return type annotation with --isolatedDeclarations.
assertToTypeReferences.ts(8,17): error TS9007: Function must have an explicit return type annotation with --isolatedDeclarations.
assertToTypeReferences.ts(8,44): error TS9025: Declaration emit for this parameter requires implicitly adding undefined to it's type. This is not supported with --isolatedDeclarations.
assertToTypeReferences.ts(13,5): error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.
assertToTypeReferences.ts(14,5): error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.
assertToTypeReferences.ts(14,31): error TS9025: Declaration emit for this parameter requires implicitly adding undefined to it's type. This is not supported with --isolatedDeclarations.


==== assertToTypeReferences.ts (6 errors) ====
    type P = { } & { name: string }
    
    export let vLet = null! as P
    export const vConst = null! as P
    
    export function fn(p = null! as P) {}
                    ~~
!!! error TS9007: Function must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9031 assertToTypeReferences.ts:6:17: Add a return type to the function declaration.
    
    export function fnWithRequiredDefaultParam(p = null! as P, req: number) {}
                    ~~~~~~~~~~~~~~~~~~~~~~~~~~
!!! error TS9007: Function must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9031 assertToTypeReferences.ts:8:17: Add a return type to the function declaration.
                                               ~~~~~~~~~~~~~~
!!! error TS9025: Declaration emit for this parameter requires implicitly adding undefined to it's type. This is not supported with --isolatedDeclarations.
!!! related TS9028 assertToTypeReferences.ts:8:44: Add a type annotation to the parameter p.
    
    export class C {
        field = null! as P
        readonly roFiled = null! as P;
        method(p = null! as P) {}
        ~~~~~~
!!! error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9034 assertToTypeReferences.ts:13:5: Add a return type to the method
        methodWithRequiredDefault(p = null! as P, req: number) {}
        ~~~~~~~~~~~~~~~~~~~~~~~~~
!!! error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9034 assertToTypeReferences.ts:14:5: Add a return type to the method
                                  ~~~~~~~~~~~~~~
!!! error TS9025: Declaration emit for this parameter requires implicitly adding undefined to it's type. This is not supported with --isolatedDeclarations.
!!! related TS9028 assertToTypeReferences.ts:14:31: Add a type annotation to the parameter p.
    
        constructor(public ctorField = null! as P) {}
    }
    
    export default null! as P;
    
==== assertToTypeLiteral.ts (8 errors) ====
    export let vLet = null! as {} & { name: string }
    export const vConst = null! as {} & { name: string }
    
    export function fn(p = null! as {} & { name: string }) {}
                    ~~
!!! error TS9007: Function must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9031 assertToTypeLiteral.ts:4:17: Add a return type to the function declaration.
    
    export function fnWithRequiredDefaultParam(p = null! as {} & { name: string }, req: number) {}
                    ~~~~~~~~~~~~~~~~~~~~~~~~~~
!!! error TS9007: Function must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9031 assertToTypeLiteral.ts:6:17: Add a return type to the function declaration.
                                               ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
!!! error TS9025: Declaration emit for this parameter requires implicitly adding undefined to it's type. This is not supported with --isolatedDeclarations.
!!! related TS9028 assertToTypeLiteral.ts:6:44: Add a type annotation to the parameter p.
    
    export class C {
        field = null! as {} & { name: string }
        readonly roFiled = null! as {} & { name: string };
        method(p = null! as {} & { name: string }) {}
        ~~~~~~
!!! error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9034 assertToTypeLiteral.ts:11:5: Add a return type to the method
        methodWithRequiredDefault(p = null! as {} & { name: string }, req: number) {}
        ~~~~~~~~~~~~~~~~~~~~~~~~~
!!! error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9034 assertToTypeLiteral.ts:12:5: Add a return type to the method
                                  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
!!! error TS9025: Declaration emit for this parameter requires implicitly adding undefined to it's type. This is not supported with --isolatedDeclarations.
!!! related TS9028 assertToTypeLiteral.ts:12:31: Add a type annotation to the parameter p.
    
        constructor(public ctorField = null! as {} & { name: string }) {}
    
        get x() { return null! as {} & { name: string } }
            ~
!!! error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9033 assertToTypeLiteral.ts:17:9: Add a type to parameter of the set accessor declaration.
!!! related TS9032 assertToTypeLiteral.ts:16:9: Add a return type to the get accessor declaration.
        set x(v) { }
              ~
!!! error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9033 assertToTypeLiteral.ts:17:9: Add a type to parameter of the set accessor declaration.
!!! related TS9032 assertToTypeLiteral.ts:16:9: Add a return type to the get accessor declaration.
    }
    
    export default null! as {} & { name: string }
    
    
==== assertToOtherTypes.ts (2 errors) ====
    export const vNumberLiteral = null! as 1 | 1
    export const vStringLiteral = null! as "1" | "1"
    export const vLiteral = null! as "1" | "1"
    
    type R = { foo: string }
    
    export class C {
        // under !strictNullChecks all types can be reused from the assertion
        // under strictNullChecks we need to add undefined, and we can't always know we can
        // Can't know if references contain undefined, fall back to inference
        tsResolve? = null! as R | R;
        ~~~~~~~~~
!!! error TS9012: Property must have an explicit type annotation with --isolatedDeclarations.
!!! related TS9029 assertToOtherTypes.ts:11:5: Add a type annotation to the property tsResolve.
        tsResolve2? = null! as R | R | string;
        ~~~~~~~~~~
!!! error TS9012: Property must have an explicit type annotation with --isolatedDeclarations.
!!! related TS9029 assertToOtherTypes.ts:12:5: Add a type annotation to the property tsResolve2.
        // Simple type. we can add undefined
        reuseType? = null! as ((p: R) => void) | string | string;
        reuseType2? = null! as (new (p: R) => R) | string | string;
        reuseType3? = null! as string | number | bigint | symbol | unknown | any | never | symbol;
        reuseType4? = null! as [R, R, R] | [R, R, R];
        reuseType5? = null! as R[] | R[];
        reuseType6? = null! as 1 | "2" | 1n | 1n;
        reuseType7? = null! as `A` | `A`;
        reuseType8? = null! as `${string}-ok` | `${string}-ok`;
        reuseType9? = null! as this | this;
    }
    
==== angularAssertionToTypeReferences.ts (7 errors) ====
    type P = { } & { name: string }
    
    export let vLet = <P>null!
    export const vConst = <P>null!
    
    export function fn(p = <P>null!) {}
                    ~~
!!! error TS9007: Function must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9031 angularAssertionToTypeReferences.ts:6:17: Add a return type to the function declaration.
    
    export function fnWithRequiredDefaultParam(p = <P>null!, req: number) {}
                    ~~~~~~~~~~~~~~~~~~~~~~~~~~
!!! error TS9007: Function must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9031 angularAssertionToTypeReferences.ts:8:17: Add a return type to the function declaration.
                                               ~~~~~~~~~~~~
!!! error TS9025: Declaration emit for this parameter requires implicitly adding undefined to it's type. This is not supported with --isolatedDeclarations.
!!! related TS9028 angularAssertionToTypeReferences.ts:8:44: Add a type annotation to the parameter p.
    
    export class C {
        field = <P>null!
        optField? = <P>null!
        ~~~~~~~~
!!! error TS9012: Property must have an explicit type annotation with --isolatedDeclarations.
!!! related TS9029 angularAssertionToTypeReferences.ts:12:5: Add a type annotation to the property optField.
        readonly roFiled = <P>null!;
        method(p = <P>null!) {}
        ~~~~~~
!!! error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9034 angularAssertionToTypeReferences.ts:14:5: Add a return type to the method
        methodWithRequiredDefault(p = <P>null!, req: number) {}
        ~~~~~~~~~~~~~~~~~~~~~~~~~
!!! error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9034 angularAssertionToTypeReferences.ts:15:5: Add a return type to the method
                                  ~~~~~~~~~~~~
!!! error TS9025: Declaration emit for this parameter requires implicitly adding undefined to it's type. This is not supported with --isolatedDeclarations.
!!! related TS9028 angularAssertionToTypeReferences.ts:15:31: Add a type annotation to the parameter p.
    
        constructor(public ctorField = <P>null!) {}
    }
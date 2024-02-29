//// [tests/cases/compiler/defaultParameterAddsUndefinedWithStrictNullChecks.ts] ////

//// [defaultParameterAddsUndefinedWithStrictNullChecks.ts]
function f(addUndefined1 = "J", addUndefined2?: number) {
    return addUndefined1.length + (addUndefined2 || 0);
}
function g(addUndefined = "J", addDefined: number) {
    return addUndefined.length + addDefined;
}
let total = f() + f('a', 1) + f('b') + f(undefined, 2);
total = g('c', 3) + g(undefined, 4);

function foo1(x: string = "string", b: number) {
    x.length;
}

function foo2(x = "string", b: number) {
    x.length; // ok, should be string
}

function foo3(x: string | undefined = "string", b: number) {
    x.length; // ok, should be string
    x = undefined;
}

function foo4(x: string | undefined = undefined, b: number) {
    x; // should be string | undefined
    x = undefined;
}

type OptionalNullableString = string | null | undefined;
function allowsNull(val: OptionalNullableString = "") {
    val = null;
    val = 'string and null are both ok';
}
allowsNull(null); // still allows passing null



// .d.ts should have `string | undefined` for foo1, foo2, foo3 and foo4
foo1(undefined, 1);
foo2(undefined, 1);
foo3(undefined, 1);
foo4(undefined, 1);


function removeUndefinedButNotFalse(x = true) {
    if (x === false) {
        return x;
    }
}

declare const cond: boolean;
function removeNothing(y = cond ? true : undefined) {
    if (y !== undefined) {
        if (y === false) {
            return y;
        }
    }
    return true;
}


/// [Declarations] ////



//// [defaultParameterAddsUndefinedWithStrictNullChecks.d.ts]
declare function f(addUndefined1?: string, addUndefined2?: number): invalid;
declare function g(addUndefined: string, addDefined: number): invalid;
declare let total: invalid;
declare function foo1(x: string, b: number): invalid;
declare function foo2(x: string, b: number): invalid;
declare function foo3(x: string | undefined, b: number): invalid;
declare function foo4(x: string | undefined, b: number): invalid;
type OptionalNullableString = string | null | undefined;
declare function allowsNull(val?: OptionalNullableString): invalid;
declare function removeUndefinedButNotFalse(x?: boolean): invalid;
declare const cond: boolean;
declare function removeNothing(y?: invalid): invalid;

/// [Errors] ////

defaultParameterAddsUndefinedWithStrictNullChecks.ts(1,10): error TS9007: Function must have an explicit return type annotation with --isolatedDeclarations.
defaultParameterAddsUndefinedWithStrictNullChecks.ts(4,10): error TS9007: Function must have an explicit return type annotation with --isolatedDeclarations.
defaultParameterAddsUndefinedWithStrictNullChecks.ts(7,5): error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations.
defaultParameterAddsUndefinedWithStrictNullChecks.ts(10,10): error TS9007: Function must have an explicit return type annotation with --isolatedDeclarations.
defaultParameterAddsUndefinedWithStrictNullChecks.ts(14,10): error TS9007: Function must have an explicit return type annotation with --isolatedDeclarations.
defaultParameterAddsUndefinedWithStrictNullChecks.ts(18,10): error TS9007: Function must have an explicit return type annotation with --isolatedDeclarations.
defaultParameterAddsUndefinedWithStrictNullChecks.ts(23,10): error TS9007: Function must have an explicit return type annotation with --isolatedDeclarations.
defaultParameterAddsUndefinedWithStrictNullChecks.ts(29,10): error TS9007: Function must have an explicit return type annotation with --isolatedDeclarations.
defaultParameterAddsUndefinedWithStrictNullChecks.ts(44,10): error TS9007: Function must have an explicit return type annotation with --isolatedDeclarations.
defaultParameterAddsUndefinedWithStrictNullChecks.ts(51,10): error TS9007: Function must have an explicit return type annotation with --isolatedDeclarations.
defaultParameterAddsUndefinedWithStrictNullChecks.ts(51,28): error TS9011: Parameter must have an explicit type annotation with --isolatedDeclarations.


==== defaultParameterAddsUndefinedWithStrictNullChecks.ts (11 errors) ====
    function f(addUndefined1 = "J", addUndefined2?: number) {
             ~
!!! error TS9007: Function must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9032 defaultParameterAddsUndefinedWithStrictNullChecks.ts:1:10: Add a return type to the function declaration.
        return addUndefined1.length + (addUndefined2 || 0);
    }
    function g(addUndefined = "J", addDefined: number) {
             ~
!!! error TS9007: Function must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9032 defaultParameterAddsUndefinedWithStrictNullChecks.ts:4:10: Add a return type to the function declaration.
        return addUndefined.length + addDefined;
    }
    let total = f() + f('a', 1) + f('b') + f(undefined, 2);
        ~~~~~
!!! error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations.
!!! related TS9028 defaultParameterAddsUndefinedWithStrictNullChecks.ts:7:5: Add a type annotation to the variable total.
    total = g('c', 3) + g(undefined, 4);
    
    function foo1(x: string = "string", b: number) {
             ~~~~
!!! error TS9007: Function must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9032 defaultParameterAddsUndefinedWithStrictNullChecks.ts:10:10: Add a return type to the function declaration.
        x.length;
    }
    
    function foo2(x = "string", b: number) {
             ~~~~
!!! error TS9007: Function must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9032 defaultParameterAddsUndefinedWithStrictNullChecks.ts:14:10: Add a return type to the function declaration.
        x.length; // ok, should be string
    }
    
    function foo3(x: string | undefined = "string", b: number) {
             ~~~~
!!! error TS9007: Function must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9032 defaultParameterAddsUndefinedWithStrictNullChecks.ts:18:10: Add a return type to the function declaration.
        x.length; // ok, should be string
        x = undefined;
    }
    
    function foo4(x: string | undefined = undefined, b: number) {
             ~~~~
!!! error TS9007: Function must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9032 defaultParameterAddsUndefinedWithStrictNullChecks.ts:23:10: Add a return type to the function declaration.
        x; // should be string | undefined
        x = undefined;
    }
    
    type OptionalNullableString = string | null | undefined;
    function allowsNull(val: OptionalNullableString = "") {
             ~~~~~~~~~~
!!! error TS9007: Function must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9032 defaultParameterAddsUndefinedWithStrictNullChecks.ts:29:10: Add a return type to the function declaration.
        val = null;
        val = 'string and null are both ok';
    }
    allowsNull(null); // still allows passing null
    
    
    
    // .d.ts should have `string | undefined` for foo1, foo2, foo3 and foo4
    foo1(undefined, 1);
    foo2(undefined, 1);
    foo3(undefined, 1);
    foo4(undefined, 1);
    
    
    function removeUndefinedButNotFalse(x = true) {
             ~~~~~~~~~~~~~~~~~~~~~~~~~~
!!! error TS9007: Function must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9032 defaultParameterAddsUndefinedWithStrictNullChecks.ts:44:10: Add a return type to the function declaration.
        if (x === false) {
            return x;
        }
    }
    
    declare const cond: boolean;
    function removeNothing(y = cond ? true : undefined) {
             ~~~~~~~~~~~~~
!!! error TS9007: Function must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9032 defaultParameterAddsUndefinedWithStrictNullChecks.ts:51:10: Add a return type to the function declaration.
                               ~~~~~~~~~~~~~~~~~~~~~~~
!!! error TS9011: Parameter must have an explicit type annotation with --isolatedDeclarations.
!!! related TS9029 defaultParameterAddsUndefinedWithStrictNullChecks.ts:51:24: Add a type annotation to the parameter y.
        if (y !== undefined) {
            if (y === false) {
                return y;
            }
        }
        return true;
    }
    
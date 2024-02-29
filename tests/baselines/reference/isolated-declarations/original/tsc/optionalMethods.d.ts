//// [tests/cases/conformance/types/namedTypes/optionalMethods.ts] ////

//// [optionalMethods.ts]
interface Foo {
    a: number;
    b?: number;
    f(): number;
    g?(): number;
}

function test1(x: Foo) {
    x.a;
    x.b;
    x.f;
    x.g;
    let f1 = x.f();
    let g1 = x.g && x.g();
    let g2 = x.g ? x.g() : 0;
}

class Bar {
    a: number;
    b?: number;
    c? = 2;
    constructor(public d?: number, public e = 10) {}
    f() {
        return 1;
    }
    g?(): number;  // Body of optional method can be omitted
    h?() {
        return 2;
    }
}

function test2(x: Bar) {
    x.a;
    x.b;
    x.c;
    x.d;
    x.e;
    x.f;
    x.g;
    let f1 = x.f();
    let g1 = x.g && x.g();
    let g2 = x.g ? x.g() : 0;
    let h1 = x.h && x.h();
    let h2 = x.h ? x.h() : 0;
}

class Base {
    a?: number;
    f?(): number;
}

class Derived extends Base {
    a = 1;
    f(): number { return 1; }
}


/// [Declarations] ////



//// [optionalMethods.d.ts]
interface Foo {
    a: number;
    b?: number;
    f(): number;
    g?(): number;
}
declare function test1(x: Foo): invalid;
declare class Bar {
    d?: invalid;
    e: number;
    a: number;
    b?: number;
    c?: number | undefined;
    constructor(d?: invalid, e?: number);
    f(): invalid;
    g?(): number;
    h?(): invalid;
}
declare function test2(x: Bar): invalid;
declare class Base {
    a?: number;
    f?(): number;
}
declare class Derived extends Base {
    a: number;
    f(): number;
}

/// [Errors] ////

optionalMethods.ts(8,10): error TS9007: Function must have an explicit return type annotation with --isolatedDeclarations.
optionalMethods.ts(22,17): error TS9026: Declaration emit for this parameter requires implicitly adding undefined to it's type. This is not supported with --isolatedDeclarations.
optionalMethods.ts(23,5): error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.
optionalMethods.ts(27,5): error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.
optionalMethods.ts(32,10): error TS9007: Function must have an explicit return type annotation with --isolatedDeclarations.


==== optionalMethods.ts (5 errors) ====
    interface Foo {
        a: number;
        b?: number;
        f(): number;
        g?(): number;
    }
    
    function test1(x: Foo) {
             ~~~~~
!!! error TS9007: Function must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9032 optionalMethods.ts:8:10: Add a return type to the function declaration.
        x.a;
        x.b;
        x.f;
        x.g;
        let f1 = x.f();
        let g1 = x.g && x.g();
        let g2 = x.g ? x.g() : 0;
    }
    
    class Bar {
        a: number;
        b?: number;
        c? = 2;
        constructor(public d?: number, public e = 10) {}
                    ~~~~~~~~~~~~~~~~~
!!! error TS9026: Declaration emit for this parameter requires implicitly adding undefined to it's type. This is not supported with --isolatedDeclarations.
!!! related TS9029 optionalMethods.ts:22:17: Add a type annotation to the parameter d.
        f() {
        ~
!!! error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9035 optionalMethods.ts:23:5: Add a return type to the method
            return 1;
        }
        g?(): number;  // Body of optional method can be omitted
        h?() {
        ~
!!! error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9035 optionalMethods.ts:27:5: Add a return type to the method
            return 2;
        }
    }
    
    function test2(x: Bar) {
             ~~~~~
!!! error TS9007: Function must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9032 optionalMethods.ts:32:10: Add a return type to the function declaration.
        x.a;
        x.b;
        x.c;
        x.d;
        x.e;
        x.f;
        x.g;
        let f1 = x.f();
        let g1 = x.g && x.g();
        let g2 = x.g ? x.g() : 0;
        let h1 = x.h && x.h();
        let h2 = x.h ? x.h() : 0;
    }
    
    class Base {
        a?: number;
        f?(): number;
    }
    
    class Derived extends Base {
        a = 1;
        f(): number { return 1; }
    }
    
//// [tests/cases/compiler/moduleAugmentationsImports2.ts] ////

//// [a.ts]
export class A {}

//// [b.ts]
export class B {x: number;}

//// [c.d.ts]
declare module "C" {
    class Cls {y: string; }
}

//// [d.ts]
/// <reference path="c.d.ts"/>

import {A} from "./a";
import {B} from "./b";

A.prototype.getB = function () { return undefined; }

declare module "./a" {
    interface A {
        getB(): B;
    }
}

//// [e.ts]
import {A} from "./a";
import {Cls} from "C";

A.prototype.getCls = function () { return undefined; }

declare module "./a" {
    interface A {
        getCls(): Cls;
    }
}

//// [main.ts]
import {A} from "./a";
import "d";
import "e";

let a: A;
let b = a.getB().x.toFixed();
let c = a.getCls().y.toLowerCase();

/// [Declarations] ////



//// [a.d.ts]
export declare class A {
}

//// [b.d.ts]
export declare class B {
    x: number;
}

//// [d.d.ts]
/// <reference path="c.d.ts" />
import { B } from "./b";
declare module "./a" {
    interface A {
        getB(): B;
    }
}

//// [e.d.ts]
/// <reference path="c.d.ts" />
import { Cls } from "C";
declare module "./a" {
    interface A {
        getCls(): Cls;
    }
}

//// [main.d.ts]
import "d";
import "e";

/// [Errors] ////

e.ts(2,1): error TS9025: Declaration emit for this expression requires adding a path reference directive to 'c.d.ts' with --isolatedDeclarations.


==== a.ts (0 errors) ====
    export class A {}
    
==== b.ts (0 errors) ====
    export class B {x: number;}
    
==== c.d.ts (0 errors) ====
    declare module "C" {
        class Cls {y: string; }
    }
    
==== d.ts (0 errors) ====
    /// <reference path="c.d.ts"/>
    
    import {A} from "./a";
    import {B} from "./b";
    
    A.prototype.getB = function () { return undefined; }
    
    declare module "./a" {
        interface A {
            getB(): B;
        }
    }
    
==== e.ts (1 errors) ====
    import {A} from "./a";
    import {Cls} from "C";
    ~~~~~~~~~~~~~~~~~~~~~~
!!! error TS9025: Declaration emit for this expression requires adding a path reference directive to 'c.d.ts' with --isolatedDeclarations.
    
    A.prototype.getCls = function () { return undefined; }
    
    declare module "./a" {
        interface A {
            getCls(): Cls;
        }
    }
    
==== main.ts (0 errors) ====
    import {A} from "./a";
    import "d";
    import "e";
    
    let a: A;
    let b = a.getB().x.toFixed();
    let c = a.getCls().y.toLowerCase();
//// [tests/cases/compiler/declarationEmitExpandoPropertyPrivateName.ts] ////

//// [a.ts]
interface I {}
export function f(): I { return null as I; }
//// [b.ts]
import {f} from "./a";

export function q(): void {}
export declare namespace q {
    export var val: I;
}
q.val = f();


/// [Declarations] ////



//// [a.d.ts]
interface I {
}
export declare function f(): I;
export {};
//# sourceMappingURL=a.d.ts.map
//// [b.d.ts]
export declare function q(): void;
export declare namespace q {
    var val: I;
}
//# sourceMappingURL=b.d.ts.map
/// [Errors] ////

b.ts(5,21): error TS2304: Cannot find name 'I'.
b.ts(5,21): error TS4025: Exported variable 'val' has or is using private name 'I'.


==== a.ts (0 errors) ====
    interface I {}
    export function f(): I { return null as I; }
==== b.ts (2 errors) ====
    import {f} from "./a";
    
    export function q(): void {}
    export declare namespace q {
        export var val: I;
                        ~
!!! error TS2304: Cannot find name 'I'.
                        ~
!!! error TS4025: Exported variable 'val' has or is using private name 'I'.
    }
    q.val = f();
    
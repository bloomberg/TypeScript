//// [tests/cases/compiler/declarationEmitLateBoundAssignments.ts] ////

//// [declarationEmitLateBoundAssignments.ts]
export function foo(): void {}
export declare namespace foo {
    export var bar: number;
    export var strMemName: string;
}
foo.bar = 12;
const _private = Symbol();
foo[_private] = "ok";
const strMem = "strMemName";
foo[strMem] = "ok";
const dashStrMem = "dashed-str-mem";
foo[dashStrMem] = "ok";
const numMem = 42;
foo[numMem] = "ok";

const x: string = foo[_private];
const y: string = foo[strMem];
const z: string = foo[numMem];
const a: string = foo[dashStrMem];

/// [Declarations] ////



//// [declarationEmitLateBoundAssignments.d.ts]
export declare function foo(): void;
export declare namespace foo { }
export declare namespace foo {
    var bar: number;
    var strMemName: string;
}
//# sourceMappingURL=declarationEmitLateBoundAssignments.d.ts.map
/// [Errors] ////

declarationEmitLateBoundAssignments.ts(4,16): error TS2733: Property 'strMemName' was also declared here.
declarationEmitLateBoundAssignments.ts(8,1): error TS9023: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
declarationEmitLateBoundAssignments.ts(10,1): error TS2718: Duplicate property 'strMemName'.
declarationEmitLateBoundAssignments.ts(10,1): error TS9023: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
declarationEmitLateBoundAssignments.ts(12,1): error TS9023: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
declarationEmitLateBoundAssignments.ts(14,1): error TS9023: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.


==== declarationEmitLateBoundAssignments.ts (6 errors) ====
    export function foo(): void {}
    export declare namespace foo {
        export var bar: number;
        export var strMemName: string;
                   ~~~~~~~~~~
!!! error TS2733: Property 'strMemName' was also declared here.
    }
    foo.bar = 12;
    const _private = Symbol();
    foo[_private] = "ok";
    ~~~~~~~~~~~~~
!!! error TS9023: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
    const strMem = "strMemName";
    foo[strMem] = "ok";
    ~~~~~~~~~~~
!!! error TS2718: Duplicate property 'strMemName'.
    ~~~~~~~~~~~
!!! error TS9023: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
    const dashStrMem = "dashed-str-mem";
    foo[dashStrMem] = "ok";
    ~~~~~~~~~~~~~~~
!!! error TS9023: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
    const numMem = 42;
    foo[numMem] = "ok";
    ~~~~~~~~~~~
!!! error TS9023: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
    
    const x: string = foo[_private];
    const y: string = foo[strMem];
    const z: string = foo[numMem];
    const a: string = foo[dashStrMem];
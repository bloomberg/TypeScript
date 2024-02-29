//// [tests/cases/compiler/lateBoundFunctionMemberAssignmentDeclarations.ts] ////

//// [index.ts]
export function foo(): void {}
export declare namespace foo {
    export var bar: number;
}
foo.bar = 12;
const _private = Symbol();
foo[_private] = "ok";

const x: string = foo[_private];


/// [Declarations] ////



//// [index.d.ts]
export declare function foo(): void;
export declare namespace foo { }
export declare namespace foo {
    var bar: number;
}
//# sourceMappingURL=index.d.ts.map
/// [Errors] ////

index.ts(7,1): error TS9023: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.


==== index.ts (1 errors) ====
    export function foo(): void {}
    export declare namespace foo {
        export var bar: number;
    }
    foo.bar = 12;
    const _private = Symbol();
    foo[_private] = "ok";
    ~~~~~~~~~~~~~
!!! error TS9023: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
    
    const x: string = foo[_private];
    
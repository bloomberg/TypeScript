//// [tests/cases/compiler/isolatedDeclarationLazySymbols.ts] ////

//// [isolatedDeclarationLazySymbols.ts]
export function foo(): void {

}
export declare namespace foo {
    export var b: string;
}

const o = {
    ["prop.inner"]: "a",
    prop: {
        inner: "b",
    }
} as const

foo[o["prop.inner"]] ="A";
foo[o.prop.inner] = "B";

export class Foo {
    [o["prop.inner"]] ="A"
    [o.prop.inner] = "B"
}

export let oo: {
    a: string;
    [o.prop.inner]: string;
} = {
    [o['prop.inner']]:"A",
    [o.prop.inner]: "B",
}

/// [Declarations] ////



//// [isolatedDeclarationLazySymbols.d.ts]
export declare function foo(): void;
export declare namespace foo { }
export declare namespace foo {
    var b: string;
}
declare const o: {
    readonly ["prop.inner"]: "a";
    readonly prop: {
        readonly inner: "b";
    };
};
export declare class Foo {
}
export declare let oo: {
    a: string;
    [o.prop.inner]: string;
};
export {};
//# sourceMappingURL=isolatedDeclarationLazySymbols.d.ts.map
/// [Errors] ////

isolatedDeclarationLazySymbols.ts(5,16): error TS2733: Property 'b' was also declared here.
isolatedDeclarationLazySymbols.ts(16,1): error TS2718: Duplicate property 'b'.
isolatedDeclarationLazySymbols.ts(16,1): error TS9023: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
isolatedDeclarationLazySymbols.ts(19,5): error TS1166: A computed property name in a class property declaration must have a simple literal type or a 'unique symbol' type.


==== isolatedDeclarationLazySymbols.ts (4 errors) ====
    export function foo(): void {
    
    }
    export declare namespace foo {
        export var b: string;
                   ~
!!! error TS2733: Property 'b' was also declared here.
    }
    
    const o = {
        ["prop.inner"]: "a",
        prop: {
            inner: "b",
        }
    } as const
    
    foo[o["prop.inner"]] ="A";
    foo[o.prop.inner] = "B";
    ~~~~~~~~~~~~~~~~~
!!! error TS2718: Duplicate property 'b'.
    ~~~~~~~~~~~~~~~~~
!!! error TS9023: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
    
    export class Foo {
        [o["prop.inner"]] ="A"
        ~~~~~~~~~~~~~~~~~
!!! error TS1166: A computed property name in a class property declaration must have a simple literal type or a 'unique symbol' type.
        [o.prop.inner] = "B"
    }
    
    export let oo: {
        a: string;
        [o.prop.inner]: string;
    } = {
        [o['prop.inner']]:"A",
        [o.prop.inner]: "B",
    }
//// [tests/cases/conformance/node/nodeModulesExportsBlocksSpecifierResolution.ts] ////

//// [index.ts]
// esm format file
import { Thing } from "inner/other";
export const a = (await import("inner")).x();
//// [index.d.ts]
// esm format file
export { x } from "./other.js";
//// [other.d.ts]
// esm format file
export interface Thing {}
export const x: () => Thing;
//// [package.json]
{
    "name": "package",
    "private": true,
    "type": "module",
    "exports": "./index.js"
}
//// [package.json]
{
    "name": "inner",
    "private": true,
    "type": "module",
    "exports": "./index.js"
}

/// [Declarations] ////



//// [index.d.ts]
export declare const a: invalid;
//# sourceMappingURL=index.d.ts.map
/// [Errors] ////

index.ts(2,23): error TS2307: Cannot find module 'inner/other' or its corresponding type declarations.
index.ts(3,14): error TS2742: The inferred type of 'a' cannot be named without a reference to './node_modules/inner/other.js'. This is likely not portable. A type annotation is necessary.
index.ts(3,14): error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations.


==== index.ts (3 errors) ====
    // esm format file
    import { Thing } from "inner/other";
                          ~~~~~~~~~~~~~
!!! error TS2307: Cannot find module 'inner/other' or its corresponding type declarations.
    export const a = (await import("inner")).x();
                 ~
!!! error TS2742: The inferred type of 'a' cannot be named without a reference to './node_modules/inner/other.js'. This is likely not portable. A type annotation is necessary.
                 ~
!!! error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations.
!!! related TS9027 index.ts:3:14: Add a type annotation to the variable a.
==== node_modules/inner/index.d.ts (0 errors) ====
    // esm format file
    export { x } from "./other.js";
==== node_modules/inner/other.d.ts (0 errors) ====
    // esm format file
    export interface Thing {}
    export const x: () => Thing;
==== package.json (0 errors) ====
    {
        "name": "package",
        "private": true,
        "type": "module",
        "exports": "./index.js"
    }
==== node_modules/inner/package.json (0 errors) ====
    {
        "name": "inner",
        "private": true,
        "type": "module",
        "exports": "./index.js"
    }
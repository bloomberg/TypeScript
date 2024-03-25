//// [tests/cases/compiler/declarationEmitUsingTypeAlias1.ts] ////

//// [inner.d.ts]
export declare type Other = { other: string };
export declare type SomeType = { arg: Other };

//// [index.d.ts]
export type OtherType = import('./inner').Other;
export type SomeType = import('./inner').SomeType;

//// [package.json]
{
  "name": "some-dep",
  "exports": {
    ".": "./dist/index.js"
  }
}

//// [index.ts]
import { SomeType } from "some-dep";

export const foo = (thing: SomeType) => {
  return thing;
};

export const bar = (thing: SomeType) => {
  return thing.arg;
};

/// [Declarations] ////



//// [src/index.d.ts]
import { SomeType } from "some-dep";
export declare const foo: (thing: SomeType) => invalid;
export declare const bar: (thing: SomeType) => invalid;
//# sourceMappingURL=index.d.ts.map
/// [Errors] ////

src/index.ts(3,14): error TS2742: The inferred type of 'foo' cannot be named without a reference to '../node_modules/some-dep/dist/inner'. This is likely not portable. A type annotation is necessary.
src/index.ts(3,20): error TS9007: Function must have an explicit return type annotation with --isolatedDeclarations.
src/index.ts(7,14): error TS2742: The inferred type of 'bar' cannot be named without a reference to '../node_modules/some-dep/dist/inner'. This is likely not portable. A type annotation is necessary.
src/index.ts(7,20): error TS9007: Function must have an explicit return type annotation with --isolatedDeclarations.


==== node_modules/some-dep/dist/inner.d.ts (0 errors) ====
    export declare type Other = { other: string };
    export declare type SomeType = { arg: Other };
    
==== node_modules/some-dep/dist/index.d.ts (0 errors) ====
    export type OtherType = import('./inner').Other;
    export type SomeType = import('./inner').SomeType;
    
==== node_modules/some-dep/package.json (0 errors) ====
    {
      "name": "some-dep",
      "exports": {
        ".": "./dist/index.js"
      }
    }
    
==== src/index.ts (4 errors) ====
    import { SomeType } from "some-dep";
    
    export const foo = (thing: SomeType) => {
                 ~~~
!!! error TS2742: The inferred type of 'foo' cannot be named without a reference to '../node_modules/some-dep/dist/inner'. This is likely not portable. A type annotation is necessary.
                       ~~~~~~~~~~~~~~~~~~~~~~
!!! error TS9007: Function must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9027 src/index.ts:3:14: Add a type annotation to the variable foo.
!!! related TS9030 src/index.ts:3:20: Add a return type to the function expression.
      return thing;
    };
    
    export const bar = (thing: SomeType) => {
                 ~~~
!!! error TS2742: The inferred type of 'bar' cannot be named without a reference to '../node_modules/some-dep/dist/inner'. This is likely not portable. A type annotation is necessary.
                       ~~~~~~~~~~~~~~~~~~~~~~
!!! error TS9007: Function must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9027 src/index.ts:7:14: Add a type annotation to the variable bar.
!!! related TS9030 src/index.ts:7:20: Add a return type to the function expression.
      return thing.arg;
    };
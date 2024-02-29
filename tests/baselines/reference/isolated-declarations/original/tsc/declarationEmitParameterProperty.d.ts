//// [tests/cases/compiler/declarationEmitParameterProperty.ts] ////

//// [declarationEmitParameterProperty.ts]
export class Foo {
  constructor(public bar?: string) {
  }
}


/// [Declarations] ////



//// [declarationEmitParameterProperty.d.ts]
export declare class Foo {
    bar?: invalid;
    constructor(bar?: invalid);
}

/// [Errors] ////

declarationEmitParameterProperty.ts(2,15): error TS9026: Declaration emit for this parameter requires implicitly adding undefined to it's type. This is not supported with --isolatedDeclarations.


==== declarationEmitParameterProperty.ts (1 errors) ====
    export class Foo {
      constructor(public bar?: string) {
                  ~~~~~~~~~~~~~~~~~~~
!!! error TS9026: Declaration emit for this parameter requires implicitly adding undefined to it's type. This is not supported with --isolatedDeclarations.
!!! related TS9029 declarationEmitParameterProperty.ts:2:15: Add a type annotation to the parameter bar.
      }
    }
    
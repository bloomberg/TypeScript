// declarationEmitParameterProperty.d.ts
export declare class Foo {
    bar?: string | undefined;
    constructor(bar?: string | undefined);
}

// ==================
// Original test file: tsc-tests/updated-tests/compiler/declarationEmitParameterProperty.ts
// // @strictNullChecks: true
// // @declaration: true
// export class Foo {
//   constructor(public bar?: string) {
//   }
// }
// 
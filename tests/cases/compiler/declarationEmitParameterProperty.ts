// @strictNullChecks: true
// @declaration: true
// @isolatedDeclarationDiffReason: Implicit undefined in parameter can only be detected by TSC.
export class Foo {
  constructor(public bar?: string) {
  }
}

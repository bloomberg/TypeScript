/// <reference path='fourslash.ts'/>

// @isolatedDeclarations: true
// @declaration: true
// @lib: es2019

// @Filename: /code.ts
////export class Cls {
////    get getSetOnly() { return Math.random(); }
////    set getSetOnly(value/*a*/) {  }
////}

goTo.marker("a");
verify.codeFix({
    description: "Add return type 'number'",
    index: 0,
    newFileContent:
`export class Cls {
    get getSetOnly(): number { return Math.random(); }
    set getSetOnly(value) {  }
}`
});
/// <reference path='fourslash.ts'/>
// @isolatedDeclarations: true
// @declaration: true
// @lib: es2019

/////**
//// * Docs
//// */
////export const bar = () => 
////    Math.random();
////// Trivia


verify.codeFixAvailable([
    { description: "Add return type 'number'" }
]);

verify.codeFix({
    description: "Add return type 'number'",
    index: 0,
    newFileContent:
`/**
 * Docs
 */
export const bar = (): number => 
    Math.random();
// Trivia`

});
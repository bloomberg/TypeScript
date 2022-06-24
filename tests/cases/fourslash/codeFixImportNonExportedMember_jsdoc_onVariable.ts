/// <reference path='fourslash.ts' />
// @Filename: /a.ts
/////**
//// * bar
//// */
////let a = 4;
////export let b = 3;

// @Filename: /b.ts
////import { a, b } from "./a"

goTo.file("/b.ts");
verify.codeFixAvailable([
  { description: `Export 'a' from module './a'` },
  { description: `Remove import from './a'` },
]);


// Doesn't clobber jsdoc on variables
verify.codeFix({
  index: 0,
  description: `Export 'a' from module './a'`,
  newFileContent: {
    "/a.ts": `/**
 * bar
 */
export let a = 4;
export let b = 3;`,
  },
});

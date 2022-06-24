/// <reference path='fourslash.ts' />
// @Filename: /a.ts
/////**
//// * baz
//// */
////class a{};
////export let b = 3;

// @Filename: /b.ts
////import { a, b } from "./a"

goTo.file("/b.ts");
verify.codeFixAvailable([
  { description: `Export 'a' from module './a'` },
  { description: `Remove import from './a'` },
]);

// Doesn't clobber jsdoc on classes
verify.codeFix({
  index: 0,
  description: `Export 'a' from module './a'`,
  newFileContent: {
    "/a.ts": `/**
 * baz
 */
export class a{};
export let b = 3;`,
  },
});

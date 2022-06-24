/// <reference path='fourslash.ts' />
// @Filename: /a.ts
////class a{};
////export let b = 2;

// @Filename: /b.ts
////import { a, b } from "./a"

goTo.file("/b.ts");
verify.codeFixAvailable([
  { description: `Export 'a' from module './a'` },
  { description: `Remove import from './a'` },
]);
// Can export a class
verify.codeFix({
  index: 0,
  description: `Export 'a' from module './a'`,
  newFileContent: {
    "/a.ts": `export class a{};
export let b = 2;`,
  },
});

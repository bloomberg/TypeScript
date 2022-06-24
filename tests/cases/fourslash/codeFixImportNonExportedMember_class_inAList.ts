/// <reference path='fourslash.ts' />
// @Filename: /a.ts
////class a{}, class b{};
////export let c = 3;

// @Filename: /b.ts
////import { a, b, c } from "./a"

goTo.file("/b.ts");
verify.codeFixAvailable([
  { description: `Export 'a' from module './a'` },
  { description: `Export 'b' from module './a'` },
  { description: `Remove import from './a'` },
]);

// Can export class in list
verify.codeFix({
  index: 1,
  description: `Export 'b' from module './a'`,
  newFileContent: {
    "/a.ts": `class a{}, export class b{};
export let c = 3;`,
  },
});

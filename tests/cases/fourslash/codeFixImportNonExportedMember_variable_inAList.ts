/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////let a = 1, b = 2, c = 3;
////export let d = 4;

// @Filename: /b.ts
////import { a } from "./a"

goTo.file("/b.ts");
verify.codeFixAvailable([
  { description: `Export 'a' from module './a'` },
  { description: `Remove import from './a'` },
]);

// Can fix a variable in a list (adds a named export)
verify.codeFix({
  index: 0,
  description: `Export 'a' from module './a'`,
  newFileContent: {
    "/a.ts": `let a = 1, b = 2, c = 3;
export let d = 4;

export { a };
`,
  },
});

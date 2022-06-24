/// <reference path='fourslash.ts' />
// @Filename: /a.ts
////let a = 1, b = 2;
////type c = {foo: string};
////export type { c };

// @Filename: /b.ts
////import { a } from "./a"

// Doesn't use/clobber `export type {...}`
goTo.file("/b.ts");
verify.codeFixAvailable([
  { description: `Export 'a' from module './a'` },
  { description: `Remove import from './a'` },
]);
verify.codeFix({
  index: 0,
  description: `Export 'a' from module './a'`,
  newFileContent: {
    "/a.ts": `let a = 1, b = 2;
type c = {foo: string};
export type { c };

export { a };
`,
  },
});

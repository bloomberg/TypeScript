/// <reference path='fourslash.ts' />
// @Filename: /a.ts
////export let a = 1;

// @Filename: /b.ts
////let b = 2, c = 3;
////export * as a from "./a";

// @Filename: /c.ts
////import { a, b } from "./b"

// Doesn't use/clobber `export * as a from`
goTo.file("/c.ts");
verify.codeFixAvailable([
  { description: `Export 'b' from module './b'` },
  { description: `Remove import from './b'` },
]);
verify.codeFix({
  index: 0,
  description: `Export 'b' from module './b'`,
  newFileContent: {
    "/b.ts": `let b = 2, c = 3;
export * as a from "./a";

export { b };
`,
  },
});

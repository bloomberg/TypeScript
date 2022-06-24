/// <reference path='fourslash.ts' />
// @Filename: /a.ts
////declare function zoo(): any;
////export { zoo };

// @Filename: /b.ts
////declare function foo(): any;
////function bar(): any;
////export { foo };

// @Filename: /c.ts
////import { zoo } from "./a";
////import { bar } from "./b";

goTo.file("/c.ts");
// Recognises that importing from a file with a `declare` is ok if its exported
verify.codeFixAvailable([
  { description: `Export 'bar' from module './b'` },
  { description: `Remove import from './a'` },
  { description: `Remove import from './b'` },
]);
// Exports a function with a `declare` correctly
verify.codeFix({
  index: 0,
  description: `Export 'bar' from module './b'`,
  newFileContent: {
    "/b.ts": `declare function foo(): any;
export function bar(): any;
export { foo };`,
  },
});

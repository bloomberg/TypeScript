/// <reference path='fourslash.ts' />
// @Filename: /node_modules/foo/index.d.ts
////let a = 0
////module.exports = 0;

// @Filename: /a.ts
////import { a } from "foo";

// Won't apply fix if `module.exports` is used
verify.not.codeFixAvailable();

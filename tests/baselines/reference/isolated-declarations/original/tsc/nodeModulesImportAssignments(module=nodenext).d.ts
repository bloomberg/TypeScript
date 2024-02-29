//// [tests/cases/conformance/node/nodeModulesImportAssignments.ts] ////

//// [index.ts]
// cjs format file
import fs = require("fs");
fs.readFile;
export import fs2 = require("fs");
//// [index.ts]
// esm format file
import fs = require("fs");
fs.readFile;
export import fs2 = require("fs");
//// [file.ts]
// esm format file
const __require = null;
const _createRequire = null;
import fs = require("fs");
fs.readFile;
export import fs2 = require("fs");
//// [package.json]
{
    "name": "package",
    "private": true,
    "type": "module"
}
//// [package.json]
{
    "type": "commonjs"
}
//// [types.d.ts]
declare module "fs";

/// [Declarations] ////



//// [file.d.ts]
/// <reference path="types.d.ts" />
export import fs2 = require("fs");

//// [index.d.ts]
/// <reference path="types.d.ts" />
export import fs2 = require("fs");

//// [subfolder/index.d.ts]
/// <reference path="../types.d.ts" />
export import fs2 = require("fs");

/// [Errors] ////

file.ts(6,1): error TS9025: Declaration emit for this expression requires adding a path reference directive to 'types.d.ts' with --isolatedDeclarations.
index.ts(4,1): error TS9025: Declaration emit for this expression requires adding a path reference directive to 'types.d.ts' with --isolatedDeclarations.
subfolder/index.ts(4,1): error TS9025: Declaration emit for this expression requires adding a path reference directive to '../types.d.ts' with --isolatedDeclarations.


==== subfolder/index.ts (1 errors) ====
    // cjs format file
    import fs = require("fs");
    fs.readFile;
    export import fs2 = require("fs");
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
!!! error TS9025: Declaration emit for this expression requires adding a path reference directive to '../types.d.ts' with --isolatedDeclarations.
==== index.ts (1 errors) ====
    // esm format file
    import fs = require("fs");
    fs.readFile;
    export import fs2 = require("fs");
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
!!! error TS9025: Declaration emit for this expression requires adding a path reference directive to 'types.d.ts' with --isolatedDeclarations.
==== file.ts (1 errors) ====
    // esm format file
    const __require = null;
    const _createRequire = null;
    import fs = require("fs");
    fs.readFile;
    export import fs2 = require("fs");
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
!!! error TS9025: Declaration emit for this expression requires adding a path reference directive to 'types.d.ts' with --isolatedDeclarations.
==== package.json (0 errors) ====
    {
        "name": "package",
        "private": true,
        "type": "module"
    }
==== subfolder/package.json (0 errors) ====
    {
        "type": "commonjs"
    }
==== types.d.ts (0 errors) ====
    declare module "fs";
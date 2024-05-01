//// [tests/cases/compiler/declarationEmitTypeofRest.ts] ////

//// [v1.ts]
const n = 'module';
const a = 'module'; 
const v = 'module';
export const v1 = (...a: [n: "rest", v: "rest"]) => {
    const v = 'local';
    return null! as { 
        /** r rest param */ 
        a: typeof a, 
        /** module var */
        n: typeof n,
        /** local var */
        v: typeof v 
    }
}
//// [v2.ts]
const n = 'module'; 
const a = 'module'; 
const v = 'module';
export const v2 = () => {
    const v = "local";
    const g = (...a: [n: "rest", v: "rest"]) => {
        return null! as { 
            /** r rest param */ 
            a: typeof a, 
            /** module var */
            n: typeof n,
            /** local var */
            v: typeof v 
        }
    }
    return g;
}

//// [v3.ts]
const n = 'module'; 
const a = 'module'; 
const v = 'module';
export const v3 = (n: "param", ...a: [n: "rest", v: "rest"]) => {
    const v = "local";
    return null! as { 
        /** r rest param */ 
        a: typeof a, 
        /** o parameter */
        n: typeof n,
        /** local var */
        v: typeof v 
    }
}

//// [v4.ts]
const n = 'module'; 
const a = 'module'; 
const v = 'module';
export const v4 = ({n}: {n: "param"}, ...a: [n: "rest", v: "rest"]) => {
    const v = "local";
    return null! as { 
        /** r rest param */ 
        a: typeof a, 
        /** o parameter */
        n: typeof n,
        /** local var */
        v: typeof v 
    }
}


//// [v5.ts]
const n = 'module'; 
const a = 'module'; 
const v = 'module';
export const v5 = ({n}: {n: "param"}, ...a: [n: "rest", v: "rest"]): { 
    /** r rest param */ 
    a: typeof a, 
    /** o parameter */
    n: typeof n,
    /** local var */
    v: typeof v 
} => {
    const v = "local";
    return null!
}

//// [v6.ts]
const n = 'module'; 
const a = 'module'; 
const v = 'module';
export const v6 = (n: "param") => {
    const g = (v: "local") => (...a: [n: "rest", v: "rest"]) => {
        return null! as { 
            /** g rest param */ 
            a: typeof a, 
            /** param of v6 */
            n: typeof n,
            /** g param */
            v: typeof v 
        }
    }
    return g("local");
}



//// [v8.ts]
export function foo(p: "l0") {
    function l3(p: "l3") {
        return p as typeof p;
    }

    function l2(p: "l2", cb = l3) {
        return p as typeof p;
    }

    return function l1(p: "l1", cb = l2) {
        return p as typeof p;
    }
}

//// [v9.ts]
export function foo(p: "l0") {
    function l3(p: "l3") {
        return null! as { [p]: 0 };
    }

    function l2(p: "l2", cb = l3) {
        return null! as { [p]: 0 };
    }

    return function l1(p: string, cb = l2) {
        return null!;
    }
}

//// [v10.ts]
const l3 = function l3(p: "l3") {
    return null! as { [p]: 0 };
}

export function foo() {
    const p: "l0" = "l0";

    function l2(cb = l3) {
        return null! as { [p]: 0 };
    }

    return function l1(p: string, cb = l2) {
        return null!;
    }
}

//// [v1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.v1 = void 0;
var n = 'module';
var a = 'module';
var v = 'module';
var v1 = function () {
    var a = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        a[_i] = arguments[_i];
    }
    var v = 'local';
    return null;
};
exports.v1 = v1;
//// [v2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.v2 = void 0;
var n = 'module';
var a = 'module';
var v = 'module';
var v2 = function () {
    var v = "local";
    var g = function () {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        return null;
    };
    return g;
};
exports.v2 = v2;
//// [v3.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.v3 = void 0;
var n = 'module';
var a = 'module';
var v = 'module';
var v3 = function (n) {
    var a = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        a[_i - 1] = arguments[_i];
    }
    var v = "local";
    return null;
};
exports.v3 = v3;
//// [v4.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.v4 = void 0;
var n = 'module';
var a = 'module';
var v = 'module';
var v4 = function (_a) {
    var n = _a.n;
    var a = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        a[_i - 1] = arguments[_i];
    }
    var v = "local";
    return null;
};
exports.v4 = v4;
//// [v5.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.v5 = void 0;
var n = 'module';
var a = 'module';
var v = 'module';
var v5 = function (_a) {
    var n = _a.n;
    var a = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        a[_i - 1] = arguments[_i];
    }
    var v = "local";
    return null;
};
exports.v5 = v5;
//// [v6.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.v6 = void 0;
var n = 'module';
var a = 'module';
var v = 'module';
var v6 = function (n) {
    var g = function (v) { return function () {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        return null;
    }; };
    return g("local");
};
exports.v6 = v6;
//// [v8.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foo = foo;
function foo(p) {
    function l3(p) {
        return p;
    }
    function l2(p, cb) {
        if (cb === void 0) { cb = l3; }
        return p;
    }
    return function l1(p, cb) {
        if (cb === void 0) { cb = l2; }
        return p;
    };
}
//// [v9.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foo = foo;
function foo(p) {
    function l3(p) {
        return null;
    }
    function l2(p, cb) {
        if (cb === void 0) { cb = l3; }
        return null;
    }
    return function l1(p, cb) {
        if (cb === void 0) { cb = l2; }
        return null;
    };
}
//// [v10.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foo = foo;
var l3 = function l3(p) {
    return null;
};
function foo() {
    var p = "l0";
    function l2(cb) {
        if (cb === void 0) { cb = l3; }
        return null;
    }
    return function l1(p, cb) {
        if (cb === void 0) { cb = l2; }
        return null;
    };
}


//// [v1.d.ts]
declare const n = 'module';
export declare const v1: (...a: [n: "rest", v: "rest"]) => {
    /** r rest param */
    a: typeof a;
    /** module var */
    n: typeof n;
    /** local var */
    v: "local";
};
export {};
//// [v2.d.ts]
export declare const v2: () => (n: "rest", v: "rest") => {
    /** r rest param */
    a: [n: "rest", v: "rest"];
    /** module var */
    n: "module";
    /** local var */
    v: "local";
};
//// [v3.d.ts]
export declare const v3: (n: "param", ...a: [n: "rest", v: "rest"]) => {
    /** r rest param */
    a: typeof a;
    /** o parameter */
    n: typeof n;
    /** local var */
    v: "local";
};
//// [v4.d.ts]
export declare const v4: ({ n }: {
    n: "param";
}, ...a: [n: "rest", v: "rest"]) => {
    /** r rest param */
    a: typeof a;
    /** o parameter */
    n: typeof n;
    /** local var */
    v: "local";
};
//// [v5.d.ts]
export declare const v5: ({ n }: {
    n: "param";
}, ...a: [n: "rest", v: "rest"]) => {
    /** r rest param */
    a: typeof a;
    /** o parameter */
    n: typeof n;
    /** local var */
    v: "local";
};
//// [v6.d.ts]
export declare const v6: (n: "param") => (n: "rest", v: "rest") => {
    /** g rest param */
    a: [n: "rest", v: "rest"];
    /** param of v6 */
    n: "param";
    /** g param */
    v: "local";
};
//// [v8.d.ts]
export declare function foo(p: "l0"): (p: "l1", cb?: (p: "l2", cb?: (p: "l3") => typeof p) => typeof p) => typeof p;
//// [v9.d.ts]
export declare function foo(p: "l0"): (p: string, cb?: (p: "l2", cb?: (p: "l3") => {
    [p]: 0;
}) => {
    [p]: 0;
}) => any;
//// [v10.d.ts]
export declare function foo(): (p: string, cb?: (cb?: (p: "l3") => {
    [p]: 0;
}) => {
    l0: 0;
}) => any;

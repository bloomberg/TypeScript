//// [tests/cases/compiler/declarationEmitTypeofRest.ts] ////

//// [v1.ts]
export const v1 = (...a: [n: "n", a: "a"]): {
    /** r rest param */
    a: typeof a,
} => {
    return null!
}

//// [v2.ts]
const n = Symbol();
export const v2 = (...a: [n: "n", a: "a"]): {
    /** r rest param */
    a: typeof a,
    /** module var */
    n: typeof n,
} => {
    return null!
}

//// [v1b.ts]
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
//// [v2b.ts]
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
export const v1 = (...a) => {
    return null;
};
//// [v2.js]
const n = Symbol();
export const v2 = (...a) => {
    return null;
};
//// [v1b.js]
const n = 'module';
const a = 'module';
const v = 'module';
export const v1 = (...a) => {
    const v = 'local';
    return null;
};
//// [v2b.js]
const n = 'module';
const a = 'module';
const v = 'module';
export const v2 = () => {
    const v = "local";
    const g = (...a) => {
        return null;
    };
    return g;
};
//// [v3.js]
const n = 'module';
const a = 'module';
const v = 'module';
export const v3 = (n, ...a) => {
    const v = "local";
    return null;
};
//// [v4.js]
const n = 'module';
const a = 'module';
const v = 'module';
export const v4 = ({ n }, ...a) => {
    const v = "local";
    return null;
};
//// [v5.js]
const n = 'module';
const a = 'module';
const v = 'module';
export const v5 = ({ n }, ...a) => {
    const v = "local";
    return null;
};
//// [v6.js]
const n = 'module';
const a = 'module';
const v = 'module';
export const v6 = (n) => {
    const g = (v) => (...a) => {
        return null;
    };
    return g("local");
};
//// [v8.js]
export function foo(p) {
    function l3(p) {
        return p;
    }
    function l2(p, cb = l3) {
        return p;
    }
    return function l1(p, cb = l2) {
        return p;
    };
}
//// [v9.js]
export function foo(p) {
    function l3(p) {
        return null;
    }
    function l2(p, cb = l3) {
        return null;
    }
    return function l1(p, cb = l2) {
        return null;
    };
}
//// [v10.js]
const l3 = function l3(p) {
    return null;
};
export function foo() {
    const p = "l0";
    function l2(cb = l3) {
        return null;
    }
    return function l1(p, cb = l2) {
        return null;
    };
}


//// [v1.d.ts]
export declare const v1: (...a: [n: "n", a: "a"]) => {
    /** r rest param */
    a: typeof a;
};
//// [v2.d.ts]
declare const n: unique symbol;
export declare const v2: (...a: [n: "n", a: "a"]) => {
    /** r rest param */
    a: typeof a;
    /** module var */
    n: typeof n;
};
export {};
//// [v1b.d.ts]
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
//// [v2b.d.ts]
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

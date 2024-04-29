// @declaration: true

// @fileName: v1.ts
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
// @fileName: v2.ts
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

// @fileName: v3.ts
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

// @fileName: v4.ts
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


// @fileName: v5.ts
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

// @fileName: v6.ts
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



// @fileName: v8.ts
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

// @fileName: v9.ts
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

// @fileName: v10.ts
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
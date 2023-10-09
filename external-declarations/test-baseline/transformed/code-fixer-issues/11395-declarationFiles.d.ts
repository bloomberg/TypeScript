// declarationFiles.d.ts
declare class C1 {
    x: this;
    f(x: this): this;
    constructor(x: this);
}
declare class C2 {
    [x: string]: this;
}
interface Foo<T> {
    x: T;
    y: this;
}
declare class C3 {
    a: this[];
    b: [this, this];
    c: this | Date;
    d: this & Date;
    e: (((this)));
    f: (x: this) => this;
    g: new (x: this) => this;
    h: Foo<this>;
    i: Foo<this | (() => this)>;
    j: (x: any) => x is this;
}
declare const x1_a: typeof globalThis;
declare const x3_a: typeof globalThis;
declare class C4 {
    x1: {
        a: typeof x1_a;
    };
    x2: this[];
    x3: readonly [{
        readonly a: typeof x3_a;
    }];
    x4: () => this;
    f1(): invalid;
    f2(): this[];
    f3(): invalid;
    f4(): () => this;
}

// ==================
// Original test file: tsc-tests/updated-tests/conformance/types/thisType/declarationFiles.ts
// // @declaration: true
// 
// class C1 {
//     x: this;
//     f(x: this): this { return undefined; }
//     constructor(x: this) { }
// }
// 
// class C2 {
//     [x: string]: this;
// }
// 
// interface Foo<T> {
//     x: T;
//     y: this;
// }
// 
// class C3 {
//     a: this[];
//     b: [this, this];
//     c: this | Date;
//     d: this & Date;
//     e: (((this)));
//     f: (x: this) => this;
//     g: new (x: this) => this;
//     h: Foo<this>;
//     i: Foo<this | (() => this)>;
//     j: (x: any) => x is this;
// }
// 
// const x1_a: typeof globalThis = this;
// const x3_a: typeof globalThis = this;
// class C4 {
//     x1 = { a: x1_a as typeof x1_a };
//     x2: this[] = [this];
//     x3 = [{ a: x3_a as typeof x3_a }] as const;
//     x4 = (): this => this;
//     f1() {
//         return { a: this };
//     }
//     f2(): this[] {
//         return [this];
//     }
//     f3() {
//         return [{ a: this }];
//     }
//     f4(): () => this {
//         return () => this;
//     }
// }
// 
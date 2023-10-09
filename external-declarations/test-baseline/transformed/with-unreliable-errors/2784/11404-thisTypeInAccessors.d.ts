// thisTypeInAccessors.d.ts
interface Foo {
    n: number;
    x: number;
}
declare const explicit: {
    n: number;
    x: number;
};
declare const copiedFromGetter: {
    n: number;
    x: number;
};
declare const copiedFromSetter: {
    n: number;
    x: number;
};
declare const copiedFromGetterUnannotated: {
    n: number;
    x: number;
};
declare class Explicit {
    n: number;
    get x(this: Foo): number;
    set x(this: Foo, n: Foo);
}
declare class Contextual {
    n: number;
    get x(): number;
}

// ==================
// Original test file: tsc-tests/updated-tests/conformance/types/thisType/thisTypeInAccessors.ts
// // @noImplicitAny: true
// // @noImplicitThis: true
// // @target: es5
// interface Foo {
//     n: number;
//     x: number;
// }
// 
// const explicit = {
//     n: 12,
//     get x(this: Foo): number { return this.n; },
//     set x(this: Foo, n: number) { this.n = n; }
// }
// const copiedFromGetter = {
//     n: 14,
//     get x(this: Foo): number { return this.n; },
//     set x(n) { this.n = n; }
// }
// const copiedFromSetter = {
//     n: 15,
//     get x() { return this.n },
//     set x(this: Foo, n: number) { this.n = n; }
// }
// const copiedFromGetterUnannotated = {
//     n: 16,
//     get x(this: Foo): number { return this.n },
//     set x(this, n) { this.n = n; }
// }
// 
// class Explicit {
//     n = 17;
//     get x(this: Foo): number { return this.n; }
//     set x(this: Foo, n: number) { this.n = n; }
// }
// class Contextual {
//     n = 21;
//     get x(): number { return this.n } // inside a class, so already correct
// }
// 
//// [privateNamesAndStaticFields.ts]
class A {
    static #foo: number;
    constructor () {
        A.#foo = 3;
    }
}

class B extends A {
    static #foo: string;
    constructor () {
        super();
        B.#foo = "some string";
    }
}


//// [privateNamesAndStaticFields.js]
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to set private field on non-instance"); } privateMap.set(receiver, value); return value; };
var _foo, _foo_1;
"use strict";
class A {
    constructor() {
        __classPrivateFieldSet(A, _foo, 3);
    }
}
_foo = new WeakMap();
class B extends A {
    constructor() {
        super();
        __classPrivateFieldSet(B, _foo_1, "some string");
    }
}
_foo_1 = new WeakMap();

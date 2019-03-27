//// [privateNamesAndStaticMethods.ts]
class A {
    static #foo(a: number) {}
    static async #bar(a: number) {}
    static async *#baz(a: number) {
        return 3;
    }
    static #_quux: number;
    static get #quux (): number {
        return this.#_quux;
    }
    static set #quux (val: number) {
        this.#_quux = val; 
    }
    constructor () {
        A.#foo(30);
        A.#bar(30);
        A.#bar(30);
        A.#quux = A.#quux + 1;
        A.#quux++;
 }
}

class B extends A {
    static #foo(a: string) {}
    constructor () {
        super();
        B.#foo("str");
    }
}


//// [privateNamesAndStaticMethods.js]
var _classPrivateFieldGet = function (receiver, privateMap) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return privateMap.get(receiver); };
var _classPrivateFieldSet = function (receiver, privateMap, value) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to set private field on non-instance"); } privateMap.set(receiver, value); return value; };
var __quux;
"use strict";
class A {
    constructor() {
        var _a, _b, _c;
        (_a = A).#foo.call(_a, 30);
        (_b = A).#bar.call(_b, 30);
        (_c = A).#bar.call(_c, 30);
        A.#quux = A.#quux + 1;
        A.#quux++;
    }
    static #foo(a) { }
    static async #bar(a) { }
    static async *#baz(a) {
        return 3;
    }
    static get #quux() {
        return _classPrivateFieldGet(this, __quux);
    }
    static set #quux(val) {
        _classPrivateFieldSet(this, __quux, val);
    }
}
__quux = new WeakMap();
class B extends A {
    constructor() {
        var _a;
        super();
        (_a = B).#foo.call(_a, "str");
    }
    static #foo(a) { }
}

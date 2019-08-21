//// [privateNameAndAny.ts]
class A {
    #foo = true; 
    method(thing: any) {
        thing.#foo; // OK
        thing.#bar; // OK: we do not (yet) check that #foo is in an ancestor class (but we could)
    }
};


//// [privateNameAndAny.js]
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return privateMap.get(receiver); };
var _foo;
"use strict";
class A {
    constructor() {
        _foo.set(this, true);
    }
    method(thing) {
        __classPrivateFieldGet(thing, _foo); // OK
        thing.; // OK: we do not (yet) check that #foo is in an ancestor class (but we could)
    }
}
_foo = new WeakMap();
;

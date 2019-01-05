//// [privateNamesInGenericClasses.ts]
// @target es6

class C<T> {
  #foo: T;
  bar(x: C<T>) { return x.#foo; }          // OK
  baz(x: C<number>) { return x.#foo; }     // OK
  quux(x: C<string>) { return x.#foo; }    // OK
}

declare let a: C<number>;
declare let b: C<string>;
a.#foo;                                   // OK
a = b;                                    // Error
b = a;                                    // Error


//// [privateNamesInGenericClasses.js]
// @target es6
var _classPrivateFieldGet = function (receiver, privateMap) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return privateMap.get(receiver); };
var _foo;
"use strict";
var C = /** @class */ (function () {
    function C() {
        _foo.set(this, void 0);
    }
    C.prototype.bar = function (x) { return _classPrivateFieldGet(x, _foo); }; // OK
    C.prototype.baz = function (x) { return _classPrivateFieldGet(x, _foo); }; // OK
    C.prototype.quux = function (x) { return _classPrivateFieldGet(x, _foo); }; // OK
    return C;
}());
_foo = new WeakMap();
a.#foo; // OK
a = b; // Error
b = a; // Error

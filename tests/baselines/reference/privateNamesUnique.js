//// [privateNamesUnique.ts]
// @target es6

class A {
    #foo: number;
}

class B {
    #foo: number;
}

const b: A = new B();     // Error: Property #foo is missing


//// [privateNamesUnique.js]
// @target es6
var _foo, _foo_1;
"use strict";
var A = /** @class */ (function () {
    function A() {
        _foo.set(this, void 0);
    }
    return A;
}());
_foo = new WeakMap();
var B = /** @class */ (function () {
    function B() {
        _foo_1.set(this, void 0);
    }
    return B;
}());
_foo_1 = new WeakMap();
var b = new B(); // Error: Property #foo is missing

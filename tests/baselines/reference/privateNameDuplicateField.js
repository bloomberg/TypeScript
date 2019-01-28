//// [privateNameDuplicateField.ts]
// @target es6

class A {
    #foo = "foo";
    #foo = "foo";
}


//// [privateNameDuplicateField.js]
// @target es6
var _foo, _foo_1;
"use strict";
var A = /** @class */ (function () {
    function A() {
        _foo_1.set(this, "foo");
        _foo_1.set(this, "foo");
    }
    return A;
}());
_foo = new WeakMap(), _foo_1 = new WeakMap();

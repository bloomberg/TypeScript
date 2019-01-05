//// [privateNamesNotAllowedAsParameters.ts]
// @target es6

class A {
    setFoo(#foo: string) {}
}


//// [privateNamesNotAllowedAsParameters.js]
// @target es6
var _foo;
var A = /** @class */ (function () {
    function A() {
        _foo.set(this, void 0);
    }
    A.prototype.setFoo = function () { };
    return A;
}());
_foo = new WeakMap();
{ }

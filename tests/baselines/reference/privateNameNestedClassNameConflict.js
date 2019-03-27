//// [privateNameNestedClassNameConflict.ts]
class A {
    #foo: string;
    constructor() {
        class A {
            #foo: string;
        }
    }
}


//// [privateNameNestedClassNameConflict.js]
var _foo;
var A = /** @class */ (function () {
    function A() {
        _foo.set(this, void 0);
        var _foo_1;
        var A = /** @class */ (function () {
            function A() {
                _foo_1.set(this, void 0);
            }
            return A;
        }());
        _foo_1 = new WeakMap();
    }
    return A;
}());
_foo = new WeakMap();

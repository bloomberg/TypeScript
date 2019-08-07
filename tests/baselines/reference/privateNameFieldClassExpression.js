//// [privateNameFieldClassExpression.ts]
class B {
    #foo = class {
        constructor() {
            console.log("hello");
        }
        static test = 123;
    };
    #foo2 = class Foo {
        static otherClass = 123;
    };
}




//// [privateNameFieldClassExpression.js]
var _foo, _foo2;
var B = /** @class */ (function () {
    function B() {
        var _a, _b;
        _foo.set(this, (_a = /** @class */ (function () {
                function class_1() {
                    console.log("hello");
                }
                return class_1;
            }()),
            _a.test = 123,
            _a));
        _foo2.set(this, (_b = /** @class */ (function () {
                function Foo() {
                }
                return Foo;
            }()),
            _b.otherClass = 123,
            _b));
    }
    return B;
}());
_foo = new WeakMap(), _foo2 = new WeakMap();

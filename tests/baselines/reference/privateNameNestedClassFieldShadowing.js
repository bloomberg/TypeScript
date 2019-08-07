//// [privateNameNestedClassFieldShadowing.ts]
class Base {
    #x;
    constructor() {
        class Derived {
            #x;
            testBase(x: Base) {
                console.log(x.#x);
            }
            testDerived(x: Derived) {
                console.log(x.#x);
            }
        }
    }
}


//// [privateNameNestedClassFieldShadowing.js]
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return privateMap.get(receiver); };
var _x;
var Base = /** @class */ (function () {
    function Base() {
        var _x_1;
        _x.set(this, void 0);
        var Derived = /** @class */ (function () {
            function Derived() {
                _x_1.set(this, void 0);
            }
            Derived.prototype.testBase = function (x) {
                console.log(__classPrivateFieldGet(x, _x_1));
            };
            Derived.prototype.testDerived = function (x) {
                console.log(__classPrivateFieldGet(x, _x_1));
            };
            return Derived;
        }());
        _x_1 = new WeakMap();
    }
    return Base;
}());
_x = new WeakMap();

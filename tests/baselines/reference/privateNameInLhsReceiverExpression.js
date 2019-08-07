//// [privateNameInLhsReceiverExpression.ts]
class Test {
    #y = 123;
    static something(obj: { [key: string]: Test }) {
        obj[(new class { #x = 1; readonly s = "prop"; }).s].#y = 1;
        obj[(new class { #x = 1; readonly s = "prop"; }).s].#y += 1;
    }
}



//// [privateNameInLhsReceiverExpression.js]
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to set private field on non-instance"); } privateMap.set(receiver, value); return value; };
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return privateMap.get(receiver); };
var _y;
var Test = /** @class */ (function () {
    function Test() {
        _y.set(this, 123);
    }
    Test.something = function (obj) {
        var _x, _a, _x_1, _b, _c;
        __classPrivateFieldSet(obj[(new (_a = /** @class */ (function () {
                function class_1() {
                    _x.set(this, 1);
                    this.s = "prop";
                }
                return class_1;
            }()),
            _x = new WeakMap(),
            _a)).s], _y, 1);
        __classPrivateFieldSet(_c = obj[(new (_b = /** @class */ (function () {
                function class_2() {
                    _x_1.set(this, 1);
                    this.s = "prop";
                }
                return class_2;
            }()),
            _x_1 = new WeakMap(),
            _b)).s], _y, __classPrivateFieldGet(_c, _y) + 1);
    };
    return Test;
}());
_y = new WeakMap();

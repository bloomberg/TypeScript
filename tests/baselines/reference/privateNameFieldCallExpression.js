//// [privateNameFieldCallExpression.ts]
class A {
    #fieldFunc = function() { this.x = 10; };
    x = 1;
    test() {
        this.#fieldFunc();
        const func = this.#fieldFunc;
        func();
    }
}


//// [privateNameFieldCallExpression.js]
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return privateMap.get(receiver); };
var _fieldFunc;
var A = /** @class */ (function () {
    function A() {
        _fieldFunc.set(this, function () { this.x = 10; });
        this.x = 1;
    }
    A.prototype.test = function () {
        __classPrivateFieldGet(this, _fieldFunc).call(this);
        var func = __classPrivateFieldGet(this, _fieldFunc);
        func();
    };
    return A;
}());
_fieldFunc = new WeakMap();

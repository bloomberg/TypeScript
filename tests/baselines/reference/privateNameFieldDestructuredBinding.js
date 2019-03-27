//// [privateNameFieldDestructuredBinding.ts]
class A {
    #field = 1;
    testObject() {
        return { x: 10, y: 6 };
    }
    testArray() {
        return [10, 11];
    }
    constructor() {
        let y: number;
        ({ x: this.#field, y } = this.testObject());
        ([this.#field, y] = this.testArray());
    }
}


//// [privateNameFieldDestructuredBinding.js]
var _classPrivateFieldSet = function (receiver, privateMap, value) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to set private field on non-instance"); } privateMap.set(receiver, value); return value; };
var _field;
var A = /** @class */ (function () {
    function A() {
        var _a, _b;
        _field.set(this, 1);
        var y;
        (_a = this.testObject(), { set value(x) { _classPrivateFieldSet(this, _field, x); } }.value = _a.x, y = _a.y);
        (_b = this.testArray(), { set value(x) { _classPrivateFieldSet(this, _field, x); } }.value = _b[0], y = _b[1]);
    }
    A.prototype.testObject = function () {
        return { x: 10, y: 6 };
    };
    A.prototype.testArray = function () {
        return [10, 11];
    };
    return A;
}());
_field = new WeakMap();

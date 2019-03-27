//// [privateNameFieldAccess.ts]
class A {
    #myField = "hello world";
    constructor() {
        console.log(this.#myField);
    }
}


//// [privateNameFieldAccess.js]
var _classPrivateFieldGet = function (receiver, privateMap) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return privateMap.get(receiver); };
var _myField;
var A = /** @class */ (function () {
    function A() {
        _myField.set(this, "hello world");
        console.log(_classPrivateFieldGet(this, _myField));
    }
    return A;
}());
_myField = new WeakMap();

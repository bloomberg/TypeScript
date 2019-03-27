//// [privateNameFieldUnaryMutation.ts]
class C {
    #test: number = 24;
    constructor() {
        this.#test++;
        this.#test--;
        ++this.#test;
        --this.#test;
    }
    test() {
        this.getInstance().#test++;
        this.getInstance().#test--;
        ++this.getInstance().#test;
        --this.getInstance().#test;
    }
    getInstance() { return new C(); }
}


//// [privateNameFieldUnaryMutation.js]
var _classPrivateFieldGet = function (receiver, privateMap) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return privateMap.get(receiver); };
var _classPrivateFieldSet = function (receiver, privateMap, value) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to set private field on non-instance"); } privateMap.set(receiver, value); return value; };
var _test;
var C = /** @class */ (function () {
    function C() {
        _test.set(this, 24);
        var _a, _b;
        _a = _classPrivateFieldGet(this, _test), _classPrivateFieldSet(this, _test, _a + 1), _a;
        _b = _classPrivateFieldGet(this, _test), _classPrivateFieldSet(this, _test, _b - 1), _b;
        _classPrivateFieldSet(this, _test, _classPrivateFieldGet(this, _test) + 1);
        _classPrivateFieldSet(this, _test, _classPrivateFieldGet(this, _test) - 1);
    }
    C.prototype.test = function () {
        var _a, _b, _c, _d, _e, _f;
        _a = this.getInstance(), _b = _classPrivateFieldGet(_a, _test), _classPrivateFieldSet(_a, _test, _b + 1), _b;
        _c = this.getInstance(), _d = _classPrivateFieldGet(_c, _test), _classPrivateFieldSet(_c, _test, _d - 1), _d;
        _classPrivateFieldSet(_e = this.getInstance(), _test, _classPrivateFieldGet(_e, _test) + 1);
        _classPrivateFieldSet(_f = this.getInstance(), _test, _classPrivateFieldGet(_f, _test) - 1);
    };
    C.prototype.getInstance = function () { return new C(); };
    return C;
}());
_test = new WeakMap();

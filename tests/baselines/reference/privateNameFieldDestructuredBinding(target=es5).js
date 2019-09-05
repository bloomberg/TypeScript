//// [privateNameFieldDestructuredBinding.ts]
class A {
    #field = 1;
    otherObject = new A();
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
        ({ a: this.#field, b: [this.#field] } = { a: 1, b: [2] });
        [this.#field, [this.#field]] = [1, [2]];
        ({ a: this.#field = 1, b: [this.#field = 1] } = { b: [] });
        [this.#field = 2] = [];
        [this.otherObject.#field = 2] = [];
    }
    static test(_a: A) {
        [_a.#field] = [2];
    }
}


//// [privateNameFieldDestructuredBinding.js]
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var _field;
var A = /** @class */ (function () {
    function A() {
        var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        var _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
        _field.set(this, 1);
        this.otherObject = new A();
        var y;
        (_o = this, (_b = this.testObject(), ({ set value(_b) { __classPrivateFieldSet(_o, _field, _b); } }).value = _b.x, y = _b.y, _b));
        (_p = this, (_c = this.testArray(), ({ set value(_b) { __classPrivateFieldSet(_p, _field, _b); } }).value = _c[0], y = _c[1], _c));
        (_q = this, _r = this, (_d = { a: 1, b: [2] }, ({ set value(_b) { __classPrivateFieldSet(_q, _field, _b); } }).value = _d.a, ({ set value(_b) { __classPrivateFieldSet(_r, _field, _b); } }).value = _d.b[0], _d));
        _s = this, _t = this, (_e = [1, [2]], ({ set value(_b) { __classPrivateFieldSet(_s, _field, _b); } }).value = _e[0], ({ set value(_b) { __classPrivateFieldSet(_t, _field, _b); } }).value = _e[1][0], _e);
        (_u = this, _v = this, (_f = { b: [] }, _g = _f.a, ({ set value(_b) { __classPrivateFieldSet(_u, _field, _b); } }).value = _g === void 0 ? 1 : _g, _h = _f.b[0], ({ set value(_b) { __classPrivateFieldSet(_v, _field, _b); } }).value = _h === void 0 ? 1 : _h, _f));
        _w = this, (_j = [], _k = _j[0], ({ set value(_b) { __classPrivateFieldSet(_w, _field, _b); } }).value = _k === void 0 ? 2 : _k, _j);
        _x = this.otherObject, (_l = [], _m = _l[0], ({ set value(_b) { __classPrivateFieldSet(_x, _field, _b); } }).value = _m === void 0 ? 2 : _m, _l);
    }
    A.prototype.testObject = function () {
        return { x: 10, y: 6 };
    };
    A.prototype.testArray = function () {
        return [10, 11];
    };
    A.test = function (_a) {
        ({ set value(_b) { __classPrivateFieldSet(_a, _field, _b); } }).value = [2][0];
    };
    return A;
}());
_field = new WeakMap();

//// [privateNamesAndStaticFields.ts]
// @target es6

class A {
    static #foo: number;
    constructor () {
        A.#foo = 3;
    }
}

class B extends A {
    static #foo: string;
    constructor () {
        super();
        B.#foo = "some string";
    }
}


//// [privateNamesAndStaticFields.js]
// @target es6
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var _classPrivateFieldSet = function (receiver, privateMap, value) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to set private field on non-instance"); } privateMap.set(receiver, value); return value; };
var _foo, _foo_1;
"use strict";
var A = /** @class */ (function () {
    function A() {
        _classPrivateFieldSet(A, _foo, 3);
    }
    return A;
}());
_foo = new WeakMap();
var B = /** @class */ (function (_super) {
    __extends(B, _super);
    function B() {
        var _this = _super.call(this) || this;
        _classPrivateFieldSet(B, _foo_1, "some string");
        return _this;
    }
    return B;
}(A));
_foo_1 = new WeakMap();

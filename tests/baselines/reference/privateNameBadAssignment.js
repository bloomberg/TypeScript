//// [privateNameBadAssignment.ts]
exports.#nope = 1;           // Error (outside class body)
function A() { }
A.prototype.#no = 2;         // Error (outside class body)

class B {}
B.#foo = 3;                  // Error (outside class body)

class C {
    #bar = 6;
    constructor () {
        exports.#bar = 6;    // Error
        this.#foo = 3;       // Error (undeclared)
    }
}


//// [privateNameBadAssignment.js]
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to set private field on non-instance"); } privateMap.set(receiver, value); return value; };
var _bar;
exports. = 1; // Error (outside class body)
function A() { }
A.prototype. = 2; // Error (outside class body)
var B = /** @class */ (function () {
    function B() {
    }
    return B;
}());
B. = 3; // Error (outside class body)
var C = /** @class */ (function () {
    function C() {
        _bar.set(this, 6);
        __classPrivateFieldSet(exports, _bar, 6); // Error
        this. = 3; // Error (undeclared)
    }
    return C;
}());
_bar = new WeakMap();

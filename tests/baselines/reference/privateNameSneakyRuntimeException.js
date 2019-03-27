//// [privateNameSneakyRuntimeException.ts]
// @target es6

function createClass () {
    return class {
        #foo = 3;
        equals(other: any) {
            return this.#foo = other.#foo;
        }
    };
}

const a = new (createClass())();
const b = new (createClass())();

console.log(a.equals(b));     // OK at compile time but will be a runtime error


//// [privateNameSneakyRuntimeException.js]
"use strict";
// @target es6
var _classPrivateFieldGet = function (receiver, privateMap) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return privateMap.get(receiver); };
var _classPrivateFieldSet = function (receiver, privateMap, value) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to set private field on non-instance"); } privateMap.set(receiver, value); return value; };
function createClass() {
    var _foo, _a;
    return _a = /** @class */ (function () {
            function class_1() {
                _foo.set(this, 3);
            }
            class_1.prototype.equals = function (other) {
                return _classPrivateFieldSet(this, _foo, _classPrivateFieldGet(other, _foo));
            };
            return class_1;
        }()),
        _foo = new WeakMap(),
        _a;
}
var a = new (createClass())();
var b = new (createClass())();
console.log(a.equals(b)); // OK at compile time but will be a runtime error

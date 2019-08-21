//// [privateNameField.ts]
class A {
    #name: string;
    constructor(name: string) {
        this.#name = name;
    }
}


//// [privateNameField.js]
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to set private field on non-instance"); } privateMap.set(receiver, value); return value; };
var _name;
"use strict";
class A {
    constructor(name) {
        _name.set(this, void 0);
        __classPrivateFieldSet(this, _name, name);
    }
}
_name = new WeakMap();

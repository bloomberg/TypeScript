//// [privateNameNestedClassMethodShadowing.ts]
class Base {
    #x() { };
    constructor() {
        class Derived {
            #x() { };
            testBase(x: Base) {
                console.log(x.#x);
            }
            testDerived(x: Derived) {
                console.log(x.#x);
            }
        }
    }
}


//// [privateNameNestedClassMethodShadowing.js]
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _x;
class Base {
    constructor() {
        var _x_1;
        class Derived {
            () { }
            ;
            testBase(x) {
                console.log(__classPrivateFieldGet(x, _x_1));
            }
            testDerived(x) {
                console.log(__classPrivateFieldGet(x, _x_1));
            }
        }
        _x_1 = new WeakMap();
    }
    () { }
    ;
}
_x = new WeakMap();

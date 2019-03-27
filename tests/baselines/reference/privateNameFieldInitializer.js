//// [privateNameFieldInitializer.ts]
class A {
    #field = 10;
    #uninitialized;
}


//// [privateNameFieldInitializer.js]
var _field, _uninitialized;
var A = /** @class */ (function () {
    function A() {
        _field.set(this, 10);
        _uninitialized.set(this, void 0);
    }
    return A;
}());
_field = new WeakMap(), _uninitialized = new WeakMap();

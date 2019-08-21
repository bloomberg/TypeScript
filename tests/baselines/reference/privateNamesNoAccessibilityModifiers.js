//// [privateNamesNoAccessibilityModifiers.ts]
class A {
    public #foo = 3;         // Error
    private #bar = 3;        // Error
    protected #baz = 3;      // Error
    readonly #qux = 3;       // OK
}


//// [privateNamesNoAccessibilityModifiers.js]
var _foo, _bar, _baz, _qux;
"use strict";
class A {
    constructor() {
        _foo.set(this, 3); // Error
        _bar.set(this, 3); // Error
        _baz.set(this, 3); // Error
        _qux.set(this, 3); // OK
    }
}
_foo = new WeakMap(), _bar = new WeakMap(), _baz = new WeakMap(), _qux = new WeakMap();

//// [privateNameDuplicateField.ts]
class A {
    #foo = "foo";
    #foo = "foo";
}


//// [privateNameDuplicateField.js]
var _foo, _foo_1;
"use strict";
class A {
    constructor() {
        _foo_1.set(this, "foo");
        _foo_1.set(this, "foo");
    }
}
_foo = new WeakMap(), _foo_1 = new WeakMap();

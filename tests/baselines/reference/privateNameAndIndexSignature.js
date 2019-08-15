//// [privateNameAndIndexSignature.ts]
// @target es6

class A {
    [k: string]: any;
    #foo = 3;
    ["#bar"] = this["#bar"]   // Error (private identifiers should not prevent circularity checking for computeds)
    constructor(message: string) {
        this.#f = 3           // Error (index signatures do not implicitly declare private names)
        this["#foo"] = 3;     // Okay (type has index signature and "#foo" does not collide with private identifier #foo)

    }
}


//// [privateNameAndIndexSignature.js]
// @target es6
var _foo;
"use strict";
var A = /** @class */ (function () {
    function A(message) {
        _foo.set(this, 3);
        this["#bar"] = this["#bar"]; // Error (private identifiers should not prevent circularity checking for computeds)
        this. = 3; // Error (index signatures do not implicitly declare private names)
        this["#foo"] = 3; // Okay (type has index signature and "#foo" does not collide with private identifier #foo)
    }
    return A;
}());
_foo = new WeakMap();

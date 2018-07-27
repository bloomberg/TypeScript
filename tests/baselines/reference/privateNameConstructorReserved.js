//// [privateNameConstructorReserved.ts]
class A {
    #constructor() {}      // Error: `#constructor` is a reserved word.
}

class A {
    #constructor = 5       // Error: `#constructor` is a reserved word.
}

//// [privateNameConstructorReserved.js]
var A = /** @class */ (function () {
    function A() {
    }
    A.prototype.#constructor = function () { }; // Error: `#constructor` is a reserved word.
    return A;
}());
var A = /** @class */ (function () {
    function A() {
        this.#constructor = 5; // Error: `#constructor` is a reserved word.
    }
    return A;
}());

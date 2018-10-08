//// [privateNameConstructorReserved.ts]
class A {
    #constructor() {}      // Error: `#constructor` is a reserved word.
}


//// [privateNameConstructorReserved.js]
var A = /** @class */ (function () {
    function A() {
    }
    A.prototype.#constructor = function () { }; // Error: `#constructor` is a reserved word.
    return A;
}());

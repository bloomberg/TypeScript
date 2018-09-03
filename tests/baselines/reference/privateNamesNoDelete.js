//// [privateNamesNoDelete.ts]
class A {
    #v = 1;
    constructor() {
        delete this.#v; // Error: The operand of a delete operator cannot be a private name.
    }
}


//// [privateNamesNoDelete.js]
var A = /** @class */ (function () {
    function A() {
        this.#v = 1;
        delete this.#v; // Error: The operand of a delete operator cannot be a private name.
    }
    return A;
}());

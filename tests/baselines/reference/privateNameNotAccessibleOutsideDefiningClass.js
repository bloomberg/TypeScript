//// [privateNameNotAccessibleOutsideDefiningClass.ts]
class A {
    #foo: number = 3;
}

new A().#foo = 4;               // Error


//// [privateNameNotAccessibleOutsideDefiningClass.js]
var A = /** @class */ (function () {
    function A() {
        this.#foo = 3;
    }
    return A;
}());
new A().#foo = 4; // Error

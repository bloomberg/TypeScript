//// [privateNamesUnique.ts]
class A {
    #foo: number;
}

class B {
    #foo: number;
}

const b: A = new B()      // Error: Property #foo is missing


//// [privateNamesUnique.js]
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
var B = /** @class */ (function () {
    function B() {
    }
    return B;
}());
var b = new B(); // Error: Property #foo is missing

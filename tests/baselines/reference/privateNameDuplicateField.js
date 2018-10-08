//// [privateNameDuplicateField.ts]
class A {
    #foo;
    #foo;
}


//// [privateNameDuplicateField.js]
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());

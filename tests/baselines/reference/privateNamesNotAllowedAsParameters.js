//// [privateNamesNotAllowedAsParameters.ts]
class A {
    setFoo(#foo: string) {}
}


//// [privateNamesNotAllowedAsParameters.js]
var A = /** @class */ (function () {
    function A() {
    }
    A.prototype.setFoo = function () { };
    return A;
}());
{ }

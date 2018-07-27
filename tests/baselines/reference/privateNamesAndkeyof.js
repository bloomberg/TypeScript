//// [privateNamesAndkeyof.ts]
class A {
    #foo;
    bar;
    baz;
}

type T = keyof A     // should not include '#foo'


//// [privateNamesAndkeyof.js]
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());

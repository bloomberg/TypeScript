//// [privateNamesNoAccessibilityModifiers.ts]
class A {
    public #foo;         // Error
    private #bar;        // Error
    protected #baz;      // Error
    readonly #qux;       // OK
}


//// [privateNamesNoAccessibilityModifiers.js]
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());

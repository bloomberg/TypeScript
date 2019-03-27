//// [privateNameDeclaration.ts]
class A {
    #name: string;
}


//// [privateNameDeclaration.js]
var _name;
var A = /** @class */ (function () {
    function A() {
        _name.set(this, void 0);
    }
    return A;
}());
_name = new WeakMap();

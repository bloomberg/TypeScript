//// [classConstructorParametersCommentPlacement.ts]
// some comment
class A {
    #a = "private hello";
    #b = "another private name";
    a = "public property";
    constructor(private b = "something") { }
}


//// [classConstructorParametersCommentPlacement.js]
var _classPrivateFieldSet = function (receiver, privateMap, value) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to set private field on non-instance"); } privateMap.set(receiver, value); return value; };
var _a, _b;
// some comment
var A = /** @class */ (function () {
    function A(b) {
        if (b === void 0) { b = "something"; }
        _a.set(this, void 0);
        _b.set(this, void 0);
        this.b = b;
        _classPrivateFieldSet(this, _a, "private hello");
        _classPrivateFieldSet(this, _b, "another private name");
        this.a = "public property";
    }
    return A;
}());
_a = new WeakMap(), _b = new WeakMap();

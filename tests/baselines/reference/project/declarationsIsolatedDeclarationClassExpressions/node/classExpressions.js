var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Var = /** @class */ (function () {
    function A() {
    }
    return A;
}());
// To check whether the class name 'Hiding' gets correctly recognized.
var Hiding = 42;
var ToBeHidden = /** @class */ (function () {
    function Hiding() {
    }
    return Hiding;
}());
var Template = /** @class */ (function () {
    function T() {
    }
    return T;
}());
// Should be a trivial-transform for anonymous class expressions.
var EmptyClassName = /** @class */ (function () {
    function class_1() {
    }
    return class_1;
}());
var B = /** @class */ (function () {
    function B() {
    }
    return B;
}());
var Heritage = /** @class */ (function (_super) {
    __extends(class_2, _super);
    function class_2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return class_2;
}(B));

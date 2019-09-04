//// [privateNamesConstructorChain-1.ts]
class Parent {
    #foo = 3;
    static #bar = 5;
    accessChildProps() {
        new Child().#foo; // OK (`#foo` was added when `Parent`'s constructor was called on `child`)
        Child.#bar;       // Error: not found
    }
}

class Child extends Parent {
    #foo = "foo";       // OK (Child's #foo does not conflict, as `Parent`'s `#foo` is not accessible)
    #bar = "bar";       // OK
}


//// [privateNamesConstructorChain-1.js]
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _foo, _bar;
var Parent = /** @class */ (function () {
    function Parent() {
        _foo_1.set(this, 3);
    }
    Parent.prototype.accessChildProps = function () {
        __classPrivateFieldGet(new Child(), _foo_1); // OK (`#foo` was added when `Parent`'s constructor was called on `child`)
        __classPrivateFieldGet(Child, _bar_1); // Error: not found
    };
    var _foo_1, _bar_1;
    _foo_1 = new WeakMap(), _bar_1 = new WeakMap();
    _bar_1.set(Parent, 5);
    return Parent;
}());
var Child = /** @class */ (function (_super) {
    __extends(Child, _super);
    function Child() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _foo.set(_this, "foo"); // OK (Child's #foo does not conflict, as `Parent`'s `#foo` is not accessible)
        _bar.set(_this, "bar"); // OK
        return _this;
    }
    return Child;
}(Parent));
_foo = new WeakMap(), _bar = new WeakMap();

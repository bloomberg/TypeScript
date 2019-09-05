//// [privateNameAndStaticInitializer.ts]
class A {
  #foo = 1;
  static inst = new A();
  #prop = 2;
}



//// [privateNameAndStaticInitializer.js]
var A = /** @class */ (function () {
    function A() {
        _foo.set(this, 1);
        _prop.set(this, 2);
    }
    var _foo, _prop;
    _foo = new WeakMap(), _prop = new WeakMap();
    A.inst = new A();
    return A;
}());

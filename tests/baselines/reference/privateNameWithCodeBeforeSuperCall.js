//// [privateNameWithCodeBeforeSuperCall.ts]
class A {}
class B extends A {
    #a;
    constructor() {
        void 0;
        super();
    }
}



//// [privateNameWithCodeBeforeSuperCall.js]
var _a;
class A {
}
class B extends A {
    constructor() {
        _a.set(this, void 0);
        void 0;
        super();
    }
}
_a = new WeakMap();

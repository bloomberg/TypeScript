//// [privateNameErrorsOnNotUseDefineForClassFieldsInEsNext.ts]
class TestWithErrors {
    #prop = 0 
    static dd = new TestWithErrors().#prop; // Err
    static ["X_ z_ zz"] = class Inner {
        #foo  = 10   
        m() {
            new TestWithErrors().#prop // Err
        }
        static C = class InnerInner {
            m() {
                new TestWithErrors().#prop // Err
                new Inner().#foo; // Err
            }
        }

        static M(){
            return class {
                m() {
                    new TestWithErrors().#prop // Err
                    new Inner().#foo; // OK
                }
            }
        } 
    }
}

class TestNoErrors {
    #prop = 0 
    dd = new TestNoErrors().#prop; // OK
    ["X_ z_ zz"] = class Inner {
        #foo  = 10   
        m() {
            new TestNoErrors().#prop // Ok
        }
        C = class InnerInner {
            m() {
                new TestNoErrors().#prop // Ok
                new Inner().#foo; // Ok
            }
        }
  
        static M(){
            return class {
                m() {
                    new TestNoErrors().#prop // OK
                    new Inner().#foo; // OK
                }
            }
        } 
    }
  }

//// [privateNameErrorsOnNotUseDefineForClassFieldsInEsNext.js]
"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _prop, _foo, _a, _prop_1;
class TestWithErrors {
    constructor() {
        _prop.set(this, 0);
    }
}
_prop = new WeakMap();
TestWithErrors.dd = __classPrivateFieldGet(new TestWithErrors(), _prop); // Err
TestWithErrors["X_ z_ zz"] = (_a = class Inner {
        constructor() {
            _foo.set(this, 10);
        }
        m() {
            __classPrivateFieldGet(new TestWithErrors(), _prop); // Err
        }
        static M() {
            return class {
                m() {
                    __classPrivateFieldGet(new TestWithErrors(), _prop); // Err
                    __classPrivateFieldGet(new Inner(), _foo); // OK
                }
            };
        }
    },
    _foo = new WeakMap(),
    _a.C = class InnerInner {
        m() {
            __classPrivateFieldGet(new TestWithErrors(), _prop); // Err
            __classPrivateFieldGet(new _a(), _foo); // Err
        }
    },
    _a);
class TestNoErrors {
    constructor() {
        var _foo_1, _a;
        _prop_1.set(this, 0);
        this.dd = __classPrivateFieldGet(new TestNoErrors(), _prop_1); // OK
        this["X_ z_ zz"] = (_a = class Inner {
                constructor() {
                    _foo_1.set(this, 10);
                    this.C = class InnerInner {
                        m() {
                            __classPrivateFieldGet(new TestNoErrors(), _prop_1); // Ok
                            __classPrivateFieldGet(new Inner(), _foo_1); // Ok
                        }
                    };
                }
                m() {
                    __classPrivateFieldGet(new TestNoErrors(), _prop_1); // Ok
                }
                static M() {
                    return class {
                        m() {
                            __classPrivateFieldGet(new TestNoErrors(), _prop_1); // OK
                            __classPrivateFieldGet(new Inner(), _foo_1); // OK
                        }
                    };
                }
            },
            _foo_1 = new WeakMap(),
            _a);
    }
}
_prop_1 = new WeakMap();

//// [privateNamesInNestedClasses.ts]
class A {
    #foo: number;
    #bar: number;
    method() {
        class B {
            #foo: string;
            methodNested(a: A) {
                a.#foo;  // error: shadowed
                a.#bar; //  OK
            }
        }
    }
}


//// [privateNamesInNestedClasses.js]
var A = /** @class */ (function () {
    function A() {
    }
    A.prototype.method = function () {
        var B = /** @class */ (function () {
            function B() {
            }
            B.prototype.methodNested = function (a) {
                a.#foo; // error: shadowed
                a.#bar; //  OK
            };
            return B;
        }());
    };
    return A;
}());

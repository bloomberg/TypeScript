//// [privateNamesInGenericClasses.ts]
class C<T> {
  #foo: T;
  bar(x: C<T>) { return x.#foo; }          // OK
  baz(x: C<number>) { return x.#foo; }     // OK
  quux(x: C<string>) { return x.#foo; }    // OK
}

declare let a: C<number>;
declare let b: C<string>;
a.#foo;                                   // OK
a = b;                                    // Error
b = a;                                    // Error


//// [privateNamesInGenericClasses.js]
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.bar = function (x) { return x.#foo; }; // OK
    C.prototype.baz = function (x) { return x.#foo; }; // OK
    C.prototype.quux = function (x) { return x.#foo; }; // OK
    return C;
}());
a.#foo; // OK
a = b; // Error
b = a; // Error

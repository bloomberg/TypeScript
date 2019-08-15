// @strict: true
// @target: es6

class A {
    #foo = true; 
    method(thing: any) {
        thing.#foo; // OK
        thing.#bar; // OK: we do not (yet) check that #foo is in an ancestor class (but we could)
    }
};

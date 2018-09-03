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

class A {
    #foo: number;
}

class B {
    #foo: number;
}

const b: A = new B()      // Error: Property #foo is missing

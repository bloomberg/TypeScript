
const Var = class A {  
    a: A;
}

// To check whether the class name 'Hiding' gets correctly recognized.
const Hiding = 42;

const ToBeHidden = class Hiding {
    a: Hiding;
}

const Template = class T<T> {
    // T is referring to the type parameter, so shouldn't be renamed.
    prop: T;
}

// Should be a trivial-transform for anonymous class expressions.
const EmptyClassName = class<T> {
    readonly b: number;
}

class B {}

const Heritage = class extends B {
    prop: B;
}

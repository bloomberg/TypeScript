class A {
    #foo;
    bar;
    baz;
}

type T = keyof A     // should not include '#foo'

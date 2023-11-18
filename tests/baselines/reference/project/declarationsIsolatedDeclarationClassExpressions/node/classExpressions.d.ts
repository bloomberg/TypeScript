declare class Var {
    a: Var;
}
declare const Hiding = 42;
declare class ToBeHidden {
    a: ToBeHidden;
}
declare class Template<T> {
    prop: T;
}
declare class EmptyClassName<T> {
    readonly b: number;
}
declare class B {
}
declare class Heritage extends B {
    prop: Heritage;
}

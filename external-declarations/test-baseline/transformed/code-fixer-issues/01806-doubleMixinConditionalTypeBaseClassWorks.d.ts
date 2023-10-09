// doubleMixinConditionalTypeBaseClassWorks.d.ts
type Constructor = new (...args: any[]) => {};
declare const Mixin1: <C extends Constructor>(Base: C) => {
    new (...args: any[]): {
        _fooPrivate: {};
    };
} & C;
type FooConstructor = typeof Mixin1 extends (a: Constructor) => infer Cls ? Cls : never;
declare const Mixin2: <C extends FooConstructor>(Base: C) => {
    new (...args: any[]): {
        _fooPrivate: {};
    };
} & C;
declare const CBase: (new (...args: any[]) => {
    _fooPrivate: {};
}) & (new (...args: any[]) => {
    _fooPrivate: {};
}) & ObjectConstructor;
declare class C extends CBase {
}

// ==================
// Original test file: tsc-tests/updated-tests/compiler/doubleMixinConditionalTypeBaseClassWorks.ts
// type Constructor = new (...args: any[]) => {};
// 
// const Mixin1 = <C extends Constructor>(Base: C): {
//     new(...args: any[]): {
//         _fooPrivate: {};
//     };
// } & C => class extends Base { private _fooPrivate: {}; }
// 
// type FooConstructor = typeof Mixin1 extends (a: Constructor) => infer Cls ? Cls : never;
// const Mixin2 = <C extends FooConstructor>(Base: C): {
//     new(...args: any[]): {
//         _fooPrivate: {};
//     };
// } & C => class extends Base {};
// 
// const CBase: (new (...args: any[]) => {
//     _fooPrivate: {};
// }) & (new (...args: any[]) => {
//     _fooPrivate: {};
// }) & ObjectConstructor = Mixin2(Mixin1(Object));
// class C extends CBase {}
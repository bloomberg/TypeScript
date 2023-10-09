// noUsedBeforeDefinedErrorInTypeContext.d.ts
interface IThing<T> {
    owner: T;
}
declare var foo: {
    one: IThing<typeof foo>;
};
declare let baz: {
    two: IThing<typeof bar>;
};
declare let bar: {
    three: IThing<typeof bar>;
};
declare const qwe: {
    four: IThing<typeof qwe>;
};

// ==================
// Original test file: tsc-tests/updated-tests/compiler/noUsedBeforeDefinedErrorInTypeContext.ts
// // @noEmit: true
// 
// // https://github.com/microsoft/TypeScript/issues/8775
// 
// interface IThing<T> {
//     owner: T;
// }
// 
// var foo = {
//     one: {} as IThing<typeof foo>,
// }
// 
// let baz = {
//     two: {} as IThing<typeof bar>,
// }
// 
// let bar = {
//     three: {} as IThing<typeof bar>,
// }
// 
// const qwe = {
//     four: {} as IThing<typeof qwe>,
// }
// 
// noUsedBeforeDefinedErrorInTypeContext.d.ts
interface IThing<T> {
    owner: T;
}
declare var foo: any;
declare let baz: {
    two: IThing<any>;
};
declare let bar: any;
declare const qwe: any;

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
// contextualReturnTypeOfIIFE2.d.ts
declare namespace app {
    function foo(): void;
    namespace foo {
        var bar: {
            someFun: (arg: number) => void;
        };
    }
}

// ==================
// Original test file: tsc-tests/updated-tests/compiler/contextualReturnTypeOfIIFE2.ts
// // @lib: esnext
// // @noImplicitAny: true
// 
// declare namespace app {
//   function foo(): void;
// }
// 
// app.foo.bar = (function () {
//   const someFun = (arg: number) => {};
//   return { someFun };
// })();
// 
// app.foo.bar.someFun(1);
// 
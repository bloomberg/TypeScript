// computedPropertyNamesWithStaticProperty.d.ts
declare class C {
    static staticProp: number;
    get [C.staticProp](): string;
    set [C.staticProp](x: string);
    [C.staticProp](): void;
}

// ==================
// Original test file: tsc-tests/updated-tests/conformance/es6/computedProperties/computedPropertyNamesWithStaticProperty.ts
// // @target: es6
// class C {
//     static staticProp = 10;
//     get [C.staticProp](): string {
//         return "hello";
//     }
//     set [C.staticProp](x: string) {
//         var y = x;
//     }
//     [C.staticProp](): void { }
// }
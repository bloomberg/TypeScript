// computedPropertyNames2_ES6.d.ts
declare var methodName: string;
declare var accessorName: string;
declare class C {
}

// ==================
// Original test file: tsc-tests/updated-tests/conformance/es6/computedProperties/computedPropertyNames2_ES6.ts
// // @target: es6
// var methodName = "method";
// var accessorName = "accessor";
// class C {
//     [methodName](): void { }
//     static [methodName](): void { }
//     get [accessorName](): void { }
//     set [accessorName](v: any) { }
//     static get [accessorName](): void { }
//     static set [accessorName](v: any) { }
// }
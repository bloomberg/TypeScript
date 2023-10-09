// foo1.d.ts
declare const _default: "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function";
export = _default;

// foo2.d.ts
declare const _default: "sausages";
export = _default;

// foo3.d.ts
declare const _default: {
    new (): {};
};
export = _default;

// foo4.d.ts
declare const _default: true;
export = _default;

// foo5.d.ts
export = undefined;

// foo6.d.ts
declare const _default: any;
export = _default;

// foo7.d.ts
declare const _default: DateConstructor | StringConstructor;
export = _default;

// foo8.d.ts
declare const _default: any;
export = _default;

// ==================
// Original test file: tsc-tests/updated-tests/conformance/externalModules/exportAssignNonIdentifier.ts
// // @Filename: foo1.ts
// var x = 10;
// export = typeof x; // Ok
// 
// // @Filename: foo2.ts
// export = "sausages"; // Ok
// 
// // @Filename: foo3.ts
// export = class Foo3 {}; // Error, not an expression
// 
// // @Filename: foo4.ts
// export = true; // Ok
// 
// // @Filename: foo5.ts
// export = undefined; // Valid.  undefined is an identifier in JavaScript/TypeScript
// 
// // @Filename: foo6.ts
// export = void; // Error, void operator requires an argument
// 
// // @Filename: foo7.ts
// export = Date || String; // Ok
// 
// // @Filename: foo8.ts
// export = null; // Ok
// 
// 
// typeFromPropertyAssignment38.d.ts
declare function F(): void;
declare namespace F {
    var prop: number;
}
declare const f: {
    (): void;
    prop: number;
};

// ==================
// Original test file: tsc-tests/updated-tests/conformance/salsa/typeFromPropertyAssignment38.ts
// // @noEmit: true
// // @strict: true
// // @declaration: true
// 
// function F(): void {}
// F["prop"] = 3;
// 
// const f: {
//     (): void;
//     prop: number;
// } = function () {};
// f["prop"] = 3;
// 
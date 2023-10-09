// ES5For-ofTypeCheck10.d.ts
declare class StringIterator {
    next(): {
        done: boolean;
        value: string;
    };
    [Symbol.iterator](): this;
}

// ==================
// Original test file: tsc-tests/updated-tests/conformance/statements/for-ofStatements/ES5For-ofTypeCheck10.ts
// //@target: ES5
// 
// // In ES3/5, you cannot for...of over an arbitrary iterable.
// class StringIterator {
//     next(): {
//         done: boolean;
//         value: string;
//     } {
//         return {
//             done: true,
//             value: ""
//         };
//     }
//     [Symbol.iterator](): this {
//         return this;
//     }
// }
// 
// for (var v of new StringIterator) { }
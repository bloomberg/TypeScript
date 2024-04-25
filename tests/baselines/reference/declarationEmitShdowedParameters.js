//// [tests/cases/compiler/declarationEmitShdowedParameters.ts] ////

//// [declarationEmitShdowedParameters.ts]
const x = 1;
export const foo = (cb: (x: number) => typeof x): void => {
}

const y = 1;
export const foo2 = (cb: (y: number) => void) : typeof y => {
    return y;
}

//// [declarationEmitShdowedParameters.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foo2 = exports.foo = void 0;
var x = 1;
var foo = function (cb) {
};
exports.foo = foo;
var y = 1;
var foo2 = function (cb) {
    return y;
};
exports.foo2 = foo2;


//// [declarationEmitShdowedParameters.d.ts]
export declare const foo: (cb: (x: number) => typeof x) => void;
declare const y = 1;
export declare const foo2: (cb: (y: number) => void) => typeof y;
export {};

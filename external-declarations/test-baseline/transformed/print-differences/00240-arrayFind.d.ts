// arrayFind.d.ts
declare function isNumber(x: any): x is number;
declare const arrayOfStringsNumbersAndBooleans: (string | number | boolean)[];
declare const foundNumber: number | undefined;
declare const readonlyArrayOfStringsNumbersAndBooleans: ReadonlyArray<string | number | boolean>;
declare const readonlyFoundNumber: number | undefined;

// ==================
// Original test file: tsc-tests/updated-tests/compiler/arrayFind.ts
// // @lib: es2015
// 
// // test fix for #18112, type guard predicates should narrow returned element
// function isNumber(x: any): x is number {
//   return typeof x === "number";
// }
// 
// const arrayOfStringsNumbersAndBooleans: (string | number | boolean)[] = ["string", false, 0, "strung", 1, true];
// const foundNumber: number | undefined = arrayOfStringsNumbersAndBooleans.find(isNumber);
// 
// const readonlyArrayOfStringsNumbersAndBooleans = arrayOfStringsNumbersAndBooleans as ReadonlyArray<string | number | boolean>;
// const readonlyFoundNumber: number | undefined = readonlyArrayOfStringsNumbersAndBooleans.find(isNumber);
// 
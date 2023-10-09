// a.d.ts
interface BigIntIndex<E> {
    [index: bigint]: E;
}
declare const arr: number[];
declare let num: number;
declare let key: keyof any;
declare const bigNum: bigint;
declare const typedArray: Uint8Array;

// b.d.ts
declare const a: {};
declare const b: {};
declare const c: {};

// ==================
// Original test file: tsc-tests/updated-tests/compiler/bigintIndex.ts
// // @target: es2020
// 
// // @filename: a.ts
// interface BigIntIndex<E> {
//     [index: bigint]: E; // should error
// }
// 
// const arr: number[] = [1, 2, 3];
// let num: number = arr[1];
// num = arr["1"];
// num = arr[1n]; // should error
// 
// let key: keyof any; // should be type "string | number | symbol"
// key = 123;
// key = "abc";
// key = Symbol();
// key = 123n; // should error
// 
// // Show correct usage of bigint index: explicitly convert to string
// const bigNum: bigint = 0n;
// const typedArray: Uint8Array = new Uint8Array(3);
// typedArray[bigNum] = 0xAA; // should error
// typedArray[String(bigNum)] = 0xAA;
// typedArray["1"] = 0xBB;
// typedArray[2] = 0xCC;
// 
// // {1n: 123} is a syntax error; must go in separate file so BigIntIndex error is shown
// // @filename: b.ts
// // BigInt cannot be used as an object literal property
// const a = {1n: 123};
// const b = {[1n]: 456};
// const c: {} = {[bigNum]: 789};
// 
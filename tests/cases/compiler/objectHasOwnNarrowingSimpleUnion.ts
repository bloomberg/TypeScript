// @target: es2022

declare const abcd: { a: string, b: number } | { c: number, d: string };
if (Object.hasOwn(abcd, "a")) {
  abcd.b;
}

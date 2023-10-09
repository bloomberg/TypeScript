// mappedTypeInferenceAliasSubstitution.d.ts
declare const v: {
    test: {
        smth: number;
    };
};
type Field<A extends string, R> = {
    [K in A]: R;
};
declare const f: <A extends string, B extends string, R>(x: {
    [K in A]: Field<B, R>;
}) => R;
declare const r1: number;
declare const g: <A extends string, B extends string, R>(x: Field<A, Field<B, R>>) => R;
declare const r2: number;

// ==================
// Original test file: tsc-tests/updated-tests/compiler/mappedTypeInferenceAliasSubstitution.ts
// // @strict: true
// // @noEmit: true
// 
// // repro from #31616
// 
// const v = { test: { smth: 5 } };
// 
// type Field<A extends string, R> = { [K in A]: R }
// 
// const f = <A extends string, B extends string, R>(x: { [K in A]: Field<B, R> }): R => ({} as any);
// const r1: number = f(v);
// 
// const g = <A extends string, B extends string, R>(x: Field<A, Field<B, R>>): R => ({} as any);
// const r2: number = g(v);
// 
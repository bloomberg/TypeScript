// internal.d.ts
export declare function usePrivateType<T extends unknown[]>(...args: T): PrivateMapped<T[any]>;
type PrivateMapped<Obj> = {
    [K in keyof Obj]: Obj[K];
};
export {};

// api.d.ts
export declare const mappedUnionWithPrivateType: <T extends unknown[]>(...args: T) => T[any] extends infer T_1 ? {
    [K in keyof T_1]: T[any][K];
} : never;

// ==================
// Original test file: tsc-tests/updated-tests/compiler/mappedTypeGenericInstantiationPreservesHomomorphism.ts
// // @declaration: true
// // @filename: internal.ts
// export declare function usePrivateType<T extends unknown[]>(...args: T): PrivateMapped<T[any]>;
// 
// type PrivateMapped<Obj> = {[K in keyof Obj]: Obj[K]};
// 
// // @filename: api.ts
// import {usePrivateType} from './internal';
// export const mappedUnionWithPrivateType = <T extends unknown[]>(...args: T): T[any] extends infer T_1 ? { [K in keyof T_1]: T[any][K]; } : never => usePrivateType(...args);
// 
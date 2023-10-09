// other.d.ts
type Experiment<Name> = {
    name: Name;
};
declare const __default: Experiment<"foo">;
export default __default;

// main.d.ts
export declare const obj: {
    foo: number;
};

// ==================
// Original test file: tsc-tests/updated-tests/compiler/declarationEmitWithDefaultAsComputedName.ts
// // @declaration: true
// // @target: es5
// 
// // @filename: other.ts
// type Experiment<Name> = {
//     name: Name;
// };
// declare const createExperiment: <Name extends string>(
//     options: Experiment<Name>
// ) => Experiment<Name>;
// const __default: Experiment<"foo"> = createExperiment({
//     name: "foo"
// });
// export default __default;
// 
// // @filename: main.ts
// import other from "./other";
// export const obj = {
//     [other.name]: 1,
// };
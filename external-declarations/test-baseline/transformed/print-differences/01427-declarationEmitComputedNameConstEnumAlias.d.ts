// EnumExample.d.ts
declare enum EnumExample {
    TEST = "TEST"
}
export default EnumExample;

// index.d.ts
import EnumExample from './EnumExample';
declare const _default: {
    [EnumExample.TEST]: {};
};
export default _default;

// ==================
// Original test file: tsc-tests/updated-tests/compiler/declarationEmitComputedNameConstEnumAlias.ts
// // @declaration: true
// // @filename: EnumExample.ts
// enum EnumExample {
//     TEST = 'TEST',
// }
// 
// export default EnumExample;
// 
// // @filename: index.ts
// import EnumExample from './EnumExample';
// 
// export default {
//     [EnumExample.TEST]: {},
// };
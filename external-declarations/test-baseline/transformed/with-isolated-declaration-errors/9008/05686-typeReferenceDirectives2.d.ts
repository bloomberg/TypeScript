// /app.d.ts
interface A {
    x: $;
}

// ==================
// Original test file: tsc-tests/updated-tests/compiler/typeReferenceDirectives2.ts
// // @noImplicitReferences: true
// // @traceResolution: true
// // @declaration: true
// // @typeRoots: /types
// // @types: lib
// // @currentDirectory: /
// 
// // @filename: /types/lib/index.d.ts
// interface $ { x }
// 
// // @filename: /app.ts
// interface A {
//     x: $
// }
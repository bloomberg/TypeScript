// MemberFunctionDeclaration3_es6.d.ts
declare class C {
    [foo](): Generator<never, void, unknown>;
}

// ==================
// Original test file: tsc-tests/updated-tests/conformance/es6/memberFunctionDeclarations/MemberFunctionDeclaration3_es6.ts
// // @target: es6
// class C {
//    *[foo](): Generator<never, void, unknown> { }
// }
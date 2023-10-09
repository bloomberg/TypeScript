// objectLiteralMemberWithQuestionMark1.d.ts
declare var v: {
    foo?(): void;
};

// ==================
// Original test file: tsc-tests/updated-tests/compiler/objectLiteralMemberWithQuestionMark1.ts
// var v = { foo?(): void { } }
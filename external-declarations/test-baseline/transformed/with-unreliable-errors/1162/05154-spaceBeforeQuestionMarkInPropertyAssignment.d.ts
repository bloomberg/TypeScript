// spaceBeforeQuestionMarkInPropertyAssignment.d.ts
declare var x: {
    x: number;
};

// ==================
// Original test file: tsc-tests/updated-tests/compiler/spaceBeforeQuestionMarkInPropertyAssignment.ts
// var x = {x ?: 1} // should not crash
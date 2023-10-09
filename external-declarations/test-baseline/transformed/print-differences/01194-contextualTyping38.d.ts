// contextualTyping38.d.ts
declare var foo: {
    (): number;
};

// ==================
// Original test file: tsc-tests/updated-tests/compiler/contextualTyping38.ts
// var foo = <{ (): number; }> function(a) { return a };
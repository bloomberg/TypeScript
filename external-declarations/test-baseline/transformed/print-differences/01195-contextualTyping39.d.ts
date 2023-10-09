// contextualTyping39.d.ts
declare var foo: () => number;

// ==================
// Original test file: tsc-tests/updated-tests/compiler/contextualTyping39.ts
// var foo = <{ (): number; }> function() { return "err"; };
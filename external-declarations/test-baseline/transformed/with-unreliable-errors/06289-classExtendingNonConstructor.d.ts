// classExtendingNonConstructor.d.ts
declare var x: {};
declare function foo(): void;
declare class C1 extends undefined {
}
declare class C2 extends invalid {
}
declare class C3 extends invalid {
}
declare class C4 extends invalid {
}
declare class C5 extends invalid {
}
declare class C6 extends x {
}
declare class C7 extends foo {
}

// ==================
// Original test file: tsc-tests/updated-tests/conformance/classes/classDeclarations/classExtendingNonConstructor.ts
// var x: {};
// 
// function foo(): void {
//     this.x = 1;
// }
// 
// class C1 extends undefined { }
// class C2 extends true { }
// class C3 extends false { }
// class C4 extends 42 { }
// class C5 extends "hello" { }
// class C6 extends x { }
// class C7 extends foo { }
// 
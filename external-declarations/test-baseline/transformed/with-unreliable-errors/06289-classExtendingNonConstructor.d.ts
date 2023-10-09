// classExtendingNonConstructor.d.ts
declare var x: {};
declare function foo(): void;
declare class C1 extends undefined {
}
declare const C2_base: true;
declare class C2 extends C2_base {
}
declare const C3_base: false;
declare class C3 extends C3_base {
}
declare const C4_base: 42;
declare class C4 extends C4_base {
}
declare const C5_base: "hello";
declare class C5 extends C5_base {
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
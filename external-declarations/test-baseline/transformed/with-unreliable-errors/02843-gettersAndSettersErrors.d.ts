// gettersAndSettersErrors.d.ts
declare class C {
    get Foo(): string;
    set Foo(foo: string);
    Foo: string;
    get Goo(): string;
    set Goo(v: string): string;
}
declare class E {
    private get Baz();
    set Baz(n: number);
}

// ==================
// Original test file: tsc-tests/updated-tests/compiler/gettersAndSettersErrors.ts
// class C {
//     public get Foo(): string { return "foo";} // ok
//     public set Foo(foo:string) {} // ok
// 
//     public Foo = 0; // error - duplicate identifier Foo - confirmed
//     public get Goo(v:string):string {return null;} // error - getters must not have a parameter
//     public set Goo(v:string):string {} // error - setters must not specify a return type
// }
// 
// class E {
//     private get Baz():number { return 0; }
//     public set Baz(n:number) {} // error - accessors do not agree in visibility
// }
// 
// 
// 
// thisInConstructorParameter2.d.ts
declare class P {
    z: this;
    x: this;
    static y: typeof P;
    constructor(z?: this, zz?: this, zzz?: (p?: this) => this);
    foo(zz?: this): void;
    static bar(zz?: typeof P): void;
}

// ==================
// Original test file: tsc-tests/updated-tests/compiler/thisInConstructorParameter2.ts
// class P {
//     x: this = this;
//     static y: typeof P = this;
// 
//     constructor(public z: this = this, zz: this = this, zzz = (p: this = this): this => this) {
//         zzz = (p = this) => this;
//     }
// 
//     foo(zz: this = this): void { zz.x; }
//     static bar(zz: typeof P = this): void { zz.y; }
// }
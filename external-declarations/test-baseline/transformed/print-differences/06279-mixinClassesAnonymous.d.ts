// mixinClassesAnonymous.d.ts
type Constructor<T> = new (...args: any[]) => T;
declare class Base {
    x: number;
    y: number;
    constructor(x: number, y: number);
}
declare class Derived extends Base {
    z: number;
    constructor(x: number, y: number, z: number);
}
declare const Printable: <T extends Constructor<Base>>(superClass: T) => {
    new (...args: any[]): {
        print(): void;
        x: number;
        y: number;
    };
    message: string;
} & T;
declare function Tagged<T extends Constructor<{}>>(superClass: T): {
    new (...args: any[]): {
        _tag: string;
    };
} & T;
declare const Thing1: (new (...args: any[]) => {
    _tag: string;
}) & typeof Derived;
declare const Thing2: (new (...args: any[]) => {
    _tag: string;
}) & {
    new (...args: any[]): {
        print(): void;
        x: number;
        y: number;
    };
    message: string;
} & typeof Derived;
declare function f1(): void;
declare function f2(): void;
declare class Thing3 extends Thing2 {
    constructor(tag: string);
    test(): void;
}
declare const Timestamped: <CT extends Constructor<object>>(Base: CT) => (new (...args: any[]) => {
    timestamp: Date;
}) & CT;

// ==================
// Original test file: tsc-tests/updated-tests/conformance/classes/mixinClassesAnonymous.ts
// type Constructor<T> = new(...args: any[]) => T;
// 
// class Base {
//     constructor(public x: number, public y: number) {}
// }
// 
// class Derived extends Base {
//     constructor(x: number, y: number, public z: number) {
//         super(x, y);
//     }
// }
// 
// const Printable = <T extends Constructor<Base>>(superClass: T): {
//     new(...args: any[]): {
//         print(): void;
//         x: number;
//         y: number;
//     };
//     message: string;
// } & T => class extends superClass {
//     static message = "hello";
//     print() {
//         const output = this.x + "," + this.y;
//     }
// }
// 
// function Tagged<T extends Constructor<{}>>(superClass: T): {
//     new(...args: any[]): {
//         _tag: string;
//     };
// } & T {
//     class C extends superClass {
//         _tag: string;
//         constructor(...args: any[]) {
//             super(...args);
//             this._tag = "hello";
//         }
//     }
//     return C;
// }
// 
// const Thing1: (new (...args: any[]) => {
//     _tag: string;
// }) & typeof Derived = Tagged(Derived);
// const Thing2: (new (...args: any[]) => {
//     _tag: string;
// }) & {
//     new(...args: any[]): {
//         print(): void;
//         x: number;
//         y: number;
//     };
//     message: string;
// } & typeof Derived = Tagged(Printable(Derived));
// Thing2.message;
// 
// function f1(): void {
//     const thing = new Thing1(1, 2, 3);
//     thing.x;
//     thing._tag;
// }
// 
// function f2(): void {
//     const thing = new Thing2(1, 2, 3);
//     thing.x;
//     thing._tag;
//     thing.print();
// }
// 
// class Thing3 extends Thing2 {
//     constructor(tag: string) {
//         super(10, 20, 30);
//         this._tag = tag;
//     }
//     test(): void {
//         this.print();
//     }
// }
// 
// // Repro from #13805
// 
// const Timestamped = <CT extends Constructor<object>>(Base: CT): {
//     new(...args: any[]): {
//         timestamp: Date;
//     };
// } & CT => {
//     return class extends Base {
//         timestamp = new Date();
//     };
// }
// 
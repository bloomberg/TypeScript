// noCrashOnMixin.d.ts
declare class Abstract {
    protected constructor();
}
declare class Concrete extends Abstract {
}
type Constructor<T = {}> = new (...args: any[]) => T;
declare function Mixin<TBase extends Constructor>(Base: TBase): {
    new (...args: any[]): {};
} & TBase;
declare class Empty {
}
declare const CrashTriggerBase: (new (...args: any[]) => {}) & typeof Empty;
declare class CrashTrigger extends CrashTriggerBase {
    trigger(): void;
}

// ==================
// Original test file: tsc-tests/updated-tests/compiler/noCrashOnMixin.ts
// class Abstract {
//     protected constructor() {
//     }
// }
// 
// class Concrete extends Abstract {
// }
// 
// type Constructor<T = {}> = new (...args: any[]) => T;
// 
// function Mixin<TBase extends Constructor>(Base: TBase): {
//     new(...args: any[]): {};
// } & TBase {
//     return class extends Base {
//     };
// }
// 
// class Empty {
// }
// 
// const CrashTriggerBase: (new (...args: any[]) => {}) & typeof Empty = Mixin(Empty);
// class CrashTrigger extends CrashTriggerBase {
//     public trigger(): void {
//         new Concrete();
//     }
// }
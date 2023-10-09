// parseTypes.d.ts
declare var x: () => number;
declare var y: () => number;
declare var z: new () => number;
declare var w: {
    [x: number]: number;
};
declare function f(): number;
declare function g(s: string): void;

// ==================
// Original test file: tsc-tests/updated-tests/compiler/parseTypes.ts
// 
// var x = <() => number>null;
// var y = <{(): number; }>null;
// var z = <{new(): number; }>null
// var w = <{[x:number]: number; }>null
// function f(): number { return 3 };
// function g(s: string): void { true };
// y=f;
// y=g;
// x=g;
// w=g;
// z=g;
// 
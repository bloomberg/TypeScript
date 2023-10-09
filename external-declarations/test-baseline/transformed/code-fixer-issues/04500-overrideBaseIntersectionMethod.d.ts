// overrideBaseIntersectionMethod.d.ts
type Constructor<T> = new (...args: any[]) => T;
declare const WithLocation: <T extends Constructor<Point>>(Base: T) => {
    new (...args: any[]): {
        getLocation(): [number, number];
        x: number;
        y: number;
    };
} & T;
declare class Point {
    x: number;
    y: number;
    constructor(x: number, y: number);
    getLocation(): [number, number];
}
declare const FooBase: (new (...args: any[]) => {
    getLocation(): [number, number];
    x: number;
    y: number;
}) & typeof Point;
declare class Foo extends FooBase {
    calculate(): number;
    getLocation(): [
        number,
        number
    ];
    whereAmI(): [
        number,
        number
    ];
}

// ==================
// Original test file: tsc-tests/updated-tests/compiler/overrideBaseIntersectionMethod.ts
// // @strict: true
// 
// // Repro from #14615
// 
// type Constructor<T> = new (...args: any[]) => T;
// 
// const WithLocation = <T extends Constructor<Point>>(Base: T): {
//     new(...args: any[]): {
//         getLocation(): [number, number];
//         x: number;
//         y: number;
//     };
// } & T => class extends Base {
//   getLocation(): [number, number] {
//     const [x,y] = super.getLocation();
//     return [this.x | x, this.y | y];
//   }
// }
// 
// class Point {
//   constructor(public x: number, public y: number) { }
//   getLocation(): [number, number] {
//     return [0,0];
//   }
// }
// 
// const FooBase: (new (...args: any[]) => {
//     getLocation(): [number, number];
//     x: number;
//     y: number;
// }) & typeof Point = WithLocation(Point);
// class Foo extends FooBase {
//   calculate(): number {
//     return this.x + this.y;
//   }
//   getLocation(): [
//       number,
//       number
//   ] {
//     return super.getLocation()
//   }
//   whereAmI(): [
//       number,
//       number
//   ] {
//     return this.getLocation();
//   }
// }
// 
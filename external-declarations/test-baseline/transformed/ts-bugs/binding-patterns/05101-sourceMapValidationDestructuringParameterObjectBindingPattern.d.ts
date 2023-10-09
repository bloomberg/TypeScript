// sourceMapValidationDestructuringParameterObjectBindingPattern.d.ts
interface Robot {
    name: string;
    skill: string;
}
declare var console: {
    log(msg: string): void;
};
declare var hello: string;
declare var robotA: Robot;
declare function foo1({ name: nameA }: Robot): void;
declare function foo2({ name: nameB, skill }: Robot): void;
declare function foo3({ name }: Robot): void;

// ==================
// Original test file: tsc-tests/updated-tests/compiler/sourceMapValidationDestructuringParameterObjectBindingPattern.ts
// // @lib: es5
// // @sourcemap: true
// interface Robot {
//     name: string;
//     skill: string;
// }
// declare var console: {
//     log(msg: string): void;
// }
// var hello = "hello";
// var robotA: Robot = { name: "mower", skill: "mowing" };
// 
// function foo1({ name: nameA }: Robot): void {
//     console.log(nameA);
// }
// function foo2({ name: nameB, skill: skillB }: Robot): void {
//     console.log(nameB);
// }
// function foo3({ name }: Robot): void {
//     console.log(name);
// }
// 
// foo1(robotA);
// foo1({ name: "Edger", skill: "cutting edges" });
// 
// foo2(robotA);
// foo2({ name: "Edger", skill: "cutting edges" });
// 
// foo3(robotA);
// foo3({ name: "Edger", skill: "cutting edges" });
// 
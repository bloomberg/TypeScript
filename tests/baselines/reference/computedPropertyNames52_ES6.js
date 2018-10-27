//// [computedPropertyNames52_ES6.ts]
const classes = [];
for (let i = 0; i <= 10; ++i) {
    classes.push(
        class A {
            [i] = "my property";
        }
    );
}
for (const clazz of classes) {
    console.log(Object.getOwnPropertyNames(new clazz()));
}

//// [computedPropertyNames52_ES6.js]
const classes = [];
for (let i = 0; i <= 10; ++i) {
    let _a, _b;
    classes.push((_b = class A {
            constructor() {
                this[_a] = "my property";
            }
        },
        _a = i,
        _b));
}
for (const clazz of classes) {
    console.log(Object.getOwnPropertyNames(new clazz()));
}

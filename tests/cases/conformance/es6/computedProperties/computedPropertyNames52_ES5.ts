//@target: es5
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
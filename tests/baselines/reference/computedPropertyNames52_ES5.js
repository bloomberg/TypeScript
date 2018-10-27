//// [computedPropertyNames52_ES5.ts]
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

//// [computedPropertyNames52_ES5.js]
var classes = [];
var _loop_1 = function (i) {
    var _a = void 0, _b = void 0;
    classes.push((_b = /** @class */ (function () {
            function A() {
                this[_a] = "my property";
            }
            return A;
        }()),
        _a = i,
        _b));
};
for (var i = 0; i <= 10; ++i) {
    _loop_1(i);
}
for (var _i = 0, classes_1 = classes; _i < classes_1.length; _i++) {
    var clazz = classes_1[_i];
    console.log(Object.getOwnPropertyNames(new clazz()));
}

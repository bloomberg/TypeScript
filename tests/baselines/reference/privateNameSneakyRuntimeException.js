//// [privateNameSneakyRuntimeException.ts]
function createClass () {
    return class {
        #foo;
        equals(other) {
            return this.#foo = other.#foo;
        }
    };
}

const a = new (createClass())();
const b = new (createClass())();

console.log(a.equals(b));     // OK at compile time but will be a runtime error


//// [privateNameSneakyRuntimeException.js]
function createClass() {
    return /** @class */ (function () {
        function class_1() {
        }
        class_1.prototype.equals = function (other) {
            return this.#foo = other.#foo;
        };
        return class_1;
    }());
}
var a = new (createClass())();
var b = new (createClass())();
console.log(a.equals(b)); // OK at compile time but will be a runtime error

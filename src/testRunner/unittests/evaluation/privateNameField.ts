describe("unittests:: evaluation:: privateNameField", () => {
    it("should be accessible (es2019)", async () => {
        const result = evaluator.evaluateTypeScript(`
        export class A {
            #field = 5;
            getPrivateField() {
                return this.#field;
            }
        }
        export const output: any[] = [];
        export function main() {
            let a = new A();
            output.push(a.getPrivateField());
        }`, { target: ts.ScriptTarget.ES2019 });
        result.main();
        assert.deepEqual(result.output[0], 5);
    });

    it("scope is correct (es2019)", async () => {
        const result = evaluator.evaluateTypeScript(`
        export class A {
            #fieldFunc = function() { output.push(this); };
            runPrivateFieldFunc() {
                this.#fieldFunc();
            }
        }
        export const output: any[] = [];
        export const instance_a: A = new A();
        export function main() {
            instance_a.runPrivateFieldFunc();
        }`, { target: ts.ScriptTarget.ES2019 });
        result.main();
        assert.deepEqual(result.instance_a, result.output[0]);
    });

    it("inherited class shadows private field (es2019)", async () => {
        const result = evaluator.evaluateTypeScript(`
        export class A {
            #field = 9;
        }
        export class B extends A {
            #field = 2;
            runFunc() {
                output.push(this.#field);
            }
        }
        export const output: any[] = [];
        export function main() {
            let b = new B();
            b.runFunc();
        }`, { target: ts.ScriptTarget.ES2019 });
        result.main();
        assert.deepEqual(result.output[0], 2);
    });
});

describe("unittests:: evaluation:: privateNameFieldCallFunction", () => {
    it("call directly (es2019)", async () => {
        const result = evaluator.evaluateTypeScript(`
        export class A {
            #fieldFunc = function() { this.x = 10; };
            x = 1;
            runPrivateFieldFunc() {
                this.#fieldFunc();
            }
        }
        export const output: any[] = [];
        export function main() {
            let a = new A();
            a.runPrivateFieldFunc();
            output.push(a.x);
        }`, { target: ts.ScriptTarget.ES2019 });
        result.main();
        assert.deepEqual(result.output[0], 10);
    });

    it("call via reference (es2019)", async () => {
        const result = evaluator.evaluateTypeScript(`
        export class A {
            #fieldFunc = function() { this.x = 10; };
            x = 1;
            runPrivateFieldFunc() {
                const f = this.#fieldFunc;
                f.call(this);
            }
        }
        export const output: any[] = [];
        export function main() {
            let a = new A();
            a.runPrivateFieldFunc();
            output.push(a.x);
        }`, { target: ts.ScriptTarget.ES2019 });
        result.main();
        assert.deepEqual(result.output[0], 10);
    });
});

describe("unittests:: evaluation:: privateNameFieldDestructuring", () => {
    it("should destructure object property into privatefield (es2019)", async () => {
        const result = evaluator.evaluateTypeScript(`
        export class A {
            #field = 1;
            testObject() {
                return { x: 10, y: 6 };
            }
            constructor() {
                let y: number;
                ({ x: this.#field, y } = this.testObject());
                output.push(this.#field);
            }
        }
        export const output: any[] = [];
        export function main() {
            let a = new A();
        }`, { target: ts.ScriptTarget.ES2019 });
        result.main();
        assert.deepEqual(result.output[0], 10);
    });

    it("should destructure array element into privatefield (es2019)", async () => {
        const result = evaluator.evaluateTypeScript(`
        export class A {
            #field = 1;
            testArray() {
                return [10, 11];
            }
            constructor() {
                let y: number;
                ([this.#field, y] = this.testArray());
                output.push(this.#field);
            }
        }
        export const output: any[] = [];
        export function main() {
            let a = new A();
        }`, { target: ts.ScriptTarget.ES2019 });
        result.main();
        assert.deepEqual(result.output[0], 10);
    });

    it("should destructure element from array object property into privatefield (es2019)", async () => {
        const result = evaluator.evaluateTypeScript(`
        export class A {
            #field = 1;
            testObject() {
                return { x: 5, y: [10] };
            }
            constructor() {
                let a: number;
                ({x: a, y: [this.#field]} = this.testObject());
                output.push(this.#field);
            }
        }
        export const output: any[] = [];
        export function main() {
            let a = new A();
        }`, { target: ts.ScriptTarget.ES2019 });
        result.main();
        assert.deepEqual(result.output[0], 10);
    });

    it("should destructure nested array element into privatefield (es2019)", async () => {
        const result = evaluator.evaluateTypeScript(`
        export class A {
            #field = 1;
            testArray() {
                return [5, [4]];
            }
            constructor() {
                let x: number;
                [x, [this.#field]] = this.testArray() as any;
                output.push(this.#field);
                [this.#field, [this.#field]] = [10, [2]];
                output.push(this.#field);
            }
        }
        export const output: any[] = [];
        export function main() {
            let a = new A();
        }`, { target: ts.ScriptTarget.ES2019 });
        result.main();
        assert.deepEqual(result.output[0], 4, "Failed to destructure from array returned by function call");
        assert.deepEqual(result.output[1], 2, "Failed to destructure from inline array");
    });

    it("should destructure default value into privatefield (es2019)", async () => {
        const result = evaluator.evaluateTypeScript(`
        export class A {
            #field = 1;
            testObject() : { x: number, y?: number} {
                return { x: 5 };
            }
            constructor() {
                let x: number;
                ({x, y: this.#field = 10} = this.testObject());
                output.push(this.#field);
                ({x, y: this.#field = 20} = { x: 9 });
                output.push(this.#field);
            }
        }
        export const output: any[] = [];
        export function main() {
            let a = new A();
        }`, { target: ts.ScriptTarget.ES2019 });
        result.main();
        assert.deepEqual(result.output[0], 10, "Failed to destructure from object returned by function call");
        assert.deepEqual(result.output[1], 20, "Failed to destructure from inline object");
    });

    it("should destructure default array value into privatefield (es2019)", async () => {
        const result = evaluator.evaluateTypeScript(`
        export class A {
            #field = 1;
            testArray() {
                return [];
            }
            constructor() {
                let x: number;
                [this.#field = 10] = this.testArray();
                output.push(this.#field);
            }
        }
        export const output: any[] = [];
        export function main() {
            let a = new A();
        }`, { target: ts.ScriptTarget.ES2019 });
        result.main();
        assert.deepEqual(result.output[0], 10);
    });
});

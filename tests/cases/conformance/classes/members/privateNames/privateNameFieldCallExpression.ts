class A {
    #fieldFunc = () => this.x = 10;
    x = 1;
    test() {
        this.#fieldFunc();
        const func = this.#fieldFunc;
        func();
    }
}

// @declaration: true
const x = 1;
export const foo = (cb: (x: number) => typeof x): void => {
}

const y = 1;
export const foo2 = (cb: (y: number) => void) : typeof y => {
    return y;
}
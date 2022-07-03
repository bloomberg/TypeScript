// @inferInstanceTypeArgumentsAsConstraint: true

class Unconstrained<T> {
    value: T;
}

declare const x: unknown;

if (x instanceof Unconstrained) {
    x.value.toUpperCase();
    x.value++;
    x.value();

    if (typeof x.value === "string") {
        x.value.toUpperCase();
    }
    if (typeof x.value === "number") {
        x.value++;
    }
}

class Constrained<T extends number> {
    value: T;
}

declare const y: unknown;

if (y instanceof Constrained) {
    y.value++;
}

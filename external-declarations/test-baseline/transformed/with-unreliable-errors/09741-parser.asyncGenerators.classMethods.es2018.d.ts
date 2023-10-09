// methodIsOk.d.ts
declare class C1 {
    f(): AsyncGenerator<never, void, unknown>;
}

// awaitMethodNameIsOk.d.ts
declare class C2 {
    await(): AsyncGenerator<never, void, unknown>;
}

// yieldMethodNameIsOk.d.ts
declare class C3 {
    yield(): AsyncGenerator<never, void, unknown>;
}

// awaitParameterIsError.d.ts
declare class C4 {
    f(await: any): AsyncGenerator<never, void, unknown>;
}

// yieldParameterIsError.d.ts
declare class C5 {
    f(yield: any): AsyncGenerator<never, void, unknown>;
}

// awaitInParameterInitializerIsError.d.ts
declare class C6 {
    f(a?: number): AsyncGenerator<never, void, unknown>;
}

// yieldInParameterInitializerIsError.d.ts
declare class C7 {
    f(a?: any): AsyncGenerator<never, void, unknown>;
}

// nestedAsyncGeneratorIsOk.d.ts
declare class C8 {
    f(): AsyncGenerator<never, void, unknown>;
}

// nestedFunctionDeclarationNamedYieldIsError.d.ts
declare class C9 {
    f(): AsyncGenerator<never, void, unknown>;
}

// nestedFunctionExpressionNamedYieldIsError.d.ts
declare class C10 {
    f(): AsyncGenerator<never, void, unknown>;
}

// nestedFunctionDeclarationNamedAwaitIsError.d.ts
declare class C11 {
    f(): AsyncGenerator<never, void, unknown>;
}

// nestedFunctionExpressionNamedAwaitIsError.d.ts
declare class C12 {
    f(): AsyncGenerator<never, void, unknown>;
}

// yieldIsOk.d.ts
declare class C13 {
    f(): AsyncGenerator<any, void, unknown>;
}

// yieldWithValueIsOk.d.ts
declare class C14 {
    f(): AsyncGenerator<number, void, unknown>;
}

// yieldStarMissingValueIsError.d.ts
declare class C15 {
    f(): AsyncGenerator<any, void, any>;
}

// yieldStarWithValueIsOk.d.ts
declare class C16 {
    f(): AsyncGenerator<any, void, undefined>;
}

// awaitWithValueIsOk.d.ts
declare class C17 {
    f(): AsyncGenerator<never, void, unknown>;
}

// awaitMissingValueIsError.d.ts
declare class C18 {
    f(): AsyncGenerator<never, void, unknown>;
}

// awaitAsTypeIsOk.d.ts
interface await {
}
declare class C19 {
    f(): AsyncGenerator<never, void, unknown>;
}

// yieldAsTypeIsStrictError.d.ts
interface yield {
}
declare class C20 {
    f(): AsyncGenerator<never, void, unknown>;
}

// yieldInClassComputedPropertyIsError.d.ts
declare class C21 {
    [yield](): AsyncGenerator<never, void, unknown>;
}

// yieldInNestedComputedPropertyIsOk.d.ts
declare class C22 {
    f(): AsyncGenerator<any, void, unknown>;
}

// asyncGeneratorGetAccessorIsError.d.ts
declare class C23 {
    get(): invalid;
    x(): number;
}

// asyncGeneratorSetAccessorIsError.d.ts
declare class C24 {
    set(): invalid;
    x(value: number): void;
}

// asyncGeneratorPropertyIsError.d.ts
declare class C25 {
    x(): invalid;
    1: any;
}

// ==================
// Original test file: tsc-tests/updated-tests/conformance/parser/ecmascript2018/asyncGenerators/parser.asyncGenerators.classMethods.es2018.ts
// // @target: es2018
// // @lib: esnext
// // @noEmit: true
// // @filename: methodIsOk.ts
// class C1 {
//     async * f(): AsyncGenerator<never, void, unknown> {
//     }
// }
// // @filename: awaitMethodNameIsOk.ts
// class C2 {
//     async * await(): AsyncGenerator<never, void, unknown> {
//     }
// }
// // @filename: yieldMethodNameIsOk.ts
// class C3 {
//     async * yield(): AsyncGenerator<never, void, unknown> {
//     }
// }
// // @filename: awaitParameterIsError.ts
// class C4 {
//     async * f(await: any): AsyncGenerator<never, void, unknown> {
//     }
// }
// // @filename: yieldParameterIsError.ts
// class C5 {
//     async * f(yield: any): AsyncGenerator<never, void, unknown> {
//     }
// }
// // @filename: awaitInParameterInitializerIsError.ts
// class C6 {
//     async * f(a: number = await 1): AsyncGenerator<never, void, unknown> {
//     }
// }
// // @filename: yieldInParameterInitializerIsError.ts
// class C7 {
//     async * f(a: any = yield): AsyncGenerator<never, void, unknown> {
//     }
// }
// // @filename: nestedAsyncGeneratorIsOk.ts
// class C8 {
//     async * f(): AsyncGenerator<never, void, unknown> {
//         async function * g() {
//         }
//     }
// }
// // @filename: nestedFunctionDeclarationNamedYieldIsError.ts
// class C9 {
//     async * f(): AsyncGenerator<never, void, unknown> {
//         function yield() {
//         }
//     }
// }
// // @filename: nestedFunctionExpressionNamedYieldIsError.ts
// class C10 {
//     async * f(): AsyncGenerator<never, void, unknown> {
//         const x = function yield() {
//         };
//     }
// }
// // @filename: nestedFunctionDeclarationNamedAwaitIsError.ts
// class C11 {
//     async * f(): AsyncGenerator<never, void, unknown> {
//         function await() {
//         }
//     }
// }
// // @filename: nestedFunctionExpressionNamedAwaitIsError.ts
// class C12 {
//     async * f(): AsyncGenerator<never, void, unknown> {
//         const x = function await() {
//         };
//     }
// }
// // @filename: yieldIsOk.ts
// class C13 {
//     async * f(): AsyncGenerator<any, void, unknown> {
//         yield;
//     }
// }
// // @filename: yieldWithValueIsOk.ts
// class C14 {
//     async * f(): AsyncGenerator<number, void, unknown> {
//         yield 1;
//     }
// }
// // @filename: yieldStarMissingValueIsError.ts
// class C15 {
//     async * f(): AsyncGenerator<any, void, any> {
//         yield *;
//     }
// }
// // @filename: yieldStarWithValueIsOk.ts
// class C16 {
//     async * f(): AsyncGenerator<any, void, undefined> {
//         yield * [];
//     }
// }
// // @filename: awaitWithValueIsOk.ts
// class C17 {
//     async * f(): AsyncGenerator<never, void, unknown> {
//         await 1;
//     }
// }
// // @filename: awaitMissingValueIsError.ts
// class C18 {
//     async * f(): AsyncGenerator<never, void, unknown> {
//         await;
//     }
// }
// // @filename: awaitAsTypeIsOk.ts
// interface await {}
// class C19 {
//     async * f(): AsyncGenerator<never, void, unknown> {
//         let x: await;
//     }
// }
// // @filename: yieldAsTypeIsStrictError.ts
// interface yield {}
// class C20 {
//     async * f(): AsyncGenerator<never, void, unknown> {
//         let x: yield;
//     }
// }
// // @filename: yieldInClassComputedPropertyIsError.ts
// class C21 {
//     async * [yield](): AsyncGenerator<never, void, unknown> {
//     }
// }
// // @filename: yieldInNestedComputedPropertyIsOk.ts
// class C22 {
//     async * f(): AsyncGenerator<any, void, unknown> {
//         const x = { [yield]: 1 };
//     }
// }
// // @filename: asyncGeneratorGetAccessorIsError.ts
// class C23 {
//     async * get x(): number {
//         return 1;
//     }
// }
// // @filename: asyncGeneratorSetAccessorIsError.ts
// class C24 {
//     async * set x(value: number): void {
//     }
// }
// // @filename: asyncGeneratorPropertyIsError.ts
// class C25 {
//     async * x = 1: any;
// }
// 
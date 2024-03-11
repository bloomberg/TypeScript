//// [tests/cases/compiler/hugeDeclarationOutputGetsTruncatedWithError.ts] ////

//// [hugeDeclarationOutputGetsTruncatedWithError.ts]
type props = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j" | "k" | "l" | "m" | "n" | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" | "y" | "z";

type manyprops = `${props}${props}`;

export const c = () => null as any as {[K in manyprops]: {[K2 in manyprops]: `${K}.${K2}`}};

/// [Declarations] ////


/// [Errors] ////

hugeDeclarationOutputGetsTruncatedWithError.ts(5,18): error TS9007: Function must have an explicit return type annotation with --isolatedDeclarations.


==== hugeDeclarationOutputGetsTruncatedWithError.ts (1 errors) ====
    type props = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j" | "k" | "l" | "m" | "n" | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" | "y" | "z";
    
    type manyprops = `${props}${props}`;
    
    export const c = () => null as any as {[K in manyprops]: {[K2 in manyprops]: `${K}.${K2}`}};
                     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
!!! error TS9007: Function must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9027 hugeDeclarationOutputGetsTruncatedWithError.ts:5:14: Add a type annotation to the variable c.
!!! related TS9030 hugeDeclarationOutputGetsTruncatedWithError.ts:5:18: Add a return type to the function expression.
// parserShorthandPropertyAssignment1.d.ts
declare function foo(obj: {
    name?: string;
    id: number;
}): void;
declare var name: any, id: any;

// ==================
// Original test file: tsc-tests/updated-tests/conformance/parser/ecmascript6/ShorthandPropertyAssignment/parserShorthandPropertyAssignment1.ts
// // @lib: es5
// function foo(obj: { name?: string; id: number }): void { }
// var name:any, id: any;
// foo({ name?, id? });
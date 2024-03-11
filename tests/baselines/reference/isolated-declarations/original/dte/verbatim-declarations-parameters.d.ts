//// [tests/cases/compiler/verbatim-declarations-parameters.ts] ////

//// [verbatim-declarations-parameters.ts]
type Map = {} & { [P in string]: any }
type MapOrUndefined = Map | undefined | "dummy"
export class Foo {
  constructor(
    // Type node is accurate, preserve
    public reuseTypeNode?: Map | undefined,
    public reuseTypeNode2?: Exclude<MapOrUndefined, "dummy">,
    // Resolve type node, requires adding | undefined
    public resolveType?: Map,
  ) { }
}

export function foo1(
    // Type node is accurate, preserve
    reuseTypeNode: Map | undefined = {},
    reuseTypeNode2: Exclude<MapOrUndefined, "dummy">  = {},
    // Resolve type node, requires adding | undefined
    resolveType: Map = {}, 
    requiredParam: number) {

}


/// [Declarations] ////



//// [verbatim-declarations-parameters.d.ts]
type Map = {} & {
    [P in string]: any;
};
type MapOrUndefined = Map | undefined | "dummy";
export declare class Foo {
    reuseTypeNode?: Map | undefined;
    reuseTypeNode2?: Exclude<MapOrUndefined, "dummy">;
    resolveType?: Map;
    constructor(reuseTypeNode?: Map | undefined, reuseTypeNode2?: Exclude<MapOrUndefined, "dummy">, resolveType?: Map);
}
export declare function foo1(reuseTypeNode: Map | undefined, reuseTypeNode2: Exclude<MapOrUndefined, "dummy">, resolveType: Map, requiredParam: number): invalid;
export {};

/// [Errors] ////

verbatim-declarations-parameters.ts(13,17): error TS9007: Function must have an explicit return type annotation with --isolatedDeclarations.


==== verbatim-declarations-parameters.ts (1 errors) ====
    type Map = {} & { [P in string]: any }
    type MapOrUndefined = Map | undefined | "dummy"
    export class Foo {
      constructor(
        // Type node is accurate, preserve
        public reuseTypeNode?: Map | undefined,
        public reuseTypeNode2?: Exclude<MapOrUndefined, "dummy">,
        // Resolve type node, requires adding | undefined
        public resolveType?: Map,
      ) { }
    }
    
    export function foo1(
                    ~~~~
!!! error TS9007: Function must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9031 verbatim-declarations-parameters.ts:13:17: Add a return type to the function declaration.
        // Type node is accurate, preserve
        reuseTypeNode: Map | undefined = {},
        reuseTypeNode2: Exclude<MapOrUndefined, "dummy">  = {},
        // Resolve type node, requires adding | undefined
        resolveType: Map = {}, 
        requiredParam: number) {
    
    }
    
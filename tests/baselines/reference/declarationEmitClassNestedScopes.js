//// [tests/cases/compiler/declarationEmitClassNestedScopes.ts] ////

//// [index.js]
const  cb = {
  o:  /** 
    @template T
    @param {string} name 
    @return {{name: T }}
  */ function (name) {
    return /** @type {any} */(null);
  }
};


//// [index2.ts]
const  cb2 = () => Math.random() ? null:  ({
  o: function <T>(name: string): { name: T } {
    return null!;
  }
});






//// [index.d.ts]
declare namespace cb {
    function o<T>(name: string): {
        name: T;
    };
}
//// [index2.d.ts]
declare const cb2: () => {
    o: <T>(name: string) => {
        name: T;
    };
} | null;

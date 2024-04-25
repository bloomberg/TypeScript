// @strict: true
// @checkJs: true
// @declaration: true
// @emitDeclarationOnly: true
// @filename: index.js
const  cb = {
  o:  /** 
    @template T
    @param {string} name 
    @return {{name: T }}
  */ function (name) {
    return /** @type {any} */(null);
  }
};


// @filename: index2.ts
const  cb2 = () => Math.random() ? null:  ({
  o: function <T>(name: string): { name: T } {
    return null!;
  }
});



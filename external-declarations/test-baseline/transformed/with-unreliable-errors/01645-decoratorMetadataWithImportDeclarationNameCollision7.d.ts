// db.d.ts
export default class db {
    doSomething(): void;
}

// service.d.ts
import db from './db';
declare class MyClass {
    db: db.db;
    constructor(db: db.db);
}
export { MyClass };

// ==================
// Original test file: tsc-tests/updated-tests/compiler/decoratorMetadataWithImportDeclarationNameCollision7.ts
// // @noemithelpers: true
// // @experimentaldecorators: true
// // @emitdecoratormetadata: true
// // @target: es5
// // @module: commonjs
// // @filename: db.ts
// export default class db {
//     public doSomething(): void {
//     }
// }
// 
// // @filename: service.ts
// import db from './db';
// function someDecorator(target) {
//     return target;
// }
// @someDecorator
// class MyClass {
//     db: db.db; //error
// 
//     constructor(db: db.db) { // error
//         this.db = db;
//         this.db.doSomething();
//     }
// }
// export {MyClass};
// 
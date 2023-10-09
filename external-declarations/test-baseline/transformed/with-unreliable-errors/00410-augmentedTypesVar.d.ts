// augmentedTypesVar.d.ts
declare var x1: number;
declare var x1: number;
declare var x2: number;
declare function x2(): void;
declare var x3: number;
declare var x3: () => void;
declare var x4: number;
declare class x4 {
}
declare var x4a: number;
declare class x4a {
    foo(): void;
}
declare var x5: number;
declare enum x5 {
    One = 0
}
declare var x6: number;
declare namespace x6 { }
declare var x6a: number;
declare namespace x6a { }
declare var x6b: number;
declare namespace x6b {
    var y: number;
}

// ==================
// Original test file: tsc-tests/updated-tests/compiler/augmentedTypesVar.ts
// // var then var
// var x1 = 1;
// var x1 = 2;
// 
// // var then function
// var x2 = 1; // error
// function x2(): void { } // error
// 
// var x3 = 1; 
// var x3 = (): void => { } // error
// 
// // var then class
// var x4 = 1; // error
// class x4 { } // error
// 
// var x4a = 1; // error
// class x4a { public foo(): void { } } // error
// 
// // var then enum
// var x5 = 1;
// enum x5 { One } // error
// 
// // var then module
// var x6 = 1;
// module x6 { } // ok since non-instantiated
// 
// var x6a = 1; // error
// module x6a { var y = 2; } // error since instantiated
// 
// var x6b = 1; // error
// module x6b { export var y = 2; } // error
// 
// // var then import, messes with other error reporting
// //var x7 = 1;
// //import x7 = require('');
// 
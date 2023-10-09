// paramterDestrcuturingDeclaration.d.ts
interface C {
    ({ p }: {
        p: any;
    }): any;
    new ({ p }: {
        p: any;
    }): any;
}

// ==================
// Original test file: tsc-tests/updated-tests/compiler/paramterDestrcuturingDeclaration.ts
// // @declaration: true
// 
// interface C {
//     ({p: name}: {
//             p: any;
//         }): any;
//     new ({p: boolean}: {
//             p: any;
//         }): any;
// }
// 
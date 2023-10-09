// objectTypeWithStringNamedPropertyOfIllegalCharacters.d.ts
declare class C {
    "   ": number;
    "a   b": string;
    "~!@#$%^&*()_+{}|:'<>?\/.,`": number;
    "a\a": number;
    static "a ": number;
}
declare var c: C;
declare var r: number;
declare var r2: any;
declare var r3: string;
declare var r4: number;
interface I {
    "   ": number;
    "a   b": string;
    "~!@#$%^&*()_+{}|:'<>?\/.,`": number;
}
declare var i: I;
declare var r: number;
declare var r2: any;
declare var r3: string;
declare var r4: number;
declare var a: {
    "   ": number;
    "a   b": string;
    "~!@#$%^&*()_+{}|:'<>?\/.,`": number;
};
declare var r: number;
declare var r2: any;
declare var r3: string;
declare var r4: number;
declare var b: {
    "   ": number;
    "a   b": string;
    "~!@#$%^&*()_+{}|:'<>?\/.,`": number;
};
declare var r: number;
declare var r2: any;
declare var r3: string;
declare var r4: number;

// ==================
// Original test file: tsc-tests/updated-tests/conformance/types/members/objectTypeWithStringNamedPropertyOfIllegalCharacters.ts
// class C {
//     "   ": number;
//     "a   b": string;
//     "~!@#$%^&*()_+{}|:'<>?\/.,`": number;
//     "a\a": number;
//     static "a ": number
// }
// 
// var c: C;
// var r: number = c["   "];
// var r2: any = c["    "];
// var r3: string = c["a   b"];
// // BUG 817263
// var r4: number = c["~!@#$%^&*()_+{}|:'<>?\/.,`"];
// 
// interface I {
//     "   ": number;
//     "a   b": string;
//     "~!@#$%^&*()_+{}|:'<>?\/.,`": number;
// }
// 
// var i: I;
// var r: number = i["   "];
// var r2: any = i["    "];
// var r3: string = i["a   b"];
// // BUG 817263
// var r4: number = i["~!@#$%^&*()_+{}|:'<>?\/.,`"];
// 
// 
// var a: {
//     "   ": number;
//     "a   b": string;
//     "~!@#$%^&*()_+{}|:'<>?\/.,`": number;
// }
// 
// var r: number = a["   "];
// var r2: any = a["    "];
// var r3: string = a["a   b"];
// // BUG 817263
// var r4: number = a["~!@#$%^&*()_+{}|:'<>?\/.,`"];
// 
// var b = {
//     "   ": 1,
//     "a   b": "",
//     "~!@#$%^&*()_+{}|:'<>?\/.,`": 1,
// }
// 
// var r: number = b["   "];
// var r2: any = b["    "];
// var r3: string = b["a   b"];
// // BUG 817263
// var r4: number = b["~!@#$%^&*()_+{}|:'<>?\/.,`"];
// 
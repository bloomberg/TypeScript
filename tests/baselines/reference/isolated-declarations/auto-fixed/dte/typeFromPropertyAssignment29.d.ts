//// [tests/cases/conformance/salsa/typeFromPropertyAssignment29.ts] ////

//// [typeFromPropertyAssignment29.ts]
function ExpandoDecl(n: number): string {
    return n.toString();
}
declare namespace ExpandoDecl {
    export var prop: number;
    export var m: (n: number) => number;
}
ExpandoDecl.prop = 2
ExpandoDecl.m = function(n: number) {
    return n + 1;
}
var n: number = ExpandoDecl.prop + ExpandoDecl.m(12) + ExpandoDecl(101).length

const ExpandoExpr: {
    (n: number): string;
    prop: {
        x: number;
        y?: undefined;
    } | {
        y: string;
        x?: undefined;
    };
    m(n: number): number;
} = function (n: number) {
    return n.toString();
}
ExpandoExpr.prop = { x: 2 }
ExpandoExpr.prop = { y: "" }
ExpandoExpr.m = function(n: number) {
    return n + 1;
}
var n = (ExpandoExpr.prop.x || 0) + ExpandoExpr.m(12) + ExpandoExpr(101).length

const ExpandoArrow: {
    (n: number): string;
    prop: number;
    m(n: number): number;
} = (n: number) => n.toString();
ExpandoArrow.prop = 2
ExpandoArrow.m = function(n: number) {
    return n + 1;

}

function ExpandoNested(n: number): {
    (m: number): number;
    total: number;
} {
    const nested = function (m: number) {
        return n + m;
    };
    nested.total = n + 1_000_000;
    return nested;
}
declare namespace ExpandoNested {
    export var also: number;
}
ExpandoNested.also = -1;

function ExpandoMerge(n: number): number {
    return n * 100;
}
declare namespace ExpandoMerge {
    export var p1: number;
}
ExpandoMerge.p1 = 111
namespace ExpandoMerge {
    export var p2 = 222;
}
namespace ExpandoMerge {
    export var p3 = 333;
}
var n = ExpandoMerge.p1 + ExpandoMerge.p2 + ExpandoMerge.p3 + ExpandoMerge(1);

namespace Ns {
    function ExpandoNamespace(): void {}
    declare namespace ExpandoNamespace {
        export var p6: number;
    }
    ExpandoNamespace.p6 = 42;
    export function foo(): typeof ExpandoNamespace {
        return ExpandoNamespace;
    }
}

// Should not work in Typescript -- must be const
var ExpandoExpr2 = function (n: number): string {
    return n.toString();
}
ExpandoExpr2.prop = 2
ExpandoExpr2.m = function(n: number) {
    return n + 1;
}
var n = ExpandoExpr2.prop + ExpandoExpr2.m(12) + ExpandoExpr2(101).length

// Should not work in typescript -- classes already have statics
class ExpandoClass {
    n = 1001;
}
ExpandoClass.prop = 2
ExpandoClass.m = function(n: number) {
    return n + 1;
}
var n = ExpandoClass.prop + ExpandoClass.m(12) + new ExpandoClass().n

// Class expressions shouldn't work in typescript either
var ExpandoExpr3 = class {
    n = 10001;
}
ExpandoExpr3.prop = 3
ExpandoExpr3.m = function(n: number) {
    return n + 1;
}
var n = ExpandoExpr3.prop + ExpandoExpr3.m(13) + new ExpandoExpr3().n



/// [Declarations] ////



//// [typeFromPropertyAssignment29.d.ts]
declare function ExpandoDecl(n: number): string;
declare namespace ExpandoDecl {
    var prop: number;
    var m: (n: number) => number;
}
declare var n: number;
declare const ExpandoExpr: {
    (n: number): string;
    prop: {
        x: number;
        y?: undefined;
    } | {
        y: string;
        x?: undefined;
    };
    m(n: number): number;
};
declare var n: number;
declare const ExpandoArrow: {
    (n: number): string;
    prop: number;
    m(n: number): number;
};
declare function ExpandoNested(n: number): {
    (m: number): number;
    total: number;
};
declare namespace ExpandoNested {
    var also: number;
}
declare function ExpandoMerge(n: number): number;
declare namespace ExpandoMerge {
    var p1: number;
}
declare namespace ExpandoMerge {
    var p2: number;
}
declare namespace ExpandoMerge {
    var p3: number;
}
declare var n: number;
declare namespace Ns {
    function ExpandoNamespace(): void;
    namespace ExpandoNamespace {
        var p6: number;
    }
    export function foo(): typeof ExpandoNamespace;
    export {};
}
declare var ExpandoExpr2: (n: number) => string;
declare var n: number;
declare class ExpandoClass {
    n: number;
}
declare var n: number;
declare var ExpandoExpr3: invalid;
declare var n: number;
//# sourceMappingURL=typeFromPropertyAssignment29.d.ts.map
/// [Errors] ////

typeFromPropertyAssignment29.ts(6,16): error TS2300: Duplicate identifier 'm'.
typeFromPropertyAssignment29.ts(9,13): error TS2300: Duplicate identifier 'm'.
typeFromPropertyAssignment29.ts(90,14): error TS2339: Property 'prop' does not exist on type '(n: number) => string'.
typeFromPropertyAssignment29.ts(91,14): error TS2339: Property 'm' does not exist on type '(n: number) => string'.
typeFromPropertyAssignment29.ts(94,22): error TS2339: Property 'prop' does not exist on type '(n: number) => string'.
typeFromPropertyAssignment29.ts(94,42): error TS2339: Property 'm' does not exist on type '(n: number) => string'.
typeFromPropertyAssignment29.ts(100,14): error TS2339: Property 'prop' does not exist on type 'typeof ExpandoClass'.
typeFromPropertyAssignment29.ts(101,14): error TS2339: Property 'm' does not exist on type 'typeof ExpandoClass'.
typeFromPropertyAssignment29.ts(104,22): error TS2339: Property 'prop' does not exist on type 'typeof ExpandoClass'.
typeFromPropertyAssignment29.ts(104,42): error TS2339: Property 'm' does not exist on type 'typeof ExpandoClass'.
typeFromPropertyAssignment29.ts(107,20): error TS9022: Inference from class expressions is not supported with --isolatedDeclarations.
typeFromPropertyAssignment29.ts(110,14): error TS2339: Property 'prop' does not exist on type 'typeof ExpandoExpr3'.
typeFromPropertyAssignment29.ts(111,14): error TS2339: Property 'm' does not exist on type 'typeof ExpandoExpr3'.
typeFromPropertyAssignment29.ts(114,22): error TS2339: Property 'prop' does not exist on type 'typeof ExpandoExpr3'.
typeFromPropertyAssignment29.ts(114,42): error TS2339: Property 'm' does not exist on type 'typeof ExpandoExpr3'.


==== typeFromPropertyAssignment29.ts (15 errors) ====
    function ExpandoDecl(n: number): string {
        return n.toString();
    }
    declare namespace ExpandoDecl {
        export var prop: number;
        export var m: (n: number) => number;
                   ~
!!! error TS2300: Duplicate identifier 'm'.
    }
    ExpandoDecl.prop = 2
    ExpandoDecl.m = function(n: number) {
                ~
!!! error TS2300: Duplicate identifier 'm'.
        return n + 1;
    }
    var n: number = ExpandoDecl.prop + ExpandoDecl.m(12) + ExpandoDecl(101).length
    
    const ExpandoExpr: {
        (n: number): string;
        prop: {
            x: number;
            y?: undefined;
        } | {
            y: string;
            x?: undefined;
        };
        m(n: number): number;
    } = function (n: number) {
        return n.toString();
    }
    ExpandoExpr.prop = { x: 2 }
    ExpandoExpr.prop = { y: "" }
    ExpandoExpr.m = function(n: number) {
        return n + 1;
    }
    var n = (ExpandoExpr.prop.x || 0) + ExpandoExpr.m(12) + ExpandoExpr(101).length
    
    const ExpandoArrow: {
        (n: number): string;
        prop: number;
        m(n: number): number;
    } = (n: number) => n.toString();
    ExpandoArrow.prop = 2
    ExpandoArrow.m = function(n: number) {
        return n + 1;
    
    }
    
    function ExpandoNested(n: number): {
        (m: number): number;
        total: number;
    } {
        const nested = function (m: number) {
            return n + m;
        };
        nested.total = n + 1_000_000;
        return nested;
    }
    declare namespace ExpandoNested {
        export var also: number;
    }
    ExpandoNested.also = -1;
    
    function ExpandoMerge(n: number): number {
        return n * 100;
    }
    declare namespace ExpandoMerge {
        export var p1: number;
    }
    ExpandoMerge.p1 = 111
    namespace ExpandoMerge {
        export var p2 = 222;
    }
    namespace ExpandoMerge {
        export var p3 = 333;
    }
    var n = ExpandoMerge.p1 + ExpandoMerge.p2 + ExpandoMerge.p3 + ExpandoMerge(1);
    
    namespace Ns {
        function ExpandoNamespace(): void {}
        declare namespace ExpandoNamespace {
            export var p6: number;
        }
        ExpandoNamespace.p6 = 42;
        export function foo(): typeof ExpandoNamespace {
            return ExpandoNamespace;
        }
    }
    
    // Should not work in Typescript -- must be const
    var ExpandoExpr2 = function (n: number): string {
        return n.toString();
    }
    ExpandoExpr2.prop = 2
                 ~~~~
!!! error TS2339: Property 'prop' does not exist on type '(n: number) => string'.
    ExpandoExpr2.m = function(n: number) {
                 ~
!!! error TS2339: Property 'm' does not exist on type '(n: number) => string'.
        return n + 1;
    }
    var n = ExpandoExpr2.prop + ExpandoExpr2.m(12) + ExpandoExpr2(101).length
                         ~~~~
!!! error TS2339: Property 'prop' does not exist on type '(n: number) => string'.
                                             ~
!!! error TS2339: Property 'm' does not exist on type '(n: number) => string'.
    
    // Should not work in typescript -- classes already have statics
    class ExpandoClass {
        n = 1001;
    }
    ExpandoClass.prop = 2
                 ~~~~
!!! error TS2339: Property 'prop' does not exist on type 'typeof ExpandoClass'.
    ExpandoClass.m = function(n: number) {
                 ~
!!! error TS2339: Property 'm' does not exist on type 'typeof ExpandoClass'.
        return n + 1;
    }
    var n = ExpandoClass.prop + ExpandoClass.m(12) + new ExpandoClass().n
                         ~~~~
!!! error TS2339: Property 'prop' does not exist on type 'typeof ExpandoClass'.
                                             ~
!!! error TS2339: Property 'm' does not exist on type 'typeof ExpandoClass'.
    
    // Class expressions shouldn't work in typescript either
    var ExpandoExpr3 = class {
                       ~~~~~
!!! error TS9022: Inference from class expressions is not supported with --isolatedDeclarations.
        n = 10001;
    }
    ExpandoExpr3.prop = 3
                 ~~~~
!!! error TS2339: Property 'prop' does not exist on type 'typeof ExpandoExpr3'.
    ExpandoExpr3.m = function(n: number) {
                 ~
!!! error TS2339: Property 'm' does not exist on type 'typeof ExpandoExpr3'.
        return n + 1;
    }
    var n = ExpandoExpr3.prop + ExpandoExpr3.m(13) + new ExpandoExpr3().n
                         ~~~~
!!! error TS2339: Property 'prop' does not exist on type 'typeof ExpandoExpr3'.
                                             ~
!!! error TS2339: Property 'm' does not exist on type 'typeof ExpandoExpr3'.
    
    
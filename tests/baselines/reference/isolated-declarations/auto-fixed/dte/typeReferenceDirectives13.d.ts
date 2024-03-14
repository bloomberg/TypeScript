//// [tests/cases/compiler/typeReferenceDirectives13.ts] ////

//// [app.ts]
/// <reference types="lib"/>
import {$} from "./ref";
export interface A {
    x: () => typeof $
}

//// [ref.d.ts]
export interface $ { x }

//// [index.d.ts]
declare let $: { x: number }


/// [Declarations] ////



//// [/app.d.ts]
import { $ } from "./ref";
export interface A {
    x: () => typeof $;
}
//# sourceMappingURL=app.d.ts.map
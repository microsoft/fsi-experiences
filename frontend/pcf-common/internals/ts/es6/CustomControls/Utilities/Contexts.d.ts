import * as React from "react";
import { LivePersonaCardInitializationState } from "../../CommonComponents/Primitive/LivePersonaCardHoverTarget";
interface IClientContext {
    lpcInitializationState: LivePersonaCardInitializationState;
    SkypeChannel: any;
}
export declare const ClientContext: React.Context<IClientContext>;
export {};

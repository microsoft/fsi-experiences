import * as React from "react";
import * as ReactFela from "react-fela";
import { IPropsBase } from "./ComponentBase";
import { IViewStyle } from "./IViewStyle";
interface ILivePersonaCardHoverTargetProps extends IPropsBase {
    displayName: string;
    emailAddress?: string;
    entityReference: any;
    id: string;
    personaType: string;
    onKeyDownContainerId: string;
    recordId: string;
    registerHasLivePersonaCardLoadedCallback?: (hasLivePersonaCardLoaded: () => boolean) => void;
    registerOpenCardCallback: (openCardCallback: () => void) => void;
    renderAsPresentational?: boolean;
    style: IViewStyle;
}
declare enum LivePersonaCardInitializationState {
    NotInitialized = "NotInitialized",
    Initializing = "Initializing",
    Initialized = "Initialized",
    Failed = "Failed"
}
declare const LivePersonaCardHoverTarget: React.ComponentType<Pick<any, string | number | symbol> & ReactFela.FelaWithStylesInjectedProps<Pick<any, string | number | symbol>, {
    rule: unknown;
}, any>>;
export { LivePersonaCardInitializationState, ILivePersonaCardHoverTargetProps, LivePersonaCardHoverTarget };

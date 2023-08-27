import * as React from "react";
import { IPropsBase } from "./ComponentBase";
import { IViewStyle } from "./IViewStyle";
import { CustomControlEntityReference } from "../../CustomControls/Models/CustomControlEntityReference";
declare enum PresenceIndicatorSize {
    Default = 0,
    Small = 1,
    Medium = 2,
    Large = 3
}
declare enum PresenceTarget {
    None = 0,
    Lookup = 1,
    Grid = 2
}
interface IPresenceIndicatorProps extends IPropsBase {
    entityReference?: CustomControlEntityReference;
    sipUrl?: string;
    displaySize: PresenceIndicatorSize;
    presenceTarget?: PresenceTarget;
    style?: IViewStyle;
    parentControlId: string;
}
declare class PresenceIndicator extends React.Component<IPresenceIndicatorProps, any> {
    static displayName: string;
    private _skypeChannelContext;
    private _presenceId;
    private _presenceInstance;
    private _renderPresence;
    private _addPresenceInformation;
    componentDidMount(): void;
    componentWillUnmount(): void;
    private _isSkypeChannelAvailable;
    private _isPropsAvailable;
    render(): JSX.Element;
}
export { PresenceIndicatorSize, PresenceTarget, IPresenceIndicatorProps, PresenceIndicator };

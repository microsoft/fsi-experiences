import * as React from "react";
import { IViewProps } from "../View";
import { IViewStyle } from "../IViewStyle";
import { IAccessibilityComponentWrapperProps } from "../../../CustomControls/Models/CustomControlExposedInterfaces";
declare enum PopupType {
    Root = 1,
    Nested = 2
}
interface IPopupProps extends IViewProps {
    name?: string;
    closeOnOutsideClick?: boolean;
    parent?: HTMLElement;
    popupStyle?: IViewStyle;
    shadowStyle?: IViewStyle;
    rootStyle?: IViewStyle;
    popupToOpen?: string;
    type?: PopupType;
    content?: HTMLElement;
    rootPopupId?: string;
    isDialogPopup?: boolean;
    onPopupForcedClosed?: () => void;
    rootBodyElement?: HTMLElement;
    createAccessibilityComponent?: (props: IAccessibilityComponentWrapperProps) => JSX.Element;
}
interface IPopupState {
    forceClose?: boolean;
}
declare class Popup extends React.Component<IPopupProps, IPopupState> {
    private _accessibilityComponent;
    private _rootElement;
    private _popupElement;
    private _managerSubscriber;
    constructor(props: IPopupProps);
    private _getId;
    private _getCurrentPopupToOpen;
    private _getNextPopupToOpen;
    private _getChildrenProps;
    private _getChildrenWithProps;
    private _isVisible;
    private _stopPropagation;
    private _forceClosePopup;
    private _applyRootNodeStyle;
    private _toggleRootElementVisibility;
    private _getStaticContent;
    private _createAccessibilityComponentIfNeeded;
    private _registerPopup;
    private _subscribeFlyoutPopupManager;
    componentWillMount(): void;
    componentDidMount(): void;
    componentWillReceiveProps(): void;
    componentWillUpdate(nextProps: IPopupProps, nextState: IPopupState): void;
    componentDidUpdate(prevProps: IPopupProps): void;
    componentWillUnmount(): void;
    private _adjustPixelValue;
    private _generatePopupStyle;
    render(): React.ReactElement<IPopupProps>;
}
export { PopupType, IPopupState, IPopupProps, Popup };

import * as React from "react";
import { IViewProps } from "../View";
interface IRootPopupProps extends IViewProps {
    parentCustomControlId?: string;
    customZIndex?: number;
    rootBodyElement?: HTMLElement;
    wrapElement?: (root: JSX.Element) => JSX.Element;
}
interface IRootPopupDisptachProps {
    openPopup?: (popupId: string) => Promise<any>;
    closePopup?: (popupId: string) => Promise<any>;
}
declare const ROOT_POPUP_ATTRIBUTE = "openedPopups";
declare type RootPopupProps = IRootPopupProps & IRootPopupDisptachProps;
declare class RootPopup extends React.Component<RootPopupProps, {}> {
    private _rootNode;
    private _rootBodyElement;
    private _style;
    private _seeMorePopupCount;
    constructor(props: RootPopupProps);
    private _getPopupId;
    private _initializeRootNode;
    private _getChildrenWithProps;
    private _renderToBody;
    componentWillReceiveProps(nextProps: IRootPopupProps): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): React.ReactElement<RootPopup>;
}
export { ROOT_POPUP_ATTRIBUTE, IRootPopupProps, IRootPopupDisptachProps, RootPopupProps, RootPopup };

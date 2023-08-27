import * as React from "react";
import { IPosition } from "./Flyout/IPosition";
import { ISize } from "./Flyout/ISize";
import { FlyoutDirection } from "./Flyout/FlyoutDirection";
import { FlyoutPositionType } from "./Flyout/FlyoutPositionType";
import { IFlyoutProps } from "./Flyout/IFlyoutProps";
import { IViewStyle } from "./IViewStyle";
import { InnerView } from "./View";
declare const FLYOUT_ROOT_NODE_ID = "__flyoutRootNode";
declare global {
    interface Window {
        MSStream: any;
    }
}
declare class Flyout extends React.Component<IFlyoutProps, {}> {
    static displayName: string;
    protected rootNode: HTMLDivElement;
    protected parentFlyoutNode: HTMLDivElement;
    private _scrollableAncestors;
    private _actualSize;
    private _flyoutElement;
    private _measuringSubscriber;
    private _managerSubscriber;
    private _lastDirection;
    get flyoutElement(): HTMLElement;
    private _isFlyoutShown;
    private _isOutOfRange;
    private _wasInnerFocusRequested;
    private _seeMorePopupCount;
    private _previousChildren;
    private _resizeHandler;
    private _scrollHandler;
    private _portal;
    constructor(props: IFlyoutProps);
    protected getFlyoutRootId(): string;
    componentDidMount(): void;
    static generateFlyoutId(parentCustomControlId: string, groupId: string): string;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    private _getRelativeElement;
    protected calculatePosition(): IViewStyle;
    private _updateActualSize;
    protected ensureRootNode(): void;
    protected debouncingFlyoutEvent(handler: () => void, delay?: number): () => void;
    protected handleMeasuring(width: number, height: number): void;
    protected getIsRelative(): string | true;
    protected getIsAbsolute(): true | IPosition;
    protected setFlyoutRef(view: InnerView): void;
    private _interceptClickEvent;
    protected updateDom(): void;
    protected focusInnerElement(preRenderRequired: boolean): void;
    protected removeFromDom(): void;
    protected resetFocus(): void;
    private _isClickInsideFlyout;
    protected handleOnScroll(event: MouseEvent): void;
    protected handlePointerDown(event: MouseEvent): void;
    protected handleWindowBlur(event: Event): void;
    render(): any;
    private _subscribeFlyoutPopupManager;
}
export { FlyoutPositionType, FlyoutDirection, IPosition, ISize, IFlyoutProps, Flyout, FLYOUT_ROOT_NODE_ID };

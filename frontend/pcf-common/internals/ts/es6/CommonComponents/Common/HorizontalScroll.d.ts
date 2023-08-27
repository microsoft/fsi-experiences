import * as React from "react";
import { IViewStyle } from "../Primitive/IViewStyle";
import { ComponentBase, IPropsBase } from "../Primitive/ComponentBase";
import { IButtonStyle } from "../Primitive/Button";
import { IScrollViewStyle } from "../Primitive/IScrollViewStyle";
import { IFlexboxContainerStyle } from "../Primitive/IFlexboxContainerStyle";
import { MicrosoftIconSymbol } from "../FontIcon/MicrosoftIconSymbol";
import * as ReactFela from "react-fela";
import { FelaProps } from "../Primitive/FelaConnectHelper";
interface IHorizontalScrollState {
    prevArrowDisabled?: boolean;
    nextArrowDisabled?: boolean;
}
declare type IHorizontalScrollStyle = IViewStyle;
interface IHorizontalScrollProps extends IPropsBase {
    style?: IHorizontalScrollStyle;
    startChildIndex?: number;
    arrowWidth?: number;
    arrowButtonStyle?: IButtonStyle;
    prevArrowIconType?: MicrosoftIconSymbol;
    nextArrowIconType?: MicrosoftIconSymbol;
    onPrevArrowClick?: (event: React.MouseEvent, index: number) => void;
    onNextArrowClick?: (event: React.MouseEvent, index: number) => void;
    onPrevArrowKeyDown?: (event: React.KeyboardEvent, index: number) => void;
    onNextArrowKeyDown?: (event: React.KeyboardEvent, index: number) => void;
    scrollViewStyle?: IScrollViewStyle & IFlexboxContainerStyle;
    semanticTag?: "div" | "ul";
    isRTL?: boolean;
    scrollRightAccessibilityLabel?: string;
    scrollLeftAccessibilityLabel?: string;
}
declare class InnerHorizontalScroll extends ComponentBase<IHorizontalScrollProps & FelaProps<IHorizontalScrollProps>, IHorizontalScrollState> {
    static displayName: string;
    static defaultProps: {
        scrollRightAccessibilityLabel: string;
        scrollLeftAccessibilityLabel: string;
    };
    private _userAgent;
    private _scrollView;
    private _currentChildIndex;
    constructor(props: IHorizontalScrollProps & FelaProps<IHorizontalScrollProps>);
    protected getElementProps(): React.HTMLAttributes<Element>;
    componentDidMount(): void;
    componentDidUpdate(): void;
    private _saveScrollViewRefCallback;
    private _onPrevKeyDown;
    private _onNextKeyDown;
    private _onPrevClick;
    private _onNextClick;
    private _slideByArrow;
    private _getScrollLeft;
    private _getPrevIcon;
    private _getNextIcon;
    private _getCurrentChildIndex;
    private _boundIndex;
    private _getChildIndexToScroll;
    private _recalculateState;
    private _getChildByIndex;
    private _scrollToChildByIndex;
    private _scrollToChild;
    private _scrollToWithTransition;
    private _scrollTransition;
    private _scrollEase;
    private _getScrollableContainer;
    private _renderPrevArrowButton;
    private _renderNextArrowButton;
    private _renderArrowIcon;
    private _isBrowserIEorEdge;
    private _isBrowserFirefox;
    private _isBrowserChromeOrAndroid;
    private _isBrowserSafari;
    private _scrollToContent;
    private _scrollToContentHorizontal;
    private _getCalculatedStyle;
    private _getTotalWidthIncludingMargins;
    private _getChildIndex;
    private _determineDuration;
    render(): JSX.Element;
}
declare const HorizontalScroll: React.ComponentType<Pick<any, string | number | symbol> & ReactFela.FelaWithStylesInjectedProps<Pick<any, string | number | symbol>, {
    rule: unknown;
}, any>>;
export { IHorizontalScrollState, IHorizontalScrollStyle, IHorizontalScrollProps, InnerHorizontalScroll, HorizontalScroll, };

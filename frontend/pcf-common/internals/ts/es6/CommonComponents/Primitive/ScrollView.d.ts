import * as React from "react";
import { IScrollViewStyle } from "./IScrollViewStyle";
import { IFlexboxContainerStyle } from "./IFlexboxContainerStyle";
import { ComponentBase, IPropsBase } from "./ComponentBase";
import * as ReactFela from "react-fela";
import { FelaProps } from "./FelaConnectHelper";
interface IScrollViewProps extends IPropsBase {
    onClick?: React.MouseEventHandler;
    onScrollToBottom?: any;
    horizontal?: boolean;
    contentContainerStyle?: IScrollViewStyle & IFlexboxContainerStyle;
    style?: IScrollViewStyle & IFlexboxContainerStyle;
    refCallback?: (instance: any) => void;
    semanticTag?: "div" | "ul";
    scrollToId?: string;
    isRTL?: boolean;
    isWithinATopMostSeeMore?: boolean;
    className?: string;
}
declare class InnerScrollView extends ComponentBase<IScrollViewProps & FelaProps<IScrollViewProps>, any> {
    static displayName: string;
    private _scrollViewRef;
    private _ua;
    constructor(props: IScrollViewProps & FelaProps<IScrollViewProps>);
    componentDidUpdate(preProps: IScrollViewProps): void;
    componentDidMount(): void;
    private _scrollToContentHorizontalLTR;
    private _scrollToContentHorizontalRTLIEorEdge;
    private _scrollToContent;
    private _isIEorEdge;
    private _isMobileSafari;
    private _onScrollHandler;
    protected getElementName(): string;
    protected getElementProps(): React.ClassAttributes<InnerScrollView> & React.HTMLAttributes<Element>;
    scrollToChild(child: React.Component<any, any> | Element): void;
    private _setInnerViewRef;
    protected getFlexClassName(style: React.CSSProperties): string;
    protected getElementClassName(): string;
}
declare const ScrollView: React.ComponentType<Pick<any, string | number | symbol> & ReactFela.FelaWithStylesInjectedProps<Pick<any, string | number | symbol>, {
    rule: unknown;
}, any>>;
export { IScrollViewProps, InnerScrollView, ScrollView };

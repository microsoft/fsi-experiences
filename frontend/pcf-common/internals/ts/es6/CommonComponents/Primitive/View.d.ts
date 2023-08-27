import * as React from "react";
import { IViewHtmlStyle, IViewStyle } from "./IViewStyle";
import { IFlexboxContainerStyle } from "./IFlexboxContainerStyle";
import { ComponentBase, IPropsBase } from "./ComponentBase";
import * as ReactFela from "react-fela";
import { FelaProps } from "./FelaConnectHelper";
interface IViewProps extends IPropsBase {
    style?: IViewStyle & IViewHtmlStyle & IFlexboxContainerStyle;
    semanticTag?: "div" | "span" | "section" | "nav" | "main" | "header" | "form" | "fieldset";
    role?: "alertdialog" | "status" | "navigation" | "tabpanel" | "menubar" | "search" | "dialog" | "heading" | string;
    accessKey?: string;
    isRTL?: boolean;
    isRequestedMeasuring?: boolean;
    onMeasuring?: any;
    forceMeasure?: any;
    isWithinATopMostSeeMore?: boolean;
    className?: string;
}
declare class InnerView extends ComponentBase<IViewProps & FelaProps<IViewProps>, {}> {
    static displayName: string;
    static contextType: React.Context<import("../Common/MeasuringHandler/IMeasuringHandlerContext").IMeasuringHandlerContext>;
    private _subscriber;
    private _mountedElement;
    constructor(props: IViewProps & FelaProps<IViewProps>);
    protected getElementName(): string;
    protected getFlexClassName(style: React.CSSProperties): string;
    componentDidMount(): void;
    componentDidUpdate(): void;
    private _getReference;
    getComponent(): HTMLElement;
    componentWillUnmount(): void;
    protected getElementStyle(): React.CSSProperties;
    protected getElementClassName(): string;
    protected getElementProps(): React.HTMLAttributes<Element>;
    protected setRefCallbackAndReference(input: InnerView): void;
    render(): any;
}
declare const View: React.ComponentType<Pick<any, string | number | symbol> & ReactFela.FelaWithStylesInjectedProps<Pick<any, string | number | symbol>, {
    rule: unknown;
}, any>>;
export { IViewProps, IViewStyle, IViewHtmlStyle, IFlexboxContainerStyle, InnerView, View };

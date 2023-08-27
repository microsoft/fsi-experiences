/// <reference types="react" />
import { ITextProps, ITextStyle } from "./Text";
import { ComponentBase } from "./ComponentBase";
interface IFTextProps extends ITextProps {
    isRTL?: boolean;
    truncatedlines?: number;
    maskingColor?: string;
    noExpandable?: boolean;
    lineHeight?: number;
    isFieldLabel?: boolean;
    flexibleTextContainerStyle?: any;
    flexibleTextStyle?: ITextStyle;
}
interface IFTextState {
    collapsed?: boolean;
}
declare class FlexibleText extends ComponentBase<IFTextProps, IFTextState> {
    private _textRef;
    private _totalLineHeight;
    private _originalHeight;
    private _firstRender;
    private _areLinesTruncated;
    private _backgroundCanvas;
    constructor(props: IFTextProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    private _toggleCollapseState;
    protected saveItemRef(item: FlexibleText): void;
    private _calculateLineHeight;
    render(): JSX.Element;
    private _calculateHeight;
    private _getTextStyle;
    private _returnExpandableClassName;
}
export { IFTextProps, IFTextState, FlexibleText };

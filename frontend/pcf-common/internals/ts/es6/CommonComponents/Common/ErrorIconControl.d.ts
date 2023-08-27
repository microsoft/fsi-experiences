/// <reference types="react" />
import { ITextStyle } from "../Primitive/Text";
import { IViewStyle, IViewHtmlStyle } from "../Primitive/IViewStyle";
import { IFlexboxContainerStyle } from "../Primitive/IFlexboxContainerStyle";
declare type IErrorIconControlStyle = IViewStyle & IFlexboxContainerStyle & IViewHtmlStyle;
interface IErrorIconControlProps {
    errorMessage?: string;
    style?: IErrorIconControlStyle;
    errorSymbolStyle?: ITextStyle;
    id?: string;
}
declare function ErrorIconControl(props: IErrorIconControlProps): JSX.Element;
export { IErrorIconControlStyle, IErrorIconControlProps, ErrorIconControl };

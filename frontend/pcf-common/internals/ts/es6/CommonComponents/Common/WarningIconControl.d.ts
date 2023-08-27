/// <reference types="react" />
import { ITextStyle } from "../Primitive/Text";
import { IViewStyle, IViewHtmlStyle } from "../Primitive/IViewStyle";
import { IFlexboxContainerStyle } from "../Primitive/IFlexboxContainerStyle";
declare type IWarningIconControlStyle = IViewStyle & IFlexboxContainerStyle & IViewHtmlStyle;
interface IWarningIconControlProps {
    warningMessage?: string;
    style?: IWarningIconControlStyle;
    warningSymbolStyle?: ITextStyle;
    id?: string;
}
declare function WarningIconControl(props: IWarningIconControlProps): JSX.Element;
export { IWarningIconControlStyle, IWarningIconControlProps, WarningIconControl };

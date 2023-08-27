/// <reference types="react" />
import { ITextStyle } from "../Primitive/Text";
import { IViewStyle, IViewHtmlStyle } from "../Primitive/IViewStyle";
import { IFlexboxContainerStyle } from "../Primitive/IFlexboxContainerStyle";
declare type IInfoIconControlStyle = IViewStyle & IFlexboxContainerStyle & IViewHtmlStyle;
interface IInfoIconControlProps {
    infoMessage?: string;
    style?: IInfoIconControlStyle;
    infoSymbolStyle?: ITextStyle;
    id?: string;
    accessibilityHidden?: boolean;
}
declare function InfoIconControl(props: IInfoIconControlProps): JSX.Element;
export { IInfoIconControlStyle, IInfoIconControlProps, InfoIconControl };

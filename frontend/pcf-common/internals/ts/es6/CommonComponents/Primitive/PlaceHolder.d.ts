/// <reference types="react" />
import { ITextStyle } from "../Primitive/Text";
import { IViewStyle, IViewHtmlStyle } from "../Primitive/IViewStyle";
import { IFlexboxContainerStyle } from "../Primitive/IFlexboxContainerStyle";
declare type IPlaceHolderStyle = IViewStyle & IFlexboxContainerStyle & IViewHtmlStyle & ITextStyle;
interface IPlaceHolderProps {
    text?: string;
    textStyle?: ITextStyle;
    icon?: any;
    iconStyle?: ITextStyle;
    containerStyle?: IPlaceHolderStyle;
    id?: string;
    accessibilityHidden?: boolean;
}
declare function PlaceHolder(props: IPlaceHolderProps): JSX.Element;
export { IPlaceHolderStyle, IPlaceHolderProps, PlaceHolder };

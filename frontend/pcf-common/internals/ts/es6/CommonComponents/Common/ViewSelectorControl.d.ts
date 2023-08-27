import * as React from "react";
import * as ReactFela from "react-fela";
import { CrmIconSymbol } from "../FontIcon/CrmIconSymbol";
import { MicrosoftIconSymbol } from "../FontIcon/MicrosoftIconSymbol";
import { IComboBoxOption, IComboBoxProps, IComboBoxState } from "../Primitive/ComboBox";
import { IComboBoxStyle } from "../Primitive/ComboBox/IComboBoxStyle";
import { IViewStyle } from "../Primitive/IViewStyle";
import { IImageStyle } from "../Primitive/Image";
import { ITextStyle } from "../Primitive/Text";
import { IFlexboxContainerStyle } from "../Primitive/View";
interface IViewSelectorControlCategory {
    id: string;
    name: string;
}
interface IViewSelectorControlOption extends IComboBoxOption {
    categoryId?: string;
    imageSource?: string;
    iconCategory?: number;
    altText?: string;
    iconType?: CrmIconSymbol | MicrosoftIconSymbol;
    iconStyle?: IImageStyle & IViewStyle & ITextStyle;
    iconTitle?: string;
}
interface IViewSelectorControlProps extends IComboBoxProps {
    categories?: IViewSelectorControlCategory[];
    hoveredStyle?: IViewSelectorControlStyle;
    viewSelectorStyle?: IViewSelectorControlStyle;
    overrideTextContainerStyle?: IFlexboxContainerStyle & IViewStyle;
    expandedBackgroundColor?: string;
    caretStyle?: ITextStyle;
    caretType?: MicrosoftIconSymbol;
    onItemIconPointerDown?: (option: IViewSelectorControlOption) => void;
    isRTL?: boolean;
    placeItemIconOnRight?: boolean;
    semanticTag?: "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}
interface IViewSelectorControlState extends IComboBoxState {
    selectedItemId?: string;
}
declare type IViewSelectorControlStyle = IComboBoxStyle;
declare const ViewSelectorControl: React.ComponentType<Pick<any, string | number | symbol> & ReactFela.FelaWithStylesInjectedProps<Pick<any, string | number | symbol>, {
    rule: unknown;
}, any>>;
export { IViewSelectorControlOption, IViewSelectorControlCategory, IViewSelectorControlStyle, IViewSelectorControlProps, IViewSelectorControlState, ViewSelectorControl, };

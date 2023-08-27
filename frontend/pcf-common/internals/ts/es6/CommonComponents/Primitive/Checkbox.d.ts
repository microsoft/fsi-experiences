import * as React from "react";
import { IPropsBase } from "./ComponentBase";
import { ITextInputStyle } from "./TextInput";
import * as AttributeName from "../Supplementary/Accessibility/Attributes/AttributeName";
import * as ReactFela from "react-fela";
declare type ICheckboxStyle = ITextInputStyle;
interface ICheckboxProps extends IPropsBase {
    style?: ICheckboxStyle;
    checked?: boolean;
    [AttributeName.ARIA_CHECKED]?: boolean;
    disabled?: boolean;
    onChange?: (checkboxValue: boolean) => void;
    name?: string;
    key?: string;
    accessibilityRole?: string;
}
declare const Checkbox: React.ComponentType<Pick<any, string | number | symbol> & ReactFela.FelaWithStylesInjectedProps<Pick<any, string | number | symbol>, {
    rule: unknown;
}, any>>;
export { ICheckboxStyle, ICheckboxProps, Checkbox };

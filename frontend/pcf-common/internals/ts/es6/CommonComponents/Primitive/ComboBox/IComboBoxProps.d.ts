/// <reference types="react" />
import { IPropsBase } from "../ComponentBase";
import { ITextStyle } from "../Text";
import { IComboBoxOption } from "./IComboBoxOption";
import { IComboBoxStyle } from "./IComboBoxStyle";
import { IAccessibilityComponentWrapperProps } from "../../../CustomControls/Models/CustomControlExposedInterfaces";
export interface IComboBoxProps extends IPropsBase {
    style?: IComboBoxStyle;
    textInputStyle?: ITextStyle;
    textStyle?: ITextStyle;
    focusedStyle?: IComboBoxStyle;
    itemStyle?: object;
    selectedItemStyle?: object;
    pageSize?: number;
    disabled?: boolean;
    readOnly?: boolean;
    name?: string;
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    options?: IComboBoxOption[];
    freeTextMode?: boolean;
    createKeyboardShortcut: (keyCombination: number[], shortcutHandler: (event: KeyboardEvent) => void, isGlobal: boolean, areaName: string, shortcutDescription: string, srcElementId?: string) => any;
    createAccessibilityComponent: (props: IAccessibilityComponentWrapperProps) => JSX.Element;
    parentCustomControlId?: string;
    parentFlyoutRoot?: string;
    rootZIndex?: boolean;
    hideArrow?: boolean;
    hideInternalId?: boolean;
    relativeToElementId?: string;
    useHeader?: boolean;
    onOptionSelected?: (option: IComboBoxOption) => void;
    placeholder?: string;
    keepFlyoutOpenOnScroll?: boolean;
    suppressFreeTextChangeCallback?: boolean;
}
export default IComboBoxProps;

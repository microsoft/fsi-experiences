import * as React from "react";
import { ITextStyle } from "./Text";
import { IViewHtmlStyle } from "./IViewStyle";
import { ComponentBase, IPropsBase } from "./ComponentBase";
import * as ReactFela from "react-fela";
import { FelaProps } from "./FelaConnectHelper";
declare enum KeyboardType {
    default = 0,
    emailAddress = 1,
    numeric = 2,
    phonePad = 3,
    asciiCapable = 4,
    numbersAndPunctuation = 5,
    url = 6,
    numberPad = 7,
    namePhonePad = 8,
    decimalPad = 9,
    twitter = 10,
    webSearch = 11
}
interface ITextInputStyle extends ITextStyle {
    direction?: "ltr" | "rtl";
    unicodeBidi?: string;
}
interface ITextInputProps extends IPropsBase {
    id?: string;
    type?: string;
    keyboardType?: KeyboardType;
    value?: string;
    title?: string;
    readOnly?: boolean;
    isRTL?: boolean;
    multiline?: boolean;
    placeholder?: string;
    maxLength?: number;
    disabled?: boolean;
    rows?: number;
    selectValueOnFocus?: boolean;
    onChange?: React.FormEventHandler;
    onChangeText?: (text: string) => void;
    onKeyPress?: React.KeyboardEventHandler;
    style?: ITextInputStyle & IViewHtmlStyle;
    autoComplete?: "none" | "inline" | "list" | "both";
    testhooks?: {
        [hookName: string]: string;
    };
}
interface ITextInputState {
    value?: string;
    hasFocus?: boolean;
}
declare class InnerTextInput extends ComponentBase<ITextInputProps & FelaProps<ITextInputProps>, ITextInputState> {
    static displayName: string;
    private _dateInput;
    private _compositionEvents;
    constructor(props?: ITextInputProps & FelaProps<ITextInputProps>);
    componentWillReceiveProps(nextProps: ITextInputProps): void;
    private _selectValue;
    private _onChange;
    private _onInput;
    private _onCompositionStart;
    private _onCompositionUpdate;
    private _onCompositionEnd;
    private _handleOnChange;
    private _onKeyPress;
    protected handleFocus(): number;
    private _onFocus;
    private _onBlur;
    protected handlePointerDown(e: React.MouseEvent): void;
    protected handlePointerUp(e: React.MouseEvent): void;
    protected handleKeyDown(e: React.KeyboardEvent): void;
    protected handleKeyUp(e: React.KeyboardEvent): void;
    protected getElementName(): string;
    protected getElementProps(): React.HTMLAttributes<Element>;
    private _getTitle;
    private _refElementCallback;
}
declare const TextInput: React.ComponentType<Pick<any, string | number | symbol> & ReactFela.FelaWithStylesInjectedProps<Pick<any, string | number | symbol>, {
    rule: unknown;
}, any>>;
export { KeyboardType, ITextInputStyle, ITextInputState, ITextInputProps, InnerTextInput, TextInput };

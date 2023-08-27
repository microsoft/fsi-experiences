import * as React from "react";
import * as ReactFela from "react-fela";
import { FelaProps } from "../FelaConnectHelper";
import { IPropsBase, ComponentBase } from "../ComponentBase";
import { IViewStyle } from "../IViewStyle";
import { IInputOptionStyle } from "./InputOption";
import { ITextStyle } from "../Label";
interface IRadioInputProps extends IPropsBase {
    options?: CustomControlInterfaces.ICCFOptionSetValue[];
    value?: CustomControlInterfaces.ICCFOptionSetValue;
    style?: IRadioInputCompositeStyle;
    disabled?: boolean;
    onChange?: (option: CustomControlInterfaces.ICCFOptionSetValue) => void;
    name?: string;
}
interface IRadioInputState {
    value: CustomControlInterfaces.ICCFOptionSetValue;
}
interface IRadioInputCompositeStyle {
    style?: IViewStyle;
    inputOptionStyle?: IInputOptionStyle;
    inputOptionLabelStyle?: ITextStyle;
}
declare class InnerRadioInput extends ComponentBase<IRadioInputProps & FelaProps<IRadioInputProps>, IRadioInputState> {
    private _uuid;
    constructor(props: IRadioInputProps & FelaProps<IRadioInputProps>);
    componentWillReceiveProps(nextProps: IRadioInputProps): void;
    private _uniqueId;
    private _optionId;
    private _getInputOptionProps;
    private _getLabelOptionProps;
    private _getViewStyles;
    private _onChangeHandler;
    private _getOptionList;
    render(): JSX.Element;
}
declare const RadioInput: React.ComponentType<Pick<any, string | number | symbol> & ReactFela.FelaWithStylesInjectedProps<Pick<any, string | number | symbol>, {
    rule: unknown;
}, any>>;
export { IRadioInputCompositeStyle, IRadioInputProps, IRadioInputState, InnerRadioInput, RadioInput };

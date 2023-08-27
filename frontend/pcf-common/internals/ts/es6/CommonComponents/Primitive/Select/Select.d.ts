import * as React from "react";
import { IPropsBase, ComponentBase } from "../ComponentBase";
import { IOptionStyle } from "./Option";
import { ITextStyle } from "../Text";
import * as ReactFela from "react-fela";
import { FelaProps } from "../FelaConnectHelper";
interface ISelectStyle extends ITextStyle {
    appearance?: "none" | string;
}
interface ISelectCompositeStyle {
    selectStyle?: ISelectStyle;
    optionStyle?: IOptionStyle;
}
interface ISelectProps extends IPropsBase {
    options?: CustomControlInterfaces.ICCFSelectSetValue[];
    value?: any;
    style?: ISelectCompositeStyle;
    disabled?: boolean;
    multiple?: boolean;
    onChange?: (option: any) => void;
    readOnly?: boolean;
}
interface ISelectState {
    value: any;
}
declare class InnerSelect extends ComponentBase<ISelectProps & FelaProps<ISelectProps>, ISelectState> {
    private _uuid;
    constructor(props: ISelectProps & FelaProps<ISelectProps>);
    componentWillReceiveProps(nextProps: ISelectProps): void;
    private _uniqueId;
    private _isMultiple;
    private _optionId;
    private _onChangeHandler;
    protected getElementName(): string;
    protected getElementProps(): React.HTMLAttributes<Element>;
    protected getElementChildren(): React.ReactNode;
}
declare const Select: React.ComponentType<Pick<any, string | number | symbol> & ReactFela.FelaWithStylesInjectedProps<Pick<any, string | number | symbol>, {
    rule: unknown;
}, any>>;
export { ISelectStyle, ISelectCompositeStyle, ISelectProps, ISelectState, InnerSelect, Select };

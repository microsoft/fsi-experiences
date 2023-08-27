import * as React from "react";
import { IPropsBase, ComponentBase } from "../ComponentBase";
import * as ReactFela from "react-fela";
import { FelaProps } from "../FelaConnectHelper";
interface IOptionStyle {
    backgroundColor?: string;
    color?: string;
}
interface IOptionProps extends IPropsBase {
    value?: CustomControlInterfaces.ICCFOptionSetValue;
    style?: IOptionStyle;
    disabled?: boolean;
    selected?: boolean;
}
declare class InnerOption extends ComponentBase<IOptionProps & FelaProps<IOptionProps>, any> {
    protected getElementName(): string;
    protected getElementProps(): React.HTMLAttributes<Element>;
    protected getElementChildren(): React.ReactNode;
}
declare const Option: React.ComponentType<Pick<any, string | number | symbol> & ReactFela.FelaWithStylesInjectedProps<Pick<any, string | number | symbol>, {
    rule: unknown;
}, any>>;
export { IOptionStyle, IOptionProps, InnerOption, Option };

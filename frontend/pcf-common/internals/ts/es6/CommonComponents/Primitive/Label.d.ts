import * as React from "react";
import { ITextStyle } from "./Text";
import { ComponentBase, IPropsBase } from "./ComponentBase";
import * as ReactFela from "react-fela";
import { FelaProps } from "./FelaConnectHelper";
interface ILabelProps extends IPropsBase {
    style?: ITextStyle;
    forElementId?: string;
}
declare class InnerLabel extends ComponentBase<ILabelProps & FelaProps<ILabelProps>, any> {
    static displayName: string;
    protected getElementName(): string;
    protected getElementProps(): React.LabelHTMLAttributes<Element>;
}
declare const Label: React.ComponentType<Pick<any, string | number | symbol> & ReactFela.FelaWithStylesInjectedProps<Pick<any, string | number | symbol>, {
    rule: unknown;
}, any>>;
export { ITextStyle, ILabelProps, InnerLabel, Label };

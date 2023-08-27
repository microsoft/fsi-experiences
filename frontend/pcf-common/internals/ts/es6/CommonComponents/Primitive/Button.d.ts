import * as React from "react";
import { IViewStyle } from "./IViewStyle";
import { IFlexboxContainerStyle } from "./IFlexboxContainerStyle";
import { ComponentBase, IPropsBase } from "./ComponentBase";
import * as ReactFela from "react-fela";
import { FelaProps } from "./FelaConnectHelper";
interface IButtonStyle extends IViewStyle, IFlexboxContainerStyle {
    cursor?: "pointer" | string;
}
interface IButtonProps extends IPropsBase {
    style?: IButtonStyle;
    accessibilityLabel: string;
    accessKey?: string;
    disabled?: boolean;
    className?: string;
}
declare class InnerButton extends ComponentBase<IButtonProps & FelaProps<IButtonProps>, any> {
    static displayName: string;
    protected getElementName(): string;
    protected getElementProps(): React.HTMLAttributes<Element>;
    protected getElementClassName(): string;
    protected getFlexClassName(style: React.CSSProperties): string;
    protected getElementStyle(): React.CSSProperties;
}
declare const Button: React.ComponentType<Pick<any, string | number | symbol> & ReactFela.FelaWithStylesInjectedProps<Pick<any, string | number | symbol>, {
    rule: unknown;
}, any>>;
export { IButtonStyle, IButtonProps, InnerButton, Button };

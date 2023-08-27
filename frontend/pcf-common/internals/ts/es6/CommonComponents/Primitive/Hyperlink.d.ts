import * as React from "react";
import { ITextStyle } from "./Text";
import { ComponentBase, IPropsBase } from "./ComponentBase";
import * as ReactFela from "react-fela";
import { FelaProps } from "./FelaConnectHelper";
interface IHyperlinkStyle extends ITextStyle {
    cursor?: "pointer" | string;
    color?: string;
}
declare type ITargetType = "_blank" | "_self" | "_parent" | "_top";
interface IHyperlinkProps extends IPropsBase {
    href?: string;
    target?: ITargetType;
    style?: IHyperlinkStyle;
    download?: string;
}
declare class InnerHyperlink extends ComponentBase<IHyperlinkProps & FelaProps<IHyperlinkProps>, any> {
    protected getElementName(): string;
    protected getElementProps(): React.AnchorHTMLAttributes<Element>;
}
declare const Hyperlink: React.ComponentType<Pick<any, string | number | symbol> & ReactFela.FelaWithStylesInjectedProps<Pick<any, string | number | symbol>, {
    rule: unknown;
}, any>>;
export { IHyperlinkStyle, ITargetType, IHyperlinkProps, InnerHyperlink, Hyperlink };

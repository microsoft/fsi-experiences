import * as React from "react";
import { Property } from "csstype";
import { IViewStyle, IViewHtmlStyle } from "./IViewStyle";
import { ComponentBase, IPropsBase } from "./ComponentBase";
import { IAccessibilityNotificationProps } from "./IAccessibilityNotificationProps";
import * as ReactFela from "react-fela";
import { FelaProps } from "./FelaConnectHelper";
interface ITextStyle extends IViewStyle {
    color?: string;
    fontFamily?: string;
    fontSize?: string | number;
    fontStyle?: Property.FontStyle;
    fontWeight?: Property.FontWeight;
    lineHeight?: string | number;
    textAlign?: Property.TextAlign;
    textDecoration?: string | number;
    display?: Property.Display;
    userSelect?: Property.UserSelect;
    wordBreak?: Property.WordBreak;
}
interface ITextProps extends IPropsBase, IAccessibilityNotificationProps {
    style?: ITextStyle & IViewHtmlStyle;
    role?: "alert" | "tooltip" | string;
    semanticTag?: "span" | "legend" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    className?: string;
}
declare class InnerText extends ComponentBase<ITextProps & FelaProps<ITextProps>, any> {
    static displayName: string;
    protected getElementName(): "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "legend" | "span";
    protected getElementClassName(): string;
    protected getElementProps(): React.HTMLAttributes<Element>;
}
declare const Text: React.ComponentType<Pick<any, string | number | symbol> & ReactFela.FelaWithStylesInjectedProps<Pick<any, string | number | symbol>, {
    rule: unknown;
}, any>>;
export { ITextStyle, ITextProps, InnerText, Text };

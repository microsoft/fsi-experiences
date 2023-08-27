import * as React from "react";
import { IViewStyle } from "./IViewStyle";
import { IFlexboxContainerStyle } from "./IFlexboxContainerStyle";
import { ComponentBase, IPropsBase } from "./ComponentBase";
import { IAccessibilityNotificationProps } from "./IAccessibilityNotificationProps";
import * as ReactFela from "react-fela";
import { FelaProps } from "./FelaConnectHelper";
import { Property } from "csstype";
interface IListStyle extends IViewStyle, IFlexboxContainerStyle {
    listStyleType?: Property.ListStyleType;
}
interface IListProps extends IPropsBase, IAccessibilityNotificationProps {
    style?: IListStyle;
    role?: "list" | "tablist" | "menu" | string;
}
declare class InnerList extends ComponentBase<IListProps & FelaProps<IListProps>, any> {
    static displayName: string;
    constructor(props: IListProps & FelaProps<IListProps>);
    protected getElementName(): string;
    protected getFlexClassName(style: React.CSSProperties): string;
    protected getElementProps(): React.HTMLAttributes<Element>;
    protected getElementStyle(): React.CSSProperties;
}
declare const List: React.ComponentType<Pick<any, string | number | symbol> & ReactFela.FelaWithStylesInjectedProps<Pick<any, string | number | symbol>, {
    rule: unknown;
}, any>>;
export { IListStyle, IListProps, InnerList, List };

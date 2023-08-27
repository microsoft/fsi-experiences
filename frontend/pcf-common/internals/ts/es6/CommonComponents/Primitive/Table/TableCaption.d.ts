/// <reference types="react" />
import { IViewStyle } from "../IViewStyle";
import { ComponentBase, IPropsBase } from "../ComponentBase";
import * as ReactFela from "react-fela";
import { FelaProps } from "../FelaConnectHelper";
interface ITableCaptionProps extends IPropsBase {
    style?: IViewStyle;
}
declare class InnerTableCaption extends ComponentBase<ITableCaptionProps & FelaProps<ITableCaptionProps>, any> {
    static displayName: string;
    protected getElementName(): string;
}
declare const TableCaption: import("react").ComponentType<Pick<any, string | number | symbol> & ReactFela.FelaWithStylesInjectedProps<Pick<any, string | number | symbol>, {
    rule: unknown;
}, any>>;
export { ITableCaptionProps, InnerTableCaption, TableCaption };

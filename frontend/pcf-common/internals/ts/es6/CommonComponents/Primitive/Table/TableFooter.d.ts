/// <reference types="react" />
import { IViewStyle } from "../IViewStyle";
import { ComponentBase, IPropsBase } from "../ComponentBase";
import * as ReactFela from "react-fela";
import { FelaProps } from "../FelaConnectHelper";
interface ITableFooterProps extends IPropsBase {
    style?: IViewStyle;
}
declare class InnerTableFooter extends ComponentBase<ITableFooterProps & FelaProps<ITableFooterProps>, any> {
    static displayName: string;
    protected getElementName(): string;
}
declare const TableFooter: import("react").ComponentType<Pick<any, string | number | symbol> & ReactFela.FelaWithStylesInjectedProps<Pick<any, string | number | symbol>, {
    rule: unknown;
}, any>>;
export { ITableFooterProps, InnerTableFooter, TableFooter };

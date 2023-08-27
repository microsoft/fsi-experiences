/// <reference types="react" />
import { IViewStyle } from "../IViewStyle";
import { ComponentBase, IPropsBase } from "../ComponentBase";
import * as ReactFela from "react-fela";
import { FelaProps } from "../FelaConnectHelper";
interface ITableStyle extends IViewStyle {
    tableLayout?: "fixed" | "auto";
}
interface ITableProps extends IPropsBase {
    style?: ITableStyle;
}
declare class InnerTable extends ComponentBase<ITableProps & FelaProps<ITableProps>, any> {
    static displayName: string;
    protected getElementName(): string;
}
declare const Table: import("react").ComponentType<Pick<any, string | number | symbol> & ReactFela.FelaWithStylesInjectedProps<Pick<any, string | number | symbol>, {
    rule: unknown;
}, any>>;
export { ITableStyle, ITableProps, InnerTable, Table };

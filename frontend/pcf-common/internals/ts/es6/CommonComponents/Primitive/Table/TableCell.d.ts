import * as React from "react";
import { IViewStyle } from "../IViewStyle";
import { ComponentBase, IPropsBase } from "../ComponentBase";
import * as ReactFela from "react-fela";
import { FelaProps } from "../FelaConnectHelper";
interface ITableCellProps extends IPropsBase {
    style?: IViewStyle;
    colSpan?: number;
    rowSpan?: number;
    scope?: string;
}
declare class InnerTableCell extends ComponentBase<ITableCellProps & FelaProps<ITableCellProps>, any> {
    static displayName: string;
    protected getElementName(): string;
    protected getElementProps(): React.TdHTMLAttributes<Element>;
}
declare const TableCell: React.ComponentType<Pick<any, string | number | symbol> & ReactFela.FelaWithStylesInjectedProps<Pick<any, string | number | symbol>, {
    rule: unknown;
}, any>>;
export { ITableCellProps, InnerTableCell, TableCell };

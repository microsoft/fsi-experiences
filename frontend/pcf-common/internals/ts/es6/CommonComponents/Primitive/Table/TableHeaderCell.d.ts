import * as React from "react";
import { IViewStyle } from "../IViewStyle";
import { ComponentBase, IPropsBase } from "../ComponentBase";
import * as ReactFela from "react-fela";
import { FelaProps } from "../FelaConnectHelper";
interface ITableHeaderCellProps extends IPropsBase {
    style?: IViewStyle;
    onClick?: React.MouseEventHandler;
    colSpan?: string;
    rowSpan?: number;
    scope?: string;
}
declare class InnerTableHeaderCell extends ComponentBase<ITableHeaderCellProps & FelaProps<ITableHeaderCellProps>, any> {
    static displayName: string;
    constructor(props: ITableHeaderCellProps & FelaProps<ITableHeaderCellProps>);
    private _onClickWrapper;
    protected getElementName(): string;
    protected getElementProps(): React.HTMLAttributes<Element>;
}
declare const TableHeaderCell: React.ComponentType<Pick<any, string | number | symbol> & ReactFela.FelaWithStylesInjectedProps<Pick<any, string | number | symbol>, {
    rule: unknown;
}, any>>;
export { ITableHeaderCellProps, InnerTableHeaderCell, TableHeaderCell };

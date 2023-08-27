import * as React from "react";
import { IViewStyle } from "../IViewStyle";
import { ComponentBase, IPropsBase } from "../ComponentBase";
import * as ReactFela from "react-fela";
import { FelaProps } from "../FelaConnectHelper";
interface ITableRowProps extends IPropsBase {
    style?: IViewStyle;
    onClick?: React.MouseEventHandler;
}
declare class InnerTableRow extends ComponentBase<ITableRowProps & FelaProps<ITableRowProps>, any> {
    static displayName: string;
    constructor(props: ITableRowProps & FelaProps<ITableRowProps>);
    private _onClickWrapper;
    protected getElementName(): string;
    protected getElementProps(): React.HTMLAttributes<Element>;
}
declare const TableRow: React.ComponentType<Pick<any, string | number | symbol> & ReactFela.FelaWithStylesInjectedProps<Pick<any, string | number | symbol>, {
    rule: unknown;
}, any>>;
export { ITableRowProps, InnerTableRow, TableRow };

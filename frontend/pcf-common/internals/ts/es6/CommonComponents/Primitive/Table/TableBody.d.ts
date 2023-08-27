/// <reference types="react" />
import { IViewStyle } from "../IViewStyle";
import { ComponentBase, IPropsBase } from "../ComponentBase";
import * as ReactFela from "react-fela";
import { FelaProps } from "../FelaConnectHelper";
interface ITableBodyProps extends IPropsBase {
    style?: IViewStyle;
}
declare class InnerTableBody extends ComponentBase<ITableBodyProps & FelaProps<ITableBodyProps>, any> {
    static displayName: string;
    protected getElementName(): string;
}
declare const TableBody: import("react").ComponentType<Pick<any, string | number | symbol> & ReactFela.FelaWithStylesInjectedProps<Pick<any, string | number | symbol>, {
    rule: unknown;
}, any>>;
export { ITableBodyProps, InnerTableBody, TableBody };

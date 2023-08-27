/// <reference types="react" />
import { IViewStyle } from "../IViewStyle";
import { ComponentBase, IPropsBase } from "../ComponentBase";
import * as ReactFela from "react-fela";
import { FelaProps } from "../FelaConnectHelper";
interface ITableHeaderProps extends IPropsBase {
    style?: IViewStyle;
}
declare class InnerTableHeader extends ComponentBase<ITableHeaderProps & FelaProps<ITableHeaderProps>, any> {
    static displayName: string;
    protected getElementName(): string;
}
declare const TableHeader: import("react").ComponentType<Pick<any, string | number | symbol> & ReactFela.FelaWithStylesInjectedProps<Pick<any, string | number | symbol>, {
    rule: unknown;
}, any>>;
export { ITableHeaderProps, InnerTableHeader, TableHeader };

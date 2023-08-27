/// <reference types="react" />
import { IFontIconProps, FontIcon } from "../Primitive/FontIcon";
import { CrmIconSymbol } from "./CrmIconSymbol";
import * as ReactFela from "react-fela";
declare class InnerCrmIcon extends FontIcon<CrmIconSymbol> {
    getSymbolClassName(type: CrmIconSymbol): string;
}
declare const CrmIcon: import("react").ComponentType<Pick<any, string | number | symbol> & ReactFela.FelaWithStylesInjectedProps<Pick<any, string | number | symbol>, {
    rule: unknown;
}, any>>;
export { InnerCrmIcon, CrmIcon, IFontIconProps };

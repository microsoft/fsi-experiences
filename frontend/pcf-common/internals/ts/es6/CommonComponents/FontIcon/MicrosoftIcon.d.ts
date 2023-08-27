/// <reference types="react" />
import { IFontIconProps, FontIcon } from "../Primitive/FontIcon";
import { MicrosoftIconSymbol } from "./MicrosoftIconSymbol";
import * as ReactFela from "react-fela";
declare class InnerMicrosoftIcon extends FontIcon<MicrosoftIconSymbol> {
    getSymbolClassName(type: MicrosoftIconSymbol): string;
}
declare enum IconPosition {
    None = 0,
    Left = 1,
    Top = 2
}
declare const MicrosoftIcon: import("react").ComponentType<Pick<any, string | number | symbol> & ReactFela.FelaWithStylesInjectedProps<Pick<any, string | number | symbol>, {
    rule: unknown;
}, any>>;
export { InnerMicrosoftIcon, MicrosoftIcon, IFontIconProps, IconPosition };

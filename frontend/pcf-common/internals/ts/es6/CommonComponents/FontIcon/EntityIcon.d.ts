/// <reference types="react" />
import { IFontIconProps, FontIcon } from "../Primitive/FontIcon";
import * as ReactFela from "react-fela";
declare class InnerEntityIcon extends FontIcon<string> {
    getSymbolClassName(name: string): string;
}
declare const EntityIcon: import("react").ComponentType<Pick<any, string | number | symbol> & ReactFela.FelaWithStylesInjectedProps<Pick<any, string | number | symbol>, {
    rule: unknown;
}, any>>;
export { InnerEntityIcon, EntityIcon, IFontIconProps };

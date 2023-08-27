import * as React from "react";
import { IPropsBase } from "./ComponentBase";
import * as ReactFela from "react-fela";
import { IViewStyle } from "./IViewStyle";
interface ISvgProps extends IPropsBase {
    source?: string;
    fallbackToImage?: boolean;
    style?: IViewStyle;
    altText?: string;
    title?: string;
    token?: string;
    onParsingError?(errorMessage: string): void;
}
interface ISvgState {
    parsedSvgProps?: React.SVGAttributes<Element>;
}
declare const Svg: React.ComponentType<Pick<any, string | number | symbol> & ReactFela.FelaWithStylesInjectedProps<Pick<any, string | number | symbol>, {
    rule: unknown;
}, any>>;
export { ISvgProps, ISvgState, Svg };

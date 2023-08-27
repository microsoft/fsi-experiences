import * as React from "react";
import { IFlexboxStyle } from "./IFlexboxStyle";
import { IFlexboxItemStyle } from "./IFlexboxItemStyle";
import { ComponentBase, IPropsBase } from "./ComponentBase";
import * as ReactFela from "react-fela";
import { FelaProps } from "./FelaConnectHelper";
import { Property } from "csstype";
interface IImageProps extends IPropsBase {
    source?: string;
    style?: IImageStyle & IFlexboxItemStyle;
    altText?: string;
    onLoad?(): void;
    onError?(event: React.SyntheticEvent<Element, Event>): void;
}
interface IImageStyle extends IFlexboxStyle {
    backgroundColor?: string;
    borderColor?: string;
    borderRadius?: number | string;
    borderWidth?: number | string;
    opacity?: Property.Opacity;
    overflow?: Property.Overflow;
    verticalAlign?: Property.VerticalAlign<string | number>;
    horizontalAlign?: string;
}
declare class InnerImage extends ComponentBase<IImageProps & FelaProps<IImageProps>, any> {
    static displayName: string;
    constructor(props: IImageProps & FelaProps<IImageProps>);
    private _onLoad;
    protected getElementName(): string;
    protected getElementProps(): React.HTMLAttributes<Element>;
}
declare const Image: React.ComponentType<Pick<any, string | number | symbol> & ReactFela.FelaWithStylesInjectedProps<Pick<any, string | number | symbol>, {
    rule: unknown;
}, any>>;
export { IImageStyle, IImageProps, InnerImage, Image };

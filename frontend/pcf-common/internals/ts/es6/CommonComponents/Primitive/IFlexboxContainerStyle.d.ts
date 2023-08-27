import * as React from "react";
import { Property } from "csstype";
import { IFlexboxStyle } from "./IFlexboxStyle";
interface IFlexboxContainerStyle extends IFlexboxStyle {
    display?: Property.Display;
    alignItems?: Property.AlignItems;
    flexDirection?: Property.FlexDirection;
    flexWrap?: Property.FlexWrap;
    justifyContent?: Property.JustifyContent;
    alignContent?: Property.AlignContent;
}
declare function applyIFlexboxContainerProp(style: IFlexboxContainerStyle): React.CSSProperties;
declare function getCssClassName(display: string): string;
export { IFlexboxContainerStyle, applyIFlexboxContainerProp, getCssClassName };

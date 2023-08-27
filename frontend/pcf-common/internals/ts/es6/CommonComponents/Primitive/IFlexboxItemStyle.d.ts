import { Property } from "csstype";
import { IFlexboxStyle } from "./IFlexboxStyle";
interface IFlexboxItemStyle extends IFlexboxStyle {
    alignSelf?: Property.AlignSelf;
    flex?: number | string;
}
export { IFlexboxItemStyle };

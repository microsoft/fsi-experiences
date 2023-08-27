import { IViewStyle } from "./IViewStyle";
interface IScrollViewStyle extends IViewStyle {
    borderWidth?: number;
    overflowX?: "hidden" | "scroll" | "auto";
    overflowY?: "hidden" | "scroll" | "auto";
}
export { IScrollViewStyle };

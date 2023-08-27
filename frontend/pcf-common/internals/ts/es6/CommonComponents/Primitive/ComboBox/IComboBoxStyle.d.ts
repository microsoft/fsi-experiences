import { IViewStyle } from "../IViewStyle";
import { ITextStyle } from "../Text";
export interface IComboBoxStyle extends IViewStyle, ITextStyle {
    cursor?: string;
}
export default IComboBoxStyle;

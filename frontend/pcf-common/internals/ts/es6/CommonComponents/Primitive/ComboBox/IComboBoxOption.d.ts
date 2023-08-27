import { ITextStyle } from "../Text";
export interface IComboBoxOption {
    id?: string;
    value: string;
    text: string;
    style?: ITextStyle;
}
export default IComboBoxOption;

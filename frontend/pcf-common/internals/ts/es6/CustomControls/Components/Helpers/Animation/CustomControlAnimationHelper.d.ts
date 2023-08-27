import { ICustomControlAnimationProps, SeeMoreStatus } from "./ICustomControlAnimationProps";
import * as Fela from "fela";
interface ICustomControlFancyPopoutStyles {
    shadowStyle: any;
    outerStyle: any;
    innerStyle: any;
}
declare class CustomControlAnimationHelper {
    static getCustomControlFancyPopoutStyles(renderer: Fela.IRenderer, status: SeeMoreStatus, props: ICustomControlAnimationProps): ICustomControlFancyPopoutStyles;
}
export { SeeMoreStatus, ICustomControlFancyPopoutStyles, CustomControlAnimationHelper };

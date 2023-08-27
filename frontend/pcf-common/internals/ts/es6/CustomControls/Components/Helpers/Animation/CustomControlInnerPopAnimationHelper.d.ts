import { SeeMoreStatus, ICustomControlAnimationProps } from "./ICustomControlAnimationProps";
import * as Fela from "fela";
declare class CustomControlInnerPopAnimationHelper {
    static generateInnerClass(renderer: Fela.IRenderer, status: SeeMoreStatus, props: ICustomControlAnimationProps): {
        animationFillMode: string;
        animationDirection: string;
        animationIterationCount: string;
        display: string;
        backgroundColor: string;
        opacity: string;
        height: string;
        width: string;
        transform: string;
        marginTop: string;
        marginLeft: string;
        marginRight: string;
        paddingTop: string;
        animationName: string;
        animationDuration: string;
        webkitBackfaceVisibility: string;
        backfaceVisibility: string;
        position: string;
        webkitFontSmoothing: string;
        webkitFilter: string;
    };
}
export { CustomControlInnerPopAnimationHelper };

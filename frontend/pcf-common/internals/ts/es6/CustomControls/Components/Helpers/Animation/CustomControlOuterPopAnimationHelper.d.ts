import { SeeMoreStatus, ICustomControlAnimationProps } from "./ICustomControlAnimationProps";
import * as Fela from "fela";
declare class CustomControlOuterPopAnimationHelper {
    static generateOuterClass(renderer: Fela.IRenderer, status: SeeMoreStatus, props: ICustomControlAnimationProps): {
        animationDuration: string;
        animationFillMode: string;
        animationDirection: string;
        animationIterationCount: string;
        animationName: string;
        position: string;
        display: string;
        height: string;
        width: string;
        overflow: string;
        backgroundColor: string;
        transform: string;
        left: string;
        top: string;
        zIndex: number;
        marginTop: string;
    };
}
export { CustomControlOuterPopAnimationHelper };

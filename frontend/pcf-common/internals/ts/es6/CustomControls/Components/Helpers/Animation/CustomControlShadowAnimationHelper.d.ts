import { SeeMoreStatus } from "./ICustomControlAnimationProps";
import * as Fela from "fela";
declare class CustomControlShadowAnimationHelper {
    static generateFancyShadowInAnimationName(renderer: Fela.IRenderer): string;
    static generateFancyShadowOutAnimationName(renderer: Fela.IRenderer): string;
    static generateShadowClass(renderer: Fela.IRenderer, status: SeeMoreStatus): any;
}
export { CustomControlShadowAnimationHelper };

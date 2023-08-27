import { SeeMoreStatus } from "./ICustomControlAnimationProps";
import { CustomControlOuterPopAnimationHelper } from "./CustomControlOuterPopAnimationHelper";
import { CustomControlInnerPopAnimationHelper } from "./CustomControlInnerPopAnimationHelper";
import { CustomControlShadowAnimationHelper } from "./CustomControlShadowAnimationHelper";
var CustomControlAnimationHelper = (function () {
    function CustomControlAnimationHelper() {
    }
    CustomControlAnimationHelper.getCustomControlFancyPopoutStyles = function (renderer, status, props) {
        return {
            shadowStyle: CustomControlShadowAnimationHelper.generateShadowClass(renderer, status),
            outerStyle: CustomControlOuterPopAnimationHelper.generateOuterClass(renderer, status, props),
            innerStyle: CustomControlInnerPopAnimationHelper.generateInnerClass(renderer, status, props),
        };
    };
    return CustomControlAnimationHelper;
}());
export { SeeMoreStatus, CustomControlAnimationHelper };

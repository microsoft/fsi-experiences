import { SeeMoreStatus } from "./ICustomControlAnimationProps";
var _shadowOutAnimationName = null;
var _shadowInAnimationName = null;
var CustomControlShadowAnimationHelper = (function () {
    function CustomControlShadowAnimationHelper() {
    }
    CustomControlShadowAnimationHelper.generateFancyShadowInAnimationName = function (renderer) {
        if (!_shadowOutAnimationName) {
            _shadowOutAnimationName = renderer.renderKeyframe(_shadowOutKeyframeGen, null);
        }
        return _shadowOutAnimationName;
    };
    CustomControlShadowAnimationHelper.generateFancyShadowOutAnimationName = function (renderer) {
        if (!_shadowInAnimationName) {
            _shadowInAnimationName = renderer.renderKeyframe(_shadowInKeyframeGen, null);
        }
        return _shadowInAnimationName;
    };
    CustomControlShadowAnimationHelper.generateShadowClass = function (renderer, status) {
        var baseShadowStyle = {
            width: "100%",
            height: "100%",
            top: "0px",
            left: "0px",
            backgroundColor: "#000000",
            position: "fixed",
            animationDuration: "2s",
            animationFillMode: "forwards",
            animationDirection: "normal",
            animationIterationCount: "1",
            zIndex: "1",
            animationName: null,
            opacity: null,
        };
        switch (status) {
            case SeeMoreStatus.PopFadeOutAndMove:
                baseShadowStyle.animationName = CustomControlShadowAnimationHelper.generateFancyShadowInAnimationName(renderer);
                break;
            case SeeMoreStatus.PopFadeIn:
            case SeeMoreStatus.PoppedOut:
                baseShadowStyle.opacity = ".5";
                break;
            case SeeMoreStatus.ReturnFadeOutAndMove:
                baseShadowStyle.animationName =
                    CustomControlShadowAnimationHelper.generateFancyShadowOutAnimationName(renderer);
                break;
            case SeeMoreStatus.ReturnFadeIn:
            case SeeMoreStatus.NotInUse:
                return {
                    display: "none",
                };
        }
        return baseShadowStyle;
    };
    return CustomControlShadowAnimationHelper;
}());
function _shadowOutKeyframeGen() {
    var _a;
    return _a = {},
        _a["0%"] = { opacity: 0 },
        _a["75%"] = { opacity: 0.5 },
        _a["100%"] = { opacity: 0.5 },
        _a;
}
function _shadowInKeyframeGen() {
    var _a;
    return _a = {},
        _a["0%"] = { opacity: 0.5 },
        _a["25%"] = { opacity: 0.5 },
        _a["100%"] = { opacity: 0 },
        _a;
}
export { CustomControlShadowAnimationHelper };

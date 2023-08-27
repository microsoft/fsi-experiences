import { SeeMoreStatus } from "./ICustomControlAnimationProps";
var CustomControlOuterPopAnimationHelper = (function () {
    function CustomControlOuterPopAnimationHelper() {
    }
    CustomControlOuterPopAnimationHelper.generateOuterClass = function (renderer, status, props) {
        var baseStyle = {
            animationDuration: "1.5s",
            animationFillMode: "forwards",
            animationDirection: "normal",
            animationIterationCount: "1",
            animationName: "",
            position: "fixed",
            display: "initial",
            height: props.startHeight + "px",
            width: props.startWidth + "px",
            overflow: "hidden",
            backgroundColor: "#FFFFFF",
            transform: "",
            left: "",
            top: "",
            zIndex: props.zIndex,
            marginTop: "env(safe-area-inset-top)",
        };
        var transY = props.endHeight / props.startHeight;
        var transX = props.endWidth / props.startWidth;
        switch (status) {
            case SeeMoreStatus.PopFadeOutAndMove:
                baseStyle.animationName = renderer.renderKeyframe(_outerOutKeyframeGen, props);
                break;
            case SeeMoreStatus.PopFadeIn:
            case SeeMoreStatus.PoppedOut:
                baseStyle.left = props.endLeft + "px";
                baseStyle.top = props.endTop + "px";
                baseStyle.transform = "scaleX(" + transX + ") scaleY(" + transY + ")";
                break;
            case SeeMoreStatus.ReturnFadeOutAndMove:
                baseStyle.animationName = renderer.renderKeyframe(_outerInKeyframeGen, props);
                break;
            case SeeMoreStatus.ReturnFadeIn:
            case SeeMoreStatus.NotInUse:
                return null;
        }
        return baseStyle;
    };
    return CustomControlOuterPopAnimationHelper;
}());
function _outerOutKeyframeGen(props) {
    var _a;
    var transY = props.endHeight / props.startHeight;
    var transX = props.endWidth / props.startWidth;
    return _a = {},
        _a["0%"] = {
            left: props.startLeft + "px",
            top: props.startTop + "px",
            transform: "scaleX(1) scaleY(1)",
        },
        _a["25%"] = {
            left: props.startLeft + "px",
            top: props.startTop + "px",
            transform: "scaleX(1) scaleY(1)",
        },
        _a["65%"] = {
            left: props.endLeft + "px",
            top: props.endTop + "px",
            transform: "scaleX(1) scaleY(1)",
        },
        _a["70%"] = {
            left: props.endLeft + "px",
            top: props.endTop + "px",
            transform: "scaleX(1) scaleY(" + transY + ")",
        },
        _a["75%"] = {
            left: props.endLeft + "px",
            top: props.endTop + "px",
            transform: "scaleX(" + transX + ") scaleY(" + transY + ")",
        },
        _a["100%"] = {
            left: props.endLeft + "px",
            top: props.endTop + "px",
            transform: "scaleX(" + transX + ") scaleY(" + transY + ")",
        },
        _a;
}
function _outerInKeyframeGen(props) {
    var _a;
    var transY = props.endHeight / props.startHeight;
    var transX = props.endWidth / props.startWidth;
    return _a = {},
        _a["100%"] = {
            left: props.startLeft + "px",
            top: props.startTop + "px",
            transform: "scaleX(1) scaleY(1)",
        },
        _a["75%"] = {
            left: props.startLeft + "px",
            top: props.startTop + "px",
            transform: "scaleX(1) scaleY(1)",
        },
        _a["35%"] = {
            left: props.endLeft + "px",
            top: props.endTop + "px",
            transform: "scaleX(1) scaleY(1)",
        },
        _a["30%"] = {
            left: props.endLeft + "px",
            top: props.endTop + "px",
            transform: "scaleX(1) scaleY(" + transY + ")",
        },
        _a["25%"] = {
            left: props.endLeft + "px",
            top: props.endTop + "px",
            transform: "scaleX(" + transX + ") scaleY(" + transY + ")",
        },
        _a["0%"] = {
            left: props.endLeft + "px",
            top: props.endTop + "px",
            transform: "scaleX(" + transX + ") scaleY(" + transY + ")",
        },
        _a;
}
export { CustomControlOuterPopAnimationHelper };

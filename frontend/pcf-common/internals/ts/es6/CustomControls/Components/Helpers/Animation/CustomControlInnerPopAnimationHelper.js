import { SeeMoreStatus } from "./ICustomControlAnimationProps";
var CustomControlInnerPopAnimationHelper = (function () {
    function CustomControlInnerPopAnimationHelper() {
    }
    CustomControlInnerPopAnimationHelper.generateInnerClass = function (renderer, status, props) {
        var baseStyle = {
            animationFillMode: "forwards",
            animationDirection: "normal",
            animationIterationCount: "1",
            display: "block",
            backgroundColor: "#FFFFFF",
            opacity: "",
            height: "",
            width: "",
            transform: "",
            marginTop: "",
            marginLeft: "",
            marginRight: "",
            paddingTop: "",
            animationName: "",
            animationDuration: "",
            webkitBackfaceVisibility: "hidden",
            backfaceVisibility: "hidden",
            position: "",
            webkitFontSmoothing: "subpixel-antialiased",
            webkitFilter: "blur(0)",
        };
        var transY = props.startHeight / props.endHeight;
        var transX = props.startWidth / props.endWidth;
        var margLeft = (-1 * (props.endWidthInner - props.startWidth)) / 2;
        var margTop = (-1 * (props.endHeightInner - props.startHeight)) / 2;
        var padTop = "";
        if (margTop !== Math.floor(margTop)) {
            margTop = Math.floor(margTop);
            padTop = "1px";
        }
        if (margLeft !== Math.floor(margLeft)) {
            margLeft = Math.floor(margLeft);
        }
        var newProps = Object.assign({}, props, {
            margLeft: margLeft,
            margTop: margTop,
            padTop: padTop,
            transX: transX,
            transY: transY,
        });
        switch (status) {
            case SeeMoreStatus.PopFadeOutAndMove:
                baseStyle.animationName = renderer.renderKeyframe(_innerOutKeyframeGen, newProps);
                baseStyle.animationDuration = "1.4s";
                break;
            case SeeMoreStatus.PopFadeIn:
                baseStyle.animationName = renderer.renderKeyframe(_fadeInAnimation, newProps);
                baseStyle.animationDuration = ".5s";
                baseStyle.height = props.endHeightInner + "px";
                baseStyle.width = props.endWidthInner + "px";
                baseStyle.transform = "translateZ(0) perspective(1px) scaleX(" + transX + ") scaleY(" + transY + ")";
                baseStyle.marginTop = margTop + "px";
                baseStyle.paddingTop = padTop;
                baseStyle.marginLeft = props.isRTL ? "0px" : margLeft + "px";
                baseStyle.marginRight = props.isRTL ? margLeft + "px" : "0px";
                baseStyle.position = _isIE() ? "" : "fixed";
                break;
            case SeeMoreStatus.PoppedOut:
                baseStyle.height = props.endHeightInner + "px";
                baseStyle.width = props.endWidthInner + "px";
                baseStyle.transform = "translateZ(0) perspective(1px) scaleX(" + transX + ") scaleY(" + transY + ")";
                baseStyle.marginTop = margTop + "px";
                baseStyle.marginLeft = props.isRTL ? "0px" : margLeft + "px";
                baseStyle.marginRight = props.isRTL ? margLeft + "px" : "0px";
                baseStyle.opacity = "1";
                baseStyle.position = _isIE() ? "" : "fixed";
                break;
            case SeeMoreStatus.ReturnFadeOutAndMove:
                baseStyle.animationName = renderer.renderKeyframe(_innerInKeyframeGen, newProps);
                baseStyle.animationDuration = "1.4s";
                break;
            case SeeMoreStatus.ReturnFadeIn:
                baseStyle.animationDuration = ".5s";
                baseStyle.width = "100%";
                baseStyle.animationName = renderer.renderKeyframe(_fadeInAnimation, newProps);
                break;
        }
        return baseStyle;
    };
    return CustomControlInnerPopAnimationHelper;
}());
function _innerOutKeyframeGen(props) {
    var _a;
    return _a = {},
        _a["0%"] = {
            opacity: 1,
            height: props.startHeight + "px",
            width: props.startWidth + "px",
            transform: "translateZ(0) perspective(1px) scaleX(1) scaleY(1)",
            marginTop: "0px",
            marginLeft: "0px",
            marginRight: "0px",
            paddingTop: "0px",
        },
        _a["25%"] = {
            opacity: 0,
            height: props.startHeight + "px",
            width: props.startWidth + "px",
            transform: "translateZ(0) perspective(1px) scaleX(1) scaleY(1)",
            marginTop: "0px",
            marginLeft: "0px",
            marginRight: "0px",
            paddingTop: "0px",
        },
        _a["30%"] = {
            opacity: 0,
            height: props.endHeightInner + "px",
            width: props.endWidthInner + "px",
            transform: "translateZ(0) perspective(1px) scaleX(1) scaleY(1)",
            marginTop: "0px",
            marginLeft: "0px",
            marginRight: "0px",
            paddingTop: "0px",
        },
        _a["40%"] = {
            opacity: 0,
            height: props.endHeightInner + "px",
            width: props.endWidthInner + "px",
            transform: "translateZ(0) perspective(1px) scaleX(" + props.transX + ") scaleY(" + props.transY + ")",
            marginTop: props.margTop + "px",
            marginLeft: props.isRTL ? "0px" : props.margLeft + "px",
            marginRight: props.isRTL ? props.margLeft + "px" : "0px",
            paddingTop: props.padTop,
        },
        _a["100%"] = {
            opacity: 0,
            height: props.endHeightInner + "px",
            width: props.endWidthInner + "px",
            transform: "translateZ(0) perspective(1px) scaleX(" + props.transX + ") scaleY(" + props.transY + ")",
            marginTop: props.margTop + "px",
            marginLeft: props.isRTL ? "0px" : props.margLeft + "px",
            marginRight: props.isRTL ? props.margLeft + "px" : "0px",
            paddingTop: props.padTop,
        },
        _a;
}
function _innerInKeyframeGen(props) {
    var _a;
    return _a = {},
        _a["0%"] = {
            opacity: 1,
            height: props.endHeightInner + "px",
            width: props.endWidthInner + "px",
            transform: "translateZ(0) perspective(1px) scaleX(" + props.transX + ") scaleY(" + props.transY + ")",
            marginTop: props.margTop + "px",
            marginLeft: props.isRTL ? "0px" : props.margLeft + "px",
            marginRight: props.isRTL ? props.margLeft + "px" : "0px",
            paddingTop: props.padTop,
        },
        _a["25%"] = {
            opacity: 0,
            height: props.endHeightInner + "px",
            width: props.endWidthInner + "px",
            transform: "translateZ(0) perspective(1px) scaleX(" + props.transX + ") scaleY(" + props.transY + ")",
            marginTop: props.margTop + "px",
            marginLeft: props.isRTL ? "0px" : props.margLeft + "px",
            marginRight: props.isRTL ? props.margLeft + "px" : "0px",
            paddingTop: props.padTop,
        },
        _a["60%"] = {
            opacity: 0,
            height: props.endHeightInner + "px",
            width: props.endWidthInner + "px",
            transform: "translateZ(0) perspective(1px) scaleX(" + props.transX + ") scaleY(" + props.transY + ")",
            marginTop: props.margTop + "px",
            marginLeft: props.isRTL ? "0px" : props.margLeft + "px",
            marginRight: props.isRTL ? props.margLeft + "px" : "0px",
            paddingTop: props.padTop,
        },
        _a["70%"] = {
            opacity: 0,
            height: props.endHeightInner + "px",
            width: props.endWidthInner + "px",
            transform: "translateZ(0) perspective(1px) scaleX(1) scaleY(1)",
            marginTop: "0px",
            marginLeft: "0px",
            marginRight: "0px",
            paddingTop: "0px",
        },
        _a["75%"] = {
            opacity: 0,
            height: props.startHeight + "px",
            width: props.startWidth + "px",
            transform: "translateZ(0) perspective(1px) scaleX(1) scaleY(1)",
            marginTop: "0px",
            marginLeft: "0px",
            marginRight: "0px",
            paddingTop: "0px",
        },
        _a["100%"] = {
            opacity: 0,
            height: props.startHeight + "px",
            width: props.startWidth + "px",
            transform: "translateZ(0) perspective(1px) scaleX(1) scaleY(1)",
            marginTop: "0px",
            marginLeft: "0px",
            marginRight: "0px",
            paddingTop: "0px",
        },
        _a;
}
function _fadeInAnimation() {
    var _a;
    return _a = {},
        _a["0%"] = {
            opacity: 0,
        },
        _a["100%"] = {
            opacity: 1,
        },
        _a;
}
function _isIE() {
    return !!window.navigator.userAgent.match("MSIE") || !!window.navigator.userAgent.match("Trident");
}
export { CustomControlInnerPopAnimationHelper };

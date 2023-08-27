var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as ReactDOM from "react-dom";
import { applyIFlexboxContainerProp, getCssClassName as getIFlexboxContainerCssClassName, } from "./IFlexboxContainerStyle";
import { ComponentBase } from "./ComponentBase";
import * as ReactFela from "react-fela";
import { ruleGen } from "./FelaConnectHelper";
import { CustomControlSeeMoreStyleHelper } from "../../CustomControls/Components/Helpers/CustomControlSeeMoreStyleHelper";
import { instance as XrmProxy } from "../../CustomControls/Utilities/XrmProxy";
import { COMPONENT_NAME } from "../../CustomControls/Utilities/TelemetryManager";
var PRIMITIVE_COMPONENT_NAME = COMPONENT_NAME + ".Primitive.ScrollView";
var InnerScrollView = (function (_super) {
    __extends(InnerScrollView, _super);
    function InnerScrollView(props) {
        var _this = _super.call(this, props) || this;
        _this._setInnerViewRef = _this._setInnerViewRef.bind(_this);
        _this._onScrollHandler = _this._onScrollHandler.bind(_this);
        _this._ua = window.navigator.userAgent;
        return _this;
    }
    InnerScrollView.prototype.componentDidUpdate = function (preProps) {
        if (this.props.scrollToId !== preProps.scrollToId && this.props.scrollToId && this._scrollViewRef) {
            var scrollToElement = document.getElementById(this.props.scrollToId);
            var scrollViewDom = ReactDOM.findDOMNode(this);
            this._scrollToContent(scrollViewDom, scrollToElement);
        }
    };
    InnerScrollView.prototype.componentDidMount = function () {
        if (this.props.scrollToId && this._scrollViewRef) {
            var scrollToElement = document.getElementById(this.props.scrollToId);
            var scrollViewDom = ReactDOM.findDOMNode(this);
            this._scrollToContent(scrollViewDom, scrollToElement);
        }
    };
    InnerScrollView.prototype._scrollToContentHorizontalLTR = function (scrollParent, scrollToElement) {
        if (scrollParent.scrollLeft + scrollParent.offsetWidth > scrollToElement.offsetLeft + scrollToElement.offsetWidth) {
            scrollParent.scrollLeft = scrollToElement.offsetLeft + scrollToElement.offsetWidth - scrollParent.offsetWidth;
        }
        else if (scrollParent.scrollLeft < scrollToElement.offsetLeft) {
            var intendedOffset = scrollToElement.offsetLeft;
            scrollParent.scrollLeft = intendedOffset;
            if (scrollParent.scrollLeft !== intendedOffset && this._isMobileSafari()) {
                scrollParent.scrollLeft = scrollParent.scrollLeft - 1;
            }
        }
    };
    InnerScrollView.prototype._scrollToContentHorizontalRTLIEorEdge = function (scrollParent, scrollToElement) {
        var scrollToElementValue = scrollParent.offsetWidth - scrollToElement.offsetLeft;
        if (scrollParent.scrollLeft < scrollToElementValue - scrollToElement.offsetWidth) {
            scrollParent.scrollLeft = scrollToElementValue - scrollToElement.offsetWidth;
        }
        else if (scrollParent.scrollLeft + scrollParent.offsetWidth >
            scrollToElementValue + scrollToElement.offsetWidth) {
            scrollParent.scrollLeft = scrollToElementValue - scrollParent.offsetWidth;
        }
    };
    InnerScrollView.prototype._scrollToContent = function (scrollParent, scrollToElement) {
        if (scrollParent && scrollToElement) {
            if (this.props.horizontal) {
                if (this.props.isRTL && this._isIEorEdge()) {
                    this._scrollToContentHorizontalRTLIEorEdge(scrollParent, scrollToElement);
                }
                else {
                    this._scrollToContentHorizontalLTR(scrollParent, scrollToElement);
                }
            }
            else if (scrollParent.scrollTop + scrollParent.clientHeight <
                scrollToElement.offsetTop + scrollToElement.clientHeight) {
                scrollParent.scrollTop = scrollToElement.offsetTop + scrollToElement.clientHeight - scrollParent.clientHeight;
            }
            else if (scrollToElement.offsetTop < scrollParent.scrollTop) {
                scrollParent.scrollTop = scrollToElement.offsetTop;
            }
        }
    };
    InnerScrollView.prototype._isIEorEdge = function () {
        return this.isIE || this.isEdge;
    };
    InnerScrollView.prototype._isMobileSafari = function () {
        var iOS = !!this._ua.match(/iPad/i) || !!this._ua.match(/iPod/i) || !!this._ua.match(/iPhone/i);
        var webkit = !!this._ua.match(/WebKit/i);
        var iOSSafari = iOS && webkit && !this._ua.match(/CriOS/i);
        return iOSSafari;
    };
    InnerScrollView.prototype._onScrollHandler = function (event) {
        if (this.props.onScroll) {
            this.props.onScroll(event);
        }
        if (this.props.onScrollToBottom) {
            var scrollViewDom = ReactDOM.findDOMNode(this);
            if (Math.ceil(scrollViewDom.scrollTop) + scrollViewDom.clientHeight >= scrollViewDom.scrollHeight) {
                this.props.onScrollToBottom();
            }
        }
    };
    InnerScrollView.prototype.getElementName = function () {
        return this.props.semanticTag ? this.props.semanticTag : "div";
    };
    InnerScrollView.prototype.getElementProps = function () {
        return {
            onClick: this.props.onClick,
            onScroll: this.props.onScroll || this.props.onScrollToBottom ? this._onScrollHandler : undefined,
            ref: this.props.scrollToId || this.props.refCallback ? this._setInnerViewRef : undefined,
        };
    };
    InnerScrollView.prototype.scrollToChild = function (child) {
        if (!child) {
            var error = new Error("child must be specified");
            XrmProxy.Reporting.reportFailure(PRIMITIVE_COMPONENT_NAME, error);
            throw error;
        }
        var scrollViewDom = ReactDOM.findDOMNode(this);
        var childDom = ReactDOM.findDOMNode(child);
        this._scrollToContent(scrollViewDom, childDom);
    };
    InnerScrollView.prototype._setInnerViewRef = function (item) {
        if (this.props.refCallback) {
            this.props.refCallback(this);
        }
        this._scrollViewRef = item;
    };
    InnerScrollView.prototype.getFlexClassName = function (style) {
        return getIFlexboxContainerCssClassName(style ? style.display : null);
    };
    InnerScrollView.prototype.getElementClassName = function () {
        var className = _super.prototype.getElementClassName.call(this);
        if (this.props && this.props.className) {
            className += " " + this.props.className;
        }
        if (this.props.style && InnerScrollView.isElementScrollable(this.props.style)) {
            className +=
                CustomControlSeeMoreStyleHelper.getInstance().getDisableScrollStyle() && !this.props.isWithinATopMostSeeMore
                    ? " webkitScrollAuto"
                    : " webkitScroll";
        }
        return className;
    };
    InnerScrollView.displayName = "ScrollView";
    return InnerScrollView;
}(ComponentBase));
function scrollViewRuleGen(props) {
    if (props && props.style) {
        var horizontalStyle = props.horizontal
            ? Object.assign({}, props.style, { overflowX: "scroll", flexDirection: "row" })
            : Object.assign({}, props.style, { overflowY: "scroll", flexDirection: "column" });
        var containerStyle = props.contentContainerStyle
            ? Object.assign({}, props.style, props.contentContainerStyle)
            : props.style;
        var style = Object.assign({}, horizontalStyle, containerStyle);
        return Object.assign(props.style, style, ruleGen(props), applyIFlexboxContainerProp(style));
    }
    return {};
}
var rules = function (props) {
    return { rule: scrollViewRuleGen(props) };
};
var ScrollView = ReactFela.connect(rules)(InnerScrollView);
export { InnerScrollView, ScrollView };

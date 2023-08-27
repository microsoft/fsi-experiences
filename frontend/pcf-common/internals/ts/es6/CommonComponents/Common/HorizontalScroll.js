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
import * as React from "react";
import * as ReactDOM from "react-dom";
import { ComponentBase } from "../Primitive/ComponentBase";
import { Button } from "../Primitive/Button";
import { View } from "../Primitive/View";
import { ScrollView } from "../Primitive/ScrollView";
import { MicrosoftIconSymbol } from "../FontIcon/MicrosoftIconSymbol";
import { MicrosoftIcon } from "../FontIcon/MicrosoftIcon";
import * as ReactFela from "react-fela";
import { rules } from "../Primitive/FelaConnectHelper";
var SCROLL_THRESHOLD = 1;
var FULL_BROWSER_TRANSLATE_DURATION = 500;
var TABLET_TRANSLATE_DURATION = 500;
var MOBILE_BROWSER_TRANSLATE_DURATION = 500;
var InnerHorizontalScroll = (function (_super) {
    __extends(InnerHorizontalScroll, _super);
    function InnerHorizontalScroll(props) {
        var _this = _super.call(this, props) || this;
        _this._recalculateState = _this._recalculateState.bind(_this);
        _this._onNextClick = _this._onNextClick.bind(_this);
        _this._onPrevClick = _this._onPrevClick.bind(_this);
        _this._onNextKeyDown = _this._onNextKeyDown.bind(_this);
        _this._onPrevKeyDown = _this._onPrevKeyDown.bind(_this);
        _this._saveScrollViewRefCallback = _this._saveScrollViewRefCallback.bind(_this);
        _this.state = {
            prevArrowDisabled: true,
            nextArrowDisabled: true,
        };
        _this._userAgent = window.navigator.userAgent;
        return _this;
    }
    InnerHorizontalScroll.prototype.getElementProps = function () {
        var defaultArrowWidth = 20;
        var arrowButtonStyle = this.props.arrowButtonStyle || {};
        var scrollViewStyle = this.props.scrollViewStyle || {};
        var returnElementProps = Object.assign({}, this.props, {
            startChildIndex: this.props.startChildIndex || 0,
            arrowWidth: this.props.arrowWidth || arrowButtonStyle.width || defaultArrowWidth,
            arrowButtonStyle: arrowButtonStyle,
            scrollViewStyle: scrollViewStyle,
        });
        return returnElementProps;
    };
    InnerHorizontalScroll.prototype.componentDidMount = function () {
        var props = this.getElementPropsInternal();
        if (props.startChildIndex !== 0) {
            this._scrollToChildByIndex(props.startChildIndex);
        }
        this._currentChildIndex = props.startChildIndex;
    };
    InnerHorizontalScroll.prototype.componentDidUpdate = function () {
        var props = this.getElementPropsInternal();
        if (!props.style.height) {
            var scrollableContainer = this._getScrollableContainer();
            if (scrollableContainer) {
                var newHeight = scrollableContainer.scrollHeight + "px";
                scrollableContainer.parentElement.style.height = newHeight;
                scrollableContainer.parentElement.style.minHeight = newHeight;
            }
        }
        this._recalculateState();
    };
    InnerHorizontalScroll.prototype._saveScrollViewRefCallback = function (ref) {
        this._scrollView = ref;
    };
    InnerHorizontalScroll.prototype._onPrevKeyDown = function (e) {
        if (this.props.onPrevArrowKeyDown) {
            this.props.onPrevArrowKeyDown(e, this._currentChildIndex);
        }
    };
    InnerHorizontalScroll.prototype._onNextKeyDown = function (e) {
        if (this.props.onNextArrowKeyDown) {
            this.props.onNextArrowKeyDown(e, this._currentChildIndex);
        }
    };
    InnerHorizontalScroll.prototype._onPrevClick = function (e) {
        this._slideByArrow(false);
        e.stopPropagation();
        if (this.props.onPrevArrowClick) {
            this.props.onPrevArrowClick(e, this._currentChildIndex);
        }
    };
    InnerHorizontalScroll.prototype._onNextClick = function (e) {
        this._slideByArrow(true);
        e.stopPropagation();
        if (this.props.onNextArrowClick) {
            this.props.onNextArrowClick(e, this._currentChildIndex);
        }
    };
    InnerHorizontalScroll.prototype._slideByArrow = function (isSlideNext) {
        var childIndexToScroll = this._getChildIndexToScroll(isSlideNext);
        this._scrollToChildByIndex(childIndexToScroll);
    };
    InnerHorizontalScroll.prototype._getScrollLeft = function (scrollableContainer) {
        if (this.props.isRTL) {
            if (this._isBrowserIEorEdge() || this._isBrowserFirefox()) {
                return Math.abs(scrollableContainer.scrollLeft);
            }
            if (this._isBrowserChromeOrAndroid() || this._isBrowserSafari()) {
                return scrollableContainer.scrollWidth - scrollableContainer.clientWidth + scrollableContainer.scrollLeft;
            }
        }
        return scrollableContainer.scrollLeft;
    };
    InnerHorizontalScroll.prototype._getPrevIcon = function () {
        var arrow = this.props.prevArrowIconType;
        if (this.props.isRTL && arrow === 56) {
            arrow = 13;
        }
        return this._renderArrowIcon(arrow, "<");
    };
    InnerHorizontalScroll.prototype._getNextIcon = function () {
        var arrow = this.props.nextArrowIconType;
        if (this.props.isRTL && arrow === 13) {
            arrow = 56;
        }
        return this._renderArrowIcon(arrow, ">");
    };
    InnerHorizontalScroll.prototype._getCurrentChildIndex = function (index, isSlideNext) {
        var scrollContainer = this._getScrollableContainer();
        var children = scrollContainer.children;
        var totalWidth = 0;
        var i = index;
        if ((isSlideNext && !this.props.isRTL) || (!isSlideNext && this.props.isRTL)) {
            if (this._getTotalWidthIncludingMargins(children[i]) >= scrollContainer.clientWidth) {
                return this._boundIndex(++i, children);
            }
            for (i; i < children.length; i++) {
                totalWidth += this._getTotalWidthIncludingMargins(children[i]);
                if (totalWidth >= scrollContainer.clientWidth) {
                    return this._boundIndex(i, children);
                }
            }
        }
        else {
            if (this._getTotalWidthIncludingMargins(children[i]) >= scrollContainer.clientWidth) {
                return this._boundIndex(--i, children);
            }
            for (i; i >= 0; i--) {
                totalWidth += this._getTotalWidthIncludingMargins(children[i]);
                if (totalWidth >= scrollContainer.clientWidth) {
                    return this._boundIndex(i, children);
                }
            }
        }
        return this._boundIndex(i, children);
    };
    InnerHorizontalScroll.prototype._boundIndex = function (newIndex, children) {
        newIndex = Math.min(newIndex, children.length - 1);
        newIndex = Math.max(newIndex, 0);
        return newIndex;
    };
    InnerHorizontalScroll.prototype._getChildIndexToScroll = function (isSlideNext) {
        this._currentChildIndex = this._getCurrentChildIndex(this._currentChildIndex, isSlideNext);
        return this._currentChildIndex;
    };
    InnerHorizontalScroll.prototype._recalculateState = function () {
        var scrollableContainer = this._getScrollableContainer();
        var scrollLeft = this._getScrollLeft(scrollableContainer);
        var prevArrowDisabled = scrollLeft <= SCROLL_THRESHOLD;
        var nextArrowDisabled = scrollLeft + scrollableContainer.offsetWidth + SCROLL_THRESHOLD >= scrollableContainer.scrollWidth - 1;
        if (prevArrowDisabled !== this.state.prevArrowDisabled || nextArrowDisabled !== this.state.nextArrowDisabled) {
            this.setState({
                prevArrowDisabled: prevArrowDisabled,
                nextArrowDisabled: nextArrowDisabled,
            });
        }
    };
    InnerHorizontalScroll.prototype._getChildByIndex = function (childIndex) {
        var scrollableContainer = this._getScrollableContainer();
        childIndex = childIndex && childIndex > 0 ? childIndex : 0;
        var children = scrollableContainer.children;
        return children ? children[childIndex] : null;
    };
    InnerHorizontalScroll.prototype._scrollToChildByIndex = function (childIndex) {
        var childToScroll = this._getChildByIndex(childIndex);
        if (childToScroll) {
            this._scrollToChild(childToScroll);
        }
    };
    InnerHorizontalScroll.prototype._scrollToChild = function (child) {
        if (!child) {
            var error = new Error("child must be specified");
            throw error;
        }
        this._scrollToContent(this._getScrollableContainer(), child);
    };
    InnerHorizontalScroll.prototype._scrollToWithTransition = function (scrollParent, scrollLeft) {
        var originalScrollLeft = scrollParent.scrollLeft;
        var changeInScrollLeft = scrollLeft - originalScrollLeft;
        var currentTime = 0;
        var increment = 10;
        var duration = this._determineDuration();
        this._scrollTransition(scrollParent, currentTime, originalScrollLeft, increment, changeInScrollLeft, duration);
    };
    InnerHorizontalScroll.prototype._scrollTransition = function (scrollParent, currentTime, originalScrollLeft, increment, changeInScrollLeft, duration) {
        var _context = this;
        var scrollTransition = function () {
            currentTime += increment;
            scrollParent.scrollLeft = _context._scrollEase(currentTime, originalScrollLeft, changeInScrollLeft, duration);
            if (currentTime < duration) {
                setTimeout(scrollTransition, increment);
            }
        };
        scrollTransition();
    };
    InnerHorizontalScroll.prototype._scrollEase = function (currentTime, originalScrollLeft, changeInScrollLeft, duration) {
        currentTime = currentTime / (duration / 2);
        if (currentTime < 1) {
            return (changeInScrollLeft * Math.pow(currentTime, 2)) / 2 + originalScrollLeft;
        }
        currentTime--;
        return (-1 * changeInScrollLeft * (Math.pow(currentTime, 2) - 2 * currentTime - 1)) / 2 + originalScrollLeft;
    };
    InnerHorizontalScroll.prototype._getScrollableContainer = function () {
        return ReactDOM.findDOMNode(this._scrollView);
    };
    InnerHorizontalScroll.prototype._renderPrevArrowButton = function () {
        var props = this.getElementPropsInternal();
        var buttonPrevStyle = Object.assign({
            position: "absolute",
            left: "0px",
            top: "0px",
            width: props.arrowWidth + "px",
            boxSizing: "border-box",
            alignItems: "center",
        }, this.props.arrowButtonStyle);
        var id = this.props.id + "_scrollPrevArrow";
        return (React.createElement(Button, { id: id, key: id, accessibilityHidden: this.state.prevArrowDisabled, accessibilityLabel: this.props.isRTL ? this.props.scrollRightAccessibilityLabel : this.props.scrollLeftAccessibilityLabel, accessibilityHasPopup: true, tabIndex: -1, disabled: this.state.prevArrowDisabled, style: buttonPrevStyle, onFocus: this.props.onFocus, onClick: this._onPrevClick, onKeyDown: this._onPrevKeyDown }, this.props.isRTL ? this._getNextIcon() : this._getPrevIcon()));
    };
    InnerHorizontalScroll.prototype._renderNextArrowButton = function () {
        var props = this.getElementPropsInternal();
        var buttonNextStyle = Object.assign({
            position: "absolute",
            right: "0px",
            top: "0px",
            width: props.arrowWidth + "px",
            boxSizing: "border-box",
            alignItems: "center",
        }, this.props.arrowButtonStyle);
        var id = this.props.id + "_scrollNextArrow";
        return (React.createElement(Button, { id: id, key: id, accessibilityHidden: this.state.nextArrowDisabled, accessibilityLabel: this.props.isRTL ? this.props.scrollLeftAccessibilityLabel : this.props.scrollRightAccessibilityLabel, accessibilityHasPopup: true, tabIndex: -1, disabled: this.state.nextArrowDisabled, style: buttonNextStyle, onFocus: this.props.onFocus, onClick: this._onNextClick, onKeyDown: this._onNextKeyDown }, this.props.isRTL ? this._getPrevIcon() : this._getNextIcon()));
    };
    InnerHorizontalScroll.prototype._renderArrowIcon = function (arrowIconType, defaultText) {
        if (arrowIconType) {
            var iconKey = "scroll" + MicrosoftIconSymbol[arrowIconType] + "Icon";
            return React.createElement(MicrosoftIcon, { key: iconKey, type: arrowIconType });
        }
        return defaultText;
    };
    InnerHorizontalScroll.prototype._isBrowserIEorEdge = function () {
        return this.isEdge || this.isIE;
    };
    InnerHorizontalScroll.prototype._isBrowserFirefox = function () {
        return !!this._userAgent.match("Firefox");
    };
    InnerHorizontalScroll.prototype._isBrowserChromeOrAndroid = function () {
        return (!!this._userAgent.match("Chrome") || !!this._userAgent.match("Android") || !!this._userAgent.match("AppleWebKit"));
    };
    InnerHorizontalScroll.prototype._isBrowserSafari = function () {
        return !!this._userAgent.match("Safari");
    };
    InnerHorizontalScroll.prototype._scrollToContent = function (scrollParent, scrollToElement) {
        if (scrollParent && scrollToElement) {
            this._scrollToContentHorizontal(scrollParent, scrollToElement);
        }
    };
    InnerHorizontalScroll.prototype._scrollToContentHorizontal = function (scrollParent, scrollToElement) {
        var scrollableDistance = scrollParent.scrollWidth - scrollParent.offsetWidth;
        var children = scrollParent.children;
        var index = this._getChildIndex(scrollToElement);
        var scrollLeft = 0;
        for (var i = 0; i < index; i++) {
            scrollLeft += this._getTotalWidthIncludingMargins(children[i]);
        }
        var newScrollLeft;
        if (this.props.isRTL) {
            scrollLeft += parseInt(this._getCalculatedStyle(scrollToElement).marginRight, 10);
            newScrollLeft = this._isBrowserIEorEdge() ? scrollLeft : scrollableDistance - scrollLeft;
        }
        else {
            scrollLeft += parseInt(this._getCalculatedStyle(scrollToElement).marginLeft, 10);
            newScrollLeft = scrollLeft;
        }
        this._scrollToWithTransition(scrollParent, newScrollLeft);
    };
    InnerHorizontalScroll.prototype._getCalculatedStyle = function (element) {
        return element.currentStyle || window.getComputedStyle(element);
    };
    InnerHorizontalScroll.prototype._getTotalWidthIncludingMargins = function (element) {
        var style = this._getCalculatedStyle(element);
        var width = parseInt(style.width, 10);
        if (isNaN(width)) {
            width = element.offsetWidth;
        }
        var marginLeft = style.marginLeft.indexOf("px") < 0
            ? parseInt(getComputedStyle(element).marginLeft, 10)
            : parseInt(style.marginLeft, 10);
        var marginRight = style.marginRight.indexOf("px") < 0
            ? parseInt(getComputedStyle(element).marginRight, 10)
            : parseInt(style.marginRight, 10);
        return width + marginLeft + marginRight;
    };
    InnerHorizontalScroll.prototype._getChildIndex = function (child) {
        var i = 0;
        while ((child = child && child.previousSibling) != null) {
            i++;
        }
        return i;
    };
    InnerHorizontalScroll.prototype._determineDuration = function () {
        var duration;
        if (this._getScrollableContainer().clientWidth <= 550) {
            duration = MOBILE_BROWSER_TRANSLATE_DURATION;
        }
        else if (this._getScrollableContainer().clientWidth <= 1200) {
            duration = TABLET_TRANSLATE_DURATION;
        }
        else {
            duration = FULL_BROWSER_TRANSLATE_DURATION;
        }
        return duration;
    };
    InnerHorizontalScroll.prototype.render = function () {
        var props = this.getElementPropsInternal();
        Object.assign(props.style, {
            display: "block",
            position: "relative",
            paddingLeft: props.arrowWidth + "px",
            paddingRight: props.arrowWidth + "px",
            overflow: "hidden",
        }, this.props.style);
        var scrollViewStyle = Object.assign({}, this.props.scrollViewStyle, {
            position: "relative",
        });
        var control = (React.createElement(View, { style: props.style, isRequestedMeasuring: true, onMeasuring: this._recalculateState, accessibilityLabel: this.props.accessibilityLabel },
            this.props.isRTL ? this._renderNextArrowButton() : this._renderPrevArrowButton(),
            React.createElement(ScrollView, { semanticTag: this.props.semanticTag, key: "HorizontalScrollContent", refCallback: this._saveScrollViewRefCallback, horizontal: true, style: scrollViewStyle, accessibilityLabel: this.props.accessibilityLabel, onScroll: this._recalculateState, role: this.props.role, isRTL: this.props.isRTL }, this.props.children),
            this.props.isRTL ? this._renderPrevArrowButton() : this._renderNextArrowButton()));
        return control;
    };
    InnerHorizontalScroll.displayName = "HorizontalScroll";
    InnerHorizontalScroll.defaultProps = {
        scrollRightAccessibilityLabel: "Scroll right the content",
        scrollLeftAccessibilityLabel: "Scroll left the content",
    };
    return InnerHorizontalScroll;
}(ComponentBase));
var HorizontalScroll = ReactFela.connect(rules)(InnerHorizontalScroll);
export { InnerHorizontalScroll, HorizontalScroll, };

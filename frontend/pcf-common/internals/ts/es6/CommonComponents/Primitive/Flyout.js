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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import * as React from "react";
import * as ReactDOM from "react-dom";
import { FlyoutDirection } from "./Flyout/FlyoutDirection";
import * as FlyoutUtils from "./Flyout/Utils";
import { View } from "./View";
import { MeasuringHandler } from "../Common/MeasuringHandler/MeasuringHandler";
import { CustomControlFlyoutParentHelper } from "../../CustomControls/Components/Helpers/CustomControlFlyoutParentHelper";
import { CustomControlSeeMoreStyleHelper } from "../../CustomControls/Components/Helpers/CustomControlSeeMoreStyleHelper";
import { instance as XrmProxy } from "../../CustomControls/Utilities/XrmProxy";
import { COMPONENT_NAME } from "../../CustomControls/Utilities/TelemetryManager";
import { FlyoutPopupManager } from "../Common/FlyoutPopupManager/FlyoutPopupManager";
import { FlyoutPopupManagerSubscriberType, } from "../Common/FlyoutPopupManager/IFlyoutPopupManagerSubscriber";
import { CustomControlPortal } from "../../CustomControls/Components/Helpers/CustomControlPortal";
var FLYOUT_ROOT_NODE_ID = "__flyoutRootNode";
var PRIMITIVE_COMPONENT_NAME = COMPONENT_NAME + ".Primitive.Flyout";
var Flyout = (function (_super) {
    __extends(Flyout, _super);
    function Flyout(props) {
        var _this = _super.call(this, props) || this;
        _this._wasInnerFocusRequested = false;
        _this._seeMorePopupCount = null;
        _this._previousChildren = null;
        _this._resizeHandler = _this.debouncingFlyoutEvent(function () {
            if (_this._flyoutElement && _this._flyoutElement.offsetHeight > 0) {
                _this.updateDom();
            }
        });
        _this._scrollHandler = _this.debouncingFlyoutEvent(function () {
            if (!_this.getIsRelative() || _this.props.keepWhenRelativeToElementHides)
                return;
            _this._isOutOfRange = false;
            for (var i in _this._scrollableAncestors) {
                if (FlyoutUtils.isOutOfRange(_this._getRelativeElement(), _this._scrollableAncestors[i])) {
                    _this._isOutOfRange = true;
                    break;
                }
            }
            _this.updateDom();
        }, 100);
        _this.debouncingFlyoutEvent = _this.debouncingFlyoutEvent.bind(_this);
        _this.handleMeasuring = _this.handleMeasuring.bind(_this);
        _this.setFlyoutRef = _this.setFlyoutRef.bind(_this);
        _this.handlePointerDown = _this.handlePointerDown.bind(_this);
        _this.handleOnScroll = _this.props.enableTrackOnScroll ? _this.handleOnScroll.bind(_this) : null;
        _this.handleWindowBlur = _this.handleWindowBlur.bind(_this);
        _this._isClickInsideFlyout = _this._isClickInsideFlyout.bind(_this);
        _this._portal = React.createRef();
        return _this;
    }
    Object.defineProperty(Flyout.prototype, "flyoutElement", {
        get: function () {
            return this._flyoutElement;
        },
        enumerable: false,
        configurable: true
    });
    Flyout.prototype.getFlyoutRootId = function () {
        if (this.props.isPortalToElement && this.props.portalContainerId) {
            return this.props.portalContainerId;
        }
        return Flyout.generateFlyoutId(this.props.parentCustomControlId, this.props.groupId);
    };
    Flyout.prototype.componentDidMount = function () {
        var _this = this;
        if (this.props.hasDynamicContent) {
            this._measuringSubscriber = {
                onMeasure: this.handleMeasuring,
                getComponent: function () {
                    return _this._flyoutElement;
                },
                getContext: function () { return _this.context; },
            };
            MeasuringHandler.getInstance().addMeasuringSubscribers(this._measuringSubscriber);
        }
        this.updateDom();
        this._subscribeFlyoutPopupManager();
    };
    Flyout.generateFlyoutId = function (parentCustomControlId, groupId) {
        return ((parentCustomControlId ? parentCustomControlId + "|" : "") +
            (groupId ? FLYOUT_ROOT_NODE_ID + "_" + groupId : FLYOUT_ROOT_NODE_ID));
    };
    Flyout.prototype.componentDidUpdate = function () {
        this.updateDom();
        MeasuringHandler.getInstance().updateMeasuringSubscribers(this._measuringSubscriber);
    };
    Flyout.prototype.componentWillUnmount = function () {
        this.removeFromDom();
        this.resetFocus();
        if (this.props.hasDynamicContent) {
            MeasuringHandler.getInstance().removeMeasuringSubscribers(this._measuringSubscriber);
        }
        FlyoutPopupManager.getInstance().removeSubscribers(this._managerSubscriber);
    };
    Flyout.prototype._getRelativeElement = function () {
        var relativeToElement = document.getElementById(this.props.relativeToElementId);
        if (relativeToElement && this.props.relativeToElementIdSelector)
            relativeToElement = this.props.relativeToElementIdSelector(relativeToElement);
        return relativeToElement;
    };
    Flyout.prototype.calculatePosition = function () {
        var style = {
            position: "absolute",
            visibility: this._isOutOfRange ? "hidden" : "visible",
            overflowX: this.props.disableHorizontalScroll ? "hidden" : "auto",
            overflowY: this.props.disableVerticalScroll ? "hidden" : "auto",
        };
        var sizeToEnforce = Object.assign({}, this.props.size);
        var positionToSet;
        if (this.getIsAbsolute()) {
            positionToSet = this.props.position;
        }
        else if (this.getIsRelative()) {
            var relativeToElement = this._getRelativeElement();
            if (!relativeToElement) {
                style.visibility = "hidden";
                return style;
            }
            this._updateActualSize();
            var childElement = this.props.children;
            if (childElement && childElement.props && childElement.props.style) {
                var sizeRegex = new RegExp("^(\\d+)\\s*px$");
                var propStyle = childElement.props.style;
                var matches = void 0;
                if (!sizeToEnforce.maxHeight && propStyle.maxHeight && (matches = sizeRegex.exec(propStyle.maxHeight))) {
                    sizeToEnforce.maxHeight = parseInt(matches[1], 10);
                }
                if (!sizeToEnforce.maxWidth && propStyle.maxWidth && (matches = sizeRegex.exec(propStyle.maxWidth))) {
                    sizeToEnforce.maxWidth = parseInt(matches[1], 10);
                }
            }
            var sizeForCalc = {
                width: sizeToEnforce.width || (this._actualSize && this._actualSize.width),
                maxWidth: sizeToEnforce.maxWidth || (this._actualSize && this._actualSize.maxWidth),
                height: sizeToEnforce.height || (this._actualSize && this._actualSize.height),
                maxHeight: sizeToEnforce.maxHeight || (this._actualSize && this._actualSize.maxHeight),
            };
            var direction = this.props.flyoutDirection === null || this.props.flyoutDirection === undefined
                ? FlyoutDirection.right
                : this.props.flyoutDirection;
            var secondaryDirection = null;
            if (this._lastDirection !== null && this._lastDirection !== undefined) {
                secondaryDirection = direction;
                direction = this._lastDirection;
            }
            if (this.props.enforceDirection) {
                positionToSet = FlyoutUtils.calculateFlyoutPosition(sizeForCalc, direction, relativeToElement);
                this._lastDirection = direction;
            }
            else {
                var calculatedInfo = FlyoutUtils.calculateFlyoutPreferredPosition(sizeForCalc, direction, relativeToElement, secondaryDirection);
                positionToSet = calculatedInfo.Position;
                this._lastDirection = calculatedInfo.Direction;
            }
            positionToSet.left = positionToSet.left >= 0 ? positionToSet.left : 0;
        }
        else {
            var error = new Error("Cannot recognize positioning approach");
            XrmProxy.Reporting.reportFailure(PRIMITIVE_COMPONENT_NAME, error);
            throw error;
        }
        if (this._actualSize) {
            var clipping = FlyoutUtils.calculateClipping(positionToSet, this._actualSize);
            var documentViewport = FlyoutUtils.getDocumentViewportOffset();
            if (clipping.width && !sizeToEnforce.width) {
                if (positionToSet.left < documentViewport.left)
                    positionToSet.left = documentViewport.left;
                if (positionToSet.right < documentViewport.right)
                    positionToSet.right = documentViewport.right;
            }
            if (clipping.height && !sizeToEnforce.height && !positionToSet.bottom && positionToSet.bottom !== 0) {
                if (positionToSet.top < documentViewport.top)
                    positionToSet.top = documentViewport.top;
                if (positionToSet.bottom < documentViewport.bottom)
                    positionToSet.bottom = documentViewport.bottom;
            }
        }
        var maximumSize = FlyoutUtils.calculateMaximumSize(positionToSet);
        var flyoutActualSize = maximumSize;
        if (sizeToEnforce.maxHeight && sizeToEnforce.maxHeight < maximumSize.maxHeight) {
            flyoutActualSize.maxHeight = sizeToEnforce.maxHeight;
        }
        if (sizeToEnforce.maxWidth && sizeToEnforce.maxWidth < maximumSize.maxWidth) {
            flyoutActualSize.maxWidth = sizeToEnforce.maxWidth;
        }
        Object.assign(style, positionToSet, flyoutActualSize);
        if (sizeToEnforce.height)
            style.height = sizeToEnforce.height;
        if (sizeToEnforce.width)
            style.width = sizeToEnforce.width;
        return style;
    };
    Flyout.prototype._updateActualSize = function () {
        if (!this._actualSize)
            return;
        var elementFullSize = FlyoutUtils.getElementFullSize(this._flyoutElement);
        if (elementFullSize.width === 0 || elementFullSize.height === 0)
            return;
        if (this._actualSize.width !== elementFullSize.width || this._actualSize.height !== elementFullSize.height) {
            this._actualSize = FlyoutUtils.getElementFullSize(this._flyoutElement);
        }
    };
    Flyout.prototype.ensureRootNode = function () {
        if (!this.rootNode) {
            this.rootNode = document.getElementById(this.getFlyoutRootId());
            if (!this.rootNode) {
                this.rootNode = document.createElement("div");
                this.rootNode.id = this.getFlyoutRootId();
                this.rootNode.setAttribute("data-id", this.rootNode.id);
                this.rootNode.setAttribute("flyoutRoot", this.props.isPortalToElement && this.props.portalContainerId ? "" : FLYOUT_ROOT_NODE_ID);
                document.body.appendChild(this.rootNode);
            }
        }
    };
    Flyout.prototype.debouncingFlyoutEvent = function (handler, delay) {
        if (delay === void 0) { delay = 200; }
        var fireEventHandler = 0;
        return function () {
            if (!fireEventHandler) {
                fireEventHandler = window.setTimeout(function () {
                    handler();
                    fireEventHandler = 0;
                }, delay);
            }
        };
    };
    Flyout.prototype.handleMeasuring = function (width, height) {
        if (this._actualSize.width !== width || this._actualSize.height !== height) {
            this._actualSize.width = width;
            this._actualSize.height = height;
            this.updateDom();
        }
    };
    Flyout.prototype.getIsRelative = function () {
        return this.props.positionType === "relative" || (!this.props.positionType && this.props.relativeToElementId);
    };
    Flyout.prototype.getIsAbsolute = function () {
        return this.props.positionType === "absolute" || (!this.props.positionType && this.props.position);
    };
    Flyout.prototype.setFlyoutRef = function (view) {
        this._flyoutElement = ReactDOM.findDOMNode(view);
    };
    Flyout.prototype._interceptClickEvent = function () {
        var _a;
        return !((_a = XrmProxy === null || XrmProxy === void 0 ? void 0 : XrmProxy.Utils) === null || _a === void 0 ? void 0 : _a.isFeatureEnabled("FlyoutPrimitveParentClickCheck")) || this.props.hasOnClickAncestor;
    };
    Flyout.prototype.updateDom = function () {
        var _this = this;
        var props = {};
        if (this.props.testhooks) {
            props.testhooks = this.props.testhooks;
        }
        if (this.props.children) {
            if (this._seeMorePopupCount === null) {
                this._seeMorePopupCount = CustomControlSeeMoreStyleHelper.getInstance().getPopupCount();
            }
            var shouldHaveZIndex = this._seeMorePopupCount > 0;
            this.ensureRootNode();
            if (!this.parentFlyoutNode) {
                this.parentFlyoutNode = document.createElement("div");
                this.rootNode.appendChild(this.parentFlyoutNode);
            }
            var isIE = !!window.navigator.userAgent.match("MSIE") || !!window.navigator.userAgent.match("Trident");
            var startPosition_1 = this.calculatePosition();
            var combinedStyle = Object.assign({}, this.props.flyoutStyle, startPosition_1, { boxSizing: "border-box" }, this.props.rootZIndex || shouldHaveZIndex ? { zIndex: 1 } : {}, isIE && this._flyoutElement === undefined ? { left: 0 } : {}, isIE ? { display: "initial" } : {});
            var isPrerenderRequired_1 = !this._actualSize;
            var gotNewChildren_1 = this.props.children !== this._previousChildren;
            gotNewChildren_1 && (this._previousChildren = this.props.children);
            if (isPrerenderRequired_1) {
                var docSize = FlyoutUtils.getDocumentContentSize();
                Object.assign(combinedStyle, {
                    bottom: null,
                    right: null,
                    maxWidth: docSize.width,
                    maxHeight: docSize.height,
                    visibility: "hidden",
                });
            }
            var flyoutView = (React.createElement(View, __assign({ id: this.props.id, style: combinedStyle, ref: this.setFlyoutRef, onClick: function (e) {
                    _this._interceptClickEvent() && e.stopPropagation();
                } }, this.props), this.props.children));
            this._portal.current.bindDOMElement(flyoutView, this.parentFlyoutNode, "flyout", function () {
                _this.focusInnerElement(isPrerenderRequired_1);
                _this._actualSize = FlyoutUtils.getElementFullSize(_this._flyoutElement);
                var newPosition = _this.calculatePosition();
                isPrerenderRequired_1 =
                    isPrerenderRequired_1 ||
                        (gotNewChildren_1 &&
                            (newPosition.left !== startPosition_1.left ||
                                newPosition.top !== startPosition_1.top ||
                                newPosition.right !== startPosition_1.right ||
                                newPosition.bottom !== startPosition_1.bottom));
                if (!_this._isFlyoutShown) {
                    window.addEventListener("blur", _this.handleWindowBlur);
                    window.addEventListener("resize", _this._resizeHandler);
                    if (_this.getIsRelative()) {
                        _this._scrollableAncestors = FlyoutUtils.getScrollableAncestors(_this._getRelativeElement(), document.body);
                        for (var _i = 0, _a = _this._scrollableAncestors; _i < _a.length; _i++) {
                            var element = _a[_i];
                            element.addEventListener("scroll", _this._scrollHandler);
                        }
                    }
                }
                _this._isFlyoutShown = true;
                if (isPrerenderRequired_1) {
                    _this.updateDom();
                }
            });
        }
        else {
            this.removeFromDom();
            this.resetFocus();
        }
    };
    Flyout.prototype.focusInnerElement = function (preRenderRequired) {
        if (!preRenderRequired && this.props.focusCallback && this.props.focusElementId && !this._wasInnerFocusRequested) {
            this.props.focusCallback(this.props.focusElementId);
            this._wasInnerFocusRequested = true;
        }
    };
    Flyout.prototype.removeFromDom = function () {
        if (this.parentFlyoutNode) {
            this._portal.current.unbindDOMComponent("flyout");
            this.rootNode.removeChild(this.parentFlyoutNode);
            this.parentFlyoutNode = undefined;
            if (this.rootNode.childElementCount === 0) {
                document.body.removeChild(this.rootNode);
                this.rootNode = undefined;
            }
        }
        if (this._isFlyoutShown) {
            window.removeEventListener("blur", this.handleWindowBlur);
            if (this.getIsRelative()) {
                window.removeEventListener("resize", this._resizeHandler);
                if (this._scrollableAncestors) {
                    for (var _i = 0, _a = this._scrollableAncestors; _i < _a.length; _i++) {
                        var element = _a[_i];
                        element.removeEventListener("scroll", this._scrollHandler);
                    }
                }
            }
        }
        this._isFlyoutShown = false;
    };
    Flyout.prototype.resetFocus = function () {
        if (this.props.focusElementId && this.props.relativeToElementId && this.props.focusCallback) {
            this.props.focusCallback(this.props.relativeToElementId);
        }
    };
    Flyout.prototype._isClickInsideFlyout = function (event) {
        if ((this._flyoutElement && this._flyoutElement.contains(event.target)) ||
            document.querySelector(".ms-Layer"))
            return true;
        var children = CustomControlFlyoutParentHelper.getInstance().getChildRoots(this.getFlyoutRootId());
        for (var i = 0; i < children.length; i++) {
            var childNode = document.getElementById(children[i]);
            if (childNode && childNode.contains(event.target)) {
                return true;
            }
        }
        return false;
    };
    Flyout.prototype.handleOnScroll = function (event) {
        this.ensureRootNode();
        if (!this._isClickInsideFlyout(event) && this.props.dismissOnScroll && this.props.onOutsideClick)
            this.props.onOutsideClick(event);
    };
    Flyout.prototype.handlePointerDown = function (event) {
        this.ensureRootNode();
        if (!this._isClickInsideFlyout(event) && this.props.onOutsideClick)
            this.props.onOutsideClick(event);
    };
    Flyout.prototype.handleWindowBlur = function (event) {
        this.ensureRootNode();
        if (this.props.onOutsideClick && !this.props.keepOpenOnWindowBlur) {
            var active = document.activeElement;
            if (active && active.tagName.toUpperCase() === "IFRAME") {
                var fakeEvent_1 = Object.create(event, {
                    target: {
                        value: active,
                    },
                });
                if (this._isClickInsideFlyout(fakeEvent_1)) {
                    return;
                }
            }
            var fakeEvent = Object.create(event, {
                target: {
                    value: this.rootNode,
                },
            });
            this.props.onOutsideClick(fakeEvent);
        }
    };
    Flyout.prototype.render = function () {
        return React.createElement(CustomControlPortal, { key: "portal", ref: this._portal, renderReactSubtree: ReactDOM.createPortal });
    };
    Flyout.prototype._subscribeFlyoutPopupManager = function () {
        var _this = this;
        this._managerSubscriber = {
            type: FlyoutPopupManagerSubscriberType.Flyout,
            isClickInsideSubscriber: this._isClickInsideFlyout,
            onPointerDown: this.handlePointerDown,
            onScroll: this.props.enableTrackOnScroll ? this.handleOnScroll : null,
            getComponent: function () {
                return _this._flyoutElement;
            },
        };
        FlyoutPopupManager.getInstance().addSubscribers(this._managerSubscriber);
    };
    Flyout.displayName = "Flyout";
    return Flyout;
}(React.Component));
export { FlyoutDirection, Flyout, FLYOUT_ROOT_NODE_ID };

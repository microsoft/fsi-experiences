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
import { View } from "../View";
import { ROOT_POPUP_ATTRIBUTE } from "./RootPopup";
import { FlyoutPopupManager } from "../../Common/FlyoutPopupManager/FlyoutPopupManager";
import { FlyoutPopupManagerSubscriberType, } from "../../Common/FlyoutPopupManager/IFlyoutPopupManagerSubscriber";
var PopupType;
(function (PopupType) {
    PopupType[PopupType["Root"] = 1] = "Root";
    PopupType[PopupType["Nested"] = 2] = "Nested";
})(PopupType || (PopupType = {}));
function getVisibilityStyle(isVisible, style) {
    return {
        display: isVisible ? (style.display ? style.display : "flex") : "none",
    };
}
function getPositioningStyle(style, parent) {
    var result = Object.assign({}, style);
    var parentPosition = parent && parent.getBoundingClientRect();
    if (parentPosition) {
        result.top = parseInt(result.top, 10) - parentPosition.top + "px";
        result.left = parseInt(result.left, 10) - parentPosition.left + "px";
    }
    return result;
}
var defaultShadowStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
};
var Popup = (function (_super) {
    __extends(Popup, _super);
    function Popup(props) {
        var _this = _super.call(this, props) || this;
        _this._rootElement = null;
        _this._popupElement = null;
        _this._stopPropagation = function (e) {
            e.stopPropagation();
        };
        _this._forceClosePopup = function (e) {
            _this._stopPropagation(e);
            if (_this.props.closeOnOutsideClick) {
                _this.setState({
                    forceClose: true,
                });
                if (_this.props.onPopupForcedClosed) {
                    _this.props.onPopupForcedClosed();
                }
            }
        };
        _this.state = {
            forceClose: false,
        };
        _this._rootElement = document.getElementById(props.rootPopupId);
        _this._accessibilityComponent = _this._createAccessibilityComponentIfNeeded();
        return _this;
    }
    Popup.prototype._getId = function () {
        return this.props.rootPopupId + "_" + (this.props.id || "innerPopup");
    };
    Popup.prototype._getCurrentPopupToOpen = function (forceClose, popupToOpen) {
        var result = "";
        if (!forceClose && popupToOpen) {
            var popupArray = popupToOpen.split(".");
            result = popupArray[0];
        }
        return result;
    };
    Popup.prototype._getNextPopupToOpen = function (forceClose, popupToOpen) {
        var result = "";
        if (!forceClose && popupToOpen) {
            var popupArray = popupToOpen.split(".");
            popupArray.splice(0, 1);
            result = popupArray.join(".");
        }
        return result;
    };
    Popup.prototype._getChildrenProps = function () {
        return {
            type: PopupType.Nested,
            parent: this._popupElement,
            popupToOpen: this._getNextPopupToOpen(this.state.forceClose, this.props.popupToOpen),
            rootPopupId: this.props.rootPopupId,
        };
    };
    Popup.prototype._getChildrenWithProps = function (children) {
        var _this = this;
        if (!children)
            return null;
        var result;
        if (children.map) {
            result = children.map(function (child) {
                return child.type === Popup ? React.cloneElement(child, _this._getChildrenProps()) : child;
            });
        }
        else {
            result = children === Popup ? React.cloneElement(children, this._getChildrenProps()) : children;
        }
        return result;
    };
    Popup.prototype._isVisible = function () {
        return this._getCurrentPopupToOpen(this.state.forceClose, this.props.popupToOpen) === this.props.name;
    };
    Popup.prototype._applyRootNodeStyle = function () {
        Object.assign(this._rootElement.style, this.props.rootStyle);
        this._toggleRootElementVisibility();
    };
    Popup.prototype._toggleRootElementVisibility = function () {
        if (this.props.isDialogPopup) {
            return;
        }
        var openedPopups = this._rootElement.getAttribute(ROOT_POPUP_ATTRIBUTE);
        if (!openedPopups) {
            this._rootElement.style.display = "none";
        }
        else if (this._rootElement.style.display === "none") {
            this._rootElement.style.display = "flex";
        }
    };
    Popup.prototype._getStaticContent = function () {
        var content = this.props.content;
        var result = null;
        if (content) {
            result = React.createElement(View, { ref: "staticContent" });
        }
        return result;
    };
    Popup.prototype._createAccessibilityComponentIfNeeded = function () {
        var _a = this.props, createAccessibilityComponent = _a.createAccessibilityComponent, rootPopupId = _a.rootPopupId;
        if (!createAccessibilityComponent || !rootPopupId) {
            return null;
        }
        return createAccessibilityComponent({
            id: this._getId(),
            rootElementId: rootPopupId,
            shouldManageFocus: true,
        });
    };
    Popup.prototype._registerPopup = function (props, state) {
        var name = props.name, popupToOpen = props.popupToOpen;
        var forceClose = state.forceClose;
        var openedPopups = this._rootElement.getAttribute(ROOT_POPUP_ATTRIBUTE);
        openedPopups = !openedPopups ? "" : openedPopups;
        var popupIndex = openedPopups.indexOf(name);
        if (forceClose || name !== this._getCurrentPopupToOpen(forceClose, popupToOpen)) {
            if (~popupIndex) {
                this._rootElement.setAttribute(ROOT_POPUP_ATTRIBUTE, openedPopups.replace("." + name, ""));
            }
            return;
        }
        if (!~popupIndex) {
            this._rootElement.setAttribute(ROOT_POPUP_ATTRIBUTE, openedPopups.concat("." + name));
        }
    };
    Popup.prototype._subscribeFlyoutPopupManager = function () {
        var _this = this;
        this._managerSubscriber = {
            type: FlyoutPopupManagerSubscriberType.Popup,
            onPointerDown: function (e) {
                if (e.target === document.getElementById(_this._getId())) {
                    _this._forceClosePopup(e);
                }
            },
            getComponent: function () {
                return _this._popupElement;
            },
        };
        FlyoutPopupManager.getInstance().addSubscribers(this._managerSubscriber);
    };
    Popup.prototype.componentWillMount = function () {
        if (!this.props.isDialogPopup) {
            this._registerPopup(this.props, this.state);
        }
    };
    Popup.prototype.componentDidMount = function () {
        var _this = this;
        this._popupElement = ReactDOM.findDOMNode(this.refs.popup);
        this.forceUpdate(function () {
            var staticContentRef = _this.refs.staticContent;
            if (staticContentRef) {
                var staticContentElement = ReactDOM.findDOMNode(staticContentRef);
                staticContentElement.appendChild(_this.props.content);
            }
        });
        this._subscribeFlyoutPopupManager();
    };
    Popup.prototype.componentWillReceiveProps = function () {
        this.setState({
            forceClose: false,
        });
    };
    Popup.prototype.componentWillUpdate = function (nextProps, nextState) {
        this._registerPopup(nextProps, nextState);
        var staticContentRef = this.refs.staticContent;
        if (staticContentRef) {
            var staticContentElement = ReactDOM.findDOMNode(staticContentRef);
            while (staticContentElement.firstChild) {
                staticContentElement.removeChild(staticContentElement.firstChild);
            }
            staticContentElement.appendChild(nextProps.content);
        }
    };
    Popup.prototype.componentDidUpdate = function (prevProps) {
        if (this.props.createAccessibilityComponent && prevProps.rootPopupId !== this.props.rootPopupId) {
            console.warn("rootPopupId changed for " + this._getId() + ". Focus will not be managed for this popup.");
        }
    };
    Popup.prototype.componentWillUnmount = function () {
        FlyoutPopupManager.getInstance().removeSubscribers(this._managerSubscriber);
    };
    Popup.prototype._adjustPixelValue = function (value, isXAxis) {
        if (!value || typeof value === "number" || value.indexOf("px") === -1) {
            return value;
        }
        value = value.substring(0, value.indexOf("px"));
        var realDimension = isXAxis
            ? this.props.rootBodyElement.getBoundingClientRect().width
            : this.props.rootBodyElement.getBoundingClientRect().height;
        var pixelDimension = isXAxis ? this.props.rootBodyElement.offsetWidth : this.props.rootBodyElement.offsetHeight;
        var numValue = Number.parseFloat(value);
        var offsetValue = isXAxis
            ? this.props.rootBodyElement.getBoundingClientRect().left
            : this.props.rootBodyElement.getBoundingClientRect().top;
        return (numValue - offsetValue) / (realDimension / pixelDimension) + "px";
    };
    Popup.prototype._generatePopupStyle = function () {
        var updatedPopStyle = Object.assign({}, this.props.popupStyle);
        if (updatedPopStyle.position &&
            (updatedPopStyle.position.toLowerCase() === "absolute" || updatedPopStyle.position.toLowerCase() === "fixed")) {
            if (this.props.rootBodyElement && this.props.rootBodyElement !== document.body) {
                updatedPopStyle.left = this._adjustPixelValue(updatedPopStyle.left, true);
                updatedPopStyle.right = this._adjustPixelValue(updatedPopStyle.right, true);
                updatedPopStyle.top = this._adjustPixelValue(updatedPopStyle.top, false);
                updatedPopStyle.bottom = this._adjustPixelValue(updatedPopStyle.bottom, false);
            }
        }
        return Object.assign({}, updatedPopStyle, this.props.isDialogPopup ? {} : getVisibilityStyle(this._isVisible(), this.props.popupStyle));
    };
    Popup.prototype.render = function () {
        var _a, _b;
        var _c = this.props, children = _c.children, isDialogPopup = _c.isDialogPopup, parent = _c.parent, shadowStyle = _c.shadowStyle, style = _c.style;
        var combinedShadowContainerStyle = isDialogPopup
            ? style
            : Object.assign({}, style, getPositioningStyle(shadowStyle, parent), getVisibilityStyle(this._isVisible(), shadowStyle));
        var combinedPopupStyle = this._generatePopupStyle();
        this._applyRootNodeStyle();
        var overlayHandlerProps = (_a = {},
            _a[FlyoutPopupManager.pointerDownEvent] = this._forceClosePopup,
            _a);
        var popupHandlerProps = (_b = {},
            _b[FlyoutPopupManager.pointerDownEvent] = this._stopPropagation,
            _b);
        return (React.createElement(View, __assign({ id: this._getId(), style: combinedShadowContainerStyle }, overlayHandlerProps),
            React.createElement(View, __assign({ style: combinedPopupStyle }, popupHandlerProps, { ref: "popup" }),
                this._getStaticContent(),
                this._getChildrenWithProps(children)),
            this._accessibilityComponent));
    };
    return Popup;
}(React.Component));
Popup.defaultProps = {
    shadowStyle: defaultShadowStyle,
    isDialogPopup: false,
    type: PopupType.Root,
    closeOnOutsideClick: false,
};
export { PopupType, Popup };

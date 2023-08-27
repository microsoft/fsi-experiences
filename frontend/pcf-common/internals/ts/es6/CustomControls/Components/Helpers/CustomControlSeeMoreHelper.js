var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import * as React from "react";
import { View } from "../../../CommonComponents/Primitive/View";
import { Button } from "../../../CommonComponents/Primitive/Button";
import { MicrosoftIcon } from "../../../CommonComponents/FontIcon/MicrosoftIcon";
import { MicrosoftIconSymbol } from "../../../CommonComponents/FontIcon/MicrosoftIconSymbol";
import { SeeMoreStatus } from "./Animation/CustomControlAnimationHelper";
import { CustomControlSeeMoreStyleHelper } from "./CustomControlSeeMoreStyleHelper";
import { CustomControlConstants } from "../../Utilities/CustomControlConstants";
import { instance as XrmProxy } from "../../Utilities/XrmProxy";
import { guidV4String } from "../../Utilities/GuidHelper";
var COMPONENT_NAME = CustomControlConstants.CCF + ".CustomControlSeeMoreHelper";
var CustomControlSeeMoreHelper = (function () {
    function CustomControlSeeMoreHelper(parentDomId) {
        this._seeMorePopupInfo = null;
        this._seeMorePopupStatus = SeeMoreStatus.NotInUse;
        this._seeMorePopupAnimDiv = null;
        this._seeMoreTimeoutHelper = -1;
        this._animFadeInReference = this._seeMoreFadeIn.bind(this);
        this._animEndReference = this._seeMoreEnd.bind(this);
        this._seeMorefocusModal = this._modalTrapFocus.bind(this);
        this._parentDomId = "";
        this._environmentMargin = null;
        this.shouldGivePoppedOutDimensions = this._shouldGivePoppedOutDimensions.bind(this);
        if (parentDomId)
            this._parentDomId = "|" + parentDomId;
        else
            this._parentDomId = "|" + guidV4String();
    }
    CustomControlSeeMoreHelper.prototype.destroy = function () {
        if (this._seeMorePopupStatus !== SeeMoreStatus.NotInUse) {
            CustomControlSeeMoreStyleHelper.getInstance().seeMoreClose();
        }
        this._seeMorePopupInfo = null;
        this._seeMorePopupAnimDiv = null;
        this._animFadeInReference = null;
        this._animEndReference = null;
        this._seeMorefocusModal = null;
    };
    CustomControlSeeMoreHelper.prototype.getSeeMorePopupInfo = function () {
        return this._seeMorePopupInfo;
    };
    CustomControlSeeMoreHelper.prototype.getSeeMorePopupStatus = function () {
        return this._seeMorePopupStatus;
    };
    CustomControlSeeMoreHelper.prototype._shouldGivePoppedOutDimensions = function (isVirtual) {
        var seeMorePopupInfo = this.getSeeMorePopupInfo();
        var seeMorePopupStatus = this.getSeeMorePopupStatus();
        return (seeMorePopupInfo &&
            seeMorePopupStatus !== SeeMoreStatus.ReturnFadeIn &&
            ((isVirtual && seeMorePopupStatus !== SeeMoreStatus.PopFadeOutAndMove) ||
                (!isVirtual && seeMorePopupStatus !== SeeMoreStatus.ReturnFadeOutAndMove)));
    };
    CustomControlSeeMoreHelper.prototype._calculateEnvironmentMargin = function () {
        if (this._environmentMargin === null) {
            document.body.style.setProperty("--notch-helper-value", "env(safe-area-inset-top)");
            var value = getComputedStyle(document.body).getPropertyValue("--notch-helper-value");
            this._environmentMargin = parseInt(value, 10);
            if (Number.isNaN(this._environmentMargin)) {
                this._environmentMargin = 0;
            }
        }
        return this._environmentMargin;
    };
    CustomControlSeeMoreHelper.prototype.seeMorePopup = function (component, seeMoreCallback, value, autosize, isRTL, zIndex, rootElement) {
        if (autosize === void 0) { autosize = false; }
        if (isRTL === void 0) { isRTL = false; }
        if (zIndex === void 0) { zIndex = 1; }
        var componentInfo = component.getBoundingClientRect();
        this._seeMoreCallback = seeMoreCallback;
        var skipUpdateIfVirtual = true;
        var legacyScenario = false;
        if (!rootElement) {
            rootElement = document.body;
            legacyScenario = true;
        }
        var rootInfo = rootElement.getBoundingClientRect();
        switch (this._seeMorePopupStatus) {
            case SeeMoreStatus.NotInUse:
                if (!value)
                    return;
                CustomControlSeeMoreStyleHelper.getInstance().seeMoreOpen();
                this._seeMorePopupStatus = SeeMoreStatus.PopFadeOutAndMove;
                var rootWidth = legacyScenario ? rootInfo.width : rootElement.offsetWidth;
                var rootHeight = legacyScenario ? rootInfo.height : rootElement.offsetHeight;
                var elementWidth = legacyScenario ? componentInfo.width : component.offsetWidth;
                var elementHeight = legacyScenario ? componentInfo.height : component.offsetHeight;
                var endWidth = !autosize || elementWidth > (2 / 3) * rootWidth
                    ? rootWidth
                    : component.offsetWidth > (1 / 3) * rootWidth
                        ? (2 / 3) * rootWidth
                        : (1 / 3) * rootWidth;
                var mobileMaxWidth = 769;
                var isMobile = rootWidth < mobileMaxWidth;
                var fullScreen = endWidth === rootWidth && !isMobile;
                var stdmargin = 80;
                endWidth = endWidth - (fullScreen ? stdmargin : 0);
                var endHeight = rootHeight - (isMobile ? 0 : stdmargin) - this._calculateEnvironmentMargin();
                var endTop = 0.5 * endHeight - 0.5 * elementHeight + (isMobile ? 0 : 0.5 * stdmargin);
                var endLeft = (fullScreen ? 0.5 * stdmargin : 0) + (fullScreen ? endWidth : rootWidth) / 2 - elementWidth / 2;
                this._seeMorePopupInfo = {
                    startHeight: elementHeight,
                    startWidth: elementWidth,
                    startLeft: componentInfo.left - rootInfo.left,
                    startTop: componentInfo.top - rootInfo.top,
                    endTop: endTop,
                    endLeft: endLeft,
                    endWidthInner: endWidth - 48,
                    endHeightInner: endHeight - 48,
                    endWidth: endWidth,
                    endHeight: endHeight,
                    isRTL: isRTL,
                    zIndex: zIndex,
                };
                this._seeMoreCallback(skipUpdateIfVirtual);
                break;
            case SeeMoreStatus.PoppedOut:
                if (value)
                    return;
                CustomControlSeeMoreStyleHelper.getInstance().seeMoreClose();
                this._seeMorePopupStatus = SeeMoreStatus.ReturnFadeOutAndMove;
                this._seeMoreCallback(skipUpdateIfVirtual);
                break;
        }
    };
    CustomControlSeeMoreHelper.prototype._getPopupDiv = function (isVirtual, isCompositing, component) {
        var _a;
        switch (this._seeMorePopupStatus) {
            case SeeMoreStatus.PopFadeOutAndMove:
            case SeeMoreStatus.ReturnFadeOutAndMove:
                if (isVirtual) {
                    return _getLastChild(component);
                }
                return component.parentElement.parentElement;
            case SeeMoreStatus.ReturnFadeIn:
                if (isVirtual) {
                    if (isCompositing) {
                        return _getLastChild(_getLastChild(component));
                    }
                    return component;
                }
                return component.parentElement.parentElement;
            case SeeMoreStatus.PopFadeIn:
                if (isVirtual) {
                    return _getLastChild(_getLastChild(component));
                }
                return component.parentElement.parentElement;
        }
        (_a = XrmProxy.Diagnostics) === null || _a === void 0 ? void 0 : _a.traceInfo(COMPONENT_NAME + "._getPopupDiv", "Get pop div success");
        return component;
    };
    CustomControlSeeMoreHelper.prototype._getCloseElement = function (component) {
        var element = component;
        if (element) {
            if (element.id.endsWith("_outer")) {
                element = element.firstChild;
            }
            for (var i = 0; i < element.children.length; i++) {
                if (element.children[i].id === "closeButtonContainer" + this._parentDomId) {
                    return element.children[i].firstChild;
                }
            }
        }
        return null;
    };
    CustomControlSeeMoreHelper.prototype.checkOnPopupStatus = function (isVirtual, isCompositing, component) {
        if (this._seeMoreTimeoutHelper !== -1) {
            window.clearTimeout(this._seeMoreTimeoutHelper);
            this._seeMoreTimeoutHelper = -1;
        }
        switch (this._seeMorePopupStatus) {
            case SeeMoreStatus.PopFadeOutAndMove:
            case SeeMoreStatus.ReturnFadeOutAndMove:
                this._seeMorePopupAnimDiv = this._getPopupDiv(isVirtual, isCompositing, component);
                this._seeMorePopupAnimDiv.addEventListener("animationend", this._animFadeInReference);
                this._seeMorePopupAnimDiv.addEventListener("webkitAnimationEnd", this._animFadeInReference);
                this._seeMoreTimeoutHelper = window.setTimeout(this._seeMoreFadeIn.bind(this), 2500);
                break;
            case SeeMoreStatus.ReturnFadeIn:
                this._seeMorePopupAnimDiv = this._getPopupDiv(isVirtual, isCompositing, component);
                this._seeMorePopupAnimDiv.addEventListener("animationend", this._animEndReference);
                this._seeMorePopupAnimDiv.addEventListener("webkitAnimationEnd", this._animEndReference);
                this._seeMoreTimeoutHelper = window.setTimeout(this._seeMoreEnd.bind(this), 1000);
                break;
            case SeeMoreStatus.PopFadeIn:
                this._seeMorePopupAnimDiv = this._getPopupDiv(isVirtual, isCompositing, component);
                this._seeMorePopupAnimDiv.addEventListener("animationend", this._animFadeInReference);
                this._seeMorePopupAnimDiv.addEventListener("webkitAnimationEnd", this._animFadeInReference);
                this._seeMorePopupAnimDiv.addEventListener("keydown", this._seeMorefocusModal);
                this._seeMoreTimeoutHelper = window.setTimeout(this._seeMoreFadeIn.bind(this), 1000);
                break;
        }
    };
    CustomControlSeeMoreHelper.prototype._modalTrapFocus = function (e) {
        var isPressed = e.key === "Tab" || e.keyCode === 9 || e.key === "Escape" || e.keyCode === 27;
        if (!isPressed)
            return;
        if (e.key === "Escape" || e.keyCode === 27) {
            this._seeMorePopUpCallBack();
        }
        if (e.key === "Tab" || (e.shiftKey && e.key === "Tab")) {
            var allModalElements = this._seeMorePopupAnimDiv.querySelectorAll('[tabindex]:not([tabindex="-1"])');
            var allElementsInHiddenDiv = this._seeMorePopupAnimDiv.querySelectorAll('div[style*="display:none"] [tabindex]:not([tabindex="-1"])');
            var tabbableElements = __spreadArray([], allModalElements, true);
            var tabbableElementsInHiddenDiv = __spreadArray([], allElementsInHiddenDiv, true);
            for (var i = tabbableElements.length - 1; i > 0; i--) {
                if (tabbableElementsInHiddenDiv.indexOf(tabbableElements[i]) > -1) {
                    tabbableElements.splice(i, 1);
                }
            }
            if (!tabbableElements || tabbableElements.length === 0) {
                return;
            }
            var firstElement = tabbableElements[0];
            var lastElement = tabbableElements[tabbableElements.length - 1];
            if (e.shiftKey && e.key === "Tab") {
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            }
            else if (document.activeElement === lastElement) {
                firstElement.focus();
                e.preventDefault();
            }
        }
    };
    CustomControlSeeMoreHelper.prototype._seeMoreFadeIn = function () {
        if (this._seeMoreTimeoutHelper !== -1) {
            window.clearTimeout(this._seeMoreTimeoutHelper);
            this._seeMoreTimeoutHelper = -1;
        }
        var skipUpdateIfVirtual = false;
        switch (this._seeMorePopupStatus) {
            case SeeMoreStatus.PopFadeIn:
                this._seeMorePopupStatus = SeeMoreStatus.PoppedOut;
                this._getCloseElement(this._seeMorePopupAnimDiv).focus();
                this._seeMorePopupAnimDiv.removeEventListener("animationend", this._animFadeInReference);
                this._seeMorePopupAnimDiv.removeEventListener("webkitAnimationEnd", this._animFadeInReference);
                this._controlTabScope(true);
                break;
            case SeeMoreStatus.PopFadeOutAndMove:
                this._seeMorePopupStatus = SeeMoreStatus.PopFadeIn;
                this._seeMoreTimeoutHelper = window.setTimeout(this._seeMoreFadeIn.bind(this), 1500);
                this._seeMoreCallback(skipUpdateIfVirtual);
                break;
            case SeeMoreStatus.ReturnFadeOutAndMove:
                this._seeMorePopupStatus = SeeMoreStatus.ReturnFadeIn;
                this._seeMorePopupAnimDiv.removeEventListener("animationend", this._animFadeInReference);
                this._seeMorePopupAnimDiv.removeEventListener("webkitAnimationEnd", this._animFadeInReference);
                this._seeMorePopupAnimDiv.removeEventListener("keydown", this._seeMorefocusModal);
                this._seeMorePopupAnimDiv = null;
                this._controlTabScope(false);
                this._seeMoreCallback(skipUpdateIfVirtual);
        }
    };
    CustomControlSeeMoreHelper.prototype._controlTabScope = function (containScope) {
        var _this = this;
        var shell = document.getElementById("ApplicationShell");
        if (shell) {
            if (containScope) {
                var elementsToFix = Array.from(shell.querySelectorAll('[tabindex = "0"]'))
                    .filter(function (element) {
                    return !_this._seeMorePopupAnimDiv.contains(element);
                })
                    .concat(Array.from(shell.querySelectorAll("button")).filter(function (element) {
                    return !_this._seeMorePopupAnimDiv.contains(element);
                }))
                    .concat(Array.from(shell.querySelectorAll("a")).filter(function (element) {
                    return !_this._seeMorePopupAnimDiv.contains(element);
                }));
                elementsToFix.forEach(function (element) {
                    element.setAttribute("data-hiddenTabIndex", element.tabIndex.toString());
                    element.tabIndex = -1;
                });
            }
            else {
                var elementsToFix = Array.from(shell.querySelectorAll("[data-hiddenTabIndex]"));
                elementsToFix.forEach(function (element) {
                    element.tabIndex = element.attributes["data-hiddenTabIndex"];
                    element.removeAttribute("data-hiddenTabIndex");
                });
            }
        }
    };
    CustomControlSeeMoreHelper.prototype._seeMoreEnd = function () {
        if (this._seeMoreTimeoutHelper !== -1) {
            window.clearTimeout(this._seeMoreTimeoutHelper);
            this._seeMoreTimeoutHelper = -1;
        }
        this._seeMorePopupAnimDiv.removeEventListener("animationend", this._animEndReference);
        this._seeMorePopupAnimDiv.removeEventListener("webkitAnimationEnd", this._animEndReference);
        this._seeMorePopupAnimDiv = null;
        this._seeMorePopupStatus = SeeMoreStatus.NotInUse;
        this._seeMorePopupInfo = null;
        var skipUpdateIfVirtual = true;
        this._seeMoreCallback(skipUpdateIfVirtual);
    };
    CustomControlSeeMoreHelper.prototype.renderSpacer = function (isVirtual, isCompositing) {
        var _a;
        if (isVirtual === void 0) { isVirtual = true; }
        if (isCompositing === void 0) { isCompositing = false; }
        if (isVirtual &&
            !isCompositing &&
            (this._seeMorePopupStatus === SeeMoreStatus.NotInUse || this._seeMorePopupStatus === SeeMoreStatus.ReturnFadeIn)) {
            (_a = XrmProxy.Diagnostics) === null || _a === void 0 ? void 0 : _a.traceInfo(COMPONENT_NAME + ".renderSpacer", "Render Spacer return null");
            return null;
        }
        var outerStyle = this._seeMorePopupStatus === SeeMoreStatus.PopFadeIn ||
            this._seeMorePopupStatus === SeeMoreStatus.PoppedOut ||
            this._seeMorePopupStatus === SeeMoreStatus.ReturnFadeOutAndMove
            ? {
                height: "24px",
                width: "100%",
                backgroundColor: "white",
            }
            : { display: "none" };
        return React.createElement(View, { key: "ccf_spacer", style: outerStyle });
    };
    CustomControlSeeMoreHelper.prototype.renderCloseButton = function (closeCallback, isVirtual, isCompositing, isRTL, useUnicodeIcon) {
        if (isVirtual === void 0) { isVirtual = true; }
        if (isCompositing === void 0) { isCompositing = false; }
        if (isRTL === void 0) { isRTL = false; }
        if (useUnicodeIcon === void 0) { useUnicodeIcon = false; }
        if (isVirtual &&
            !isCompositing &&
            (this._seeMorePopupStatus === SeeMoreStatus.NotInUse || this._seeMorePopupStatus === SeeMoreStatus.ReturnFadeIn)) {
            return null;
        }
        var iconStyle = {
            fontSize: "16px",
            color: "#333333",
            position: "absolute",
            top: "0px",
            right: "0px",
            left: "0px",
            height: "48px",
            width: "48px",
            textAlign: "center",
            paddingTop: "16px",
            cursor: "pointer",
        };
        var buttonStyle = {
            backgroundColor: "transparent",
            border: "none",
            position: "absolute",
            top: "0px",
            right: isRTL ? "" : "-24px",
            left: isRTL ? "-24px" : "",
            height: "48px",
            width: "48px",
            textAlign: "center",
            paddingTop: "16px",
            cursor: "pointer",
            boxSizing: "border-box",
        };
        var seeMorePopupStatusCondition = this._seeMorePopupStatus === SeeMoreStatus.PopFadeIn ||
            this._seeMorePopupStatus === SeeMoreStatus.PoppedOut ||
            this._seeMorePopupStatus === SeeMoreStatus.ReturnFadeOutAndMove;
        var outerStyle = seeMorePopupStatusCondition
            ? {
                height: "48px",
                width: "100%",
                top: "-24px",
                position: "absolute",
            }
            : { display: "none" };
        var buttonIcon = useUnicodeIcon ? (React.createElement(View, { key: "closebuttonIcon", style: iconStyle }, "\u2573")) : (React.createElement(MicrosoftIcon, { key: "closeButtonIcon", style: iconStyle, type: MicrosoftIconSymbol.Close }));
        this._seeMorePopUpCallBack = closeCallback;
        return (React.createElement(View, { key: "closeButtonContainer" + this._parentDomId, id: "closeButtonContainer" + this._parentDomId, style: outerStyle },
            React.createElement(Button, { key: "closeButton" + this._parentDomId, id: "closeButton" + this._parentDomId, style: buttonStyle, tabIndex: seeMorePopupStatusCondition ? 0 : -1, title: "Close Fullscreen Control button", onClick: closeCallback, accessibilityLabel: "Close Fullscreen Control button" }, buttonIcon)));
    };
    return CustomControlSeeMoreHelper;
}());
function _getLastChild(element) {
    var _a, _b;
    for (var child = element === null || element === void 0 ? void 0 : element.lastChild; child; child = child.previousSibling) {
        if (!((_b = (_a = child).hasAttribute) === null || _b === void 0 ? void 0 : _b.call(_a, "data-accessibilitybutton"))) {
            return child;
        }
    }
    return null;
}
export { CustomControlSeeMoreHelper };

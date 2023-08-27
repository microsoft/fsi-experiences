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
import * as AttributeName from "../Supplementary/Accessibility/Attributes/AttributeName";
import { CustomControlConstants } from "../../CustomControls/Utilities/CustomControlConstants";
var IS_IE = !!window.navigator.userAgent.match("MSIE") || !!window.navigator.userAgent.match("Trident");
var IS_EDGE = !!window.navigator.userAgent.match("Edge");
var ComponentBase = (function (_super) {
    __extends(ComponentBase, _super);
    function ComponentBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ComponentBase.prototype.getElementName = function () {
        return "div";
    };
    ComponentBase.prototype.getElementProps = function () {
        return null;
    };
    ComponentBase.prototype.refCallbackTrigger = function (input) {
        this.props.refCallback(input);
    };
    ComponentBase.prototype.hasAriaProperty = function () {
        return (!!this.props.accessibilityLabel ||
            !!this.props.accessibilityChecked ||
            !!this.props.accessibilityLive ||
            !!this.props.accessibilityRelevant ||
            !!this.props.accessibilityAtomic ||
            !!this.props.labelledByElementId ||
            !!this.props.describedByElementId ||
            !!this.props.controlsElementId ||
            !!this.props.ownsElementId ||
            !!this.props.accessibilityRequired ||
            typeof this.props.accessibilityExpanded === "boolean" ||
            typeof this.props.accessibilityHasPopup === "boolean" ||
            typeof this.props.accessibilityHasPopup === "string" ||
            typeof this.props.accessibilityPressed === "boolean" ||
            typeof this.props.accessibilityPressed === "string" ||
            typeof this.props.accessibilityReadOnly === "boolean" ||
            typeof this.props.accessibilityDisabled === "boolean" ||
            typeof this.props.accessibilityLevel === "number" ||
            typeof this.props.accessibilityHidden === "boolean" ||
            typeof this.props.isSelected === "boolean" ||
            !!this.props.activeDescendantId ||
            !!this.props.accessibilityCurrent ||
            typeof this.props.accessibilityValueMin === "number" ||
            typeof this.props.accessibilityValueMax === "number" ||
            typeof this.props.accessibilityValueNow === "number" ||
            typeof this.props.accessibilityModal === "boolean" ||
            !!this.props.accessibilityValueText ||
            !!this.props.role ||
            !!this.props.accessibilityAriaOrientation);
    };
    ComponentBase.prototype.getElementPropsInternal = function () {
        var props = {};
        props.id = this.props.id;
        if (this.props.hidden) {
            props[AttributeName.HIDDEN] = true;
        }
        if (this.props.accessibilityLabel) {
            props[AttributeName.ARIA_LABEL] = this.props.accessibilityLabel;
        }
        if (this.props.accessibilityChecked) {
            props[AttributeName.ARIA_CHECKED] = this.props.accessibilityChecked;
        }
        if (this.props.accessibilityLive) {
            props[AttributeName.ARIA_LIVE] = this.props.accessibilityLive;
        }
        if (this.props.accessibilityRelevant) {
            props[AttributeName.ARIA_RELEVANT] = this.props.accessibilityRelevant;
        }
        if (this.props.accessibilityAtomic) {
            props[AttributeName.ARIA_ATOMIC] = this.props.accessibilityAtomic;
        }
        if (this.props.labelledByElementId) {
            props[AttributeName.ARIA_LABELLED_BY] = this.props.labelledByElementId;
        }
        if (this.props.describedByElementId) {
            props[AttributeName.ARIA_DESCRIBED_BY] = this.props.describedByElementId;
        }
        if (this.props.controlsElementId) {
            props[AttributeName.ARIA_CONTROLS] = this.props.controlsElementId;
        }
        if (this.props.ownsElementId) {
            props[AttributeName.ARIA_OWNS] = this.props.ownsElementId;
        }
        if (this.props.accessibilityRequired) {
            props[AttributeName.ARIA_REQUIRED] = this.props.accessibilityRequired;
        }
        if (typeof this.props.accessibilityExpanded === "boolean") {
            props[AttributeName.ARIA_EXPANDED] = this.props.accessibilityExpanded;
        }
        if (typeof this.props.accessibilityHasPopup === "string" || typeof this.props.accessibilityHasPopup === "boolean") {
            props[AttributeName.ARIA_HAS_POPUP] = this.props.accessibilityHasPopup;
        }
        if (typeof this.props.accessibilityPressed === "string" || typeof this.props.accessibilityPressed === "boolean") {
            props[AttributeName.ARIA_PRESSED] = this.props.accessibilityPressed;
        }
        if (typeof this.props.accessibilityReadOnly === "boolean") {
            props[AttributeName.ARIA_READONLY] = this.props.accessibilityReadOnly;
        }
        if (typeof this.props.accessibilityDisabled === "boolean") {
            props[AttributeName.ARIA_DISABLED] = this.props.accessibilityDisabled;
        }
        if (typeof this.props.accessibilityLevel === "number") {
            props[AttributeName.ARIA_LEVEL] = this.props.accessibilityLevel;
        }
        if (typeof this.props.accessibilityHidden === "boolean") {
            props[AttributeName.ARIA_HIDDEN] = this.props.accessibilityHidden;
        }
        if (typeof this.props.isSelected === "boolean") {
            props[AttributeName.ARIA_SELECTED] = this.props.isSelected;
        }
        if (this.props.activeDescendantId) {
            props[AttributeName.ARIA_ACTIVE_DESCENDANT] = this.props.activeDescendantId;
        }
        if (this.props.accessibilityCurrent) {
            props[AttributeName.ARIA_CURRENT] = this.props.accessibilityCurrent;
        }
        if (typeof this.props.accessibilityValueMin === "number") {
            props[AttributeName.ARIA_VALUE_MIN] = this.props.accessibilityValueMin;
        }
        if (typeof this.props.accessibilityValueMax === "number") {
            props[AttributeName.ARIA_VALUE_MAX] = this.props.accessibilityValueMax;
        }
        if (typeof this.props.accessibilityValueNow === "number") {
            props[AttributeName.ARIA_VALUE_NOW] = this.props.accessibilityValueNow;
        }
        if (typeof this.props.accessibilityModal === "boolean") {
            props[AttributeName.ARIA_MODAL] = this.props.accessibilityModal;
        }
        if (this.props.accessibilityValueText) {
            props[AttributeName.ARIA_VALUE_TEXT] = this.props.accessibilityValueText;
        }
        if (this.props.role) {
            props[AttributeName.ROLE] = this.props.role;
        }
        if (this.props.title) {
            props[AttributeName.TITLE] = this.props.title;
        }
        if (this.props.accessibilityAriaOrientation) {
            props[AttributeName.ARIA_ORIENTATION] = this.props.accessibilityAriaOrientation;
        }
        if (typeof this.props.tabIndex === "number") {
            props.tabIndex = this.props.tabIndex;
        }
        var learningPathId = this.props[CustomControlConstants.LearningPathAttributeName];
        if (learningPathId) {
            props[CustomControlConstants.LearningPathAttributeName] = learningPathId;
        }
        if (this.props.testhooks) {
            var testhooks = this.props.testhooks;
            for (var key in testhooks) {
                props["data-" + key] = testhooks[key];
            }
        }
        if (this.props.onClick != null)
            props.onClick = this.props.onClick;
        if (this.props.onDoubleClick != null)
            props.onDoubleClick = this.props.onDoubleClick;
        if (this.props.onDrag != null)
            props.onDrag = this.props.onDrag;
        if (this.props.onDragEnd != null)
            props.onDragEnd = this.props.onDragEnd;
        if (this.props.onDragEnter != null)
            props.onDragEnter = this.props.onDragEnter;
        if (this.props.onDragExit != null)
            props.onDragExit = this.props.onDragExit;
        if (this.props.onDragLeave != null)
            props.onDragLeave = this.props.onDragLeave;
        if (this.props.onDragOver != null)
            props.onDragOver = this.props.onDragOver;
        if (this.props.onDragStart != null)
            props.onDragStart = this.props.onDragStart;
        if (this.props.onDrop != null)
            props.onDrop = this.props.onDrop;
        if (this.props.onClickCapture != null)
            props.onClickCapture = this.props.onClickCapture;
        if (this.props.onPointerOver != null)
            props.onPointerOver = this.props.onPointerOver;
        if (this.props.onPointerOut != null)
            props.onPointerOut = this.props.onPointerOut;
        if (this.props.onPointerUp != null)
            props.onPointerUp = this.props.onPointerUp;
        if (this.props.onPointerDown != null)
            props.onPointerDown = this.props.onPointerDown;
        if (this.props.onPointerEnter != null)
            props.onPointerEnter = this.props.onPointerEnter;
        if (this.props.onPointerLeave != null)
            props.onPointerLeave = this.props.onPointerLeave;
        if (this.props.onPointerMove != null)
            props.onPointerMove = this.props.onPointerMove;
        if (this.props.onPointerCancel != null)
            props.onPointerCancel = this.props.onPointerCancel;
        if (this.props.onBlur != null)
            props.onBlur = this.props.onBlur;
        if (this.props.onFocus != null)
            props.onFocus = this.props.onFocus;
        if (this.props.onMouseEnter != null)
            props.onMouseEnter = this.props.onMouseEnter;
        if (this.props.onMouseLeave != null)
            props.onMouseLeave = this.props.onMouseLeave;
        if (this.props.onKeyDown != null)
            props.onKeyDown = this.props.onKeyDown;
        if (this.props.onKeyUp != null)
            props.onKeyUp = this.props.onKeyUp;
        if (this.props.onScroll != null)
            props.onScroll = this.props.onScroll;
        Object.assign(props, this.getElementProps());
        props.children = null;
        props.style = this.getElementStyle();
        var className = this.getElementClassName() + " " + this.getFlexClassName(props.style);
        if (className.length > 0) {
            props.className = className;
            props.style = {};
        }
        return props;
    };
    ComponentBase.prototype.getElementStyle = function () {
        return this.props.style;
    };
    ComponentBase.prototype.getElementClassName = function () {
        return ((this.props.styles ? this.props.styles.rule : "") +
            (this.props.explicitStyles ? " " + this.props.explicitStyles : ""));
    };
    ComponentBase.prototype.getFlexClassName = function (_style) {
        return "";
    };
    ComponentBase.prototype.getElementChildren = function () {
        var children = this.props.children;
        if (Array.isArray(children)) {
            if (children.length === 0) {
                return null;
            }
            else if (children.length > 1 && window.DEBUG) {
                var validChildren = children.filter(function (x) { return React.isValidElement(x); });
                if (validChildren.length > 1) {
                    var previousNames = {};
                    for (var i = 0; i < validChildren.length; i++) {
                        var child = validChildren[i];
                        if (!child.key) {
                            var key = child.key || child.type.name;
                            if (previousNames[key])
                                console.warn("The React child should have a unique key within the parent's scope:", key, ", current element id/key =", this.props.id, ", this element type:", this.constructor.name);
                            previousNames[key] = key;
                        }
                    }
                }
            }
        }
        if (typeof children === "string" && children.length === 0) {
            return null;
        }
        return children;
    };
    ComponentBase.isElementScrollable = function (style) {
        return (style.overflow === "auto" ||
            style.overflowX === "auto" ||
            style.overflowY === "auto" ||
            style.overflow === "scroll" ||
            style.overflowX === "scroll" ||
            style.overflowY === "scroll");
    };
    ComponentBase.prototype.render = function () {
        return React.createElement(this.getElementName(), this.getElementPropsInternal(), this.getElementChildren());
    };
    Object.defineProperty(ComponentBase.prototype, "isIE", {
        get: function () {
            return IS_IE;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ComponentBase.prototype, "isEdge", {
        get: function () {
            return IS_EDGE;
        },
        enumerable: false,
        configurable: true
    });
    return ComponentBase;
}(React.Component));
export { ComponentBase };
export default ComponentBase;

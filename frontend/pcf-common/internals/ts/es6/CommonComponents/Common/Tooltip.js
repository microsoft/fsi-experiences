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
import { findDOMNode } from "react-dom";
import { Text } from "../Primitive/Text";
import { View } from "../Primitive/View";
var ARROW_HEIGHT = 10;
var ARROW_WIDTH = 10;
var DEFAULT_DIRECTION = "top";
var Tooltip = (function (_super) {
    __extends(Tooltip, _super);
    function Tooltip(props) {
        var _this = _super.call(this, props) || this;
        _this.mouseEnterHandler = _this.mouseEnterHandler.bind(_this);
        _this.mouseLeaveHandler = _this.mouseLeaveHandler.bind(_this);
        _this.setTargetRef = _this.setTargetRef.bind(_this);
        _this.state = {
            isOpened: false,
        };
        return _this;
    }
    Tooltip.prototype.generateTooltipStyle = function () {
        var DEFAULT_TOOLTIP_STYLE = {
            backgroundColor: "#666666",
            padding: "5px 10px",
            position: "relative",
        };
        return Object.assign({}, DEFAULT_TOOLTIP_STYLE, this.props.tooltipStyle);
    };
    Tooltip.prototype.generateTooltipContentStyle = function () {
        var DEFAULT_TOOLTIP_TEXT_STYLE = {
            color: "white",
        };
        return Object.assign({}, DEFAULT_TOOLTIP_TEXT_STYLE, this.props.tooltipContentStyle);
    };
    Tooltip.prototype.generatePopup = function () {
        var _a = this._targetElement, offsetLeft = _a.offsetLeft, offsetHeight = _a.offsetHeight, offsetWidth = _a.offsetWidth;
        var popupProps = {
            position: "absolute",
            width: this.props.width,
            bottom: offsetHeight + ARROW_HEIGHT / 2,
            left: offsetLeft,
        };
        var position = this.props.direction || DEFAULT_DIRECTION;
        var directionStyles = {};
        switch (position) {
            case "left":
                directionStyles = {
                    bottom: -5,
                    transform: "translateX(-100%)",
                    left: offsetLeft,
                };
                break;
            case "right":
                directionStyles = {
                    bottom: -5,
                    left: offsetWidth + ARROW_WIDTH / 2,
                };
                break;
            case "top":
                directionStyles = {
                    bottom: offsetHeight + ARROW_HEIGHT / 2,
                    left: offsetLeft,
                };
                break;
            case "bottom":
                directionStyles = {
                    bottom: -(ARROW_HEIGHT / 2),
                    transform: "translateY(100%)",
                    left: offsetLeft,
                };
                break;
        }
        Object.assign(popupProps, directionStyles);
        return (React.createElement(View, { style: popupProps, role: "alertdialog", key: "tooltipPopup" },
            React.createElement(View, { style: this.generateTooltipStyle(), key: "tooltipWrapper" },
                React.createElement(Text, { style: this.generateTooltipContentStyle(), role: "tooltip" }, this.props.text),
                this.generatePopupArrow())));
    };
    Tooltip.prototype.generatePopupArrow = function () {
        var POPUP_ARROW_STYLES = {
            width: 0,
            height: 0,
            fontSize: 0,
            lineHeight: 0,
            borderColor: "transparent",
            borderTopColor: "#666666",
            borderWidth: ARROW_WIDTH / 2,
            borderStyle: "solid",
            position: "absolute",
            margin: "auto",
        };
        var directionStyles = {};
        var position = this.props.direction || DEFAULT_DIRECTION;
        switch (position) {
            case "left":
                directionStyles = {
                    transform: "rotate(-90deg)",
                    top: 0,
                    bottom: 0,
                    right: -ARROW_WIDTH,
                };
                break;
            case "right":
                directionStyles = {
                    transform: "rotate(90deg)",
                    top: 0,
                    bottom: 0,
                    left: -ARROW_WIDTH,
                };
                break;
            case "top":
                directionStyles = {
                    right: 0,
                    left: 0,
                    bottom: -ARROW_HEIGHT,
                };
                break;
            case "bottom":
                directionStyles = {
                    transform: "rotate(180deg)",
                    top: -ARROW_HEIGHT,
                    left: 0,
                    right: 0,
                };
                break;
        }
        Object.assign(POPUP_ARROW_STYLES, directionStyles);
        return React.createElement(Text, { style: POPUP_ARROW_STYLES });
    };
    Tooltip.prototype.mouseEnterHandler = function (event) {
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
        if (!this.state.isOpened) {
            this.setState({
                isOpened: true,
            });
        }
    };
    Tooltip.prototype.mouseLeaveHandler = function (event) {
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
        if (this.state.isOpened) {
            this.setState({
                isOpened: false,
            });
        }
    };
    Tooltip.prototype.setTargetRef = function (view) {
        this._targetElement = findDOMNode(view);
    };
    Tooltip.prototype.render = function () {
        var style = {
            position: "relative",
            display: "inline-flex",
            alignItems: "center",
        };
        return (React.createElement(View, { style: style, accessibilityHidden: this.props.accessibilityHidden },
            React.createElement(View, { ref: this.setTargetRef, onPointerEnter: this.mouseEnterHandler, onPointerLeave: this.mouseLeaveHandler, onFocus: this.mouseEnterHandler, onBlur: this.mouseLeaveHandler }, this.props.children),
            this.state.isOpened ? this.generatePopup() : null));
    };
    return Tooltip;
}(React.Component));
Tooltip.defaultProps = {
    width: 300,
};
export { Tooltip };

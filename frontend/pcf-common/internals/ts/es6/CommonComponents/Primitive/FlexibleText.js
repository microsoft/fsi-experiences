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
import { Text } from "./Text";
import { View } from "./View";
import { ComponentBase } from "./ComponentBase";
var FIELD_LABEL_WIDTH = 144;
var FlexibleText = (function (_super) {
    __extends(FlexibleText, _super);
    function FlexibleText(props) {
        var _this = _super.call(this, props) || this;
        _this._toggleCollapseState = _this._toggleCollapseState.bind(_this);
        _this.saveItemRef = _this.saveItemRef.bind(_this);
        _this._firstRender = true;
        _this._totalLineHeight = 0;
        _this.state = {
            collapsed: true,
        };
        _this._backgroundCanvas = document.createElement("canvas");
        _this._areLinesTruncated = false;
        return _this;
    }
    FlexibleText.prototype.componentDidMount = function () {
        if (!this.props.isFieldLabel && this._firstRender && this._textRef && this.props.truncatedlines) {
            this.forceUpdate();
        }
    };
    FlexibleText.prototype.componentWillUnmount = function () {
        this._backgroundCanvas = null;
    };
    FlexibleText.prototype._toggleCollapseState = function () {
        if (this.props.noExpandable)
            return;
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    FlexibleText.prototype.saveItemRef = function (item) {
        this._textRef = item;
    };
    FlexibleText.prototype._calculateLineHeight = function () {
        if (!this._textRef || !this.state.collapsed)
            return;
        var element = ReactDOM.findDOMNode(this._textRef);
        if (!element)
            return;
        var computedStyle = window.getComputedStyle(element);
        if (this._firstRender) {
            this._originalHeight = parseInt(computedStyle.height, 10);
            this._firstRender = false;
        }
        var lineHeight = 0;
        if (this.props.lineHeight) {
            lineHeight = this.props.lineHeight;
        }
        else {
            lineHeight = parseInt(computedStyle.lineHeight, 10);
        }
        if (isNaN(lineHeight)) {
            var clone = element.cloneNode();
            clone.innerHTML = "<br>";
            element.appendChild(clone);
            var singleLineHeight = clone.offsetHeight;
            clone.innerHTML = "<br><br>";
            var doubleLineHeight = clone.offsetHeight;
            element.removeChild(clone);
            lineHeight = doubleLineHeight - singleLineHeight;
        }
        this._areLinesTruncated = this._originalHeight > lineHeight * this.props.truncatedlines;
        if (!this._areLinesTruncated) {
            return this._originalHeight + "px";
        }
        if (lineHeight !== 0) {
            var totalLineHeight = lineHeight * this.props.truncatedlines;
            this._totalLineHeight = totalLineHeight;
        }
        return this._totalLineHeight + "px";
    };
    FlexibleText.prototype.render = function () {
        var textStyle = Object.assign(this._getTextStyle(), this.props.flexibleTextStyle);
        var containerStyle = Object.assign({ display: "flex", flexDirection: "Column", width: "100%" }, this.props.flexibleTextContainerStyle);
        return (React.createElement(View, { style: containerStyle },
            React.createElement(Text, __assign({}, this.props, { onClick: this._toggleCollapseState, style: textStyle, ref: this.props.isFieldLabel ? null : this.saveItemRef, id: this.props.id, className: this._returnExpandableClassName() }), this.props.children)));
    };
    FlexibleText.prototype._calculateHeight = function () {
        var calculateHeight = 0;
        if (this.props.isFieldLabel) {
            var contextCanvas = this._backgroundCanvas.getContext("2d");
            contextCanvas.font =
                this.props.flexibleTextStyle && this.props.flexibleTextStyle.fontSize && this.props.flexibleTextStyle.fontFamily
                    ? this.props.flexibleTextStyle.fontSize + " " + this.props.flexibleTextStyle.fontFamily
                    : "14px Segoe UI";
            var potentialTextLines = contextCanvas.measureText(this.props.children.props.children).width / FIELD_LABEL_WIDTH;
            if (potentialTextLines > this.props.truncatedlines) {
                potentialTextLines = this.props.truncatedlines;
                this._areLinesTruncated = true;
            }
            calculateHeight =
                this.props.lineHeight && this._areLinesTruncated ? this.props.lineHeight * potentialTextLines : null;
        }
        return calculateHeight;
    };
    FlexibleText.prototype._getTextStyle = function () {
        if (!this.state.collapsed)
            return {};
        return this.props.truncatedlines === 1
            ? {
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                direction: this.props.isRTL ? "rtl" : "ltr",
            }
            : {
                overflow: "hidden",
                position: "relative",
                height: this.props.isFieldLabel ? this._calculateHeight() : this._calculateLineHeight(),
                display: "inline-block",
                textAlign: "justify",
                ":after": this._areLinesTruncated
                    ? { background: this.props.maskingColor ? this.props.maskingColor : "#F8F7F6" }
                    : "",
                paddingLeft: this.props.isRTL ? "0.75rem" : undefined,
                paddingRight: this.props.isRTL ? undefined : "0.75rem",
            };
    };
    FlexibleText.prototype._returnExpandableClassName = function () {
        if (this._areLinesTruncated) {
            return this.props.isRTL ? "block-with-text-noexpansion-rtl" : "block-with-text-noexpansion";
        }
        return "";
    };
    return FlexibleText;
}(ComponentBase));
export { FlexibleText };

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
import { applyIFlexboxContainerProp, getCssClassName as getIFlexboxContainerCssClassName, } from "./IFlexboxContainerStyle";
import { ComponentBase } from "./ComponentBase";
import * as ReactFela from "react-fela";
import { rules } from "./FelaConnectHelper";
function renderProgressRing() {
    return (React.createElement("div", null,
        React.createElement("div", { className: "progressDot" }),
        React.createElement("div", { className: "progressDot" }),
        React.createElement("div", { className: "progressDot" }),
        React.createElement("div", { className: "progressDot" }),
        React.createElement("div", { className: "progressDot" })));
}
var InnerProgressIndicator = (function (_super) {
    __extends(InnerProgressIndicator, _super);
    function InnerProgressIndicator(props) {
        var _this = _super.call(this, props) || this;
        _this._delayTimeoutId = undefined;
        var delayIndicator = props.displayDelay > 0;
        _this.state = {
            renderIndicator: !delayIndicator,
        };
        if (delayIndicator) {
            _this._delayTimeoutId = setTimeout(function () { return _this.setState({ renderIndicator: true }); }, props.displayDelay);
        }
        return _this;
    }
    InnerProgressIndicator.prototype.componentWillUnmount = function () {
        if (this._delayTimeoutId !== undefined) {
            clearTimeout(this._delayTimeoutId);
            this._delayTimeoutId = undefined;
        }
    };
    InnerProgressIndicator.prototype.shouldComponentUpdate = function (nextProps, nextState) {
        return (this.props.active !== nextProps.active ||
            this.props.progressType !== nextProps.progressType ||
            this.state.renderIndicator !== nextState.renderIndicator);
    };
    InnerProgressIndicator.prototype.getElementName = function () {
        return "div";
    };
    InnerProgressIndicator.prototype.getFlexClassName = function (style) {
        var classString = "";
        var styleTemp;
        if (style) {
            styleTemp = Object.assign(applyIFlexboxContainerProp(style));
        }
        else {
            return null;
        }
        if (!this.props.progressType || this.props.progressType === "bar") {
            classString += "indeterminateProgressBar";
        }
        else if (this.props.progressType === "ring") {
            classString += "indeterminateProgressRing";
        }
        if (this.props.active !== true && this.props.animating !== true) {
            classString += " hideProgressBar";
        }
        classString += " " + getIFlexboxContainerCssClassName(styleTemp ? styleTemp.display : null);
        return classString;
    };
    InnerProgressIndicator.prototype.getElementChildren = function () {
        if (this.props.progressType === "ring" && this.state.renderIndicator) {
            if (this.isIE) {
                return React.createElement("div", null, "......");
            }
            return renderProgressRing();
        }
        return undefined;
    };
    InnerProgressIndicator.displayName = "ProgressIndicator";
    return InnerProgressIndicator;
}(ComponentBase));
var ProgressIndicator = ReactFela.connect(rules)(InnerProgressIndicator);
export { InnerProgressIndicator, ProgressIndicator };

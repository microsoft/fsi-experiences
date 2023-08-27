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
import { applyIFlexboxContainerProp, getCssClassName as getIFlexboxContainerCssClassName, } from "./IFlexboxContainerStyle";
import { ComponentBase } from "./ComponentBase";
import * as AttributeName from "../Supplementary/Accessibility/Attributes/AttributeName";
import * as ReactFela from "react-fela";
import { rules } from "./FelaConnectHelper";
var InnerButton = (function (_super) {
    __extends(InnerButton, _super);
    function InnerButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InnerButton.prototype.getElementName = function () {
        return "button";
    };
    InnerButton.prototype.getElementProps = function () {
        var props = {
            type: "button",
            ref: this.props.refCallback ? this.refCallbackTrigger.bind(this) : null,
        };
        props[AttributeName.ACCESS_KEY] = this.props.accessKey;
        if (this.props.disabled) {
            props[AttributeName.DISABLED] = true;
        }
        return props;
    };
    InnerButton.prototype.getElementClassName = function () {
        var className = _super.prototype.getElementClassName.call(this);
        if (this.props && this.props.className) {
            className += " " + this.props.className;
        }
        return className;
    };
    InnerButton.prototype.getFlexClassName = function (style) {
        return getIFlexboxContainerCssClassName(style ? style.display : null);
    };
    InnerButton.prototype.getElementStyle = function () {
        if (this.props.style) {
            return Object.assign({}, applyIFlexboxContainerProp(this.props.style));
        }
    };
    InnerButton.displayName = "Button";
    return InnerButton;
}(ComponentBase));
var Button = ReactFela.connect(rules)(InnerButton);
export { InnerButton, Button };

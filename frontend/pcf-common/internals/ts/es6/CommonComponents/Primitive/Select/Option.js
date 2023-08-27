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
import { ComponentBase } from "../ComponentBase";
import * as ReactFela from "react-fela";
import { rules } from "../FelaConnectHelper";
var DATA_SELECTED = "data-selected";
var InnerOption = (function (_super) {
    __extends(InnerOption, _super);
    function InnerOption() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InnerOption.prototype.getElementName = function () {
        return "option";
    };
    InnerOption.prototype.getElementProps = function () {
        var props = {
            value: this.props.value ? this.props.value.Value.toString() : "-1",
        };
        if (this.props.disabled) {
            props.disabled = true;
        }
        if (this.props.selected) {
            props[DATA_SELECTED] = true;
        }
        return props;
    };
    InnerOption.prototype.getElementChildren = function () {
        return this.props.value ? this.props.value.Label || "" : "";
    };
    return InnerOption;
}(ComponentBase));
var Option = ReactFela.connect(rules)(InnerOption);
export { InnerOption, Option };

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
import * as AccessibilityRole from "../../Supplementary/Accessibility/Attributes/Role";
var DATA_CHECKED = "data-checked";
var InputOption = (function (_super) {
    __extends(InputOption, _super);
    function InputOption(props) {
        var _this = _super.call(this, props) || this;
        _this._onChangeHandler = _this._onChangeHandler.bind(_this);
        return _this;
    }
    InputOption.prototype.getElementName = function () {
        return "input";
    };
    InputOption.prototype._onChangeHandler = function (e) {
        var checked = e.target.checked;
        if (checked) {
            if (this.props.onChange) {
                this.props.onChange(this.props.value);
            }
        }
    };
    InputOption.prototype.getElementProps = function () {
        var props = {
            id: this.props.id,
            key: this.props.id,
            checked: this.props.checked,
            name: this.props.name,
            role: AccessibilityRole.RADIO,
            type: "radio",
            onChange: this._onChangeHandler,
        };
        if (this.props.disabled) {
            props.disabled = true;
        }
        if (this.props.checked) {
            props[DATA_CHECKED] = true;
        }
        if (this.props.value) {
            props.value = this.props.value.Label;
        }
        return props;
    };
    InputOption.displayName = "InputOption";
    return InputOption;
}(ComponentBase));
export { InputOption };

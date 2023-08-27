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
import { ComponentBase } from "./ComponentBase";
import * as AttributeName from "../Supplementary/Accessibility/Attributes/AttributeName";
import * as AccessibilityRole from "../Supplementary/Accessibility/Attributes/Role";
import * as ReactFela from "react-fela";
import { rules } from "./FelaConnectHelper";
var InnerCheckbox = (function (_super) {
    __extends(InnerCheckbox, _super);
    function InnerCheckbox(props) {
        var _this = _super.call(this, props) || this;
        _this._onCheckboxChange = _this._onCheckboxChange.bind(_this);
        return _this;
    }
    InnerCheckbox.prototype._onCheckboxChange = function (e) {
        var checkboxValue = e.target.checked;
        this.props.onChange(checkboxValue);
    };
    InnerCheckbox.prototype.getElementName = function () {
        return "input";
    };
    InnerCheckbox.prototype.getElementProps = function () {
        var _a;
        var props = (_a = {
                tabIndex: this.props.tabIndex ? this.props.tabIndex : 0,
                disabled: this.props.disabled,
                key: this.props.key,
                id: this.props.id ? this.props.id : this.props.key,
                onChange: this._onCheckboxChange,
                role: this.props.accessibilityRole ? this.props.accessibilityRole : AccessibilityRole.CHECKBOX,
                type: "checkbox",
                name: this.props.name ? this.props.name : null
            },
            _a[AttributeName.ARIA_CHECKED] = this.props.checked,
            _a.checked = this.props.checked,
            _a);
        props.testhooks = this.props.testhooks;
        return props;
    };
    InnerCheckbox.displayName = "Checkbox";
    return InnerCheckbox;
}(ComponentBase));
var Checkbox = ReactFela.connect(rules)(InnerCheckbox);
export { Checkbox };

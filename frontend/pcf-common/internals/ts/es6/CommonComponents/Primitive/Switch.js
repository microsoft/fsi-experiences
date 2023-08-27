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
import { Label } from "./Label";
import { ComponentBase } from "./ComponentBase";
import { Select } from "./Select/Select";
import { Checkbox } from "./Checkbox";
import * as AccessibilityRole from "../Supplementary/Accessibility/Attributes/Role";
import { View } from "./View";
import * as ReactFela from "react-fela";
import { rules } from "./FelaConnectHelper";
var CHECKBOX_DISPLAY_TAG = "checkbox";
var SELECT_DISPLAY_TAG = "picklist";
var RADIO_DISPLAY_TAG = "radio";
var InnerSwitch = (function (_super) {
    __extends(InnerSwitch, _super);
    function InnerSwitch(props) {
        var _this = _super.call(this, props) || this;
        _this._optionSetChange = _this._optionSetChange.bind(_this);
        _this._onCheckboxChange = _this._onCheckboxChange.bind(_this);
        _this.onClick = _this.onClick.bind(_this);
        _this.state = {
            checked: _this.props.value || false,
        };
        return _this;
    }
    InnerSwitch.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.value !== null && nextProps.value !== undefined && nextProps.value !== this.state.checked) {
            this.setState({ checked: nextProps.value });
        }
    };
    InnerSwitch.prototype._onCheckboxChange = function (checkboxValue) {
        if (this.state.checked !== checkboxValue) {
            this.setState({ checked: checkboxValue });
            if (this.props.onValueChange) {
                this.props.onValueChange(checkboxValue);
            }
        }
        if (this.props.onOptionSetValueChange) {
            if (this.props.options) {
                var currentValue = this.props.options[Number(checkboxValue)];
                this.props.onOptionSetValueChange(currentValue);
            }
        }
    };
    InnerSwitch.prototype._optionSetChange = function (option) {
        if (option) {
            if (this.props.onOptionSetValueChange) {
                this.props.onOptionSetValueChange(option);
            }
        }
    };
    InnerSwitch.prototype.onClick = function () {
        if (this.props.onOptionSetValueChange) {
            if (this.props.options) {
                var currentValue = this.props.options[Number(!this.props.value)];
                this.props.onOptionSetValueChange(currentValue);
            }
        }
    };
    InnerSwitch.prototype.getCheckboxComponent = function () {
        var props = {
            tabIndex: 0,
            disabled: this.props.disabled,
            id: this.props.id || null,
            key: this.props.id || null,
            onChange: this._onCheckboxChange,
            testhooks: this.props.testhooks,
            name: this.props.name ? this.props.name : null,
            accessibilityRole: !this.props.displayAs || this.props.displayAs === CHECKBOX_DISPLAY_TAG ? "" : AccessibilityRole.SWITCH,
            accessibilityLabel: this.props.accessibilityLabel,
            describedByElementId: this.props.describedByElementId ? null : this.props.describedByElementId,
            style: this.props.style,
            checked: this.props.displayAs ? this.props.value : this.state.checked,
            accessibilityChecked: this.props.displayAs ? this.props.value : this.state.checked,
            title: this.props.title ? this.props.title : null,
        };
        return React.createElement(Checkbox, __assign({}, props));
    };
    InnerSwitch.prototype.getSelectComponent = function () {
        var currentValue = this.props.options[Number(this.props.value)];
        var props = {
            style: this.props.style || {},
            options: this.props.options,
            value: currentValue,
            onChange: this._optionSetChange,
            testhooks: this.props.testhooks,
            disabled: this.props.disabled,
            key: this.props.absoluteId,
            name: this.props.id,
            id: this.props.id,
            accessibilityLabel: this.props.accessibilityLabel,
            accessibilityRequired: this.props.accessibilityRequired,
            title: this.props.title,
            onFocus: this.props.disabled ? null : this.props.onFocus,
            onBlur: this.props.disabled ? null : this.props.onBlur,
            describedByElementId: this.props.describedByElementId ? null : this.props.describedByElementId,
        };
        return React.createElement(Select, __assign({}, props));
    };
    InnerSwitch.prototype.getLabelComponent = function () {
        var props = {};
        Object.assign(props, this.props);
        props.id = props.id && props.id + "_label";
        var label = this.props.displayValue;
        if (this.props.displayAs === CHECKBOX_DISPLAY_TAG) {
            props.forElementId = props.id || null;
            label = this.props.defaultValue;
        }
        else {
            props.onClick = this.onClick;
        }
        if (this.props.testhooks) {
            props.testhooks = this.props.testhooks;
        }
        props.style = {
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
        };
        if (this.props.displayValue) {
            return React.createElement(Label, __assign({}, props), label);
        }
        return null;
    };
    InnerSwitch.prototype.render = function () {
        if (!this.props.options && this.props.displayAs) {
            return React.createElement(Label, null);
        }
        if (this.props.displayAs === SELECT_DISPLAY_TAG) {
            return this.getSelectComponent();
        }
        if (this.props.displayAs === RADIO_DISPLAY_TAG) {
            return this.getLabelComponent();
        }
        var props = {
            style: {
                display: "flex",
                alignItems: "center",
                width: "100%",
            },
        };
        return (React.createElement(View, __assign({}, props, { testhooks: this.props.testhooks }),
            this.getCheckboxComponent(),
            this.getLabelComponent()));
    };
    InnerSwitch.displayName = "Switch";
    return InnerSwitch;
}(ComponentBase));
var Switch = ReactFela.connect(rules)(InnerSwitch);
export { InnerSwitch, Switch };

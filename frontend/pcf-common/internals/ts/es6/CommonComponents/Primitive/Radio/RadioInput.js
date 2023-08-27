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
import * as ReactFela from "react-fela";
import { rules } from "../FelaConnectHelper";
import { IsNullOrUndefined } from "../../../CustomControls/Models/CustomControlUtilityPointers";
import { ComponentBase } from "../ComponentBase";
import { View } from "../View";
import { guidV4String } from "../../../CustomControls/Utilities/GuidHelper";
import { InputOption } from "./InputOption";
import { Label } from "../Label";
var InnerRadioInput = (function (_super) {
    __extends(InnerRadioInput, _super);
    function InnerRadioInput(props) {
        var _this = _super.call(this, props) || this;
        _this._onChangeHandler = _this._onChangeHandler.bind(_this);
        _this._uuid = guidV4String();
        _this.state = {
            value: props.value,
        };
        return _this;
    }
    InnerRadioInput.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps && !_optionsEqual(this.state.value, nextProps.value)) {
            this.setState({ value: nextProps.value });
        }
    };
    InnerRadioInput.prototype._uniqueId = function (sourceId, supplement) {
        if (sourceId === void 0) { sourceId = this.props.id; }
        if (supplement === void 0) { supplement = this._uuid; }
        return sourceId + "_" + supplement;
    };
    InnerRadioInput.prototype._optionId = function (option) {
        return this._uniqueId() + "_" + option.Value;
    };
    InnerRadioInput.prototype._getInputOptionProps = function (option, id) {
        var isChecked = option.Value === this.state.value.Value;
        var props = {
            id: id,
            key: id,
            value: option,
            name: this.props.name,
            checked: isChecked,
            onChange: this._onChangeHandler,
            disabled: this.props.disabled,
        };
        if (this.props.style) {
            props.style = this.props.style.inputOptionStyle || null;
        }
        return props;
    };
    InnerRadioInput.prototype._getLabelOptionProps = function (id) {
        var props = {
            forElementId: id,
        };
        if (this.props.style) {
            props.style = this.props.style.inputOptionLabelStyle || null;
        }
        return props;
    };
    InnerRadioInput.prototype._getViewStyles = function () {
        var props = {};
        if (this.props.style) {
            props.style = this.props.style.style || null;
        }
        return props;
    };
    InnerRadioInput.prototype._onChangeHandler = function (option) {
        if (option) {
            this.setState({ value: option });
            if (this.props.onChange) {
                this.props.onChange(option);
            }
        }
    };
    InnerRadioInput.prototype._getOptionList = function () {
        var _this = this;
        if (!this.props.options || !this.props.options.length || !this.props.value) {
            return null;
        }
        return this.props.options.map(function (option) {
            var id = _this._optionId(option);
            var inputProps = _this._getInputOptionProps(option, id);
            var labelProps = _this._getLabelOptionProps(id);
            var viewProps = _this._getViewStyles();
            return (React.createElement(View, __assign({ key: guidV4String() }, viewProps),
                React.createElement(InputOption, __assign({}, inputProps)),
                React.createElement(Label, __assign({}, labelProps), option.Label)));
        });
    };
    InnerRadioInput.prototype.render = function () {
        return React.createElement(View, { style: this.props.style.style }, this._getOptionList());
    };
    return InnerRadioInput;
}(ComponentBase));
var RadioInput = ReactFela.connect(rules)(InnerRadioInput);
function _optionsEqual(one, two) {
    if (!one || !two) {
        return false;
    }
    if (IsNullOrUndefined(one.Value) && IsNullOrUndefined(two.Value)) {
        return one.Label === two.Label;
    }
    return one.Value === two.Value;
}
export { InnerRadioInput, RadioInput };

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
import { IsNullOrUndefined } from "../../../CustomControls/Models/CustomControlUtilityPointers";
import { ComponentBase } from "../ComponentBase";
import { Option } from "./Option";
import { guidV4String } from "../../../CustomControls/Utilities/GuidHelper";
import * as ReactFela from "react-fela";
import { ruleGen } from "../FelaConnectHelper";
var InnerSelect = (function (_super) {
    __extends(InnerSelect, _super);
    function InnerSelect(props) {
        var _this = _super.call(this, props) || this;
        _this._onChangeHandler = _this._onChangeHandler.bind(_this);
        _this._uuid = guidV4String();
        _this.state = {
            value: props.value,
        };
        return _this;
    }
    InnerSelect.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps && !_optionsEqual(this.state.value, nextProps.value, this._isMultiple())) {
            this.setState({ value: nextProps.value });
        }
    };
    InnerSelect.prototype._uniqueId = function (sourceId, supplement) {
        if (sourceId === void 0) { sourceId = this.props.id; }
        if (supplement === void 0) { supplement = this._uuid; }
        return sourceId + "_" + supplement;
    };
    InnerSelect.prototype._isMultiple = function () {
        return !!this.props.multiple;
    };
    InnerSelect.prototype._optionId = function (option) {
        return "" + this._uniqueId() + option.Value;
    };
    InnerSelect.prototype._onChangeHandler = function (event) {
        var options = Array.from(event.target.options).filter(function (option) {
            return option.selected;
        });
        var values = [];
        var _loop_1 = function (i) {
            var value = options[i].value;
            if (!IsNullOrUndefined(value)) {
                var candidates = this_1.props.options.filter(function (item) { return (!IsNullOrUndefined(item.Value) ? item.Value.toString() : "") === value; });
                if (candidates && candidates.length) {
                    values.push(candidates[0]);
                }
            }
        };
        var this_1 = this;
        for (var i = 0; i < options.length; i++) {
            _loop_1(i);
        }
        if (values.length > 0) {
            var value = this._isMultiple() ? { value: values } : { value: values[0] };
            this.setState(value);
            if (this.props.onChange) {
                this.props.onChange(value.value);
            }
        }
    };
    InnerSelect.prototype.getElementName = function () {
        return "select";
    };
    InnerSelect.prototype.getElementProps = function () {
        var props = {
            value: this.props.multiple
                ? this.state.value
                    ? this.state.value.map(function (x) { return x.Value.toString(); })
                    : ["-1"]
                : this.state.value
                    ? this.state.value.Value.toString()
                    : "-1",
            onChange: this._onChangeHandler,
        };
        props.describedByElementId = this.props.describedByElementId ? null : this.props.describedByElementId;
        if (this.props.disabled) {
            props.disabled = true;
        }
        if (this.props.multiple) {
            props.multiple = true;
        }
        return props;
    };
    InnerSelect.prototype.getElementChildren = function () {
        var _this = this;
        if (!this.props.options || !this.props.options.length) {
            return _super.prototype.getElementChildren.call(this);
        }
        return this.props.options.map(function (option) {
            var id = _this._optionId(option);
            var selected = false;
            if (_this.props.multiple) {
                for (var i = 0; i < _this.props.value.length; i++) {
                    if (_this.props.value[i] === option) {
                        selected = true;
                        break;
                    }
                }
            }
            else {
                selected = _this.props.value === option;
            }
            return React.createElement(Option, { id: id, key: id, value: option, selected: selected, style: _this.props.style.optionStyle });
        });
    };
    return InnerSelect;
}(ComponentBase));
function selectRuleGen(props) {
    var ownProps = {};
    Object.assign(ownProps, props);
    if (props && props.style) {
        if (props.style.selectStyle && props.style.selectStyle.appearance) {
            ownProps.style.selectStyle.appearance = props.style.selectStyle.appearance;
            ownProps.style.selectStyle.WebkitAppearance = props.style.selectStyle.appearance;
            ownProps.style.selectStyle.MozAppearance = props.style.selectStyle.appearance;
            ownProps.style.selectStyle.MsAppearance = props.style.selectStyle.appearance;
        }
        return Object.assign(props.style, ownProps.style.selectStyle, ruleGen(props));
    }
    return {};
}
var rules = function (props) {
    return { rule: selectRuleGen(props) };
};
var Select = ReactFela.connect(rules)(InnerSelect);
function _optionsEqual(currentValue, nextValue, isMultiple) {
    if (isMultiple === void 0) { isMultiple = false; }
    if (!currentValue || !nextValue) {
        return false;
    }
    if (IsNullOrUndefined(currentValue.Value) && IsNullOrUndefined(nextValue.Value)) {
        return currentValue.Label === nextValue.Label;
    }
    if (isMultiple) {
        var oneArray = currentValue;
        var twoArray_1 = nextValue;
        return (oneArray.length === twoArray_1.length &&
            oneArray.every(function (element, index) {
                return element === twoArray_1[index];
            }));
    }
    return currentValue.Value === nextValue.Value;
}
export { InnerSelect, Select };

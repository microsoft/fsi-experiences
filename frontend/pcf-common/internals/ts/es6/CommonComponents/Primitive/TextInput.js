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
import * as ReactDOM from "react-dom";
import { ComponentBase } from "./ComponentBase";
import * as AttributeName from "../Supplementary/Accessibility/Attributes/AttributeName";
import * as ReactFela from "react-fela";
import { ruleGen } from "./FelaConnectHelper";
import { getLocalizedString } from "../../CustomControls/Components/Helpers/CustomControlLocHelper";
var KeyboardType;
(function (KeyboardType) {
    KeyboardType[KeyboardType["default"] = 0] = "default";
    KeyboardType[KeyboardType["emailAddress"] = 1] = "emailAddress";
    KeyboardType[KeyboardType["numeric"] = 2] = "numeric";
    KeyboardType[KeyboardType["phonePad"] = 3] = "phonePad";
    KeyboardType[KeyboardType["asciiCapable"] = 4] = "asciiCapable";
    KeyboardType[KeyboardType["numbersAndPunctuation"] = 5] = "numbersAndPunctuation";
    KeyboardType[KeyboardType["url"] = 6] = "url";
    KeyboardType[KeyboardType["numberPad"] = 7] = "numberPad";
    KeyboardType[KeyboardType["namePhonePad"] = 8] = "namePhonePad";
    KeyboardType[KeyboardType["decimalPad"] = 9] = "decimalPad";
    KeyboardType[KeyboardType["twitter"] = 10] = "twitter";
    KeyboardType[KeyboardType["webSearch"] = 11] = "webSearch";
})(KeyboardType || (KeyboardType = {}));
var CompositionEvent;
(function (CompositionEvent) {
    CompositionEvent[CompositionEvent["start"] = 0] = "start";
    CompositionEvent[CompositionEvent["update"] = 1] = "update";
    CompositionEvent[CompositionEvent["end"] = 2] = "end";
})(CompositionEvent || (CompositionEvent = {}));
var DEFAULT_INPUT_VALUE = "---";
var MIN_TEXTAREA_ROWS = 2;
var InnerTextInput = (function (_super) {
    __extends(InnerTextInput, _super);
    function InnerTextInput(props) {
        var _this = _super.call(this, props) || this;
        _this._compositionEvents = [];
        _this.refCallbackTrigger = _this.refCallbackTrigger.bind(_this);
        _this._onKeyPress = _this._onKeyPress.bind(_this);
        _this._onChange = _this._onChange.bind(_this);
        _this._onInput = _this._onInput.bind(_this);
        _this._onFocus = _this._onFocus.bind(_this);
        _this._onBlur = _this._onBlur.bind(_this);
        _this.handlePointerDown = _this.handlePointerDown.bind(_this);
        _this.handlePointerUp = _this.handlePointerUp.bind(_this);
        _this.handleKeyDown = _this.handleKeyDown.bind(_this);
        _this._refElementCallback = _this._refElementCallback.bind(_this);
        _this.handleKeyUp = _this.handleKeyUp.bind(_this);
        _this._onCompositionStart = _this._onCompositionStart.bind(_this);
        _this._onCompositionUpdate = _this._onCompositionUpdate.bind(_this);
        _this._onCompositionEnd = _this._onCompositionEnd.bind(_this);
        _this.state = {
            value: props.value,
        };
        return _this;
    }
    InnerTextInput.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps && nextProps.value !== this.state.value) {
            this.setState({ value: nextProps.value });
        }
        if (this._dateInput) {
            this._dateInput.defaultValue = "";
        }
    };
    InnerTextInput.prototype._selectValue = function () {
        if (!this.props.type ||
            this.props.type.toLowerCase() === "text" ||
            this.props.type.toLowerCase() === "search" ||
            this.props.type.toLowerCase() === "url" ||
            this.props.type.toLowerCase() === "tel" ||
            this.props.type.toLowerCase() === "password") {
            var element = this.props.multiline
                ? ReactDOM.findDOMNode(this)
                : ReactDOM.findDOMNode(this);
            element.selectionStart = 0;
            element.selectionEnd = element.value.length;
        }
    };
    InnerTextInput.prototype._onChange = function (e) {
        if (!this.isIE) {
            this._handleOnChange(e);
        }
    };
    InnerTextInput.prototype._onInput = function (e) {
        if (this.isIE) {
            var value = this.props.multiline
                ? e.target.value
                : e.target.value;
            if ((!this.state.value && !value) || (this.state.value === value && this._compositionEvents.length === 0)) {
                return;
            }
            this._compositionEvents = [];
            this._handleOnChange(e);
        }
    };
    InnerTextInput.prototype._onCompositionStart = function () {
        this._compositionEvents.push(CompositionEvent.start);
    };
    InnerTextInput.prototype._onCompositionUpdate = function (e) {
        var value = this.props.multiline
            ? e.target.value
            : e.target.value;
        if (this.state.value !== value) {
            this.setState({
                value: value,
            });
        }
        this._compositionEvents.push(CompositionEvent.update);
    };
    InnerTextInput.prototype._onCompositionEnd = function () {
        this._compositionEvents.push(CompositionEvent.end);
    };
    InnerTextInput.prototype._handleOnChange = function (e) {
        var value = this.props.multiline
            ? e.target.value
            : e.target.value;
        this.setState({
            value: value,
        });
        if (this.props.onChange) {
            this.props.onChange(e);
        }
        if (this.props.onChangeText) {
            this.props.onChangeText(value);
        }
    };
    InnerTextInput.prototype._onKeyPress = function (e) {
        if (this.props.onKeyPress) {
            this.props.onKeyPress(e);
        }
    };
    InnerTextInput.prototype.handleFocus = function () {
        var _this = this;
        var innerHandleFocus = function () {
            if (_this.props.selectValueOnFocus && _this.state && _this.state.value) {
                _this._selectValue();
            }
        };
        if (window.navigator.userAgent.match(/Edge\/(13|14)/)) {
            return window.setTimeout(innerHandleFocus, 10);
        }
        innerHandleFocus();
    };
    InnerTextInput.prototype._onFocus = function (e) {
        this.setState({
            hasFocus: true,
        });
        if (this.props.onFocus) {
            this.props.onFocus(e);
        }
    };
    InnerTextInput.prototype._onBlur = function (e) {
        this.setState({
            hasFocus: false,
        });
        if (this.props.onBlur) {
            this.props.onBlur(e);
        }
    };
    InnerTextInput.prototype.handlePointerDown = function (e) {
        if (this.props.onPointerDown) {
            this.props.onPointerDown(e);
        }
    };
    InnerTextInput.prototype.handlePointerUp = function (e) {
        if (this.props.onPointerUp) {
            this.props.onPointerUp(e);
        }
    };
    InnerTextInput.prototype.handleKeyDown = function (e) {
        if (this.props.onKeyDown) {
            this.props.onKeyDown(e);
        }
    };
    InnerTextInput.prototype.handleKeyUp = function (e) {
        if (this.props.onKeyUp) {
            this.props.onKeyUp(e);
        }
    };
    InnerTextInput.prototype.getElementName = function () {
        return this.props.multiline ? "textarea" : "input";
    };
    InnerTextInput.prototype.getElementProps = function () {
        var _a;
        var props = (_a = {
                value: this.state.value || "",
                ref: this.props.refCallback
                    ? this.refCallbackTrigger
                    : this.props.type === "datetime-local" || this.props.type === "datetime"
                        ? this._refElementCallback
                        : null,
                title: this.state.hasFocus ? "" : this._getTitle() || "",
                onChange: this._onChange,
                onInput: this._onInput,
                onCompositionStart: this._onCompositionStart,
                onCompositionUpdate: this._onCompositionUpdate,
                onCompositionEnd: this._onCompositionEnd,
                placeholder: this.props.placeholder,
                maxLength: this.props.maxLength,
                onKeyPress: this._onKeyPress,
                onFocus: this._onFocus,
                onBlur: this._onBlur,
                autoComplete: "off"
            },
            _a[AttributeName.ARIA_MULTILINE] = this.props.multiline ? this.props.multiline === true : null,
            _a[AttributeName.ARIA_AUTO_COMPLETE] = this.props.autoComplete,
            _a);
        if (this.props.readOnly) {
            props.readOnly = true;
        }
        if (this.props.disabled) {
            props.disabled = true;
        }
        if (!this.props.multiline) {
            if (!this.props.type) {
                switch (this.props.keyboardType) {
                    case KeyboardType.numeric:
                        props.type = "number";
                        break;
                    case KeyboardType.emailAddress:
                        props.type = "email";
                        break;
                    default:
                        props.type = "text";
                        break;
                }
            }
            else {
                props.type = this.props.type;
            }
        }
        else if (this.props.rows) {
            props.rows = Math.max(this.props.rows, MIN_TEXTAREA_ROWS);
        }
        return props;
    };
    InnerTextInput.prototype._getTitle = function () {
        var title = this.props.title;
        var value = this.state.value;
        if (title === "") {
            return null;
        }
        return title && title !== DEFAULT_INPUT_VALUE
            ? title
            : value && value !== DEFAULT_INPUT_VALUE
                ? value
                : getLocalizedString("SELECT_TO_ENTER_DATA");
    };
    InnerTextInput.prototype._refElementCallback = function () {
        this._dateInput = ReactDOM.findDOMNode(this);
    };
    InnerTextInput.displayName = "TextInput";
    return InnerTextInput;
}(ComponentBase));
function textInputRuleGen(props) {
    var customStyles = {
        "::-ms-clear": {
            display: "none",
        },
    };
    if (props && props.style) {
        if (props.isRTL) {
            Object.assign(customStyles, {
                direction: "rtl",
                unicodeBidi: "bidi-override",
            });
        }
        return Object.assign(props.style, customStyles, ruleGen(props));
    }
    return {};
}
var rules = function (props) {
    return { rule: textInputRuleGen(props) };
};
var TextInput = ReactFela.connect(rules)(InnerTextInput);
export { KeyboardType, InnerTextInput, TextInput };

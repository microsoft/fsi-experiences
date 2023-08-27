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
import * as ReactFela from "react-fela";
import { guidV4String } from "../../CustomControls/Utilities/GuidHelper";
import * as roles from "../Supplementary/Accessibility/Attributes/Role";
import { KeyCode } from "../Supplementary/Accessibility/KeyCode";
import { ComponentBase } from "./ComponentBase";
import { rules } from "./FelaConnectHelper";
import { Flyout, FlyoutDirection } from "./Flyout";
import { List } from "./List";
import { ListItem } from "./ListItem";
import { ScrollView } from "./ScrollView";
import { Text } from "./Text";
import { TextInput } from "./TextInput";
import { View } from "./View";
var InnerComboBox = (function (_super) {
    __extends(InnerComboBox, _super);
    function InnerComboBox(props) {
        var _this = _super.call(this, props) || this;
        _this._wasInnerFocusRequested = false;
        _this.clickedOutside = false;
        _this.keyboardScrolling = false;
        _this.setFocusToItem = function (elementId) {
            if (_this.props.freeTextMode && _this.state.hasFocus) {
                return;
            }
            if (!elementId || elementId === null) {
                return;
            }
            var element = document.getElementById(elementId);
            if (!element || element === null) {
                return;
            }
            element.focus();
        };
        _this.keyboardNavigation = function (event) {
            if (InnerComboBox.supportedKeys.indexOf(event.keyCode) === -1) {
                return;
            }
            switch (event.keyCode) {
                case KeyCode.UpArrow:
                    _this._handleMove(-1);
                    break;
                case KeyCode.DownArrow:
                    _this._handleMove(1);
                    break;
                case KeyCode.PageUp:
                    _this._handleMove(-1 * _this.getPageSize());
                    break;
                case KeyCode.PageDown:
                    _this._handleMove(1 * _this.getPageSize());
                    break;
                case KeyCode.Enter:
                    _this.handleEnterKey(event);
                    break;
                case KeyCode.Space:
                    if (!_this.props.freeTextMode) {
                        _this.handleEnterKey(event);
                    }
                    break;
                case KeyCode.Escape:
                    _this.handleEscapeKey(event);
                    break;
                case KeyCode.Tab:
                    _this.handleTabKey(event);
                    break;
            }
            event.preventDefault();
            event.stopPropagation();
        };
        _this._handleMove = _this._handleMove.bind(_this);
        _this._handleButtonClick = _this._handleButtonClick.bind(_this);
        _this._handleTextInputChange = _this._handleTextInputChange.bind(_this);
        _this._saveTextInputRef = _this._saveTextInputRef.bind(_this);
        _this.saveContainerRef = _this.saveContainerRef.bind(_this);
        _this.saveItemRef = _this.saveItemRef.bind(_this);
        _this.saveTextRef = _this.saveTextRef.bind(_this);
        _this.handleValueChange = _this.handleValueChange.bind(_this);
        _this.handleItemSelected = _this.handleItemSelected.bind(_this);
        _this.handleItemPointerDown = _this.handleItemPointerDown.bind(_this);
        _this.handleItemHover = _this.handleItemHover.bind(_this);
        _this.handleTextPointerDown = _this.handleTextPointerDown.bind(_this);
        _this.handleBlur = _this.handleBlur.bind(_this);
        _this.handleEnterKey = _this.handleEnterKey.bind(_this);
        _this.handleKeyDown = _this.handleKeyDown.bind(_this);
        _this.handleKeyboardExpandRequest = _this.handleKeyboardExpandRequest.bind(_this);
        _this.handleFlyoutOutsideClick = _this.handleFlyoutOutsideClick.bind(_this);
        _this.handleInnerControlFocus = _this.handleInnerControlFocus.bind(_this);
        _this.handleInnerControlBlur = _this.handleInnerControlBlur.bind(_this);
        _this.handleRelativeToElementSelector = _this.handleRelativeToElementSelector.bind(_this);
        var visibleOptions = _this.getVisibleOptions();
        var initialOption = _this._getInitialStateOption(props);
        _this.keyboardScrolling = false;
        _this._internalIdAppendix = props.hideInternalId ? undefined : guidV4String();
        _this.selectedIndex = visibleOptions.indexOf(initialOption);
        _this.state = {
            option: initialOption,
            isExpanded: false,
            freeTextValue: props && props.freeTextMode ? props.value || props.defaultValue : initialOption && initialOption.text,
            isAutoCompleting: false,
        };
        return _this;
    }
    Object.defineProperty(InnerComboBox.prototype, "focusableControlId", {
        get: function () {
            return this.getInternalId() + "_text" + (this.props.freeTextMode ? "Input" : "");
        },
        enumerable: false,
        configurable: true
    });
    InnerComboBox.prototype.getInternalId = function (sourceId, internalIdAppendix) {
        if (sourceId === void 0) { sourceId = this.props.id; }
        if (internalIdAppendix === void 0) { internalIdAppendix = this._internalIdAppendix; }
        return sourceId + (internalIdAppendix ? "_" + internalIdAppendix : "");
    };
    InnerComboBox.prototype.getListId = function (sourceId, internalIdAppendix) {
        if (sourceId === void 0) { sourceId = this.props.id; }
        if (internalIdAppendix === void 0) { internalIdAppendix = this._internalIdAppendix; }
        return this.getInternalId(sourceId, internalIdAppendix) + "_list";
    };
    Object.defineProperty(InnerComboBox.prototype, "getEmptyListId", {
        get: function () {
            return this.getListId() + "_empty";
        },
        enumerable: false,
        configurable: true
    });
    InnerComboBox.prototype.getListItemId = function (option) {
        return this.getListId() + (option ? option.id || option.value : "");
    };
    InnerComboBox.prototype.getFlyoutId = function (sourceId, internalIdAppendix) {
        if (sourceId === void 0) { sourceId = this.props.id; }
        if (internalIdAppendix === void 0) { internalIdAppendix = this._internalIdAppendix; }
        return this.getInternalId(sourceId, internalIdAppendix) + "_flyout";
    };
    InnerComboBox.prototype.getButtonId = function (sourceId, internalIdAppendix) {
        if (sourceId === void 0) { sourceId = this.props.id; }
        if (internalIdAppendix === void 0) { internalIdAppendix = this._internalIdAppendix; }
        return this.getInternalId(sourceId, internalIdAppendix) + "_button";
    };
    InnerComboBox.prototype.onFlyoutScroll = function () {
    };
    InnerComboBox.prototype.getActiveDescendantId = function () {
        if (~this.selectedIndex) {
            var currentOption = this.getVisibleOptions()[this.selectedIndex];
            if (currentOption) {
                return this.getListItemId(currentOption);
            }
        }
        return "";
    };
    InnerComboBox.prototype.getPageSize = function () {
        return this.props.pageSize || InnerComboBox.DEFAULT_PAGE_SIZE;
    };
    InnerComboBox.prototype._getInitialStateOption = function (props) {
        var option = props.defaultValue
            ? this.getOptionByValue(props.options, props.defaultValue)
            : this.getOptionByValue(props.options, props.value);
        if (!option && props.options && props.options.length > 0 && !props.freeTextMode) {
            option = props.options[0];
        }
        return option;
    };
    InnerComboBox.prototype.getOptionByValue = function (options, value) {
        if (options) {
            var filteredOpts = options.filter(function (op) { return op.value === value; });
            if (filteredOpts.length > 0) {
                return filteredOpts[0];
            }
        }
        return undefined;
    };
    InnerComboBox.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps && !nextProps.defaultValue) {
            var nextOption = this.getOptionByValue(nextProps.options, nextProps.value);
            var option = this.getOptionByValue(this.props.options, this.props.value);
            if (nextProps.value !== this.props.value ||
                (nextProps.value === this.props.value && (nextOption === null || nextOption === void 0 ? void 0 : nextOption.text) !== (option === null || option === void 0 ? void 0 : option.text))) {
                var stateNew = void 0;
                if (nextProps.freeTextMode) {
                    stateNew = {
                        freeTextValue: (this.state.hasFocus && this.state.freeTextValue) || nextProps.value,
                        freeTextOptionDisplayValue: (this.state.hasFocus && this.state.freeTextValue) || nextProps.value,
                    };
                }
                else {
                    this.selectedIndex = nextProps.options && nextProps.options.indexOf(nextOption);
                    stateNew = {
                        option: nextOption,
                        freeTextValue: nextOption && nextOption.text,
                        freeTextOptionDisplayValue: nextOption && nextOption.text,
                    };
                }
                this.setState(stateNew);
            }
        }
        if (nextProps &&
            nextProps.defaultValue &&
            (!this.state.option || !this.state.option.value) &&
            nextProps.options !== this.props.options) {
            if (!nextProps.freeTextMode) {
                var option = this.getOptionByValue(nextProps.options, nextProps.defaultValue);
                this.selectedIndex = nextProps.options && nextProps.options.indexOf(option);
                var stateNew = { option: option, freeTextValue: option && option.text };
                this.setState(stateNew);
            }
        }
    };
    InnerComboBox.prototype._getIfValueChanged = function (valueNew) {
        var hasChanged = false;
        if (this.props.freeTextMode) {
            hasChanged = valueNew !== this.state.freeTextValue;
        }
        else {
            hasChanged = valueNew !== this.getSelectedOptionValue();
        }
        return hasChanged;
    };
    InnerComboBox.prototype.getElementProps = function () {
        var props = {
            name: this.props.name,
        };
        return props;
    };
    InnerComboBox.prototype.getElementChildren = function () {
        return undefined;
    };
    InnerComboBox.prototype.setIsExpanded = function (isExpanded) {
        if (isExpanded) {
            this._updateContainerWidth();
            this._wasInnerFocusRequested = false;
        }
        else if (!this._wasInnerFocusRequested) {
            this.setFocusToItem(this.focusableControlId);
            this._wasInnerFocusRequested = true;
        }
        if (!this.state.isExpanded) {
            this.keyboardScrolling = false;
        }
        this.setState({ isExpanded: isExpanded });
    };
    InnerComboBox.prototype._toggleIsExpanded = function () {
        this.setIsExpanded(!this.state.isExpanded);
    };
    InnerComboBox.prototype.setFocus = function () {
        if (this.props.freeTextMode) {
            if (this._textInput) {
                var textInputDom = ReactDOM.findDOMNode(this._textInput);
                textInputDom && textInputDom.focus();
            }
        }
        else if (this._text) {
            var textDom = ReactDOM.findDOMNode(this._text);
            textDom && textDom.focus();
        }
    };
    InnerComboBox.prototype._resetSelectedIndex = function () {
        if (this.props.defaultValue) {
            var stateValue = this.getSelectedOptionValue();
            var option = this.getOptionByValue(this.props.options, stateValue);
            this.selectedIndex = this.getVisibleOptions().indexOf(option);
        }
        else {
            var defaultSelectedValue = this.props.value || this.props.options[0].value;
            var value = this.props.freeTextMode ? this.state.freeTextValue || defaultSelectedValue : defaultSelectedValue;
            var option = this.getOptionByValue(this.props.options, value);
            this.selectedIndex = this.getVisibleOptions().indexOf(option);
        }
    };
    InnerComboBox.prototype.setCurrentItemByValue = function (value, changeValue) {
        if (changeValue === void 0) { changeValue = true; }
        var option = this.getOptionByValue(this.props.options, value);
        var stateNew = {
            freeTextOptionDisplayValue: option && option.text,
        };
        if (!this.state.isExpanded) {
            changeValue = true;
        }
        if (option && this.props.onOptionSelected) {
            this.props.onOptionSelected(option);
        }
        this.selectedIndex = this.getVisibleOptions().indexOf(option);
        this.setState(stateNew);
        if (changeValue) {
            this.handleValueChange(option && option.value);
            this.setState({
                freeTextValue: option && option.text,
                option: option,
            });
        }
    };
    InnerComboBox.prototype._setCurrentItemByVisibleIndex = function (index) {
        var options = this.getVisibleOptions();
        if (~index && index < options.length) {
            this.setCurrentItemByValue(options[index].value, false);
        }
    };
    InnerComboBox.prototype.handleKeyDown = function (event) {
        if (InnerComboBox.supportedKeys.indexOf(event.keyCode) === -1) {
            return;
        }
        switch (event.keyCode) {
            case KeyCode.UpArrow:
                event.altKey ? this.setIsExpanded(false) : this.handleArrowUp(-1);
                break;
            case KeyCode.DownArrow:
                event.altKey ? this.handleKeyboardExpandRequest() : this.handleArrowDown(event, 1);
                break;
            case KeyCode.Enter:
                this.handleEnterKey(event);
                break;
            case KeyCode.Space:
                if (!this.props.freeTextMode) {
                    this.handleEnterKey(event);
                }
                break;
            case KeyCode.Escape:
                this.handleEscapeKey(event);
                break;
            case KeyCode.Tab:
                this.handleTabKey(event);
                break;
        }
    };
    InnerComboBox.prototype.getVisibleOptions = function (state, options) {
        if (state === void 0) { state = this.state; }
        if (options === void 0) { options = this.props.options; }
        if (options) {
            if (state && state.isAutoCompleting && state.freeTextValue) {
                options = options.filter(function (x) { return x.text && x.text.toLocaleUpperCase().startsWith(state.freeTextValue.toLocaleUpperCase()); });
            }
        }
        return options;
    };
    InnerComboBox.prototype._searchOptions = function (text) {
        return this.props.options.filter(function (x) { return x.text && x.text === text; });
    };
    InnerComboBox.prototype.saveContainerRef = function (ref) {
        this._container = ref;
        this._updateContainerWidth();
    };
    InnerComboBox.prototype.saveItemRef = function (item) {
        if (item && item.props && item.props.isSelected) {
            this.selectedListItem = item;
        }
    };
    InnerComboBox.prototype._saveTextInputRef = function (ref) {
        this._textInput = ref;
    };
    InnerComboBox.prototype.saveTextRef = function (ref) {
        this._text = ref;
    };
    InnerComboBox.prototype._updateContainerWidth = function () {
        var containerDom = this._container && ReactDOM.findDOMNode(this._container);
        this._containerWidth = containerDom && containerDom.offsetWidth;
    };
    InnerComboBox.prototype.handleValueChange = function (valueNew) {
        if (this.props.onChange) {
            this.props.onChange(valueNew);
        }
    };
    InnerComboBox.prototype.handleItemSelected = function (item) {
        this.selectedListItem = item;
    };
    InnerComboBox.prototype.handleItemPointerDown = function (e) {
        if (e.button === 0) {
            var listItem = e.currentTarget;
            var value = listItem.dataset.value;
            this.setCurrentItemByValue(value);
            this.setState({ isAutoCompleting: false, isExpanded: false });
        }
    };
    InnerComboBox.prototype.handleItemHover = function (e) {
        var listItem = e.currentTarget;
        var value = listItem.dataset.value;
        var option = this.getOptionByValue(this.props.options, value || "");
        this.selectedIndex = this.getVisibleOptions().indexOf(option);
    };
    InnerComboBox.prototype._handleTextInputChange = function (valueNew) {
        var stateNew = {
            freeTextValue: valueNew,
            freeTextOptionDisplayValue: null,
            isAutoCompleting: true,
            option: null,
        };
        this._resetSelectedIndex();
        if (valueNew || valueNew === "") {
            var applicableOptions = this._searchOptions(valueNew);
            stateNew.option = applicableOptions.length ? applicableOptions[0] : undefined;
        }
        stateNew.isExpanded = !!this.getVisibleOptions(stateNew).length;
        if (this._getIfValueChanged(valueNew)) {
            this.setState(stateNew);
            if (!this.props.suppressFreeTextChangeCallback) {
                this.handleValueChange(stateNew.freeTextValue);
            }
        }
        this._resetSelectedListItem();
    };
    InnerComboBox.prototype.handleTextPointerDown = function (e) {
        if (e.button === 0) {
            this.props.freeTextMode && this.setFocus();
            this._toggleIsExpanded();
        }
    };
    InnerComboBox.prototype._handleButtonClick = function (e) {
        if (e.button === 0) {
            this._resetSelectedIndex();
            this.setState({ isAutoCompleting: false });
            if (this.state.isExpanded) {
                this.setFocusToItem(this.getButtonId());
                this._wasInnerFocusRequested = true;
            }
            this._toggleIsExpanded();
        }
    };
    InnerComboBox.prototype.handleArrowUp = function (amount) {
        this._handleMove(amount);
    };
    InnerComboBox.prototype.handleArrowDown = function (_e, amount) {
        this._handleMove(amount);
    };
    InnerComboBox.prototype._handleMove = function (amount) {
        this.keyboardScrolling = true;
        var visibleOptions = this.getVisibleOptions();
        function mod(x, m) {
            return ((x % m) + m) % m;
        }
        var selectedIndexNew = mod(this.selectedIndex + amount, visibleOptions.length);
        this._setCurrentItemByVisibleIndex(selectedIndexNew);
        this.setFocusToItem(this.getListItemId(visibleOptions[selectedIndexNew]));
    };
    InnerComboBox.prototype.selectItem = function (elementId) {
        !this.props.freeTextMode && this.setFocusToItem(elementId);
    };
    InnerComboBox.prototype.handleBlur = function (e) {
        if (this.clickedOutside) {
            this.clickedOutside = false;
            this.setIsExpanded(false);
            this.props.freeTextMode && this.setFocus();
            this.props.onBlur && this.props.onBlur(e);
        }
    };
    InnerComboBox.prototype.handleEnterKey = function (e) {
        if (!this.state.isExpanded) {
            this.handleKeyboardExpandRequest();
            e.stopPropagation();
            e.preventDefault();
            return;
        }
        if (this.selectedIndex > -1) {
            var options = this.getVisibleOptions();
            var valueChangeNeeded = this.state.option !== options[this.selectedIndex];
            this.setState({
                isAutoCompleting: false,
                isExpanded: false,
                option: options[this.selectedIndex],
                freeTextValue: this.props.freeTextMode ? options[this.selectedIndex].text : null,
                freeTextOptionDisplayValue: this.props.freeTextMode ? options[this.selectedIndex].text : null,
            });
            this.setFocus();
            var option = options[this.selectedIndex];
            if (option && this.props.onOptionSelected) {
                this.props.onOptionSelected(option);
            }
            valueChangeNeeded && this.handleValueChange(options[this.selectedIndex].value);
        }
    };
    InnerComboBox.prototype.handleEscapeKey = function (e) {
        if (this.state.isExpanded) {
            this.setIsExpanded(false);
            e.stopPropagation();
            e.preventDefault();
        }
    };
    InnerComboBox.prototype.handleTabKey = function (e) {
        if (this.state.isExpanded) {
            e.stopPropagation();
            e.preventDefault();
        }
    };
    InnerComboBox.prototype.handleKeyboardExpandRequest = function () {
        if (!this.state.isExpanded) {
            this._resetSelectedIndex();
            this.setIsExpanded(true);
        }
        else {
            this.setState({ isAutoCompleting: false });
        }
    };
    InnerComboBox.prototype.handleFlyoutOutsideClick = function (e) {
        var targetElement = e.target;
        if (targetElement.id !== this.getButtonId() && targetElement.id !== this.getButtonId() + "_innerdiv") {
            this.setIsExpanded(false);
        }
        this.setFocus();
        this.clickedOutside = true;
    };
    InnerComboBox.prototype.handleInnerControlFocus = function () {
        this.setState({ hasFocus: true });
        if (this.isIE) {
            var element = document.getElementById(this.focusableControlId);
            if (!element || element === null) {
                return;
            }
            element.setAttribute("style", "border: 1px dotted;");
        }
    };
    InnerComboBox.prototype.handleInnerControlBlur = function () {
        this._resetSelectedIndex();
        this.setState({ hasFocus: false });
        if (this.isIE) {
            var element = document.getElementById(this.focusableControlId);
            if (!element || element === null) {
                return;
            }
            element.setAttribute("style", "null");
        }
    };
    InnerComboBox.prototype._resetSelectedListItem = function () {
        this.selectedListItem = undefined;
        if (this.props.onOptionSelected) {
            this.props.onOptionSelected(null);
        }
    };
    InnerComboBox.prototype.handleRelativeToElementSelector = function (element) {
        return element.parentElement;
    };
    InnerComboBox.prototype.renderOptionsList = function (options) {
        var _this = this;
        if (options) {
            if (options.length) {
                var selectedStyle_1 = this.props.selectedItemStyle || InnerComboBox.getSelectedItemStyle();
                var optionsRendered = options.map(function (option, i) {
                    var itemId = _this.getListItemId(option);
                    return (React.createElement(ListItem, { key: i, id: itemId, tabIndex: 0, role: roles.OPTION, dataText: option.text, dataValue: option.value, onSelected: _this.handleItemSelected, isSelected: _this.selectedIndex === i, style: InnerComboBox.getListItemStyle(), selectedStyle: selectedStyle_1, ref: _this.saveItemRef, onClick: _this.handleItemPointerDown }, option.text || "\u00a0"));
                });
                var visibleItemsAmount = this.getPageSize();
                var scrollViewId = this.getListId() + "_scrollView";
                var showScroll = visibleItemsAmount < optionsRendered.length;
                var assumedItemHeight = 2.35;
                var scrollStyle = {
                    height: showScroll ? visibleItemsAmount * assumedItemHeight + "em" : undefined,
                    overflowY: showScroll ? "scroll" : "hidden",
                    overflowX: "hidden",
                    flex: "1 1 auto",
                    flexDirection: "column",
                };
                var listStyle = {
                    width: "100%",
                };
                listStyle.listStyleType = "none";
                var handleOption = options[this.selectedIndex];
                var scrollToElementId = this.keyboardScrolling || handleOption
                    ? this.getListItemId(handleOption)
                    : this.selectedListItem && this.selectedListItem.props.id
                        ? this.selectedListItem.props.id
                        : undefined;
                return (React.createElement(List, { id: this.getListId(), key: this.getListId(), role: roles.LISTBOX, style: listStyle, tabIndex: 0, accessibilityLabel: this.props.accessibilityLabel, onKeyDown: this.keyboardNavigation },
                    React.createElement(ScrollView, { id: scrollViewId, scrollToId: scrollToElementId, horizontal: false, role: roles.PRESENTATION, onScroll: this.onFlyoutScroll, style: scrollStyle }, optionsRendered)));
            }
        }
        return undefined;
    };
    InnerComboBox.prototype.renderFlyout = function (isRTL) {
        if (isRTL === void 0) { isRTL = document.body.dir === "rtl"; }
        var flyout;
        var testhooks;
        if (this.props.testhooks) {
            testhooks = Object.assign({}, this.props.testhooks);
            for (var i in testhooks) {
                testhooks[i] += "-flyout";
            }
        }
        if (!this.props.readOnly && this.state.isExpanded) {
            var optionsRendered = this.renderOptionsList(this.getVisibleOptions());
            var itemFocusId = this.getActiveDescendantId() || this.getListId();
            if (optionsRendered) {
                var flyoutStyle = {
                    borderWidth: "0.1em",
                    borderStyle: "solid",
                    borderColor: "#666666",
                    backgroundColor: "white",
                    width: this.calculateWidth(),
                    boxShadow: InnerComboBox.SHADOWS.Shadow01,
                };
                flyout = (React.createElement(Flyout, { id: this.getFlyoutId(), key: this.getFlyoutId(), focusElementId: itemFocusId, testhooks: testhooks, focusCallback: this.setFocusToItem, flyoutDirection: isRTL ? FlyoutDirection.down : FlyoutDirection.downleft, flyoutStyle: flyoutStyle, positionType: "relative", relativeToElementId: this.props.relativeToElementId ? this.props.relativeToElementId : this.getButtonId(), relativeToElementIdSelector: this.handleRelativeToElementSelector, onOutsideClick: this.handleFlyoutOutsideClick, parentCustomControlId: this.props.parentCustomControlId, parentFlyoutRoot: this.props.parentFlyoutRoot, rootZIndex: this.props.rootZIndex, enableTrackOnScroll: true, dismissOnScroll: !this.props.keepFlyoutOpenOnScroll }, optionsRendered));
            }
        }
        return flyout;
    };
    InnerComboBox.prototype._renderTextInput = function (controlId, testHooks) {
        var textInputStyle = this.props.textInputStyle
            ? this.props.textInputStyle
            : {
                borderWidth: 0,
                flex: "1 1 auto",
                backgroundColor: "transparent",
                padding: "0.5em 0.5em",
                width: "100%",
                fontSize: "1rem",
                fontWeight: this.state.hasFocus ? "normal" : "600",
                ":hover": {
                    fontWeight: "normal",
                },
            };
        return (React.createElement(TextInput, { id: controlId, key: controlId, testhooks: testHooks, readOnly: this.props.readOnly, accessibilityHasPopup: true, accessibilityExpanded: this.state.isExpanded, accessibilityRequired: this.props.accessibilityRequired, describedByElementId: this.props.describedByElementId, role: roles.COMBOBOX, ref: this._saveTextInputRef, onFocus: this.handleInnerControlFocus, onBlur: this.handleInnerControlBlur, onKeyDown: this.handleKeyDown, onChangeText: this._handleTextInputChange, value: this.props.freeTextMode
                ? this.state.freeTextValue || this.state.freeTextOptionDisplayValue
                : this.state.option && this.state.option.text, accessibilityLabel: this.props.accessibilityLabel ? this.props.accessibilityLabel : this.props.placeholder, labelledByElementId: this.props.labelledByElementId ? this.props.labelledByElementId : null, activeDescendantId: this.state.isExpanded ? this.getActiveDescendantId() : null, ownsElementId: this.state.isExpanded ? this.getListId() : null, controlsElementId: this.state.isExpanded ? this.getListId() : null, style: textInputStyle, placeholder: this.props.placeholder }));
    };
    InnerComboBox.prototype.getTextOnlyStyle = function () {
        var props = this.props.textStyle
            ? this.props.textStyle
            : {
                borderWidth: 0,
                flex: "1 1 auto",
                outline: "none",
                cursor: "default",
            };
        return props;
    };
    InnerComboBox.prototype._getEmptyList = function () {
        return this.state.isExpanded ? null : (React.createElement("div", { role: roles.LISTBOX, id: this.getEmptyListId, style: { display: "none" } }, " "));
    };
    InnerComboBox.prototype.getTextOnlyInnerComponent = function (valueId) {
        return React.createElement(Text, { id: valueId }, this.getSelectedOptionText());
    };
    InnerComboBox.prototype.renderTextOnly = function (controlId, testHooks, asHeading) {
        if (asHeading === void 0) { asHeading = false; }
        var textStyle = this.getTextOnlyStyle();
        var valueId = controlId + "-value";
        var elementProps = this.state.isExpanded
            ? {
                ownsElementId: this.getListId(),
                controlsElementId: this.getListId(),
            }
            : {
                ownsElementId: this.getEmptyListId,
                controlsElementId: this.getEmptyListId,
            };
        var buttonProps = __assign({ id: controlId, key: controlId, testhooks: testHooks, accessibilityHasPopup: true, accessibilityExpanded: this.state.isExpanded, accessibilityLabel: this.props.accessibilityLabel || this.getSelectedOptionText(), title: this.props.title, describedByElementId: this.props.describedByElementId || valueId, ref: this.saveTextRef, role: roles.BUTTON, onClick: this.handleEnterKey, onFocus: this.handleInnerControlFocus, onBlur: this.handleInnerControlBlur, onKeyDown: this.handleKeyDown, tabIndex: this.props.readOnly ? -1 : 0, style: textStyle }, elementProps);
        var textContent = React.createElement(View, __assign({}, buttonProps), this._getTextOnlyContent(valueId));
        if (asHeading) {
            return (React.createElement(Text, { semanticTag: "h1", style: { maxWidth: "100%", padding: "0", margin: "0" } }, textContent));
        }
        return textContent;
    };
    InnerComboBox.prototype._getTextOnlyContent = function (valueId) {
        return (React.createElement(React.Fragment, null,
            this.getTextOnlyInnerComponent(valueId),
            this._getEmptyList()));
    };
    InnerComboBox.prototype.getSelectedOptionText = function () {
        return (this.state.option && this.state.option.text) || "\u00a0";
    };
    InnerComboBox.prototype.getSelectedOptionValue = function () {
        return this.state.option && this.state.option.value;
    };
    InnerComboBox.prototype._renderDropDownButton = function () {
        var buttonStyle = {
            backgroundColor: "transparent",
            borderColor: "transparent",
            borderStyle: "solid",
            borderWidth: "0 0 0 0.1em",
            flexDirection: "row",
            padding: "0 0.75em",
            justifyContent: "center",
            ":hover": {
                borderColor: InnerComboBox.COLORS.Grey5,
            },
        };
        var arrowStyle = {
            width: "0.6em",
            height: "0.6em",
            marginTop: "-0.4em",
            borderColor: InnerComboBox.COLORS.Grey7,
            borderWidth: "0em",
            borderRightWidth: "0.1em",
            borderBottomWidth: "0.1em",
            borderStyle: "solid",
            transform: "rotate(45deg)",
            content: "",
            display: this.props.hideArrow ? "none" : "flex",
            alignSelf: "center",
        };
        return (React.createElement(View, { id: this.getButtonId(), key: "dropButton", role: roles.BUTTON, accessibilityLabel: this.props.accessibilityLabel, accessibilityExpanded: this.state.isExpanded, accessibilityHasPopup: true, tabIndex: -1, style: buttonStyle, onKeyDown: this.handleKeyDown, onClick: this._handleButtonClick }, React.createElement("div", { style: arrowStyle, id: this.getButtonId() + "_innerdiv" })));
    };
    InnerComboBox.prototype.render = function () {
        var props = this.getElementPropsInternal();
        Object.assign(props.style, {
            backgroundColor: "white",
            display: "flex",
            flex: "1 1 auto",
            borderWidth: "0.1em",
            borderStyle: "solid",
            borderColor: "#666666",
        }, this.props.style);
        if (this.props.testhooks) {
            props.testhooks = this.props.testhooks;
        }
        var testhooks;
        if (this.props.testhooks) {
            testhooks = Object.assign({}, this.props.testhooks);
            for (var i in testhooks) {
                testhooks[i] += "-text";
            }
        }
        var containerStyle = {
            display: "flex",
            flex: "1 1 auto",
        };
        var control = (React.createElement(View, __assign({}, props, { ref: this.saveContainerRef }),
            React.createElement(View, { style: containerStyle, id: this.getInternalId() + "_wrapper" },
                this.props.freeTextMode
                    ? this._renderTextInput(this.focusableControlId, testhooks)
                    : this.renderTextOnly(this.focusableControlId, testhooks),
                !this.props.readOnly && this._renderDropDownButton(),
                !this.props.readOnly && this.renderFlyout())));
        return control;
    };
    InnerComboBox.prototype.calculateWidth = function () {
        var width = "50px";
        if (this.props.style && this.props.style.width && this.props.style.width !== "100%") {
            width = this.props.style.width.toString();
        }
        else if (this._containerWidth) {
            width = this._containerWidth.toString();
        }
        if (width.indexOf("px") === -1 && width.indexOf("%") === -1) {
            width = width + "px";
        }
        return width;
    };
    InnerComboBox.getListItemStyle = function () {
        return {
            flex: "0 1 auto",
            cursor: "pointer",
            padding: "0.5em 0.5em",
            ":hover": {
                backgroundColor: InnerComboBox.COLORS.Grey1,
                color: InnerComboBox.COLORS.Grey7,
            },
        };
    };
    InnerComboBox.getSelectedItemStyle = function () {
        return {
            backgroundColor: InnerComboBox.COLORS.Grey3,
            color: "black",
            "@media (forced-colors: active)": {
                color: "highlightText",
                backgroundColor: "highlight",
                "forced-color-adjust": "none",
            },
        };
    };
    InnerComboBox.supportedKeys = [
        KeyCode.Alt,
        KeyCode.UpArrow,
        KeyCode.DownArrow,
        KeyCode.Enter,
        KeyCode.PageDown,
        KeyCode.PageUp,
        KeyCode.Escape,
        KeyCode.Tab,
        KeyCode.Space,
    ];
    InnerComboBox.displayName = "ComboBox";
    InnerComboBox.DEFAULT_PAGE_SIZE = 7;
    InnerComboBox.COLORS = {
        Grey1: "#efefef",
        Grey2: "#e2e2e2",
        Grey3: "#d8d8d8",
        Grey5: "#666666",
        Grey7: "#333333",
    };
    InnerComboBox.SHADOWS = {
        Shadow01: "0px 2px 4px 0px rgba(0, 0, 0, 0.5);",
    };
    return InnerComboBox;
}(ComponentBase));
var ComboBox = ReactFela.connect(rules)(InnerComboBox);
export { InnerComboBox, ComboBox };

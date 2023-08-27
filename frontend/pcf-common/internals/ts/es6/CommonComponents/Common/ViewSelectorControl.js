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
import { CrmIcon } from "../FontIcon/CrmIcon";
import { MicrosoftIcon } from "../FontIcon/MicrosoftIcon";
import { MicrosoftIconSymbol } from "../FontIcon/MicrosoftIconSymbol";
import { InnerComboBox } from "../Primitive/ComboBox";
import { Image } from "../Primitive/Image";
import { List } from "../Primitive/List";
import { ListItem } from "../Primitive/ListItem";
import { ScrollView } from "../Primitive/ScrollView";
import { Text } from "../Primitive/Text";
import { View } from "../Primitive/View";
import * as roles from "../Supplementary/Accessibility/Attributes/Role";
import { Flyout, FlyoutDirection } from "../Primitive/Flyout";
import { rules } from "../Primitive/FelaConnectHelper";
import { instance as XrmProxy } from "../../CustomControls/Utilities/XrmProxy";
var iconCategory;
(function (iconCategory) {
    iconCategory[iconCategory["Crm"] = 0] = "Crm";
    iconCategory[iconCategory["Microsoft"] = 1] = "Microsoft";
})(iconCategory || (iconCategory = {}));
var VIEW_SELECTOR_PAGE_SIZE = 15;
var DEFAULT_CATEGORY_HEADER_COLOR = "#0066FF";
var DEFAULT_HOVER_STATE_BACKGROUND_COLOR = "#EDEBE9";
var DEFAULT_SELECTED_STATE_BACKGROUND_COLOR = "#E1DFDD";
var InnerViewSelectorControl = (function (_super) {
    __extends(InnerViewSelectorControl, _super);
    function InnerViewSelectorControl(props) {
        var _this = _super.call(this, props) || this;
        _this.handleItemSelected = _this.handleItemSelected.bind(_this);
        _this.handleItemIconPointerDown = _this.handleItemIconPointerDown.bind(_this);
        _this.handleSpaceKey = _this.handleSpaceKey.bind(_this);
        _this.handleRelativeToElementSelector = _this.handleRelativeToElementSelector.bind(_this);
        _this._getOptionTestHooks = _this._getOptionTestHooks.bind(_this);
        return _this;
    }
    InnerViewSelectorControl.prototype.handleItemSelected = function (item) {
        this.selectedListItem = item;
    };
    InnerViewSelectorControl.prototype.handleItemIconPointerDown = function (e) {
        var iconElement = e.currentTarget;
        this._handleIconClick(iconElement);
    };
    InnerViewSelectorControl.prototype.handleSpaceKey = function (e) {
        var iconElement = e.currentTarget;
        this._handleIconClick(iconElement);
    };
    InnerViewSelectorControl.prototype.handleArrowUp = function (amount) {
        if (!this.state.isExpanded) {
            return;
        }
        _super.prototype.handleArrowUp.call(this, amount);
    };
    InnerViewSelectorControl.prototype.handleArrowDown = function (e, amount) {
        if (!this.state.isExpanded) {
            _super.prototype.handleEnterKey.call(this, e);
        }
        else {
            _super.prototype.handleArrowDown.call(this, e, amount);
        }
    };
    InnerViewSelectorControl.prototype.handleRelativeToElementSelector = function (element) {
        return element;
    };
    InnerViewSelectorControl.prototype.calculateWidth = function () {
        return this.props.style && this.props.style.width ? this.props.style.width : "20em";
    };
    InnerViewSelectorControl.prototype._handleIconClick = function (iconElement) {
        if (iconElement &&
            iconElement.parentElement &&
            iconElement.parentElement.parentElement &&
            iconElement.parentElement.parentElement.localName === "li") {
            var listItem = iconElement.parentElement.parentElement;
            var value = listItem.dataset.value;
            if (this.props.onItemIconPointerDown && value) {
                var option = this.getOptionByValue(this.props.options, value);
                if (option) {
                    this.props.onItemIconPointerDown(option);
                }
            }
        }
    };
    InnerViewSelectorControl.prototype._renderListItem = function (option) {
        var listItemLabel = (React.createElement(Text, { role: roles.PRESENTATION, style: this._getListItemTextStyle() }, option.text || "\u00a0"));
        var listItemChildren = [listItemLabel, this._renderListItemIcon(option)];
        var placeItemIconOnRight = this.props.placeItemIconOnRight;
        return (React.createElement(View, { style: {
                display: "flex",
                justifyContent: placeItemIconOnRight && "space-between",
            } }, placeItemIconOnRight ? listItemChildren : listItemChildren.reverse()));
    };
    InnerViewSelectorControl.prototype._renderListItemIcon = function (option) {
        var _a, _b;
        var isButton = option.iconType === 30 || option.iconType === 31;
        if (isButton && ((_b = (_a = XrmProxy === null || XrmProxy === void 0 ? void 0 : XrmProxy.Utils) === null || _a === void 0 ? void 0 : _a.isFeatureEnabled) === null || _b === void 0 ? void 0 : _b.call(_a, InnerViewSelectorControl.FCB_OCTOBER2021UPDATE))) {
            return null;
        }
        var iconStyle = option.iconStyle
            ? option.iconStyle
            : {
                width: 16,
                height: 16,
                marginLeft: "8px",
                marginRight: "8px",
            };
        var icon = !option.imageSource && option.iconType ? (option.iconCategory === iconCategory.Crm ? (React.createElement(CrmIcon, { type: option.iconType, style: iconStyle })) : (React.createElement(MicrosoftIcon, { type: option.iconType, style: iconStyle }))) : null;
        var pinIconLabelText = option.iconType === 30 ? "Pin " : option.iconType === 31 ? "Unpin " : null;
        var pinAriaLabel = pinIconLabelText == null ? pinIconLabelText : pinIconLabelText + option.text;
        var listItemIcon = option.imageSource ? (React.createElement(View, null,
            React.createElement(Image, { source: option.imageSource, style: iconStyle, altText: option.altText || "" }))) : option.iconType ? (React.createElement(View, { title: option.iconTitle, accessibilityLabel: pinAriaLabel, role: isButton ? roles.BUTTON : roles.PRESENTATION, onKeyDown: isButton ? this.handleSpaceKey : null, onPointerDown: this.handleItemIconPointerDown }, icon)) : null;
        return listItemIcon;
    };
    InnerViewSelectorControl.prototype._getListItemTextStyle = function () {
        var style = {
            marginLeft: "8px",
            marginRight: "8px",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
            minWidth: "18em",
            maxWidth: "30em",
        };
        return style;
    };
    InnerViewSelectorControl.prototype._renderOptions = function (categoryId, indexAddendum) {
        var _this = this;
        var options = this.props.options;
        var selectedStyle = this.props.selectedItemStyle || this.getSelectedItemStyle();
        return options
            .filter(function (option) { return option.categoryId === categoryId; })
            .map(function (option, i) {
            var itemId = _this.getListItemId(option);
            var optionTesthooks = _this._getOptionTestHooks(i);
            indexAddendum = indexAddendum || 0;
            var listItemKey = i + indexAddendum;
            return (React.createElement(ListItem, { key: listItemKey, id: itemId, tabIndex: -1, role: roles.OPTION, title: option.text, accessibilityLabel: option.text, dataText: option.text, dataValue: option.value, onSelected: _this.handleItemSelected, isSelected: _this.props.value === option.value, style: _this.getListItemStyle(), selectedStyle: selectedStyle, ref: _this.saveItemRef, onClick: _this.handleItemPointerDown, testhooks: optionTesthooks }, _this._renderListItem(option)));
        });
    };
    InnerViewSelectorControl.prototype._getOptionTestHooks = function (i) {
        if (!this.props.testhooks)
            return null;
        var testhooks = Object.assign({}, this.props.testhooks);
        for (var key in testhooks) {
            testhooks[key] += "-item-" + i;
        }
        return testhooks;
    };
    InnerViewSelectorControl.prototype._renderCategories = function () {
        var _this = this;
        var categories = this.props.categories;
        var renderedCategories = [];
        if (categories) {
            var indexAddendum_1 = 0;
            categories.map(function (category, i) {
                var categoryOptions = _this._renderOptions(category.id, indexAddendum_1);
                var categoryKey = category.id + "_" + i;
                var categoryId = _this.getListId() + "_" + categoryKey;
                renderedCategories.push(React.createElement(View, { key: i, style: { display: "block" }, role: roles.GROUP, labelledByElementId: categoryId },
                    _this._renderCategoryHeader(category.name, categoryKey, categoryId),
                    categoryOptions));
                indexAddendum_1 += categoryOptions.length;
            });
        }
        else {
            renderedCategories.push(React.createElement(View, null, this._renderOptions()));
        }
        return renderedCategories;
    };
    InnerViewSelectorControl.prototype._renderCategoryHeader = function (categoryName, categoryKey, categoryId) {
        return (React.createElement(View, { key: categoryKey, id: categoryId, tabIndex: -1, title: categoryName, accessibilityLabel: categoryName, dataText: categoryName, dataValue: categoryName, style: { flex: "0 1 auto", padding: "8px 0px 8px 0px" }, ref: this.saveItemRef },
            React.createElement(View, { style: { display: "flex" } },
                React.createElement(Text, { role: roles.PRESENTATION, style: {
                        color: DEFAULT_CATEGORY_HEADER_COLOR,
                        fontSize: "12px",
                        fontWeight: "600",
                        marginLeft: "8px",
                        marginRight: "8px",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                    } }, categoryName || "\u00a0"))));
    };
    InnerViewSelectorControl.prototype.getPageSize = function () {
        return VIEW_SELECTOR_PAGE_SIZE;
    };
    InnerViewSelectorControl.prototype.getListItemStyle = function () {
        return {
            flex: "0 1 auto",
            cursor: "pointer",
            padding: "6px 0px 6px 0px",
            ":hover": {
                backgroundColor: DEFAULT_HOVER_STATE_BACKGROUND_COLOR,
                color: InnerComboBox.COLORS.Grey7,
                "@media (forced-colors: active)": {
                    color: "highlightText",
                    backgroundColor: "highlight",
                    "forced-color-adjust": "none",
                },
            },
        };
    };
    InnerViewSelectorControl.prototype.getSelectedItemStyle = function () {
        return {
            backgroundColor: this._getSelectedStateBackGroundColor(),
            color: "black",
            "@media (forced-colors: active)": {
                color: "highlightText",
                backgroundColor: "highlight",
                "forced-color-adjust": "none",
            },
        };
    };
    InnerViewSelectorControl.prototype._getSelectedStateBackGroundColor = function () {
        return DEFAULT_SELECTED_STATE_BACKGROUND_COLOR;
    };
    InnerViewSelectorControl.prototype._getHoverStyle = function () {
        return (this.props.hoveredStyle || {
            ":hover": {
                backgroundColor: DEFAULT_HOVER_STATE_BACKGROUND_COLOR,
            },
        });
    };
    InnerViewSelectorControl.prototype.renderOptionsList = function () {
        var options = this.props.options;
        if (options) {
            var categoriesRendered = this._renderCategories();
            var visibleItemsAmount = this.getPageSize();
            var scrollViewId = this.getListId() + "_scrollView";
            var showScroll = visibleItemsAmount < options.length;
            var assumedItemHeight = 2.35;
            var scrollStyle = {
                maxHeight: showScroll ? visibleItemsAmount * assumedItemHeight + "em" : undefined,
                overflowY: "auto",
                overflowX: "hidden",
                flex: "1 1 auto",
                display: "block",
            };
            var listStyle = {
                width: "100%",
            };
            listStyle.listStyleType = "none";
            var selectedId = void 0;
            if (~this.selectedIndex) {
                var handleOption = options[this.selectedIndex];
                selectedId = this.getListItemId(handleOption);
            }
            var listAriaLabel = "Select a view.";
            var scrollViewAriaLabel = "Expanded list";
            return (React.createElement(List, { role: roles.LISTBOX, id: this.getListId(), title: listAriaLabel, accessibilityLabel: listAriaLabel, tabIndex: -1, style: listStyle, onKeyDown: this.keyboardNavigation },
                React.createElement(ScrollView, { id: scrollViewId, accessibilityLabel: this.isIE ? scrollViewAriaLabel : null, style: scrollStyle, role: roles.PRESENTATION, scrollToId: selectedId, horizontal: false }, categoriesRendered)));
        }
        return null;
    };
    InnerViewSelectorControl.prototype.getTextOnlyStyle = function () {
        var textStyle = this.props.textStyle
            ? this.props.textStyle
            : {
                borderWidth: 0,
                flex: "0 1 auto",
                outline: "none",
                cursor: "pointer",
                padding: "0.5em 0.75em",
            };
        return Object.assign({}, textStyle, { maxWidth: "100%", display: "flex" });
    };
    InnerViewSelectorControl.prototype.getTextOnlyInnerComponent = function (valueId) {
        var defaultTextContainerStyle = { display: "inline-block", overflow: "hidden", textOverflow: "ellipsis" };
        var textContainerStyle = Object.assign(defaultTextContainerStyle, this.props.overrideTextContainerStyle);
        var containerStyle = __assign({ display: "flex", maxWidth: "100%", paddingLeft: "8px", paddingRight: "8px", borderRadius: "2px" }, this._getHoverStyle());
        if (this.state.isExpanded) {
            Object.assign(containerStyle, {
                backgroundColor: this.props.expandedBackgroundColor || this._getSelectedStateBackGroundColor(),
            });
        }
        return (React.createElement(View, { style: containerStyle },
            React.createElement(Text, { style: textContainerStyle, id: valueId, accessibilityHidden: this.props.useHeader ? null : true }, this.getSelectedOptionText()),
            this._renderCaretButton()));
    };
    InnerViewSelectorControl.prototype.handleValueChange = function (valueNew) {
        this.selectItem(this.getInternalId() + "_text");
        if (this.props.onChange) {
            this.props.onChange(valueNew);
        }
    };
    InnerViewSelectorControl.prototype._renderCaretButton = function () {
        var caretStyle = this.props.caretStyle
            ? Object.assign({}, this.props.caretStyle)
            : {
                paddingLeft: "5px",
                color: "black",
                backgroundColor: "transparent",
            };
        var hoverStyle = this._getHoverStyle();
        Object.assign(caretStyle, hoverStyle, { cursor: "pointer" });
        var caretType = this.props.caretType && MicrosoftIconSymbol[this.props.caretType]
            ? this.props.caretType
            : MicrosoftIconSymbol.DropdownArrow;
        return (React.createElement(Text, { id: this.getButtonId(), style: caretStyle, accessibilityHidden: true },
            React.createElement(MicrosoftIcon, { type: caretType, role: roles.PRESENTATION })));
    };
    InnerViewSelectorControl.prototype.renderFlyout = function (isRTL) {
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
            var optionsRendered = this.renderOptionsList();
            var itemFocusId = this.getActiveDescendantId();
            if (optionsRendered) {
                flyout = (React.createElement(Flyout, __assign({ id: this.getFlyoutId(), key: this.getFlyoutId(), focusElementId: itemFocusId, testhooks: testhooks, focusCallback: this.setFocusToItem, flyoutStyle: this._getFlyoutStyle() }, this._getFlyoutRelativeElementAndDirection(isRTL), { positionType: "relative", relativeToElementIdSelector: this.handleRelativeToElementSelector, onOutsideClick: this.handleFlyoutOutsideClick, parentCustomControlId: this.props.parentCustomControlId, parentFlyoutRoot: this.props.parentFlyoutRoot, rootZIndex: this.props.rootZIndex, enableTrackOnScroll: true, dismissOnScroll: !this.props.keepFlyoutOpenOnScroll }), optionsRendered));
            }
        }
        return flyout;
    };
    InnerViewSelectorControl.prototype._getFlyoutStyle = function () {
        var flyoutStyle = {
            borderWidth: "1px",
            borderRadius: "2px",
            boxShadow: "0px 0px 1px rgba(0, 0, 0, 0.16), 0px 4px 8px rgba(0, 0, 0, 0.12)",
            backgroundColor: "#FFFFFF",
            width: this.props.style && this.props.style.width ? this.props.style.width : undefined,
            height: this.props.style && this.props.style.height ? this.props.style.height : undefined,
        };
        return flyoutStyle;
    };
    InnerViewSelectorControl.prototype._getFlyoutRelativeElementAndDirection = function (isRTL) {
        var flyoutDirection = isRTL ? FlyoutDirection.downleft : FlyoutDirection.down;
        var relativeToElementId = this.getInternalId();
        return {
            flyoutDirection: flyoutDirection,
            relativeToElementId: relativeToElementId,
        };
    };
    InnerViewSelectorControl.prototype.handleFlyoutOutsideClick = function (e) {
        var viewSelectorId = this.props.id;
        var viewSelector = document.getElementById(viewSelectorId);
        if (viewSelector &&
            viewSelector.contains(e.target) &&
            viewSelector.childNodes[0] !== e.target) {
            return;
        }
        var targetElement = e.target;
        if (targetElement.id !== this.getButtonId()) {
            this.setIsExpanded(false);
        }
        this.setFocus();
        this.clickedOutside = true;
    };
    InnerViewSelectorControl.prototype.render = function () {
        var props = Object.assign({}, this.getElementPropsInternal(), {
            title: "",
            semanticTag: this.props.semanticTag || "div",
        });
        Object.assign(props.style, {
            backgroundColor: "transparent",
            display: "flex",
            flex: "0 1 auto",
            width: "100%",
        }, this.props.viewSelectorStyle);
        var content = this.renderTextOnly(this.focusableControlId, this.props.testhooks, this.props.useHeader);
        return (React.createElement(View, __assign({}, props, { ref: this.saveContainerRef }),
            React.createElement(View, { style: props.style, id: this.getInternalId() },
                content,
                !this.props.readOnly && this.renderFlyout(this.props.isRTL))));
    };
    InnerViewSelectorControl.displayName = "ViewSelectorControl";
    InnerViewSelectorControl.FCB_OCTOBER2021UPDATE = "October2021Update";
    return InnerViewSelectorControl;
}(InnerComboBox));
var ViewSelectorControl = ReactFela.connect(rules)(InnerViewSelectorControl);
export { ViewSelectorControl, };

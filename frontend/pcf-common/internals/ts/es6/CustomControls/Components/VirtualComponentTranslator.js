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
import * as CCFUtilities from "../Models/CustomControlUtilityPointers";
import { ManifestType } from "../Utilities/ManifestType";
import { SupportedPrimitives } from "../Models/CustomControlExposedInterfaces";
import { buildUniqueCustomControlId, buildChildDomId, buildTesthookId, focusElementById, } from "../Utilities/CustomControlHelper";
import { Button } from "../../CommonComponents/Primitive/Button";
import { ComboBox } from "../../CommonComponents/Primitive/ComboBox";
import { Hyperlink } from "../../CommonComponents/Primitive/Hyperlink";
import { Image } from "../../CommonComponents/Primitive/Image";
import { IFrame } from "../../CommonComponents/Primitive/IFrame";
import { CrmIcon } from "../../CommonComponents/FontIcon/CrmIcon";
import { EntityIcon } from "../../CommonComponents/FontIcon/EntityIcon";
import { MicrosoftIcon } from "../../CommonComponents/FontIcon/MicrosoftIcon";
import { RootPopup } from "../../CommonComponents/Primitive/Popup/RootPopup";
import { Popup, PopupType } from "../../CommonComponents/Primitive/Popup/Popup";
import { Flyout } from "../../CommonComponents/Primitive/Flyout";
import { LivePersonaCardHoverTarget, } from "../../CommonComponents/Primitive/LivePersonaCardHoverTarget";
import { List } from "../../CommonComponents/Primitive/List";
import { ListItem } from "../../CommonComponents/Primitive/ListItem";
import { ScrollView } from "../../CommonComponents/Primitive/ScrollView";
import { Switch } from "../../CommonComponents/Primitive/Switch";
import { Text } from "../../CommonComponents/Primitive/Text";
import { Label } from "../../CommonComponents/Primitive/Label";
import { TextInput } from "../../CommonComponents/Primitive/TextInput";
import { FileInput } from "../../CommonComponents/Primitive/FileInput";
import { View } from "../../CommonComponents/Primitive/View";
import { EntityImage } from "../../CommonComponents/Primitive/EntityImage";
import { ProgressIndicator } from "../../CommonComponents/Primitive/ProgressIndicator";
import { HorizontalScroll } from "../../CommonComponents/Common/HorizontalScroll";
import { ViewSelectorControl } from "../../CommonComponents/Common/ViewSelectorControl";
import { PresenceIndicator } from "../../CommonComponents/Primitive/PresenceIndicator";
import { PlaceHolder } from "../../CommonComponents/Primitive/PlaceHolder";
import { Table } from "../../CommonComponents/Primitive/Table/Table";
import { TableBody } from "../../CommonComponents/Primitive/Table/TableBody";
import { TableCaption } from "../../CommonComponents/Primitive/Table/TableCaption";
import { TableCell } from "../../CommonComponents/Primitive/Table/TableCell";
import { TableFooter } from "../../CommonComponents/Primitive/Table/TableFooter";
import { TableHeader } from "../../CommonComponents/Primitive/Table/TableHeader";
import { TableHeaderCell } from "../../CommonComponents/Primitive/Table/TableHeaderCell";
import { TableRow } from "../../CommonComponents/Primitive/Table/TableRow";
import { Option } from "../../CommonComponents/Primitive/Select/Option";
import { Select } from "../../CommonComponents/Primitive/Select/Select";
import { RadioInput } from "../../CommonComponents/Primitive/Radio/RadioInput";
import { CommandingWrapper } from "../Models/CommandingWrapper";
import { CustomControlConstants } from "../Utilities/CustomControlConstants";
import { FlexibleText } from "../../CommonComponents/Primitive/FlexibleText";
import { FIELD_SECTION_ITEM_ID, WEBRESOURCE_CLASS_ID, IFRAME_CLASS_ID } from "../Utilities/DefaultControlMapper";
import { areGuidsSame } from "../Utilities/GuidHelper";
import { instance as RootAppProxy } from "../Utilities/RootAppProxy";
var REACT_ELEMENT_TYPE = (typeof Symbol === "function" && Symbol.for("react.element")) || 0xeac7;
var KEYLESS_CHILD_ID = "keylessChild";
var KEYLESS_ROOT_ID = "root";
var BASE_ATTRIBUTES = {
    DisplayName: "",
    LogicalName: "",
    Type: "string",
    IsSecured: false,
    RequiredLevel: 0,
    MinValue: -100000000000,
    MaxValue: 100000000000,
    ImeMode: 0,
    MaxLength: 100,
    EntityLogicalName: "",
    Precision: 2,
    Format: "1",
    LanguageByCode: {},
    TimeZoneByCode: {},
    Behavior: 0,
    Targets: [],
    Options: [
        {
            Label: "---",
            Value: 1,
        },
    ],
    DefaultValue: 1,
    lastUpdatedField: null,
    lastUpdatedValue: null,
    rollupStateField: null,
    rollupStateValue: 0,
    calculatedFieldValid: false,
    rollupValid: false,
    SourceType: null,
    recalculate: function () { },
};
var VirtualComponentTranslator = (function () {
    function VirtualComponentTranslator() {
    }
    VirtualComponentTranslator.renderVirtualComponent = function (component, props, hostData, memHelper, purgeMemHelper) {
        if (purgeMemHelper === void 0) { purgeMemHelper = true; }
        if (purgeMemHelper) {
            memHelper.startRenderFunction();
        }
        if (!component) {
            if (purgeMemHelper) {
                memHelper.stopRenderFunction();
            }
            return null;
        }
        var element = VirtualComponentTranslator.generateReactComponent(component, null, KEYLESS_ROOT_ID, props, hostData, memHelper, null, false, VirtualComponentTranslator.generateReactChildren(_getComponentKey(component, null, KEYLESS_ROOT_ID), component.getChildren(), props, hostData, memHelper, _generateFlyoutParentId(props, component), !!component.getProperties().onClick));
        if (purgeMemHelper) {
            memHelper.stopRenderFunction();
        }
        return element;
    };
    VirtualComponentTranslator.generateJSXElement = function (elementType, props, children, ownProps, hostData, complexKeeper, ancestralOnClick) {
        if (props == null) {
            return React.createElement(View, null, "\"UNKNOWN COMPONENT\"");
        }
        var id = props ? buildUniqueCustomControlId(ownProps, props.id, props.absoluteId) : "";
        var testhooks = _updateDataIdInTesthooks(ownProps, props);
        var learningPathControlId = props[CustomControlConstants.LearningPathAttributeName];
        if (learningPathControlId) {
            testhooks[CustomControlConstants.LearningPathAttributeSuffix] = learningPathControlId;
        }
        switch (elementType.toUpperCase()) {
            case "CRMICON":
                var fontIconProps = props;
                return {
                    $$typeof: REACT_ELEMENT_TYPE,
                    type: CrmIcon,
                    props: {
                        id: id,
                        testhooks: testhooks,
                        type: fontIconProps.type,
                        style: fontIconProps.style,
                        hidden: fontIconProps.hidden,
                        accessibilityHasPopup: fontIconProps.accessibilityHasPopup,
                        accessibilityExpanded: fontIconProps.accessibilityExpanded,
                        accessibilityLabel: fontIconProps.accessibilityLabel,
                        accessibilityHidden: fontIconProps.accessibilityHidden,
                        labelledByElementId: fontIconProps.labelledByElementId,
                        describedByElementId: fontIconProps.describedByElementId,
                        controlsElementId: fontIconProps.controlsElementId,
                        ownsElementId: fontIconProps.ownsElementId,
                        role: fontIconProps.role,
                        tabIndex: fontIconProps.tabIndex,
                        onClick: fontIconProps.onClick,
                        onFocus: fontIconProps.onFocus,
                        onBlur: fontIconProps.onBlur,
                        onPointerDown: fontIconProps.onPointerDown,
                        onPointerUp: fontIconProps.onPointerUp,
                        onKeyDown: fontIconProps.onKeyDown,
                        onKeyUp: fontIconProps.onKeyUp,
                        title: fontIconProps.title,
                    },
                    key: fontIconProps.key,
                    ref: null,
                    _owner: null,
                };
            case "ENTITYICON":
                var entityIconProps = props;
                return {
                    $$typeof: REACT_ELEMENT_TYPE,
                    type: EntityIcon,
                    props: {
                        id: id,
                        testhooks: testhooks,
                        type: entityIconProps.type,
                        style: entityIconProps.style,
                        hidden: entityIconProps.hidden,
                        accessibilityHasPopup: entityIconProps.accessibilityHasPopup,
                        accessibilityExpanded: entityIconProps.accessibilityExpanded,
                        accessibilityLabel: entityIconProps.accessibilityLabel,
                        accessibilityHidden: entityIconProps.accessibilityHidden,
                        labelledByElementId: entityIconProps.labelledByElementId,
                        describedByElementId: entityIconProps.describedByElementId,
                        controlsElementId: entityIconProps.controlsElementId,
                        ownsElementId: entityIconProps.ownsElementId,
                        role: entityIconProps.role,
                        tabIndex: entityIconProps.tabIndex,
                        onClick: entityIconProps.onClick,
                        onFocus: entityIconProps.onFocus,
                        onBlur: entityIconProps.onBlur,
                        onPointerDown: entityIconProps.onPointerDown,
                        onPointerUp: entityIconProps.onPointerUp,
                        onKeyDown: entityIconProps.onKeyDown,
                        onKeyUp: entityIconProps.onKeyUp,
                        title: entityIconProps.title,
                    },
                    key: entityIconProps.key,
                    ref: null,
                    _owner: null,
                };
            case "MICROSOFTICON":
                var microsoftIconProps = props;
                return {
                    $$typeof: REACT_ELEMENT_TYPE,
                    type: MicrosoftIcon,
                    props: {
                        id: id,
                        testhooks: testhooks,
                        type: microsoftIconProps.type,
                        style: microsoftIconProps.style,
                        hidden: microsoftIconProps.hidden,
                        accessibilityHasPopup: microsoftIconProps.accessibilityHasPopup,
                        accessibilityExpanded: microsoftIconProps.accessibilityExpanded,
                        accessibilityLabel: microsoftIconProps.accessibilityLabel,
                        accessibilityHidden: microsoftIconProps.accessibilityHidden,
                        accessibilityChecked: microsoftIconProps.accessibilityChecked,
                        labelledByElementId: microsoftIconProps.labelledByElementId,
                        describedByElementId: microsoftIconProps.describedByElementId,
                        controlsElementId: microsoftIconProps.controlsElementId,
                        ownsElementId: microsoftIconProps.ownsElementId,
                        role: microsoftIconProps.role,
                        tabIndex: microsoftIconProps.tabIndex,
                        onClick: microsoftIconProps.onClick,
                        onFocus: microsoftIconProps.onFocus,
                        onBlur: microsoftIconProps.onBlur,
                        onPointerDown: microsoftIconProps.onPointerDown,
                        onPointerUp: microsoftIconProps.onPointerUp,
                        onKeyDown: microsoftIconProps.onKeyDown,
                        onKeyUp: microsoftIconProps.onKeyUp,
                        title: microsoftIconProps.title,
                    },
                    key: microsoftIconProps.key,
                    ref: null,
                    _owner: null,
                };
            case "BOOLEAN":
                var switchProps = props;
                return {
                    $$typeof: REACT_ELEMENT_TYPE,
                    type: Switch,
                    props: {
                        children: children,
                        style: switchProps.style,
                        name: switchProps.name,
                        disabled: switchProps.disabled,
                        value: switchProps.value,
                        id: id,
                        testhooks: testhooks,
                        hidden: switchProps.hidden,
                        accessibilityHasPopup: switchProps.accessibilityHasPopup,
                        accessibilityExpanded: switchProps.accessibilityExpanded,
                        accessibilityLabel: switchProps.accessibilityLabel,
                        accessibilityLive: switchProps.accessibilityLive,
                        accessibilityHidden: switchProps.accessibilityHidden,
                        accessibilityChecked: switchProps.accessibilityChecked,
                        accessibilityRequired: switchProps.accessibilityRequired,
                        labelledByElementId: switchProps.labelledByElementId,
                        describedByElementId: switchProps.describedByElementId,
                        controlsElementId: switchProps.controlsElementId,
                        ownsElementId: switchProps.ownsElementId,
                        role: switchProps.role,
                        tabIndex: switchProps.tabIndex,
                        onValueChange: switchProps.onValueChange,
                        onClick: switchProps.onClick,
                        onFocus: switchProps.onFocus,
                        onBlur: switchProps.onBlur,
                        title: switchProps.title,
                        displayAs: switchProps.displayAs,
                        displayValue: switchProps.displayValue,
                        defaultValue: switchProps.defaultValue,
                        options: switchProps.options,
                        onOptionSetValueChange: switchProps.onOptionSetValueChange,
                    },
                    key: switchProps.key,
                    ref: null,
                    _owner: null,
                };
            case "BUTTON":
                var buttonProps = props;
                return {
                    $$typeof: REACT_ELEMENT_TYPE,
                    type: Button,
                    props: {
                        children: children,
                        testhooks: testhooks,
                        style: buttonProps.style,
                        ownsElementId: buttonProps.ownsElementId,
                        accessKey: buttonProps.accessKey,
                        accessibilityLabel: buttonProps.accessibilityLabel,
                        id: id,
                        disabled: buttonProps.disabled,
                        hidden: buttonProps.hidden,
                        accessibilityDisabled: buttonProps.accessibilityDisabled,
                        accessibilityHasPopup: buttonProps.accessibilityHasPopup,
                        accessibilityExpanded: buttonProps.accessibilityExpanded,
                        accessibilityHidden: buttonProps.accessibilityHidden,
                        accessibilityPressed: buttonProps.accessibilityPressed,
                        activeDescendantId: buttonProps.activeDescendantId,
                        labelledByElementId: buttonProps.labelledByElementId,
                        describedByElementId: buttonProps.describedByElementId,
                        controlsElementId: buttonProps.controlsElementId,
                        isSelected: buttonProps.isSelected,
                        role: buttonProps.role,
                        tabIndex: buttonProps.tabIndex,
                        onClick: buttonProps.onClick,
                        onPointerDown: buttonProps.onPointerDown,
                        onFocus: buttonProps.onFocus,
                        onBlur: buttonProps.onBlur,
                        onKeyUp: buttonProps.onKeyUp,
                        onKeyDown: buttonProps.onKeyDown,
                        title: buttonProps.title,
                        className: buttonProps.className,
                        refCallback: buttonProps.refCallback,
                    },
                    key: buttonProps.key,
                    ref: null,
                    _owner: null,
                };
            case "COMBOBOX":
                var comboBoxProps = props;
                return {
                    $$typeof: REACT_ELEMENT_TYPE,
                    type: ComboBox,
                    props: {
                        children: children,
                        id: id,
                        testhooks: testhooks,
                        name: comboBoxProps.name,
                        options: comboBoxProps.options,
                        value: comboBoxProps.value,
                        placeholder: comboBoxProps.placeholder,
                        pageSize: comboBoxProps.pageSize,
                        freeTextMode: comboBoxProps.freeTextMode,
                        defaultValue: comboBoxProps.defaultValue,
                        disabled: comboBoxProps.disabled,
                        readOnly: comboBoxProps.readOnly,
                        onChange: comboBoxProps.onChange,
                        onOptionSelected: comboBoxProps.onOptionSelected,
                        onClick: comboBoxProps.onClick,
                        onBlur: comboBoxProps.onBlur,
                        onFocus: comboBoxProps.onFocus,
                        onMouseEnter: comboBoxProps.onMouseEnter,
                        onMouseLeave: comboBoxProps.onMouseLeave,
                        style: comboBoxProps.style,
                        hideArrow: comboBoxProps.hideArrow,
                        accessibilityLabel: comboBoxProps.accessibilityLabel,
                        accessibilityRequired: comboBoxProps.accessibilityRequired,
                        labelledByElementId: comboBoxProps.labelledByElementId,
                        describedByElementId: comboBoxProps.describedByElementId,
                        createAccessibilityComponent: ownProps.actions.createAccessibilityComponent,
                        createKeyboardShortcut: ownProps.actions.createKeyboardShortcut,
                        title: comboBoxProps.title,
                        parentCustomControlId: ownProps.controlId,
                        parentFlyoutRoot: ownProps.parentDefinedControlProps
                            ? ownProps.parentDefinedControlProps.parentFlyoutId
                            : null,
                        rootZIndex: hostData && hostData.isInSeeMoreMode,
                        textInputStyle: comboBoxProps.textInputStyle,
                        textStyle: comboBoxProps.textStyle,
                        hideInternalId: comboBoxProps.hideInternalId,
                        relativeToElementId: comboBoxProps.relativeToElementId,
                        ignoreFreeTextValueChange: comboBoxProps.suppressFreeTextChangeCallback,
                    },
                    key: comboBoxProps.key,
                    ref: null,
                    _owner: null,
                };
            case "CONTAINER":
                var viewProps = props;
                return {
                    $$typeof: REACT_ELEMENT_TYPE,
                    type: View,
                    props: {
                        children: children,
                        style: viewProps.style,
                        id: id,
                        testhooks: testhooks,
                        role: viewProps.role,
                        semanticTag: viewProps.semanticTag,
                        accessKey: viewProps.accessKey,
                        forceMeasure: viewProps.forceMeasure,
                        onMeasuring: viewProps.onMeasuring,
                        isRequestedMeasuring: viewProps.isRequestedMeasuring,
                        isRTL: viewProps.isRTL,
                        hidden: viewProps.hidden,
                        accessibilityLevel: viewProps.accessibilityLevel,
                        accessibilityHasPopup: viewProps.accessibilityHasPopup,
                        accessibilityExpanded: viewProps.accessibilityExpanded,
                        accessibilityLabel: viewProps.accessibilityLabel,
                        accessibilityHidden: viewProps.accessibilityHidden,
                        accessibilityLive: viewProps.accessibilityLive,
                        accessibilityRelevant: viewProps.accessibilityRelevant,
                        accessibilityAtomic: viewProps.accessibilityAtomic,
                        accessibilityValueMin: viewProps.accessibilityValueMin,
                        accessibilityValueMax: viewProps.accessibilityValueMax,
                        accessibilityValueNow: viewProps.accessibilityValueNow,
                        accessibilityValueText: viewProps.accessibilityValueText,
                        accessibilityRequired: viewProps.accessibilityRequired,
                        accessibilityReadOnly: viewProps.accessibilityReadOnly,
                        accessibilityAriaOrientation: viewProps.accessibilityAriaOrientation,
                        labelledByElementId: viewProps.labelledByElementId,
                        describedByElementId: viewProps.describedByElementId,
                        controlsElementId: viewProps.controlsElementId,
                        ownsElementId: viewProps.ownsElementId,
                        isSelected: viewProps.isSelected,
                        tabIndex: viewProps.tabIndex,
                        onClick: viewProps.onClick,
                        onDoubleClick: viewProps.onDoubleClick,
                        onDrag: viewProps.onDrag,
                        onDragEnd: viewProps.onDragEnd,
                        onDragEnter: viewProps.onDragEnter,
                        onDragExit: viewProps.onDragExit,
                        onDragLeave: viewProps.onDragLeave,
                        onDragOver: viewProps.onDragOver,
                        onDragStart: viewProps.onDragStart,
                        onDrop: viewProps.onDrop,
                        onKeyUp: viewProps.onKeyUp,
                        onKeyDown: viewProps.onKeyDown,
                        onPointerUp: viewProps.onPointerUp,
                        onPointerMove: viewProps.onPointerMove,
                        onPointerDown: viewProps.onPointerDown,
                        onPointerEnter: viewProps.onPointerEnter,
                        onPointerLeave: viewProps.onPointerLeave,
                        onFocus: viewProps.onFocus,
                        onBlur: viewProps.onBlur,
                        title: viewProps.title,
                        isWithinATopMostSeeMore: hostData.isInTopMostSeeMore,
                        className: viewProps.className,
                        refCallback: viewProps.refCallback,
                    },
                    key: viewProps.key,
                    ref: null,
                    _owner: null,
                };
            case "HYPERLINK":
                var hyperlinkProps = props;
                return {
                    $$typeof: REACT_ELEMENT_TYPE,
                    type: Hyperlink,
                    props: {
                        children: children,
                        id: id,
                        testhooks: testhooks,
                        style: hyperlinkProps.style,
                        download: hyperlinkProps.download,
                        href: hyperlinkProps.href,
                        target: hyperlinkProps.target,
                        hidden: hyperlinkProps.hidden,
                        accessibilityHasPopup: hyperlinkProps.accessibilityHasPopup,
                        accessibilityExpanded: hyperlinkProps.accessibilityExpanded,
                        accessibilityLabel: hyperlinkProps.accessibilityLabel,
                        accessibilityHidden: hyperlinkProps.accessibilityHidden,
                        labelledByElementId: hyperlinkProps.labelledByElementId,
                        describedByElementId: hyperlinkProps.describedByElementId,
                        controlsElementId: hyperlinkProps.controlsElementId,
                        ownsElementId: hyperlinkProps.ownsElementId,
                        role: hyperlinkProps.role,
                        tabIndex: hyperlinkProps.tabIndex,
                        onClick: hyperlinkProps.onClick,
                        onFocus: hyperlinkProps.onFocus,
                        onBlur: hyperlinkProps.onBlur,
                        onKeyDown: hyperlinkProps.onKeyDown,
                        onKeyUp: hyperlinkProps.onKeyUp,
                        title: hyperlinkProps.title,
                    },
                    key: hyperlinkProps.key,
                    ref: null,
                    _owner: null,
                };
            case "IMG":
                var imgProps = props;
                return {
                    $$typeof: REACT_ELEMENT_TYPE,
                    type: Image,
                    props: {
                        id: id,
                        testhooks: testhooks,
                        style: imgProps.style,
                        altText: imgProps.altText,
                        source: imgProps.source,
                        hidden: imgProps.hidden,
                        accessibilityHasPopup: imgProps.accessibilityHasPopup,
                        accessibilityExpanded: imgProps.accessibilityExpanded,
                        accessibilityLabel: imgProps.accessibilityLabel,
                        accessibilityHidden: imgProps.accessibilityHidden,
                        labelledByElementId: imgProps.labelledByElementId,
                        describedByElementId: imgProps.describedByElementId,
                        controlsElementId: imgProps.controlsElementId,
                        ownsElementId: imgProps.ownsElementId,
                        role: imgProps.role,
                        tabIndex: imgProps.tabIndex,
                        onLoad: imgProps.onLoad,
                        onClick: imgProps.onClick,
                        onFocus: imgProps.onFocus,
                        onBlur: imgProps.onBlur,
                        title: imgProps.title,
                    },
                    key: imgProps.key,
                    ref: null,
                    _owner: null,
                };
            case "IFRAME":
                var iframeProps = props;
                var isDefaultIframecontrol = ownProps.descriptor.ClassId &&
                    (areGuidsSame(IFRAME_CLASS_ID, ownProps.descriptor.ClassId.guid) ||
                        areGuidsSame(WEBRESOURCE_CLASS_ID, ownProps.descriptor.ClassId.guid));
                var onReadyStateComplete = ownProps.actions.runOnReadyStateComplete && isDefaultIframecontrol
                    ? function () {
                        ownProps.actions.runOnReadyStateComplete(ownProps.contextToken, ownProps.id, ownProps.controlId);
                    }
                    : null;
                return (React.createElement(IFrame, { id: iframeProps.id, name: iframeProps.name, testhooks: testhooks, title: iframeProps.title, style: iframeProps.style, onLoad: iframeProps.onLoad, src: iframeProps.src, scrolling: iframeProps.scrolling, security: iframeProps.security, onMessage: iframeProps.onMessage, tabIndex: iframeProps.tabIndex, accessibilityLabel: iframeProps.accessibilityLabel, registerSendMessageHandler: iframeProps.registerSendMessageHandler, onReadyStateComplete: onReadyStateComplete, key: iframeProps.src }));
            case "LABEL":
                var labelProps = props;
                return {
                    $$typeof: REACT_ELEMENT_TYPE,
                    type: Label,
                    props: {
                        children: children,
                        id: id,
                        style: labelProps.style,
                        role: labelProps.role,
                        forElementId: labelProps.forElementId,
                        hidden: labelProps.hidden,
                        accessibilityHasPopup: labelProps.accessibilityHasPopup,
                        accessibilityExpanded: labelProps.accessibilityExpanded,
                        accessibilityLabel: labelProps.accessibilityLabel,
                        accessibilityHidden: labelProps.accessibilityHidden,
                        accessibilityLive: labelProps.accessibilityLive,
                        accessibilityRelevant: labelProps.accessibilityRelevant,
                        accessibilityAtomic: labelProps.accessibilityAtomic,
                        labelledByElementId: labelProps.labelledByElementId,
                        describedByElementId: labelProps.describedByElementId,
                        controlsElementId: labelProps.controlsElementId,
                        ownsElementId: labelProps.ownsElementId,
                        tabIndex: labelProps.tabIndex,
                        onClick: labelProps.onClick,
                        onFocus: labelProps.onFocus,
                        onKeyUp: labelProps.onKeyUp,
                        onKeyDown: labelProps.onKeyDown,
                        onBlur: labelProps.onBlur,
                        testhooks: testhooks,
                        title: labelProps.title,
                    },
                    key: labelProps.key,
                    ref: null,
                    _owner: null,
                };
            case "LIST":
                var listProps = props;
                return {
                    $$typeof: REACT_ELEMENT_TYPE,
                    type: List,
                    props: {
                        accessibilityExpanded: listProps.accessibilityExpanded,
                        accessibilityHasPopup: listProps.accessibilityHasPopup,
                        accessibilityLabel: listProps.accessibilityLabel,
                        accessibilityHidden: listProps.accessibilityHidden,
                        accessibilityDisabled: listProps.accessibilityDisabled,
                        accessibilityReadOnly: listProps.accessibilityReadOnly,
                        accessibilityRequired: listProps.accessibilityRequired,
                        announceAccessibilityNotification: listProps.announceAccessibilityNotification,
                        children: children,
                        controlsElementId: listProps.controlsElementId,
                        describedByElementId: listProps.describedByElementId,
                        hidden: listProps.hidden,
                        id: id,
                        testhooks: testhooks,
                        labelledByElementId: listProps.labelledByElementId,
                        notificationType: listProps.notificationType,
                        onBlur: listProps.onBlur,
                        onClick: listProps.onClick,
                        onFocus: listProps.onFocus,
                        onKeyUp: listProps.onKeyUp,
                        onKeyDown: listProps.onKeyDown,
                        ownsElementId: listProps.ownsElementId,
                        refCallback: listProps.refCallback,
                        role: listProps.role,
                        style: listProps.style,
                        tabIndex: listProps.tabIndex,
                        title: listProps.title,
                    },
                    key: listProps.key,
                    ref: null,
                    _owner: null,
                };
            case "LISTITEM":
                var listItemProps = props;
                return {
                    $$typeof: REACT_ELEMENT_TYPE,
                    type: ListItem,
                    props: {
                        accessibilityExpanded: listItemProps.accessibilityExpanded,
                        accessibilityHasPopup: listItemProps.accessibilityHasPopup,
                        accessibilityLabel: listItemProps.accessibilityLabel,
                        accessibilityHidden: listItemProps.accessibilityHidden,
                        accessibilityDisabled: listItemProps.accessibilityDisabled,
                        accessibilityReadOnly: listItemProps.accessibilityReadOnly,
                        accessibilityLevel: listItemProps.accessibilityLevel,
                        accessibilityCurrent: listItemProps.accessibilityCurrent,
                        accessibilityRequired: listItemProps.accessibilityRequired,
                        children: children,
                        controlsElementId: listItemProps.controlsElementId,
                        describedByElementId: listItemProps.describedByElementId,
                        hidden: listItemProps.hidden,
                        id: id,
                        testhooks: testhooks,
                        labelledByElementId: listItemProps.labelledByElementId,
                        onBlur: listItemProps.onBlur,
                        onClick: listItemProps.onClick,
                        onClickCapture: listItemProps.onClickCapture,
                        onFocus: listItemProps.onFocus,
                        onPointerOver: listItemProps.onPointerOver,
                        onPointerOut: listItemProps.onPointerOut,
                        onPointerDown: listItemProps.onPointerDown,
                        onPointerMove: listItemProps.onPointerMove,
                        onPointerUp: listItemProps.onPointerUp,
                        onKeyUp: listItemProps.onKeyUp,
                        onKeyDown: listItemProps.onKeyDown,
                        ownsElementId: listItemProps.ownsElementId,
                        role: listItemProps.role,
                        style: listItemProps.style,
                        tabIndex: listItemProps.tabIndex,
                        isSelected: listItemProps.isSelected,
                        title: listItemProps.title,
                    },
                    key: listItemProps.key,
                    ref: null,
                    _owner: null,
                };
            case "LIVEPERSONACARDHOVERTARGET":
                var lpcprops = props;
                var onKeyDownContainerId = buildUniqueCustomControlId(ownProps, lpcprops.onKeyDownContainerId);
                return {
                    $$typeof: REACT_ELEMENT_TYPE,
                    type: LivePersonaCardHoverTarget,
                    props: {
                        accessibilityLabel: lpcprops.accessibilityLabel,
                        children: children,
                        displayName: lpcprops.displayName,
                        emailAddress: lpcprops.emailAddress,
                        entityReference: lpcprops.entityReference,
                        id: lpcprops.id,
                        onKeyDownContainerId: onKeyDownContainerId,
                        personaType: lpcprops.personaType,
                        recordId: lpcprops.recordId,
                        registerHasLivePersonaCardLoadedCallback: lpcprops.registerHasLivePersonaCardLoadedCallback,
                        registerOpenCardCallback: lpcprops.registerOpenCardCallback,
                        renderAsPresentational: lpcprops.renderAsPresentational,
                        style: lpcprops.style,
                        testhooks: testhooks,
                    },
                    key: lpcprops.key,
                    ref: null,
                    _owner: null,
                };
            case "POPUP":
                var popupProps = props;
                var component = (React.createElement(Popup, __assign({}, popupProps, { id: popupProps.id, createAccessibilityComponent: ownProps.actions.createAccessibilityComponent, children: children })));
                if (popupProps.type === PopupType.Root) {
                    return (React.createElement(RootPopup, { key: popupProps.key, parentCustomControlId: ownProps.controlId, id: popupProps.name, openPopup: ownProps.actions.openPopup, closePopup: ownProps.actions.closePopup, wrapElement: ownProps.themePortalWrapper }, component));
                }
                return component;
            case "FLYOUT":
                var flyoutProps = props;
                var prefixedRelativeToElementId = buildUniqueCustomControlId(ownProps, flyoutProps.relativeToElementId, flyoutProps.absoluteRelativeToElementId || props.absoluteId);
                var customControlElementId = buildUniqueCustomControlId(ownProps, flyoutProps.focusElementId, flyoutProps.absoluteFocusElementId || props.absoluteId);
                var focusCallback = function (elementId) { return focusElementById(ownProps, elementId, true); };
                var portalFlyoutProps = ownProps.portalFlyoutToDialogId
                    ? {
                        isPortalToElement: true,
                        portalContainerId: ownProps.portalFlyoutToDialogId,
                    }
                    : {};
                return {
                    $$typeof: REACT_ELEMENT_TYPE,
                    type: Flyout,
                    props: {
                        id: id,
                        parentCustomControlId: ownProps.controlId,
                        groupId: flyoutProps.groupId,
                        onOutsideClick: flyoutProps.onOutsideClick,
                        children: children,
                        flyoutStyle: flyoutProps.flyoutStyle,
                        position: flyoutProps.position,
                        positionType: flyoutProps.positionType,
                        flyoutDirection: flyoutProps.flyoutDirection,
                        relativeToElementId: prefixedRelativeToElementId,
                        size: flyoutProps.size,
                        focusElementId: customControlElementId,
                        focusCallback: focusCallback,
                        hasDynamicContent: flyoutProps.hasDynamicContent,
                        parentFlyoutRoot: ownProps.parentDefinedControlProps
                            ? ownProps.parentDefinedControlProps.parentFlyoutId
                            : null,
                        rootZIndex: hostData && hostData.isInSeeMoreMode,
                        isPortalToElement: portalFlyoutProps.isPortalToElement,
                        portalContainerId: portalFlyoutProps.portalContainerId,
                        role: flyoutProps.role,
                        accessibilityModal: flyoutProps.accessibilityModal,
                        keepOpenOnWindowBlur: flyoutProps.keepOpenOnWindowBlur,
                        disableHorizontalScroll: flyoutProps.disableHorizontalScroll,
                        disableVerticalScroll: flyoutProps.disableVerticalScroll,
                        keepWhenRelativeToElementHides: flyoutProps.keepWhenRelativeToElementHides,
                        hasOnClickAncestor: ancestralOnClick,
                    },
                    key: flyoutProps.key,
                    ref: null,
                    _owner: null,
                };
            case "SCROLLCONTAINER":
                var scrollViewProps = props;
                return {
                    $$typeof: REACT_ELEMENT_TYPE,
                    type: ScrollView,
                    props: {
                        children: children,
                        style: scrollViewProps.style,
                        id: id,
                        testhooks: testhooks,
                        contentContainerStyle: scrollViewProps.contentContainerStyle,
                        horizontal: scrollViewProps.horizontal,
                        onScroll: scrollViewProps.onScroll,
                        hidden: scrollViewProps.hidden,
                        accessibilityHasPopup: scrollViewProps.accessibilityHasPopup,
                        accessibilityExpanded: scrollViewProps.accessibilityExpanded,
                        accessibilityLabel: scrollViewProps.accessibilityLabel,
                        accessibilityHidden: scrollViewProps.accessibilityHidden,
                        labelledByElementId: scrollViewProps.labelledByElementId,
                        describedByElementId: scrollViewProps.describedByElementId,
                        controlsElementId: scrollViewProps.controlsElementId,
                        ownsElementId: scrollViewProps.ownsElementId,
                        role: scrollViewProps.role,
                        tabIndex: scrollViewProps.tabIndex,
                        onScrollToBottom: scrollViewProps.onScrollToBottom,
                        semanticTag: scrollViewProps.semanticTag,
                        onKeyDown: scrollViewProps.onKeyDown,
                        onClick: scrollViewProps.onClick,
                        onFocus: scrollViewProps.onFocus,
                        onBlur: scrollViewProps.onBlur,
                        title: scrollViewProps.title,
                        isRTL: ownProps.propBagData.clientData.isRTL,
                        isWithinATopMostSeeMore: hostData.isInTopMostSeeMore,
                        className: scrollViewProps.className,
                    },
                    key: scrollViewProps.key,
                    ref: null,
                    _owner: null,
                };
            case "TABLE":
                var tableProps = props;
                return {
                    $$typeof: REACT_ELEMENT_TYPE,
                    type: Table,
                    props: {
                        children: children,
                        id: id,
                        testhooks: testhooks,
                        style: tableProps.style,
                        hidden: tableProps.hidden,
                        accessibilityHasPopup: tableProps.accessibilityHasPopup,
                        accessibilityExpanded: tableProps.accessibilityExpanded,
                        accessibilityLabel: tableProps.accessibilityLabel,
                        accessibilityHidden: tableProps.accessibilityHidden,
                        labelledByElementId: tableProps.labelledByElementId,
                        describedByElementId: tableProps.describedByElementId,
                        controlsElementId: tableProps.controlsElementId,
                        ownsElementId: tableProps.ownsElementId,
                        role: tableProps.role,
                        tabIndex: tableProps.tabIndex,
                        onClick: tableProps.onClick,
                        onFocus: tableProps.onFocus,
                        onBlur: tableProps.onBlur,
                        title: tableProps.title,
                    },
                    key: tableProps.key,
                    ref: null,
                    _owner: null,
                };
            case "TABLEBODY":
                var tableBodyProps = props;
                return {
                    $$typeof: REACT_ELEMENT_TYPE,
                    type: TableBody,
                    props: {
                        children: children,
                        key: tableBodyProps.key,
                        id: id,
                        testhooks: testhooks,
                        style: tableBodyProps.style,
                        hidden: tableBodyProps.hidden,
                        accessibilityHasPopup: tableBodyProps.accessibilityHasPopup,
                        accessibilityExpanded: tableBodyProps.accessibilityExpanded,
                        accessibilityLabel: tableBodyProps.accessibilityLabel,
                        accessibilityHidden: tableBodyProps.accessibilityHidden,
                        labelledByElementId: tableBodyProps.labelledByElementId,
                        describedByElementId: tableBodyProps.describedByElementId,
                        controlsElementId: tableBodyProps.controlsElementId,
                        ownsElementId: tableBodyProps.ownsElementId,
                        role: tableBodyProps.role,
                        tabIndex: tableBodyProps.tabIndex,
                        onClick: tableBodyProps.onClick,
                        onFocus: tableBodyProps.onFocus,
                        onBlur: tableBodyProps.onBlur,
                        title: tableBodyProps.title,
                    },
                    key: tableBodyProps.key,
                    ref: null,
                    _owner: null,
                };
            case "TABLECAPTION":
                var tableCaptionProps = props;
                return {
                    $$typeof: REACT_ELEMENT_TYPE,
                    type: TableCaption,
                    props: {
                        children: children,
                        id: id,
                        testhooks: testhooks,
                        style: tableCaptionProps.style,
                        hidden: tableCaptionProps.hidden,
                        accessibilityHasPopup: tableCaptionProps.accessibilityHasPopup,
                        accessibilityExpanded: tableCaptionProps.accessibilityExpanded,
                        accessibilityLabel: tableCaptionProps.accessibilityLabel,
                        accessibilityHidden: tableCaptionProps.accessibilityHidden,
                        labelledByElementId: tableCaptionProps.labelledByElementId,
                        describedByElementId: tableCaptionProps.describedByElementId,
                        controlsElementId: tableCaptionProps.controlsElementId,
                        ownsElementId: tableCaptionProps.ownsElementId,
                        role: tableCaptionProps.role,
                        tabIndex: tableCaptionProps.tabIndex,
                        onClick: tableCaptionProps.onClick,
                        onFocus: tableCaptionProps.onFocus,
                        onBlur: tableCaptionProps.onBlur,
                        title: tableCaptionProps.title,
                    },
                    key: tableCaptionProps.key,
                    ref: null,
                    _owner: null,
                };
            case "TABLECELL":
                var tableCellProps = props;
                return {
                    $$typeof: REACT_ELEMENT_TYPE,
                    type: TableCell,
                    props: {
                        children: children,
                        id: id,
                        colSpan: tableCellProps.colSpan,
                        testhooks: testhooks,
                        style: tableCellProps.style,
                        hidden: tableCellProps.hidden,
                        accessibilityHasPopup: tableCellProps.accessibilityHasPopup,
                        accessibilityExpanded: tableCellProps.accessibilityExpanded,
                        accessibilityLabel: tableCellProps.accessibilityLabel,
                        accessibilityHidden: tableCellProps.accessibilityHidden,
                        labelledByElementId: tableCellProps.labelledByElementId,
                        describedByElementId: tableCellProps.describedByElementId,
                        controlsElementId: tableCellProps.controlsElementId,
                        ownsElementId: tableCellProps.ownsElementId,
                        role: tableCellProps.role,
                        tabIndex: tableCellProps.tabIndex,
                        onClick: tableCellProps.onClick,
                        onFocus: tableCellProps.onFocus,
                        onBlur: tableCellProps.onBlur,
                        onKeyDown: tableCellProps.onKeyDown,
                        title: tableCellProps.title,
                        rowSpan: tableCellProps.rowSpan,
                        scope: tableCellProps.scope,
                    },
                    key: tableCellProps.key,
                    ref: null,
                    _owner: null,
                };
            case "TABLEFOOTER":
                var tableFooterProps = props;
                return {
                    $$typeof: REACT_ELEMENT_TYPE,
                    type: TableFooter,
                    props: {
                        children: children,
                        id: id,
                        testhooks: testhooks,
                        style: tableFooterProps.style,
                        hidden: tableFooterProps.hidden,
                        accessibilityHasPopup: tableFooterProps.accessibilityHasPopup,
                        accessibilityExpanded: tableFooterProps.accessibilityExpanded,
                        accessibilityLabel: tableFooterProps.accessibilityLabel,
                        accessibilityHidden: tableFooterProps.accessibilityHidden,
                        labelledByElementId: tableFooterProps.labelledByElementId,
                        describedByElementId: tableFooterProps.describedByElementId,
                        controlsElementId: tableFooterProps.controlsElementId,
                        ownsElementId: tableFooterProps.ownsElementId,
                        role: tableFooterProps.role,
                        tabIndex: tableFooterProps.tabIndex,
                        onClick: tableFooterProps.onClick,
                        onFocus: tableFooterProps.onFocus,
                        onBlur: tableFooterProps.onBlur,
                        title: tableFooterProps.title,
                    },
                    key: tableFooterProps.key,
                    ref: null,
                    _owner: null,
                };
            case "TABLEHEADER":
                var tableHeaderProps = props;
                return {
                    $$typeof: REACT_ELEMENT_TYPE,
                    type: TableHeader,
                    props: {
                        children: children,
                        id: id,
                        testhooks: testhooks,
                        style: tableHeaderProps.style,
                        hidden: tableHeaderProps.hidden,
                        accessibilityHasPopup: tableHeaderProps.accessibilityHasPopup,
                        accessibilityExpanded: tableHeaderProps.accessibilityExpanded,
                        accessibilityLabel: tableHeaderProps.accessibilityLabel,
                        accessibilityHidden: tableHeaderProps.accessibilityHidden,
                        labelledByElementId: tableHeaderProps.labelledByElementId,
                        describedByElementId: tableHeaderProps.describedByElementId,
                        controlsElementId: tableHeaderProps.controlsElementId,
                        ownsElementId: tableHeaderProps.ownsElementId,
                        role: tableHeaderProps.role,
                        tabIndex: tableHeaderProps.tabIndex,
                        onClick: tableHeaderProps.onClick,
                        onFocus: tableHeaderProps.onFocus,
                        onBlur: tableHeaderProps.onBlur,
                        title: tableHeaderProps.title,
                    },
                    key: tableHeaderProps.key,
                    ref: null,
                    _owner: null,
                };
            case "TABLEHEADERCELL":
                var tableHeaderCellProps = props;
                return {
                    $$typeof: REACT_ELEMENT_TYPE,
                    type: TableHeaderCell,
                    props: {
                        children: children,
                        id: id,
                        testhooks: testhooks,
                        style: tableHeaderCellProps.style,
                        hidden: tableHeaderCellProps.hidden,
                        accessibilityHasPopup: tableHeaderCellProps.accessibilityHasPopup,
                        accessibilityExpanded: tableHeaderCellProps.accessibilityExpanded,
                        accessibilityLabel: tableHeaderCellProps.accessibilityLabel,
                        accessibilityHidden: tableHeaderCellProps.accessibilityHidden,
                        labelledByElementId: tableHeaderCellProps.labelledByElementId,
                        describedByElementId: tableHeaderCellProps.describedByElementId,
                        controlsElementId: tableHeaderCellProps.controlsElementId,
                        ownsElementId: tableHeaderCellProps.ownsElementId,
                        role: tableHeaderCellProps.role,
                        tabIndex: tableHeaderCellProps.tabIndex,
                        onClick: tableHeaderCellProps.onClick,
                        onFocus: tableHeaderCellProps.onFocus,
                        onBlur: tableHeaderCellProps.onBlur,
                        onKeyDown: tableHeaderCellProps.onKeyDown,
                        title: tableHeaderCellProps.title,
                        colSpan: tableHeaderCellProps.colSpan,
                        rowSpan: tableHeaderCellProps.rowSpan,
                        scope: tableHeaderCellProps.scope,
                    },
                    key: tableHeaderCellProps.key,
                    ref: null,
                    _owner: null,
                };
            case "TABLEROW":
                var tableRowProps = props;
                return {
                    $$typeof: REACT_ELEMENT_TYPE,
                    type: TableRow,
                    props: {
                        children: children,
                        id: id,
                        testhooks: testhooks,
                        style: tableRowProps.style,
                        hidden: tableRowProps.hidden,
                        accessibilityHasPopup: tableRowProps.accessibilityHasPopup,
                        accessibilityExpanded: tableRowProps.accessibilityExpanded,
                        accessibilityLabel: tableRowProps.accessibilityLabel,
                        accessibilityHidden: tableRowProps.accessibilityHidden,
                        labelledByElementId: tableRowProps.labelledByElementId,
                        describedByElementId: tableRowProps.describedByElementId,
                        controlsElementId: tableRowProps.controlsElementId,
                        ownsElementId: tableRowProps.ownsElementId,
                        role: tableRowProps.role,
                        tabIndex: tableRowProps.tabIndex,
                        onClick: tableRowProps.onClick,
                        onFocus: tableRowProps.onFocus,
                        onBlur: tableRowProps.onBlur,
                        title: tableRowProps.title,
                    },
                    key: tableRowProps.key,
                    ref: null,
                    _owner: null,
                };
            case "FILEINPUT":
                var fileInputProps = props;
                return (React.createElement(FileInput, { style: fileInputProps.style, fileSelected: fileInputProps.fileSelected, fileUnselected: fileInputProps.fileUnselected, accept: fileInputProps.accept, id: id, onReaderError: fileInputProps.onReaderError, multipleFilesSelected: fileInputProps.multipleFilesSelected, testhooks: testhooks, key: fileInputProps.key, title: fileInputProps.title, accessibilityLabel: fileInputProps.accessibilityLabel, tabIndex: fileInputProps.tabIndex }));
            case "TEXTINPUT":
                var textProps = props;
                return {
                    $$typeof: REACT_ELEMENT_TYPE,
                    type: TextInput,
                    props: {
                        readOnly: textProps.readOnly,
                        id: id,
                        type: textProps.type,
                        keyboardType: textProps.keyboardType,
                        maxLength: textProps.maxLength,
                        multiline: textProps.multiline,
                        ownsElementId: textProps.ownsElementId,
                        onClick: textProps.onClick,
                        onBlur: textProps.onBlur,
                        onChange: textProps.onChange,
                        onChangeText: textProps.onChangeText,
                        onFocus: textProps.onFocus,
                        onKeyPress: textProps.onKeyPress,
                        onKeyDown: textProps.onKeyDown,
                        onKeyUp: textProps.onKeyUp,
                        onPointerEnter: textProps.onPointerEnter,
                        onPointerLeave: textProps.onPointerLeave,
                        onScroll: textProps.onScroll,
                        placeholder: textProps.placeholder,
                        style: textProps.style,
                        value: textProps.value,
                        hidden: textProps.hidden,
                        disabled: textProps.disabled,
                        accessibilityDisabled: textProps.accessibilityDisabled,
                        accessibilityHasPopup: textProps.accessibilityHasPopup,
                        accessibilityExpanded: textProps.accessibilityExpanded,
                        accessibilityLabel: textProps.accessibilityLabel,
                        accessibilityLive: textProps.accessibilityLive,
                        accessibilityHidden: textProps.accessibilityHidden,
                        accessibilityReadOnly: textProps.accessibilityReadOnly,
                        accessibilityRequired: textProps.accessibilityRequired,
                        activeDescendantId: textProps.activeDescendantId,
                        autoComplete: textProps.autoComplete,
                        labelledByElementId: textProps.labelledByElementId,
                        describedByElementId: textProps.describedByElementId,
                        controlsElementId: textProps.controlsElementId,
                        role: textProps.role,
                        tabIndex: textProps.tabIndex,
                        testhooks: testhooks,
                        refCallback: textProps.refCallback,
                        rows: textProps.rows,
                        selectValueOnFocus: textProps.selectValueOnFocus,
                        title: textProps.title,
                    },
                    key: textProps.key,
                    ref: null,
                    _owner: null,
                };
            case "COMMANDBAR":
                var commandManagerProps = props;
                var commandManagerId = props.commandManagerId || ownProps.id + ":" + ownProps.controlId;
                var wrapper = CommandingWrapper.getWrapperByCommandManagerId(commandManagerId);
                if (!wrapper) {
                    wrapper = new CommandingWrapper(ownProps);
                    complexKeeper(commandManagerId, wrapper);
                }
                wrapper.populateCommandManagerProps(commandManagerProps, ownProps);
                commandManagerProps.width = commandManagerProps.width || 1;
                commandManagerProps.contextToken = ownProps.contextToken;
                commandManagerProps.rootZIndex = hostData && hostData.isInSeeMoreMode;
                return wrapper.createCommandBar(commandManagerProps);
            case "OPTION":
                var optionProps = props;
                return {
                    $$typeof: REACT_ELEMENT_TYPE,
                    type: Option,
                    props: {
                        id: id,
                        value: optionProps.value,
                        disabled: optionProps.disabled,
                        style: optionProps.style,
                        testhooks: testhooks,
                    },
                    key: optionProps.key,
                    ref: null,
                    _owner: null,
                };
            case "SELECT":
                var selectProps = props;
                return {
                    $$typeof: REACT_ELEMENT_TYPE,
                    type: Select,
                    props: {
                        id: id,
                        value: selectProps.value,
                        options: selectProps.options,
                        style: selectProps.style,
                        disabled: selectProps.disabled,
                        tabIndex: selectProps.tabIndex,
                        hidden: selectProps.hidden,
                        accessibilityHasPopup: selectProps.accessibilityHasPopup,
                        accessibilityExpanded: selectProps.accessibilityExpanded,
                        accessibilityLabel: selectProps.accessibilityLabel,
                        accessibilityRequired: selectProps.accessibilityRequired,
                        labelledByElementId: selectProps.labelledByElementId,
                        describedByElementId: selectProps.describedByElementId,
                        controlsElementId: selectProps.controlsElementId,
                        ownsElementId: selectProps.ownsElementId,
                        testhooks: testhooks,
                        onBlur: selectProps.onBlur,
                        onClick: selectProps.onClick,
                        onFocus: selectProps.onFocus,
                        onChange: selectProps.onChange,
                        onPointerOver: selectProps.onPointerOver,
                        onPointerOut: selectProps.onPointerOut,
                        onPointerEnter: selectProps.onPointerEnter,
                        onPointerLeave: selectProps.onPointerLeave,
                        onPointerDown: selectProps.onPointerDown,
                        onPointerUp: selectProps.onPointerUp,
                        onKeyDown: selectProps.onKeyDown,
                        onKeyUp: selectProps.onKeyUp,
                        multiple: selectProps.multiple,
                        readOnly: selectProps.readOnly,
                        title: selectProps.title,
                    },
                    key: selectProps.key,
                    ref: null,
                    _owner: null,
                };
            case "ENTITYIMAGE":
                var entityImgProps = props;
                return (React.createElement(EntityImage, { key: entityImgProps.key, id: id, testhooks: testhooks, style: entityImgProps.style, hasPrimaryImageField: entityImgProps.hasPrimaryImageField, imageSrc: entityImgProps.imageSrc, alt: entityImgProps.alt, entityPrimaryField: entityImgProps.entityPrimaryField, hidden: entityImgProps.hidden, accessibilityHasPopup: entityImgProps.accessibilityHasPopup, accessibilityExpanded: entityImgProps.accessibilityExpanded, accessibilityLabel: entityImgProps.accessibilityLabel, accessibilityHidden: entityImgProps.accessibilityHidden, labelledByElementId: entityImgProps.labelledByElementId, describedByElementId: entityImgProps.describedByElementId, controlsElementId: entityImgProps.controlsElementId, ownsElementId: entityImgProps.ownsElementId, role: entityImgProps.role, tabIndex: entityImgProps.tabIndex, onClick: entityImgProps.onClick, onFocus: entityImgProps.onFocus, onBlur: entityImgProps.onBlur, title: entityImgProps.title, sipUrl: entityImgProps.sipUrl, presenceIndicatorSize: entityImgProps.presenceIndicatorSize, entityReference: entityImgProps.entityReference, entityHealthScore: entityImgProps.entityHealthScore, iconStyle: entityImgProps.iconStyle, customEntityIcon: entityImgProps.customEntityIcon }));
            case "PROGRESSINDICATOR":
                var progressIndicatorProps = props;
                return (React.createElement(ProgressIndicator, { id: id, style: progressIndicatorProps.style, hidden: progressIndicatorProps.hidden, accessibilityHasPopup: progressIndicatorProps.accessibilityHasPopup, accessibilityExpanded: progressIndicatorProps.accessibilityExpanded, accessibilityLabel: progressIndicatorProps.accessibilityLabel, accessibilityChecked: progressIndicatorProps.accessibilityChecked, accessibilityReadOnly: progressIndicatorProps.accessibilityReadOnly, accessibilityHidden: progressIndicatorProps.accessibilityHidden, labelledByElementId: progressIndicatorProps.labelledByElementId, describedByElementId: progressIndicatorProps.describedByElementId, controlsElementId: progressIndicatorProps.controlsElementId, ownsElementId: progressIndicatorProps.ownsElementId, activeDescendantId: progressIndicatorProps.activeDescendantId, role: progressIndicatorProps.role, tabIndex: progressIndicatorProps.tabIndex, onClick: progressIndicatorProps.onClick, onFocus: progressIndicatorProps.onFocus, onBlur: progressIndicatorProps.onBlur, onPointerOver: progressIndicatorProps.onPointerOver, onPointerOut: progressIndicatorProps.onPointerOut, onPointerUp: progressIndicatorProps.onPointerUp, onPointerDown: progressIndicatorProps.onPointerDown, onPointerEnter: progressIndicatorProps.onPointerEnter, onPointerLeave: progressIndicatorProps.onPointerLeave, onPointerMove: progressIndicatorProps.onPointerMove, onPointerCancel: progressIndicatorProps.onPointerCancel, onKeyDown: progressIndicatorProps.onKeyDown, onKeyUp: progressIndicatorProps.onKeyUp, onMouseEnter: progressIndicatorProps.onMouseEnter, onMouseLeave: progressIndicatorProps.onMouseLeave, testhooks: testhooks, title: progressIndicatorProps.title, active: progressIndicatorProps.active, progressType: progressIndicatorProps.progressType, progress: progressIndicatorProps.progress, progressDots: progressIndicatorProps.progressDots, className: progressIndicatorProps.className, animating: progressIndicatorProps.animating, animationDelay: progressIndicatorProps.animationDelay }));
            case "RADIO":
                var radioInputProps = props;
                return (React.createElement(RadioInput, { id: id, value: radioInputProps.value, options: radioInputProps.options, style: radioInputProps.style, disabled: radioInputProps.disabled, tabIndex: radioInputProps.tabIndex, hidden: radioInputProps.hidden, accessibilityLabel: radioInputProps.accessibilityLabel, accessibilityChecked: radioInputProps.accessibilityChecked, labelledByElementId: radioInputProps.labelledByElementId, describedByElementId: radioInputProps.describedByElementId, controlsElementId: radioInputProps.controlsElementId, ownsElementId: radioInputProps.ownsElementId, testhooks: testhooks, onBlur: radioInputProps.onBlur, onClick: radioInputProps.onClick, onFocus: radioInputProps.onFocus, onChange: radioInputProps.onChange, onPointerOver: radioInputProps.onPointerOver, onPointerOut: radioInputProps.onPointerOut, onPointerEnter: radioInputProps.onPointerEnter, onPointerLeave: radioInputProps.onPointerLeave, onPointerDown: radioInputProps.onPointerDown, onPointerUp: radioInputProps.onPointerUp, onKeyDown: radioInputProps.onKeyDown, onKeyUp: radioInputProps.onKeyUp }));
            case "HORIZONTALSCROLL":
                var horizontalScrollProps = props;
                return {
                    $$typeof: REACT_ELEMENT_TYPE,
                    type: HorizontalScroll,
                    props: {
                        isRTL: ownProps.propBagData.clientData.isRTL,
                        children: children,
                        scrollViewStyle: horizontalScrollProps.scrollViewStyle,
                        style: horizontalScrollProps.style,
                        id: id,
                        startChildIndex: horizontalScrollProps.startChildIndex,
                        arrowWidth: horizontalScrollProps.arrowWidth,
                        arrowButtonStyle: horizontalScrollProps.arrowButtonStyle,
                        prevArrowIconType: horizontalScrollProps.prevArrowIconType,
                        nextArrowIconType: horizontalScrollProps.nextArrowIconType,
                        onPrevArrowClick: horizontalScrollProps.onPrevArrowClick,
                        onNextArrowClick: horizontalScrollProps.onNextArrowClick,
                        onPrevArrowKeyDown: horizontalScrollProps.onPrevArrowKeyDown,
                        onNextArrowKeyDown: horizontalScrollProps.onNextArrowKeyDown,
                        testhooks: testhooks,
                        hidden: horizontalScrollProps.hidden,
                        accessibilityHasPopup: horizontalScrollProps.accessibilityHasPopup,
                        accessibilityExpanded: horizontalScrollProps.accessibilityExpanded,
                        accessibilityLabel: horizontalScrollProps.accessibilityLabel,
                        accessibilityHidden: horizontalScrollProps.accessibilityHidden,
                        scrollRightAccessibilityLabel: horizontalScrollProps.scrollRightAccessibilityLabel,
                        scrollLeftAccessibilityLabel: horizontalScrollProps.scrollLeftAccessibilityLabel,
                        labelledByElementId: horizontalScrollProps.labelledByElementId,
                        describedByElementId: horizontalScrollProps.describedByElementId,
                        controlsElementId: horizontalScrollProps.controlsElementId,
                        ownsElementId: horizontalScrollProps.ownsElementId,
                        role: horizontalScrollProps.role,
                        semanticTag: horizontalScrollProps.semanticTag,
                        tabIndex: horizontalScrollProps.tabIndex,
                        onClick: horizontalScrollProps.onClick,
                        onFocus: horizontalScrollProps.onFocus,
                        onBlur: horizontalScrollProps.onBlur,
                        title: horizontalScrollProps.title,
                    },
                    key: horizontalScrollProps.key,
                    ref: null,
                    _owner: null,
                };
            case "VIEWSELECTORCONTROL":
                var viewSelectorProps = props;
                return (React.createElement(ViewSelectorControl, { style: viewSelectorProps.style, viewSelectorStyle: viewSelectorProps.viewSelectorStyle, textStyle: viewSelectorProps.textStyle, id: id, key: viewSelectorProps.key, semanticTag: viewSelectorProps.semanticTag, testhooks: viewSelectorProps.testhooks, value: viewSelectorProps.value, title: viewSelectorProps.title, categories: viewSelectorProps.categories, options: viewSelectorProps.options, hoveredStyle: viewSelectorProps.hoveredStyle, caretStyle: viewSelectorProps.caretStyle, caretType: viewSelectorProps.caretType, createAccessibilityComponent: ownProps.actions.createAccessibilityComponent, createKeyboardShortcut: ownProps.actions.createKeyboardShortcut, defaultValue: viewSelectorProps.defaultValue, tabIndex: viewSelectorProps.tabIndex, onChange: viewSelectorProps.onChange, onClick: viewSelectorProps.onClick, onKeyUp: viewSelectorProps.onKeyUp, onKeyDown: viewSelectorProps.onKeyDown, onPointerUp: viewSelectorProps.onPointerUp, onPointerMove: viewSelectorProps.onPointerMove, onPointerDown: viewSelectorProps.onPointerDown, onPointerEnter: viewSelectorProps.onPointerEnter, onPointerLeave: viewSelectorProps.onPointerLeave, onFocus: viewSelectorProps.onFocus, onBlur: viewSelectorProps.onBlur, suppressFreeTextChangeCallback: viewSelectorProps.suppressFreeTextChangeCallback, parentCustomControlId: ownProps.controlId, rootZIndex: hostData && hostData.isInSeeMoreMode, isRTL: ownProps.propBagData.clientData && ownProps.propBagData.clientData.isRTL }));
            case "TEXT":
                var textProperties = props;
                var flexibleTextProperties = props;
                if (flexibleTextProperties.truncatedlines) {
                    return {
                        $$typeof: REACT_ELEMENT_TYPE,
                        type: FlexibleText,
                        props: {
                            isRTL: flexibleTextProperties.isRTL === null || flexibleTextProperties.isRTL === undefined
                                ? ownProps.propBagData.clientData.isRTL
                                : flexibleTextProperties.isRTL,
                            children: children,
                            id: id,
                            style: flexibleTextProperties.style,
                            flexibleTextContainerStyle: flexibleTextProperties.flexibleTextContainerStyle,
                            flexibleTextStyle: flexibleTextProperties.flexibleTextStyle,
                            role: flexibleTextProperties.role,
                            hidden: flexibleTextProperties.hidden,
                            accessibilityHasPopup: flexibleTextProperties.accessibilityHasPopup,
                            accessibilityExpanded: flexibleTextProperties.accessibilityExpanded,
                            accessibilityLabel: flexibleTextProperties.accessibilityLabel,
                            accessibilityHidden: flexibleTextProperties.accessibilityHidden,
                            accessibilityLive: flexibleTextProperties.accessibilityLive,
                            accessibilityRelevant: flexibleTextProperties.accessibilityRelevant,
                            accessibilityAtomic: flexibleTextProperties.accessibilityAtomic,
                            labelledByElementId: flexibleTextProperties.labelledByElementId,
                            describedByElementId: flexibleTextProperties.describedByElementId,
                            controlsElementId: flexibleTextProperties.controlsElementId,
                            ownsElementId: flexibleTextProperties.ownsElementId,
                            tabIndex: flexibleTextProperties.tabIndex,
                            onClick: flexibleTextProperties.onClick,
                            onFocus: flexibleTextProperties.onFocus,
                            onKeyUp: flexibleTextProperties.onKeyUp,
                            onKeyDown: flexibleTextProperties.onKeyDown,
                            onBlur: flexibleTextProperties.onBlur,
                            testhooks: testhooks,
                            title: flexibleTextProperties.title,
                            semanticTag: flexibleTextProperties.semanticTag,
                            truncatedlines: flexibleTextProperties.truncatedlines,
                            maskingColor: flexibleTextProperties.maskingColor,
                            noExpandable: flexibleTextProperties.noExpandable,
                            isFieldLabel: flexibleTextProperties.isFieldLabel,
                            lineHeight: flexibleTextProperties.lineHeight,
                        },
                        key: flexibleTextProperties.key,
                        ref: null,
                        _owner: null,
                    };
                }
                return {
                    $$typeof: REACT_ELEMENT_TYPE,
                    type: Text,
                    props: {
                        children: children,
                        id: id,
                        style: textProperties.style,
                        role: textProperties.role,
                        hidden: textProperties.hidden,
                        accessibilityHasPopup: textProperties.accessibilityHasPopup,
                        accessibilityExpanded: textProperties.accessibilityExpanded,
                        accessibilityLabel: textProperties.accessibilityLabel,
                        accessibilityHidden: textProperties.accessibilityHidden,
                        labelledByElementId: textProperties.labelledByElementId,
                        describedByElementId: textProperties.describedByElementId,
                        controlsElementId: textProperties.controlsElementId,
                        ownsElementId: textProperties.ownsElementId,
                        tabIndex: textProperties.tabIndex,
                        onClick: textProperties.onClick,
                        onFocus: textProperties.onFocus,
                        onKeyUp: textProperties.onKeyUp,
                        onKeyDown: textProperties.onKeyDown,
                        onBlur: textProperties.onBlur,
                        testhooks: testhooks,
                        title: textProperties.title,
                        semanticTag: textProperties.semanticTag,
                    },
                    key: textProperties.key,
                    ref: null,
                    _owner: null,
                };
            case "PRESENCEINDICATOR":
                var presenceIndicatorProps = props;
                var parentControlId = buildUniqueCustomControlId(ownProps, presenceIndicatorProps.parentControlId, props.absoluteId);
                return (React.createElement(PresenceIndicator, { id: presenceIndicatorProps.id, key: presenceIndicatorProps.key, sipUrl: presenceIndicatorProps.sipUrl, displaySize: presenceIndicatorProps.displaySize, entityReference: presenceIndicatorProps.entityReference, style: presenceIndicatorProps.style, role: presenceIndicatorProps.role, tabIndex: presenceIndicatorProps.tabIndex, title: presenceIndicatorProps.title, parentControlId: parentControlId, accessibilityLabel: presenceIndicatorProps.accessibilityLabel, presenceTarget: presenceIndicatorProps.presenceTarget }));
            case "PLACEHOLDER":
                var placeHolderProps = props;
                if (placeHolderProps == null) {
                    break;
                }
                return (React.createElement(PlaceHolder, { id: placeHolderProps.id, icon: placeHolderProps.icon, iconStyle: placeHolderProps.iconStyle, text: placeHolderProps.text, textStyle: placeHolderProps.textStyle, containerStyle: placeHolderProps.containerStyle, accessibilityHidden: placeHolderProps.accessibilityHidden }));
            default:
                if (props.___ReactComponentType) {
                    props.id = id;
                    return React.createElement(props.___ReactComponentType, props, children);
                }
                return React.createElement(View, null, "\"UNKNOWN COMPONENT\"");
        }
    };
    VirtualComponentTranslator.generateReactComponent = function (component, parentKey, defaultKey, props, hostData, memHelper, flyoutParent, ancestralOnClick, children) {
        if (!component) {
            return null;
        }
        var element = null;
        var key = _getComponentKey(component, parentKey, defaultKey);
        var memoizedComponent = key ? memHelper.getVirtualComponentByKey(key) : null;
        if (memoizedComponent && memoizedComponent === component) {
            element = memHelper.getReactElementByKey(key);
            memHelper.retainElement(key);
        }
        else {
            var idIndex = memHelper.getDOMIdIndexByKey(key);
            if (!VirtualComponentTranslator.isComplexComponent(component)) {
                if (component.getType() === "IFRAME") {
                    memHelper.setIsCompositing(true);
                }
                element = VirtualComponentTranslator.generateJSXElement(component.getType(), component.getProperties(), children, props, hostData, memHelper.addCommandWrapper, ancestralOnClick);
            }
            else if (CCFUtilities.IsNullOrUndefined(component.getComponentId())) {
                element = React.createElement(View, null, "\"UNKNOWN COMPONENT\"");
            }
            else {
                element = VirtualComponentTranslator.generateComplexControl(component, props, hostData, flyoutParent, idIndex);
                memHelper.setIsCompositing(true);
            }
            if (key) {
                memHelper.addUpdatedEntry(key, element, component, idIndex);
            }
        }
        return element;
    };
    VirtualComponentTranslator.generateComplexControl = function (component, props, hostData, flyoutParent, idIndex) {
        var _a = this.generateComplexControlProps(component, props, hostData, flyoutParent, idIndex), controlId = _a.controlId, resultProps = _a.props, dataSetHostProps = _a.dataSetHostProps;
        return props.actions.renderNestedCustomControl(controlId, resultProps, dataSetHostProps);
    };
    VirtualComponentTranslator.generateComplexControlProps = function (component, props, hostData, flyoutParent, idIndex) {
        var _a, _b, _c;
        var componentId = component.getComponentId();
        var properties = component.getProperties();
        var parentProps = {
            toggleDimensionListener: hostData.trackResize,
        };
        var parentControlId = props.descriptor.Id;
        var isInQuickFormContext = ((_a = props.contextToken) === null || _a === void 0 ? void 0 : _a.contextTokenType) === 7;
        var controlId = isInQuickFormContext ? props.controlId + "." + componentId : parentControlId + "." + componentId;
        var childUnique = props.descriptor.UniqueId + "." + componentId;
        var childDomId = buildChildDomId(props);
        var controlStates = properties.controlstates;
        var showLabel = props.descriptor.ShowLabel;
        var label = props.descriptor.Label;
        var disabled = false;
        if (!CCFUtilities.IsNullOrUndefined(controlStates)) {
            parentProps.height = !controlStates.hasOwnProperty("height") ? hostData.allocatedHeight : controlStates.height;
            parentProps.width = !controlStates.hasOwnProperty("width") ? hostData.allocatedWidth : controlStates.width;
            parentProps.hasFocus = CCFUtilities.IsNullOrUndefined(controlStates.hasFocus) ? false : controlStates.hasFocus;
            parentProps.containerStyleOverrides = controlStates.containerStyleOverrides;
            disabled = CCFUtilities.IsNullOrUndefined(controlStates.isControlDisabled)
                ? false
                : controlStates.isControlDisabled;
            showLabel = CCFUtilities.IsNullOrUndefined(controlStates.showLabel) ? showLabel : controlStates.showLabel;
            label = CCFUtilities.IsNullOrUndefined(controlStates.label) ? label : controlStates.label;
        }
        else {
            parentProps.height = hostData.allocatedHeight;
            parentProps.width = hostData.allocatedWidth;
        }
        parentProps.decorators = properties.decorators;
        var eventListeners = [];
        var childeventlisteners = properties.childeventlisteners;
        if (!CCFUtilities.IsNullOrUndefined(childeventlisteners)) {
            var _loop_1 = function (listener) {
                var eventName = listener.eventname;
                var eventIndex = eventListeners.findIndex(function (x) { return x.eventname === eventName; });
                var handlers = listener.eventhandler;
                if (eventIndex !== -1) {
                    eventListeners[eventIndex].eventhandler.concat(handlers);
                }
                else {
                    var eventListener = {
                        eventname: eventName,
                        eventhandler: [handlers],
                    };
                    eventListeners.push(eventListener);
                }
            };
            for (var _i = 0, childeventlisteners_1 = childeventlisteners; _i < childeventlisteners_1.length; _i++) {
                var listener = childeventlisteners_1[_i];
                _loop_1(listener);
            }
            parentProps.eventListeners = eventListeners;
        }
        if (properties.contextOverrides) {
            parentProps.propertyBagOverrides = properties.contextOverrides;
        }
        var systemDefinedProperties = props.systemDefinedProperties;
        if (properties.systemDefinedPropertiesOverrides) {
            systemDefinedProperties = Object.assign({}, systemDefinedProperties, properties.systemDefinedPropertiesOverrides);
        }
        var params = {};
        if (!CCFUtilities.IsNullOrUndefined(properties.parameters)) {
            params = properties.parameters;
        }
        var descriptor = null;
        var nestedFormProps = null;
        var parentFieldSectionItem = null;
        if (props.configuration.CustomControlId === FIELD_SECTION_ITEM_ID) {
            parentFieldSectionItem = parentControlId;
        }
        else if (props.parentDefinedControlProps && props.parentDefinedControlProps.parentFieldSectionItem) {
            parentFieldSectionItem = props.parentDefinedControlProps.parentFieldSectionItem;
        }
        parentProps.parentFieldSectionItem = parentFieldSectionItem;
        parentProps.parentInSeeMoreMode = hostData.isInSeeMoreMode;
        var index = idIndex !== 0 ? idIndex : "";
        if (!properties.descriptor) {
            descriptor = {
                Id: controlId,
                Label: label,
                Name: "",
                DomId: "" + childDomId + (((_c = (_b = props.descriptor) === null || _b === void 0 ? void 0 : _b.ClassId) === null || _c === void 0 ? void 0 : _c.guid) ? props.descriptor.ClassId.guid : index),
                ShowLabel: showLabel,
                Visible: props.descriptor.Visible,
                ClassId: null,
                Disabled: disabled,
                UniqueId: childUnique,
                Parameters: props.descriptor && props.descriptor.Parameters,
            };
        }
        else {
            descriptor = properties.descriptor;
            !isInQuickFormContext && (controlId = componentId);
        }
        if (!descriptor.parentFieldSectionItem) {
            descriptor.parentFieldSectionItem = parentFieldSectionItem;
        }
        if (!properties.nestedFormProps) {
            nestedFormProps = props.formInfo;
        }
        else {
            nestedFormProps = properties.nestedFormProps;
        }
        var configuration;
        if (props.children && props.children.hasOwnProperty(componentId)) {
            configuration = props.children[componentId];
        }
        else if (!properties.configuration) {
            configuration = {
                FormFactor: 2,
                CustomControlId: component.getType().toString(),
                Name: props.manifest.CustomControlId + "." + controlId,
                Parameters: Object.assign({}, params),
                Version: "0.0",
                ShouldOverrideControlVisible: false,
                isDefaultConfig: true,
            };
        }
        else {
            configuration = properties.configuration;
        }
        _parseParameters(configuration.Parameters);
        var dataSetUIOptions = null;
        if (configuration.Parameters) {
            for (var parameterName in configuration.Parameters) {
                var parameter = configuration.Parameters[parameterName];
                switch (parameter.Type) {
                    case ManifestType.Grid: {
                        var dataSetParameter = parameter;
                        if (dataSetParameter.SortingInput) {
                            var sortingParameter = dataSetParameter.SortingInput;
                            if (sortingParameter.ControlLinked && sortingParameter.Value) {
                                sortingParameter.Value = parentControlId + "." + sortingParameter.Value;
                            }
                        }
                        if (dataSetParameter.FilteringInput) {
                            var filteringParameter = dataSetParameter.FilteringInput;
                            if (filteringParameter.ControlLinked && filteringParameter.Value) {
                                filteringParameter.Value = parentControlId + "." + filteringParameter.Value;
                            }
                        }
                        if (dataSetParameter.PagingInput) {
                            var pagingParameter = dataSetParameter.PagingInput;
                            if (pagingParameter.ControlLinked && pagingParameter.Value) {
                                pagingParameter.Value = parentControlId + "." + pagingParameter.Value;
                            }
                        }
                        if (dataSetParameter.DataSetUIOptions) {
                            dataSetUIOptions = dataSetParameter.DataSetUIOptions;
                        }
                        break;
                    }
                    default: {
                        var propertyParameter = parameter;
                        if (propertyParameter.Usage === 1 &&
                            propertyParameter.ControlLinked &&
                            !propertyParameter.AbsoluteLinkAddress &&
                            propertyParameter.Value) {
                            configuration.Parameters[parameterName] = Object.assign({}, propertyParameter, {
                                Value: parentControlId + "." + propertyParameter.Value,
                            });
                        }
                        break;
                    }
                }
            }
        }
        if (props.descriptor.HasContext) {
            parentProps.closestParentWithContext = parentControlId;
        }
        else if (props.parentDefinedControlProps && props.parentDefinedControlProps.closestParentWithContext) {
            parentProps.closestParentWithContext = props.parentDefinedControlProps.closestParentWithContext;
        }
        parentProps.parentFlyoutId = flyoutParent;
        return {
            controlId: controlId,
            props: {
                id: RootAppProxy.IsAvailable ? RootAppProxy.PCF.rootPageId : props.id,
                controlId: controlId,
                systemDefinedProperties: systemDefinedProperties,
                parentDefinedControlProps: parentProps,
                configuration: configuration,
                descriptor: descriptor,
                formInfo: nestedFormProps,
                rowSpan: props.rowSpan,
                themingData: properties.themingData,
                contextString: properties.contextString || _buildContextString(props, nestedFormProps),
                parentContextToken: props.contextToken,
                externalCommandManagerId: props.externalCommandManagerId,
                externalCommandPromise: props.externalCommandPromise,
            },
            dataSetHostProps: {
                dataSetUIOptions: dataSetUIOptions,
            },
        };
    };
    VirtualComponentTranslator.generateReactChildren = function (parentKey, virtualComponents, props, hostData, memHelper, flyoutKey, ancestralOnClick) {
        if (virtualComponents !== null) {
            if (Array.isArray(virtualComponents)) {
                var childNodes = [];
                for (var index = 0; index < virtualComponents.length; index++) {
                    childNodes.push(_generateReactChild(parentKey, KEYLESS_CHILD_ID + index, virtualComponents[index], props, hostData, memHelper, flyoutKey, ancestralOnClick));
                }
                return childNodes;
            }
            return _generateReactChild(parentKey, KEYLESS_CHILD_ID, virtualComponents, props, hostData, memHelper, flyoutKey, ancestralOnClick);
        }
    };
    VirtualComponentTranslator.isComplexComponent = function (virtualComponent) {
        if (!virtualComponent) {
            return false;
        }
        var type = virtualComponent.getType();
        var isReact = virtualComponent.getProperties().___ReactComponentType;
        if (type && (isReact || SupportedPrimitives.indexOf(type.toUpperCase()) !== -1)) {
            return false;
        }
        return true;
    };
    return VirtualComponentTranslator;
}());
function _generateFlyoutParentId(hostProps, component) {
    if (hostProps && hostProps.parentDefinedControlProps && hostProps.parentDefinedControlProps.parentFlyoutId) {
        return hostProps.parentDefinedControlProps.parentFlyoutId;
    }
    if (component.getType().toUpperCase() === "FLYOUT") {
        var props = component.getProperties();
        return Flyout.generateFlyoutId(hostProps.controlId, props.groupId);
    }
    return null;
}
function _getComponentKey(component, parentKey, defaultKey) {
    return ((parentKey ? parentKey + "|" : "") +
        (!VirtualComponentTranslator.isComplexComponent(component)
            ? component.getProperties().hasOwnProperty("key")
                ? component.getProperties().key
                : defaultKey
            : component.getComponentId() || defaultKey));
}
function _updateDataIdInTesthooks(ownProps, props) {
    if (!props || !props.id) {
        return {};
    }
    var idKey = "id";
    if (props.testhooks) {
        var testhookId = buildTesthookId(ownProps, props.testhooks[idKey] || props.id);
        var updatedTesthooks = Object.assign({}, props.testhooks);
        updatedTesthooks[idKey] = testhookId;
        return updatedTesthooks;
    }
    return { id: buildTesthookId(ownProps, props.id) };
}
function _parseParameters(params) {
    for (var key in params) {
        if (params[key].Usage ===
            3) {
            params[key].Attributes = Object.assign({}, BASE_ATTRIBUTES, params[key].Attributes);
            params[key].Security = Object.assign({}, { secured: false, editable: true, readable: true }, params[key].Security);
        }
    }
}
function _isVirtualComponent(obj) {
    return !!(obj && typeof obj === "object" && "getType" in obj);
}
function _generateReactChild(parentKey, defaultKey, virtualComponent, props, hostData, memHelper, flyoutKey, ancestralOnClick) {
    if (_isVirtualComponent(virtualComponent)) {
        var elemChildren = virtualComponent.getChildren();
        var component = virtualComponent;
        var newFlyoutKey = flyoutKey || _generateFlyoutParentId(props, component);
        return VirtualComponentTranslator.generateReactComponent(component, parentKey, defaultKey, props, hostData, memHelper, newFlyoutKey, ancestralOnClick, elemChildren !== null
            ? VirtualComponentTranslator.generateReactChildren(_getComponentKey(component, parentKey, defaultKey), elemChildren, props, hostData, memHelper, newFlyoutKey, ancestralOnClick || !!component.getProperties().onClick)
            : null);
    }
    return virtualComponent;
}
function _buildContextString(parentProps, currentFormInfo) {
    var isGrid = false;
    var isQuickForm = false;
    for (var parameter in parentProps.configuration.Parameters) {
        if (parentProps.configuration.Parameters[parameter].Type === ManifestType.QuickForm) {
            isQuickForm = true;
        }
        else if (parentProps.configuration.Parameters[parameter].Type === ManifestType.Grid) {
            isGrid = true;
        }
    }
    var contextChanged = !parentProps.formInfo !== !currentFormInfo;
    if (!contextChanged && parentProps.formInfo) {
        contextChanged =
            parentProps.formInfo.EntityName !== currentFormInfo.EntityName ||
                parentProps.formInfo.FormId !== currentFormInfo.FormId ||
                parentProps.formInfo.RecordId !== currentFormInfo.RecordId ||
                parentProps.formInfo.RibbonId !== currentFormInfo.RibbonId;
    }
    if (contextChanged) {
        if (isQuickForm) {
            currentFormInfo.ParentFormInfo = {
                EntityName: parentProps.propBagData.modeData.entityTypeName,
                RecordId: parentProps.propBagData.modeData.entityId,
                RecordName: parentProps.propBagData.modeData.entityRecordName,
                ParentFormInfo: parentProps.formInfo ? parentProps.formInfo.ParentFormInfo : null,
            };
            return ManifestType.QuickForm + ":" + parentProps.controlId;
        }
        else if (isGrid) {
            return ManifestType.Grid;
        }
    }
    return "default";
}
export { VirtualComponentTranslator };

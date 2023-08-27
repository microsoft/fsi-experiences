import { ManifestType } from "./ManifestType";
import { areGuidsSame } from "./GuidHelper";
import { instance as XrmProxy } from "./XrmProxy";
var FIELD_SECTION_ITEM_ID = "MscrmControls.Containers.FieldSectionItem";
var DUMMY_CONTROL_ITEM_ID = "MscrmControls.FieldControls.DummyControl";
var LABEL_CONTROL_ID = "MscrmControls.FieldControls.LabelControl";
var GRID_CONTROL_ID = "MscrmControls.Grid.GridControl";
var READ_ONLY_GRID_CONTROL_ID = "MscrmControls.Grid.ReadOnlyGrid";
var PCF_GRID_CONTROL_ID = "MscrmControls.Grid.PCFGridControl";
var ONE_GRID_CONTROL_ID = "Microsoft.PowerApps.PowerAppsOneGrid";
var SHAREPOINT_GRID_CONTROL_ID = "MscrmControls.SharepointAssociatedGrid.SharepointControl";
var RELEVANCE_SEARCH_CONTROL_ID = "MscrmControls.Containers.RelevanceSearchControl";
var SEARCH_WIDGET_CONTROL_ID = "MscrmControls.KbSearchControl.KbSearchControl";
var KB_ARTICLE_CONTROL_ID = "MscrmControls.KbArticleControl.KbArticleControl";
var KB_CONTENT_CONTROL_ID = "MscrmControls.KbContentControl.KbContentControl";
var EMAILENGAGEMENT_CONTROL_ID = "MscrmControls.EmailEngagement.EmailView";
var NEWEMAILEDITOR_CONTROL_ID = "MscrmControls.ActivityControls.ActivityEditorControl";
var CALENDAR_CONTROL_ID = "MscrmControls.Calendar.CalendarControl";
var TIMELINE_CONTROL_ID = "MscrmControls.Timeline.TimelineControl";
var ACTIONCARD_CONTROL_ID = "MscrmControls.ActionCard.ActionCardView";
var EMAILENGAGEMENT_ACTIONS_CONTROL_ID = "MscrmControls.EmailEngagement.EmailEngagementActionsControl";
var SOCIAL_INSIGHTS_CONTROL_ID = "MscrmControls.SocialInsightsControl.SocialInsightsControl";
var DASHBOARD_CONTROL_ID = "MscrmControls.Containers.DashboardControl";
var CHART_CONTROL_ID = "MscrmControls.Chart.ChartControl";
var BINGMAP_CONTROL_ID = "MscrmControls.Map.MapControl";
var BINGMAP_NAME = "mapcontrol";
var POWERBI_ID = "MscrmControls.PowerBI.PowerBIControl";
var BINGMAP_CLASS_ID = "62b0df79-0464-470f-8af7-4483cfea0c7d";
var GRID_CLASS_ID = "{E7A81278-8635-4D9E-8D4D-59480B391C5B}";
var SUBGRID_CLASS_ID = "{02d4264b-47e2-4b4c-aa95-f439f3f4d458}";
var LABEL_CLASS_ID = "{39354E4A-5015-4D74-8031-EA9EB73A1322}";
var SEARCH_WIDGET_CLASS_ID = "{e616a57f-20e0-4534-8662-a101b5ddf4e0}";
var KB_ARTICLE_CONTROL_CLASS_ID = "{03c5aed6-ee88-404e-b63c-4c53429c8bfb}";
var KB_CONTENT_CONTROL_CLASS_ID = "{1b9fc842-b45e-4fc1-b080-81e96b6d857f}";
var EMAILENGAGEMENT_CLASS_ID = "{26E9760F-7454-40DE-BB07-F6DCCCB82040}";
var REFERENCE_PANEL_SEARCH_WIDGET_CLASS_ID = "{7CCD1494-1F7A-4E3A-8BDE-F32069DAEB9F}";
var EMAILEDITOR_CLASS_ID = "{6F3FB987-393B-4d2d-859F-9D0F0349B6AD}";
var ISHEDITOR_CLASS_ID = "{F94DB24F-263D-44A7-B38E-A35E9854812B}";
var EMAILENGAGEMENT_ACTIONS_CLASS_ID = "{F454228D-1D25-4319-E12F-D27968BC0234}";
var SOCIAL_INSIGHTS_CLASS_ID = "{86b9e25e-695e-4fef-ac69-f05cfa96739c}";
var IFRAME_CLASS_ID = "{fd2a7985-3187-444e-908d-6624b21f69c0}";
var WEBRESOURCE_CLASS_ID = "{9fdf5f91-88b1-47f4-ad53-c11efc01a01d}";
var TWO_OPTION_PICKLIST = "3ef39988-22bb-4f0b-bbbe-64b5a3748aee";
var TWO_OPTION_RADIO = "67fac785-cd58-4f9f-abb3-4b7ddc6ed5ed";
var TWO_OPTION_CHECKBOX = "b0c6723a-8503-4fd7-bb28-c8a06ac933c2";
var TWO_OPTION_CLASS_ID_MAP = {
    "3ef39988-22bb-4f0b-bbbe-64b5a3748aee": "picklist",
    "67fac785-cd58-4f9f-abb3-4b7ddc6ed5ed": "radio",
    "b0c6723a-8503-4fd7-bb28-c8a06ac933c2": "checkbox",
};
var SUBGRID_ALL_STAKEHOLDERS_VIEWID = "{4E3600FA-B9C8-49F4-B69A-51EBA06D9BDF}";
var SUBGRID_ALL_SALESTEAMMEMBERS_VIEWID = "{FE4BC089-8901-466C-A41B-1C1090F204D4}";
var QUICK_FORM_ID = "MscrmControls.Containers.QuickForm";
var QUICK_FORM_CARD_ID = "MscrmControls.Containers.QuickFormCardControl";
var WEBRESOURCEHTML_ID = "MscrmControls.WebResource.WebResourceHtmlControl";
var TIMELINEWALL_ID = "MscrmControls.TimelineWallControl.TimelineWall";
var READ_ONLY_GRID_CONTROL_DISPLAY_NAME_KEY = "CC_ReadOnlyGrid_Name";
var VALUE_KEY = "value";
var RICHTEXT_FORMAT = "RichText";
var MODERN_CURRENCY_CONTROL_NAME = "PowerApps.CoreControls.CurrencyInput";
var MODERN_PHONENUMBER_CONTROL_NAME = "PowerApps.CoreControls.PhoneNumber";
var MODERN_TEXTBOX_CONTROL_NAME = "PowerApps.CoreControls.TextInput";
var PCF_DATASET_GRID = "FCB.PcfDatasetGrid";
var PCF_DATASET_GRID_SLOW_DEPLOYMENT = "PcfDatasetGridSlowDeployment";
var PCF_DATASET_GRID_MAIN_GRID_ONLY = "PcfDatasetGridMainGridOnly";
var PCF_DATASET_GRID_SHOW_JUMPBAR = "PcfDatasetGridShowJumpBar";
var PCF_GRID_JUMPBAR_DISPLAY_OPTION = "PcfGridsJumpBarDisplayOption";
var ONE_GRID_ENABLE_EDITING = "PowerAppsOneGridEnableEditing";
var ONE_GRID_ENABLE_PAGING = "PowerAppsOneGridEnablePaging";
var OCTOBER_2021_UPDATE = "FCB.October2021Update";
var APRIL_2022_UPDATE = "April2022Update";
var MODERN_INPUT_CONTROLS = "ModernInputControls";
var PAOneGridMainGridOnly = "PAOneGridMainGridOnly";
var PAOneGrid = "FCB.PAOneGrid";
var memoizedProcessControlDefaultConfigs = {};
var memoizedSocialInsightsControlConfigs = {};
var memoizedDummyControlDefaultConfigs = {};
var memoizedFieldSectionControlDefaultConfigs = {};
var memoizedQuickFormDefaultConfigs = {};
var memoizedCardDefaultConfigs = {};
var memorizedWebResourceDefaultConfigs = {};
var memoizedLabelControlDefaultConfigs = {};
var ControlMode;
(function (ControlMode) {
    ControlMode[ControlMode["Read"] = 0] = "Read";
    ControlMode[ControlMode["Edit"] = 1] = "Edit";
    ControlMode[ControlMode["Both"] = 2] = "Both";
})(ControlMode || (ControlMode = {}));
var DisplayMode;
(function (DisplayMode) {
    DisplayMode[DisplayMode["Normal"] = 0] = "Normal";
    DisplayMode[DisplayMode["Card"] = 1] = "Card";
})(DisplayMode || (DisplayMode = {}));
var LabelMode;
(function (LabelMode) {
    LabelMode[LabelMode["Text"] = 0] = "Text";
    LabelMode[LabelMode["Icon"] = 1] = "Icon";
})(LabelMode || (LabelMode = {}));
var ContainerControlType;
(function (ContainerControlType) {
    ContainerControlType[ContainerControlType["GridContainer"] = 0] = "GridContainer";
    ContainerControlType[ContainerControlType["DashboardContainer"] = 1] = "DashboardContainer";
    ContainerControlType[ContainerControlType["QuickCreateForm"] = 2] = "QuickCreateForm";
    ContainerControlType[ContainerControlType["FieldSectionContainer"] = 3] = "FieldSectionContainer";
    ContainerControlType[ContainerControlType["TimelineContainer"] = 4] = "TimelineContainer";
    ContainerControlType[ContainerControlType["ChartControl"] = 5] = "ChartControl";
    ContainerControlType[ContainerControlType["WebresourceControl"] = 6] = "WebresourceControl";
    ContainerControlType[ContainerControlType["DummyControl"] = 7] = "DummyControl";
    ContainerControlType[ContainerControlType["CalendarControl"] = 8] = "CalendarControl";
})(ContainerControlType || (ContainerControlType = {}));
var KNOWN_FALLBACK_CONTROLS = {
    "MscrmControls.MultiSelectPicklist.UpdMSPicklistControl": "MscrmControls.MultiSelectPicklist.MultiSelectPicklistControl",
};
var KNOWN_REPLACEMENT_CONTROLS = {
    "MscrmControls.Grid.ReadOnlyGrid": {
        newControlName: function () {
            var _a, _b;
            if ((_b = (_a = XrmProxy.Utils) === null || _a === void 0 ? void 0 : _a.isDisruptiveFeatureEnabled) === null || _b === void 0 ? void 0 : _b.call(_a, PAOneGrid)) {
                return ONE_GRID_CONTROL_ID;
            }
            return PCF_GRID_CONTROL_ID;
        },
        enabled: function (contextString, orgSettings) {
            var _a, _b;
            if ((_b = (_a = XrmProxy.Utils) === null || _a === void 0 ? void 0 : _a.isDisruptiveFeatureEnabled) === null || _b === void 0 ? void 0 : _b.call(_a, PAOneGrid)) {
                return isOneGridEnabled(contextString === "grid");
            }
            return isPcfDataGridEnabled(contextString === "grid", orgSettings === null || orgSettings === void 0 ? void 0 : orgSettings.pcfDatasetGridEnabled);
        },
    },
    "MscrmControls.Grid.PCFGridControl": {
        newControlName: function () {
            return ONE_GRID_CONTROL_ID;
        },
        enabled: function (contextString) { return isOneGridEnabled(contextString === "grid"); },
    },
    "MscrmControls.FieldControls.CurrencyControl": {
        newControlName: function () { return MODERN_CURRENCY_CONTROL_NAME; },
        enabled: function () { var _a; return (_a = XrmProxy.Utils) === null || _a === void 0 ? void 0 : _a.isFeatureEnabled(MODERN_INPUT_CONTROLS); },
    },
    "MscrmControls.FieldControls.TextBoxControl": {
        newControlName: function () { return MODERN_TEXTBOX_CONTROL_NAME; },
        enabled: function () { var _a; return (_a = XrmProxy.Utils) === null || _a === void 0 ? void 0 : _a.isFeatureEnabled(MODERN_INPUT_CONTROLS); },
    },
    "MscrmControls.FieldControls.PhoneNumberControl": {
        newControlName: function () { return MODERN_PHONENUMBER_CONTROL_NAME; },
        enabled: function () { var _a; return (_a = XrmProxy.Utils) === null || _a === void 0 ? void 0 : _a.isFeatureEnabled(MODERN_INPUT_CONTROLS); },
    },
};
var _manifestFallbacks = {};
var pcfDataGridEnabled;
var oneGridEnabled;
function updateManifestFallback(controlName, fallback) {
    _manifestFallbacks[controlName] = fallback;
}
function getManifestFallback(controlName) {
    return _manifestFallbacks.hasOwnProperty(controlName) ? _manifestFallbacks[controlName] : controlName;
}
function isPcfDataGridEnabled(isMainGrid, pcfDatasetGridOrgSetting) {
    var _a, _b, _c, _d, _e;
    if (((_a = XrmProxy.Utils) === null || _a === void 0 ? void 0 : _a.isFeatureEnabled(PCF_DATASET_GRID_MAIN_GRID_ONLY)) && !isMainGrid) {
        return false;
    }
    if (pcfDataGridEnabled === undefined) {
        var isMobileApp = XrmProxy.Client.getFormFactor() === 3 ||
            XrmProxy.Client.getFormFactor() === 2;
        var isInternetExplorer = window.navigator.userAgent.match("MSIE") || window.navigator.userAgent.match("Trident");
        if (isMobileApp || isInternetExplorer || pcfDatasetGridOrgSetting === "off") {
            pcfDataGridEnabled = false;
        }
        else if (pcfDatasetGridOrgSetting === "on" || ((_b = XrmProxy.Utils) === null || _b === void 0 ? void 0 : _b.isFeatureEnabled(APRIL_2022_UPDATE))) {
            pcfDataGridEnabled = true;
        }
        else if ((_c = XrmProxy.Utils) === null || _c === void 0 ? void 0 : _c.isFeatureEnabled(PCF_DATASET_GRID_SLOW_DEPLOYMENT)) {
            pcfDataGridEnabled = false;
        }
        else {
            pcfDataGridEnabled = (_e = (_d = XrmProxy.Utils) === null || _d === void 0 ? void 0 : _d.isDisruptiveFeatureEnabled) === null || _e === void 0 ? void 0 : _e.call(_d, PCF_DATASET_GRID, OCTOBER_2021_UPDATE);
        }
    }
    return pcfDataGridEnabled;
}
function isOneGridEnabled(isMainGrid) {
    var _a, _b, _c;
    if (((_a = XrmProxy.Utils) === null || _a === void 0 ? void 0 : _a.isFeatureEnabled(PAOneGridMainGridOnly)) && !isMainGrid) {
        return false;
    }
    if (oneGridEnabled === undefined) {
        oneGridEnabled =
            XrmProxy.Client.getFormFactor() !== 3 &&
                XrmProxy.Client.getFormFactor() !== 2 &&
                ((_c = (_b = XrmProxy.Utils) === null || _b === void 0 ? void 0 : _b.isDisruptiveFeatureEnabled) === null || _c === void 0 ? void 0 : _c.call(_b, PAOneGrid));
    }
    return oneGridEnabled;
}
function _getPrimaryParameter(config) {
    for (var propKey in config.Parameters) {
        var fieldParam = config.Parameters[propKey];
        if (fieldParam.Primary) {
            return fieldParam;
        }
    }
    return null;
}
function _getValueSpecificationParameterConfig(primaryParameter) {
    return {
        Usage: 1,
        Static: true,
        Type: ManifestType.SingleLineText,
        Value: JSON.stringify(primaryParameter),
        Primary: false,
    };
}
function _getFieldRenderParameterConfig(classId) {
    return {
        Usage: 1,
        Static: true,
        Type: ManifestType.SingleLineText,
        Value: TWO_OPTION_CLASS_ID_MAP[classId],
        Primary: false,
    };
}
function getControlMode(dataType) {
    return dataType === ManifestType.Timer ? ControlMode.Read : ControlMode.Both;
}
function getPropertyUsage(dataType) {
    return dataType === ManifestType.Timer
        ? 2
        : 1;
}
function getDataFieldNameForTimer(descriptor, TIMER_CONTROL_DATAFIELDNAME_KEY) {
    if (descriptor.Parameters != null) {
        if (descriptor.Parameters.hasOwnProperty(TIMER_CONTROL_DATAFIELDNAME_KEY) &&
            descriptor.Parameters[TIMER_CONTROL_DATAFIELDNAME_KEY] != null) {
            return descriptor.Parameters[TIMER_CONTROL_DATAFIELDNAME_KEY];
        }
    }
    return "";
}
function getFieldSectionItemSpecificationParameters(explicitConfig, classId) {
    if (explicitConfig.CustomControlId !== FIELD_SECTION_ITEM_ID) {
        return null;
    }
    var primaryParameter = _getPrimaryParameter(explicitConfig);
    if (isRequiredTwoOptionRenderMode(classId)) {
        return {
            valueSpecification: _getValueSpecificationParameterConfig(primaryParameter),
            twoOptionRenderParam: _getFieldRenderParameterConfig(classId),
        };
    }
    return {
        valueSpecification: _getValueSpecificationParameterConfig(primaryParameter),
    };
}
function isFieldSectionItemControl(controlId) {
    return controlId === FIELD_SECTION_ITEM_ID || controlId === WEBRESOURCEHTML_ID;
}
function isRequiredTwoOptionRenderMode(classId) {
    return ((classId && classId === TWO_OPTION_CHECKBOX) || classId === TWO_OPTION_RADIO || classId === TWO_OPTION_PICKLIST);
}
function wrapFieldLevelConfig(explicitConfig, manifest) {
    var primaryParameter = _getPrimaryParameter(explicitConfig);
    if (!primaryParameter) {
        return explicitConfig;
    }
    return {
        FormFactor: 2,
        CustomControlId: FIELD_SECTION_ITEM_ID,
        Name: "",
        Version: "1.0.0",
        Parameters: {
            value: primaryParameter,
            valueSpecification: _getValueSpecificationParameterConfig(primaryParameter),
            controlMode: {
                Usage: 1,
                Static: true,
                Type: "Enum",
                Value: ControlMode[manifest.ControlMode],
                Primary: false,
            },
            displayMode: {
                Usage: 1,
                Static: true,
                Type: "Enum",
                Value: DisplayMode.Normal,
                Primary: false,
            },
            labelMode: {
                Usage: 1,
                Static: true,
                Type: "Enum",
                Value: LabelMode.Text,
                Primary: false,
            },
        },
        ShouldOverrideControlVisible: explicitConfig.ShouldOverrideControlVisible,
        Children: {
            fieldControl: explicitConfig,
        },
    };
}
function constructTimerParameters(timerParameters) {
    var constructedTimerParameters = {};
    constructedTimerParameters.CancelConditionName = timerParameters.CancelConditionName;
    constructedTimerParameters.CancelConditionValue = timerParameters.CancelConditionValue;
    constructedTimerParameters.FailureConditionName = timerParameters.FailureConditionName;
    constructedTimerParameters.FailureConditionValue = timerParameters.FailureConditionValue;
    constructedTimerParameters.FailureTimeField = timerParameters.FailureTimeField;
    constructedTimerParameters.PauseConditionName = timerParameters.PauseConditionName;
    constructedTimerParameters.PauseConditionValue = timerParameters.PauseConditionValue;
    constructedTimerParameters.SuccessConditionName = timerParameters.SuccessConditionName;
    constructedTimerParameters.SuccessConditionValue = timerParameters.SuccessConditionValue;
    constructedTimerParameters.WarningConditionName = timerParameters.WarningConditionName;
    constructedTimerParameters.WarningConditionValue = timerParameters.WarningConditionValue;
    return constructedTimerParameters;
}
function extendDefaultValueParameterByControlDescriptor(defaultValueParameter, descriptor) {
    switch (defaultValueParameter.Type) {
        case ManifestType.Grid: {
            var gridDescriptor = descriptor;
            var parameters = gridDescriptor.Parameters;
            var gridParameter = defaultValueParameter;
            gridParameter.EnableViewPicker = parameters.EnableViewPicker === "true";
            gridParameter.RelationshipName = parameters.RelationshipName;
            gridParameter.TargetEntityType = parameters.TargetEntityType;
            gridParameter.ViewId = parameters.ViewId || parameters.DefaultViewId || parameters.defaultviewid;
            break;
        }
        case ManifestType.LookupSimple: {
            var lookupDescriptor = descriptor;
            var parameters = lookupDescriptor.Parameters;
            var lookupParameter = defaultValueParameter;
            lookupParameter.EnableViewPicker =
                (parameters.DisableViewPicker && parameters.DisableViewPicker !== "true") || !parameters.DisableViewPicker;
            lookupParameter.TargetEntityType = parameters.TargetEntityType;
            lookupParameter.ViewId = parameters.ViewId || parameters.DefaultViewId || parameters.defaultviewid;
            lookupParameter.AllowFilterOff = parameters.AllowFilterOff === "true";
            lookupParameter.AvailableViewIds = parameters.AvailableViewIds;
            lookupParameter.DependentAttributeName = parameters.DependentAttributeName;
            lookupParameter.DependentAttributeType = parameters.DependentAttributeType;
            lookupParameter.DisableQuickFind = parameters.DisableQuickFind === "true";
            lookupParameter.ExtraCondition = parameters.ExtraCondition;
            lookupParameter.FilterRelationshipName = parameters.FilterRelationshipName;
            lookupParameter.DisableMru = parameters.DisableMru;
            for (var i = 0; i < parameters.length; i++) {
                var parameter = parameters[i];
                if (parameter && parameter.TargetEntities && parameter.TargetEntities.length) {
                    if (parameter.TargetEntities.length > 1) {
                        lookupParameter.Type = ManifestType.LookupMultiEntity;
                    }
                    var targetEntity = parameter.TargetEntities[0];
                    if (!lookupParameter.ViewId && targetEntity.DefaultViewId) {
                        lookupParameter.ViewId = targetEntity.DefaultViewId;
                    }
                    if (!lookupParameter.TargetEntityType && targetEntity.EntityLogicalName) {
                        lookupParameter.TargetEntityType = targetEntity.EntityLogicalName;
                    }
                }
            }
        }
        case ManifestType.LookupCustomer:
        case ManifestType.LookupOwner:
        case ManifestType.LookupPartyList:
        case ManifestType.LookupRegarding:
        case ManifestType.LookupMultiEntity: {
            var lookupDescriptor = descriptor;
            var parameters = lookupDescriptor.Parameters;
            var lookupParameter = defaultValueParameter;
            lookupParameter.UseMainFormDialogForCreate = parameters.useMainFormDialogForCreate === "true";
            lookupParameter.UseMainFormDialogForEdit = parameters.useMainFormDialogForEdit === "true";
            break;
        }
        case ManifestType.SingleLineText: {
            if (areGuidsSame(LABEL_CLASS_ID, descriptor.ClassId.guid)) {
                var fieldParameter = defaultValueParameter;
                fieldParameter.Value = descriptor.Label;
            }
            break;
        }
        case ManifestType.Timer: {
            var timerDescriptor = descriptor;
            var timerParameters = timerDescriptor.Parameters;
            var timerValueParameter = defaultValueParameter;
            timerValueParameter.TimerParameters = constructTimerParameters(timerParameters);
            break;
        }
    }
    return defaultValueParameter;
}
function retrieveLookupManifestName(dataType, attributes) {
    if (dataType === "Lookup.Simple" &&
        attributes &&
        attributes.Targets &&
        attributes.Targets.length === 1 &&
        attributes.Targets[0] === "subject") {
        return "MscrmControls.FieldControls.SubjectTreeControl";
    }
    return "MscrmControls.FieldControls.SimpleLookupControl";
}
function retrieveInputControlManifestName(dataType, attributes) {
    var _a, _b;
    var modernInputControlsEnabled = (_b = (_a = XrmProxy === null || XrmProxy === void 0 ? void 0 : XrmProxy.Utils) === null || _a === void 0 ? void 0 : _a.isFeatureEnabled) === null || _b === void 0 ? void 0 : _b.call(_a, MODERN_INPUT_CONTROLS);
    switch (dataType) {
        case "TwoOptions":
            return "MscrmControls.FieldControls.CheckboxControl";
        case "Currency":
            return modernInputControlsEnabled ? MODERN_CURRENCY_CONTROL_NAME : "MscrmControls.FieldControls.CurrencyControl";
        case "Decimal":
            return "MscrmControls.FieldControls.DecimalNumberControl";
        case "SingleLine.Email":
            return "MscrmControls.FieldControls.EmailAddressControl";
        case "FP":
            return "MscrmControls.FieldControls.FloatingPointNumberInput";
        case "SingleLine.Phone":
            return modernInputControlsEnabled
                ? MODERN_PHONENUMBER_CONTROL_NAME
                : "MscrmControls.FieldControls.PhoneNumberControl";
        case "SingleLine.Text":
        case "Multiple":
            if ((attributes === null || attributes === void 0 ? void 0 : attributes.FormatName) === RICHTEXT_FORMAT) {
                return "MscrmControls.RichTextEditor.RichTextEditorControl";
            }
            return modernInputControlsEnabled ? MODERN_TEXTBOX_CONTROL_NAME : "MscrmControls.FieldControls.TextBoxControl";
        case "SingleLine.Ticker":
            return "MscrmControls.FieldControls.TickerSymbolControl";
        case "SingleLine.URL":
            return "MscrmControls.FieldControls.UrlControl";
        case "Whole.None":
            return "MscrmControls.FieldControls.WholeNumberControl";
    }
}
function isNullOrUndefined(util) {
    if (util === null || util === undefined) {
        return true;
    }
    return false;
}
function retrieveDefaultConfigurationForFieldControl(name, dataFieldName, type, entityTypeName, classId, descriptor, auxInfo) {
    var fullName = (entityTypeName ? entityTypeName.toLowerCase() + "-" : "") + name;
    if (!dataFieldName) {
        if (name === BINGMAP_NAME && areGuidsSame(BINGMAP_CLASS_ID, classId)) {
            var addressField = "AddressField";
            var nameAddress = name + "-" + descriptor.Parameters[addressField];
            if (!memoizedFieldSectionControlDefaultConfigs[nameAddress]) {
                memoizedFieldSectionControlDefaultConfigs[nameAddress] = {
                    FormFactor: 2,
                    CustomControlId: FIELD_SECTION_ITEM_ID,
                    Name: name,
                    Version: "1.0.0",
                    Parameters: {
                        value: {
                            Usage: 0,
                            Static: false,
                            Type: ManifestType.SingleLineAddress,
                            Value: descriptor.Parameters[addressField],
                            Primary: true,
                        },
                        controlMode: {
                            Usage: 2,
                            Static: true,
                            Type: "Enum",
                            Value: ControlMode.Read,
                            Primary: false,
                        },
                    },
                    ShouldOverrideControlVisible: false,
                };
            }
            return memoizedFieldSectionControlDefaultConfigs[nameAddress];
        }
        if (type === RELEVANCE_SEARCH_CONTROL_ID) {
            if (!memoizedProcessControlDefaultConfigs[name]) {
                memoizedProcessControlDefaultConfigs[name] = {
                    FormFactor: 2,
                    CustomControlId: RELEVANCE_SEARCH_CONTROL_ID,
                    Name: name,
                    Version: "1.0.0",
                    Parameters: {
                        value: {
                            Type: ManifestType.Search,
                            Primary: true,
                        },
                    },
                    ShouldOverrideControlVisible: false,
                };
            }
            return memoizedProcessControlDefaultConfigs[name];
        }
        if (classId &&
            (areGuidsSame(SEARCH_WIDGET_CLASS_ID, classId) || areGuidsSame(REFERENCE_PANEL_SEARCH_WIDGET_CLASS_ID, classId))) {
            if (!memoizedProcessControlDefaultConfigs[fullName]) {
                var autoSuggestionFieldValue = descriptor &&
                    descriptor.Parameters &&
                    descriptor.Parameters.EnableAutoSuggestions === "true" &&
                    descriptor.Parameters.AutoSuggestionSource === "0"
                    ? descriptor.Parameters.SearchForAutoSuggestionsUsing
                    : undefined;
                memoizedProcessControlDefaultConfigs[fullName] = {
                    FormFactor: 2,
                    CustomControlId: SEARCH_WIDGET_CONTROL_ID,
                    Name: name,
                    Version: "1.0.0",
                    Parameters: {
                        value: {
                            Type: ManifestType.SearchWidget,
                            Primary: true,
                        },
                        AutoSuggestionField: {
                            Type: "all",
                            Primary: false,
                            Static: false,
                            Usage: 0,
                            Value: autoSuggestionFieldValue,
                        },
                    },
                    ShouldOverrideControlVisible: false,
                };
            }
            return memoizedProcessControlDefaultConfigs[fullName];
        }
        if (classId && areGuidsSame(classId, KB_ARTICLE_CONTROL_CLASS_ID)) {
            memoizedProcessControlDefaultConfigs[name] = {
                FormFactor: 2,
                CustomControlId: KB_ARTICLE_CONTROL_ID,
                Name: name,
                Version: "1.0.0",
                Parameters: {
                    value: {
                        Type: ManifestType.KbArticle,
                        Primary: true,
                    },
                },
                ShouldOverrideControlVisible: false,
            };
        }
        if (classId && areGuidsSame(classId, KB_CONTENT_CONTROL_CLASS_ID)) {
            memoizedProcessControlDefaultConfigs[name] = {
                FormFactor: 2,
                CustomControlId: KB_CONTENT_CONTROL_ID,
                Name: name,
                Version: "1.0.0",
                Parameters: {
                    value: {
                        Type: ManifestType.KbContent,
                        Primary: true,
                    },
                },
                ShouldOverrideControlVisible: false,
            };
        }
        if (classId && areGuidsSame(EMAILENGAGEMENT_CLASS_ID, classId)) {
            if (!memoizedProcessControlDefaultConfigs[name]) {
                memoizedProcessControlDefaultConfigs[name] = {
                    FormFactor: 2,
                    CustomControlId: EMAILENGAGEMENT_CONTROL_ID,
                    Name: name,
                    Version: "1.0.0",
                    Parameters: {
                        value: {
                            Type: ManifestType.EmailEngagementRecipientActivity,
                            Primary: true,
                        },
                    },
                    ShouldOverrideControlVisible: false,
                };
            }
            return memoizedProcessControlDefaultConfigs[name];
        }
        if (!isNullOrUndefined(XrmProxy) &&
            !isNullOrUndefined(XrmProxy.Utils) &&
            !isNullOrUndefined(XrmProxy.Utils.isFeatureEnabled) &&
            XrmProxy.Utils.isFeatureEnabled("EmailEngagementComposeForUCI")) {
            if (classId && areGuidsSame(EMAILENGAGEMENT_ACTIONS_CLASS_ID, classId)) {
                if (!memoizedProcessControlDefaultConfigs[name]) {
                    memoizedProcessControlDefaultConfigs[name] = {
                        FormFactor: 2,
                        CustomControlId: EMAILENGAGEMENT_ACTIONS_CONTROL_ID,
                        Name: name,
                        Version: "1.0.0",
                        Parameters: {
                            value: {
                                Type: ManifestType.EmailEngagementActions,
                                Primary: true,
                            },
                            toparams: {
                                Usage: 0,
                                Static: false,
                                Type: ManifestType.LookupPartyList,
                                Value: "to",
                                Primary: false,
                            },
                            ccparams: {
                                Usage: 0,
                                Static: false,
                                Type: ManifestType.LookupPartyList,
                                Value: "cc",
                                Primary: false,
                            },
                            directioncode: {
                                Usage: 0,
                                Static: false,
                                Type: ManifestType.TwoOptions,
                                Value: "directioncode",
                                Primary: false,
                            },
                            isemailfollowed: {
                                Usage: 0,
                                Static: false,
                                Type: ManifestType.TwoOptions,
                                Value: "isemailfollowed",
                                Primary: false,
                            },
                            followemailuserpreference: {
                                Usage: 0,
                                Static: false,
                                Type: ManifestType.TwoOptions,
                                Value: "followemailuserpreference",
                                Primary: false,
                            },
                            emailreminderstatus: {
                                Usage: 0,
                                Static: false,
                                Type: ManifestType.OptionSet,
                                Value: "emailreminderstatus",
                                Primary: false,
                            },
                            emailremindertype: {
                                Usage: 0,
                                Static: false,
                                Type: ManifestType.OptionSet,
                                Value: "emailremindertype",
                                Primary: false,
                            },
                            emailremindertext: {
                                Usage: 0,
                                Static: false,
                                Type: ManifestType.SingleLineText,
                                Value: "emailremindertext",
                                Primary: false,
                            },
                            emailreminderexpirytime: {
                                Usage: 0,
                                Static: false,
                                Type: ManifestType.DateAndTimeDateAndTime,
                                Value: "emailreminderexpirytime",
                                Primary: false,
                            },
                            delayedemailsendtime: {
                                Usage: 0,
                                Static: false,
                                Type: ManifestType.DateAndTimeDateAndTime,
                                Value: "delayedemailsendtime",
                                Primary: false,
                            },
                            statuscode: {
                                Usage: 0,
                                Static: false,
                                Type: ManifestType.OptionSet,
                                Value: "statuscode",
                                Primary: false,
                            },
                        },
                        ShouldOverrideControlVisible: false,
                    };
                }
                return memoizedProcessControlDefaultConfigs[name];
            }
        }
        if (type === ManifestType.WebResourceHtmlControl) {
            if (!memorizedWebResourceDefaultConfigs[name]) {
                memorizedWebResourceDefaultConfigs[name] = {
                    FormFactor: 2,
                    CustomControlId: WEBRESOURCEHTML_ID,
                    Name: name,
                    Version: "1.0.0",
                    Parameters: {
                        value: {
                            Usage: 0,
                            Type: ManifestType.WebResourceHtmlControl,
                            Value: null,
                            Static: false,
                            Primary: true,
                        },
                    },
                    ShouldOverrideControlVisible: false,
                };
            }
            return memorizedWebResourceDefaultConfigs[name];
        }
        if (type === ManifestType.TimelineWall) {
            return {
                FormFactor: 2,
                CustomControlId: TIMELINEWALL_ID,
                Name: name,
                Version: "1.0.0",
                Parameters: {
                    value: {
                        Type: ManifestType.TimelineWall,
                        Primary: true,
                    },
                },
                ShouldOverrideControlVisible: false,
            };
        }
        if (classId && areGuidsSame(SOCIAL_INSIGHTS_CLASS_ID, classId)) {
            if (!memoizedSocialInsightsControlConfigs[name]) {
                memoizedSocialInsightsControlConfigs[name] = {
                    FormFactor: 2,
                    CustomControlId: SOCIAL_INSIGHTS_CONTROL_ID,
                    Name: name,
                    Version: "1.0.0",
                    Parameters: {
                        value: {
                            Type: ManifestType.SocialInsightsControl,
                            Primary: true,
                        },
                    },
                    ShouldOverrideControlVisible: false,
                };
            }
            return memoizedSocialInsightsControlConfigs[name];
        }
        if (!memoizedDummyControlDefaultConfigs[name]) {
            memoizedDummyControlDefaultConfigs[name] = {
                FormFactor: 2,
                CustomControlId: DUMMY_CONTROL_ITEM_ID,
                Name: name,
                Version: "1.0.0",
                Parameters: {
                    value: {
                        Usage: 1,
                        Static: true,
                        Type: classId || type,
                        Value: null,
                        Primary: true,
                    },
                    controlMode: {
                        Usage: 1,
                        Static: true,
                        Type: "Enum",
                        Value: ControlMode.Both,
                        Primary: false,
                    },
                },
                ShouldOverrideControlVisible: false,
            };
        }
        return memoizedDummyControlDefaultConfigs[name];
    }
    if (classId && (areGuidsSame(EMAILEDITOR_CLASS_ID, classId) || areGuidsSame(ISHEDITOR_CLASS_ID, classId))) {
        if (type.indexOf("memo") !== -1 ||
            type === ManifestType.SingleLineText ||
            type === ManifestType.SingleLineTextArea ||
            type === ManifestType.Multiple) {
            if (!memoizedProcessControlDefaultConfigs[name]) {
                memoizedProcessControlDefaultConfigs[name] = {
                    FormFactor: 2,
                    CustomControlId: NEWEMAILEDITOR_CONTROL_ID,
                    Name: name,
                    Version: "1.0.0",
                    Parameters: {
                        value: {
                            Usage: 0,
                            Static: false,
                            Type: type,
                            Value: dataFieldName,
                            Primary: true,
                        },
                        isUnsafe: {
                            Usage: 1,
                            Static: false,
                            Type: ManifestType.WholeNone,
                            Value: "isunsafe",
                            Primary: false,
                        },
                    },
                    ShouldOverrideControlVisible: false,
                };
            }
        }
        return memoizedProcessControlDefaultConfigs[name];
    }
    if (classId && areGuidsSame(LABEL_CLASS_ID, classId)) {
        if (!memoizedLabelControlDefaultConfigs[name]) {
            memoizedLabelControlDefaultConfigs[name] = {
                FormFactor: 2,
                CustomControlId: LABEL_CONTROL_ID,
                Name: name,
                Version: "1.0.0",
                Parameters: {
                    value: {
                        Type: ManifestType.SingleLineText,
                        Static: true,
                        Primary: true,
                    },
                },
                ShouldOverrideControlVisible: false,
            };
        }
        return memoizedLabelControlDefaultConfigs[name];
    }
    if (type === ManifestType.QuickForm) {
        var value = createQuickViewFormParameterValue(descriptor, auxInfo);
        if (!memoizedQuickFormDefaultConfigs[name] ||
            memoizedQuickFormDefaultConfigs[name].Parameters[VALUE_KEY].Value !== value) {
            memoizedQuickFormDefaultConfigs[name] = {
                FormFactor: 2,
                CustomControlId: QUICK_FORM_ID,
                Name: name,
                Version: "1.0.0",
                Parameters: {
                    value: {
                        Usage: 0,
                        Type: ManifestType.QuickForm,
                        Value: value,
                        Static: false,
                        Primary: true,
                        FirstDataRequestType: auxInfo && auxInfo.chartDataRequestType
                            ? auxInfo.chartDataRequestType
                            : 1,
                    },
                },
                ShouldOverrideControlVisible: false,
            };
        }
        return memoizedQuickFormDefaultConfigs[name];
    }
    if (type === ManifestType.Card) {
        var value = createQuickViewFormParameterValue(descriptor, auxInfo);
        if (!memoizedCardDefaultConfigs[name] ||
            memoizedCardDefaultConfigs[name].Parameters[VALUE_KEY].Value !== value) {
            memoizedCardDefaultConfigs[name] = {
                FormFactor: 2,
                CustomControlId: QUICK_FORM_CARD_ID,
                Name: name,
                Version: "1.0.0",
                Parameters: {
                    value: {
                        Usage: 0,
                        Type: ManifestType.QuickForm,
                        Value: value,
                        Static: false,
                        Primary: true,
                    },
                },
                ShouldOverrideControlVisible: false,
            };
        }
        return memoizedCardDefaultConfigs[name];
    }
    var dataType = retrieveDataTypeBySourceTypeForControl(type, classId);
    var controlMode = getControlMode(dataType);
    var propertyUsage = getPropertyUsage(dataType);
    if (!memoizedFieldSectionControlDefaultConfigs[fullName]) {
        memoizedFieldSectionControlDefaultConfigs[fullName] = {
            FormFactor: 2,
            CustomControlId: FIELD_SECTION_ITEM_ID,
            Name: name,
            Version: "1.0.0",
            Parameters: {
                value: {
                    Usage: 0,
                    Static: false,
                    Type: dataType,
                    Value: dataFieldName,
                    Primary: true,
                },
                controlMode: {
                    Usage: propertyUsage,
                    Static: true,
                    Type: "Enum",
                    Value: controlMode,
                    Primary: false,
                },
                displayMode: {
                    Usage: propertyUsage,
                    Static: true,
                    Type: "Enum",
                    Value: DisplayMode.Normal,
                    Primary: false,
                },
                labelMode: {
                    Usage: propertyUsage,
                    Static: true,
                    Type: "Enum",
                    Value: LabelMode.Text,
                    Primary: false,
                },
            },
            ShouldOverrideControlVisible: false,
        };
    }
    return memoizedFieldSectionControlDefaultConfigs[fullName];
}
function retrieveDefaultConfigurationForSubgridControl(controlId, parameters, isAssociatedGrid, pcfDatasetGridOrgSetting) {
    if (isAssociatedGrid === void 0) { isAssociatedGrid = false; }
    return {
        FormFactor: 1,
        DisplayNameKey: READ_ONLY_GRID_CONTROL_DISPLAY_NAME_KEY,
        CustomControlId: getSubGridCustomControlId(parameters.TargetEntityType, pcfDatasetGridOrgSetting),
        Name: controlId,
        Version: "1.0.0",
        Parameters: getSubGridCustomControlParameters(parameters, isAssociatedGrid, pcfDatasetGridOrgSetting),
        ShouldOverrideControlVisible: false,
        isDefaultConfig: true,
    };
}
function retrieveDefaultConfigurationForHomePageGridControl(controlId, entityName, viewId, pcfDatasetGridOrgSetting) {
    return {
        FormFactor: 1,
        CustomControlId: getCustomControlIdForTheGrid(true, pcfDatasetGridOrgSetting),
        Name: controlId,
        DisplayNameKey: READ_ONLY_GRID_CONTROL_DISPLAY_NAME_KEY,
        Version: "1.0.0",
        Parameters: getHomePageCustomControlParameters(entityName, viewId, pcfDatasetGridOrgSetting),
        ShouldOverrideControlVisible: false,
        isDefaultConfig: true,
    };
}
function retrieveDefaultConfigurationForHomePageGridControlForChart(controlId, entityName, viewId, pcfDatasetGridOrgSetting) {
    return {
        FormFactor: 1,
        CustomControlId: getCustomControlIdForTheGrid(true, pcfDatasetGridOrgSetting),
        DisplayNameKey: READ_ONLY_GRID_CONTROL_DISPLAY_NAME_KEY,
        Name: controlId,
        Version: "1.0.0",
        Parameters: getHomePageCustomControlParametersForChart(entityName, viewId, pcfDatasetGridOrgSetting),
        ShouldOverrideControlVisible: false,
        isDefaultConfig: true,
    };
}
function getCustomControlIdForTheGrid(isMainGrid, pcfDatasetGridOrgSetting) {
    if (isOneGridEnabled(isMainGrid)) {
        return ONE_GRID_CONTROL_ID;
    }
    if (isPcfDataGridEnabled(isMainGrid, pcfDatasetGridOrgSetting)) {
        return PCF_GRID_CONTROL_ID;
    }
    return READ_ONLY_GRID_CONTROL_ID;
}
function forceReadOnlyGridAsDefaultConfiguration() {
    if (!isNullOrUndefined(XrmProxy) &&
        !isNullOrUndefined(XrmProxy.Utils) &&
        !isNullOrUndefined(XrmProxy.Utils.isFeatureEnabled) &&
        XrmProxy.Utils.isFeatureEnabled("DisableEditableGridControlOnPhone") &&
        !isNullOrUndefined(XrmProxy.Client.getFormFactor) &&
        XrmProxy.Client.getFormFactor() === 3) {
        return true;
    }
    return false;
}
function getSubGridCustomControlParameters(parameters, isAssociatedGrid, pcfDatasetGridOrgSetting) {
    if (parameters.TargetEntityType === "sharepointdocument") {
        return {
            Grid: {
                Type: ManifestType.Grid,
                ViewId: parameters.DefaultViewId || parameters.ViewId,
                TargetEntityType: parameters.TargetEntityType,
                EnableViewPicker: parameters.EnableViewPicker === "true",
                RelationshipName: parameters.RelationshipName,
                Columns: [],
                Primary: true,
                DataSetUIOptions: {
                    displayQuickFind: false,
                    displayIndex: false,
                    displayCommandBar: true,
                    displayViewSelector: true,
                },
            },
            EnableEditing: {
                Usage: 1,
                Static: true,
                Type: "Enum",
                Value: "No",
                Primary: false,
            },
            EnableGroupBy: {
                Usage: 1,
                Static: true,
                Type: "Enum",
                Value: "No",
                Primary: false,
            },
            EnableFiltering: {
                Usage: 1,
                Static: true,
                Type: "Enum",
                Value: "No",
                Primary: false,
            },
        };
    }
    else if (parameters.TargetEntityType === "connection" &&
        parameters.ViewId &&
        (parameters.ViewId.toUpperCase() === SUBGRID_ALL_SALESTEAMMEMBERS_VIEWID ||
            parameters.ViewId.toUpperCase() === SUBGRID_ALL_STAKEHOLDERS_VIEWID) &&
        !forceReadOnlyGridAsDefaultConfiguration()) {
        return {
            Grid: {
                Type: ManifestType.Grid,
                ViewId: parameters.DefaultViewId || parameters.ViewId,
                TargetEntityType: parameters.TargetEntityType,
                EnableViewPicker: parameters.EnableViewPicker === "true",
                RelationshipName: parameters.RelationshipName,
                Columns: [],
                Primary: true,
            },
            EnableEditing: {
                Usage: 1,
                Static: true,
                Type: "Enum",
                Value: "Yes",
                Primary: false,
            },
            EnableGroupBy: {
                Usage: 1,
                Static: true,
                Type: "Enum",
                Value: "No",
                Primary: false,
            },
            EnableFiltering: {
                Usage: 1,
                Static: true,
                Type: "Enum",
                Value: "Yes",
                Primary: false,
            },
        };
    }
    if (parameters.TargetEntityType === "connection" || !isPcfDataGridEnabled(false, pcfDatasetGridOrgSetting)) {
        var params_1 = {
            Grid: {
                Type: ManifestType.Grid,
                ViewId: parameters.DefaultViewId || parameters.ViewId,
                TargetEntityType: parameters.TargetEntityType,
                EnableViewPicker: parameters.EnableViewPicker === "true",
                RelationshipName: parameters.RelationshipName,
                Columns: [],
                Primary: true,
            },
            EnableEditing: {
                Usage: 1,
                Static: true,
                Type: "Enum",
                Value: "No",
                Primary: false,
            },
            EnableGroupBy: {
                Usage: 1,
                Static: true,
                Type: "Enum",
                Value: "No",
                Primary: false,
            },
            EnableFiltering: {
                Usage: 1,
                Static: true,
                Type: "Enum",
                Value: "Yes",
                Primary: false,
            },
        };
        if (isAssociatedGrid) {
            params_1.EnableFiltering.Value = "Yes";
        }
        return params_1;
    }
    var params = createDefaultPcfGridPrimitiveProperties(false);
    params.Items = {
        Type: ManifestType.Grid,
        ViewId: parameters.DefaultViewId || parameters.ViewId,
        TargetEntityType: parameters.TargetEntityType,
        EnableViewPicker: parameters.EnableViewPicker === "true",
        RelationshipName: parameters.RelationshipName,
        Columns: [],
        Primary: true,
    };
    return params;
}
function getHomePageCustomControlParameters(entityName, viewId, pcfDatasetGridOrgSetting) {
    if (!isPcfDataGridEnabled(true, pcfDatasetGridOrgSetting)) {
        return {
            Grid: {
                Type: ManifestType.Grid,
                EntityName: entityName,
                ViewId: viewId,
            },
            EnableEditing: {
                Usage: 1,
                Static: true,
                Type: "Enum",
                Value: "No",
                Primary: false,
            },
            EnableGroupBy: {
                Usage: 1,
                Static: true,
                Type: "Enum",
                Value: "No",
                Primary: false,
            },
            EnableFiltering: {
                Usage: 1,
                Static: true,
                Type: "Enum",
                Value: "Yes",
                Primary: false,
            },
        };
    }
    var params = createDefaultPcfGridPrimitiveProperties(true);
    params.Items = {
        Type: ManifestType.Grid,
        EntityName: entityName,
        ViewId: viewId,
    };
    return params;
}
function getHomePageCustomControlParametersForChart(entityName, viewId, pcfDatasetGridOrgSetting) {
    if (isPcfDataGridEnabled(true, pcfDatasetGridOrgSetting)) {
        var params = createDefaultPcfGridPrimitiveProperties(true);
        params.Items = {
            Type: ManifestType.Grid,
            EntityName: entityName,
            ViewId: viewId,
        };
        return params;
    }
    return {
        Grid: {
            Type: ManifestType.Grid,
            EntityName: entityName,
            ViewId: viewId,
        },
        EnableEditing: {
            Usage: 1,
            Static: true,
            Type: "Enum",
            Value: "No",
            Primary: false,
        },
        EnableGroupBy: {
            Usage: 1,
            Static: true,
            Type: "Enum",
            Value: "No",
            Primary: false,
        },
        EnableFiltering: {
            Usage: 1,
            Static: true,
            Type: "Enum",
            Value: "Yes",
            Primary: false,
        },
    };
}
function getSubGridCustomControlId(entityName, pcfDatasetGridOrgSetting) {
    if (entityName === "sharepointdocument") {
        return SHAREPOINT_GRID_CONTROL_ID;
    }
    else if (entityName === "connection") {
        return GRID_CONTROL_ID;
    }
    return getCustomControlIdForTheGrid(false, pcfDatasetGridOrgSetting);
}
function retrieveDefaultConfigurationForHomePageChartControl(name, entityName, viewId, visualizationId, refreshCounter, filterExpression, isUserChart, chartDrillDownParameters, isUserView, extraFilters, linkEntities, renderStandaloneExpandButton, renderStandaloneCloseButton, isChartOnTheRightSide, isEmbeddedInTeams) {
    if (renderStandaloneExpandButton === void 0) { renderStandaloneExpandButton = true; }
    if (renderStandaloneCloseButton === void 0) { renderStandaloneCloseButton = false; }
    if (isChartOnTheRightSide === void 0) { isChartOnTheRightSide = false; }
    if (isEmbeddedInTeams === void 0) { isEmbeddedInTeams = false; }
    var filterExpressionString = filterExpression || null;
    var isUserChartString = isUserChart ? "true" : "false";
    var isUserViewString = isUserView ? "true" : "false";
    return {
        FormFactor: 1,
        CustomControlId: name,
        Name: name,
        Version: "1.0.0",
        Parameters: {
            ChartDataSet: {
                Type: ManifestType.Grid,
                EntityName: entityName,
                ViewId: viewId,
                VisualizationId: visualizationId,
                ChartGridMode: "Chart",
                HighchartFilterExpression: filterExpressionString,
                ExtraFilters: extraFilters,
                IsUserChart: isUserChartString,
                ChartDrillDownParameters: chartDrillDownParameters,
                FirstDataRequestType: 2,
                IsUserView: isUserViewString,
                RefreshInput: {
                    Value: refreshCounter,
                    Static: true,
                },
                LinkingInput: {
                    Value: linkEntities,
                    Static: true,
                },
            },
            Parent: {
                Type: "SingleLine.Text",
                Primary: false,
                Static: true,
                Usage: 1,
                Value: "DataSetHost",
            },
            ChartSelectorMode: {
                Type: "Enum",
                Primary: false,
                Static: true,
                Usage: 1,
                Value: "ChartSelector",
            },
            CommandMode: {
                Type: "Enum",
                Primary: false,
                Static: true,
                Usage: 1,
                Value: "GridChartCommand",
            },
            EnableExpandButton: {
                Type: "Enum",
                Primary: false,
                Static: true,
                Usage: 1,
                Value: renderStandaloneExpandButton ? "Yes" : "No",
            },
            EnableCloseButton: {
                Type: "Enum",
                Primary: false,
                Static: true,
                Usage: 1,
                Value: renderStandaloneCloseButton ? "Yes" : "No",
            },
            IsChartOnTheRightSide: {
                Type: "Boolean",
                Primary: false,
                Static: true,
                Usage: 1,
                Value: isChartOnTheRightSide,
            },
            IsEmbeddedInTeams: {
                Type: "Boolean",
                Primary: false,
                Static: true,
                Usage: 1,
                Value: isEmbeddedInTeams,
            },
        },
        ShouldOverrideControlVisible: false,
        isDefaultConfig: true,
    };
}
function retrieveDefaultConfigurationForAssociatedGridChartControl(name, entityName, viewId, visualizationId, relationshipName, refreshCounter, isUserChart, isUserView, extraFilters, linkEntities, renderStandaloneCloseButton, isChartOnTheRightSide) {
    if (renderStandaloneCloseButton === void 0) { renderStandaloneCloseButton = false; }
    if (isChartOnTheRightSide === void 0) { isChartOnTheRightSide = false; }
    var isUserChartString = isUserChart ? "true" : "false";
    var isUserViewString = isUserView ? "true" : "false";
    return {
        FormFactor: 1,
        CustomControlId: name,
        Name: name,
        Version: "1.0.0",
        Parameters: {
            ChartDataSet: {
                Type: ManifestType.Grid,
                EntityName: entityName,
                ViewId: viewId,
                VisualizationId: visualizationId,
                ChartGridMode: "Chart",
                HighchartFilterExpression: null,
                ExtraFilters: extraFilters,
                IsUserChart: isUserChartString,
                FirstDataRequestType: 1,
                IsUserView: isUserViewString,
                RelationshipName: relationshipName,
                RefreshInput: {
                    Value: refreshCounter,
                    Static: true,
                },
                LinkingInput: {
                    Value: linkEntities,
                    Static: true,
                },
            },
            Parent: {
                Type: "SingleLine.Text",
                Primary: false,
                Static: true,
                Usage: 1,
                Value: "AssociatedGrid",
            },
            ChartSelectorMode: {
                Type: "Enum",
                Primary: false,
                Static: true,
                Usage: 1,
                Value: "ChartSelector",
            },
            CommandMode: {
                Type: "Enum",
                Primary: false,
                Static: true,
                Usage: 1,
                Value: "GridChartCommand",
            },
            EnableExpandButton: {
                Type: "Enum",
                Primary: false,
                Static: true,
                Usage: 1,
                Value: "Yes",
            },
            EnableCloseButton: {
                Type: "Enum",
                Primary: false,
                Static: true,
                Usage: 1,
                Value: renderStandaloneCloseButton ? "Yes" : "No",
            },
            IsChartOnTheRightSide: {
                Type: "Boolean",
                Primary: false,
                Static: true,
                Usage: 1,
                Value: isChartOnTheRightSide,
            },
        },
        ShouldOverrideControlVisible: false,
        isDefaultConfig: true,
    };
}
function retrieveContainerControlForFormPowerBIControl(parameters, FormFactor, Name) {
    return {
        FormFactor: FormFactor,
        CustomControlId: Name,
        Name: POWERBI_ID,
        Version: "1.0.0",
        Parameters: {
            value: {
                TileUrl: parameters.TileUrl,
                PowerBIGroupId: parameters.PowerBIGroupId,
                PowerBIDashboardId: parameters.PowerBIDashboardId,
                PowerBIType: parameters.Type,
                PowerBIReportId: parameters.PowerBIReportId,
                PowerBIFilter: parameters.PowerBIFilter,
                EnableInMobile: parameters.EnableInMobile || false,
                TileId: parameters.TileId,
                IsPowerBIEnabled: parameters.IsPowerBIEnabled || true,
                Type: ManifestType.PowerBI,
                Primary: true,
                FirstPartyIntegrationSiteUrl: parameters.FirstPartyIntegrationSiteUrl,
                Tenant: parameters.Tenant,
            },
        },
        ShouldOverrideControlVisible: false,
        isDefaultConfig: true,
    };
}
function retrieveDefaultConfigurationForQuickFormChartControl(parameters, dataRequestType, renderChartCommandBar) {
    if (dataRequestType === void 0) { dataRequestType = 1; }
    if (renderChartCommandBar === void 0) { renderChartCommandBar = true; }
    var configuration = retrieveDefaultConfigurationForFormChartControl(parameters, dataRequestType);
    configuration.Parameters.Parent.Value = "QuickViewForm";
    configuration.Parameters.CommandMode.Value = renderChartCommandBar ? "FormChartCommand" : "No";
    return configuration;
}
function retrieveDefaultConfigurationForFormChartControl(parameters, firstDataRequestType, refreshCounter) {
    if (firstDataRequestType === void 0) { firstDataRequestType = 2; }
    var chartSelectorModeValue = parameters.EnableChartPicker && parameters.EnableChartPicker === "true" ? "ChartSelector" : "ChartTitle";
    var viewSelectorModeValue = parameters.EnableViewPicker && parameters.EnableViewPicker === "true" ? "ViewSelector" : "ViewTitle";
    var ChartDataSetParameter = {
        Type: ManifestType.Grid,
        EntityName: parameters.TargetEntityType,
        ViewId: parameters.ViewId,
        VisualizationId: parameters.VisualizationId,
        ChartGridMode: "Chart",
        HighchartFilterExpression: null,
        IsUserChart: parameters.IsUserChart,
        FirstDataRequestType: firstDataRequestType,
        IsUserView: parameters.IsUserView,
        ViewIds: parameters.ViewIds,
        RelationshipName: parameters.RelationshipName,
        EnableViewPicker: parameters.EnableViewPicker === "true",
        EnableChartPicker: parameters.EnableChartPicker === "true",
    };
    if (!isNullOrUndefined(refreshCounter)) {
        ChartDataSetParameter.RefreshInput = {
            Value: refreshCounter,
            Static: true,
        };
    }
    return {
        FormFactor: 1,
        CustomControlId: CHART_CONTROL_ID,
        Name: CHART_CONTROL_ID,
        Version: "1.0.0",
        Parameters: {
            ChartDataSet: ChartDataSetParameter,
            Parent: {
                Type: "SingleLine.Text",
                Primary: false,
                Static: true,
                Usage: 1,
                Value: "EditForm",
            },
            ChartSelectorMode: {
                Type: "Enum",
                Primary: false,
                Static: true,
                Usage: 1,
                Value: chartSelectorModeValue,
            },
            ViewSelectorMode: {
                Type: "Enum",
                Primary: false,
                Static: true,
                Usage: 1,
                Value: viewSelectorModeValue,
            },
            CommandMode: {
                Type: "Enum",
                Primary: false,
                Static: true,
                Usage: 1,
                Value: "FormChartCommand",
            },
            EnableExpandButton: {
                Type: "Enum",
                Primary: false,
                Static: true,
                Usage: 1,
                Value: "Yes",
            },
        },
        ShouldOverrideControlVisible: false,
        isDefaultConfig: true,
    };
}
function retrieveDefaultConfigurationForControl(name, dataFieldName, type, descriptor, entityTypeName, classId, pcfDatasetGridOrgSetting) {
    var configuration;
    if (classId && (areGuidsSame(classId, GRID_CLASS_ID) || areGuidsSame(classId, SUBGRID_CLASS_ID))) {
        configuration = retrieveDefaultConfigurationForSubgridControl(name, descriptor.Parameters, false, pcfDatasetGridOrgSetting);
    }
    else {
        configuration = retrieveDefaultConfigurationForFieldControl(name, dataFieldName, type, entityTypeName, classId, descriptor);
    }
    var primaryParameter = _getPrimaryParameter(configuration);
    if (primaryParameter) {
        extendDefaultValueParameterByControlDescriptor(primaryParameter, descriptor);
    }
    var fieldSectionItemSpecificationParameters = getFieldSectionItemSpecificationParameters(configuration, classId);
    if (fieldSectionItemSpecificationParameters !== null) {
        Object.assign(configuration.Parameters, fieldSectionItemSpecificationParameters);
    }
    return configuration;
}
function retrieveDataTypeBySourceTypeForControl(type, classId) {
    var _a = type ? type.split(".") : [null, null], srcType = _a[0], srcFormat = _a[1];
    if (!srcType) {
        srcType = classId ? ManifestType.ClassIdTypeMap[classId] || "string" : "string";
    }
    if (!srcFormat || srcFormat === "null" || srcFormat === "undefined") {
        srcFormat = classId ? ManifestType.ClassIdControlMap[classId] || "text" : "text";
    }
    var dataType;
    switch (srcType) {
        case "boolean":
            dataType = ManifestType.TwoOptions;
            break;
        case "customer":
            dataType = ManifestType.LookupCustomer;
            break;
        case "datetime":
            switch (srcFormat.toLowerCase()) {
                case "date":
                case "0":
                    dataType = ManifestType.DateAndTimeDateOnly;
                    break;
                case "datetime":
                case "dateandtime":
                case "1":
                    dataType = ManifestType.DateAndTimeDateAndTime;
                    break;
                default:
                    dataType = ManifestType.DateAndTimeDateOnly;
            }
            break;
        case "decimal":
            dataType = ManifestType.Decimal;
            break;
        case "file":
            dataType = ManifestType.File;
            break;
        case "float":
        case "double":
            dataType = ManifestType.FP;
            break;
        case "image":
            dataType = ManifestType.Image;
            break;
        case "integer":
            switch (srcFormat.toLowerCase()) {
                case "duration":
                case "1":
                    dataType = ManifestType.WholeDuration;
                    break;
                case "timezone":
                case "2":
                    dataType = ManifestType.WholeTimeZone;
                    break;
                case "language":
                case "3":
                    dataType = ManifestType.WholeLanguage;
                    break;
                default:
                    dataType = ManifestType.WholeNone;
            }
            break;
        case "lookup":
            switch (srcFormat.toLowerCase()) {
                case "connection":
                case "regarding":
                case "1":
                case "2":
                    dataType = ManifestType.LookupRegarding;
                    break;
                default:
                    dataType = ManifestType.LookupSimple;
            }
            break;
        case "memo":
            dataType = ManifestType.Multiple;
            break;
        case "money":
            dataType = ManifestType.Currency;
            break;
        case "owner":
            dataType = ManifestType.LookupOwner;
            break;
        case "partylist":
            dataType = ManifestType.LookupPartyList;
            break;
        case "multiselectpicklist":
            dataType = ManifestType.MultiSelectPicklist;
            break;
        case "picklist":
        case "state":
            dataType = ManifestType.OptionSet;
            break;
        case "status":
            dataType = ManifestType.StatusOptionSet;
            break;
        case "text":
        case "string":
            switch (srcFormat.toLowerCase()) {
                case "email":
                case "0":
                    dataType = ManifestType.SingleLineEmail;
                    break;
                case "textarea":
                case "2":
                    dataType = ManifestType.Multiple;
                    break;
                case "url":
                case "3":
                    dataType = ManifestType.SingleLineURL;
                    break;
                case "tickersymbol":
                case "4":
                    dataType = ManifestType.SingleLineTickerSymbol;
                    break;
                case "phone":
                case "7":
                    dataType = ManifestType.SingleLinePhone;
                    break;
                case "memo":
                    dataType = ManifestType.Multiple;
                    break;
                default:
                    dataType = ManifestType.SingleLineText;
            }
            break;
        case "Timer":
            dataType = ManifestType.Timer;
            break;
        default:
            dataType = ManifestType.SingleLineText;
    }
    return dataType;
}
function retrieveContainerControlTypeByControlId(controlId) {
    switch (controlId) {
        case READ_ONLY_GRID_CONTROL_ID:
        case PCF_GRID_CONTROL_ID:
        case ONE_GRID_CONTROL_ID:
        case GRID_CONTROL_ID:
            return ContainerControlType.GridContainer;
        case DASHBOARD_CONTROL_ID:
            return ContainerControlType.DashboardContainer;
        case QUICK_FORM_ID:
            return ContainerControlType.QuickCreateForm;
        case FIELD_SECTION_ITEM_ID:
            return ContainerControlType.FieldSectionContainer;
        case TIMELINEWALL_ID:
            return ContainerControlType.TimelineContainer;
        case CHART_CONTROL_ID:
            return ContainerControlType.ChartControl;
        case WEBRESOURCEHTML_ID:
            return ContainerControlType.WebresourceControl;
        case CALENDAR_CONTROL_ID:
            return ContainerControlType.CalendarControl;
        case DUMMY_CONTROL_ITEM_ID:
            return ContainerControlType.DummyControl;
    }
}
function retrieveDefaultManifestNameByDataType(dataType, attributes, isMainGrid, pcfDatasetGridOrgSetting, entityName) {
    var manifestName;
    switch (dataType) {
        case "Currency":
        case "Decimal":
        case "FP":
        case "Multiple":
        case "SingleLine.Email":
        case "SingleLine.Phone":
        case "SingleLine.Text":
        case "SingleLine.Ticker":
        case "SingleLine.URL":
        case "TwoOptions":
        case "Whole.None":
            manifestName = retrieveInputControlManifestName(dataType, attributes);
            break;
        case "Whole.Language":
            manifestName = "MscrmControls.FieldControls.LanguagePickerControl";
            break;
        case "OptionSet":
            manifestName = "MscrmControls.FieldControls.OptionSet";
            break;
        case "StatusOptionSet":
            manifestName = "MscrmControls.FieldControls.PicklistStatusControl";
            break;
        case "Whole.TimeZone":
            manifestName = "MscrmControls.FieldControls.TimeZonePickListControl";
            break;
        case "Whole.Duration":
            manifestName = "MscrmControls.FieldControls.DurationControl";
            break;
        case "Lookup.PartyList":
        case "Lookup.Regarding":
        case "Lookup.Simple":
        case "Lookup.Owner":
        case "Lookup.Customer":
        case "Lookup.MultiEntity":
            manifestName = retrieveLookupManifestName(dataType, attributes);
            break;
        case "MultiSelectPicklist":
            manifestName = "MscrmControls.MultiSelectPicklist.UpdMSPicklistControl";
            break;
        case "DateAndTime.DateOnly":
        case "DateAndTime.DateAndTime":
            manifestName = "MscrmControls.FieldControls.DateTimeControl";
            break;
        case "Grid":
            if (!isNullOrUndefined(isMainGrid) && !isNullOrUndefined(pcfDatasetGridOrgSetting)) {
                manifestName = isMainGrid
                    ? getCustomControlIdForTheGrid(isMainGrid, pcfDatasetGridOrgSetting)
                    : getSubGridCustomControlId(entityName, pcfDatasetGridOrgSetting);
            }
            else {
                manifestName = "MscrmControls.Grid.ReadOnlyGrid";
            }
            break;
        case "SearchWidget":
        case "SearchWidget.SearchWidget":
        case "ReferencePanelSearchWidget":
            manifestName = "MscrmControls.KbSearchControl.KbSearchControl";
            break;
        case "KbArticle":
            manifestName = "MscrmControls.KbArticleControl.KbArticleControl";
            break;
        case "KbContent":
            manifestName = "MscrmControls.KbContentControl.KbContentControl";
            break;
        case "Timer":
            manifestName = "MscrmControls.FieldControls.TimerControl";
            break;
        case ManifestType.SingleLineAddress:
            manifestName = BINGMAP_CONTROL_ID;
            break;
        case ManifestType.File:
            manifestName = "MscrmControls.FieldControls.FileControl";
            break;
        case ManifestType.Image:
            manifestName = "MscrmControls.FieldControls.ImageControl";
            break;
        case "SingleLine.TextArea":
        default:
            manifestName = "MscrmControls.FieldControls.DummyControl";
            break;
    }
    manifestName = getManifestFallback(manifestName);
    return manifestName;
}
function retrieveDefaultManifestByConfiguration(configuration, isMainGrid, pcfDatasetGridOrgSetting) {
    if (!configuration) {
        return null;
    }
    var primaryParameter = _getPrimaryParameter(configuration);
    if (!primaryParameter) {
        return null;
    }
    return retrieveDefaultManifestNameByDataType(primaryParameter.Type, undefined, isMainGrid, pcfDatasetGridOrgSetting, !isNullOrUndefined(isMainGrid) &&
        !isNullOrUndefined(pcfDatasetGridOrgSetting) &&
        getDataSetEntityName(primaryParameter));
}
function getDataSetEntityName(parameter) {
    return parameter.TargetEntityType || parameter.EntityName;
}
function isLegacyDataSetControl(controlManifest) {
    switch (controlManifest.CustomControlId) {
        case CALENDAR_CONTROL_ID:
        case GRID_CONTROL_ID:
        case READ_ONLY_GRID_CONTROL_ID:
        case PCF_GRID_CONTROL_ID:
        case TIMELINE_CONTROL_ID:
        case ACTIONCARD_CONTROL_ID: {
            return true;
        }
        default: {
            return false;
        }
    }
}
function createQuickViewFormParameterValue(descriptor, auxInfo) {
    var formId = auxInfo ? auxInfo.quickFormId : "00000000-0000-0000-0000-000000000000";
    var associatedDataField = descriptor ? descriptor.DataFieldName : "";
    return formId + (associatedDataField ? "|" + associatedDataField : "");
}
function createDefaultPcfGridPrimitiveProperties(isMainGrid) {
    return isOneGridEnabled(isMainGrid) ? createOneGridDefaultParameters() : createReadonlyPcfGridDefaultParameters();
}
function createOneGridDefaultParameters() {
    var _a, _b, _c, _d;
    return {
        EnableJumpBar: {
            Usage: 1,
            Static: true,
            Type: "Enum",
            Value: ((_a = XrmProxy.Utils) === null || _a === void 0 ? void 0 : _a.isFeatureEnabled(PCF_DATASET_GRID_SHOW_JUMPBAR))
                ? "Yes"
                : ((_b = XrmProxy.Utils) === null || _b === void 0 ? void 0 : _b.isFeatureEnabled(PCF_GRID_JUMPBAR_DISPLAY_OPTION))
                    ? "Auto"
                    : "No",
            Primary: false,
        },
        EnableEditing: {
            Usage: 1,
            Static: true,
            Type: "Enum",
            Value: ((_c = XrmProxy.Utils) === null || _c === void 0 ? void 0 : _c.isFeatureEnabled(ONE_GRID_ENABLE_EDITING)) ? "Yes" : "No",
            Primary: false,
        },
        EnablePagination: {
            Usage: 1,
            Static: true,
            Type: "Enum",
            Value: ((_d = XrmProxy.Utils) === null || _d === void 0 ? void 0 : _d.isFeatureEnabled(ONE_GRID_ENABLE_PAGING)) ? "Yes" : "No",
            Primary: false,
        },
    };
}
function createReadonlyPcfGridDefaultParameters() {
    var _a, _b;
    return {
        ColumnResizing: {
            Usage: 1,
            Static: true,
            Type: "Enum",
            Value: "Enable",
            Primary: false,
        },
        ColumnMoving: {
            Usage: 1,
            Static: true,
            Type: "Enum",
            Value: "Enable",
            Primary: false,
        },
        ColumnPinning: {
            Usage: 1,
            Static: true,
            Type: "Enum",
            Value: "Disable",
            Primary: false,
        },
        RowSelection: {
            Usage: 1,
            Static: true,
            Type: "Enum",
            Value: "Multiple",
            Primary: false,
        },
        RowHeightMobile: {
            Usage: 1,
            Static: true,
            Type: "Whole.None",
            Value: 72,
            Primary: false,
        },
        RowHeight: {
            Usage: 1,
            Static: true,
            Type: "Whole.None",
            Value: 42,
            Primary: false,
        },
        HeaderHeight: {
            Usage: 1,
            Static: true,
            Type: "Whole.None",
            Value: 42,
            Primary: false,
        },
        SelectionColumn: {
            Usage: 1,
            Static: true,
            Type: "Enum",
            Value: "Enable",
            Primary: false,
        },
        RowStyle: {
            Usage: 1,
            Static: true,
            Type: "Enum",
            Value: "Flat",
            Primary: false,
        },
        GridInnerLeftPadding: {
            Usage: 1,
            Static: true,
            Type: "Whole.None",
            Value: 32,
            Primary: false,
        },
        GridInnerRightPadding: {
            Usage: 1,
            Static: true,
            Type: "Whole.None",
            Value: 32,
            Primary: false,
        },
        JumpBar: {
            Usage: 1,
            Static: true,
            Type: "Enum",
            Value: ((_a = XrmProxy.Utils) === null || _a === void 0 ? void 0 : _a.isFeatureEnabled(PCF_DATASET_GRID_SHOW_JUMPBAR))
                ? "Enable"
                : ((_b = XrmProxy.Utils) === null || _b === void 0 ? void 0 : _b.isFeatureEnabled(PCF_GRID_JUMPBAR_DISPLAY_OPTION))
                    ? "Auto"
                    : "Disable",
            Primary: false,
        },
        ReflowBehavior: {
            Usage: 1,
            Static: true,
            Type: "Enum",
            Value: "Reflow",
            Primary: false,
        },
        Footer: {
            Usage: 1,
            Static: true,
            Type: "Enum",
            Value: "Enable",
            Primary: false,
        },
        IsReadOnly: {
            Usage: 1,
            Static: true,
            Type: "Enum",
            Value: "Enable",
            Primary: false,
        },
        EnableEditing: {
            Usage: 1,
            Static: true,
            Type: "Enum",
            Value: "No",
            Primary: false,
        },
    };
}
function resetForUnitTesting() {
    pcfDataGridEnabled = undefined;
    oneGridEnabled = undefined;
}
export { ContainerControlType, constructTimerParameters, getDataFieldNameForTimer, getFieldSectionItemSpecificationParameters, resetForUnitTesting, isNullOrUndefined, retrieveDefaultConfigurationForFieldControl, retrieveDefaultConfigurationForSubgridControl, retrieveDefaultConfigurationForHomePageGridControl, retrieveDefaultConfigurationForHomePageGridControlForChart, retrieveDefaultConfigurationForHomePageChartControl, retrieveDefaultConfigurationForAssociatedGridChartControl, retrieveDefaultConfigurationForQuickFormChartControl, retrieveDefaultConfigurationForFormChartControl, retrieveContainerControlForFormPowerBIControl, retrieveDefaultConfigurationForControl, extendDefaultValueParameterByControlDescriptor, wrapFieldLevelConfig, isFieldSectionItemControl, retrieveDataTypeBySourceTypeForControl, retrieveDefaultManifestNameByDataType, retrieveDefaultManifestByConfiguration, isLegacyDataSetControl, retrieveContainerControlTypeByControlId, FIELD_SECTION_ITEM_ID, IFRAME_CLASS_ID, WEBRESOURCE_CLASS_ID, KNOWN_FALLBACK_CONTROLS, KNOWN_REPLACEMENT_CONTROLS, MODERN_INPUT_CONTROLS, MODERN_TEXTBOX_CONTROL_NAME, MODERN_PHONENUMBER_CONTROL_NAME, MODERN_CURRENCY_CONTROL_NAME, updateManifestFallback, getManifestFallback, };

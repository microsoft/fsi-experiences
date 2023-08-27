import { instance as XrmProxyInstance } from "../../Utilities/XrmProxy";
import * as CustomControlBagInterfaces from "./../CustomControlExposedInterfaces";
import * as CCFUtils from "./../CustomControlUtilityPointers";
import { retrieveDefaultManifestNameByDataType } from "../../Utilities/DefaultControlMapper";
import { instance as CCFPerformanceTracker } from "../../Utilities/CCFPerformanceTracker";
import { PerformanceStopwatch } from "../../Utilities/PerformanceStopwatch";
import { createCrmUri } from "../../Utilities/CustomControlHelper";
import { COMPONENT_NAME } from "../../Utilities/TelemetryManager";
import * as ProxyUtils from "../../Utilities/XrmProxyDefaultUtilities";
var GLOBAL_COMMAND_MANAGER_ID = "crm_header_global";
export function GenerateDefaultUtilityData(overrides) {
    var defaults = {
        encoder: null,
        dateTimeUtils: {
            getDSTAdjustmentMinutes: function (time) {
                return ProxyUtils.getTimeZoneOffsetMinutes(time);
            },
            getWeekOfYear: function () {
                return -1;
            },
        },
    };
    var complexObjects = {
        encoder: Object.assign({}, defaults.encoder, overrides.encoder),
        dateTimeUtils: Object.assign({}, defaults.dateTimeUtils, overrides.dateTimeUtils),
    };
    return Object.assign({}, overrides, complexObjects);
}
var Utility = (function () {
    function Utility(customControlProperties, externalUtils) {
        this._customControlProperties = customControlProperties;
        this._externalUtils = externalUtils;
        this._globalCommandManagerInitialized = customControlProperties.globalCommandManagerInitialized;
        this._internalEventListeners = this._generateInternalEventListeners();
    }
    Utility.prototype._generateInternalEventListeners = function () {
        return [
            {
                eventname: "systemKeyDown",
                eventhandler: [this._handleSystemKeydown.bind(this)],
            },
        ];
    };
    Utility.prototype._handleSystemKeydown = function (data) {
        if (this._customControlProperties.actions &&
            this._customControlProperties.actions.fireXrmEvent &&
            this._customControlProperties.controlId) {
            this._customControlProperties.actions.fireXrmEvent(this._customControlProperties.controlId.split(".")[0], this._customControlProperties.id, this._customControlProperties.contextToken, 0, data);
        }
    };
    Utility.prototype.doesControlExist = function (customControlName) {
        if (!this._customControlProperties ||
            !this._customControlProperties.actions ||
            !this._customControlProperties.actions.loadManifest) {
            return Promise.resolve(false);
        }
        return this._customControlProperties.actions.loadManifest(customControlName).then(function () {
            return true;
        }, function () {
            return false;
        });
    };
    Utility.prototype.beginSecureSessionForResource = function (resource, cookieName, cookieDomain, allowPrompt) {
        return XrmProxyInstance.Utils.beginSecureSessionForResource(resource, cookieName, cookieDomain, allowPrompt);
    };
    Utility.prototype.createPerformanceMarker = function (id) {
        XrmProxyInstance.Diagnostics.traceWarning("Utility", "createPerformanceMarker called by " + this._customControlProperties.configuration.CustomControlId);
        CCFPerformanceTracker.createPerformanceEvent(id, this._customControlProperties.logLevel, this._customControlProperties.configuration.CustomControlId).createMarker();
    };
    Utility.prototype.createPerformanceStopwatch = function (id) {
        XrmProxyInstance.Diagnostics.traceWarning("Utility", "createPerformanceStopwatch called by " + this._customControlProperties.configuration.CustomControlId);
        return new PerformanceStopwatch(CCFPerformanceTracker.createPerformanceEvent(id, this._customControlProperties.logLevel, this._customControlProperties.configuration.CustomControlId));
    };
    Utility.prototype.log = function (customControlName, message, logType) {
        this._customControlProperties.propBagMethods.utils.logMessage(customControlName, message, logType);
    };
    Utility.prototype.getEntityMetadata = function (entityType, attributes) {
        return XrmProxyInstance.Utils.getEntityMetadata(entityType, attributes);
    };
    Utility.prototype.getEntitiesMetadata = function (entityToAttributes) {
        if (XrmProxyInstance.Utils.getEntitiesMetadata) {
            return XrmProxyInstance.Utils.getEntitiesMetadata(entityToAttributes);
        }
        var promises = [];
        for (var entityType in entityToAttributes) {
            promises.push(XrmProxyInstance.Utils.getEntityMetadata(entityType, entityToAttributes[entityType]));
        }
        return Promise.all(promises).then(function (values) {
            return values;
        });
    };
    Utility.prototype.getParentControlName = function () {
        return ((this._customControlProperties &&
            this._customControlProperties.parentContextToken &&
            this._customControlProperties.parentContextToken.controlName) ||
            "");
    };
    Utility.prototype.getResourceString = function (webResourceName, key) {
        return XrmProxyInstance.Utils.getResourceString(webResourceName, key);
    };
    Utility.prototype.isFeatureEnabled = function (featureName) {
        return XrmProxyInstance.Utils.isFeatureEnabled(featureName);
    };
    Utility.prototype.isDisruptiveFeatureEnabled = function (featureFCBName, serverSidePreviewFCB, groupFeatureOverrideFCB) {
        return (XrmProxyInstance.Utils.isDisruptiveFeatureEnabled &&
            XrmProxyInstance.Utils.isDisruptiveFeatureEnabled(featureFCBName, serverSidePreviewFCB, groupFeatureOverrideFCB));
    };
    Utility.prototype.canOpenUrl = function (url) {
        return XrmProxyInstance.Utils.canOpenUrl(url);
    };
    Utility.prototype.getFormId = function (entityType, formType) {
        return XrmProxyInstance.Utils.getFormId(entityType, formType);
    };
    Utility.prototype.lookupObjects = function (lookupOptions) {
        return XrmProxyInstance.Utils.lookupObjects(lookupOptions);
    };
    Utility.prototype.bindDOMElement = function (virtualComponent, DOMNode) {
        this._externalUtils.bindDOMElement(virtualComponent, DOMNode);
    };
    Utility.prototype.fireEvent = function (eventName, params) {
        var parentDefinedControlProps = this._customControlProperties.parentDefinedControlProps;
        if (!CCFUtils.IsNullOrUndefined(parentDefinedControlProps) &&
            !CCFUtils.IsNullOrUndefined(parentDefinedControlProps.eventListeners)) {
            var index = -1;
            var listeners = parentDefinedControlProps.eventListeners;
            for (var iterator = 0; iterator < listeners.length; iterator++) {
                if (listeners[iterator].eventname === eventName) {
                    index = iterator;
                }
            }
            if (index !== -1) {
                var handlers = parentDefinedControlProps.eventListeners[index];
                for (var iterator in handlers.eventhandler) {
                    if (!CCFUtils.IsNullOrUndefined(handlers.eventhandler[iterator])) {
                        handlers.eventhandler[iterator](params);
                    }
                }
            }
        }
        if (!CCFUtils.IsNullOrUndefined(this._internalEventListeners)) {
            for (var i = 0; i < this._internalEventListeners.length; i++) {
                if (this._internalEventListeners[i].eventname === eventName) {
                    var handlers = this._internalEventListeners[i];
                    for (var j in handlers.eventhandler) {
                        if (!CCFUtils.IsNullOrUndefined(handlers.eventhandler[j])) {
                            handlers.eventhandler[j](params);
                        }
                    }
                }
            }
        }
    };
    Utility.prototype.getControlDefaultMapping = function (dataType, attributes) {
        return retrieveDefaultManifestNameByDataType(dataType, attributes);
    };
    Utility.prototype.getPopupService = function () {
        return this._externalUtils.getPopupService();
    };
    Utility.prototype.requestRender = function (callback) {
        this._externalUtils.forceUpdate(callback);
    };
    Utility.prototype.unbindDOMComponent = function (componentId) {
        return this._externalUtils.unbindDOMComponent(componentId);
    };
    Utility.prototype.updateComponent = function (id, props) {
        this._externalUtils.updateComponent(id, props);
    };
    Utility.prototype.createCrmUri = function (url) {
        if (!this._customControlProperties ||
            !this._customControlProperties.propBagData ||
            !this._customControlProperties.propBagData.clientData) {
            return url;
        }
        return createCrmUri(url, this._customControlProperties.propBagData.clientData);
    };
    Utility.prototype.createServerUri = function (url) {
        if (!this._customControlProperties ||
            !this._customControlProperties.propBagData ||
            !this._customControlProperties.propBagData.clientData) {
            return url;
        }
        return createCrmUri(url, this._customControlProperties.propBagData.clientData);
    };
    Utility.prototype.openInBrowser = function (url) {
        if (url) {
            window.open(url);
        }
    };
    Utility.prototype.getServiceUri = function () {
        return "";
    };
    Utility.prototype.setState = function (state) {
        var personalizationConfig = this._customControlProperties.personalizationConfiguration;
        if (personalizationConfig) {
            if (personalizationConfig.areaType === "form") {
                this._customControlProperties.actions.setFieldControlPersonalization(personalizationConfig, state);
            }
            if (personalizationConfig.areaType === "grid") {
                this._customControlProperties.actions.setGridControlPersonalization(personalizationConfig, state);
            }
            if (personalizationConfig.areaType === "dashboard") {
                this._customControlProperties.actions.setDashboardControlPersonalization(personalizationConfig, state);
            }
        }
        return this._customControlProperties.propBagMethods.utils.setState(state);
    };
    Utility.prototype.crmUrlEncode = function (s) {
        return this._customControlProperties.propBagData.utilsData.encoder.CrmUrlEncode(s);
    };
    Utility.prototype.hasEntityPrivilege = function (entityTypeName, privilegeType, privilegeDepth) {
        return this._customControlProperties.propBagData.utilsData.hasEntityPrivilege(entityTypeName, privilegeType, privilegeDepth);
    };
    Utility.prototype.crmHtmlEncode = function (s) {
        return this._customControlProperties.propBagData.utilsData.encoder.CrmHtmlEncode(s);
    };
    Utility.prototype.isNullOrUndefined = function (object) {
        return CCFUtils.IsNullOrUndefined(object);
    };
    Utility.prototype.isNullOrEmptyString = function (object) {
        return CCFUtils.IsNullOrEmptyString(object);
    };
    Utility.prototype.notifyOutputChanged = function () { };
    Utility.prototype.eventListenerExists = function (eventName) {
        var parentDefinedControlProps = this._customControlProperties.parentDefinedControlProps;
        if (!CCFUtils.IsNullOrUndefined(parentDefinedControlProps) &&
            !CCFUtils.IsNullOrUndefined(parentDefinedControlProps.eventListeners)) {
            var listeners = parentDefinedControlProps.eventListeners;
            for (var iterator = 0; iterator < listeners.length; iterator++) {
                if (listeners[iterator].eventname.toLowerCase() === eventName.toLowerCase()) {
                    return true;
                }
            }
        }
        return false;
    };
    Utility.prototype.getElementByRef = function () {
        return null;
    };
    Utility.prototype.disablePanoramaScroll = function () {
        return false;
    };
    Utility.prototype.scrollToView = function () { };
    Utility.prototype.setNotification = function () {
        return false;
    };
    Utility.prototype.clearNotification = function () {
        return false;
    };
    Utility.prototype.triggerOfflineMetadataSync = function () {
        return this._customControlProperties.actions.triggerOfflineMetadataSync();
    };
    Utility.prototype.addGlobalNotification = function (type, level, message, title, action, onCloseHandler) {
        return XrmProxyInstance.addGlobalNotification(type, level, message, title, action, onCloseHandler);
    };
    Utility.prototype.clearGlobalNotification = function (id) {
        return XrmProxyInstance.clearGlobalNotification(id);
    };
    Utility.prototype.clearGlobalNotifications = function () {
        return XrmProxyInstance.clearGlobalNotifications();
    };
    Utility.prototype.retrieveChartDrilldownAttributes = function (etn) {
        return this._customControlProperties.actions.retrieveChartDrilldownAttributes(etn);
    };
    Utility.prototype.retrieveFormWithAttributes = function (entityName, formId, formType) {
        return this._customControlProperties.actions.retrieveFormWithAttributes(entityName, formId, formType);
    };
    Utility.prototype.getEntityName = function (entityTypeCode) {
        return XrmProxyInstance.Utils.getEntityName(entityTypeCode);
    };
    Utility.prototype.retrieveRecordCommand = function (allRecords, commandManagerId, records, commandButtonIds, filterByPriority, useNestedFormat) {
        var _this = this;
        var controlConstructorName = this._customControlProperties &&
            this._customControlProperties.manifest &&
            this._customControlProperties.manifest.ConstructorName
            ? this._customControlProperties.manifest.ConstructorName
            : null;
        var pageId = this._customControlProperties.id;
        if (commandManagerId === GLOBAL_COMMAND_MANAGER_ID) {
            if (this._globalCommandManagerInitialized) {
                return this._customControlProperties.actions.retrieveRecordCommand(allRecords, commandManagerId, this._customControlProperties.contextToken, records, commandButtonIds, filterByPriority, useNestedFormat, controlConstructorName, true, pageId);
            }
            var globalCommandManagerPromise = this._externalUtils.getGlobalCommandManagerPromise();
            if (globalCommandManagerPromise && globalCommandManagerPromise.promise) {
                return globalCommandManagerPromise.promise.then(function () {
                    _this._globalCommandManagerInitialized = true;
                    return _this._customControlProperties.actions.retrieveRecordCommand(allRecords, commandManagerId, _this._customControlProperties.contextToken, records, commandButtonIds, filterByPriority, useNestedFormat, controlConstructorName, true, pageId);
                }, function () {
                    var error = new Error("Global command manager initialization failed");
                    XrmProxyInstance.Reporting.reportFailure(COMPONENT_NAME + ".Models", error, "Rejected promise", [
                        { name: "commandManagerId", value: commandManagerId },
                        { name: "APIName", value: COMPONENT_NAME + ".Models.PropertyClasses.Utility.retrieveRecordCommand" },
                    ]);
                    throw error;
                });
            }
            var promise = this._customControlProperties.actions.addPendingCommandManagerId(pageId, this._customControlProperties.contextToken, this._customControlProperties.controlId, commandManagerId);
            this._externalUtils.setGlobalCommandManagerPromise(promise);
            return promise.promise.then(function () {
                _this._globalCommandManagerInitialized = true;
                return _this._customControlProperties.actions.retrieveRecordCommand(allRecords, commandManagerId, _this._customControlProperties.contextToken, records, commandButtonIds, filterByPriority, useNestedFormat, controlConstructorName, true, pageId);
            });
        }
        return this._customControlProperties.actions.retrieveRecordCommand(allRecords, commandManagerId, this._customControlProperties.contextToken, records, commandButtonIds, filterByPriority, useNestedFormat, controlConstructorName, true, pageId);
    };
    Utility.prototype.getDeclaredFeatures = function () {
        return { unspecifiedFeatureFallback: { supportStatus: "supported" } };
    };
    Utility.prototype.getFeatureClassName = function () {
        return "Utility";
    };
    Utility.prototype.encodeFilterString = function (filterValueString, encodeOptions) {
        var result = filterValueString
            ? filterValueString.replace(/\[/g, "[[]").replace(/%/g, "[%]").replace(/_/g, "[_]").replace(/\*/g, "%")
            : "";
        if (encodeOptions && encodeOptions.encloseWithWildcard) {
            switch (encodeOptions.encloseWithWildcardOption) {
                case 1:
                    result = "%" + result;
                    break;
                case 2:
                    result = result + "%";
                    break;
                case 3:
                default:
                    result = "%" + result + "%";
                    break;
            }
        }
        return result;
    };
    Utility.prototype.getUserSettings = function () {
        return XrmProxyInstance.Utils.getUserSettings();
    };
    return Utility;
}());
export { Utility };

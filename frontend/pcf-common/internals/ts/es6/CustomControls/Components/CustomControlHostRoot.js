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
import { RendererContext } from "react-fela";
import { PopupService } from "../Utilities/PopupService";
import { PropertyBag } from "../Models/PropertyBag";
import { instance as CCFPerformanceTracker } from "../Utilities/CCFPerformanceTracker";
import { VirtualComponentTranslator } from "./VirtualComponentTranslator";
import { View } from "../../CommonComponents/Primitive/View";
import { ManifestType } from "../Utilities/ManifestType";
import { LearningPathHelper } from "../Utilities/LearningPathHelper";
import * as CCFUtilities from "../Models/CustomControlUtilityPointers";
import { MeasuringHandler, MeasuringHandlerContext, } from "../../CommonComponents/Common/MeasuringHandler/MeasuringHandler";
import { instance as TelemetryClient } from "../Utilities/TelemetryClient";
import { COMPONENT_NAME } from "../Utilities/TelemetryManager";
import { instance as XrmProxy } from "../Utilities/XrmProxy";
import { instance as RootAppProxy } from "../Utilities/RootAppProxy";
import { CommandingWrapper } from "../Models/CommandingWrapper";
import { getParentIdFromProps, isDataSetControl, isQuickFormControl, getRecordInfoFromControlProps, buildUniqueCustomControlId, } from "../Utilities/CustomControlHelper";
import { CustomControlMemoizationHelper } from "./Helpers/CustomControlMemoizationHelper";
import { SeeMoreStatus, CustomControlAnimationHelper, } from "./Helpers/Animation/CustomControlAnimationHelper";
import { ErrorData } from "./Helpers/CustomControlErrorData";
import { CustomControlSeeMoreHelper } from "./Helpers/CustomControlSeeMoreHelper";
import { CustomControlEntityReference } from "../Models/CustomControlEntityReference";
import * as PropertyConstants from "../Models/UpdatedPropertyConstants";
import { KNOWN_FALLBACK_CONTROLS, KNOWN_REPLACEMENT_CONTROLS, updateManifestFallback, } from "../Utilities/DefaultControlMapper";
import { getLocalizedString } from "./Helpers/CustomControlLocHelper";
import { PropertyDependencyManager } from "../Models/PropertyDependencyManager";
import { CustomControlPortal } from "./Helpers/CustomControlPortal";
import { PCFUsageLogger } from "../Utilities/PCFUsageLogger";
import { DataSetFactory } from "../Models/Dataset/DataSetFactory";
import { canPreventUnnecessaryRenders } from "./Helpers/PreventUnnecessaryControlRendersHelper";
import { escapeRegExp } from "../Utilities/Regex";
var CALENDAR_CONTROL_ID = "MscrmControls.Calendar.CalendarControl";
var GRID_CONTROL_ID = "MscrmControls.Grid.GridControl";
var READONLY_GRID_CONTROL_ID = "MscrmControls.Grid.ReadOnlyGrid";
var CUSTOM_CONTROL_INIT = "CustomControlHostRoot.init";
var CUSTOM_CONTROL_UPDATE_VIEW = "CustomControlHostRoot.updateView";
var CUSTOM_CONTROL_UPDATE_OUTPUTS = "CustomControlHostRoot.updateOutputs";
var CUSTOM_CONTROL_DID_MOUNT = "CustomControlHostRoot.componentDidMount";
var CUSTOM_CONTROL_WILL_RECEIVE_PROPS = "CustomControlHostRoot.componentWillReceiveProps";
var CUSTOM_CONTROL_DID_UPDATE = "CustomControlHostRoot.componentDidUpdate";
var CUSTOM_CONTROL_RENDER = "CustomControlHostRoot.render";
var CUSTOM_CONTROL_INITIALIZE_DATA = "CustomControlHostRoot._initializeData";
var CUSTOM_CONTROL_BIND_DOMELEMENT = "CustomControlHostRoot._bindDOMElement";
var CUSTOM_CONTROL_DISPOSE = "CustomControlHostRoot._disposeControl";
var CUSTOM_CONTROL_WILL_UNMOUNT = "CustomControlHostRoot.componentWillUnmount";
var CUSTOM_CONTROL_SHOULD_UPDATE = "CustomControlHostRoot.shouldComponentUpdate";
var CUSTOM_CONTROL_RENDER_MAIN_COMPONENT = "CustomControlHostRoot._renderMainControlComponent";
var CUSTOM_CONTROL_ENSURE_PARAMETER_DYNAMIC_DATA_INITIALIZATION = "CustomControlHostRoot._ensureParameterDynamicDataInitialization";
var KNOWN_EXCEPTION_CONTROL_IDS = [
    "findSlotGridControl_id.FindSlotsGridControlId",
    "entity_control.BusinessClosureGridControlID[RANDOM_GUID]",
    "query_viewer_control.fieldControl.SegmentMembers.QueryViewerDialogHostGrid-[RANDOM_ID]",
    "MembersControl.SegmentMembers.QueryViewerDialogHostGrid-[RANDOM_ID]",
    "RelatedCustomerJourneys.RelatedEntitiesGrid[RANDOM_ID]",
    "RelatedMarketingEmails.RelatedEntitiesGrid[RANDOM_ID]",
    "RelatedSegments.RelatedEntitiesGrid[RANDOM_ID]",
    "msdyncrm_entitydependencygrid_dialog.fieldControl.EntityDependencyGrid[RANDOM_ID]",
    "MscrmControls.Grid.MacroSessionAssociatedGridControl.gridControl - dynResults[RANDOM_GUID]",
];
var GUID_REGEX = "[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}";
var ID_REGEX = "\\d+";
var CLEAR_CONTROLINSTANCE_PROPERTIES = "ClearControlInstanceProperties";
var CustomControlContext = React.createContext({});
var ProvideCustomControlContext = function (props) {
    return (React.createElement(RendererContext.Consumer, null, function (rendererContext) { return (React.createElement(MeasuringHandlerContext.Consumer, null, function (measuringHandlerContext) { return (React.createElement(CustomControlContext.Provider, { value: { rendererContext: rendererContext, measuringHandlerContext: measuringHandlerContext } }, props.children)); })); }));
};
var CustomControlHostRootInternal = (function (_super) {
    __extends(CustomControlHostRootInternal, _super);
    function CustomControlHostRootInternal(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this._internalStatus = 0;
        _this._outputChangedDebouncer = -1;
        _this._manifestRequestedOnce = false;
        _this._dynamicDataRequestedOnce = false;
        _this._trackingDimensions = false;
        _this._subscriber = null;
        _this._latestOutputs = null;
        _this._ignoreSelfUpdates = false;
        _this._currentlyRendering = false;
        _this._skipControlUpdate = false;
        _this._internalState = {};
        _this._internalPendingUnsentUpdates = false;
        _this._outputChangedInternalInProgress = false;
        _this._updateInternalTracker = [];
        _this._descendantInSeeMore = false;
        _this._constantHostData = null;
        _this._attributesAffected = [];
        _this._runningStopwatches = [];
        _this.state = {
            _status: 1,
        };
        TelemetryClient.setProps(props);
        _this._updateInternalTracker = _this._updateInternalTracker.concat(props.updatedProperties);
        _this._parentId = getParentIdFromProps(props);
        _this._memoHelper = new CustomControlMemoizationHelper();
        _this._seeMoreHelper = new CustomControlSeeMoreHelper(props.descriptor ? props.descriptor.DomId : null);
        _this._errorData = new ErrorData();
        _this._customControlName = _this.props.manifest
            ? _this.props.manifest.ConstructorName
            : _this.props.configuration.CustomControlId;
        _this._componentName = COMPONENT_NAME + "." + _this._customControlName;
        _this._portal = React.createRef();
        _this._logger = new PCFUsageLogger();
        return _this;
    }
    Object.defineProperty(CustomControlHostRootInternal.prototype, "setLogger", {
        set: function (logger) {
            this._logger = logger;
        },
        enumerable: false,
        configurable: true
    });
    CustomControlHostRootInternal.prototype._setGlobalCommandManagerPromise = function (promise) {
        this._globalCommandManagerPromise = promise;
    };
    CustomControlHostRootInternal.prototype._getGlobalCommandManagerPromise = function () {
        return this._globalCommandManagerPromise;
    };
    CustomControlHostRootInternal.prototype._getPopupService = function () {
        if (!this._popupService) {
            this._popupService = new PopupService(this);
        }
        return this._popupService;
    };
    CustomControlHostRootInternal.prototype._initializeData = function () {
        var _this = this;
        this._internalStatus = 1;
        this._propertyBag = this._createPropertyBag();
        var promises = [];
        var loadRes = this._loadResources();
        if (loadRes) {
            promises.push(loadRes);
        }
        this._ensureParameterDynamicDataInitialization(this.props);
        if (this.props.manifest.ConstructorName === CALENDAR_CONTROL_ID ||
            this.props.manifest.ConstructorName === GRID_CONTROL_ID ||
            this.props.manifest.ConstructorName === READONLY_GRID_CONTROL_ID) {
            this._updateTrackResize(true);
            if ((!this.props.parentDefinedControlProps || !this.props.parentDefinedControlProps.toggleDimensionListener) &&
                this._trackingDimensions) {
                promises.push(new Promise(function (resolve) {
                    _this._resolveWidth = resolve;
                }));
            }
        }
        if (this.props.actions.setXrmObject) {
            this._setXrmObject();
        }
        var initControl = function () {
            CCFPerformanceTracker.scheduleControlUpdate(function () {
                if (_this._internalStatus !== 5) {
                    _this._internalStatus = 2;
                    _this._initializeControl();
                }
            });
        };
        if (promises.length === 0) {
            initControl();
        }
        else {
            Promise.all(promises).then(initControl, function (error) {
                var initializeDataFailed = "initialize data failed";
                _this._logger.logFailureEvent(_this.props, error || new Error(initializeDataFailed), CUSTOM_CONTROL_INITIALIZE_DATA, _this._parentId);
                _this._onControlLoadedError();
                _this._setErrorData(initializeDataFailed + " for control: " + _this.props.manifest.CustomControlId);
                _this.setState({
                    _status: 0,
                });
            });
        }
    };
    CustomControlHostRootInternal.prototype._isVirtual = function () {
        return !this.props.manifest || this.props.manifest.IsVirtual;
    };
    CustomControlHostRootInternal.prototype._seeMoreCallback = function (skipUpdateIfVirtual) {
        var isVirtual = this._isVirtual();
        this._skipControlUpdate = skipUpdateIfVirtual ? isVirtual : !isVirtual;
        this._forceUpdate();
    };
    CustomControlHostRootInternal.prototype._descendantSeeMoreUpdate = function (childInSeeMore) {
        this._descendantInSeeMore = childInSeeMore;
        this._skipControlUpdate = true;
        this._forceUpdate();
    };
    CustomControlHostRootInternal.prototype._getDomIdDivStyleProperties = function (descriptor) {
        var styleProperties = {
            width: "100%",
            maxWidth: this.props.parentDefinedControlProps &&
                !CCFUtilities.IsNullOrUndefined(this.props.parentDefinedControlProps.width) &&
                this.props.parentDefinedControlProps.width > 0
                ? this.props.parentDefinedControlProps.width + "px"
                : null,
            maxHeight: this.props.parentDefinedControlProps &&
                !CCFUtilities.IsNullOrUndefined(this.props.parentDefinedControlProps.height) &&
                this.props.parentDefinedControlProps.height > 0
                ? this.props.parentDefinedControlProps.height + "px"
                : null,
        };
        if (descriptor && !descriptor.Visible) {
            styleProperties.display = "none";
        }
        return styleProperties;
    };
    CustomControlHostRootInternal.prototype._createPropertyBag = function () {
        var _this = this;
        var externalUtils = {
            getPopupService: this._getPopupService.bind(this),
            forceUpdate: function (callback) {
                CCFPerformanceTracker.scheduleControlUpdate(_this._forceUpdate.bind(_this, callback));
            },
            bindDOMElement: this._bindDOMElement.bind(this),
            unbindDOMComponent: this._unbindDOMComponent.bind(this),
            updateComponent: this._updateChildComponent.bind(this),
            setGlobalCommandManagerPromise: this._setGlobalCommandManagerPromise.bind(this),
            getGlobalCommandManagerPromise: this._getGlobalCommandManagerPromise.bind(this),
            xrmProxy: XrmProxy,
        };
        return new PropertyBag(this.props, externalUtils);
    };
    CustomControlHostRootInternal.prototype._updateSelfUpdateIgnore = function (val) {
        this._ignoreSelfUpdates = val;
    };
    CustomControlHostRootInternal.prototype._updateTrackResize = function (val) {
        var _this = this;
        if (this._internalStatus === 5) {
            return;
        }
        if (this._trackingDimensions === val) {
            return;
        }
        this._trackingDimensions = val;
        if (this.props.parentDefinedControlProps && this.props.parentDefinedControlProps.toggleDimensionListener) {
            this.props.parentDefinedControlProps.toggleDimensionListener(this._trackingDimensions);
        }
        else if (this._trackingDimensions) {
            if (this._subscriber === null) {
                this._subscriber = {
                    getComponent: this._getComponent.bind(this),
                    onMeasure: this._updateDimensions.bind(this),
                    getContext: function () { return _this.context; },
                };
            }
            MeasuringHandler.getInstance().addMeasuringSubscribers(this._subscriber);
            MeasuringHandler.getInstance().scheduleMeasuringUpdate();
        }
        else {
            if (this._subscriber) {
                MeasuringHandler.getInstance().removeMeasuringSubscribers(this._subscriber);
            }
            this._forceUpdate();
        }
    };
    CustomControlHostRootInternal.prototype._loadManifest = function () {
        var _this = this;
        if (this.props.manifest || this._manifestRequestedOnce) {
            return Promise.resolve(null);
        }
        if (!this.props.actions.loadManifest) {
            XrmProxy.Diagnostics.traceWarning(this._componentName + "._loadManifest", "Manifest not found for control with id " + this.props.controlId);
            return Promise.reject("Manifest not found for control with id " + this.props.controlId);
        }
        this._manifestRequestedOnce = true;
        return new Promise(function (resolve, reject) {
            _this.props.actions
                .loadManifest(_this.props.configuration.CustomControlId, _this.props.configuration.Name)
                .then(resolve, reject);
        }).then(function () { return null; });
    };
    CustomControlHostRootInternal.prototype._loadResources = function () {
        return this.props.actions.loadResources(this.props.manifest);
    };
    CustomControlHostRootInternal.prototype._setXrmObject = function () {
        return this.props.actions.setXrmObject(XrmProxy);
    };
    CustomControlHostRootInternal.prototype._bindDOMElement = function (virtualComponent, DOMNode) {
        var _this = this;
        if (this._internalStatus === 5) {
            XrmProxy.Diagnostics.traceWarning(this._componentName + "." + CUSTOM_CONTROL_BIND_DOMELEMENT, "_bindDOMElement is called after component unmounted");
            return;
        }
        try {
            if (RootAppProxy.PCF.forkPCFTree && VirtualComponentTranslator.isComplexComponent(virtualComponent)) {
                var _a = VirtualComponentTranslator.generateComplexControlProps(virtualComponent, this.props, this._generateHostData(), null, 0), props = _a.props, dataSetHostProps = _a.dataSetHostProps;
                RootAppProxy.PCF.renderChildControl(props.controlId, props, DOMNode, props.controlId, dataSetHostProps);
            }
            else {
                var newChildComponent = VirtualComponentTranslator.renderVirtualComponent(virtualComponent, this.props, this._generateHostData(), this._memoHelper, false);
                var id_1 = virtualComponent.getComponentId();
                if (this._childElements == null) {
                    this._childElements = {};
                }
                if (Object.keys(this._childElements).length === 0) {
                    while (DOMNode.firstChild) {
                        DOMNode.removeChild(DOMNode.firstChild);
                    }
                }
                this._portal.current.bindDOMElement(newChildComponent, DOMNode, id_1, function () {
                    _this._childElements[id_1] = DOMNode;
                });
            }
        }
        catch (exception) {
            var suggestedMitigation = "Error during _bindDOMElement, internalStatus: " + this._internalStatus;
            this._logger.logFailureEvent(this.props, exception, CUSTOM_CONTROL_BIND_DOMELEMENT, this._parentId, suggestedMitigation);
            throw exception;
        }
    };
    CustomControlHostRootInternal.prototype._updateChildComponent = function () { };
    CustomControlHostRootInternal.prototype._forceUpdate = function (callback) {
        if (!this._currentlyRendering) {
            var scheduleRender = this.props.propBagData.utilsData.scheduleRender;
            if (scheduleRender) {
                scheduleRender(this.forceUpdate.bind(this, callback));
            }
            else {
                this.forceUpdate(callback);
            }
        }
    };
    CustomControlHostRootInternal.prototype._unbindDOMComponent = function (componentId) {
        var _this = this;
        if (this._childElements != null) {
            var DOMElement = this._childElements[componentId];
            if (DOMElement != null) {
                this._portal.current.unbindDOMComponent(componentId, function () {
                    delete _this._childElements[componentId];
                });
                this.props.actions.clearNestedChild(componentId);
            }
        }
        return true;
    };
    CustomControlHostRootInternal.prototype._clearAllDOMComponents = function () {
        var success = true;
        for (var domKey in this._childElements) {
            success = success && this._unbindDOMComponent(domKey);
        }
        return success;
    };
    CustomControlHostRootInternal.prototype._ensureParameterDynamicDataInitialization = function (props) {
        if (this._dynamicDataRequestedOnce) {
            return;
        }
        this._dynamicDataRequestedOnce = true;
        if (isDataSetControl(this.props.manifest)) {
            var controlName = this.props.controlId;
            if (!this.props.actions.createXrmGrid(this.props.contextToken, this.props.id, this.props.configuration.Parameters, controlName, this.props.configuration.CustomControlId)) {
                this._logger.logFailureEvent(this.props, new Error("Error creating the Xrm grid object"), CUSTOM_CONTROL_INIT, this._parentId);
            }
        }
        if (!props.dynamicData) {
            var ensureParameterDynamicDataInitializationFailed = "Ensure parameter dynamic data initialization failed";
            this._logger.logFailureEvent(props, new Error(ensureParameterDynamicDataInitializationFailed), CUSTOM_CONTROL_ENSURE_PARAMETER_DYNAMIC_DATA_INITIALIZATION, this._parentId);
            this._onControlLoadedError();
            this._setErrorData(ensureParameterDynamicDataInitializationFailed + " for control: " + props.manifest.CustomControlId);
            this.setState({
                _status: 0,
            });
            return;
        }
        for (var paramKey in props.dynamicData.parameters) {
            var wrapper = props.dynamicData.parameters[paramKey];
            if (wrapper && wrapper.getParameterManifestType) {
                var manifestType = wrapper.getParameterManifestType();
                if (!this._commandingWrapper &&
                    (manifestType === ManifestType.Grid || manifestType === ManifestType.TimelineWall)) {
                    this._commandingWrapper = new CommandingWrapper(props);
                }
            }
            if (wrapper && wrapper.ensureDataInitialization) {
                var initializableWrapper = wrapper;
                var manifestType = initializableWrapper.getParameterManifestType();
                if (manifestType === ManifestType.Grid) {
                    this._commandingWrapper.addDataSetWrapper(initializableWrapper);
                    initializableWrapper.ensureDataInitialization({
                        retrieveAction: props.actions.retrieveGridData,
                        retrieveViewAction: props.actions.retrieveView,
                        retrieveViewSelectorAction: props.actions.retrieveViewSelector,
                        refreshDataSetParameter: props.actions.refreshDataSetParameter,
                        retrieveLookupMetadataAction: props.actions.retrieveLookupMetadataAction,
                        retrieveDataSetLookupCellParameter: props.actions.retrieveDataSetLookupCellParameter,
                        executeAddOnLoad: props.actions.executeAddOnLoad,
                        updateFieldValue: props.actions.updateFieldValue,
                        saveEmbeddedEntity: props.actions.saveEmbeddedEntity,
                        executeNotifyHandlersThatEventOccurred: props.actions.executeNotifyHandlersThatEventOccurred,
                        addSessionTab: props.actions.addSessionTab,
                        closeSessionTab: props.actions.closeSessionTab,
                        updateSessionTab: props.actions.updateSessionTab,
                        closeAllSessionTabs: props.actions.closeAllSessionTabs,
                        dismissMessage: props.actions.dismissMessage,
                        markActiveTab: props.actions.markActiveTab,
                        initializeReferencePanelControl: props.actions.initializeReferencePanelControl,
                        cleanReferencePanelState: props.actions.cleanReferencePanelState,
                        openDatasetItem: null,
                        retrieveEntityData: props.actions.retrieveEntityData,
                        retrieveForm: props.actions.retrieveForm,
                        retrieveRecordForForm: props.actions.retrieveRecordDataForForm,
                        forceUpdate: this._forceUpdate.bind(this),
                        updateControlMemoizedDataSet: props.actions.updateControlMemoizedDataSet,
                        loadWebResource: props.actions.loadWebResource,
                        retrieveLookupRecordsBySearchString: props.actions.retrieveLookupRecordsBySearchString,
                        retrieveLookupRecordsByIds: props.actions.retrieveLookupRecordsByIds,
                        updateGridPageNumber: props.actions.updateGridPageNumber,
                        retrievePersonaInfo: props.actions.retrievePersonaInfo,
                        usePresenceStatus: props.actions.usePresenceStatus,
                        useProfilePhoto: props.actions.useProfilePhoto,
                    });
                }
                else if (manifestType === ManifestType.QuickForm) {
                    initializableWrapper.ensureDataInitialization({
                        retrieveAction: props.actions.retrieveGridData,
                        retrieveViewAction: props.actions.retrieveView,
                        retrieveViewSelectorAction: props.actions.retrieveViewSelector,
                        refreshDataSetParameter: props.actions.refreshDataSetParameter,
                        retrieveLookupMetadataAction: props.actions.retrieveLookupMetadataAction,
                        retrieveDataSetLookupCellParameter: props.actions.retrieveDataSetLookupCellParameter,
                        executeAddOnLoad: props.actions.executeAddOnLoad,
                        updateFieldValue: props.actions.updateFieldValue,
                        saveEmbeddedEntity: props.actions.saveEmbeddedEntity,
                        executeNotifyHandlersThatEventOccurred: props.actions.executeNotifyHandlersThatEventOccurred,
                        addSessionTab: props.actions.addSessionTab,
                        closeSessionTab: props.actions.closeSessionTab,
                        updateSessionTab: props.actions.updateSessionTab,
                        closeAllSessionTabs: props.actions.closeAllSessionTabs,
                        dismissMessage: props.actions.dismissMessage,
                        markActiveTab: props.actions.markActiveTab,
                        initializeReferencePanelControl: props.actions.initializeReferencePanelControl,
                        cleanReferencePanelState: props.actions.cleanReferencePanelState,
                        openDatasetItem: null,
                        retrieveEntityData: props.actions.retrieveEntityData,
                        retrieveForm: props.actions.retrieveForm,
                        retrieveRecordForForm: props.actions.retrieveRecordDataForForm,
                        forceUpdate: this._forceUpdate.bind(this),
                        updateControlMemoizedDataSet: props.actions.updateControlMemoizedDataSet,
                        loadWebResource: props.actions.loadWebResource,
                    });
                }
            }
            if (wrapper &&
                wrapper.ensureLookupMetaDataInitialization) {
                var delayMetadataInitializationName = "delayMetadataInitialization";
                var delayMetadataInitializationParameter = this.props.descriptor.Parameters && this.props.descriptor.Parameters[delayMetadataInitializationName];
                if (!delayMetadataInitializationParameter) {
                    var lookupWrapper = wrapper;
                    lookupWrapper.ensureLookupMetaDataInitialization({
                        retrieveLookupMetadataAction: props.actions.retrieveLookupMetadataAction,
                        refreshDataSetParameter: props.actions.refreshDataSetParameter,
                        retrieveViewAction: props.actions.retrieveView,
                    });
                }
            }
            if (wrapper &&
                wrapper.ensureTimelinewallCommandsInitialization) {
                var timelinewallWrapper = wrapper;
                var manifestType = timelinewallWrapper.getParameterManifestType();
                if (manifestType === ManifestType.TimelineWall) {
                    wrapper.ensureTimelinewallCommandsInitialization(props);
                }
            }
            if (wrapper && wrapper.setControlReRender) {
                wrapper.setControlReRender(this._forceUpdate.bind(this));
            }
        }
    };
    CustomControlHostRootInternal.prototype._initDataSetObjectWrapper = function () {
        if (this.props.datasetProviders) {
            for (var datasetKey in this.props.datasetProviders) {
                var previousConfiguration = this._memoizedDataSetConfigurations[datasetKey];
                var previousProvider = this._memoizedDataProviders[datasetKey];
                if (previousConfiguration !== this.props.datasetConfiguration[datasetKey] ||
                    previousProvider !== this.props.datasetProviders[datasetKey]) {
                    this._datasetObjectWrappers[datasetKey] = DataSetFactory.createDataSetObjectWrapper(this.props.datasetProviders[datasetKey], this.props.datasetConfiguration[datasetKey]);
                    this._memoizedDataSetConfigurations[datasetKey] = this.props.datasetConfiguration[datasetKey];
                    this._datasetObjectWrappers[datasetKey].setControlReRender(this._forceUpdate.bind(this));
                }
            }
        }
    };
    CustomControlHostRootInternal.prototype._measureLifecycleMethod = function (methodName, action) {
        var stop = CCFPerformanceTracker.startLifecycleStopwatch(methodName, this.props.controlId, this.props.manifest.CustomControlId);
        this._runningStopwatches.push(stop);
        action();
        stop();
        var index = this._runningStopwatches.indexOf(stop);
        if (index > -1) {
            this._runningStopwatches.splice(index, 1);
        }
    };
    CustomControlHostRootInternal.prototype._destroyStopwatches = function (exception) {
        for (var _i = 0, _a = this._runningStopwatches; _i < _a.length; _i++) {
            var stop_1 = _a[_i];
            stop_1({ exception: (exception === null || exception === void 0 ? void 0 : exception.message) || "UnexpectedError" });
        }
        this._runningStopwatches = [];
    };
    CustomControlHostRootInternal.prototype._createControlInstance = function () {
        var findCtor = window;
        var accessableNamespaceObjects = [];
        for (var _i = 0, _a = this.props.manifest.ConstructorName.split("."); _i < _a.length; _i++) {
            var ctorNamePart = _a[_i];
            findCtor = findCtor[ctorNamePart];
            if (!findCtor) {
                break;
            }
            accessableNamespaceObjects.push("{" + ctorNamePart + ": " + (Object.keys(findCtor).length !== 0 ? Object.keys(findCtor).toString() : "empty") + "}");
        }
        if (!findCtor || typeof findCtor !== "function") {
            throw new Error("Could not find/invoke " + this.props.manifest.ConstructorName + "'s constructor. " + (accessableNamespaceObjects.length !== 0
                ? "Shape of " + this.props.manifest.ConstructorName + ": " + accessableNamespaceObjects.toString()
                : ""));
        }
        var ctor = findCtor;
        return new ctor();
    };
    CustomControlHostRootInternal.prototype._initializeControl = function () {
        var _this = this;
        var _a, _b;
        this._ensureParameterDynamicDataInitialization(this.props);
        if (!((_a = this.props.dynamicData) === null || _a === void 0 ? void 0 : _a.dataReady) ||
            this._internalStatus === 3 ||
            !this.props.propBagData.resourcesData.stringsLoaded) {
            return;
        }
        this._internalStatus = 3;
        var generatedPropertyBag;
        var errorText;
        var suggestedMitigation;
        try {
            this._measureLifecycleMethod("constructor", function () { return (_this._controlInstance = _this._createControlInstance()); });
            generatedPropertyBag = this._generateBag();
            var virtualControl = this._isVirtual();
            errorText = "Error creating the Xrm form object";
            suggestedMitigation = "The first inner catch block";
            if (isQuickFormControl(this.props.configuration)) {
                var recordInfo = getRecordInfoFromControlProps(this.props);
                var entityTypeName = recordInfo.entityTypeName;
                var recordId = recordInfo.recordId;
                if (!recordId) {
                    recordId = this.props.propBagData.modeData ? this.props.propBagData.modeData.entityId : null;
                }
                if (recordId &&
                    !this.props.actions.createXrmForm(this.props.contextToken, this.props.id, entityTypeName, recordId)) {
                    this._logger.logFailureEvent(this.props, new Error(errorText), CUSTOM_CONTROL_INIT, this._parentId);
                }
            }
            errorText = null;
            suggestedMitigation = null;
            if (this._shouldHandleDependencyUpdate()) {
                this._propertyDependencyManager = new PropertyDependencyManager(this.props);
                this._getOutputSchemaAction = this._controlInstance.getOutputSchema.bind(this._controlInstance);
                this._propertyDependencyManager.handleDependencyUpdate(this.props, this._getOutputSchemaAction, generatedPropertyBag);
            }
            if (virtualControl) {
                this._executeAnyOnLoadEventsWhenNeeded();
                var bindOutput_1 = this._onOutputChanged.bind(this);
                var propPersonalizationState_1 = this.props.personalizationState;
                if ((_b = this.props.manifest.Children) === null || _b === void 0 ? void 0 : _b.length) {
                    this._memoHelper.setIsCompositing(true);
                }
                suggestedMitigation = "The second inner catch block";
                this._measureLifecycleMethod("init", function () {
                    return _this._controlInstance.init(generatedPropertyBag, bindOutput_1, propPersonalizationState_1);
                });
                suggestedMitigation = null;
            }
            else {
                this._executeAnyOnLoadEventsWhenNeeded();
                var element_1 = this._rootElement;
                if (!element_1) {
                    return;
                }
                element_1.setAttribute("data-id", this.props.controlId + "_container");
                var bindOutput_2 = this._onOutputChanged.bind(this);
                var propPersonalizationState_2 = this.props.personalizationState;
                suggestedMitigation = "The third inner catch block";
                this._measureLifecycleMethod("init", function () {
                    return _this._controlInstance.init(generatedPropertyBag, bindOutput_2, propPersonalizationState_2, element_1);
                });
                suggestedMitigation = null;
            }
            var accessibilityData = this._propertyBag.getAccessibilityData();
            if (accessibilityData && accessibilityData.keyboardShortcuts && accessibilityData.keyboardShortcuts.length > 0) {
                var props = {
                    id: this.props.controlId,
                    keyboardShortcuts: accessibilityData.keyboardShortcuts,
                };
                this._accessibilityComponent = this.props.actions.createAccessibilityComponent(props);
            }
            else {
                this._accessibilityComponent = null;
            }
            this._internalStatus = 4;
            if (virtualControl) {
                this.forceUpdate();
            }
            else {
                this._updateControl();
            }
        }
        catch (exception) {
            if (suggestedMitigation) {
                this._logger.logFailureEvent(this.props, errorText ? new Error(errorText) : exception, CUSTOM_CONTROL_INIT, this._parentId, suggestedMitigation);
            }
            this._logger.logFailureEvent(this.props, exception, CUSTOM_CONTROL_INIT, this._parentId, "The outer catch block");
            this._onControlLoadedError(exception);
            var message = "Error occured during initialization of control: " +
                this.props.manifest.CustomControlId +
                ";Message: " +
                exception.message;
            this._setErrorData(message, exception.stack);
            this.setState({
                _status: 0,
            });
            this._destroyStopwatches(exception);
        }
    };
    CustomControlHostRootInternal.prototype._updateControl = function () {
        if (this._skipControlUpdate) {
            this._skipControlUpdate = false;
            return;
        }
        if (!this._isVirtual()) {
            var endWork = CCFPerformanceTracker.trackWork(this._componentName + ".updateControl");
            var generateBag_1;
            var suggestedMitigation = void 0;
            var apiName = void 0;
            try {
                var instance_1 = this._controlInstance;
                generateBag_1 = this._generateBag();
                this._executeAnyOnLoadEventsWhenNeeded();
                this._currentlyRendering = true;
                suggestedMitigation = "instance.updateView failure";
                apiName = CUSTOM_CONTROL_UPDATE_VIEW;
                if (this.props.shouldRender === undefined || this.props.shouldRender) {
                    if (this._shouldHandleDependencyUpdate()) {
                        if (!this._propertyDependencyManager)
                            this._propertyDependencyManager = new PropertyDependencyManager(this.props);
                        this._propertyDependencyManager.handleDependencyUpdate(this.props, this._getOutputSchemaAction, generateBag_1);
                    }
                    this._measureLifecycleMethod("updateView", function () { return instance_1.updateView(generateBag_1); });
                    this._hasUpdateViewBeenCalled = true;
                }
                this._currentlyRendering = false;
            }
            catch (exception) {
                this._currentlyRendering = false;
                this._logger.logFailureEvent(this.props, exception, apiName || CUSTOM_CONTROL_INIT, this._parentId, suggestedMitigation || "Probably failed to generateBag", suggestedMitigation ? undefined : "ControlFramework");
                this._destroyStopwatches(exception);
            }
            endWork();
        }
    };
    CustomControlHostRootInternal.prototype._executeAnyOnLoadEventsWhenNeeded = function () {
        if (this.props.dynamicData && this.props.dynamicData.parameters) {
            for (var paramKey in this.props.dynamicData.parameters) {
                if (this.props.dynamicData.parameters[paramKey] && this.props.dynamicData.parameters[paramKey]) {
                    var wrapper = this.props.dynamicData.parameters[paramKey];
                    var dataSetWrapper = wrapper;
                    if (dataSetWrapper &&
                        dataSetWrapper.getParameterManifestType &&
                        dataSetWrapper.getUpdateFlag &&
                        dataSetWrapper.getParameterManifestType() === ManifestType.Grid &&
                        dataSetWrapper.getUpdateFlag()) {
                        this.props.actions.executeAddOnLoad(wrapper, this.props.contextToken);
                    }
                }
            }
        }
    };
    CustomControlHostRootInternal.prototype._disposeControl = function () {
        var _this = this;
        var _a, _b;
        var suggestedMitigation;
        try {
            this._clearAllDOMComponents();
            suggestedMitigation = "Custom control failed to destroy";
            if (this._internalWorkPromiseResolve && !this._outputChangedInternalInProgress) {
                this._onOutputChangedInternal();
            }
            this._measureLifecycleMethod("destroy", function () { return _this._controlInstance.destroy(); });
            if ((_b = (_a = XrmProxy === null || XrmProxy === void 0 ? void 0 : XrmProxy.Utils) === null || _a === void 0 ? void 0 : _a.isFeatureEnabled) === null || _b === void 0 ? void 0 : _b.call(_a, CLEAR_CONTROLINSTANCE_PROPERTIES)) {
                for (var controlProperty in this._controlInstance) {
                    if (this._controlInstance.hasOwnProperty(controlProperty)) {
                        this._controlInstance[controlProperty] = undefined;
                    }
                }
            }
        }
        catch (exception) {
            this._logger.logFailureEvent(this.props, exception, CUSTOM_CONTROL_DISPOSE, this._parentId, suggestedMitigation || "Probably failed to clearAllDOMComponents", suggestedMitigation ? undefined : "ControlFramework");
            this._destroyStopwatches(exception);
        }
    };
    CustomControlHostRootInternal.prototype._onControlLoadedError = function (error) {
        if (error === void 0) { error = null; }
        if (this.props.parentDefinedControlProps && this.props.parentDefinedControlProps.onControlLoadedError) {
            this.props.parentDefinedControlProps.onControlLoadedError(error);
        }
    };
    CustomControlHostRootInternal.prototype._onOutputChanged = function (doNotAlertSystem) {
        var _this = this;
        if (doNotAlertSystem === void 0) { doNotAlertSystem = false; }
        if (this._outputChangedDebouncer !== -1 && !doNotAlertSystem) {
            window.clearTimeout(this._outputChangedDebouncer);
        }
        if (this._internalStatus === 5) {
            this._logger.logUsageOutputChanged(this.props);
            return;
        }
        if (this._internalPendingUnsentUpdates && !doNotAlertSystem) {
            this._onOutputChangedInternal();
            return;
        }
        var callback = this._onOutputChangedInternal.bind(this);
        if (this.props.actions.registerOngoingWork && !this._internalWorkPromiseResolve) {
            this.props.actions.registerOngoingWork(new Promise(function (resolve) {
                _this._internalWorkPromiseResolve = resolve;
            }), doNotAlertSystem ? callback : null, this.props.id, this._attributesAffected);
        }
        doNotAlertSystem
            ? (this._internalPendingUnsentUpdates = true)
            : (this._outputChangedDebouncer = window.setTimeout(callback, 100));
    };
    CustomControlHostRootInternal.prototype._onOutputChangedInternal = function () {
        var _this = this;
        this._outputChangedDebouncer = -1;
        this._outputChangedInternalInProgress = true;
        var updatePromise;
        var manifestDefinition;
        try {
            if (this._internalStatus !== 5) {
                var outputs_1;
                this._measureLifecycleMethod("getOutputs", function () { return (outputs_1 = _this._controlInstance.getOutputs()); });
                this._latestOutputs = outputs_1;
                var formattedOutputs = {};
                var _loop_1 = function (key) {
                    manifestDefinition = this_1.props.manifest.Properties
                        .Properties[key];
                    if (!manifestDefinition && this_1.props.manifest.Properties.Properties instanceof Array) {
                        manifestDefinition = this_1.props.manifest.Properties.Properties.find(function (value) { return value.Name === key; });
                    }
                    if (manifestDefinition) {
                        var config = this_1.props.configuration.Parameters[key];
                        var dynamic = this_1.props.dynamicData.parameters[key];
                        var parameter = void 0;
                        if (dynamic.getLatestData) {
                            parameter = dynamic.getLatestData();
                        }
                        else {
                            parameter = dynamic;
                        }
                        var newOutput = {
                            value: outputs_1[key],
                            type: manifestDefinition.Usage,
                            paramType: parameter.type,
                        };
                        if (manifestDefinition.Usage === 0 &&
                            config &&
                            config.Usage === 3) {
                            var falseBoundConfig = config;
                            if (parameter.type === ManifestType.LookupSimple ||
                                parameter.type === ManifestType.LookupCustomer ||
                                parameter.type === ManifestType.LookupOwner ||
                                parameter.type === ManifestType.LookupPartyList ||
                                parameter.type === ManifestType.LookupRegarding) {
                                falseBoundConfig.Callback(this_1._convertValueToSdkFormat(newOutput));
                            }
                            else {
                                falseBoundConfig.Callback(outputs_1[key]);
                            }
                        }
                        else if (manifestDefinition.Usage === 0 ||
                            manifestDefinition.Usage === 2) {
                            if (parameter.attributes && parameter.attributes.LogicalName) {
                                newOutput.fieldName = parameter.attributes.LogicalName;
                            }
                            if (parameter.type === ManifestType.LookupSimple ||
                                parameter.type === ManifestType.LookupCustomer ||
                                parameter.type === ManifestType.LookupOwner ||
                                parameter.type === ManifestType.LookupPartyList ||
                                parameter.type === ManifestType.LookupRegarding) {
                                newOutput.value = this_1._convertValueToSdkFormat(newOutput);
                            }
                            formattedOutputs[key] = newOutput;
                        }
                    }
                };
                var this_1 = this;
                for (var key in outputs_1) {
                    _loop_1(key);
                }
                var entityTypeName = this.props.formInfo ? this.props.formInfo.EntityName : null;
                var recordId = this.props.formInfo ? this.props.formInfo.RecordId : null;
                var closestControlParentWithSave = this.props.parentDefinedControlProps && this.props.parentDefinedControlProps.closestParentWithContext;
                updatePromise = this.props.actions.updateOutputs(this.props.id, entityTypeName, recordId, this.props.controlId, closestControlParentWithSave, formattedOutputs, this.props.contextToken);
            }
        }
        catch (exception) {
            this._logger.logFailureEvent(this.props, exception, CUSTOM_CONTROL_UPDATE_OUTPUTS, this._parentId, "The outer catch block");
            this._destroyStopwatches(exception);
        }
        finally {
            this._outputChangedInternalInProgress = false;
            if (this._internalWorkPromiseResolve) {
                if (updatePromise) {
                    updatePromise.then(function () {
                        _this._internalWorkPromiseResolve(true);
                        _this._internalWorkPromiseResolve = null;
                        _this._internalPendingUnsentUpdates = false;
                    }, function () {
                        _this._internalWorkPromiseResolve(true);
                        _this._internalWorkPromiseResolve = null;
                        _this._internalPendingUnsentUpdates = false;
                    });
                }
                else {
                    this._internalWorkPromiseResolve(true);
                    this._internalWorkPromiseResolve = null;
                    this._internalPendingUnsentUpdates = false;
                }
            }
        }
    };
    CustomControlHostRootInternal.prototype._convertValueToSdkFormat = function (output) {
        var formattedOutput = [];
        if (CCFUtilities.IsNullOrUndefined(output) || CCFUtilities.IsNullOrUndefined(output.value)) {
            return formattedOutput;
        }
        if (Array.isArray(output.value)) {
            var outputValues = output.value;
            for (var _i = 0, outputValues_1 = outputValues; _i < outputValues_1.length; _i++) {
                var outputValue = outputValues_1[_i];
                formattedOutput.push(new CustomControlEntityReference(outputValue.entityName || outputValue.entityType, outputValue.id, outputValue.name));
            }
        }
        else {
            formattedOutput.push(new CustomControlEntityReference(output.value.entityName || output.value.entityType, output.value.id, output.value.name));
        }
        return formattedOutput;
    };
    CustomControlHostRootInternal.prototype._getAllocatedHeight = function () {
        if (this._seeMoreHelper.shouldGivePoppedOutDimensions(this._isVirtual())) {
            var seeMorePopupInfo = this._seeMoreHelper.getSeeMorePopupInfo();
            return seeMorePopupInfo.endHeightInner;
        }
        return this.props.parentDefinedControlProps &&
            !CCFUtilities.IsNullOrUndefined(this.props.parentDefinedControlProps.height)
            ? this.props.parentDefinedControlProps.height
            : CCFUtilities.IsNullOrUndefined(this._internalState._latestHeight)
                ? -1
                : this._internalState._latestHeight;
    };
    CustomControlHostRootInternal.prototype._getAllocatedWidth = function () {
        if (this._seeMoreHelper.shouldGivePoppedOutDimensions(this._isVirtual())) {
            var seeMorePopupInfo = this._seeMoreHelper.getSeeMorePopupInfo();
            return seeMorePopupInfo.endWidthInner;
        }
        return this.props.parentDefinedControlProps &&
            !CCFUtilities.IsNullOrUndefined(this.props.parentDefinedControlProps.width)
            ? this.props.parentDefinedControlProps.width
            : CCFUtilities.IsNullOrUndefined(this._internalState._latestWidth)
                ? -1
                : this._internalState._latestWidth;
    };
    CustomControlHostRootInternal.prototype._generateHostDataForPropertyBag = function () {
        var data = this._generateHostData();
        if (data.updatedProperties !== this._updateInternalTracker) {
            data.updatedProperties = this._updateInternalTracker;
            if (this._updateInternalTracker.length > 0) {
                this._updateInternalTracker = [];
            }
        }
        return data;
    };
    CustomControlHostRootInternal.prototype._generateBag = function () {
        var oldupdateInternalTrackerLen = this._updateInternalTracker.length;
        var generateBag = this._propertyBag.generateBag(this.props, this._generateHostDataForPropertyBag());
        if (this._datasetObjectWrappers) {
            for (var key in this._datasetObjectWrappers) {
                var dataset = this._datasetObjectWrappers[key].getDataSet();
                if (this._memoizedDataSet[key] !== dataset) {
                    this._memoizedDataSetPropertyParameters[key] = Object.assign({}, generateBag.parameters[key], dataset);
                    this._memoizedDataSet[key] = dataset;
                }
                generateBag.parameters[key] = this._memoizedDataSetPropertyParameters[key];
            }
        }
        generateBag.parameters;
        if (this._updateInternalTracker.length !== oldupdateInternalTrackerLen) {
            this._updateInternalTracker = [];
        }
        return generateBag;
    };
    CustomControlHostRootInternal.prototype._seeMorePopup = function (value, seeMoreData) {
        var autosize = false;
        if (seeMoreData) {
            if (typeof seeMoreData === "boolean") {
                autosize = seeMoreData;
            }
            else {
                autosize = !!seeMoreData.autosize;
                this._seeMoreData = seeMoreData;
            }
        }
        switch (this._seeMoreHelper.getSeeMorePopupStatus()) {
            case SeeMoreStatus.NotInUse:
                if (!value)
                    return;
                this._updateInternalTracker.push(PropertyConstants.FULLSCREEN_OPEN_PROPERTY);
                break;
            case SeeMoreStatus.PoppedOut:
                if (value)
                    return;
                this._updateInternalTracker.push(PropertyConstants.FULLSCREEN_CLOSE_PROPERTY);
                break;
        }
        if (this.props.parentDefinedControlProps && this.props.parentDefinedControlProps.alertParentInSeeMore) {
            this.props.parentDefinedControlProps.alertParentInSeeMore(value);
        }
        var isRTL = this.props.propBagData && this.props.propBagData.clientData ? this.props.propBagData.clientData.isRTL : null;
        this._seeMoreHelper.seeMorePopup(this._getComponent(), this._seeMoreCallback.bind(this), value, autosize, isRTL, this.props.zIndexOverride, this.props.rootBodyElement);
    };
    CustomControlHostRootInternal.prototype._generateHostData = function () {
        if (!this._constantHostData) {
            this._constantHostData = {
                allocatedHeight: -1,
                allocatedWidth: -1,
                trackResize: this._updateTrackResize.bind(this),
                updateFullscreen: this._seeMorePopup.bind(this),
                ignoreUpdates: this._updateSelfUpdateIgnore.bind(this),
                updatedProperties: [],
                isInSeeMoreMode: false,
                isInTopMostSeeMore: false,
                updateDescendantSeeMore: this._descendantSeeMoreUpdate.bind(this),
            };
        }
        this._constantHostData.isInSeeMoreMode =
            this._seeMoreHelper.getSeeMorePopupStatus() !== SeeMoreStatus.NotInUse ||
                (this.props.parentDefinedControlProps && this.props.parentDefinedControlProps.parentInSeeMoreMode);
        this._constantHostData.isInTopMostSeeMore = this._constantHostData.isInSeeMoreMode && !this._descendantInSeeMore;
        if (!this._trackingDimensions) {
            return this._constantHostData;
        }
        return Object.assign({}, this._constantHostData, {
            allocatedHeight: this._getAllocatedHeight(),
            allocatedWidth: this._getAllocatedWidth(),
        });
    };
    CustomControlHostRootInternal.prototype._getComponent = function () {
        return this._rootElement
            ? this._rootElement
            : this._internalStatus === 5
                ? null
                : ReactDOM.findDOMNode(this);
    };
    CustomControlHostRootInternal.prototype._updateDimensions = function (width) {
        if (this.props.inactive) {
            return;
        }
        if (this._trackingDimensions && width !== this._internalState._latestWidth) {
            this._internalState = Object.assign(this._internalState, {
                _latestWidth: width,
            });
            this._updateInternalTracker.push(PropertyConstants.LAYOUT_PROPERTY);
            if (this._resolveWidth) {
                this._resolveWidth();
                this._resolveWidth = null;
            }
            this._forceUpdate();
        }
    };
    CustomControlHostRootInternal.prototype.componentWillUnmount = function () {
        var stop;
        try {
            stop = CCFPerformanceTracker.createPerformanceEvent("CustomControlHostRoot.componentWillUnmount", this.props.logLevel).startStopwatch({
                controlId: this.props.controlId,
                manifestControlName: this.props.manifest && this.props.manifest.CustomControlId,
                parentId: this._parentId,
                level: 2..toString(),
            });
            if (this._commandingWrapper) {
                this._commandingWrapper.unmount();
            }
            if (this._internalStatus === 4) {
                this._disposeControl();
            }
            if (this._subscriber) {
                MeasuringHandler.getInstance().removeMeasuringSubscribers(this._subscriber);
            }
            if (this._memoHelper) {
                this._memoHelper.destroy();
            }
            if (this._seeMoreHelper) {
                this._seeMoreHelper.destroy();
            }
            this._disposeParameters();
            this._internalStatus = 5;
            stop();
        }
        catch (exception) {
            this._logger.logFailureEvent(this.props, exception, CUSTOM_CONTROL_WILL_UNMOUNT, this._parentId, null, "ControlFramework");
            stop === null || stop === void 0 ? void 0 : stop({ exception: (exception === null || exception === void 0 ? void 0 : exception.message) || "UnexpectedError" });
            throw exception;
        }
    };
    CustomControlHostRootInternal.prototype._disposeParameters = function () {
        var _a;
        if ((_a = this.props.dynamicData) === null || _a === void 0 ? void 0 : _a.parameters) {
            for (var paramKey in this.props.dynamicData.parameters) {
                var wrapper = this.props.dynamicData.parameters[paramKey];
                if (isDisposable(wrapper)) {
                    wrapper.destroy();
                }
            }
        }
    };
    CustomControlHostRootInternal.prototype.componentDidMount = function () {
        var _this = this;
        var stop;
        try {
            stop = CCFPerformanceTracker.createPerformanceEvent("CustomControlHostRoot.componentDidMount", this.props.logLevel).startStopwatch({
                controlId: this.props.controlId,
                manifestControlName: this.props.manifest && this.props.manifest.CustomControlId,
                parentId: this._parentId,
                level: 2..toString(),
            });
            if (this.props.stateToPropsMappingError ||
                this._manifestRetrieveFailed ||
                this.state._status === 0) {
                if (this.state._status !== 0) {
                    var error = new Error("Error while mapping state to props during ComponentDidMount for control: " +
                        this.props.controlId +
                        (this.props.stateToPropsMappingErrorMessage
                            ? ". Error message:" + this.props.stateToPropsMappingErrorMessage
                            : "."));
                    this._logger.logFailureEvent(this.props, error, CUSTOM_CONTROL_DID_MOUNT, this._parentId);
                    this._onControlLoadedError();
                    this._setErrorData("Error while mapping state to props during ComponentDidMount for control: " + this.props.controlId);
                    this.setState({
                        _status: 0,
                    });
                }
                return;
            }
            this._populateAttributesAffected();
            var customControlId_1 = this.props.configuration.CustomControlId;
            if (this._shouldUpdateManifest(customControlId_1, this.props.controlId)) {
                updateManifestFallback(customControlId_1, KNOWN_REPLACEMENT_CONTROLS[customControlId_1].newControlName());
                return;
            }
            if (!this.props.manifest) {
                if (!this._manifestRequestedOnce) {
                    this._loadManifest().catch(function (err) {
                        if (KNOWN_FALLBACK_CONTROLS.hasOwnProperty(customControlId_1)) {
                            _this._manifestRequestedOnce = false;
                            updateManifestFallback(customControlId_1, KNOWN_FALLBACK_CONTROLS[customControlId_1]);
                            return;
                        }
                        _this._onControlLoadedError(err);
                        _this._manifestRetrieveFailed = true;
                        _this._logger.logFailureEvent(_this.props, err, CUSTOM_CONTROL_DID_MOUNT, _this._parentId, "Error while retrieving manifest during ComponentDidMount for control:" + _this.props.controlId);
                        _this._setErrorData("Error while retrieving manifest during ComponentDidMount for control: " + _this.props.controlId);
                        _this.setState({
                            _status: 0,
                        });
                    });
                }
                return;
            }
            switch (this._internalStatus) {
                case 0:
                    this._initializeData();
                    break;
                case 2:
                    this._initializeControl();
                    break;
                case 4:
                    this._updateControl();
                    break;
                default:
                    break;
            }
            stop();
        }
        catch (exception) {
            this._logger.logFailureEvent(this.props, exception, CUSTOM_CONTROL_DID_MOUNT, this._parentId, null, "ControlFramework");
            stop === null || stop === void 0 ? void 0 : stop({ exception: (exception === null || exception === void 0 ? void 0 : exception.message) || "UnexpectedError" });
            throw exception;
        }
    };
    CustomControlHostRootInternal.prototype._shouldUpdateManifest = function (customControlId, controlId) {
        var _a, _b;
        if (this._manifestRequestedOnce ||
            this._isKnownExceptionControl(controlId) ||
            this.props.pageType === "Dashboard") {
            return false;
        }
        var replacementControl = KNOWN_REPLACEMENT_CONTROLS[customControlId];
        if (!replacementControl) {
            return false;
        }
        return (!replacementControl.enabled ||
            replacementControl.enabled(this.props.contextString, (_b = (_a = this.props.propBagData) === null || _a === void 0 ? void 0 : _a.clientData) === null || _b === void 0 ? void 0 : _b.orgSettingsData));
    };
    CustomControlHostRootInternal.prototype._isKnownExceptionControl = function (controlId) {
        for (var _i = 0, KNOWN_EXCEPTION_CONTROL_IDS_1 = KNOWN_EXCEPTION_CONTROL_IDS; _i < KNOWN_EXCEPTION_CONTROL_IDS_1.length; _i++) {
            var knownExceptionId = KNOWN_EXCEPTION_CONTROL_IDS_1[_i];
            if (controlId === knownExceptionId) {
                return true;
            }
            if (knownExceptionId.indexOf("[RANDOM_GUID]") !== -1) {
                var result = controlId.match(new RegExp("^" + knownExceptionId
                    .split("[RANDOM_GUID]")
                    .map(function (x) { return escapeRegExp(x); })
                    .join(GUID_REGEX) + "$"));
                if (result !== null) {
                    return true;
                }
            }
            if (knownExceptionId.indexOf("[RANDOM_ID]") !== -1) {
                var result = controlId.match(new RegExp("^" + knownExceptionId
                    .split("[RANDOM_ID]")
                    .map(function (x) { return escapeRegExp(x); })
                    .join(ID_REGEX) + "$"));
                if (result !== null) {
                    return true;
                }
            }
        }
        return false;
    };
    CustomControlHostRootInternal.prototype._populateAttributesAffected = function () {
        for (var paramkey in this.props.configuration.Parameters) {
            var param = this.props.configuration.Parameters[paramkey];
            if (!param.hasOwnProperty("Usage"))
                continue;
            if (param.Usage ===
                0) {
                this._attributesAffected.push(param.Value);
            }
        }
    };
    CustomControlHostRootInternal.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.stateToPropsMappingError ||
            this._manifestRetrieveFailed ||
            this.state._status === 0) {
            if (this.state._status !== 0) {
                var error = new Error("Error before mapping state to props during componentWillReceiveProps for control: " +
                    nextProps.controlId +
                    (nextProps.stateToPropsMappingErrorMessage
                        ? ". Error message:" + nextProps.stateToPropsMappingErrorMessage
                        : "."));
                this._logger.logFailureEvent(nextProps, error, CUSTOM_CONTROL_WILL_RECEIVE_PROPS, this._parentId);
                this._onControlLoadedError();
                this._setErrorData("Error before mapping state to props during componentWillReceiveProps for control: " + nextProps.controlId);
                this.setState({
                    _status: 0,
                });
            }
        }
        this._updateInternalTracker = this._updateInternalTracker.concat(nextProps.updatedProperties);
    };
    CustomControlHostRootInternal.prototype.componentDidUpdate = function () {
        var _this = this;
        try {
            if (this.props.stateToPropsMappingError ||
                this._manifestRetrieveFailed ||
                this.state._status === 0) {
                if (this.state._status !== 0) {
                    this._logger.logFailureEvent(this.props, new Error("Error while mapping state to props during ComponentDidUpdate for control: " + this.props.controlId), CUSTOM_CONTROL_DID_UPDATE, this._parentId);
                    this._setErrorData("Error while mapping state to props during ComponentDidUpdate for control: " + this.props.controlId);
                    this._onControlLoadedError();
                    this.setState({
                        _status: 0,
                    });
                }
                return;
            }
            if (this._seeMoreHelper.getSeeMorePopupStatus() !== SeeMoreStatus.NotInUse) {
                this._seeMoreHelper.checkOnPopupStatus(this._isVirtual(), this._memoHelper.getIsCompositing(), this._getComponent());
            }
            if (!this.props.manifest) {
                if (!this._manifestRequestedOnce) {
                    this._loadManifest().catch(function (err) {
                        _this._logger.logFailureEvent(_this.props, err, CUSTOM_CONTROL_DID_UPDATE, _this._parentId);
                        _this._setErrorData("Error while retrieving manifest during ComponentDidUpdate for control: " + _this.props.controlId);
                        _this._manifestRetrieveFailed = true;
                        _this._onControlLoadedError(err);
                        _this.setState({
                            _status: 0,
                        });
                    });
                }
                return;
            }
            this._initDataSetObjectWrapper();
            switch (this._internalStatus) {
                case 0:
                    this._initializeData();
                    break;
                case 2:
                    this._initializeControl();
                    break;
                case 4:
                    this._updateControl();
                    break;
                default:
                    break;
            }
            this._registerToLearningPath();
        }
        catch (exception) {
            this._logger.logFailureEvent(this.props, exception, CUSTOM_CONTROL_DID_UPDATE, this._parentId, null, "ControlFramework");
            throw exception;
        }
    };
    CustomControlHostRootInternal.prototype._registerToLearningPath = function () {
        if (this._internalStatus === 4 && this._propertyBag) {
            var learningPathBag = this._propertyBag.getLearningPathBag();
            LearningPathHelper.registerToLearningPath(this._getComponent(), learningPathBag.DOMAttributeName, learningPathBag.baseControlId);
        }
    };
    CustomControlHostRootInternal.prototype._shouldComponentUpdateInternal = function (nextProps) {
        var _a, _b, _c, _d, _e;
        var preventUnnecessaryRenders = canPreventUnnecessaryRenders((_a = nextProps.manifest) === null || _a === void 0 ? void 0 : _a.ConstructorName, (_b = nextProps.manifest) === null || _b === void 0 ? void 0 : _b.SolutionVersion);
        if (preventUnnecessaryRenders) {
            if (!this._hasUpdateViewBeenCalled) {
                return true;
            }
            if (hasDescriptorOrConfigurationChanged(this.props.descriptor, nextProps.descriptor) ||
                hasDescriptorOrConfigurationChanged(this.props.configuration, nextProps.configuration)) {
                return true;
            }
            if (((_c = nextProps.dynamicData) === null || _c === void 0 ? void 0 : _c.updated) && (!this._ignoreSelfUpdates || !this._latestOutputs)) {
                return true;
            }
            if (((_d = this.props.dynamicData) === null || _d === void 0 ? void 0 : _d.parameters) !== ((_e = nextProps.dynamicData) === null || _e === void 0 ? void 0 : _e.parameters)) {
                return true;
            }
            if ((this._commandingWrapper &&
                _haveCommandManagerIdsChanged(this.props.internalCommandManagerIds, nextProps.internalCommandManagerIds)) ||
                !!this.props.globalCommandManagerInitialized !== !!nextProps.globalCommandManagerInitialized) {
                return true;
            }
            return false;
        }
        return undefined;
    };
    CustomControlHostRootInternal.prototype.shouldComponentUpdate = function (nextProps) {
        var _a, _b, _c;
        try {
            if (nextProps.inactive) {
                this._necessaryRenderSkipped = this._shouldComponentUpdateInternal(nextProps);
                return false;
            }
            else if (this._necessaryRenderSkipped) {
                this._necessaryRenderSkipped = false;
                return true;
            }
            var shouldUpdate = this._shouldComponentUpdateInternal(nextProps);
            var useLegacyPropChangeChecks = shouldUpdate === undefined;
            if (shouldUpdate) {
                return true;
            }
            else if (useLegacyPropChangeChecks &&
                (!this._ignoreSelfUpdates || !this._latestOutputs || !((_a = nextProps.dynamicData) === null || _a === void 0 ? void 0 : _a.updated))) {
                return true;
            }
            if (nextProps.updatedProperties) {
                for (var _i = 0, _d = nextProps.updatedProperties; _i < _d.length; _i++) {
                    var key = _d[_i];
                    if (key !== PropertyConstants.PARAMETERS && !((_b = nextProps.dynamicData) === null || _b === void 0 ? void 0 : _b.parameters.hasOwnProperty(key))) {
                        return true;
                    }
                }
            }
            if (nextProps.dynamicData) {
                for (var paramKey in nextProps.dynamicData.parameters) {
                    if (!nextProps.dynamicData.parameters[paramKey] ||
                        !nextProps.dynamicData.parameters[paramKey].hasOwnProperty("raw")) {
                        continue;
                    }
                    if (useLegacyPropChangeChecks &&
                        this._ignoreSelfUpdates &&
                        this._latestOutputs &&
                        this._latestOutputs.hasOwnProperty(paramKey)) {
                        continue;
                    }
                    if (!this._latestOutputs || !this._latestOutputs.hasOwnProperty(paramKey)) {
                        if (((_c = this.props.dynamicData) === null || _c === void 0 ? void 0 : _c.parameters) &&
                            this.props.dynamicData.parameters[paramKey] &&
                            this.props.dynamicData.parameters[paramKey] !== nextProps.dynamicData.parameters[paramKey]) {
                            return true;
                        }
                        continue;
                    }
                    var rawVal = nextProps.dynamicData.parameters[paramKey].raw;
                    var rawValHasEquals = !CCFUtilities.IsNullOrUndefined(rawVal) && rawVal.equals;
                    if (rawValHasEquals ? !rawVal.equals(this._latestOutputs[paramKey]) : rawVal !== this._latestOutputs[paramKey]) {
                        return true;
                    }
                }
            }
            return false;
        }
        catch (exception) {
            this._logger.logFailureEvent(this.props, exception, CUSTOM_CONTROL_SHOULD_UPDATE, this._parentId, null, "ControlFramework");
            throw exception;
        }
    };
    CustomControlHostRootInternal.prototype._renderMainControlComponent = function () {
        var generateBag;
        var currentOperation;
        var failureType;
        try {
            if (this._internalStatus === 4 && this._isVirtual()) {
                if (this._skipControlUpdate) {
                    this._skipControlUpdate = false;
                    this._currentlyRendering = false;
                    return this._memoHelper.getRoot();
                }
                var virtualControl_1;
                var element = void 0;
                var instance_2 = this._controlInstance;
                this._executeAnyOnLoadEventsWhenNeeded();
                generateBag = this._generateBag();
                if (this.props.shouldRender === undefined || this.props.shouldRender) {
                    currentOperation = "render";
                    if (this._shouldHandleDependencyUpdate()) {
                        if (!this._propertyDependencyManager)
                            this._propertyDependencyManager = new PropertyDependencyManager(this.props);
                        this._propertyDependencyManager.handleDependencyUpdate(this.props, this._getOutputSchemaAction, generateBag);
                    }
                    this._measureLifecycleMethod("updateView", function () {
                        virtualControl_1 = instance_2.updateView(generateBag);
                        if (virtualControl_1 && !virtualControl_1.IsVirtualComponent && React.isValidElement(virtualControl_1)) {
                            virtualControl_1 = generateBag.factory.createElement("CONTAINER", {
                                id: "pcf-container-id",
                                style: {
                                    width: "100%",
                                },
                            }, virtualControl_1);
                        }
                        return virtualControl_1;
                    });
                    this._hasUpdateViewBeenCalled = true;
                    this._currentlyRendering = false;
                    currentOperation = "renderVirtualComponent";
                    failureType = "ControlFramework";
                    element = VirtualComponentTranslator.renderVirtualComponent(virtualControl_1, this.props, this._generateHostData(), this._memoHelper);
                    if (this.props.generateStylingWrapperElement) {
                        element = this.props.generateStylingWrapperElement(element);
                    }
                    this._memoHelper.setRoot(element);
                    return element;
                }
                else if (this._memoHelper.getRoot()) {
                    element = this._memoHelper.getRoot();
                    return element;
                }
            }
            this._currentlyRendering = false;
            var standardStyle = { width: "100%" };
            return this._renderGenericDiv(standardStyle);
        }
        catch (exception) {
            this._logger.logFailureEvent(this.props, exception, CUSTOM_CONTROL_RENDER_MAIN_COMPONENT, this._parentId, null, currentOperation ? failureType : "ControlFramework");
            this._destroyStopwatches(exception);
            if (currentOperation) {
                this._setErrorData("Custom Control with Id: " + this.props.manifest.CustomControlId + " failed to " + currentOperation + "; Message: " + exception.message, exception.stack);
                return this._getErrorElement();
            }
            throw exception;
        }
    };
    CustomControlHostRootInternal.prototype.renderShadow = function (domId, style) {
        style = style || { display: "none" };
        return React.createElement("div", { key: "shadow", id: domId ? domId + "shadow" : null, style: style });
    };
    CustomControlHostRootInternal.prototype._getErrorElement = function () {
        var errorDataId = this.props.controlId + "_container_error";
        return (React.createElement("div", { className: "customControl inError", "data-id": errorDataId },
            React.createElement("a", { href: "#", onClick: this._handleErrorLinkClick.bind(this) }, getLocalizedString("ERROR_LOADING_CONTROL"))));
    };
    CustomControlHostRootInternal.prototype._setErrorData = function (exceptionMessage, stack) {
        if (exceptionMessage || stack) {
            this._errorData.errorMessage = exceptionMessage;
            this._errorData.errorDetails = stack;
        }
    };
    CustomControlHostRootInternal.prototype._shouldHandleDependencyUpdate = function () {
        return this._controlInstance && this._controlInstance.getOutputSchema && this.props.authoringMode;
    };
    CustomControlHostRootInternal.prototype.renderWrappedMainElement = function (domId, innerStyle) {
        var domIdDivStyleProperties = innerStyle ||
            (this.props.parentDefinedControlProps && this.props.parentDefinedControlProps.containerStyleOverrides
                ? Object.assign(this._getDomIdDivStyleProperties(this.props.descriptor), this.props.parentDefinedControlProps.containerStyleOverrides.allContainers, this.props.parentDefinedControlProps.containerStyleOverrides.primaryInnerContainer)
                : this._getDomIdDivStyleProperties(this.props.descriptor));
        var isVirtual = this._isVirtual();
        var isCompositing = this._memoHelper.getIsCompositing();
        var hiddenCommandManagers = this._renderCommandingComponent();
        var isRTL = this.props.propBagData === null ? null : this.props.propBagData.clientData.isRTL;
        this.props.globalCommandManagerInitialized && this._globalCommandManagerPromise.resolve();
        return (React.createElement(View, { key: "mainControlContainer", id: domId, style: domIdDivStyleProperties },
            hiddenCommandManagers,
            this._accessibilityComponent,
            this._seeMoreHelper.renderCloseButton(this._seeMorePopup.bind(this, false), isVirtual, isCompositing, isRTL, this.props.useUnicodeIconsInternally),
            this._seeMoreHelper.renderSpacer(isVirtual, isCompositing),
            this._renderMainControlComponent()));
    };
    CustomControlHostRootInternal.prototype.renderContainerWithResizePads = function (mainElement, outerStyle, domId) {
        var outerStyleAdj = outerStyle ||
            (this.props.parentDefinedControlProps && this.props.parentDefinedControlProps.containerStyleOverrides
                ? Object.assign({ width: "100%" }, this.props.parentDefinedControlProps.containerStyleOverrides.allContainers, this.props.parentDefinedControlProps.containerStyleOverrides.outerContainer)
                : { width: "100%" });
        var mySeeMoreActive = this._seeMoreHelper && this._seeMoreHelper.getSeeMorePopupStatus() !== SeeMoreStatus.NotInUse;
        var role = mySeeMoreActive ? "dialog" : null;
        var modal = mySeeMoreActive ? true : null;
        var containerId = this._getRandomOuterContainerId(domId);
        var accProps = {
            key: "seeMoreAccessibility",
            id: containerId,
            rootElementId: containerId,
            isModal: modal,
            parentComponent: this,
            shouldManageFocus: true,
            defaultFocusId: containerId,
            overrideFocusId: containerId,
        };
        this._activeSeeMoreAccessibilityComponent = mySeeMoreActive
            ? this._activeSeeMoreAccessibilityComponent || this.props.actions.createAccessibilityComponent(accProps)
            : null;
        return (React.createElement(View, { key: "mainControlOuterContainer", describedByElementId: mySeeMoreActive ? this._getDescribedBySeeMoreId() : null, id: containerId, style: outerStyleAdj, accessibilityModal: modal, role: role },
            this._activeSeeMoreAccessibilityComponent,
            mainElement));
    };
    CustomControlHostRootInternal.prototype._getDescribedBySeeMoreId = function () {
        return this._seeMoreData
            ? this._seeMoreData.ariaDescribedByAbsolute
                ? this._seeMoreData.ariaDescribedBy
                : buildUniqueCustomControlId(this.props, this._seeMoreData.ariaDescribedBy)
            : null;
    };
    CustomControlHostRootInternal.prototype._getRandomOuterContainerId = function (domId) {
        return domId + Math.floor(Math.random() * 10 + 1) + "_outer";
    };
    CustomControlHostRootInternal.prototype._renderGenericDiv = function (style) {
        var _this = this;
        var className = "customControl " + (this.props.manifest ? this.props.manifest.ConstructorName.replace(".", " ") : "");
        if (this.props.manifest && this.props.manifest.ConstructorName) {
            className = className + " " + this.props.manifest.ConstructorName;
        }
        return (React.createElement("div", { key: "MainContainerElement", className: className, style: style, ref: function (input) {
                _this._rootElement = input;
            } }, this._getPopupService().renderPopups()));
    };
    CustomControlHostRootInternal.prototype._renderCommandingComponent = function () {
        if (this.props.internalCommandManagerIds &&
            this.props.internalCommandManagerIds.length &&
            this._commandingWrapper) {
            var commandManagers = [];
            for (var i = 0; i < this.props.internalCommandManagerIds.length; i++) {
                var commandId = this.props.internalCommandManagerIds[i].commandManagerId;
                var ribbonId = this.props.internalCommandManagerIds[i].ribbonId;
                commandManagers.push(this._commandingWrapper.createHiddenCommandManager(commandId, ribbonId));
            }
            return commandManagers;
        }
        return null;
    };
    CustomControlHostRootInternal.prototype._handleErrorLinkClick = function (e) {
        e.preventDefault();
        var errorDialogOptions = {
            message: this._errorData.errorMessage,
            details: this._errorData.errorDetails,
        };
        XrmProxy.openErrorDialog(errorDialogOptions);
    };
    CustomControlHostRootInternal.prototype._renderInternal = function () {
        try {
            this._currentlyRendering = true;
            var domId = "";
            if (this.props.descriptor) {
                domId = this.props.descriptor.DomId ? this.props.descriptor.DomId : "";
            }
            if (this.state._status === 0) {
                this._currentlyRendering = false;
                this._logger.logUsageFailureEvent(this.props);
                this._logger.logFailureEvent(this.props, new Error("Error loading control."), CUSTOM_CONTROL_RENDER, this._parentId, null, null, this._generateAdditionalEventParams());
                return this._getErrorElement();
            }
            if (this._internalStatus === 5) {
                this._currentlyRendering = false;
                return React.createElement("div", null);
            }
            var viewStyle = this.props.parentDefinedControlProps && this.props.parentDefinedControlProps.containerStyleOverrides
                ? Object.assign({ width: "100%" }, this.props.parentDefinedControlProps.containerStyleOverrides.allContainers, this.props.parentDefinedControlProps.containerStyleOverrides.rootContainer)
                : { width: "100%" };
            if (this._internalStatus !== 4) {
                if (this._isVirtual()) {
                    return null;
                }
                this._currentlyRendering = false;
                var mainElement_1 = this.renderWrappedMainElement(domId, null);
                var mainComponent_1 = this.renderContainerWithResizePads(mainElement_1, null, domId);
                var shadow_1 = this.renderShadow(domId, null);
                return (React.createElement(View, { key: "root", style: viewStyle },
                    shadow_1,
                    mainComponent_1));
            }
            var styleBits = { shadowStyle: null, innerStyle: null, outerStyle: null };
            var seeMorePopupStatus = this._seeMoreHelper.getSeeMorePopupStatus();
            var seeMorePopupInfo = this._seeMoreHelper.getSeeMorePopupInfo();
            if (seeMorePopupStatus !== SeeMoreStatus.NotInUse) {
                styleBits = CustomControlAnimationHelper.getCustomControlFancyPopoutStyles((_measuringContextEnabled() ? this.context.rendererContext : this.context), seeMorePopupStatus, seeMorePopupInfo);
                if (seeMorePopupStatus !== SeeMoreStatus.ReturnFadeIn) {
                    viewStyle = {
                        height: seeMorePopupInfo.startHeight,
                        width: seeMorePopupInfo.startWidth,
                    };
                }
            }
            var mainElement = this.renderWrappedMainElement(domId, styleBits.innerStyle);
            if (this._isVirtual() &&
                !this._memoHelper.getIsCompositing() &&
                (seeMorePopupStatus === SeeMoreStatus.NotInUse || seeMorePopupStatus === SeeMoreStatus.ReturnFadeIn)) {
                this._logger.logUsageSuccessEvent(this.props);
                return mainElement;
            }
            var mainComponent = this.renderContainerWithResizePads(mainElement, styleBits.outerStyle, domId);
            var shadow = this.renderShadow(domId, styleBits.shadowStyle);
            this._logger.logUsageSuccessEvent(this.props);
            return (React.createElement(View, { key: "root", style: viewStyle },
                shadow,
                mainComponent));
        }
        catch (exception) {
            this._currentlyRendering = false;
            this._logger.logUsageFailureEvent(this.props);
            this._logger.logFailureEvent(this.props, exception, CUSTOM_CONTROL_RENDER, this._parentId, null);
            return this._getErrorElement();
        }
    };
    CustomControlHostRootInternal.prototype._generateAdditionalEventParams = function () {
        var additionalEventParams = [];
        this._errorData.errorDetails &&
            additionalEventParams.push({
                name: "ErrorDetails",
                value: this._errorData.errorDetails,
            });
        this._errorData.errorMessage &&
            additionalEventParams.push({
                name: "ErrorMessage",
                value: this._errorData.errorMessage,
            });
        return additionalEventParams;
    };
    CustomControlHostRootInternal.prototype.componentDidCatch = function (error) {
        this._setErrorData(error.message, error.stack);
        this.setState({
            _status: 0,
        });
        this._logger.logFailureEvent(this.props, error, CUSTOM_CONTROL_RENDER, this._parentId);
    };
    CustomControlHostRootInternal.prototype.render = function () {
        var _this = this;
        return [
            this._renderInternal(),
            React.createElement(CustomControlPortal, { key: "portal", ref: this._portal, renderReactSubtree: this.props.actions.renderReactSubtree, onError: function (e) { return _this._logger.logFailureEvent(_this.props, e, CUSTOM_CONTROL_BIND_DOMELEMENT, _this._parentId); } }),
        ];
    };
    CustomControlHostRootInternal.displayName = "CustomControlHost";
    return CustomControlHostRootInternal;
}(React.Component));
CustomControlHostRootInternal.contextType =
    _measuringContextEnabled() ? CustomControlContext : RendererContext;
var CustomControlHostRoot = (function (_super) {
    __extends(CustomControlHostRoot, _super);
    function CustomControlHostRoot() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CustomControlHostRoot.prototype.render = function () {
        if (_measuringContextEnabled()) {
            return (React.createElement(ProvideCustomControlContext, null,
                React.createElement(CustomControlHostRootInternal, __assign({}, this.props))));
        }
        return React.createElement(CustomControlHostRootInternal, __assign({}, this.props));
    };
    return CustomControlHostRoot;
}(React.Component));
function _measuringContextEnabled() {
    var _a, _b;
    return (_b = (_a = XrmProxy === null || XrmProxy === void 0 ? void 0 : XrmProxy.Utils) === null || _a === void 0 ? void 0 : _a.isFeatureEnabled) === null || _b === void 0 ? void 0 : _b.call(_a, "ReactInstancePageCaching");
}
function _haveCommandManagerIdsChanged(prevIds, nextIds) {
    if ((prevIds && !nextIds) || (!prevIds && nextIds)) {
        return true;
    }
    if (prevIds !== nextIds && prevIds && nextIds) {
        if (prevIds.length !== nextIds.length) {
            return true;
        }
        for (var i = 0; i < prevIds.length; i++) {
            var _a = prevIds[i], prevCommandManagerId = _a.commandManagerId, prevRibbonId = _a.ribbonId;
            var _b = nextIds[i], nextCommandManagerId = _b.commandManagerId, nextRibbonId = _b.ribbonId;
            if (prevCommandManagerId !== nextCommandManagerId || prevRibbonId !== nextRibbonId) {
                return true;
            }
        }
    }
    return false;
}
function hasDescriptorOrConfigurationChanged(prevDescriptor, nextDescriptor) {
    if (prevDescriptor === nextDescriptor || (!prevDescriptor && !nextDescriptor)) {
        return false;
    }
    if (!prevDescriptor || !nextDescriptor) {
        return true;
    }
    var prevKeys = Object.keys(prevDescriptor);
    if (prevKeys.length !== Object.keys(prevDescriptor).length) {
        return true;
    }
    for (var _i = 0, prevKeys_1 = prevKeys; _i < prevKeys_1.length; _i++) {
        var key = prevKeys_1[_i];
        var prev = prevDescriptor[key];
        var next = nextDescriptor[key];
        if (prev !== next) {
            return true;
        }
    }
    return false;
}
function isDisposable(parameter) {
    return !!(parameter === null || parameter === void 0 ? void 0 : parameter.destroy);
}
export { CustomControlHostRoot, CustomControlHostRootInternal };

import * as ProxyUtils from "./XrmProxyDefaultUtilities";
var XrmProxy = (function () {
    function XrmProxy() {
        this._navigationContext = {
            openAlertDialog: ProxyUtils.openAlertDialog,
            openErrorDialog: ProxyUtils.openErrorDialog,
            openConfirmDialog: ProxyUtils.openConfirmDialog,
            openFile: null,
            openUrl: null,
            openWebResource: null,
            navigateTo: null,
            openDialog: null,
            openForm: null,
            openTaskFlow: null,
        };
        this.UserSettings = {
            userId: "{00000000-0000-0000-0000-000000000000}",
            getTimeZoneOffsetMinutes: ProxyUtils.getTimeZoneOffsetMinutes,
            isHighContrastEnabled: null,
            isRTL: false,
            languageId: 1033,
            locale: "en-US",
            userName: "",
            securityRoles: [],
            pagingLimit: null,
            formatInfoCultureName: "en-US",
            formatInfoCultureId: 1033,
        };
        this.OrgSettings = {
            languageId: null,
            uniqueName: null,
            isAutoSaveEnabled: null,
            attributes: null,
        };
        this.Utils = {
            beginSecureSessionForResource: null,
            getEntityMetadata: null,
            getEntitiesMetadata: null,
            getResourceString: null,
            isFeatureEnabled: null,
            isDisruptiveFeatureEnabled: null,
            lookupObjects: null,
            getEntityName: null,
            getFormId: null,
            canOpenUrl: null,
            getUserSettings: null,
        };
        this.Page = {
            getClientUrl: null,
        };
        this.Reporting = {
            reportSuccess: null,
            reportFailure: null,
            reportEvent: null,
        };
        this.Diagnostics = {
            traceError: null,
            traceWarning: null,
            traceInfo: null,
            traceDebug: null,
            isInMonitorSession: null,
        };
        this.IntelligenceApi = {
            getPredictionSchemaAsync: null,
            predictAsync: null,
            getPreTrainedModelIdAsync: null,
            getLabelsForObjectDetectionModelAsync: null,
            invokeAiModelActionAsync: null,
            invokeGlobalOperationAsync: null,
        };
        this.Client = {
            getClient: ProxyUtils.getClient,
            getClientState: ProxyUtils.getClientState,
            getFormFactor: ProxyUtils.getFormFactor,
        };
        this.GraphApi = {
            sendRequest: null,
        };
        this._applicationUI = {
            addGlobalNotification: null,
            clearGlobalNotification: null,
            clearGlobalNotifications: null,
        };
        this._webApiContext = {
            online: {
                retrieveRecord: null,
                retrieveMultipleRecords: null,
                updateRecord: null,
                createRecord: null,
                deleteRecord: null,
                execute: null,
                executeMultiple: null,
            },
            offline: {
                retrieveRecord: null,
                retrieveMultipleRecords: null,
                updateRecord: null,
                createRecord: null,
                deleteRecord: null,
                execute: null,
                executeMultiple: null,
            },
        };
        this._unifiedWebApiContext = null;
        this.Initialized = false;
    }
    XrmProxy.prototype.setUserSettings = function (userSettings) {
        this.UserSettings = userSettings;
    };
    XrmProxy.prototype.setOrgSettings = function (orgSettings) {
        this.OrgSettings = orgSettings;
    };
    XrmProxy.prototype.setOffline = function (offline) {
        this.Offline = offline;
    };
    XrmProxy.prototype.setUtils = function (utilities) {
        var _this = this;
        var _a;
        this.Utils = utilities;
        this.Utils.getUserSettings = (_a = this.Utils.getUserSettings) !== null && _a !== void 0 ? _a : (function () { return Promise.resolve(_this.UserSettings); });
    };
    XrmProxy.prototype.setPage = function (page) {
        this.Page = page;
    };
    XrmProxy.prototype.setReporting = function (reporting) {
        this.Reporting = reporting;
    };
    XrmProxy.prototype.setIntelligenceApi = function (intelligenceApi) {
        this.IntelligenceApi = intelligenceApi;
    };
    XrmProxy.prototype.setDiagnostics = function (diagnostics) {
        this.Diagnostics = diagnostics;
    };
    XrmProxy.prototype.setClient = function (client) {
        this.Client = client;
    };
    XrmProxy.prototype.setGraphApi = function (graphApi) {
        this.GraphApi = graphApi;
    };
    XrmProxy.prototype.setNavigationContext = function (xrmNavigation) {
        this._navigationContext = xrmNavigation;
    };
    XrmProxy.prototype.setDeviceContext = function (xrmDevice) {
        this._deviceContext = xrmDevice;
    };
    XrmProxy.prototype.setExternalContext = function (xrmExternalContext) {
        this._externalContext = xrmExternalContext;
    };
    XrmProxy.prototype.setApplicationUI = function (applicationUI) {
        this._applicationUI = applicationUI;
    };
    XrmProxy.prototype.setWebApi = function (webApi) {
        this._webApiContext = webApi;
    };
    XrmProxy.prototype.setWebApiUnified = function (webApi) {
        this._unifiedWebApiContext = webApi;
    };
    XrmProxy.prototype.openForm = function (options, parameters, pageId) {
        return this._navigationContext.openForm(options, parameters, pageId);
    };
    XrmProxy.prototype.openUrl = function (url, options, pageId) {
        return this._navigationContext.openUrl(url, options, pageId);
    };
    XrmProxy.prototype.openFile = function (file, options, pageId) {
        return this._navigationContext.openFile(file, options, pageId);
    };
    XrmProxy.prototype.openAlertDialog = function (alertStrings, options, pageId) {
        return this._navigationContext.openAlertDialog(alertStrings, options, pageId);
    };
    XrmProxy.prototype.openConfirmDialog = function (confirmStrings, options, pageId) {
        return this._navigationContext.openConfirmDialog(confirmStrings, options, pageId);
    };
    XrmProxy.prototype.openDialog = function (name, options, parameters, pageId) {
        return this._navigationContext.openDialog(name, options, parameters, pageId);
    };
    XrmProxy.prototype.openErrorDialog = function (options, pageId) {
        return this._navigationContext.openErrorDialog(options, pageId);
    };
    XrmProxy.prototype.openTaskFlow = function (name, options, parameters, pageId) {
        return this._navigationContext.openTaskFlow(name, options, parameters, pageId);
    };
    XrmProxy.prototype.openWebResource = function (name, options, data, pageId) {
        return this._navigationContext.openWebResource(name, options, data, pageId);
    };
    XrmProxy.prototype.navigateTo = function (input, options, pageId) {
        return this._navigationContext.navigateTo(input, options, pageId);
    };
    XrmProxy.prototype.captureImage = function (options) {
        return this._deviceContext.captureImage(options);
    };
    XrmProxy.prototype.captureAudio = function (options) {
        return this._deviceContext.captureAudio(options);
    };
    XrmProxy.prototype.captureVideo = function (options) {
        return this._deviceContext.captureVideo(options);
    };
    XrmProxy.prototype.pickFile = function (options) {
        return this._deviceContext.pickFile(options);
    };
    XrmProxy.prototype.getBarcodeValue = function () {
        return this._deviceContext.getBarcodeValue();
    };
    XrmProxy.prototype.getCurrentPosition = function () {
        return this._deviceContext.getCurrentPosition();
    };
    XrmProxy.prototype.getAvailableExternalContexts = function () {
        return this._externalContext.getAvailableExternalContexts();
    };
    XrmProxy.prototype.getExternalContextProperty = function (externalContextId, externalContextPropertyId, options) {
        return this._externalContext.getExternalContextProperty(externalContextId, externalContextPropertyId, options);
    };
    XrmProxy.prototype.invokeExternalContextAction = function (externalContextId, externalContextActionId, options) {
        return this._externalContext.invokeExternalContextAction(externalContextId, externalContextActionId, options);
    };
    XrmProxy.prototype.removeExternalContextPropertyListener = function (externalContextId, externalContextPropertyId, listener) {
        return this._externalContext.removeExternalContextPropertyListener(externalContextId, externalContextPropertyId, listener);
    };
    XrmProxy.prototype.addGlobalNotification = function (type, level, message, title, action, onCloseHandler) {
        return this._applicationUI.addGlobalNotification(type, level, message, title, action, onCloseHandler);
    };
    XrmProxy.prototype.clearGlobalNotification = function (id) {
        return this._applicationUI.clearGlobalNotification(id);
    };
    XrmProxy.prototype.clearGlobalNotifications = function () {
        return this._applicationUI.clearGlobalNotifications();
    };
    XrmProxy.prototype._getWebApiContext = function () {
        return (this._unifiedWebApiContext ||
            (this.Client.getClientState() === "Offline" ? this._webApiContext.offline : this._webApiContext.online));
    };
    XrmProxy.prototype.retrieveRecord = function (entityType, id, options) {
        return this._getWebApiContext().retrieveRecord(entityType, id, options);
    };
    XrmProxy.prototype.createRecord = function (entityType, data) {
        return this._getWebApiContext().createRecord(entityType, data);
    };
    XrmProxy.prototype.updateRecord = function (entityType, id, data) {
        return this._getWebApiContext().updateRecord(entityType, id, data);
    };
    XrmProxy.prototype.deleteRecord = function (entityType, id) {
        return this._getWebApiContext().deleteRecord(entityType, id);
    };
    XrmProxy.prototype.retrieveMultipleRecords = function (entityType, options, maxPageSize, additionalHeadersFromCaller) {
        return this._getWebApiContext().retrieveMultipleRecords(entityType, options, maxPageSize, additionalHeadersFromCaller);
    };
    XrmProxy.prototype.execute = function (request) {
        return this._getWebApiContext().execute(request);
    };
    XrmProxy.prototype.executeMultiple = function (requests) {
        var context = this._getWebApiContext();
        return context.executeMultiple ? context.executeMultiple(requests) : Promise.resolve(null);
    };
    XrmProxy.prototype.openARViewer = function (options) {
        return this._deviceContext.openARViewer(options);
    };
    return XrmProxy;
}());
var instance = new XrmProxy();
export { XrmProxy, instance };
export default instance;

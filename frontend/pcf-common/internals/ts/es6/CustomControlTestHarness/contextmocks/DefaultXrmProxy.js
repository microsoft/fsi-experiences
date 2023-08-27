import * as ProxyUtils from "../../CustomControls/Utilities/XrmProxyDefaultUtilities";
export var XRMINIT = false;
// Tracked: mock all methods on the XrmProxy that the PCF API depends on
export function InitializeXrm(xrmproxy, xrmObject) {
    var _a;
    if (XRMINIT) {
        return;
    }
    var proxy = xrmproxy || ((_a = window.CustomControls) === null || _a === void 0 ? void 0 : _a.XrmProxy);
    if (!proxy) {
        throw new Error("XrmProxy was not passed and cannot be found on the window");
    }
    if (!xrmObject) {
        xrmObject = MockXrmProxy;
    }
    // Corresponds to Utility interface in the component framework
    proxy.setUtils(xrmObject.Utils);
    // Corresponds to Device interface in the component framework
    proxy.setDeviceContext(xrmObject.Device);
    // Corresponds to Navigation interface in the component framework
    // Using javascript functions such as alert, confirm to mimic some of these APIs for now
    proxy.setNavigationContext(xrmObject.Navigation);
    var webAPI = xrmObject.WebApi;
    proxy.setWebApi({
        offline: webAPI,
        online: webAPI,
    });
    // Reporting and Diagnostics are not part of the interfaces exposed to PCF users.
    // Keep them for now because unsure about the side effects of removval.
    proxy.setReporting(xrmObject.Reporting);
    proxy.setDiagnostics();
    XRMINIT = true;
}
export var MockXrmProxy = {
    Utils: {
        getEntityMetadata: function (entityType, attributes) {
            return Promise.reject(new Error("This method is not supported!"));
        },
        lookupObjects: function (lookupOptions) {
            return Promise.reject(new Error("This method is not supported!"));
        },
    },
    Device: {
        captureImage: function (options) {
            return Promise.resolve(undefined);
        },
        captureAudio: function () {
            return Promise.resolve(undefined);
        },
        captureVideo: function () {
            return Promise.resolve(undefined);
        },
        pickFile: function (options) {
            return Promise.resolve(undefined);
        },
        getBarcodeValue: function () {
            return Promise.resolve("");
        },
        getCurrentPosition: function () {
            return Promise.resolve({
                // MSFT visitor Center
                coords: {
                    latitude: 47.642232,
                    longitude: -122.1389797,
                    accuracy: 128.02101335797585,
                    altitude: 103.73896789550781,
                    heading: -1,
                    speed: -1,
                    altitudeAccuracy: 10,
                },
                timestamp: 1564510895072.865,
            });
        },
        openARViewer: function (options) {
            return Promise.resolve("");
        },
    },
    Navigation: {
        openAlertDialog: ProxyUtils.openAlertDialog,
        openConfirmDialog: ProxyUtils.openConfirmDialog,
        openErrorDialog: ProxyUtils.openErrorDialog,
        openUrl: ProxyUtils.openURL,
        openFile: function (file, options) {
            alert("Your control is trying to open a file. This is not yet supported.");
            return Promise.resolve();
        },
        openForm: function (options, parameters) {
            alert("Your control is trying to open a form. This is not yet supported.");
            return Promise.resolve({ savedEntityReference: [] });
        },
        openWebResource: function (name, options, data) {
            alert("Your control is trying to open a web resource. This is not yet supported.");
        },
    },
    WebApi: {
        createRecord: function (entityType, data) {
            alert("Your control is trying to create a record. This is not yet supported.");
            return Promise.reject(new Error("Your control is trying to create a record. This is not yet supported."));
        },
        deleteRecord: function (entityType, id) {
            alert("Your control is trying to delete a record. This is not yet supported.");
            return Promise.reject(new Error("Your control is trying to delete a record. This is not yet supported."));
        },
        updateRecord: function (entityType, id, data) {
            alert("Your control is trying to update a record. This is not yet supported.");
            return Promise.reject(new Error("Your control is trying to update a record. This is not yet supported."));
        },
        retrieveMultipleRecords: function (entityType, options, maxPageSize) {
            alert("Your control is trying to retrieve multiple records. This is not yet supported.");
            return Promise.reject(new Error("Your control is trying to retrieve multiple records. This is not yet supported."));
        },
        retrieveRecord: function (entityType, id, options) {
            alert("Your control is trying to retrieve a record. This is not yet supported.");
            return Promise.reject(new Error("Your control is trying to retrieve a record. This is not yet supported."));
        },
    },
    Reporting: {
        reportSuccess: function (componentName, params) {
            return undefined;
        },
        reportFailure: function (componentName, error, suggestedMitigation, params) {
            return componentName + " error: " + error;
        },
        reportEvent: function (event) {
            return undefined;
        },
    },
    Diagnostics: {
        traceError: function (componentName, message) {
            return componentName + " error: " + message;
        },
        traceWarning: function (componentName, message) {
            return undefined;
        },
        traceInfo: function (componentName, message) {
            return componentName + " message: " + message;
        },
        traceDebug: function (componentName, message) {
            return undefined;
        },
        isInMonitorSession: function () {
            return false;
        },
    },
};
/* eslint-enable no-alert,@typescript-eslint/no-unused-vars */
//# sourceMappingURL=DefaultXrmProxy.js.map
var TRACE_LOCATION = "CustomControl.";
var Diagnostics = (function () {
    function Diagnostics(customControlProperties, externalUtils) {
        this._externalUtils = externalUtils;
        this._controlId = customControlProperties.controlId;
    }
    Diagnostics.prototype.addControlId = function (message) {
        return message + "[CustomControlId = " + this._controlId + "]";
    };
    Diagnostics.prototype.traceError = function (componentName, message, parameters, keepOriginalContent) {
        if (keepOriginalContent === void 0) { keepOriginalContent = false; }
        return this._externalUtils.xrmProxy.Diagnostics.traceError(keepOriginalContent ? componentName : TRACE_LOCATION + componentName, keepOriginalContent ? message : this.addControlId(message), this._addControlIdParameter(parameters));
    };
    Diagnostics.prototype.traceWarning = function (componentName, message, parameters, keepOriginalContent) {
        if (keepOriginalContent === void 0) { keepOriginalContent = false; }
        return this._externalUtils.xrmProxy.Diagnostics.traceWarning(keepOriginalContent ? componentName : TRACE_LOCATION + componentName, keepOriginalContent ? message : this.addControlId(message), this._addControlIdParameter(parameters));
    };
    Diagnostics.prototype.traceInfo = function (componentName, message, parameters, keepOriginalContent) {
        if (keepOriginalContent === void 0) { keepOriginalContent = false; }
        return this._externalUtils.xrmProxy.Diagnostics.traceInfo(keepOriginalContent ? componentName : TRACE_LOCATION + componentName, keepOriginalContent ? message : this.addControlId(message), this._addControlIdParameter(parameters));
    };
    Diagnostics.prototype.traceDebug = function (componentName, message, parameters, keepOriginalContent) {
        if (keepOriginalContent === void 0) { keepOriginalContent = false; }
        return this._externalUtils.xrmProxy.Diagnostics.traceDebug(keepOriginalContent ? componentName : TRACE_LOCATION + componentName, keepOriginalContent ? message : this.addControlId(message), this._addControlIdParameter(parameters));
    };
    Diagnostics.prototype.isInMonitorSession = function () {
        return this._externalUtils.xrmProxy.Diagnostics.isInMonitorSession();
    };
    Diagnostics.prototype._addControlIdParameter = function (parameters) {
        return (parameters || []).concat([{ name: "CustomControlId", value: this._controlId }]);
    };
    return Diagnostics;
}());
export { Diagnostics };

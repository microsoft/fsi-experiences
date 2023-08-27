var Reporting = (function () {
    function Reporting(customControlProperties, externalUtils) {
        this._externalUtils = externalUtils;
        this._controlId = customControlProperties.controlId;
    }
    Reporting.prototype.addControlId = function (params) {
        if (params == null) {
            params = [];
        }
        var controlParameter = {
            name: "CustomControlId",
            value: this._controlId,
        };
        params.push(controlParameter);
        return params;
    };
    Reporting.prototype.reportSuccess = function (componentName, params) {
        return this._externalUtils.xrmProxy.Reporting.reportSuccess(componentName, this.addControlId(params));
    };
    Reporting.prototype.reportFailure = function (componentName, error, suggestedMitigation, params) {
        return this._externalUtils.xrmProxy.Reporting.reportFailure(componentName, error, suggestedMitigation, this.addControlId(params));
    };
    Reporting.prototype.reportEvent = function (event) {
        var controlParam = this.addControlId([]);
        event.eventParameters.push(controlParam[0]);
        return this._externalUtils.xrmProxy.Reporting.reportEvent(event);
    };
    return Reporting;
}());
export { Reporting };

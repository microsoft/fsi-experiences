import { instance as XrmProxy } from "../../Utilities/XrmProxy";
var WebAPI = (function () {
    function WebAPI() {
    }
    WebAPI.prototype.retrieveRecord = function (entityType, id, options) {
        return XrmProxy.retrieveRecord(entityType, id, options);
    };
    WebAPI.prototype.createRecord = function (entityType, data) {
        return XrmProxy.createRecord(entityType, data);
    };
    WebAPI.prototype.updateRecord = function (entityType, id, data) {
        return XrmProxy.updateRecord(entityType, id, data);
    };
    WebAPI.prototype.deleteRecord = function (entityType, id) {
        return XrmProxy.deleteRecord(entityType, id);
    };
    WebAPI.prototype.retrieveMultipleRecords = function (entityType, options, maxPageSize, additionalHeadersFromCaller) {
        return XrmProxy.retrieveMultipleRecords(entityType, options, maxPageSize, additionalHeadersFromCaller);
    };
    WebAPI.prototype.execute = function (request) {
        return XrmProxy.execute(request);
    };
    WebAPI.prototype.executeMultiple = function (requests) {
        return XrmProxy.executeMultiple(requests);
    };
    WebAPI.prototype.getDeclaredFeatures = function () {
        return { unspecifiedFeatureFallback: { supportStatus: "supported" } };
    };
    WebAPI.prototype.getFeatureClassName = function () {
        return "WebAPI";
    };
    return WebAPI;
}());
export { WebAPI };

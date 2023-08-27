import { instance as XrmProxy } from "../../Utilities/XrmProxy";
var GraphApi = (function () {
    function GraphApi() {
    }
    GraphApi.prototype.sendRequest = function (method, endpoint, requestBody, headers, responseType) {
        var _a;
        return (_a = XrmProxy.GraphApi) === null || _a === void 0 ? void 0 : _a.sendRequest(method, endpoint, requestBody, headers, responseType);
    };
    GraphApi.prototype.getDeclaredFeatures = function () {
        return { unspecifiedFeatureFallback: { supportStatus: "supported" } };
    };
    GraphApi.prototype.getFeatureClassName = function () {
        return "GraphApi";
    };
    return GraphApi;
}());
export { GraphApi };

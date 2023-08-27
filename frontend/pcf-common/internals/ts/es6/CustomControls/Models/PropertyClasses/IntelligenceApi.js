import { instance as XrmProxy } from "../../Utilities/XrmProxy";
var IntelligenceApi = (function () {
    function IntelligenceApi() {
    }
    IntelligenceApi.prototype.getPredictionSchemaAsync = function (modelId, request) {
        return XrmProxy.IntelligenceApi.getPredictionSchemaAsync(modelId, request);
    };
    IntelligenceApi.prototype.predictAsync = function (modelId, request) {
        return XrmProxy.IntelligenceApi.predictAsync(modelId, request);
    };
    IntelligenceApi.prototype.getPreTrainedModelIdAsync = function (templateUniqueName) {
        return XrmProxy.IntelligenceApi.getPreTrainedModelIdAsync(templateUniqueName);
    };
    IntelligenceApi.prototype.getLabelsForObjectDetectionModelAsync = function (modelId) {
        return XrmProxy.IntelligenceApi.getLabelsForObjectDetectionModelAsync(modelId);
    };
    IntelligenceApi.prototype.invokeAiModelActionAsync = function (modelId, request) {
        return XrmProxy.IntelligenceApi.invokeAiModelActionAsync(modelId, request);
    };
    IntelligenceApi.prototype.invokeGlobalOperationAsync = function (operationType, operationRequest) {
        return XrmProxy.IntelligenceApi.invokeGlobalOperationAsync(operationType, operationRequest);
    };
    return IntelligenceApi;
}());
export { IntelligenceApi };

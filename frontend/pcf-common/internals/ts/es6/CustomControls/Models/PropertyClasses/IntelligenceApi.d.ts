export declare class IntelligenceApi implements ControlAndClientApiInterfaces.IntelligenceApi {
    getPredictionSchemaAsync(modelId: string, request: IntelligenceApi.Payload): Promise<IntelligenceApi.IIntelligenceResponse<IntelligenceApi.IIntelligenceResponseBodyV1>>;
    predictAsync(modelId: string, request: IntelligenceApi.Payload): Promise<IntelligenceApi.IIntelligenceResponse<IntelligenceApi.IIntelligenceResponseBodyV1>>;
    getPreTrainedModelIdAsync(templateUniqueName: string): Promise<IntelligenceApi.IIntelligenceResponse<string>>;
    getLabelsForObjectDetectionModelAsync(modelId: string): Promise<IntelligenceApi.IIntelligenceResponse<IntelligenceApi.IObjectDetectionLabel[]>>;
    invokeAiModelActionAsync<T>(modelId: string, request: IntelligenceApi.IIntelligenceOperationRequest): Promise<IntelligenceApi.IIntelligenceResponse<T>>;
    invokeGlobalOperationAsync<T>(operationType: Constants.ODataOperationType.Action | Constants.ODataOperationType.Function, operationRequest: IntelligenceApi.IIntelligenceOperationRequest): Promise<IntelligenceApi.IIntelligenceResponse<T>>;
}

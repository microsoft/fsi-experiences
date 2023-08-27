import { IDeclareFeatures, IFeatureSupport } from "../PropertyInfrastructure/IFeatureSupport";
export declare class WebAPI implements ControlAndClientApiInterfaces.WebApi, IDeclareFeatures {
    retrieveRecord(entityType: string, id: string, options?: string): Promise<WebApi.Entity>;
    createRecord(entityType: string, data: WebApi.Entity): Promise<ControlAndClientApiInterfaces.LookupValue>;
    updateRecord(entityType: string, id: string, data: WebApi.Entity): Promise<ControlAndClientApiInterfaces.LookupValue>;
    deleteRecord(entityType: string, id: string): Promise<ControlAndClientApiInterfaces.LookupValue>;
    retrieveMultipleRecords(entityType: string, options?: string, maxPageSize?: number, additionalHeadersFromCaller?: Record<string, string>): Promise<WebApi.RetrieveMultipleResponse>;
    execute(request: WebApi.ODataContract): Promise<WebApi.Response>;
    executeMultiple(requests: WebApi.ODataContract[]): Promise<WebApi.Response[]>;
    getDeclaredFeatures(): IFeatureSupport;
    getFeatureClassName(): string;
}

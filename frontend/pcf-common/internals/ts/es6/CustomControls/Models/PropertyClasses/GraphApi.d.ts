import { IDeclareFeatures, IFeatureSupport } from "../PropertyInfrastructure/IFeatureSupport";
export declare class GraphApi implements ControlAndClientApiInterfaces.GraphApi, IDeclareFeatures {
    sendRequest(method: string, endpoint: string, requestBody?: any, headers?: {
        [key: string]: string;
    }, responseType?: "text" | "arraybuffer" | "blob" | "json"): Promise<any>;
    getDeclaredFeatures(): IFeatureSupport;
    getFeatureClassName(): string;
}

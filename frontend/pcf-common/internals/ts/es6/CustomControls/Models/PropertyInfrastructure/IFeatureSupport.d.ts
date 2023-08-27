export declare type FeatureSupportStatusType = "supported" | "unsupported";
export interface IFeatureSupportStatus {
    supportStatus: FeatureSupportStatusType;
    minApiVersion?: string;
    maxApiVersion?: string;
}
export interface IFeatureSupport {
    unspecifiedFeatureFallback: IFeatureSupportStatus;
    featureList?: {
        [featureName: string]: IFeatureSupportStatus;
    };
}
export interface IDeclareFeatures {
    getDeclaredFeatures(): IFeatureSupport;
    getFeatureClassName(): string;
}

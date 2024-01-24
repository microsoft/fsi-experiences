export interface IFeatureFlags {
    [key: string]: boolean;
}

export interface IConfigSet {
    [key: string]: Set<string>;
}
export interface IConfig {
    flags?: IFeatureFlags;
    configSets?: IConfigSet;
}

import { IFeatureFlags, IConfigSet, IConfig } from '@fsi/core-components/dist/context/config/IConfig';
import { CommonPCFContext } from '../common-props';

export const extractContextualFlags = (
    context: CommonPCFContext,
    flagsKeys: string[],
    defaultValue: { [key: string]: boolean } = {}
): IFeatureFlags => {
    return flagsKeys.reduce<IFeatureFlags>((features: IFeatureFlags, key: string) => {
        return {
            ...features,
            [key]: getContextBooleanValue(context, key, defaultValue[key]),
        };
    }, {});
};

export const extractContextualSets = (context: CommonPCFContext, sets: string[]): IConfigSet => {
    return sets.reduce<IConfigSet>((configSet: IConfigSet, key: string) => {
        const setValue = getContextSetValue(context, key);
        if (!setValue) {
            return configSet;
        }

        return {
            ...configSet,
            [key]: setValue,
        };
    }, {});
};

export const mergeConfigs = (configs: IConfig[]): IConfig => {
    return configs.reduce<IConfig>((prev: IConfig, current: IConfig) => {
        return {
            flags: {
                ...prev.flags,
                ...current.flags,
            },
            configSets: {
                ...prev.configSets,
                ...current.configSets,
            },
        };
    }, {});
};

export const getContextSetValue = (context: CommonPCFContext, key: string): Set<string> | undefined => {
    const raw = context.parameters?.[key]?.raw;

    return raw && new Set(raw.split(',').map(s => s.trim()));
};

export const getContextBooleanValue = (context: CommonPCFContext, key: string, defaultValue = true): boolean => {
    const raw = context.parameters?.[key]?.raw;

    if (raw === undefined || raw === null) {
        return defaultValue;
    }
    return raw === '1' || raw === 1;
};

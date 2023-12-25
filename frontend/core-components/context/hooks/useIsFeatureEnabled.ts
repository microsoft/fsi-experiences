import { useFSIContext } from './useFSIContext';

export const useIsFeatureEnabled = (name: string, defaultValue = true): boolean => {
    const context = useFSIContext();

    const flag = context.config?.flags?.[name];
    return flag ?? defaultValue;
};

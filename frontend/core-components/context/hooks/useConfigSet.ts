/* istanbul ignore file */
import { useFSIContext } from './useFSIContext';

export const useConfigSet = (name: string): Set<string> | undefined => {
    const context = useFSIContext();

    return context.config?.configSets?.[name];
};

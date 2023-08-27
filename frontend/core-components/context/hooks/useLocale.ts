import { useFSIContext } from './useFSIContext';

export const useLocale = (): string => {
    const context = useFSIContext();

    return context.locale;
};

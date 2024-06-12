import { TranslationFunction } from '../localization/TranslationFunction';
import { useFSIContext } from './useFSIContext';
export { namespaces } from '../../constants/namespaces';

export const useTranslation = (namespace?: string): TranslationFunction => {
    const context = useFSIContext();

    return context.useTranslation(namespace);
};

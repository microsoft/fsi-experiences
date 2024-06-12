import { pluralKey } from '@fsi/core-components/dist/context/localization/TranslationFunction';
import { TranslationFunction, defaultTranslate, interpolateString } from '@fsi/core-components/dist/context/localization/TranslationFunction';
import { useCallback } from 'react';
import contextService from '../services/ContextService';

export const useTranslation = (): TranslationFunction => {
    const context = contextService.geContext();

    return useCallback(
        (nonPluraledKey, interpolation) => {
            if (!context) {
                return defaultTranslate(nonPluraledKey, interpolation);
            }

            let key = nonPluraledKey;
            if (typeof interpolation === 'object') {
                key = pluralKey({ key, pluralCount: +interpolation?.pluralCount });
            }

            const translatedValue = context.resources.getString(key);
            if (typeof interpolation === 'object') {
                return interpolateString(translatedValue, interpolation);
            }

            return translatedValue;
        },
        [context]
    );
};

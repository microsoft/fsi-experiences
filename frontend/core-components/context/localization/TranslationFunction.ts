export interface ITranslations {
    [key: string]: { [key: string]: string };
}

interface interpolationObj {
    [key: string]: string | number;
}

export const pluralKey = ({ key, pluralCount }: { key: string; pluralCount?: number }): string =>
    pluralCount && pluralCount > 1 ? key + '_PLURAL' : key;

export const interpolateString = (str: string, interpolation: interpolationObj): string => {
    let returningString = str;
    const keysToReplace = Object.keys(interpolation);
    keysToReplace.forEach(key => {
        returningString = returningString.replace(`{{${key}}}`, interpolation[key].toString());
    });

    return returningString;
};

export const translations: ITranslations = {};

export type TranslationFunction = (key: string, defaultValueOrInterpolation?: interpolationObj | string, namespace?: string) => string;

export const defaultTranslate: TranslationFunction = (
    nonPluraledKey: string,
    defaultValueOrInterpolation?: interpolationObj | string,
    namespace = 'common'
) => {
    let key = nonPluraledKey;
    if (typeof defaultValueOrInterpolation === 'object') {
        key = pluralKey({ key, pluralCount: +defaultValueOrInterpolation?.pluralCount });
    }

    const returningString = translations[namespace]?.[key] || translations.common?.[key] || '';
    if (defaultValueOrInterpolation && typeof defaultValueOrInterpolation === 'object') {
        return interpolateString(returningString || key, defaultValueOrInterpolation);
    }

    return returningString || (defaultValueOrInterpolation as string) || key;
};

export const defaultUseTranslation: (namespace?: string) => TranslationFunction = namespace => (key, defaultValueOrInterpolation?) =>
    defaultTranslate(key, defaultValueOrInterpolation, namespace);

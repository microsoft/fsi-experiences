import { TranslationFunction } from '../context/localization/TranslationFunction';
import { hasOnlyDigits, hasValidEmail, isStringNullOrEmpty } from './FormUtils';
import { isNumber } from './NumberUtils';

interface IGetRulesOptions {
    required?: boolean;
    min?: number;
    max?: number;
    noWhiteSpace?: boolean;
    maxLength?: number;
    onlyDigits?: boolean;
    validEmail?: boolean;
}

export const getEmailValidation = ({ isRequired, message }: { isRequired: boolean; message: string }) => {
    return (v: string) => {
        return (!isRequired && isStringNullOrEmpty(v)) || hasValidEmail(v) || message;
    };
};

export const getRules = (options: IGetRulesOptions, t: TranslationFunction) => {
    const rules: any = {};

    if (options.required) {
        rules.required = {
            value: true,
            message: t('INPUT_REQUIRED_MESSAGE'),
        };
    }

    if (isNumber(options.min)) {
        rules.min = {
            value: options.min,
            message: options.min === 0 ? t('NON_NEGATIVE_NUMBER_ONLY') : t('MIN_NUMBER_MESSAGE', { min: (options.min as number).toString() }),
        };
    }

    if (isNumber(options.max)) {
        rules.max = {
            value: options.max,
            message: t('WITHIN_LIMIT_ONLY', { limit: (options.max as number).toString() }),
        };
    }

    if (options.noWhiteSpace) {
        rules.validate = {
            ...rules.validate,
            noWhiteSpace: (v: string) => !!v.trim() || t('NO_WHITE_SPACE_MESSAGE'),
        };
    }

    if (options.onlyDigits) {
        rules.validate = {
            ...rules.validate,
            onlyDigits: (v: string) => hasOnlyDigits(v) || t('ONLY_DIGITS_MESSAGE'),
        };
    }

    if (options.validEmail) {
        rules.validate = {
            ...rules.validate,
            validEmail: getEmailValidation({ isRequired: options.required!, message: t('VALID_EMAIL_MESSAGE') }),
        };
    }

    if (options.maxLength as number) {
        rules.maxLength = {
            value: options.maxLength,
            message: t('MAX_LENGTH', { length: (options.maxLength as number).toString() }),
        };
    }
    return rules;
};

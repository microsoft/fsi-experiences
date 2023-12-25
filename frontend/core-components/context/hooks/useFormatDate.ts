import isValid from 'date-fns/isValid';
import { useCallback } from 'react';
import { useLocale } from './useLocale';
import { toDate } from '../../utilities';
import { DateTimePredefinedFormat, quickFormatsOptions } from '../../components/atoms/DateTime/DateTime.interface';

export const getDateFormatOption = (formatKey: DateTimePredefinedFormat) => quickFormatsOptions[formatKey];

const useFormatDate = (defaultFormatOptions: Intl.DateTimeFormatOptions = getDateFormatOption(DateTimePredefinedFormat.DefaultDate)) => {
    const locale = useLocale();

    const formatDate = useCallback(
        (date?: Date, formatOptions: Intl.DateTimeFormatOptions = defaultFormatOptions) => {
            return date && isValid(date) ? toDate(date, formatOptions, locale) : '';
        },
        [defaultFormatOptions, locale]
    );

    return formatDate;
};

export default useFormatDate;

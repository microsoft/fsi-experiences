import differenceInYears from 'date-fns/differenceInYears';
import startOfToday from 'date-fns/startOfToday';
import isBefore from 'date-fns/isBefore';

export const defaultDateOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
};

export const toDate = (
    date: Date,
    options: Intl.DateTimeFormatOptions = defaultDateOptions as Intl.DateTimeFormatOptions,
    locale = 'default'
): string => {
    const format = new Intl.DateTimeFormat(locale, options);

    return format.format(date);
};

export const toShortDayMonth = (date: Date): string => toDate(date, { day: '2-digit', month: 'short' });

//replace with date-fns/differenceInDays
/* istanbul ignore next */
export const daysDueCondition = (field?: Date, dayDiffCondition = 60): boolean => {
    if (!field) {
        return false;
    }
    const diffTime = Math.abs(new Date().getTime() - field.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays < dayDiffCondition;
};

//replace with date-fns/differenceInWeeks
/* istanbul ignore next */
export const weekDiff = (field?: Date): number => {
    if (!field) {
        return 0;
    }
    const diffTime = Math.abs(new Date().getTime() - field.getTime());
    const weeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7));

    return weeks;
};

export const isDateExpired = (field?: Date): boolean => {
    if (!field) {
        return false;
    }
    return isBefore(field, startOfToday());
};

export const isDateValid = (date?: Date): boolean => date instanceof Date && !isNaN(date.getTime());

export const getAgeInYears = (date?: Date): number | undefined => {
    if (!date || !isDateValid(date)) {
        return undefined;
    }
    return differenceInYears(new Date(), date);
};

export const sleep = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

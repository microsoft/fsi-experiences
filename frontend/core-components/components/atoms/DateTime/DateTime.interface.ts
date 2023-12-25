import { ITextStyles } from '@fluentui/react/lib/components/Text/Text.types';

export enum DateTimePredefinedFormat {
    ShortDate,
    DefaultDate,
    DefaultDateWithTime,
    ShortMonthYear,
    LongMonthShortDayYear,
    HoursMinutes,
}

export interface IDateTimeProps {
    date?: Date;
    styles?: ITextStyles;
    quickFormat?: DateTimePredefinedFormat;
    formatOptions?: Intl.DateTimeFormatOptions;
}

export const quickFormatsOptions: { [key in DateTimePredefinedFormat]: Intl.DateTimeFormatOptions } = {
    [DateTimePredefinedFormat.DefaultDate]: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    },
    [DateTimePredefinedFormat.DefaultDateWithTime]: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    },
    [DateTimePredefinedFormat.ShortDate]: { day: '2-digit', month: 'short' },
    [DateTimePredefinedFormat.ShortMonthYear]: { month: '2-digit', year: '2-digit' },
    [DateTimePredefinedFormat.LongMonthShortDayYear]: { day: '2-digit', month: 'long', year: '2-digit' },
    [DateTimePredefinedFormat.HoursMinutes]: { hour: '2-digit', minute: '2-digit' },
};

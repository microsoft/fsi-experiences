import { CommonPCFContext } from '../common-props';
import { useMemo } from 'react';
import { IDateFormattingInfo } from '@fsi/core-components/dist/context/FSIContext';

export const useDatesFormattingInfo = (context: CommonPCFContext): IDateFormattingInfo | undefined => {
    return useMemo(() => {
        if (!context) {
            return undefined;
        }

        const pcfDateInfo = context.userSettings.dateFormattingInfo;

        return {
            dateGridStrings: {
                months: pcfDateInfo.monthNames,
                shortMonths: pcfDateInfo.abbreviatedMonthNames,
                days: pcfDateInfo.dayNames,
                shortDays: pcfDateInfo.shortestDayNames,
            },
            firstDayOfTheWeek: pcfDateInfo.firstDayOfWeek,
            shortDatePattern: pcfDateInfo.shortDatePattern,
        };
    }, [context]);
};

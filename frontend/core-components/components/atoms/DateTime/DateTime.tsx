import React, { FC } from 'react';
import { isDateValid, toDate } from '../../../utilities';
import { DateTimePredefinedFormat, IDateTimeProps, quickFormatsOptions } from './DateTime.interface';
import { Text } from '@fluentui/react/lib/Text';
import { useLocale } from '../../../context/hooks/useLocale';

export const DateTime: FC<IDateTimeProps> = props => {
    const { date, styles, quickFormat = DateTimePredefinedFormat.DefaultDate, formatOptions = quickFormatsOptions[quickFormat] } = props;

    const locale = useLocale();

    if (!date || !isDateValid(date)) {
        return null;
    }

    return (
        <Text data-testid="date-time-text" styles={styles}>
            {toDate(date, formatOptions, locale)}
        </Text>
    );
};

export default DateTime;

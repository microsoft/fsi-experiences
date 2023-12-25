import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { DateTimePredefinedFormat } from '../../components/atoms/DateTime/DateTime.interface';
import useFormatDate, { getDateFormatOption } from './useFormatDate';

describe('useFormatDate', () => {
    const format = (date: Date, options: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat('en', options).format(date);

    it('Should format date', () => {
        const date = new Date();
        const datePattern = getDateFormatOption(DateTimePredefinedFormat.DefaultDate);
        const { result } = renderHook(() => useFormatDate());
        const formattedDate = result.current(date);

        expect(formattedDate).toEqual(format(date, datePattern));
    });

    it('Should format date with different formatting', () => {
        const date = new Date();
        const datePattern = getDateFormatOption(DateTimePredefinedFormat.ShortDate);
        const { result } = renderHook(() => useFormatDate(datePattern));
        const formattedDate = result.current(date);

        expect(formattedDate).toEqual(format(date, datePattern));
    });

    it('Should return empty string if provided date is invalid', () => {
        const date = new Date('invalid date');
        const { result } = renderHook(() => useFormatDate());
        const formattedDate = result.current(date);

        expect(formattedDate).toEqual('');
    });
});

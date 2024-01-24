import React from 'react';
import { render } from '@testing-library/react';
import DateTime from './DateTime';
import { DateTimePredefinedFormat, IDateTimeProps } from './DateTime.interface';
import { FSIContainer } from '../../../context/FSIContext';
const renderDate = (props: IDateTimeProps, local = 'en-US') => {
    return render(
        <FSIContainer locale={local}>
            <DateTime {...props} />
        </FSIContainer>
    );
};

const date = new Date('07/30/2020');
describe('Date', () => {
    it('should render date with default format using the context locale', () => {
        const { getByText, getByTestId } = renderDate({ date }, 'de-DE');

        expect(getByTestId('date-time-text')).toBeVisible();
        expect(getByText('30. Juli 2020')).toBeVisible();
    });

    it('should render short date using predefined format', () => {
        const { getByText } = renderDate({ date, quickFormat: DateTimePredefinedFormat.ShortDate });

        expect(getByText('Jul 30')).toBeVisible();
    });

    it('should render date using custom format', () => {
        const { getByText } = renderDate({ date, formatOptions: { weekday: 'long' } });

        expect(getByText('Thursday')).toBeVisible();
    });

    it('should render nothing for undefined date', () => {
        const { queryByTestId } = renderDate({});
        expect(queryByTestId('date-time-text')).toBeNull();
    });

    it('should render nothing for invalid date', () => {
        const { queryByTestId } = renderDate({ date: new Date('invalid date') });
        expect(queryByTestId('date-time-text')).toBeNull();
    });
});

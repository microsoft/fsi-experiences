import React from 'react';
import { render } from '@testing-library/react';
import CaretPerformance from './CaretPerformance';
import commonStrings from '../../../assets/strings/common/common.1033.json';

describe('CaretPerformance', () => {
    it('Should render with two numbers after zero', async () => {
        const { getByText, queryByTestId } = render(<CaretPerformance timeFrame="YTD" value={5.1} />);
        const databox = queryByTestId(/caret-performance-CaretSolidUp/i);

        expect(databox).toBeVisible();
        expect(getByText('+5.10%')).toBeVisible();
        expect(getByText('(YTD)')).toBeVisible();
        expect(queryByTestId('performance-time-frame')).toBeVisible();
    });

    it('Should render with two numbers after zero even with 3 numbers after zero percentage', async () => {
        const { getByText, queryByTestId } = render(<CaretPerformance timeFrame="YTD" value={5.154} />);
        const databox = queryByTestId(/caret-performance-CaretSolidUp/i);

        expect(databox).toBeVisible();
        expect(getByText('+5.15%')).toBeVisible();
    });

    it('Should render minus value', async () => {
        const { getByText, queryByTestId } = render(<CaretPerformance timeFrame="YTD" value={-5.154} />);
        const databox = queryByTestId(/caret-performance-CaretSolidDown/i);

        expect(databox).toBeVisible();
        expect(getByText('-5.15%')).toBeVisible();
    });

    it('Should render undefined value', async () => {
        const { getByText } = render(<CaretPerformance timeFrame="YTD" value={undefined} />);

        expect(getByText(commonStrings.N_A)).toBeVisible();
    });

    it('Should render zero value', async () => {
        const { getByText } = render(<CaretPerformance timeFrame="YTD" value={0} />);

        expect(getByText('0.00%')).toBeVisible();
    });

    it('Should render without time frame', async () => {
        const { getByText, queryByTestId } = render(<CaretPerformance value={5.154} />);
        expect(getByText('+5.15%')).toBeVisible();
        expect(queryByTestId('performance-time-frame')).toBeNull();
    });
});

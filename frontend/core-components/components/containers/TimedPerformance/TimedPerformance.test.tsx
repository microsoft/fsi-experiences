import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import TimedPerformance from './TimedPerformance';
import { FontSizes, FontWeights } from '@fluentui/react/lib/Styling';

describe('TimedPerformace', () => {
    let timedPerformanceMock;
    let timedPerformancePairs;

    beforeEach(() => {
        timedPerformancePairs = [
            { time: 'YTD', value: 1, text: 'Performance: YTD' },
            { time: '1Y', value: 2, text: 'Performance: 1Y' },
            { time: '3Y', value: 3, text: 'Performance: 3Y' },
        ];
        timedPerformanceMock = {
            timedPerformancePairs: timedPerformancePairs,
            fontStyle: { root: { fontSize: FontSizes.size20, fontWeight: FontWeights.semibold } },
        };
    });

    it('Should render drop down data box in blue color', async () => {
        const { getByText, queryByTestId } = render(
            <TimedPerformance timedPerformancePairs={timedPerformanceMock.timedPerformancePairs} styles={timedPerformanceMock.fontStyle} />
        );

        const dropdown = queryByTestId(/timed-performance-dropdown/i);
        expect(dropdown).toBeVisible();

        expect(getByText('+1.00%')).toBeVisible();
    });

    it('Should render 3Y performance value', async () => {
        const { getByText, getByRole, getAllByRole } = render(
            <TimedPerformance timedPerformancePairs={timedPerformanceMock.timedPerformancePairs} styles={timedPerformanceMock.fontStyle} />
        );

        const dropdown = getByRole('combobox');
        fireEvent.click(dropdown);
        const options = getAllByRole('option');
        fireEvent.click(options[options.length - 1]);
        expect(getByText('Performance: 3Y')).toBeVisible();
        expect(getByText('+3.00%')).toBeVisible();
    });

    it('Should render 1Y first', async () => {
        timedPerformanceMock.timedPerformancePairs = [
            { time: 'YTD', value: undefined },
            { time: '1Y', value: 2 },
            { time: '3Y', value: 3 },
        ];
        const { getByText } = render(
            <TimedPerformance timedPerformancePairs={timedPerformanceMock.timedPerformancePairs} styles={timedPerformanceMock.fontStyle} />
        );

        expect(getByText(`+2.00%`)).toBeVisible();
    });

    it('Should render N/A value', async () => {
        timedPerformanceMock.timedPerformancePairs = [
            { time: '1Y', value: undefined },
            { time: '3Y', value: undefined },
        ];
        const { getByText } = render(
            <TimedPerformance timedPerformancePairs={timedPerformanceMock.timedPerformancePairs} styles={timedPerformanceMock.fontStyle} />
        );

        expect(getByText('N/A')).toBeVisible();
    });
});

import React from 'react';
import { render } from '@testing-library/react';
import SIDMainDataRow from './SIDMainDataRow';
import { SID_COMPACT_CLASS } from './SIDMainDataRow.style';
import { FHDataBoxDetails, FHDataBoxType } from '../../FHDataBox/FHDataBox.interface';
import { TimedPerformancePairs } from '@fsi/core-components/dist/';

describe('SIDMainDataBox', () => {
    const boxDetailsList: FHDataBoxDetails[] = [
        {
            type: FHDataBoxType.Text,
            label: 'AVERAGE BALANCE 1',
            value: '$1000',
            field: 'averageBalance',
            footer: { type: FHDataBoxType.Text, value: 'some footer 1', field: 'averageBalanceFooter' },
        },
        {
            type: FHDataBoxType.Text,
            label: 'AVERAGE BALANCE 2',
            value: '$200',
            field: 'averageBalance',
            footer: { type: FHDataBoxType.Text, value: 'some footer 2', field: 'averageBalanceFooter' },
        },
    ];

    it('Should render main details list', async () => {
        const { getByText, queryAllByTestId, getByTestId } = render(<SIDMainDataRow list={boxDetailsList} />);

        expect(getByTestId('main-sid-row')).toBeVisible();

        const items = queryAllByTestId('main-sid-databox');
        expect(items).toHaveLength(2);

        items.forEach(item => {
            expect(item).not.toHaveClass(SID_COMPACT_CLASS);
        });
        boxDetailsList.forEach(item => {
            expect(getByText(item.label as string)).toBeVisible();
            expect(getByText(item.value! as string | number)).toBeVisible();
            expect(getByText(item.footer!.value as string)).toBeVisible();
        });
    });

    it('Should render performance dropdown', async () => {
        const boxWithPerformance: FHDataBoxDetails[] = [
            {
                field: 'performance',
                type: FHDataBoxType.Performance,
                value: [
                    { time: 'YTD', value: 1, text: 'Performance: YTD' },
                    { time: '1Y', value: 2, text: 'Performance: 1Y' },
                    { time: '3Y', value: 3, text: 'Performance: 3Y' },
                ],
            },
        ];

        const { getByText, queryAllByTestId, getByTestId } = render(<SIDMainDataRow list={boxWithPerformance} />);

        expect(getByTestId('main-sid-row')).toBeVisible();

        const items = queryAllByTestId('main-sid-databox');
        expect(items).toHaveLength(1);

        items.forEach(item => {
            expect(item).not.toHaveClass(SID_COMPACT_CLASS);
        });
        boxWithPerformance.forEach(item => {
            expect(getByText(`Performance: ${(item.value as TimedPerformancePairs[])[0].time}` as string)).toBeVisible();
        });
    });

    it('Should render main details list in compact mode', async () => {
        const { queryAllByTestId, getByTestId } = render(<SIDMainDataRow list={boxDetailsList} compact />);

        expect(getByTestId('main-sid-row')).toBeVisible();

        const items = queryAllByTestId('main-sid-databox');
        expect(items).toHaveLength(2);

        items.forEach(item => {
            expect(item).toHaveClass(SID_COMPACT_CLASS);
        });
    });
});

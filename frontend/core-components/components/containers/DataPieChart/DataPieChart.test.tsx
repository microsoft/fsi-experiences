import React from 'react';
import { render } from '@testing-library/react';
import DataPieChart, { highContrastColorList } from './DataPieChart';
import { IDataPieChartProps, IPieChartData } from './DataPieChart.interface';
import { formatNumber } from '../../../utilities/NumberUtils';
import { getCategoryColor } from './DataPieChart';

const value1 = 44000;
const value2 = 56000;

const data: IPieChartData[] = [
    {
        category: 'smaller',
        color: 'red',
        value: value1,
    },
    {
        category: 'bigger',
        color: 'blue',
        value: value2,
    },
];
describe('DataPieChart', () => {
    const props: IDataPieChartProps = {
        data,
        header: 'test chart',
        emptyStateText: 'no data',
    };

    it('should render DataPieChart correctly', () => {
        const { queryByRole, getByText, getAllByTestId, queryByTestId, getByTestId } = render(<DataPieChart {...props} />);

        expect(getByText(props.header)).toBeVisible();
        // legends
        const legends = getAllByTestId('legend-category-item');
        // test order
        expect(legends[0]).toHaveTextContent('bigger');
        expect(legends[1]).toHaveTextContent('smaller');

        data.forEach(item => {
            expect(getByTestId(`legend-category-color-${item.category}`)).toHaveStyle({ backgroundColor: item.color });
            expect(getByText(item.category)).toBeVisible();
        });

        expect(getByText(formatNumber(value1 + value2))).toBeVisible();

        expect(getByText('44%')).toBeVisible();
        expect(getByText('56%')).toBeVisible();

        expect(queryByRole('heading')).toHaveTextContent(props.header);
        expect(queryByRole('separator')).toBeVisible();

        expect(queryByTestId('base-currency')).toBeNull();
    });

    it('should render empty state', () => {
        const testProps: IDataPieChartProps = {
            ...props,
            data: [],
        };
        const { getByText } = render(<DataPieChart {...testProps} />);

        expect(getByText(props.emptyStateText)).toBeVisible();
    });

    it('should render with currency in the header', () => {
        const testProps: IDataPieChartProps = {
            ...props,
            showCurrency: true,
        };
        const { getByText, getByTestId } = render(<DataPieChart {...testProps} />);

        expect(getByText(formatNumber(value1 + value2))).toBeVisible();
        expect(getByTestId('base-currency')).toBeVisible();
    });

    it('should render in compact view', () => {
        const testProps: IDataPieChartProps = {
            ...props,
            isCompactView: true,
        };
        const { queryByRole } = render(<DataPieChart {...testProps} />);

        expect(queryByRole('separator')).toBeNull();
        expect(queryByRole('heading')).toBeVisible();
    });

    it('should render big numbers in compact mode', () => {
        const testProps: IDataPieChartProps = {
            ...props,
            data: data.map(item => ({
                ...item,
                value: item.value * 1000,
            })),
        };
        const { getByText } = render(<DataPieChart {...testProps} />);

        expect(getByText('100M')).toBeVisible();
    });

    it('should render small slices label outside the chart', () => {
        const testProps: IDataPieChartProps = {
            ...props,
            data: [
                ...data,
                {
                    category: 'very-small',
                    color: 'pink',
                    value: 2000,
                },
                {
                    category: 'very-small',
                    color: 'pink',
                    value: 500,
                },
            ],
        };
        const { getAllByTestId } = render(<DataPieChart {...testProps} />);

        const smallSlices = getAllByTestId('very-small-slice-label');
        const slices = getAllByTestId('normal-slice-label');

        expect(smallSlices).toHaveLength(2);
        expect(smallSlices[0]).toHaveTextContent('2%');
        expect(smallSlices[1]).toHaveTextContent('<1%');

        expect(slices).toHaveLength(2);
        expect(slices[0]).toHaveTextContent('55%');
        expect(slices[1]).toHaveTextContent('43%');
    });

    it('should render single small slice as in-chart label when there is only one small slice', () => {
        const testProps: IDataPieChartProps = {
            ...props,
            data: [
                ...data,
                {
                    category: 'very-small',
                    color: 'pink',
                    value: 30000,
                },
                {
                    category: 'very-small',
                    color: 'pink',
                    value: 2000,
                },
            ],
        };
        const { getAllByTestId, queryAllByTestId } = render(<DataPieChart {...testProps} />);

        const smallSlices = queryAllByTestId('very-small-slice-label');
        const slices = getAllByTestId('normal-slice-label');

        expect(smallSlices).toHaveLength(0);

        expect(slices).toHaveLength(4);
        expect(slices[0]).toHaveTextContent('42%');
        expect(slices[1]).toHaveTextContent('33%');
        expect(slices[2]).toHaveTextContent('23%');
        expect(slices[3]).toHaveTextContent('2%');
    });

    it('should render <1% slice', () => {
        const testProps: IDataPieChartProps = {
            ...props,
            data: [
                ...data,
                {
                    category: 'tiny',
                    color: 'gray',
                    value: 500,
                },
            ],
        };
        const { getAllByTestId, queryAllByTestId } = render(<DataPieChart {...testProps} />);

        const smallSlices = queryAllByTestId('very-small-slice-label');
        const slices = getAllByTestId('normal-slice-label');

        expect(smallSlices).toHaveLength(0);

        expect(slices).toHaveLength(3);
        expect(slices[0]).toHaveTextContent('56%');
        expect(slices[1]).toHaveTextContent('44%');
        expect(slices[2]).toHaveTextContent('<1%');
    });

    describe('getColor function', () => {
        it('should return color as is in normal mode', () => {
            expect(getCategoryColor('red', 0, false)).toEqual('red');
        });

        it('should return the first system color in high contrast mode for index = 0', () => {
            expect(getCategoryColor('red', 0, true)).toEqual(highContrastColorList[0]);
        });

        it('should return the second system color in high contrast mode for index = 5', () => {
            expect(getCategoryColor('red', 5, true)).toEqual(highContrastColorList[1]);
        });
    });
});

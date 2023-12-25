import React from 'react';
import { render } from '@testing-library/react';
import { IFinancialDataSummaryProps } from './FinancialDataSummary';
import FinancialDataSummaryWrapper from './FinancialDataSummaryWrapper';
import { FH_SUMMARY_COMPACT_VIEW, FH_SUMMARY_FULL_VIEW } from './FinancialDataSummary.style';

const mockedResponsiveCompFunction = jest.fn();
jest.mock('@fsi/core-components/dist/components/atoms/ResponsiveContainer/ResponsiveContainer', () => props => {
    mockedResponsiveCompFunction(props);
    return <div data-testid="mocked-responsive-container">{props.children}</div>;
});

const mockedCompFunction = jest.fn();
jest.mock('./FinancialDataSummary', () => props => {
    mockedCompFunction(props);
    return <span data-testid="mocked-financial-data-summary" />;
});

const props: IFinancialDataSummaryProps = {
    isCompactView: true,
    annualIncome: 666,
    financialProducts: undefined,
    categories: new Map<number, string>(),
};

describe('test financial data summary wrapper', () => {
    beforeEach(() => {
        mockedCompFunction.mockClear();
        mockedResponsiveCompFunction.mockClear();
    });

    it('should render financial data summary as child', () => {
        const { getByTestId } = render(<FinancialDataSummaryWrapper {...props} />);

        expect(getByTestId('mocked-financial-data-summary')).toBeVisible();
    });

    it('should render financial data summary with the same props', () => {
        render(<FinancialDataSummaryWrapper {...props} />);

        expect(mockedCompFunction).toHaveBeenCalledWith(props);
    });

    it('should render responsive container with full view class', () => {
        const testedProps: IFinancialDataSummaryProps = {
            ...props,
            isCompactView: false,
        };
        render(<FinancialDataSummaryWrapper {...testedProps} />);

        expect(mockedResponsiveCompFunction).toHaveBeenCalledWith(expect.objectContaining({ classPrefix: FH_SUMMARY_FULL_VIEW }));
    });

    it('should render responsive container with compact class', () => {
        render(<FinancialDataSummaryWrapper {...props} />);

        expect(mockedCompFunction).toHaveBeenCalledWith(props);

        expect(mockedResponsiveCompFunction).toHaveBeenCalledWith(expect.objectContaining({ classPrefix: FH_SUMMARY_COMPACT_VIEW }));
    });
});

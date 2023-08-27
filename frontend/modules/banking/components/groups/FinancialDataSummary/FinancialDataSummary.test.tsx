import React from 'react';
import { getAllByRole, getByText, render } from '@testing-library/react';
import { getFullMock } from '../../../interfaces/Groups/mocks/IGroup.mock';
import { IFinancialDataSummaryProps } from './FinancialDataSummary';
import { formatNumber } from '@fsi/core-components/dist/utilities/NumberUtils';
import mainHouseholdStrings from '@fsi/core-components/dist/assets/strings/MainHousehold/MainHousehold.1033.json';

let FinancialDataSummary;

describe('test financial data summary component', () => {
    beforeAll(() => {
        jest.mock('@fsi/core-components/dist/components/atoms/EmptyState/EmptyState', () => {
            return { EmptyState: () => <div data-testid="empty-state" /> };
        });

        jest.mock('@fsi/core-components/dist/components/containers/DataPieChart/DataPieChart', () => params => {
            return (
                <div data-testid={params.emptyStateText}>
                    {params.data?.length ? (
                        params.data.map((data, idx) => <div key={idx}>{data.value}</div>)
                    ) : (
                        <div data-testid={`${params.emptyStateText} no data`} />
                    )}
                </div>
            );
        });

        /* eslint-disable @typescript-eslint/no-var-requires */
        FinancialDataSummary = require('./FinancialDataSummary').default;
    });

    it('should render financial data component summary', () => {
        const currParams = { ...params, isCompactView: true };
        const { getByTestId } = render(<FinancialDataSummary {...currParams} />);

        expect(getByTestId('group-financial-summary')).toBeVisible();
    });

    it('should render financial data component full view', () => {
        const currParams = { ...params, isCompactView: false };
        const { getByTestId } = render(<FinancialDataSummary {...currParams} />);

        expect(getByTestId('group-financial-view')).toBeVisible();
    });

    it('should render financial data without liabilities', () => {
        const currParams = { ...params, financialProducts: undefined };
        const { getByTestId } = render(<FinancialDataSummary {...currParams} />);

        expect(getByTestId('There are no liabilities no data')).toBeVisible();
    });

    it('should render financial data with liabilities', () => {
        const oldProjects = getFH();
        const myProducts = [oldProjects[0], oldProjects[1]];
        myProducts[0].balanceDefault = -10;
        myProducts[0].category = 104800000;
        myProducts[1].balanceDefault = -15;
        myProducts[1].category = 104800000;

        const currParams = { ...params, financialProducts: myProducts };
        const { getByTestId } = render(<FinancialDataSummary {...currParams} />);

        const liabilities = getByTestId('There are no liabilities');
        expect(liabilities).toBeVisible();
        expect(liabilities).toHaveTextContent('-25');
    });

    it('should render financial data without assets', () => {
        const currParams = { ...params, financialProducts: undefined };
        const { getByTestId } = render(<FinancialDataSummary {...currParams} />);

        expect(getByTestId('There are no assets no data')).toBeVisible();
    });

    it('should render financial data without assets that has meaningful data', () => {
        const oldProjects = getFH();
        const myProducts = [oldProjects[0]];
        myProducts[0].balanceDefault = 0;
        myProducts[0].category = 104800002;

        const currParams = { ...params, financialProducts: myProducts };
        const { getByTestId } = render(<FinancialDataSummary {...currParams} />);

        expect(getByTestId('There are no assets no data')).toBeVisible();
    });

    it('should render financial data without assets that has meaningful category', () => {
        const myProducts = [];

        const currParams = { ...params, financialProducts: myProducts };
        const { getByTestId } = render(<FinancialDataSummary {...currParams} />);

        expect(getByTestId('There are no assets no data')).toBeVisible();
        expect(getByTestId('There are no liabilities no data')).toBeVisible();
    });

    it('should render financial data with assets', () => {
        const oldProjects = getFH();
        const myProducts = [oldProjects[0], oldProjects[1]];
        myProducts[0].balanceDefault = 10;
        myProducts[0].category = 104800002;
        myProducts[1].balanceDefault = 15;
        myProducts[1].category = 104800002;

        const currParams = { ...params, financialProducts: myProducts };
        const { getByTestId } = render(<FinancialDataSummary {...currParams} />);

        const liabilities = getByTestId('There are no assets');
        expect(liabilities).toBeVisible();
        expect(liabilities).toHaveTextContent('25');
    });

    it('should render financial data assets from bigger to smaller', () => {
        const oldProjects = getFH();
        const myProducts = [oldProjects[0], oldProjects[1]];
        myProducts[0].balanceDefault = 10;
        myProducts[0].category = 104800002;
        myProducts[1].balanceDefault = 15;
        myProducts[1].category = 104800003;

        const currParams = { ...params, financialProducts: myProducts };
        const { getByTestId } = render(<FinancialDataSummary {...currParams} />);

        const liabilities = getByTestId('There are no assets');
        expect(liabilities).toBeVisible();
        expect(liabilities.firstChild).toHaveTextContent('15');
    });

    it('should render financial data assets from bigger to smaller - 2', () => {
        const oldProjects = getFH();
        const myProducts = [oldProjects[0], oldProjects[1]];
        myProducts[0].balanceDefault = 15;
        myProducts[0].category = 104800002;
        myProducts[1].balanceDefault = 10;
        myProducts[1].category = 104800003;

        const currParams = { ...params, financialProducts: myProducts };
        const { getByTestId } = render(<FinancialDataSummary {...currParams} />);

        const liabilities = getByTestId('There are no assets');
        expect(liabilities).toBeVisible();
        expect(liabilities.firstChild).toHaveTextContent('15');
    });

    it('should render financial data component summary - heading role and no separator', () => {
        const currParams = { ...params, isCompactView: true };
        const { queryAllByRole } = render(<FinancialDataSummary {...currParams} />);
        const headingElements = queryAllByRole('heading');
        expect(headingElements).toHaveLength(3);
        expect(headingElements.filter(element => element.textContent === mainHouseholdStrings.ANNUAL_INCOME).length).toEqual(1);

        expect(queryAllByRole('separator')).toHaveLength(2);
    });

    it('should render financial data component view - header with separator', () => {
        const currParams = { ...params, isCompactView: false };
        const { queryAllByRole, getAllByRole } = render(<FinancialDataSummary {...currParams} />);

        expect(getAllByRole('heading').filter(element => element.textContent === mainHouseholdStrings.ANNUAL_INCOME).length).toEqual(1);
        expect(queryAllByRole('separator')).toHaveLength(1);
    });

    it('should render annual income 0', () => {
        const currParams = { ...params, annualIncome: 0 };
        const { getByTestId } = render(<FinancialDataSummary {...currParams} />);

        expect(getByTestId('empty-state')).toBeVisible();
    });

    it('should render annual income positive', () => {
        const { getByText } = render(<FinancialDataSummary {...params} />);

        expect(getByText(formatNumber(params.annualIncome, 'en-US', true))).toBeVisible();
    });

    const params: IFinancialDataSummaryProps = {
        isCompactView: true,
        annualIncome: 666,
        financialProducts: undefined,
        categories: new Map<number, string>(),
    };

    const getFH = () => {
        const fullMock = getFullMock();
        return fullMock.groupsArray[0]?.financialHoldings || [];
    };
});

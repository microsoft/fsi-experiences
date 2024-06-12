import React from 'react';
import { act, cleanup, render, waitFor } from '@testing-library/react';
import ProviderWrapper, { QueryClientWrapper, testingQueryClient } from '@fsi/core-components/dist/utilities/tests/ProviderWrapper';
import IncomeAndExpensesWidget from './IncomeAndExpensesWidget';
import { MockApplicantFetcher } from '../../../interfaces/mocks/ApplicantFetcher.mock';
import { MockFinancialCategoryFetcher } from '../../../interfaces/mocks/FinancialCategoryFetcher.mock';
import { INCOME_AND_EXPENSES } from '../../../constants/namespaces.const';
import { mockApplicants } from '../../../interfaces/mocks/ApplicantList.mock';

const ProvidedIncomeAndExpenses = ProviderWrapper(IncomeAndExpensesWidget);

describe('IncomeAndExpenses', () => {
    const incomeFetcher = new MockFinancialCategoryFetcher('income');
    const expenseFetcher = new MockFinancialCategoryFetcher('expense');
    const applicantFetcher = new MockApplicantFetcher();

    beforeEach(() => {
        testingQueryClient.clear();
    });

    afterEach(() => {
        cleanup();
    });

    it('Should render loading state', () => {
        const component = render(
            <ProvidedIncomeAndExpenses
                financialItemsType={INCOME_AND_EXPENSES}
                financialCategoryFetchers={[incomeFetcher, expenseFetcher]}
                applicantFetcher={applicantFetcher}
                applicantId={mockApplicants[0].id}
            />,
            {
                wrapper: QueryClientWrapper,
            }
        );

        const { getByTestId } = component;
        expect(getByTestId('loading-spinner')).toBeVisible();
    });

    it("Should render error state if can't get data", async () => {
        let component;

        jest.spyOn(incomeFetcher, 'getItems').mockImplementation(() => Promise.reject());

        await act(async () => {
            component = render(
                <ProvidedIncomeAndExpenses
                    financialItemsType={INCOME_AND_EXPENSES}
                    financialCategoryFetchers={[incomeFetcher, expenseFetcher]}
                    applicantFetcher={applicantFetcher}
                    applicantId={mockApplicants[0].id}
                />
            );
        });

        const { getByTestId } = component;

        await waitFor(() => expect(getByTestId('error-state')).toBeVisible());
    });
});

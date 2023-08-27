import React from 'react';
import { act, cleanup, render, waitFor } from '@testing-library/react';
import LoanIncomeAndExpenses from './LoanIncomeAndExpenses';
import ProviderWrapper, { testingQueryClient } from '@fsi/core-components/dist/utilities/tests/ProviderWrapper';
import { MockLoanIncomeAndExpensesFetcher } from '../../interfaces/ILoanFinancialCategory/mocks/ILoanIncomeAndExpensesFetcher.mocks';
import { incomeAndExpensesSnapshotTestID } from './IncomeAndExpensesSnapshot/IncomeAndExpensesSnapshot.const';

const ProvidedLoanIncomeAndExpenses = ProviderWrapper(LoanIncomeAndExpenses);

describe('LoanIncomeAndExpenses', () => {
    beforeEach(() => {
        testingQueryClient.clear();
    });

    afterEach(() => {
        cleanup();
    });

    it('Should render LoanIncomeAndExpenses', async () => {
        let component;

        await act(async () => {
            component = render(
                <ProvidedLoanIncomeAndExpenses
                    permissions={{ isLoanManager: true }}
                    loanApplicationId="1"
                    fetcher={new MockLoanIncomeAndExpensesFetcher()}
                />
            );
        });

        const { getByTestId } = component;

        await waitFor(() => expect(getByTestId(incomeAndExpensesSnapshotTestID)).toBeVisible());
    });

    it('Should render loading state', () => {
        const component = render(<ProvidedLoanIncomeAndExpenses fetcher={new MockLoanIncomeAndExpensesFetcher()} />);

        const { getByTestId } = component;
        expect(getByTestId('loading-spinner')).toBeVisible();
    });

    it("Should render error state if can't get data", async () => {
        const customFetcher = new MockLoanIncomeAndExpensesFetcher();
        let component;

        jest.spyOn(customFetcher, 'getIncomeAndExpenses').mockImplementation(() => Promise.reject());

        await act(async () => {
            component = render(<ProvidedLoanIncomeAndExpenses fetcher={customFetcher} />);
        });

        const { getByTestId } = component;

        await waitFor(() => expect(getByTestId('error-state')).toBeVisible());
    });
});

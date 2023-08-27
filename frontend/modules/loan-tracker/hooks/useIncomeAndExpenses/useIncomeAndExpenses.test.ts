import { waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { QueryClientWrapper, testingQueryClient } from '@fsi/core-components/dist/utilities/tests/ProviderWrapper';
import useIncomeAndExpenses from './useIncomeAndExpenses';
import { incomeAndExpensesMock } from '../../interfaces/ILoanFinancialCategory/mocks/ILoanIncomeAndExpenses.mocks';
import { mockLoanCustomers } from '../../interfaces/ILoanApplicationCustomer/mocks/ILoanApplicationCustomer.mocks';

describe('useIncomeAndExpenses tests', () => {
    const incomeAndExpensesFetcherFunc = jest.fn().mockResolvedValue(incomeAndExpensesMock);

    beforeEach(() => {
        testingQueryClient.clear();
    });

    it('Should call fetcher func', async () => {
        const { result } = renderHook(() => useIncomeAndExpenses({ incomeAndExpensesFetcherFunc, applicantId: mockLoanCustomers[0].id }), {
            wrapper: QueryClientWrapper,
        });

        await waitFor(() => !result.current.isLoading);

        expect(incomeAndExpensesFetcherFunc).toBeCalled();
    });

    it('Should calculate income and expenses', async () => {
        const { result } = renderHook(() => useIncomeAndExpenses({ incomeAndExpensesFetcherFunc, applicantId: mockLoanCustomers[0].id }), {
            wrapper: QueryClientWrapper,
        });

        await waitFor(() => !result.current.isLoading);

        const totalIncome = incomeAndExpensesMock.income.map(income => income.value).reduce((prevValue, currValue) => prevValue + currValue, 0);
        const totalExpenses = incomeAndExpensesMock.expenses.map(expense => expense.value).reduce((prevValue, currValue) => prevValue + currValue, 0);

        const applicantTotalIncome = incomeAndExpensesMock.income
            .filter(income => income.customerId === mockLoanCustomers[0].id)
            .map(income => income.value)
            .reduce((prevValue, currValue) => prevValue + currValue, 0);
        const applicantTotalExpenses = incomeAndExpensesMock.expenses
            .filter(income => income.customerId === mockLoanCustomers[0].id)
            .map(expense => expense.value)
            .reduce((prevValue, currValue) => prevValue + currValue, 0);

        expect(result.current.loanIncomeAndExpenses.totalNetBalance).toEqual(totalIncome - totalExpenses);
        expect(result.current.loanIncomeAndExpenses.totalExpenses).toEqual(totalExpenses);
        expect(result.current.loanIncomeAndExpenses.applicantNetBalance).toEqual(applicantTotalIncome - applicantTotalExpenses);
        expect(result.current.loanIncomeAndExpenses.applicantTotalExpenses).toEqual(applicantTotalExpenses);
    });

    it('Should return an error if fetching data failed', async () => {
        const incomeAndExpensesFetcherErrorFunc = jest.fn().mockRejectedValue('error');

        const { result } = renderHook(
            () =>
                useIncomeAndExpenses({
                    incomeAndExpensesFetcherFunc: incomeAndExpensesFetcherErrorFunc,
                    applicantId: mockLoanCustomers[0].id,
                }),
            { wrapper: QueryClientWrapper }
        );

        await waitFor(() => result.current.isError);

        expect(result.current.loanIncomeAndExpenses.totalNetBalance).toEqual(0);
        expect(result.current.loanIncomeAndExpenses.totalExpenses).toEqual(0);
        expect(result.current.loanIncomeAndExpenses.applicantNetBalance).toEqual(0);
        expect(result.current.loanIncomeAndExpenses.applicantTotalExpenses).toEqual(0);
        expect(result.current.loanIncomeAndExpenses.currencyId).toEqual('');
    });
});

import { renderHook, act } from '@testing-library/react-hooks';
import { incomeAndExpensesMock } from '../../interfaces/ILoanFinancialCategory/mocks/ILoanIncomeAndExpenses.mocks';
import { mockLoanCustomers } from '../../interfaces/ILoanApplicationCustomer/mocks/ILoanApplicationCustomer.mocks';
import { MockLoanApplicationIncomeAndExpensesFetcher } from '../../interfaces/ILoanFinancialCategory/mocks/ILoanApplicationIncomeAndExpensesFetcher.mock';
import { QueryClientWrapper } from '@fsi/core-components/dist/utilities/tests/ProviderWrapper';
import useLoanCustomerIncomeAndExpenses from './useLoanCustomerIncomeAndExpenses';

describe('useLoanCustomerIncomeAndExpenses tests', () => {
    it('Should calculate applicant`s income and expenses', async () => {
        const { result, waitFor } = renderHook(
            () =>
                useLoanCustomerIncomeAndExpenses({
                    fetcher: new MockLoanApplicationIncomeAndExpensesFetcher(),
                    loanApplicationId: '',
                }),
            { wrapper: QueryClientWrapper }
        );

        act(() => {
            result.current.onChangeApplicant(mockLoanCustomers[0].id);
        });

        waitFor(() => {
            expect(result.current.loanIncomeAndExpenses.applicantNetBalance).toEqual(
                incomeAndExpensesMock.income.filter(income => income.value).reduce((prevValue, currValue) => prevValue + currValue.value, 0)
            );
            expect(result.current.loanIncomeAndExpenses.applicantTotalExpenses).toEqual(
                incomeAndExpensesMock.expenses.filter(expense => expense.value).reduce((prevValue, currValue) => prevValue + currValue.value, 0)
            );
        });
    });
});

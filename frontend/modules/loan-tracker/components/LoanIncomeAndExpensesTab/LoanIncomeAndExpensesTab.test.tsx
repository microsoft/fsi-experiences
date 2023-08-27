import React from 'react';
import { render } from '@testing-library/react';
import LoanApplicationIncomeAndExpenses from './LoanIncomeAndExpensesTab';
import ProviderWrapper from '@fsi/core-components/dist/utilities/tests/ProviderWrapper';
import { MockLoanApplicationIncomeAndExpensesFetcher } from '../../interfaces/ILoanFinancialCategory/mocks/ILoanApplicationIncomeAndExpensesFetcher.mock';
import { DialogServiceContext, initialDialogServiceContextValue } from '@fsi/core-components/dist/services/DialogService';
import { REMOVE_FINANCIAL_ITEM_DIALOG, RemoveLoanFinancialItemDialog } from '../RemoveLoanFinancialItemDialog';
import { LoanFinancialItemFormDialog, INCOME_EXPENSE_ADD_EDIT_DIALOG } from '../LoanFinancialItemFormDialog';
import { ApplicantFinancialItemCategories as CATEGORIES } from '../../constants/ApplicantFinancialItemCategories.consts';

const ProvidedLoanApplicationIncomeAndExpenses = ProviderWrapper(LoanApplicationIncomeAndExpenses);
jest.mock('../RemoveLoanFinancialItemDialog');
jest.mock('../LoanFinancialItemFormDialog');

describe('LoanApplicationIncomeAndExpenses', () => {
    beforeEach(() => {
        (RemoveLoanFinancialItemDialog as any).mockReturnValue(<div>Remove Loan Dialog</div>);
        (LoanFinancialItemFormDialog as any).mockReturnValue(<div>Edit/Add Loan Dialog</div>);
    });

    it('should render loan customer lookup component', async () => {
        const { container } = render(
            <ProvidedLoanApplicationIncomeAndExpenses
                fetcher={new MockLoanApplicationIncomeAndExpensesFetcher()}
                loanApplicationId=""
                onApplicantSelectCallback={() => {}}
            />
        );

        expect(container).toBeInTheDocument();
    });

    it('should render with the remove modal opened', async () => {
        const { getByText } = render(
            <DialogServiceContext.Provider
                value={{
                    ...initialDialogServiceContextValue,
                    isOpen: true,
                    currentDialogId: REMOVE_FINANCIAL_ITEM_DIALOG,
                    context: { category: CATEGORIES.INCOME, item: { id: '1', name: 'test', description: 'test' } },
                }}
            >
                <ProvidedLoanApplicationIncomeAndExpenses
                    fetcher={new MockLoanApplicationIncomeAndExpensesFetcher()}
                    loanApplicationId=""
                    onApplicantSelectCallback={() => {}}
                />
            </DialogServiceContext.Provider>
        );

        expect(getByText('Remove Loan Dialog')).toBeInTheDocument();
    });

    it('should render with the edit modal opened', async () => {
        const { getByText } = render(
            <DialogServiceContext.Provider
                value={{
                    ...initialDialogServiceContextValue,
                    isOpen: true,
                    currentDialogId: INCOME_EXPENSE_ADD_EDIT_DIALOG,
                    context: { category: CATEGORIES.INCOME, item: { id: '1', name: 'test', description: 'test' } },
                }}
            >
                <ProvidedLoanApplicationIncomeAndExpenses
                    fetcher={new MockLoanApplicationIncomeAndExpensesFetcher()}
                    loanApplicationId=""
                    onApplicantSelectCallback={() => {}}
                />
            </DialogServiceContext.Provider>
        );

        expect(getByText('Edit/Add Loan Dialog')).toBeInTheDocument();
    });
});

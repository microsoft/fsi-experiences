import React from 'react';
import { render } from '@testing-library/react';
import LoanApplicationAssetsAndLiabilities from './LoanAssetsAndLiabilitiesTab';
import ProviderWrapper from '@fsi/core-components/dist/utilities/tests/ProviderWrapper';
import { MockLoanApplicationAssetsAndLiabilitiesFetcher } from '../../interfaces/ILoanFinancialCategory/mocks/ILoanApplicationAssetsAndLiabilitiesFetcher.mocks';
import { DialogServiceContext, initialDialogServiceContextValue } from '@fsi/core-components/dist/services/DialogService';
import { REMOVE_FINANCIAL_ITEM_DIALOG, RemoveLoanFinancialItemDialog } from '../RemoveLoanFinancialItemDialog';
import { LoanFinancialItemFormDialog, ASSET_LIABILITY_ADD_EDIT_DIALOG } from '../LoanFinancialItemFormDialog';
import { ApplicantFinancialItemCategories as CATEGORIES } from '../../constants/ApplicantFinancialItemCategories.consts';

const ProvidedLoanApplicationAssetsAndLiabilities = ProviderWrapper(LoanApplicationAssetsAndLiabilities);

jest.mock('../RemoveLoanFinancialItemDialog');
jest.mock('../LoanFinancialItemFormDialog');

describe('LoanApplicationAssetsAndLiabilities', () => {
    beforeEach(() => {
        (RemoveLoanFinancialItemDialog as any).mockReturnValue(<div>Remove Loan Dialog</div>);
        (LoanFinancialItemFormDialog as any).mockReturnValue(<div>Edit/Add Loan Dialog</div>);
    });

    it('should render loan customer lookup component', async () => {
        const { container } = render(
            <ProvidedLoanApplicationAssetsAndLiabilities
                fetcher={new MockLoanApplicationAssetsAndLiabilitiesFetcher()}
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
                    context: { category: CATEGORIES.ASSET, item: { id: '1', name: 'test', description: 'test' } },
                }}
            >
                <ProvidedLoanApplicationAssetsAndLiabilities
                    fetcher={new MockLoanApplicationAssetsAndLiabilitiesFetcher()}
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
                    currentDialogId: ASSET_LIABILITY_ADD_EDIT_DIALOG,
                    context: { category: CATEGORIES.ASSET, item: { id: '1', name: 'test', description: 'test' } },
                }}
            >
                <ProvidedLoanApplicationAssetsAndLiabilities
                    fetcher={new MockLoanApplicationAssetsAndLiabilitiesFetcher()}
                    loanApplicationId=""
                    onApplicantSelectCallback={() => {}}
                />
            </DialogServiceContext.Provider>
        );

        expect(getByText('Edit/Add Loan Dialog')).toBeInTheDocument();
    });
});

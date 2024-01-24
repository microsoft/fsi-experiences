import { DialogServiceContext, initialDialogServiceContextValue } from '@fsi/core-components/dist/services/DialogService/DialogService';
import ProviderWrapper from '@fsi/core-components/dist/utilities/tests/ProviderWrapper';
import { render } from '@testing-library/react';
import { act } from '@testing-library/react-hooks/pure';
import React from 'react';
import { ApplicantFinancialItemCategories as CATEGORIES } from '../../constants/FinancialCategories.const';
import { ASSETS_AND_LIABILITIES } from '../../constants/namespaces.const';
import { MockApplicantFetcher } from '../../interfaces/mocks/ApplicantFetcher.mock';
import { MockFinancialCategoryFetcher } from '../../interfaces/mocks/FinancialCategoryFetcher.mock';
import { ASSET_LIABILITY_ADD_EDIT_DIALOG, FinancialItemFormDialog, REMOVE_FINANCIAL_ITEM_DIALOG } from '../FinancialItemFormDialog';
import { RemoveFinancialItemDialog } from '../RemoveFinancialItemDialog';
import FinancialCategoriesGridWrapper from './FinancialCategoriesGrid';

const ProvidedApplicationFinancialCategories = ProviderWrapper(FinancialCategoriesGridWrapper);

jest.mock('../RemoveFinancialItemDialog');
jest.mock('../FinancialItemFormDialog');
describe('AssetsAndLiabilitiesGrid', () => {
    beforeEach(() => {
        (RemoveFinancialItemDialog as any).mockReturnValue(<div>Remove asset</div>);
        (FinancialItemFormDialog as any).mockReturnValue(<div>Edit asset</div>);
    });

    it('Should render assets and liabilities Grid', async () => {
        let component;
        await act(async () => {
            component = render(
                <ProvidedApplicationFinancialCategories
                    financialCategoryFetchers={[new MockFinancialCategoryFetcher('asset'), new MockFinancialCategoryFetcher('liability')]}
                    applicantFetcher={new MockApplicantFetcher()}
                    applicantId={''}
                    financialItemsType={ASSETS_AND_LIABILITIES}
                />
            );
        });
        const { container } = component;
        expect(container).toBeInTheDocument();
    });

    it('should render with the remove modal opened', async () => {
        const { getByText } = render(
            <DialogServiceContext.Provider
                value={{
                    ...initialDialogServiceContextValue,
                    context: { category: CATEGORIES.ASSET, item: { id: '1', name: 'test', description: 'test' } },
                    isOpen: true,
                    currentDialogId: REMOVE_FINANCIAL_ITEM_DIALOG,
                }}
            >
                <ProvidedApplicationFinancialCategories
                    financialCategoryFetchers={[new MockFinancialCategoryFetcher('asset'), new MockFinancialCategoryFetcher('liability')]}
                    applicantFetcher={new MockApplicantFetcher()}
                    applicantId={''}
                    financialItemsType={ASSETS_AND_LIABILITIES}
                />
            </DialogServiceContext.Provider>
        );

        expect(getByText('Remove asset')).toBeInTheDocument();
    });

    it('should render with the edit modal opened', async () => {
        const { getByText } = render(
            <DialogServiceContext.Provider
                value={{
                    ...initialDialogServiceContextValue,
                    context: { category: CATEGORIES.ASSET, item: { id: '1', name: 'test', description: 'test' } },
                    isOpen: true,
                    currentDialogId: ASSET_LIABILITY_ADD_EDIT_DIALOG,
                }}
            >
                <ProvidedApplicationFinancialCategories
                    financialCategoryFetchers={[new MockFinancialCategoryFetcher('asset'), new MockFinancialCategoryFetcher('liability')]}
                    applicantFetcher={new MockApplicantFetcher()}
                    applicantId={''}
                    financialItemsType={ASSETS_AND_LIABILITIES}
                />
            </DialogServiceContext.Provider>
        );

        expect(getByText('Edit asset')).toBeInTheDocument();
    });
});

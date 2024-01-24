import { QueryClientWrapper, testingQueryClient } from '@fsi/core-components/dist/utilities/tests/ProviderWrapper';
import { renderHook } from '@testing-library/react-hooks';
import { FinancialCategories } from '../constants/FinancialCategories.const';
import { MockFinancialCategoryFetcher } from '../interfaces/mocks/FinancialCategoryFetcher.mock';
import { mockFinancialCategoriesApplicants } from '../interfaces/mocks/IApplicant.mock';
import { assetsAndLiabilitiesMock } from '../interfaces/mocks/IAssetsAndLiabilities.mock';
import { incomeAndExpensesMock } from '../interfaces/mocks/IIncomeAndExpenses.mocks';
import useGridData from './useGridData';

describe('useAssetsAndLiabilities tests', () => {
    beforeEach(() => {
        testingQueryClient.clear();
    });

    it('Should calculate assets', async () => {
        const { result, waitFor } = renderHook(
            () =>
                useGridData({
                    fetchers: [new MockFinancialCategoryFetcher('asset'), new MockFinancialCategoryFetcher('liability')],
                    applicantId: mockFinancialCategoriesApplicants[0].id,
                    queryName: FinancialCategories['assetsAndLiabilities'].query,
                }),
            { wrapper: QueryClientWrapper }
        );
        await waitFor(() => !result.current.isLoading);

        expect(result.current.snapshot.totalAssets).toEqual(
            assetsAndLiabilitiesMock.assets.map(asset => asset.value).reduce((prevValue, currValue) => prevValue + currValue, 0)
        );
        expect(result.current.snapshot.applicantTotalAssets).toEqual(
            assetsAndLiabilitiesMock.assets
                .filter(asset => asset.customerId === mockFinancialCategoriesApplicants[0].id)
                .map(asset => asset.value)
                .reduce((prevValue, currValue) => prevValue + currValue, 0)
        );
    });
    it('Should calculate income', async () => {
        const { result, waitFor } = renderHook(
            () =>
                useGridData({
                    fetchers: [new MockFinancialCategoryFetcher('income'), new MockFinancialCategoryFetcher('expense')],
                    applicantId: mockFinancialCategoriesApplicants[0].id,
                    queryName: FinancialCategories['incomeAndExpenses'].query,
                }),
            { wrapper: QueryClientWrapper }
        );
        await waitFor(() => !result.current.isLoading);

        expect(result.current.snapshot.totalExpenses).toEqual(
            incomeAndExpensesMock.expenses.map(expense => expense.value).reduce((prevValue, currValue) => prevValue + currValue, 0)
        );
    });
});

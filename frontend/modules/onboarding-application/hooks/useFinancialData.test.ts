import { QueryClientWrapper } from '@fsi/core-components/dist/utilities/tests/ProviderWrapper';
import { renderHook } from '@testing-library/react-hooks';
import { ApplicantFinancialItemCategories } from '../constants/FinancialCategories.const';
import { MockFinancialCategoryFetcher } from '../interfaces/mocks/FinancialCategoryFetcher.mock';
import { mockAssetTypes, mockLiabilityTypes } from '../interfaces/mocks/IAssetsAndLiabilities.mock';
import { useFinancialData } from './useFinancialData';
import { ASSETS_AND_LIABILITIES_QUERY } from '../constants/FinancialCategoriesQueries.const';

describe('useFinancialData tests', () => {
    it('Should return asset types', async () => {
        const { result, waitFor } = renderHook(
            () =>
                useFinancialData({
                    fetcher: new MockFinancialCategoryFetcher('asset'),
                    applicantId: '',
                    category: ApplicantFinancialItemCategories.ASSET,
                    queryName: ASSETS_AND_LIABILITIES_QUERY,
                }),
            { wrapper: QueryClientWrapper }
        );
        await waitFor(() => !result.current.isLoading);
        expect(result.current.dataTypes).toEqual(mockAssetTypes);
    });

    it('Should return liability types', async () => {
        const { result, waitFor } = renderHook(
            () =>
                useFinancialData({
                    fetcher: new MockFinancialCategoryFetcher('liability'),
                    applicantId: '',
                    category: ApplicantFinancialItemCategories.LIABILITY,
                    queryName: ASSETS_AND_LIABILITIES_QUERY,
                }),
            { wrapper: QueryClientWrapper }
        );
        await waitFor(() => !result.current.isLoading);
        expect(result.current.dataTypes).toEqual(mockLiabilityTypes);
    });
});

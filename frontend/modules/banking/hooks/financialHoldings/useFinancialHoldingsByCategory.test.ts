import { renderHook } from '@testing-library/react-hooks';
import { FHMetadataMock } from '../../interfaces/FHEntity/mocks/FHMetadata.mock';
import { testingQueryClient, QueryClientWrapper } from '@fsi/core-components/utilities/tests/ProviderWrapper';
import { waitFor } from '@testing-library/react';
import useFinancialHoldingsByCategory from './useFinancialHoldingsByCategory';
import { getFHMapMock } from '../../components/summaryFH/FHData.mock';
import { FHData } from '../../interfaces/FHEntity/FHData';

const fhData: FHData = {
    data: getFHMapMock(),
    calculated: {
        assets: 100,
    },
    requestMetadata: {
        msfsi_FH_Account: 200,
        msfsi_FH_Creditline: 200,
        msfsi_FH_Investment: 200,
        msfsi_FH_Loan: 200,
        msfsi_FH_Saving: 200,
    },
};
const fetcher = {
    fetchFHData: jest.fn().mockResolvedValue(fhData),
    fetchFHMetadata: jest.fn().mockResolvedValue(FHMetadataMock),
    fetchInvestmentsPortfolios: jest.fn().mockResolvedValue(FHMetadataMock),
    fetchFinancialHoldingByCategory: jest.fn().mockResolvedValue({}),
    fetchFHMetadataWM: jest.fn().mockResolvedValue(FHMetadataMock),
    fetchFHMetadataByEntities: jest.fn().mockResolvedValue(FHMetadataMock),
};

const errorMetadataFetcher = {
    ...fetcher,
    fetchFHMetadata: jest.fn().mockRejectedValue('ERROR'),
};

const errorDataFetcher = {
    ...fetcher,
    fetchFHData: jest.fn().mockRejectedValue('ERROR'),
};

const contactId = 'contactId';
describe('useFinancialHoldingsByCategory tests', () => {
    beforeEach(() => {
        testingQueryClient.clear();
        fetcher.fetchFHData.mockClear();
        fetcher.fetchFHMetadata.mockClear();
    });

    it('Should call to fetchFHData and fetchFHMetadata and return valid result', async () => {
        const selectedCategory = 104800000;
        const { result } = renderHook(
            () => useFinancialHoldingsByCategory({ fetcher, contactId, financialHoldingsCategory: `${selectedCategory}` }),
            {
                wrapper: QueryClientWrapper,
            }
        );
        await waitFor(() => !result.current.isLoading);
        let sumFHOfCategory = 0;
        getFHMapMock().forEach(value => {
            if (value.category === selectedCategory) {
                sumFHOfCategory++;
            }
        });
        expect(result.current.entities).toHaveLength(sumFHOfCategory);
    });

    it('Should return an error in case fetching the data failed', async () => {
        const { result } = renderHook(() => useFinancialHoldingsByCategory({ fetcher: errorDataFetcher, contactId }), {
            wrapper: QueryClientWrapper,
        });

        await waitFor(() => result.current.isError);
        expect(result.current.entities).toEqual([]);
    });

    it('Should return an error in case fetching the metadata failed', async () => {
        const { result } = renderHook(() => useFinancialHoldingsByCategory({ fetcher: errorMetadataFetcher, contactId }), {
            wrapper: QueryClientWrapper,
        });

        await waitFor(() => result.current.isError);
        expect(result.current.metadata).toBeUndefined();
    });
});

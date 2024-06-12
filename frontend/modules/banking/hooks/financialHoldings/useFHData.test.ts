import { renderHook } from '@testing-library/react-hooks';
import { FHMetadataMock } from '../../interfaces/FHEntity/mocks/FHMetadata.mock';
import { testingQueryClient, QueryClientWrapper } from '@fsi/core-components/utilities/tests/ProviderWrapper';
import { waitFor } from '@testing-library/react';
import useFHData from './useFHData';
import { FHData } from '../../interfaces/FHEntity/';
import { toIndictableFinancialHoldings } from './useFHIndicator';
import { getFHMapMock } from '../../components/summaryFH/FHData.mock';

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
describe('useFHData tests', () => {
    beforeEach(() => {
        testingQueryClient.clear();
        fetcher.fetchFHData.mockClear();
        fetcher.fetchFHMetadata.mockClear();
    });

    it('Should call to fetchFHData and fetchFHMetadata and return valid result', async () => {
        const { result } = renderHook(() => useFHData({ fetcher, contactId }), { wrapper: QueryClientWrapper });
        await waitFor(() => !result.current.isLoading);

        expect(fetcher.fetchFHData).toHaveBeenCalledWith(contactId, true, undefined);
        expect(fetcher.fetchFHMetadata).toBeCalled();

        const entitiesWitIndicators = toIndictableFinancialHoldings(fhData, FHMetadataMock);
        expect(result.current.entities.length).toEqual(entitiesWitIndicators.length);

        expect(result.current.entities[0].indicator.length).toEqual(entitiesWitIndicators[0].indicator.length);
        expect(result.current.metadata).toEqual(FHMetadataMock);
        expect(result.current.calculated).toEqual(fhData.calculated);
        expect(result.current.categoriesMetadata).toEqual(fhData.requestMetadata);
        expect(result.current.isError).toEqual(false);
    });

    it('Should return an error in case fetching the data failed', async () => {
        const { result } = renderHook(() => useFHData({ fetcher: errorDataFetcher, contactId }), { wrapper: QueryClientWrapper });

        await waitFor(() => result.current.isError);
        expect(result.current.entities).toEqual([]);
    });

    it('Should return an error in case fetching the metadata failed', async () => {
        const { result } = renderHook(() => useFHData({ fetcher: errorMetadataFetcher, contactId }), { wrapper: QueryClientWrapper });

        await waitFor(() => result.current.isError);
        expect(result.current.metadata).toBeUndefined();
    });
});

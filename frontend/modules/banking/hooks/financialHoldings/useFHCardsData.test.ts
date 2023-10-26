import { renderHook } from '@testing-library/react-hooks';
import { testingQueryClient, QueryClientWrapper } from '@fsi/core-components/dist/utilities/tests/ProviderWrapper';
import { waitFor } from '@testing-library/react';
import { getFHMapMock } from '../../components/summaryFH/FHData.mock';
import useFHCardsData from './useFHCardsData';
import { FHMetadataMock } from '../../interfaces/FHEntity/mocks/FHMetadata.mock';

const fetcher = {
    fetchFHCardsData: jest.fn().mockResolvedValue({ financialHoldings: getFHMapMock(), hasAccess: true }),
    fetchFHMetadata: jest.fn().mockResolvedValue(FHMetadataMock),
};

const errorMetadataFetcher = {
    ...fetcher,
    fetchFHMetadata: jest.fn().mockRejectedValue('ERROR'),
};

const errorDataFetcher = {
    ...fetcher,
    fetchFHCardsData: jest.fn().mockRejectedValue('ERROR'),
};

const contactId = 'contactId';
describe('useFHCardsData tests', () => {
    beforeEach(() => {
        testingQueryClient.clear();
        fetcher.fetchFHCardsData.mockClear();
        fetcher.fetchFHMetadata.mockClear();
    });

    it('Should call to fetchFHData and fetchFHMetadata and return valid result', async () => {
        const { result } = renderHook(() => useFHCardsData({ fetcher, contactId }), { wrapper: QueryClientWrapper });
        await waitFor(() => !result.current.isLoading);

        expect(fetcher.fetchFHCardsData).toHaveBeenCalledWith(contactId);
        expect(fetcher.fetchFHMetadata).toBeCalled();

        expect(result.current.entities).toEqual(getFHMapMock());
        expect(result.current.metadata).toEqual(FHMetadataMock);
        expect(result.current.isError).toEqual(false);
    });

    it('Should return an error in case fetching the data failed', async () => {
        const { result } = renderHook(() => useFHCardsData({ fetcher: errorDataFetcher, contactId }), { wrapper: QueryClientWrapper });

        await waitFor(() => result.current.isError);
        expect(result.current.entities).toBeUndefined();
    });

    it('Should return an error in case fetching the metadata failed', async () => {
        const { result } = renderHook(() => useFHCardsData({ fetcher: errorMetadataFetcher, contactId }), { wrapper: QueryClientWrapper });

        await waitFor(() => result.current.isError);
        expect(result.current.metadata).toBeUndefined();
    });
});

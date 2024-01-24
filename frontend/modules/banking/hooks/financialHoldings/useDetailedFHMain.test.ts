import { renderHook } from '@testing-library/react-hooks';
import { FHMetadataMock } from '../../interfaces/FHEntity/mocks/FHMetadata.mock';
import { testingQueryClient, QueryClientWrapper } from '@fsi/core-components/dist/utilities/tests/ProviderWrapper';
import { waitFor } from '@testing-library/react';
import { FHData } from '../../interfaces/FHEntity/FHData';
import useDetailedFHMain from './useDetailedFHMain';
import { fhOtherCustomersOwnMock } from '../../components/detailedFinancialHolding/CustomerFH.mock';
import { getFHMapMock } from '../../components/summaryFH/FHData.mock';
import { toIndictableFinancialHoldings } from './useFHIndicator';

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
    fetchFHOtherCustomersOwn: jest.fn().mockResolvedValue(fhOtherCustomersOwnMock),
    fetchFinancialHoldingByCategory: jest.fn().mockResolvedValue(fhOtherCustomersOwnMock),
};

const errorMetadataFetcher = {
    ...fetcher,
    fetchFHMetadata: jest.fn().mockRejectedValue('ERROR'),
};

const errorDataFetcher = {
    ...fetcher,
    fetchFHData: jest.fn().mockRejectedValue('ERROR'),
};

const errorCustomerFetcher = {
    ...fetcher,
    fetchFHOtherCustomersOwn: jest.fn().mockRejectedValue('ERROR'),
};
const contactId = 'contactId';
describe('useDetailedFH tests', () => {
    beforeEach(() => {
        testingQueryClient.clear();
        fetcher.fetchFHData.mockClear();
        fetcher.fetchFHMetadata.mockClear();
        fetcher.fetchFHOtherCustomersOwn.mockClear();
        fetcher.fetchFinancialHoldingByCategory.mockClear();
    });

    it('Should call to fetchFHData, fetchFHMetadata, fetchFHOtherCustomersOwn  and return valid result', async () => {
        const { result } = renderHook(() => useDetailedFHMain({ fetcher, contactId }), { wrapper: QueryClientWrapper });
        await waitFor(() => !result.current.isLoading);

        const {
            current: { metadata, entities, calculated, fhStructure, isError, categoriesMetadata },
        } = result;
        expect(fetcher.fetchFHData).toHaveBeenCalledWith(contactId, true);
        expect(fetcher.fetchFHOtherCustomersOwn).toHaveBeenCalledWith(contactId);
        expect(fetcher.fetchFHMetadata).toBeCalled();

        const entitiesWitIndicators = toIndictableFinancialHoldings(fhData, FHMetadataMock);
        expect(entities.length).toEqual(entitiesWitIndicators.length);

        expect(entities[0].indicator.length).toEqual(entitiesWitIndicators[0].indicator.length);

        expect(metadata).toEqual(FHMetadataMock);
        expect(calculated).toEqual(fhData.calculated);
        expect(categoriesMetadata).toEqual(fhData.requestMetadata);

        expect(fhStructure?.length).toEqual(fhOtherCustomersOwnMock.size);
        expect(fhStructure?.[0].owners).toEqual(fhOtherCustomersOwnMock.get(entities[0].id));

        expect(isError).toEqual(false);
    });

    it('Should return an error in case fetching the data failed', async () => {
        const { result } = renderHook(() => useDetailedFHMain({ fetcher: errorDataFetcher, contactId }), { wrapper: QueryClientWrapper });

        await waitFor(() => result.current.isError);
        expect(result.current.entities).toEqual([]);
    });

    it('Should return an error in case fetching the metadata failed', async () => {
        const { result } = renderHook(() => useDetailedFHMain({ fetcher: errorMetadataFetcher, contactId }), { wrapper: QueryClientWrapper });

        await waitFor(() => result.current.isError);
        expect(result.current.metadata).toBeUndefined();
    });

    it('Should return an error in case fetching the related customers failed', async () => {
        const { result } = renderHook(() => useDetailedFHMain({ fetcher: errorCustomerFetcher, contactId }), { wrapper: QueryClientWrapper });

        await waitFor(() => result.current.isError);
        expect(result.current.fhStructure).toEqual([]);
    });
});

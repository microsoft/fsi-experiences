import { renderHook } from '@testing-library/react-hooks';
import { FHMetadataMock } from '../../interfaces/FHEntity/mocks/FHMetadata.mock';
import { testingQueryClient, QueryClientWrapper } from '@fsi/core-components/dist/utilities/tests/ProviderWrapper';
import { useFHMetadata } from './useFHMetadata';
import { waitFor } from '@testing-library/react';

const getMetadata = jest.fn().mockResolvedValue(FHMetadataMock);
const getMetadataError = jest.fn().mockRejectedValue('ERROR');

describe('useFHMetadata tests', () => {
    beforeEach(() => {
        testingQueryClient.clear();
        getMetadata.mockClear();
        getMetadataError.mockClear();
    });

    it('Should call to getMetadata and return FHMetadataMock', async () => {
        const { result } = renderHook(() => useFHMetadata(getMetadata), { wrapper: QueryClientWrapper });

        await waitFor(() => result.current.isSuccess);
        expect(getMetadata).toBeCalled();
        expect(result.current.data).toEqual(FHMetadataMock);
    });
    it('Should call to getMetadata and return error', async () => {
        const { result } = renderHook(() => useFHMetadata(getMetadataError), { wrapper: QueryClientWrapper });

        await waitFor(() => result.current.isError);
        expect(getMetadataError).toBeCalled();
        expect(result.current.data).toBeUndefined();
        expect(result.current.error).toEqual('ERROR');
    });
});

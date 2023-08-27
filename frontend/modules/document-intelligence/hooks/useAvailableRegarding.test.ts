import { renderHook } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react';
import { testingQueryClient, QueryClientWrapper } from '@fsi/core-components/dist/utilities/tests/ProviderWrapper';
import { MockDocumentsFetcher } from '../interfaces/mocks/MockDocumentsFetcher';
import { IDocumentsFetcher } from '../interfaces/IDocumentsFetcher';
import * as regardingEntities from '../interfaces/mocks/RegardingData.mock';
import { useAvailableRegarding } from './useAvailableRegarding';

const mockFetcher = new MockDocumentsFetcher();

const errorFetcher = {
    ...mockFetcher,
    getContextRegardingEntities: (contextId: string) => Promise.reject('error'),
} as IDocumentsFetcher;

const simpleFetcher = {
    ...mockFetcher,
    getContextRegardingEntities: (contextId: string) => Promise.resolve(Object.values(regardingEntities)),
} as IDocumentsFetcher;

const contextId = 'contextId';

describe('useAvailableRegarding', () => {
    beforeEach(() => {
        testingQueryClient.clear();
    });

    it('Should call getContextRegardingEntities', async () => {
        const getRegardingEntitiesSpy = jest.spyOn(mockFetcher, 'getContextRegardingEntities');
        renderHook(() => useAvailableRegarding(mockFetcher, contextId), {
            wrapper: QueryClientWrapper,
        });
        expect(getRegardingEntitiesSpy).toBeCalledWith(contextId);
    });

    it('Should return an error in case fetching the data failed', async () => {
        const { result } = renderHook(() => useAvailableRegarding(errorFetcher, contextId), {
            wrapper: QueryClientWrapper,
        });
        await waitFor(() => !result.current.isLoading);
        expect(result.current.isError).toBeTruthy();
    });

    it('Should return loading', async () => {
        const { result } = renderHook(() => useAvailableRegarding(errorFetcher, contextId), {
            wrapper: QueryClientWrapper,
        });
        expect(result.current.isLoading).toBeTruthy();
    });

    it('Should return valid response', async () => {
        const getRegardingEntitiesSpy = jest.spyOn(simpleFetcher, 'getContextRegardingEntities');
        const { result } = renderHook(() => useAvailableRegarding(simpleFetcher, contextId), {
            wrapper: QueryClientWrapper,
        });
        expect(getRegardingEntitiesSpy).toBeCalledWith(contextId);
        await waitFor(() => !result.current.isLoading);
        expect(result.current.isError).toBeFalsy();
        expect(result.current.regardingEntities).toEqual(Object.values(regardingEntities));
    });
});

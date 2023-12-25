import { renderHook } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react';
import { testingQueryClient, QueryClientWrapper } from '@fsi/core-components/dist/utilities/tests/ProviderWrapper';
import { MockDocumentsFetcher } from '../interfaces/mocks/MockDocumentsFetcher';
import { IDocumentsFetcher } from '../interfaces/IDocumentsFetcher';
import * as definitions from '../interfaces/mocks/DocumentDefinition.mock';
import { useDocumentDefinitions } from './useDocumentDefinitions';

const mockFetcher = new MockDocumentsFetcher();

const errorFetcher = {
    ...mockFetcher,
    getDocumentDefinitions: () => Promise.reject('error'),
} as IDocumentsFetcher;

const simpleFetcher = {
    ...mockFetcher,
    getDocumentDefinitions: () => Promise.resolve(Object.values(definitions)),
} as IDocumentsFetcher;

describe('useDocumentDefinitions', () => {
    beforeEach(() => {
        testingQueryClient.clear();
    });

    it('Should call getPipelineMessages', async () => {
        const getPipelineMessagesSpy = jest.spyOn(mockFetcher, 'getDocumentDefinitions');
        renderHook(() => useDocumentDefinitions(mockFetcher), {
            wrapper: QueryClientWrapper,
        });
        expect(getPipelineMessagesSpy).toBeCalledTimes(1);
    });

    it('Should return an error in case fetching the data failed', async () => {
        const { result } = renderHook(() => useDocumentDefinitions(errorFetcher), {
            wrapper: QueryClientWrapper,
        });
        await waitFor(() => !result.current.isLoading);
        expect(result.current.isError).toBeTruthy();
    });

    it('Should return loading', async () => {
        const { result } = renderHook(() => useDocumentDefinitions(errorFetcher), {
            wrapper: QueryClientWrapper,
        });
        expect(result.current.isLoading).toBeTruthy();
    });

    it('Should return valid response', async () => {
        const getPipelineMessagesSpy = jest.spyOn(simpleFetcher, 'getDocumentDefinitions');
        const { result } = renderHook(() => useDocumentDefinitions(simpleFetcher), {
            wrapper: QueryClientWrapper,
        });
        expect(getPipelineMessagesSpy).toBeCalledTimes(1);
        await waitFor(() => !result.current.isLoading);
        expect(result.current.isError).toBeFalsy();
        expect(result.current.definitions).toEqual(Object.values(definitions));
    });
});

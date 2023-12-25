import { renderHook } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react';
import { testingQueryClient, QueryClientWrapper } from '@fsi/core-components/dist/utilities/tests/ProviderWrapper';
import { MockDocumentsFetcher } from '../interfaces/mocks/MockDocumentsFetcher';
import { IDocumentsFetcher } from '../interfaces/IDocumentsFetcher';
import { stepsDefinitions } from '../interfaces/mocks/StepsDefinitions.mock';
import { useStepsDefinitions } from './useStepsDefinitions';

const mockFetcher = new MockDocumentsFetcher();

const errorFetcher = {
    ...mockFetcher,
    getStepsDefinitions: documentDefinitionId => Promise.reject('error'),
} as IDocumentsFetcher;

const simpleFetcher = {
    ...mockFetcher,
    getStepsDefinitions: documentDefinitionId => Promise.resolve(stepsDefinitions),
} as IDocumentsFetcher;

describe('useStepsDefinitions', () => {
    beforeEach(() => {
        testingQueryClient.clear();
    });

    it('should call getStepsDefinitions', async () => {
        const getStepsDefinitionsSpy = jest.spyOn(mockFetcher, 'getStepsDefinitions');
        renderHook(() => useStepsDefinitions(mockFetcher, '1'), {
            wrapper: QueryClientWrapper,
        });
        expect(getStepsDefinitionsSpy).toBeCalledTimes(1);
    });

    it('should return an error in case fetching the data failed', async () => {
        const { result } = renderHook(() => useStepsDefinitions(errorFetcher, '1'), {
            wrapper: QueryClientWrapper,
        });
        await waitFor(() => !result.current.isLoading);
        expect(result.current.isError).toBeTruthy();
    });

    it('should return loading', async () => {
        const { result } = renderHook(() => useStepsDefinitions(errorFetcher, '1'), {
            wrapper: QueryClientWrapper,
        });
        expect(result.current.isLoading).toBeTruthy();
    });

    it('should return valid response', async () => {
        const getStepsDefinitionsSpy = jest.spyOn(simpleFetcher, 'getStepsDefinitions');
        const { result } = renderHook(() => useStepsDefinitions(simpleFetcher, '1'), {
            wrapper: QueryClientWrapper,
        });
        expect(getStepsDefinitionsSpy).toBeCalledTimes(1);
        await waitFor(() => !result.current.isLoading);
        expect(result.current.isError).toBeFalsy();
        expect(result.current.stepsDefinitions).toEqual(stepsDefinitions);
    });
});

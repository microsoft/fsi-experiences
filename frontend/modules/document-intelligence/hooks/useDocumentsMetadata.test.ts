import { renderHook } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react';
import { testingQueryClient, QueryClientWrapper } from '@fsi/core-components/dist/utilities/tests/ProviderWrapper';
import { MockDocumentsFetcher } from '../interfaces/mocks/MockDocumentsFetcher';
import { IDocumentsFetcher } from '../interfaces/IDocumentsFetcher';
import * as pipelineMessages from '../interfaces/mocks/PipelineStatusMessage.mock';
import { useDocumentsMetadata } from './useDocumentsMetadata';
import { DocumentPipelineStatus } from '../constants/PipelineStatuses.const';

const mockFetcher = new MockDocumentsFetcher();

const errorFetcher = {
    ...mockFetcher,
    getDocuments: (contextId: string) => Promise.reject('error'),
} as IDocumentsFetcher;

const simpleFetcher = {
    ...mockFetcher,
    getDocumentsMetadata: () => Promise.resolve({ pipelineMessages: [pipelineMessages.statusMessageApprove] }),
} as IDocumentsFetcher;

describe('usePipelineMessages', () => {
    beforeEach(() => {
        testingQueryClient.clear();
    });

    it('Should call getPipelineMessages', async () => {
        const getPipelineMessagesSpy = jest.spyOn(mockFetcher, 'getDocumentsMetadata');
        renderHook(() => useDocumentsMetadata(mockFetcher), {
            wrapper: QueryClientWrapper,
        });
        expect(getPipelineMessagesSpy).toBeCalledTimes(1);
    });

    it('Should return an error in case fetching the data failed', async () => {
        const { result } = renderHook(() => useDocumentsMetadata(errorFetcher), {
            wrapper: QueryClientWrapper,
        });
        await waitFor(() => !result.current.isLoading);
        expect(result.current.isError).toBeTruthy();
    });

    it('Should return loading', async () => {
        const { result } = renderHook(() => useDocumentsMetadata(errorFetcher), {
            wrapper: QueryClientWrapper,
        });
        expect(result.current.isLoading).toBeTruthy();
    });

    it('Should return valid response', async () => {
        const getPipelineMessagesSpy = jest.spyOn(simpleFetcher, 'getDocumentsMetadata');
        const { result } = renderHook(() => useDocumentsMetadata(simpleFetcher), {
            wrapper: QueryClientWrapper,
        });
        expect(getPipelineMessagesSpy).toBeCalledTimes(1);
        await waitFor(() => !result.current.isLoading);
        expect(result.current.isError).toBeFalsy();
        expect(result.current.statuses).toEqual({
            [DocumentPipelineStatus.Approved]: pipelineMessages.statusMessageApprove,
        });
    });
});

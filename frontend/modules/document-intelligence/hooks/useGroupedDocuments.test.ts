import { renderHook } from '@testing-library/react-hooks';
import { testingQueryClient, QueryClientWrapper } from '@fsi/core-components/dist/utilities/tests/ProviderWrapper';
import { waitFor } from '@testing-library/react';
import { MockDocumentsFetcher } from '../interfaces/mocks/MockDocumentsFetcher';
import { useGroupedDocuments } from './useGroupedDocuments';
import { IDocumentsFetcher } from '../interfaces/IDocumentsFetcher';
import * as documentsMock from '../interfaces/mocks/DocumentData.mock';
import * as pipelineMessages from '../interfaces/mocks/PipelineStatusMessage.mock';

const mockFetcher = new MockDocumentsFetcher();

const errorFetcher = {
    ...mockFetcher,
    getDocuments: (contextId: string) => Promise.reject('error'),
} as IDocumentsFetcher;

const simpleFetcher = {
    ...mockFetcher,
    getDocuments: (contextId: string) => Promise.resolve([documentsMock.approvedDocMock, documentsMock.recApprovalDocMock]),
    getDocumentsMetadata: () => Promise.resolve({ pipelineMessages: [pipelineMessages.statusMessageApprove] }),
} as IDocumentsFetcher;

const contextId = '123';

describe('useGroupedDocuments tests', () => {
    beforeEach(() => {
        testingQueryClient.clear();
    });

    it('Should call getDocuments', async () => {
        const getDocsSpy = jest.spyOn(mockFetcher, 'getDocuments');
        renderHook(() => useGroupedDocuments(mockFetcher, contextId), {
            wrapper: QueryClientWrapper,
        });
        expect(getDocsSpy).toBeCalledTimes(1);
    });

    it('Should return an error in case fetching the data failed', async () => {
        const { result } = renderHook(() => useGroupedDocuments(errorFetcher, contextId), {
            wrapper: QueryClientWrapper,
        });
        await waitFor(() => !result.current.isLoading);
        expect(result.current.isError).toBeTruthy();
    });

    it('Should return loading', async () => {
        const { result } = renderHook(() => useGroupedDocuments(errorFetcher, contextId), {
            wrapper: QueryClientWrapper,
        });
        expect(result.current.isLoading).toBeTruthy();
    });

    it('Should return valid response', async () => {
        const getDocsSpy = jest.spyOn(simpleFetcher, 'getDocuments');
        const { result } = renderHook(() => useGroupedDocuments(simpleFetcher, contextId), {
            wrapper: QueryClientWrapper,
        });
        expect(getDocsSpy).toBeCalledTimes(1);
        await waitFor(() => !result.current.isLoading);
        expect(result.current.isError).toBeFalsy();
        const pendingApprove = documentsMock.recApprovalDocMock;
        expect(result.current.sections).toEqual({
            FOR_REVIEW: [
                {
                    ...pendingApprove,
                    pipelineResult: {
                        ...pendingApprove.pipelineResult,
                        docPipelineStatusMessage: pipelineMessages.statusMessageApprove,
                    },
                },
            ],
            ACTION_REQUIRED: [],
            APPROVED: [documentsMock.approvedDocMock],
        });
    });

    it('Should sort documents according to status date', async () => {
        const doc = documentsMock.approvedDocMock;
        const doc2 = { ...doc, lastStatusDate: new Date(2020, 0, 1) };
        const fetcher = {
            ...mockFetcher,
            getDocuments: (contextId: string) => Promise.resolve([doc2, doc]),
            getDocumentsMetadata: () => Promise.resolve({ pipelineMessages: [pipelineMessages.statusMessageApprove] }),
        } as IDocumentsFetcher;
        const { result } = renderHook(() => useGroupedDocuments(fetcher, contextId), {
            wrapper: QueryClientWrapper,
        });
        await waitFor(() => !result.current.isLoading);
        expect(result.current.isError).toBeFalsy();
        expect(result.current.sections).toEqual({
            FOR_REVIEW: [],
            ACTION_REQUIRED: [],
            APPROVED: [doc, doc2],
        });
    });

    it('Should sort documents according to status date when date is empty', async () => {
        const doc = documentsMock.approvedDocMock;
        const doc2 = { ...doc, lastStatusDate: undefined };
        const doc3 = { ...doc, lastStatusDate: undefined };
        const fetcher = {
            ...mockFetcher,
            getDocuments: (contextId: string) => Promise.resolve([doc2, doc3, doc]),
            getDocumentsMetadata: () => Promise.resolve({ pipelineMessages: [pipelineMessages.statusMessageApprove] }),
        } as IDocumentsFetcher;
        const { result } = renderHook(() => useGroupedDocuments(fetcher, contextId), {
            wrapper: QueryClientWrapper,
        });
        await waitFor(() => !result.current.isLoading);
        expect(result.current.isError).toBeFalsy();
        expect(result.current.sections).toEqual({
            FOR_REVIEW: [],
            ACTION_REQUIRED: [],
            APPROVED: [doc, doc3, doc2],
        });
    });
});

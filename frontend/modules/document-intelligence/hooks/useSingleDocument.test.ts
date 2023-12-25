import { renderHook } from '@testing-library/react-hooks';
import { testingQueryClient, QueryClientWrapper } from '@fsi/core-components/dist/utilities/tests/ProviderWrapper';
import { waitFor } from '@testing-library/react';
import { MockDocumentDetailsFetcher } from '../interfaces/mocks/MockDocumentDetailsFetcher';
import { useSingleDocument } from './useSingleDocument';
import { IDocumentDetailsFetcher } from '../interfaces/IDocumentsFetcher';
import * as documentsMock from '../interfaces/mocks/DocumentData.mock';
import * as pipelineMessages from '../interfaces/mocks/PipelineStatusMessage.mock';

const mockFetcher = new MockDocumentDetailsFetcher();

const errorFetcher = {
    ...mockFetcher,
    getSingleDocument: (docId: string) => Promise.reject('error'),
} as IDocumentDetailsFetcher;

const simpleFetcher = {
    ...mockFetcher,
    getSingleDocument: (docId: string) => Promise.resolve(documentsMock.approvedDocMock),
    getDocumentsMetadata: () => Promise.resolve({ pipelineMessages: [pipelineMessages.statusMessageApprove] }),
} as IDocumentDetailsFetcher;

const docId = '123';

describe('useSingleDocument tests', () => {
    beforeEach(() => {
        testingQueryClient.clear();
    });

    it('Should call getDocuments', async () => {
        const getDocsSpy = jest.spyOn(mockFetcher, 'getSingleDocument');
        renderHook(() => useSingleDocument(mockFetcher, docId), {
            wrapper: QueryClientWrapper,
        });
        expect(getDocsSpy).toBeCalledTimes(1);
    });

    it('Should return an error in case fetching the data failed', async () => {
        const { result } = renderHook(() => useSingleDocument(errorFetcher, docId), {
            wrapper: QueryClientWrapper,
        });
        await waitFor(() => !result.current.isLoading);
        expect(result.current.isError).toBeTruthy();
    });

    it('Should return loading', async () => {
        const { result } = renderHook(() => useSingleDocument(errorFetcher, docId), {
            wrapper: QueryClientWrapper,
        });
        expect(result.current.isLoading).toBeTruthy();
    });

    it('Should return valid response', async () => {
        const getDocsSpy = jest.spyOn(simpleFetcher, 'getSingleDocument');
        const { result } = renderHook(() => useSingleDocument(simpleFetcher, docId), {
            wrapper: QueryClientWrapper,
        });
        expect(getDocsSpy).toBeCalledTimes(1);
        await waitFor(() => !result.current.isLoading);
        expect(result.current.isError).toBeFalsy();
        expect(result.current.document).toEqual(documentsMock.approvedDocMock);
    });
});

import { renderHook } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react';
import { testingQueryClient, QueryClientWrapper } from '@fsi/core-components/dist/utilities/tests/ProviderWrapper';
import { MockDocumentsFetcher } from '../interfaces/mocks/MockDocumentsFetcher';
import { IDocumentsFetcher } from '../interfaces/IDocumentsFetcher';
import * as documents from '../interfaces/mocks/DocumentData.mock';
import { IDocumentRequest } from '../interfaces/IDocument';
import { useUploadDocumentFile } from './useUploadDocumentFile';

const mockFetcher = new MockDocumentsFetcher();

const errorFetcher = {
    ...mockFetcher,
    uploadDocument: (document: IDocumentRequest, file: File, oldFileId?: string) => Promise.reject('error'),
} as IDocumentsFetcher;

const simpleFetcher = {
    ...mockFetcher,
    uploadDocument: (document: IDocumentRequest, file: File, oldFileId?: string) => Promise.resolve(documents.approvedDocMock),
} as IDocumentsFetcher;

describe('usePipelineMessages', () => {
    beforeEach(() => {
        testingQueryClient.clear();
    });

    it('Should call uploadDocument', async () => {
        const uploadDocumentSpy = jest.spyOn(simpleFetcher, 'uploadDocument');
        const { result } = renderHook(() => useUploadDocumentFile(simpleFetcher), {
            wrapper: QueryClientWrapper,
        });
        const params = {
            document: documents.approvedDocMock,
            file: new File([], 'test.pdf'),
        };
        result.current.mutate(params);
        await waitFor(() => !result.current.isLoading);
        expect(uploadDocumentSpy).toBeCalledWith(params.document, params.file);
    });

    it('Should return an error when uploading failed after loading', async () => {
        const uploadDocumentSpy = jest.spyOn(errorFetcher, 'uploadDocument');
        const { result } = renderHook(() => useUploadDocumentFile(errorFetcher), {
            wrapper: QueryClientWrapper,
        });
        const params = {
            document: documents.approvedDocMock,
            file: new File([], 'test.pdf'),
        };
        result.current.mutate(params);
        await waitFor(() => !result.current.isLoading);
        expect(uploadDocumentSpy).toBeCalledWith(params.document, params.file);
        expect(result.current.isError).toBeTruthy();
    });
});

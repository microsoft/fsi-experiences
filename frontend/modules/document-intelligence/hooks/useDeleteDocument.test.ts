import { renderHook } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react';
import { testingQueryClient, QueryClientWrapper } from '@fsi/core-components/dist/utilities/tests/ProviderWrapper';
import { MockDocumentsFetcher } from '../interfaces/mocks/MockDocumentsFetcher';
import { IDocumentsFetcher } from '../interfaces/IDocumentsFetcher';
import * as documents from '../interfaces/mocks/DocumentData.mock';
import { useDeleteDocument } from './useDeleteDocument';
import { IDocumentRequest } from '../interfaces/IDocument';

const mockFetcher = new MockDocumentsFetcher();

const errorFetcher = {
    ...mockFetcher,
    removeDocument: (document: IDocumentRequest, deleteRequest: boolean) => Promise.reject('error'),
} as IDocumentsFetcher;

const simpleFetcher = {
    ...mockFetcher,
    removeDocument: (document: IDocumentRequest, deleteRequest: boolean) => Promise.resolve(true),
} as IDocumentsFetcher;

describe('useDeleteDocument', () => {
    beforeEach(() => {
        testingQueryClient.clear();
    });

    it('Should call removeDocument', async () => {
        const removeDocumentSpy = jest.spyOn(simpleFetcher, 'removeDocument');
        const { result } = renderHook(() => useDeleteDocument(simpleFetcher), {
            wrapper: QueryClientWrapper,
        });
        const params = {
            document: documents.approvedDocMock,
            deleteRequest: true,
        };
        result.current.mutate(params);
        await waitFor(() => !result.current.isLoading);
        expect(removeDocumentSpy).toBeCalledWith(params.document, params.deleteRequest);
    });

    it('Should return an error when deleting failed after loading', async () => {
        const removeDocumentSpy = jest.spyOn(errorFetcher, 'removeDocument');
        const { result } = renderHook(() => useDeleteDocument(errorFetcher), {
            wrapper: QueryClientWrapper,
        });
        const params = {
            document: documents.approvedDocMock,
            deleteRequest: true,
        };
        result.current.mutate(params);
        await waitFor(() => !result.current.isLoading);
        expect(removeDocumentSpy).toBeCalledWith(params.document, params.deleteRequest);
        expect(result.current.isError).toBeTruthy();
    });
});

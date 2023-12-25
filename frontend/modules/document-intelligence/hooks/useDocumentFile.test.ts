import { renderHook } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react';
import { testingQueryClient, QueryClientWrapper } from '@fsi/core-components/dist/utilities/tests/ProviderWrapper';
import { MockDocumentsFetcher } from '../interfaces/mocks/MockDocumentsFetcher';
import { IDocumentsFetcher } from '../interfaces/IDocumentsFetcher';
import { useDocumentFile } from './useDocumentFile';

const mockFetcher = new MockDocumentsFetcher();

const errorFetcher = {
    ...mockFetcher,
    getDocumentFile: (documentId: string) => Promise.reject('error'),
} as IDocumentsFetcher;

const simpleFetcher = {
    ...mockFetcher,
    getDocumentFile: (documentId: string) => Promise.resolve({ fileURL: 'fileBase64', fileId: 'fileId' }),
} as IDocumentsFetcher;

const docId = 'docId';
const getDocumentFileSpy = jest.spyOn(simpleFetcher, 'getDocumentFile');

describe('useDocumentFile', () => {
    beforeEach(() => {
        testingQueryClient.clear();
        getDocumentFileSpy.mockClear();
    });

    it('Should call getDocumentFile', async () => {
        renderHook(() => useDocumentFile(simpleFetcher, docId), {
            wrapper: QueryClientWrapper,
        });
        expect(getDocumentFileSpy).toBeCalledTimes(1);
        expect(getDocumentFileSpy).toBeCalledWith(docId);
    });

    it('Should return an error in case fetching the file failed', async () => {
        const { result } = renderHook(() => useDocumentFile(errorFetcher, docId), {
            wrapper: QueryClientWrapper,
        });
        await waitFor(() => !result.current.isLoading);
        expect(result.current.isError).toBeTruthy();
    });

    it('Should return loading', async () => {
        const { result } = renderHook(() => useDocumentFile(mockFetcher, docId), {
            wrapper: QueryClientWrapper,
        });
        await waitFor(() => result.current.isLoading);
        expect(result.current.isLoading).toBeTruthy();
    });

    it('Should not fetch file without doc id', async () => {
        getDocumentFileSpy.mockClear();
        renderHook(() => useDocumentFile(mockFetcher, undefined), {
            wrapper: QueryClientWrapper,
        });
        expect(getDocumentFileSpy).not.toBeCalled();
    });

    it('Should return valid response', async () => {
        const { result } = renderHook(() => useDocumentFile(simpleFetcher, docId), {
            wrapper: QueryClientWrapper,
        });
        await waitFor(() => !result.current.isLoading);
        expect(result.current.file).toEqual({ fileURL: 'fileBase64', fileId: 'fileId' });
    });
});

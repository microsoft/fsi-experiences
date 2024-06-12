import { renderHook } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react';
import { testingQueryClient, QueryClientWrapper } from '@fsi/core-components/dist/utilities/tests/ProviderWrapper';
import { MockDocumentsFetcher } from '../interfaces/mocks/MockDocumentsFetcher';
import { IDocumentsFetcher } from '../interfaces/IDocumentsFetcher';
import * as documents from '../interfaces/mocks/DocumentData.mock';
import { DocumentStatus, IDocumentRequest } from '../interfaces/IDocument';
import { useUpdateDocumentStatus } from './useUpdateDocumentStatus';
import diStrings from '../assets/strings/DocumentIntelligence/DocumentIntelligence.1033.json';

const mockFetcher = new MockDocumentsFetcher();

const errorFetcher = {
    ...mockFetcher,
    updateDocumentStatus: (document: IDocumentRequest, status: number) => Promise.reject('error'),
} as IDocumentsFetcher;

const simpleFetcher = {
    ...mockFetcher,
    updateDocumentStatus: (document: IDocumentRequest, status: number) => Promise.resolve({ ...document, status }),
} as IDocumentsFetcher;

const notificationShowMocked = jest.fn();
jest.mock('@fsi/core-components/dist/hooks/useNotificationService/useNotificationService', () => ({
    useNotificationService: () => ({
        show: notificationShowMocked,
    }),
}));

describe('useUpdateDocumentStatus', () => {
    beforeEach(() => {
        testingQueryClient.clear();
    });

    it('Should call useUpdateDocumentStatus', async () => {
        const updateDocumentStatusSpy = jest.spyOn(simpleFetcher, 'updateDocumentStatus');
        const { result } = renderHook(() => useUpdateDocumentStatus(simpleFetcher), {
            wrapper: QueryClientWrapper,
        });
        const params = {
            document: documents.approvedDocMock,
            status: 1,
        };
        result.current.mutate(params);
        await waitFor(() => !result.current.isLoading);
        expect(updateDocumentStatusSpy).toBeCalledWith(params.document, params.status);
    });

    it('Should return an error when updating status failed', async () => {
        const updateDocumentStatusSpy = jest.spyOn(errorFetcher, 'updateDocumentStatus');
        const { result } = renderHook(() => useUpdateDocumentStatus(errorFetcher), {
            wrapper: QueryClientWrapper,
        });
        const params = {
            document: documents.approvedDocMock,
            status: 1,
        };
        result.current.mutate(params);
        await waitFor(() => !result.current.isLoading);
        expect(updateDocumentStatusSpy).toBeCalledWith(params.document, params.status);
        expect(result.current.isError).toBeTruthy();
    });

    it('Should call show toast on update approved success', async () => {
        const updateDocumentStatusSpy = jest.spyOn(simpleFetcher, 'updateDocumentStatus');
        const { result } = renderHook(() => useUpdateDocumentStatus(simpleFetcher), {
            wrapper: QueryClientWrapper,
        });
        const params = {
            document: documents.pendingReviewDocMock,
            status: DocumentStatus.Approved,
        };
        result.current.mutate(params);
        await waitFor(() => !result.current.isLoading);
        expect(updateDocumentStatusSpy).toBeCalledWith(params.document, params.status);
        expect(notificationShowMocked).toBeCalledWith({
            message: diStrings.DOC_APPROVED_SUCCESS_MESSAGE.replace('{{regarding}}', params.document.regarding.name).replace(
                '{{docName}}',
                params.document.name
            ),
            type: 'success',
        });
    });

    it('Should call show toast on update rejected success', async () => {
        const updateDocumentStatusSpy = jest.spyOn(simpleFetcher, 'updateDocumentStatus');
        const { result } = renderHook(() => useUpdateDocumentStatus(simpleFetcher), {
            wrapper: QueryClientWrapper,
        });
        const params = {
            document: documents.pendingReviewDocMock,
            status: DocumentStatus.Rejected,
        };
        result.current.mutate(params);
        await waitFor(() => !result.current.isLoading);
        expect(updateDocumentStatusSpy).toBeCalledWith(params.document, params.status);
        expect(notificationShowMocked).toBeCalledWith({
            message: diStrings.DOC_REJECTED_SUCCESS_MESSAGE.replace('{{regarding}}', params.document.regarding.name).replace(
                '{{docName}}',
                params.document.name
            ),
            type: 'error',
        });
    });
});

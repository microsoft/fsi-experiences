import { renderHook } from '@testing-library/react-hooks';
import { act, waitFor } from '@testing-library/react';
import { testingQueryClient, QueryClientWrapper } from '@fsi/core-components/dist/utilities/tests/ProviderWrapper';
import { MockDocumentsFetcher } from '../interfaces/mocks/MockDocumentsFetcher';
import { IDocumentsFetcher } from '../interfaces/IDocumentsFetcher';
import { useDocumentActionsDialog } from './useDocumentActionsDialog';
import diStrings from '../assets/strings/DocumentIntelligence/DocumentIntelligence.1033.json';
import { DocumentStatus, IDocumentRequest } from '../interfaces/IDocument';
import * as documents from '../interfaces/mocks/DocumentData.mock';
import { DEFAULT_MAX_UPLOAD_SIZE } from '../constants/DocumentIntelligence.const';

const document = documents.approvedDocMock;
const mockFetcher = new MockDocumentsFetcher();

const errorFetcher = {
    ...mockFetcher,
    removeDocument: (document: IDocumentRequest, deleteRequest: boolean) => Promise.reject('error'),
    uploadDocument: (document: IDocumentRequest, file: File, oldFileId?: string) => Promise.reject('error'),
} as IDocumentsFetcher;

const simpleFetcher = {
    ...mockFetcher,
    removeDocument: (document: IDocumentRequest, deleteRequest: boolean) => Promise.resolve(true),
    uploadDocument: (document: IDocumentRequest, file: File, oldFileId?: string) => Promise.resolve(document),
} as IDocumentsFetcher;

const removeDocumentSpy = jest.spyOn(simpleFetcher, 'removeDocument');

describe('useDocumentActionsDialog', () => {
    beforeEach(() => {
        testingQueryClient.clear();
        removeDocumentSpy.mockClear();
    });

    it('Should return empty props when first rendered', async () => {
        const { result } = renderHook(() => useDocumentActionsDialog(simpleFetcher), {
            wrapper: QueryClientWrapper,
        });
        expect(result.current.dialogProps).toEqual({});
    });

    it('Should return delete dialog an call removeDialog on accepts', async () => {
        const { result, rerender } = renderHook(() => useDocumentActionsDialog(simpleFetcher), {
            wrapper: QueryClientWrapper,
        });
        const deleteRequest = false;

        act(() => result.current.showDeleteDialog(document, deleteRequest));
        rerender();
        expect(result.current.dialogProps.title).toEqual(diStrings.REMOVE_DOCUMENT_DIALOG_TITLE_TEXT);
        expect(result.current.dialogProps.hidden).toEqual(false);
        expect(result.current.isDeleting).toEqual(false);

        act(() => result.current.dialogProps.onAccept!(undefined as any));
        rerender();
        expect(result.current.isDeleting).toEqual(true);
        await waitFor(() => expect(result.current.dialogProps.hidden).toEqual(true));
        expect(removeDocumentSpy).toBeCalledWith(document, deleteRequest);
    });

    it('Should return error deleting dialog props', async () => {
        const { result, rerender } = renderHook(() => useDocumentActionsDialog(errorFetcher), {
            wrapper: QueryClientWrapper,
        });
        act(() => result.current.showDeleteDialog(document, true));
        rerender();
        expect(result.current.dialogProps.hidden).toEqual(false);
        expect(result.current.dialogProps.title).toEqual(diStrings.REMOVE_REQUEST_DIALOG_TITLE_TEXT);

        act(() => result.current.dialogProps.onAccept!(undefined as any));
        rerender();
        await waitFor(() => expect(result.current.dialogProps.hidden).toEqual(false));
        expect(result.current.dialogProps.title).toEqual(diStrings.REMOVE_DOCUMENT_REQUEST_ERROR_TITLE);

        act(() => result.current.dialogProps.onAccept!(undefined as any));
        rerender();
        expect(result.current.dialogProps.hidden).toEqual(true);
    });

    it('Should return error dialog props (isMissingFile = false)', async () => {
        const { result, rerender } = renderHook(() => useDocumentActionsDialog(errorFetcher), {
            wrapper: QueryClientWrapper,
        });
        act(() => result.current.showDeleteDialog(document, false));
        rerender();
        expect(result.current.dialogProps.hidden).toEqual(false);
        expect(result.current.dialogProps.title).toEqual(diStrings.REMOVE_DOCUMENT_DIALOG_TITLE_TEXT);

        act(() => result.current.dialogProps.onAccept!(undefined as any));
        rerender();
        await waitFor(() => expect(result.current.dialogProps.hidden).toEqual(false));
        expect(result.current.dialogProps.title).toEqual(diStrings.REMOVE_DOCUMENT_ERROR_TITLE);
    });

    it('Should close dialog onCancel', async () => {
        const { result } = renderHook(() => useDocumentActionsDialog(simpleFetcher), {
            wrapper: QueryClientWrapper,
        });
        act(() => result.current.showDeleteDialog(document, true));
        expect(result.current.dialogProps.hidden).toEqual(false);
        act(() => result.current.dialogProps.onCancel!(undefined as any));
        expect(result.current.dialogProps.hidden).toEqual(true);
    });

    it('Should close dialog onDismiss', async () => {
        const { result } = renderHook(() => useDocumentActionsDialog(simpleFetcher), {
            wrapper: QueryClientWrapper,
        });
        act(() => result.current.showDeleteDialog(document, true));
        expect(result.current.dialogProps.hidden).toEqual(false);
        act(() => result.current.dialogProps.onDismiss!());
        expect(result.current.dialogProps.hidden).toEqual(true);
    });

    it('Should return error creating request dialog props', async () => {
        const { result, rerender } = renderHook(() => useDocumentActionsDialog(errorFetcher), {
            wrapper: QueryClientWrapper,
        });
        act(() => result.current.showAddErrorMessage());
        rerender();
        expect(result.current.dialogProps.hidden).toEqual(false);
        expect(result.current.dialogProps.title).toEqual(diStrings.ADD_DOCUMENT_REQUEST_ERROR_TITLE);

        act(() => result.current.dialogProps.onAccept!(undefined as any));
        rerender();
        await waitFor(() => expect(result.current.dialogProps.hidden).toEqual(true));
    });

    it('Should return updating status dialog props', async () => {
        const { result, rerender } = renderHook(() => useDocumentActionsDialog(errorFetcher), {
            wrapper: QueryClientWrapper,
        });
        act(() => result.current.showUpdateStatusError(DocumentStatus.Approved));
        rerender();
        expect(result.current.dialogProps.hidden).toEqual(false);
        expect(result.current.dialogProps.title).toEqual(diStrings.APPROVE_DOCUMENT_ERROR_TITLE);

        act(() => result.current.dialogProps.onAccept!(undefined as any));
        rerender();
        await waitFor(() => expect(result.current.dialogProps.hidden).toEqual(true));
    });

    it('Should run upload without confirmation', async () => {
        const uploadDocSpy = jest.spyOn(simpleFetcher, 'uploadDocument');
        const { result, rerender } = renderHook(() => useDocumentActionsDialog(errorFetcher), {
            wrapper: QueryClientWrapper,
        });
        const doc: IDocumentRequest = { ...document, documentId: undefined };
        const file = new File([], 'test.pdf');
        act(() => result.current.showUploadFileDialogs(doc, file));
        rerender();
        waitFor(() => expect(uploadDocSpy).toBeCalledWith(doc, file));
    });

    it('Should return upload confirmation dialog and to not call uploadDocument after cancel', async () => {
        const uploadDocSpy = jest.spyOn(simpleFetcher, 'uploadDocument');
        const { result, rerender } = renderHook(() => useDocumentActionsDialog(errorFetcher), {
            wrapper: QueryClientWrapper,
        });
        const file = new File([], 'test.pdf');
        act(() => result.current.showUploadFileDialogs(document, file));
        rerender();
        expect(result.current.dialogProps.hidden).toEqual(false);
        expect(result.current.dialogProps.title).toEqual(diStrings.UPLOAD_DOCUMENT_REPLACE_FILE_TITLE_TEXT);
        act(() => result.current.dialogProps.onCancel!(undefined as any));
        rerender();
        expect(uploadDocSpy).not.toBeCalled();
    });

    it('Should return upload confirmation dialog and to call uploadDocument after accept', async () => {
        const uploadDocSpy = jest.spyOn(simpleFetcher, 'uploadDocument');
        const { result, rerender } = renderHook(() => useDocumentActionsDialog(errorFetcher), {
            wrapper: QueryClientWrapper,
        });
        const file = new File([], 'test.pdf');
        act(() => result.current.showUploadFileDialogs(document, file));
        rerender();
        expect(result.current.dialogProps.hidden).toEqual(false);
        expect(result.current.dialogProps.title).toEqual(diStrings.UPLOAD_DOCUMENT_REPLACE_FILE_TITLE_TEXT);
        act(() => result.current.dialogProps.onAccept!(undefined as any));
        rerender();
        waitFor(() => expect(uploadDocSpy).toBeCalledWith(document, file));
    });

    it('Should return invalid file format error', async () => {
        const uploadDocSpy = jest.spyOn(simpleFetcher, 'uploadDocument');
        const { result, rerender } = renderHook(() => useDocumentActionsDialog(errorFetcher), {
            wrapper: QueryClientWrapper,
        });
        const file = new File([], 'test.exe');
        const doc: IDocumentRequest = { ...document, documentId: undefined };
        act(() => result.current.showUploadFileDialogs(doc, file));
        rerender();
        expect(result.current.dialogProps.hidden).toEqual(false);
        expect(result.current.dialogProps.title).toEqual(diStrings.UPLOAD_DOCUMENT_FORMAT_ERROR_TITLE);
        rerender();
        act(() => result.current.dialogProps.onAccept!(undefined as any));
        rerender();
        expect(uploadDocSpy).not.toBeCalled();
    });

    it('Should return max size file error', async () => {
        const uploadDocSpy = jest.spyOn(simpleFetcher, 'uploadDocument');
        const { result, rerender } = renderHook(() => useDocumentActionsDialog(errorFetcher), {
            wrapper: QueryClientWrapper,
        });
        const file = { size: DEFAULT_MAX_UPLOAD_SIZE + 1 } as File;
        const doc: IDocumentRequest = { ...document, documentId: undefined };
        act(() => result.current.showUploadFileDialogs(doc, file));
        rerender();
        expect(result.current.dialogProps.hidden).toEqual(false);
        expect(result.current.dialogProps.title).toEqual(diStrings.UPLOAD_DOCUMENT_ERROR_MAX_SIZE_TITLE.replace('{{maxSize}}', '5'));
        rerender();
        act(() => result.current.dialogProps.onAccept!(undefined as any));
        rerender();
        expect(uploadDocSpy).not.toBeCalled();
    });
});

import React from 'react';
import { act, fireEvent, render, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { MockDocumentsFetcher, MOCK_DI_REGARDING_TABLE } from './interfaces/mocks/MockDocumentsFetcher';
import DocumentIntelligence from './DocumentIntelligence';
import { QueryClientWrapper, testingQueryClient } from '@fsi/core-components/dist/utilities/tests/ProviderWrapper';
import { DocumentSectionKeys } from './constants/DocumentIntelligence.const';
import diStrings from './assets/strings/DocumentIntelligence/DocumentIntelligence.1033.json';
import { IDocumentListProps } from './components/DocumentList/DocumentList.interface';
import * as mockedDocuments from './interfaces/mocks/DocumentData.mock';
import * as regardingEntities from './interfaces/mocks/RegardingData.mock';
import * as definitions from './interfaces/mocks/DocumentDefinition.mock';
import { IDocumentsFetcher } from './interfaces/IDocumentsFetcher';
import { DocumentStatus, IAddDocumentRequestData, IDocumentRequest } from './interfaces';

const docListMocked = jest.fn();
let listProps: IDocumentListProps;
jest.mock('./components/DocumentList/DocumentList', () => (props: IDocumentListProps) => {
    docListMocked(props);
    listProps = props;
    return <ul data-testid="doc-list"></ul>;
});

const docSectionMocked = jest.fn();
jest.mock('./components/DocumentsSection/DocumentsSection', () => props => {
    docSectionMocked(props);
    return <div data-testid={`doc-section`}>{props.children}</div>;
});

const docDetailsViewMocked = jest.fn();
let detailsViewProps;
jest.mock('./components/DocumentDetailsView/DocumentDetailsView', () => props => {
    docDetailsViewMocked(props);
    detailsViewProps = props;
    return <span data-testid="document-details-view-mock" />;
});

const docCreateDialogMocked = jest.fn();
let createDialogProps;
jest.mock('./components/DocumentCreationDialog/DocumentCreationDialog', () => props => {
    docCreateDialogMocked(props);
    createDialogProps = props;
    return <span data-testid="document-create-request-dialog-moc" />;
});

const dialogMocked = jest.fn();
jest.mock('@fsi/core-components/dist/components/containers/Dialog/Dialog', () => props => {
    dialogMocked(props);
    return <span data-testid="dialog-mock" />;
});

const dialogProps = {
    isHidden: false,
    title: 'Test',
};
const showDeleteDialogMock = jest.fn();
const showAddErrorMessage = jest.fn();
const showUploadFileDialogs = jest.fn();
const showUpdateStatusError = jest.fn();
jest.mock('./hooks/useDocumentActionsDialog', () => ({
    useDocumentActionsDialog: () => ({
        showDeleteDialog: showDeleteDialogMock,
        showAddErrorMessage,
        showUploadFileDialogs,
        showUpdateStatusError,
        dialogProps,
    }),
}));

const mockFetcher = new MockDocumentsFetcher();
mockFetcher.getContextRegardingEntities = (contextId: string) => Promise.resolve(Object.values(regardingEntities));
mockFetcher.getDocumentDefinitions = () => Promise.resolve(Object.values(definitions));
mockFetcher.createDocumentRequest = (data: IAddDocumentRequestData) => Promise.resolve({ id: 'test' });
mockFetcher.updateDocumentStatus = (document: IDocumentRequest, status: number) => Promise.resolve(mockedDocuments.approvedDocMock);
mockFetcher.updateDocumentDescription = (document: IDocumentRequest, description: string) =>
    Promise.resolve(mockedDocuments.docMockIncludeDescription);

const errorFetcher = new MockDocumentsFetcher();
errorFetcher.getDocuments = () => Promise.reject();
errorFetcher.getDocumentsMetadata = () => Promise.resolve({ pipelineMessages: [] });
errorFetcher.updateDocumentStatus = (document: IDocumentRequest, status: number) => Promise.reject();
errorFetcher.updateDocumentDescription = (document: IDocumentRequest, description: string) => Promise.reject();

const noPermissionFetcher = new MockDocumentsFetcher();
noPermissionFetcher.hasDocumentPrivilege = () => false;

const contextId = '123';

const renderDocumentIntelligence = (fetcher: IDocumentsFetcher = mockFetcher, formId?: string) => {
    return render(<DocumentIntelligence fetcher={fetcher} contextId={contextId} newDocumentFormId={formId} />, { wrapper: QueryClientWrapper });
};
describe('DocumentIntelligence', () => {
    const callbacks = {
        onDocumentDelete: jest.fn(),
        onFileView: jest.fn(),
        onFileUpload: jest.fn(),
    };

    beforeEach(() => {
        docListMocked.mockReset();
        docSectionMocked.mockReset();
        docDetailsViewMocked.mockReset();
        showDeleteDialogMock.mockReset();
        dialogMocked.mockReset();
        docCreateDialogMocked.mockReset();
        showAddErrorMessage.mockReset();
        showUploadFileDialogs.mockReset();
        showUpdateStatusError.mockReset();
        testingQueryClient.clear();
        Object.values(callbacks).forEach(callback => {
            callback.mockReset();
        });
    });

    it('Should render loading', () => {
        const { getByTestId } = renderDocumentIntelligence();

        expect(getByTestId('loading-spinner')).toBeVisible();
    });

    it('Should call document list inside section after loading', async () => {
        const { getAllByTestId, getByTestId } = renderDocumentIntelligence();
        await waitForElementToBeRemoved(() => getByTestId('loading-spinner'));

        DocumentSectionKeys.forEach((sectionKey, i) => {
            expect(docSectionMocked).toHaveBeenNthCalledWith(i + 1, expect.objectContaining({ title: diStrings[`DOCUMENTS_${sectionKey}_TEXT`] }));
            expect(docListMocked).toHaveBeenNthCalledWith(i + 1, expect.objectContaining({ disableUpdate: false, disableDelete: false }));
        });

        expect(getAllByTestId('doc-list')).toHaveLength(DocumentSectionKeys.length);
        expect(getAllByTestId('doc-section')).toHaveLength(DocumentSectionKeys.length);
    });

    it('Should show error state', async () => {
        const { getByTestId, queryByTestId } = renderDocumentIntelligence(errorFetcher);
        await waitForElementToBeRemoved(() => getByTestId('loading-spinner'));

        expect(queryByTestId('doc-list')).toBeNull();
        expect(queryByTestId('doc-section')).toBeNull();
        expect(getByTestId('error-state')).toBeVisible();
    });

    it('Should show document details view when trigger form card list', async () => {
        const doc = mockedDocuments.approvedDocMock;
        const file = new File([], 'test.pdf');
        const { getByTestId } = renderDocumentIntelligence();
        await waitForElementToBeRemoved(() => getByTestId('loading-spinner'));

        act(() => {
            listProps.onFileView(doc);
            listProps.onFileUpload(doc, file);
        });
        await waitFor(() => expect(getByTestId('document-details-view-mock')).toBeInTheDocument());
        expect(docDetailsViewMocked).toHaveBeenCalledWith(expect.objectContaining({ document: doc, fetcher: mockFetcher, isModal: true }));
    });

    it('Should show document delete dialog', async () => {
        const doc = mockedDocuments.approvedDocMock;
        const { getByTestId } = renderDocumentIntelligence();
        await waitForElementToBeRemoved(() => getByTestId('loading-spinner'));

        act(() => {
            listProps.onDocumentDelete(doc, false);
        });
        expect(getByTestId('dialog-mock')).toBeInTheDocument();
        expect(showDeleteDialogMock).toHaveBeenCalledWith(doc, false);
        expect(dialogMocked).toHaveBeenCalledWith(dialogProps);
    });

    it('Should show replace file dialog', async () => {
        const doc = mockedDocuments.approvedDocMock;
        const { getByTestId } = renderDocumentIntelligence();
        await waitForElementToBeRemoved(() => getByTestId('loading-spinner'));
        const file = new File([], 'test.pdf');
        act(() => {
            detailsViewProps.onUpload(doc, file);
        });
        expect(getByTestId('dialog-mock')).toBeInTheDocument();
        expect(showUploadFileDialogs).toHaveBeenCalledWith(doc, file);
        expect(dialogMocked).toHaveBeenCalledWith(dialogProps);
    });

    it('Should show creation dialog on button click and call to fetcher.createDocumentRequest', async () => {
        const createDocumentRequestSpy = jest.spyOn(mockFetcher, 'createDocumentRequest');
        const { getByTestId } = renderDocumentIntelligence();
        await waitForElementToBeRemoved(() => getByTestId('loading-spinner'));

        fireEvent.click(getByTestId('add-doc-request-button'));
        expect(docCreateDialogMocked).toHaveBeenCalledWith(
            expect.objectContaining({
                isOpen: true,
                regardingEntities: Object.values(regardingEntities),
                documentDefinitions: Object.values(definitions),
                regardingDisplayName: MOCK_DI_REGARDING_TABLE,
            })
        );

        const regarding = regardingEntities.coOwnerRegardingMock;
        const definition = definitions.docDefinitionIdentity;
        act(() => {
            createDialogProps.onAdd({ regarding, documentDefinition: definitions.docDefinitionIdentity });
        });
        await waitFor(() => expect(docCreateDialogMocked).toHaveBeenCalledWith(expect.objectContaining({ isOpen: true })));
        expect(createDocumentRequestSpy).toBeCalledWith({ regarding, definition, contextId });
    });

    it('Should call fetcher.openNewDocumentForm there is form id and to not show dialog', async () => {
        const openNewDocumentFormSpy = jest.spyOn(mockFetcher, 'openNewDocumentForm');
        const { getByTestId } = renderDocumentIntelligence(mockFetcher, 'formId');
        await waitForElementToBeRemoved(() => getByTestId('loading-spinner'));

        fireEvent.click(getByTestId('add-doc-request-button'));
        expect(docCreateDialogMocked).not.toHaveBeenCalled();
        expect(openNewDocumentFormSpy).toBeCalledWith('formId');
    });

    it('Should call update document status', async () => {
        const updateDocStatusSpy = jest.spyOn(mockFetcher, 'updateDocumentStatus');
        const { getByTestId } = renderDocumentIntelligence();
        await waitForElementToBeRemoved(() => getByTestId('loading-spinner'));
        act(() => {
            listProps.onFileView(mockedDocuments.pendingReviewDocMock);
        });
        await waitFor(() => expect(getByTestId('document-details-view-mock')).toBeInTheDocument());
        act(() => {
            detailsViewProps.onUpdateDocumentStatus(mockedDocuments.pendingReviewDocMock, DocumentStatus.Approved);
        });
        waitFor(() => expect(updateDocStatusSpy).toBeCalledWith(mockedDocuments.pendingReviewDocMock, DocumentStatus.Approved));
    });

    it('Should show status update error', async () => {
        const testErrorFetcher = new MockDocumentsFetcher();
        testErrorFetcher.updateDocumentStatus = (document: IDocumentRequest, status: number) => Promise.reject();
        const { getByTestId } = renderDocumentIntelligence(testErrorFetcher);
        await waitForElementToBeRemoved(() => getByTestId('loading-spinner'));
        act(() => {
            listProps.onFileView(mockedDocuments.pendingReviewDocMock);
        });
        await waitFor(() => expect(getByTestId('document-details-view-mock')).toBeInTheDocument());
        act(() => {
            detailsViewProps.onUpdateDocumentStatus(mockedDocuments.pendingReviewDocMock, DocumentStatus.Approved);
        });
        waitFor(() => expect(showUpdateStatusError).toBeCalledWith(DocumentStatus.Approved));
    });

    it('Should disable actions', async () => {
        const { getByTestId } = renderDocumentIntelligence(noPermissionFetcher);
        await waitForElementToBeRemoved(() => getByTestId('loading-spinner'));

        expect(getByTestId('add-doc-request-button')).toBeDisabled();
        expect(docListMocked).toHaveBeenCalledWith(expect.objectContaining({ disableUpdate: true, disableDelete: true }));
    });

    it('Should disable new doc when context is inactive', async () => {
        jest.spyOn(mockFetcher, 'isContextInactive').mockImplementation(async () => {
            return true;
        });
        const { getByTestId } = renderDocumentIntelligence(mockFetcher);
        await waitForElementToBeRemoved(() => getByTestId('loading-spinner'));

        expect(getByTestId('add-doc-request-button')).toBeDisabled();
    });

    it('Should render static new button label', async () => {
        const { getByText, getByTestId } = renderDocumentIntelligence(mockFetcher);
        await waitForElementToBeRemoved(() => getByTestId('loading-spinner'));
        expect(getByText(diStrings.REQUEST_NEW_DOCUMENT_BTN_TXT)).toBeVisible();
    });

    it('Should render dynamic new button label', async () => {
        const customDocName = 'test request';
        const testFetcher = new MockDocumentsFetcher();
        testFetcher.getDocumentsMetadata = () => Promise.resolve({ pipelineMessages: [], documentEntityName: customDocName });
        const { getByText, getByTestId } = renderDocumentIntelligence(testFetcher);
        await waitForElementToBeRemoved(() => getByTestId('loading-spinner'));
        expect(getByText(diStrings.REQUEST_NEW_DOCUMENT_BTN_TXT_DYNAMIC.replace('{{documentEntityName}}', customDocName))).toBeVisible();
    });
});

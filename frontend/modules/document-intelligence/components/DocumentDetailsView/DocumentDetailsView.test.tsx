/* eslint-disable jest/expect-expect */
import React from 'react';
import { act, render, waitFor } from '@testing-library/react';
import DocumentDetailsView from './DocumentDetailsView';
import * as mockedDocuments from '../../interfaces/mocks/DocumentData.mock';
import { MockDocumentsFetcher } from '../../interfaces/mocks/MockDocumentsFetcher';
import { IDocumentsFetcher } from '../../interfaces/IDocumentsFetcher';
import { QueryClientWrapper, testingQueryClient } from '@fsi/core-components/dist/utilities/tests/ProviderWrapper';
import { DocumentStatus, IDocumentRequest } from '../../interfaces/IDocument';
import { IDocumentDetailsTabProps } from '../DocumentDetailsTab/DocumentDetailsTab.interface';
import { IDocumentFileContentProps } from '../DocumentFileContent/DocumentFileContent.interface';
import { IDocumentDetailsFooterProps } from '../DocumentDetailsFooter/DocumentDetailsFooter.interface';
import { PrivilegeType } from '@fsi/core-components/dist/enums/PrivilegeType';
import * as stepDefinitionsHook from '../../hooks/useStepsDefinitions';
import * as stepResultsHook from '../../hooks/usePipelineStepsResults';
import * as extractionDetailsHook from '../../hooks/useExtractionDetails';
import { stepDefinitionEnrichment, stepDefinitionExtract } from '../../interfaces/mocks/StepsDefinitions.mock';
import { stepResultSuccessMock, stepRunningMock } from '../../interfaces/mocks/PipelineStepData.mock';
import { DocumentPipelineStatus, PipelineStatus } from '../../constants';
import diStrings from '../../assets/strings/DocumentIntelligence/DocumentIntelligence.1033.json';
import { MessageBarType } from '@fluentui/react/lib/components/MessageBar/MessageBar.types';

const mockFetcher = new MockDocumentsFetcher();

const errorFetcher = {
    ...mockFetcher,
    getDocumentFile: (documentId: string) => Promise.reject('error'),
    hasDocumentPrivilege: (type: PrivilegeType) => true,
} as IDocumentsFetcher;

const simpleFetcher = {
    ...mockFetcher,
    getDocumentFile: (documentId: string) => Promise.resolve({ fileURL: 'http://test.com/', fileId: 'fileId' }),
    updateDocumentStatus: (document: IDocumentRequest, status: number) => Promise.resolve({ ...document, status }),
    hasDocumentPrivilege: (type: PrivilegeType) => true,
    updateDocumentDescription: (document: IDocumentRequest, description: string) => Promise.resolve({ ...document, description }),
} as IDocumentsFetcher;

const docFileContentMocked = jest.fn();
jest.mock('../DocumentFileContent/DocumentFileContent', () => (props: IDocumentFileContentProps) => {
    docFileContentMocked(props);
    return <span data-testid="doc-file-content-mock" />;
});

const docSideBar = jest.fn();
jest.mock('../DocumentDetailsTab/DocumentDetailsTab', () => (props: IDocumentDetailsTabProps) => {
    docSideBar(props);
    return <span data-testid="doc-side-bar-mock" />;
});

const docFooterMock = jest.fn();
let docFooterProps: IDocumentDetailsFooterProps;
jest.mock('../DocumentDetailsFooter/DocumentDetailsFooter', () => (props: IDocumentDetailsFooterProps) => {
    docFooterMock(props);
    docFooterProps = props;
    return <span data-testid="doc-footer-mock" />;
});

const onCancel = jest.fn();
const onUpload = jest.fn();
const onUpdateStatus = jest.fn();

const renderDocumentDetailsView = (document: IDocumentRequest, fetcher = simpleFetcher, showHeader = true) => {
    return render(
        <DocumentDetailsView
            onUpdateDocumentStatus={onUpdateStatus}
            onUpload={onUpload}
            fetcher={fetcher}
            document={document}
            onCancel={onCancel}
            isModal={showHeader}
        />,
        {
            wrapper: QueryClientWrapper,
        }
    );
};

const spyOnExtractionDetails = (hasEmptyRequiredFields: boolean) => {
    jest.spyOn(extractionDetailsHook, 'useExtractionDetails').mockImplementation(() => {
        return {
            extractInformationStep: undefined,
            enrichmentInformationStep: undefined,
            hasEmptyRequiredExtractedFields: hasEmptyRequiredFields,
            hasEmptyRequiredEnrichmentFields: false,
            messageBar: { message: 'MESSAGE', type: MessageBarType.blocked },
        };
    });
};

describe('[Document Intelligence] DocumentDetailsView', () => {
    jest.spyOn(stepDefinitionsHook, 'useStepsDefinitions').mockImplementation(() => {
        return {
            stepsDefinitions: [],
            isLoading: false,
            isError: false,
        };
    });
    jest.spyOn(stepResultsHook, 'usePipelineStepsResults').mockImplementation(() => {
        return {
            pipelineSteps: [],
            isLoading: false,
            isError: false,
        };
    });
    beforeEach(() => {
        onCancel.mockClear();
        onUpload.mockClear();
        onUpdateStatus.mockClear();
        docSideBar.mockClear();
        docFileContentMocked.mockClear();
        docFooterMock.mockClear();
        testingQueryClient.clear();
    });

    it('Should render details view', () => {
        const doc = mockedDocuments.approvedDocMock;
        const { getByTestId, getByText } = renderDocumentDetailsView(doc);

        expect(getByText(doc.name)).toBeVisible();
        expect(getByTestId('cancel-button')).toBeVisible();
        expect(getByTestId('doc-side-bar-mock')).toBeVisible();
        expect(getByTestId('doc-file-content-mock')).toBeVisible();
    });

    it('Should render disabled footerdisabled when has pipeline and empty required field', () => {
        const doc: IDocumentRequest = {
            ...mockedDocuments.pendingReviewDocMock,
            inactive: true,
            pipelineResult: {
                id: 'id',
                docStatus: DocumentPipelineStatus.Unclear,
                pipelineStatus: PipelineStatus.Success,
            },
        };

        renderDocumentDetailsView(doc);
        expect(docFooterMock).toHaveBeenNthCalledWith(1, expect.objectContaining({ disabled: true }));
    });

    it('Should render approve button disabled when has pipeline and empty required field', () => {
        spyOnExtractionDetails(true);
        const doc: IDocumentRequest = {
            ...mockedDocuments.pendingReviewDocMock,
            pipelineResult: {
                id: 'id',
                docStatus: DocumentPipelineStatus.Unclear,
                pipelineStatus: PipelineStatus.Success,
            },
        };

        renderDocumentDetailsView(doc);
        expect(docFooterMock).toHaveBeenNthCalledWith(1, expect.objectContaining({ disabled: true }));
    });

    it('Should render approve button enabled when there is no pipeline', () => {
        spyOnExtractionDetails(true);
        const doc: IDocumentRequest = mockedDocuments.pendingReviewDocMock;

        renderDocumentDetailsView(doc);
        expect(docFooterMock).toHaveBeenNthCalledWith(1, expect.objectContaining({ disabledApprove: false || undefined }));
    });

    it('Should render approve button enabled when there is no empty required field', () => {
        spyOnExtractionDetails(false);
        const doc: IDocumentRequest = {
            ...mockedDocuments.pendingReviewDocMock,
            pipelineResult: {
                id: 'id',
                docStatus: DocumentPipelineStatus.Unclear,
                pipelineStatus: PipelineStatus.Success,
            },
        };

        renderDocumentDetailsView(doc);
        expect(docFooterMock).toHaveBeenNthCalledWith(1, expect.objectContaining({ disabledApprove: false }));
    });

    it('Should render details view without header', () => {
        const doc = mockedDocuments.approvedDocMock;
        const { getByTestId, queryByTestId } = renderDocumentDetailsView(doc, mockFetcher, false);
        expect(queryByTestId(doc.name)).toBeNull();
        expect(queryByTestId('cancel-button')).toBeNull();
        expect(getByTestId('doc-side-bar-mock')).toBeVisible();
        expect(getByTestId('doc-file-content-mock')).toBeVisible();
    });

    it('Should call DocumentFileContent with the right props', async () => {
        const doc = { ...mockedDocuments.approvedDocMock, documentId: 'test' };
        renderDocumentDetailsView(doc);

        expect(docFileContentMocked).toHaveBeenNthCalledWith(1, expect.objectContaining({ isLoading: true, isError: false }));
        await waitFor(() =>
            expect(docFileContentMocked).toHaveBeenNthCalledWith(
                2,
                expect.objectContaining({ file: { fileURL: 'http://test.com/', fileId: 'fileId' } })
            )
        );
    });

    it('Should call DocumentFileContent with the right props (error)', async () => {
        const doc = { ...mockedDocuments.approvedDocMock, documentId: 'test' };
        renderDocumentDetailsView(doc, errorFetcher);

        expect(docFileContentMocked).toHaveBeenNthCalledWith(1, expect.objectContaining({ isLoading: true, isError: false }));
        await waitFor(() => expect(docFileContentMocked).toHaveBeenNthCalledWith(2, expect.objectContaining({ isLoading: false, isError: true })));
    });

    it('Should call onCancel when clicking on close button', () => {
        const doc = mockedDocuments.approvedDocMock;
        const { getByTestId } = renderDocumentDetailsView(doc);

        getByTestId('cancel-button').click();
        expect(onCancel).toHaveBeenCalled();
    });

    it('Should render empty state when no document file', () => {
        const doc = mockedDocuments.missingFileDocMock;
        const { getByTestId, queryByTestId } = renderDocumentDetailsView(doc);

        expect(queryByTestId('doc-file-content-mock')).toBeNull();
        expect(getByTestId('document-empty-file-state')).toBeVisible();
    });

    it('Should footer and call to on upload', () => {
        const doc = mockedDocuments.approvedDocMock;
        renderDocumentDetailsView(doc);
        const file = new File([''], 'fileName');
        act(() => docFooterProps.onUpload(file));
        expect(onUpload).toHaveBeenCalledWith(doc, file);
    });

    it('Should footer and call update status', () => {
        const doc = mockedDocuments.approvedDocMock;
        renderDocumentDetailsView(doc);

        act(() => docFooterProps.onReject());
        waitFor(() => expect(onUpdateStatus).toHaveBeenCalledWith(doc, DocumentStatus.Rejected));
        expect(onCancel).toHaveBeenCalled();

        onUpdateStatus.mockClear();
        act(() => docFooterProps.onApprove());
        waitFor(() => expect(onUpdateStatus).toHaveBeenCalledWith(doc, DocumentStatus.Approved));
        expect(onCancel).toHaveBeenCalled();

        onUpdateStatus.mockClear();
        act(() => docFooterProps.onReset());
        waitFor(() => expect(onUpdateStatus).toHaveBeenCalledWith(doc, DocumentStatus.MissingFile));
        expect(onCancel).toHaveBeenCalled();
    });

    it('should render loading screen on details pane', () => {
        const doc = mockedDocuments.approvedDocMock;
        jest.spyOn(stepDefinitionsHook, 'useStepsDefinitions').mockImplementationOnce(() => {
            return {
                stepsDefinitions: [],
                isLoading: true,
                isError: false,
            };
        });

        const { queryByTestId } = renderDocumentDetailsView(doc);

        expect(queryByTestId('msfsi-di-document-details-tab')).toBeNull();
        expect(queryByTestId('msfsi-di-document-extracted-info-tab')).toBeNull();
        expect(queryByTestId('loading-spinner')).toBeTruthy();
    });

    it('should not render the step message bar', () => {
        const doc = mockedDocuments.recApprovalDocMock;
        jest.spyOn(stepResultsHook, 'usePipelineStepsResults').mockImplementationOnce(() => {
            return {
                pipelineSteps: [
                    {
                        ...stepDefinitionExtract,
                        ...stepResultSuccessMock,
                        docStatus: DocumentPipelineStatus.Unclear,
                        fields: stepDefinitionExtract.fields.map(field => ({
                            ...field,
                            ...stepResultSuccessMock.fields[field.id],
                            value: '',
                        })),
                    },
                    {
                        ...stepDefinitionEnrichment,
                        ...stepRunningMock,
                        fields: stepDefinitionExtract.fields.map(field => ({
                            ...field,
                            ...stepResultSuccessMock.fields[field.id],
                            value: '',
                        })),
                    },
                ],
                isLoading: true,
                isError: false,
            };
        });

        const { queryByText } = renderDocumentDetailsView(doc);

        expect(queryByText(diStrings.ERROR_REQUIRED_EXTRACTED_FIELDS_APPROVAL)).not.toBeTruthy();
    });
});

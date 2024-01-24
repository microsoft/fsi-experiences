import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { IDocumentRecommendationProps } from '../DocumentRecommendation';
import DocumentDetailsTab from './DocumentDetailsTab';
import * as mockedDocuments from '../../interfaces/mocks/DocumentData.mock';
import * as mockedPipelineSteps from '../../interfaces/mocks/PipelineStepData.mock';
import { MockDocumentsFetcher } from '../../interfaces/mocks/MockDocumentsFetcher';
import { IDocumentsFetcher } from '../../interfaces/IDocumentsFetcher';
import { QueryClientWrapper, testingQueryClient } from '@fsi/core-components/dist/utilities/tests/ProviderWrapper';
import diStrings from '../../assets/strings/DocumentIntelligence/DocumentIntelligence.1033.json';
import commonStrings from '@fsi/core-components/dist/assets/strings/common/common.1033.json';
import { IDocumentRequest } from '../../interfaces/IDocument';
import { descriptionFieldTextLimit } from '../../constants/DocumentIntelligence.const';
import { stepResultSuccessMock } from '../../interfaces/mocks/PipelineStepData.mock';
import { stepDefinitionExtract } from '../../interfaces/mocks/StepsDefinitions.mock';
import { IStepResultWithDefinition } from '../../interfaces';

const mockFetcher = new MockDocumentsFetcher();

const errorFetcher = {
    ...mockFetcher,
    getPipelineStepsResults: (pipelineId: string) => Promise.reject('error'),
} as IDocumentsFetcher;

const simpleFetcher = {
    ...mockFetcher,
    getPipelineStepsResults: (pipelineId: string) =>
        Promise.resolve({ [mockedPipelineSteps.stepResultSuccessMock.definitionId]: mockedPipelineSteps.stepResultSuccessMock }),
    updateDocumentDescription: (document: IDocumentRequest, description: string) => Promise.resolve({ ...document, description }),
} as IDocumentsFetcher;

const docRecMocked = jest.fn();
jest.mock('../DocumentRecommendation/DocumentRecommendation', () => (props: IDocumentRecommendationProps) => {
    docRecMocked(props);
    return <span data-testid="doc-rec-mocked" />;
});

const updateDescription = jest.fn();

const mockPipelineStepResult = [
    {
        ...stepDefinitionExtract,
        ...stepResultSuccessMock,
        fields: stepDefinitionExtract.fields.map(field => ({
            ...field,
            ...(stepResultSuccessMock.fields[field.id] || {}),
        })),
    },
];

const renderDocumentDetailsTab = (
    document: IDocumentRequest,
    showDescription: boolean,
    stepsResults: IStepResultWithDefinition[],
    isErrorLoadingSteps: boolean,
    onEditModeChange?: (isEditMode: boolean) => void,
    hasWriteAccess?: boolean,
    fetcher = simpleFetcher
) => {
    return render(
        <DocumentDetailsTab
            stepsResults={stepsResults}
            isErrorLoadingSteps={isErrorLoadingSteps}
            fetcher={fetcher}
            document={document}
            updateDescription={updateDescription}
            showDescription={showDescription}
            onEditModeChange={onEditModeChange}
            hasWriteAccess={hasWriteAccess}
        />,
        {
            wrapper: QueryClientWrapper,
        }
    );
};

describe('[Document Intelligence] DocumentDetailsTab', () => {
    beforeEach(() => {
        docRecMocked.mockReset();
        testingQueryClient.clear();
        updateDescription.mockClear();
    });

    it('Should render pending review details', () => {
        const doc = mockedDocuments.pendingReviewDocMock;
        const { getByTestId, getByText, queryByText } = renderDocumentDetailsTab(doc, false, mockPipelineStepResult, false);

        expect(getByTestId('di-details-side-bar')).toBeVisible();
        expect(getByText(diStrings.DOCUMENT_REGARDING)).toBeVisible();
        expect(getByText(doc.regarding?.name)).toBeVisible();
        expect(getByText(diStrings.DOCUMENT_STATUS)).toBeVisible();
        expect(getByText(doc.statusDisplayName)).toBeVisible();
        expect(queryByText(diStrings.DOCUMENT_MODIFIED_BY)).toBeNull();
    });

    it('Should render approved document details', () => {
        const doc = mockedDocuments.approvedDocMock;
        const { getByTestId, getByText } = renderDocumentDetailsTab(doc, false, mockPipelineStepResult, false);

        expect(getByText(diStrings.DOCUMENT_REGARDING)).toBeVisible();
        expect(getByText(doc.regarding?.name)).toBeVisible();
        expect(getByText(diStrings.DOCUMENT_STATUS)).toBeVisible();
        expect(getByText(doc.statusDisplayName)).toBeVisible();
        expect(getByText(diStrings.DOCUMENT_MODIFIED_BY)).toBeVisible();
        expect(getByText(doc.modifiedBy)).toBeVisible();
    });

    it('Should render call DocumentRecommendation with the right props', () => {
        const doc = mockedDocuments.recApprovalDocMock;
        const { getByTestId } = renderDocumentDetailsTab(doc, false, mockPipelineStepResult, false);
        expect(getByTestId('pipeline-steps')).toBeVisible();
        expect(docRecMocked).toHaveBeenCalledWith(
            expect.objectContaining({ showDescription: true, autoUpdated: undefined, documentStatus: doc.status, pipelineResult: doc.pipelineResult })
        );
    });

    it('Should not render DocumentRecommendation for approved doc', () => {
        const doc = mockedDocuments.approvedDocMock;
        renderDocumentDetailsTab(doc, false, mockPipelineStepResult, false);
        expect(docRecMocked).not.toHaveBeenCalled();
    });

    it('Should not render steps and rec when there is no pipeline', () => {
        const doc = mockedDocuments.pendingReviewDocMock;
        const { queryByTestId } = renderDocumentDetailsTab(doc, false, mockPipelineStepResult, false);
        expect(queryByTestId('pipeline-steps')).toBeNull();
        expect(docRecMocked).not.toHaveBeenCalled();
    });

    it('Should render call DocumentRecommendation with the right props (auto updated)', () => {
        const doc = mockedDocuments.autoRejectedDocMock;
        const { getByText } = renderDocumentDetailsTab(doc, false, mockPipelineStepResult, false);
        expect(docRecMocked).toHaveBeenCalledWith(
            expect.objectContaining({ showDescription: true, autoUpdated: true, documentStatus: doc.status, pipelineResult: doc.pipelineResult })
        );
        expect(getByText(diStrings.UPDATED_AUTOMATICALLY)).toBeVisible();
    });

    it('Should show error if 25 letters or more - enable showDescription', async () => {
        const doc = mockedDocuments.recInProgressDocMock;
        const { getByTestId, getByText } = renderDocumentDetailsTab(doc, true, mockPipelineStepResult, false);
        const input = getByTestId('editable-text');
        fireEvent.change(input, { target: { value: 'abcdefghijklmnopqrstuvwxyz' } });
        await waitFor(() => {
            expect(getByText(commonStrings.MAX_LENGTH.replace('{{length}}', `${descriptionFieldTextLimit}`))).toBeInTheDocument();
        });
    });

    it('should trigger onEditModeChange', () => {
        const doc = mockedDocuments.recInProgressDocMock;
        const onEditModeChange = jest.fn();
        const { getByTestId } = renderDocumentDetailsTab(doc, true, mockPipelineStepResult, false, onEditModeChange, true);
        const input = getByTestId('label-edit-icon-btn');
        fireEvent.click(input);
        expect(onEditModeChange).toHaveBeenCalled();
    });

    it('should not show error onEditModeChange', async () => {
        const doc = mockedDocuments.recInProgressDocMock;
        const onEditModeChange = jest.fn();
        const { getByTestId } = renderDocumentDetailsTab(doc, true, mockPipelineStepResult, false, onEditModeChange, true);
        const btn = getByTestId('label-edit-icon-btn');
        const input = getByTestId('editable-text');
        fireEvent.click(btn);
        fireEvent.change(input, { target: { value: 'hello' } });
        fireEvent.click(btn);

        expect(onEditModeChange).toHaveBeenCalled();
        expect(updateDescription).toHaveBeenCalled();
    });

    afterEach(() => {
        updateDescription.mockClear();
    });
});

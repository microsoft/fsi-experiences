import React from 'react';
import { render } from '@testing-library/react';
import { DocumentDetailsPane } from './DocumentDetailsPane';
import * as mockedPipelineSteps from '../../interfaces/mocks/PipelineStepData.mock';
import * as mockedDocuments from '../../interfaces/mocks/DocumentData.mock';
import * as pipelineResults from '../../interfaces/mocks/PipelineData.mock';
import { MockDocumentsFetcher } from '../../interfaces/mocks/MockDocumentsFetcher';
import { IDocumentDetailsTabProps } from '../DocumentDetailsTab/DocumentDetailsTab.interface';
import { act } from 'react-dom/test-utils';
import * as useIsFeatureEnabledHook from '@fsi/core-components/dist/context/hooks/useIsFeatureEnabled';
import { QueryClientWrapper } from '@fsi/core-components/dist/utilities/tests/ProviderWrapper';
import { stepDefinitionExtract } from '../../interfaces/mocks/StepsDefinitions.mock';
import { stepResultSuccessMock } from '../../interfaces/mocks/PipelineStepData.mock';
import { StepStatuses } from '../../constants/StepStatuses.const';
import { DocumentPipelineStatus } from '../../constants/PipelineStatuses.const';
import { StepTypes } from '../../constants/StepTypes.const';

const docSideBar = jest.fn();
jest.mock('../DocumentDetailsTab/DocumentDetailsTab', () => (props: IDocumentDetailsTabProps) => {
    docSideBar(props);
    return <span data-testid="doc-side-bar-mock" />;
});

const mockFields = {
    extractedStep: {
        name: 'Extracted fields',
        id: 'extractedFields',
        order: 1,
        link: 'https://www.microsoft.com',
        status: StepStatuses.Success,
        definitionId: 'extractedFields',
        docStatus: DocumentPipelineStatus.Unclear,
        resultId: '1',
        type: StepTypes.Extraction,
        fields: [
            {
                displayName: 'Consumption start date',
                value: '2020-01-01',
                originalValue: '2020-01-01',
                confidence: 0.8,
                required: true,
                placeholder: 'Consumption start date',
                id: 'startDate',
            },
        ],
        collection: 'idDocument.driverLicense',
        collectionConfidence: 0.95,
    },
    enrichmentStep: {
        name: 'Enriched fields',
        id: 'enrichmentFields',
        order: 2,
        status: StepStatuses.Success,
        definitionId: 'enrichmentFields',
        docStatus: DocumentPipelineStatus.Unclear,
        resultId: '1',
        type: StepTypes.Enrichment,
        fields: [
            {
                displayName: 'Energy type',
                value: 'Traditional',
                confidence: 0.8,
                originalValue: 'Traditional',
                placeholder: 'Energy type',
                id: 'energyType',
            },
        ],
    },
};

const mockEnrichmentFields = [
    {
        displayName: 'Energy Type',
        required: true,
        id: 'energyType',
        order: 1,
        editable: true,
        value: '',
        originalValue: '',
    },
    {
        displayName: 'Organizational Unit',
        required: true,
        id: 'field2',
        order: 2,
        editable: true,
        value: '',
        originalValue: '',
    },
];

const mockUpdateFields = jest.fn();

describe('DocumentDetailsPane', () => {
    const simpleFetcher = new MockDocumentsFetcher();
    simpleFetcher.getPipelineStepsResults = (pipelineId: string) =>
        Promise.resolve({ [mockedPipelineSteps.stepResultSuccessMock.definitionId]: mockedPipelineSteps.stepResultSuccessMock });
    const setNotificationBarError = jest.fn();

    it('should render successfully', () => {
        const doc = mockedDocuments.approvedDocMock;

        const { container, queryByTestId } = render(
            <DocumentDetailsPane
                document={doc}
                showDescription
                updateDescription={jest.fn()}
                fetcher={simpleFetcher}
                pipelineSteps={Object.values(mockFields)}
                onSaveStepFields={mockUpdateFields}
            />,
            {
                wrapper: QueryClientWrapper,
            }
        );
        expect(container).toBeInTheDocument();
        expect(queryByTestId('msfsi-di-document-details-pane')).toBeNull();
    });

    it('should render extracted info tab with fields edit disabled on approved doc', () => {
        const approvedWithPipeline = {
            ...mockedDocuments.approvedDocMock,
            pipelineResult: pipelineResults.pipelineResultSuccessMock,
        };
        const { container, queryByTestId } = render(
            <DocumentDetailsPane
                document={approvedWithPipeline}
                showDescription
                hasWriteAccess
                updateDescription={jest.fn()}
                fetcher={simpleFetcher}
                pipelineSteps={[
                    {
                        ...stepDefinitionExtract,
                        ...stepResultSuccessMock,
                        fields: stepDefinitionExtract.fields.map(field => ({
                            ...field,
                            ...(stepResultSuccessMock.fields[field.id] || {}),
                        })),
                    },
                ]}
                onSaveStepFields={mockUpdateFields}
                extractedStep={mockFields.extractedStep}
            />,
            {
                wrapper: QueryClientWrapper,
            }
        );

        expect(queryByTestId('msfsi-di-document-details-tab')).toBeTruthy();
        expect(queryByTestId('msfsi-di-document-extracted-info-tab')).toBeNull();

        const tabs = container.querySelector('[role="tablist"]');

        act(() => {
            tabs?.children[1].dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });

        expect(queryByTestId('msfsi-di-document-extracted-info-tab')).toBeTruthy();

        const editButton = queryByTestId('submit-btn');
        expect(editButton?.getAttribute('aria-label')).toEqual('Edit');
        expect(editButton).toBeDisabled();
    });

    it('should render fields edit disabled on missing permissions', () => {
        const pendingWithPipeline = {
            ...mockedDocuments.approvedDocMock,
            pipelineResult: pipelineResults.pipelineResultSuccessMock,
        };

        const { container, queryByTestId } = render(
            <DocumentDetailsPane
                document={pendingWithPipeline}
                showDescription
                hasWriteAccess={false}
                updateDescription={jest.fn()}
                fetcher={simpleFetcher}
                pipelineSteps={[
                    {
                        ...stepDefinitionExtract,
                        ...stepResultSuccessMock,
                        fields: stepDefinitionExtract.fields.map(field => ({
                            ...field,
                            ...(stepResultSuccessMock.fields[field.id] || {}),
                        })),
                    },
                ]}
                onSaveStepFields={mockUpdateFields}
                extractedStep={mockFields.extractedStep}
            />,
            {
                wrapper: QueryClientWrapper,
            }
        );

        const tabs = container.querySelector('[role="tablist"]');

        act(() => {
            tabs?.children[1].dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });

        expect(queryByTestId('msfsi-di-document-extracted-info-tab')).toBeTruthy();

        const editButton = queryByTestId('submit-btn');
        expect(editButton?.getAttribute('aria-label')).toEqual('Edit');
        expect(editButton).toBeDisabled();
    });

    it('should render disabled extracted info tab', () => {
        const mockExtractions = {
            ...stepDefinitionExtract,
            ...stepResultSuccessMock,
            fields: stepDefinitionExtract.fields.map(field => ({
                ...field,
                ...(stepResultSuccessMock.fields[field.id] || {}),
            })),
        };

        const doc = mockedDocuments.missingFileDocMock;

        const { container, queryByTestId } = render(
            <DocumentDetailsPane
                document={{ ...doc }}
                showDescription
                updateDescription={jest.fn()}
                fetcher={simpleFetcher}
                pipelineSteps={[mockExtractions]}
                onSaveStepFields={mockUpdateFields}
                extractedStep={mockExtractions}
            />,
            {
                wrapper: QueryClientWrapper,
            }
        );

        expect(queryByTestId('msfsi-di-document-details-single')).toBeTruthy();
        expect(queryByTestId('msfsi-di-document-details-tab')).toBeNull();
        expect(queryByTestId('msfsi-di-document-extracted-info-tab')).toBeNull();
    });

    it('should render only details information when no pipeline data', () => {
        const doc = mockedDocuments.approvedDocMock;

        const { queryByTestId } = render(
            <DocumentDetailsPane
                document={doc}
                showDescription
                updateDescription={jest.fn()}
                fetcher={simpleFetcher}
                pipelineSteps={undefined as any}
                onSaveStepFields={mockUpdateFields}
            />,
            {
                wrapper: QueryClientWrapper,
            }
        );

        expect(queryByTestId('msfsi-di-document-details-pane')).toBeNull();
        expect(queryByTestId('msfsi-di-document-details-tab')).toBeNull();
        expect(queryByTestId('msfsi-di-document-extracted-info-tab')).toBeNull();
    });

    it('should render only details information when no extracted data', () => {
        const doc = mockedDocuments.approvedDocMock;

        const { queryByTestId } = render(
            <DocumentDetailsPane
                document={doc}
                showDescription
                updateDescription={jest.fn()}
                fetcher={simpleFetcher}
                pipelineSteps={[]}
                onSaveStepFields={mockUpdateFields}
            />,
            {
                wrapper: QueryClientWrapper,
            }
        );

        expect(queryByTestId('msfsi-di-document-details-pane')).toBeNull();
        expect(queryByTestId('msfsi-di-document-details-tab')).toBeNull();
        expect(queryByTestId('msfsi-di-document-extracted-info-tab')).toBeNull();
    });

    it('should display extracted fields as first tab', () => {
        const doc = mockedDocuments.recApprovalDocMock;
        jest.spyOn(useIsFeatureEnabledHook, 'useIsFeatureEnabled').mockImplementationOnce(() => {
            return false;
        });

        const { queryByTestId } = render(
            <DocumentDetailsPane
                document={doc}
                showDescription
                updateDescription={jest.fn()}
                fetcher={simpleFetcher}
                pipelineSteps={Object.values(mockFields)}
                extractedStep={mockFields.extractedStep}
                enrichmentStep={mockFields.enrichmentStep}
                onSaveStepFields={mockUpdateFields}
            />,
            {
                wrapper: QueryClientWrapper,
            }
        );

        expect(queryByTestId('msfsi-di-document-details-tab')).toBeNull();
        expect(queryByTestId('msfsi-di-document-extracted-info-tab')).toBeTruthy();
    });

    afterEach(() => {
        setNotificationBarError.mockClear();
    });
});

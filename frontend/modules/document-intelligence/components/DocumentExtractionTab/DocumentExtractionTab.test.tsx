import React from 'react';
import { fireEvent, render, act, waitFor } from '@testing-library/react';
import { DocumentPipelineStatus } from '../../constants/PipelineStatuses.const';
import { DocumentExtractionTab } from './DocumentExtractionTab';
import { IDocumentExtractionTabProps } from './DocumentExtractionTab.interface';
import { IStepResultWithDefinition } from '../../interfaces';
import { QueryClientWrapper } from '@fsi/core-components/dist/utilities/tests/ProviderWrapper';
import { StepTypes } from '../../constants/StepTypes.const';
import diStrings from '../../assets/strings/DocumentIntelligence/DocumentIntelligence.1033.json';
import { StepStatuses } from '../../constants/StepStatuses.const';

const renderDocumentExtractionTab = (props: IDocumentExtractionTabProps) => {
    return render(<DocumentExtractionTab {...props} />, {
        wrapper: QueryClientWrapper,
    });
};

const mockFields: { extractedStep: IStepResultWithDefinition; enrichmentStep: IStepResultWithDefinition } = {
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
                id: 'energyType',
            },
        ],
    },
};

describe('DocumentExtractionTab', () => {
    const mockOnSave = jest.fn();
    const mockOnEditModeChange = jest.fn();

    it('should render the component', () => {
        const { container } = renderDocumentExtractionTab({ ...mockFields, onSave: mockOnSave, onEditModeChange: mockOnEditModeChange });

        expect(container).toBeInTheDocument();
        expect(container.querySelector('#msfsi-di-enrichment-info')).toBeTruthy();
        expect(container.querySelector('#msfsi-di-extracted-info')).toBeTruthy();
    });

    it('should render the collection if exists', () => {
        const { container, getByTitle, getByText } = renderDocumentExtractionTab({
            ...mockFields,
            onSave: mockOnSave,
            onEditModeChange: mockOnEditModeChange,
        });

        expect(container).toBeInTheDocument();
        expect(getByTitle(diStrings.COLLECTION_TYPE)).toBeInTheDocument();
        expect(getByText('Driver license')).toBeInTheDocument();
    });

    it('should not render the collection if all fields are originally empty', () => {
        const emptyExtraction: IStepResultWithDefinition = {
            ...mockFields.extractedStep,
            fields: [
                {
                    ...mockFields.extractedStep.fields[0],
                    originalValue: undefined,
                },
            ],
        };
        const { container, queryByTitle, queryByText } = renderDocumentExtractionTab({
            ...mockFields,
            extractedStep: emptyExtraction,
            onSave: mockOnSave,
            onEditModeChange: mockOnEditModeChange,
        });

        expect(container).toBeInTheDocument();
        expect(queryByTitle(diStrings.COLLECTION_TYPE)).toBeNull();
        expect(queryByText('Driver license')).toBeNull();
    });

    it('should render without enrichment fields when none passed', () => {
        const { container } = renderDocumentExtractionTab({ extractedStep: mockFields.extractedStep, onSave: mockOnSave });

        expect(container.querySelector('#msfsi-di-extracted-info')).toBeTruthy();
        expect(container.querySelector('#msfsi-di-enrichment-info')).toBeNull();
    });

    it('should render without enrichment fields when no length', () => {
        const { container } = renderDocumentExtractionTab({ extractedStep: mockFields.extractedStep, onSave: mockOnSave });

        expect(container.querySelector('#msfsi-di-extracted-info')).toBeTruthy();
        expect(container.querySelector('#msfsi-di-enrichment-info')).toBeNull();
    });

    it('should render error page when isErrorLoadingResults is true', () => {
        const { container, getByTestId } = renderDocumentExtractionTab({ ...mockFields, onSave: mockOnSave, isErrorLoadingResults: true });

        expect(container.querySelector('#msfsi-di-extracted-info')).toBeNull();
        expect(container.querySelector('#msfsi-di-enrichment-info')).toBeNull();
        expect(getByTestId('error-state')).toBeTruthy();
    });

    it('should render error page when extracted step status is Failure', () => {
        const { container, getByTestId } = renderDocumentExtractionTab({
            extractedStep: { ...mockFields.extractedStep, status: StepStatuses.Failure },
            onSave: mockOnSave,
            isErrorLoadingResults: true,
        });

        expect(container.querySelector('#msfsi-di-extracted-info')).toBeNull();
        expect(container.querySelector('#msfsi-di-enrichment-info')).toBeNull();
        expect(getByTestId('error-state')).toBeTruthy();
    });

    it('should render error page when enrichment step status is Failure', () => {
        const { container, getByTestId } = renderDocumentExtractionTab({
            extractedStep: mockFields.extractedStep,
            enrichmentStep: { ...mockFields.enrichmentStep, status: StepStatuses.Failure },
            onSave: mockOnSave,
            isErrorLoadingResults: true,
        });

        expect(container.querySelector('#msfsi-di-extracted-info')).toBeNull();
        expect(container.querySelector('#msfsi-di-enrichment-info')).toBeNull();
        expect(getByTestId('error-state')).toBeTruthy();
    });

    it('should render loading page on extracted info saving', async () => {
        const { container } = renderDocumentExtractionTab({
            ...mockFields,
            onSave: mockOnSave,
            onEditModeChange: mockOnEditModeChange,
        });

        const EditBtn = container.querySelector('#msfsi-di-extracted-info button[data-testid="submit-btn"]');

        expect(EditBtn).toBeTruthy();
        act(() => {
            fireEvent.click(EditBtn as Element);
        });

        expect(mockOnEditModeChange).toHaveBeenCalledTimes(1);

        act(() => {
            fireEvent.click(EditBtn as Element);
        });

        await waitFor(() => expect(mockOnEditModeChange).toHaveBeenCalledTimes(2));
    });

    it('should trigger onEditModeChange', () => {
        const { container } = renderDocumentExtractionTab({
            ...mockFields,
            onSave: mockOnSave,
            onEditModeChange: mockOnEditModeChange,
        });

        const EditBtn = container.querySelector('#msfsi-di-enrichment-info button[data-testid="submit-btn"]');

        expect(EditBtn).toBeTruthy();
        act(() => {
            fireEvent.click(EditBtn as Element);
        });

        expect(mockOnEditModeChange).toHaveBeenCalledTimes(1);
    });

    it('should render empty page when isLoadingResults is true', () => {
        const { container, getByTestId } = renderDocumentExtractionTab({
            ...mockFields,
            onSave: mockOnSave,
            isLoadingResults: true,
        });

        expect(container.querySelector('#msfsi-di-extracted-info')).toBeNull();
        expect(container.querySelector('#msfsi-di-enrichment-info')).toBeNull();
        expect(getByTestId('loading-spinner')).toBeTruthy();
    });

    it('should render empty page when no extraction step', () => {
        const { container, getByTestId } = renderDocumentExtractionTab({
            extractedStep: {} as IStepResultWithDefinition,
            onSave: mockOnSave,
        });

        expect(container.querySelector('#msfsi-di-extracted-info')).toBeNull();
        expect(container.querySelector('#msfsi-di-enrichment-info')).toBeNull();
        expect(getByTestId('empty-state')).toBeTruthy();
    });

    it('should render empty page when extraction step status is Running', () => {
        const { container, getByTestId } = renderDocumentExtractionTab({
            extractedStep: { ...mockFields.extractedStep, status: StepStatuses.Running },
            onSave: mockOnSave,
        });

        expect(container.querySelector('#msfsi-di-extracted-info')).toBeNull();
        expect(container.querySelector('#msfsi-di-enrichment-info')).toBeNull();
        expect(getByTestId('empty-state')).toBeTruthy();
    });

    it('should render empty page when enrichment step status is Running', () => {
        const { container, getByTestId } = renderDocumentExtractionTab({
            extractedStep: mockFields.extractedStep,
            enrichmentStep: { ...mockFields.enrichmentStep, status: StepStatuses.Running },
            onSave: mockOnSave,
        });

        expect(container.querySelector('#msfsi-di-extracted-info')).toBeNull();
        expect(container.querySelector('#msfsi-di-enrichment-info')).toBeNull();
        expect(getByTestId('empty-state')).toBeTruthy();
    });

    it('should not render empty page when enrichment step is skipped', () => {
        const { getByTestId } = renderDocumentExtractionTab({
            extractedStep: mockFields.extractedStep,
            enrichmentStep: { ...mockFields.enrichmentStep, skipped: true },
            onSave: mockOnSave,
        });

        expect(getByTestId('msfsi-di-enrichment-info')).toBeVisible();
        expect(getByTestId('msfsi-di-extracted-info')).toBeVisible();
    });

    it('should switch to edit mode', () => {
        const { container } = renderDocumentExtractionTab({
            ...mockFields,
            onSave: mockOnSave,
        });

        const EditExtractedBtn = container.querySelector('#msfsi-di-extracted-info button[data-testid="submit-btn"]');
        expect(EditExtractedBtn).toBeTruthy();

        act(() => {
            fireEvent.click(EditExtractedBtn as Element);
        });

        expect(EditExtractedBtn?.getAttribute('aria-label')).toEqual('Save');

        const EditEnrichmentBtn = container.querySelector('#msfsi-di-enrichment-info button[data-testid="submit-btn"]');
        expect(EditEnrichmentBtn).toBeTruthy();

        act(() => {
            fireEvent.click(EditEnrichmentBtn as Element);
        });

        expect(EditEnrichmentBtn?.getAttribute('aria-label')).toEqual('Save');
    });

    it('should render loading screen when saving fields', () => {
        const { container, getByTestId } = renderDocumentExtractionTab({
            ...mockFields,
            onSave: mockOnSave,
            isSavingStepFields: true,
        });

        expect(container.querySelector('#msfsi-di-extracted-info')).toBeNull();
        expect(container.querySelector('#msfsi-di-enrichment-info')).toBeNull();
        expect(getByTestId('loading-spinner')).toBeTruthy();
        expect(getByTestId('loading-spinner').textContent).toEqual('Updating');
    });

    afterEach(() => {
        mockOnEditModeChange.mockClear();
        mockOnSave.mockClear();
    });
});

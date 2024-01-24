import { DocumentPipelineStatus, PipelineStatus } from './../constants/PipelineStatuses.const';
import { useMemo } from 'react';
import { StepStatuses } from '../constants/StepStatuses.const';
import { StepTypes } from '../constants/StepTypes.const';
import { IStepResultWithDefinition } from '../interfaces/IDocumentInsight';
import { MessageBarType } from '@fluentui/react/lib/components/MessageBar/MessageBar.types';

type StepTypesValues = typeof StepTypes[keyof typeof StepTypes];

interface IMessageBarResult {
    message: string;
    type: MessageBarType;
}

const RequiredFieldsState = {
    Loading: 'Loading',
    Error: 'Error',
    Missing: 'Missing',
} as const;

export const getValidDefinedStepByType = (stepsDefinitions: IStepResultWithDefinition[], type: StepTypesValues) => {
    return stepsDefinitions.find(stepDefinition => stepDefinition.type === type && stepDefinition.fields.length > 0);
};

const isEmptyStringOrNullOrUndefined = (value?: string | number) =>
    value === null || value === undefined || (typeof value === 'string' && value.trim() === '');

export const hasEmptyRequiredFields = (step?: IStepResultWithDefinition) =>
    !!step?.fields.some(field => field.required && isEmptyStringOrNullOrUndefined(field.value));

const getStepRequiredFieldsState = (step?: IStepResultWithDefinition, hasRequiredFields?: boolean): string => {
    if (!step || !hasRequiredFields) {
        return '';
    }
    if ((!step.status && !step.skipped) || step.status === PipelineStatus.Running) {
        return RequiredFieldsState.Loading;
    }
    if (step.status === StepStatuses.Failure || step.docStatus === DocumentPipelineStatus.Rejected) {
        return RequiredFieldsState.Error;
    }

    return RequiredFieldsState.Missing;
};

export const getFieldsStateErrorMessage = (extractionFieldsState: string, enrichmentFieldsState: string): string => {
    if (extractionFieldsState === RequiredFieldsState.Error && enrichmentFieldsState === RequiredFieldsState.Error) {
        return 'ERROR_ENRICHMENT_OR_EXTRACTION_RESULTS_FAILED';
    }

    if (enrichmentFieldsState === RequiredFieldsState.Error) {
        return 'ERROR_ENRICHMENT_RESULTS_FAILED';
    }

    return 'ERROR_EXTRACTION_RESULTS_FAILED';
};

export const getErrorMessageByStepStatus = ({
    extraction,
    enrichment,
    hasEmptyRequiredExtractedFields,
    hasEmptyRequiredEnrichmentFields,
}: {
    extraction?: IStepResultWithDefinition;
    enrichment?: IStepResultWithDefinition;
    hasEmptyRequiredExtractedFields?: boolean;
    hasEmptyRequiredEnrichmentFields?: boolean;
}): IMessageBarResult | undefined => {
    const extractionFieldsState = getStepRequiredFieldsState(extraction, hasEmptyRequiredExtractedFields);
    const enrichmentFieldsState = getStepRequiredFieldsState(enrichment, hasEmptyRequiredEnrichmentFields);

    if (!extractionFieldsState && !enrichmentFieldsState) {
        return undefined;
    }
    if (extractionFieldsState === RequiredFieldsState.Loading || enrichmentFieldsState === RequiredFieldsState.Loading) {
        return { message: 'INFO_REQUIRED_FIELDS_RUNNING', type: MessageBarType.info };
    }
    if (extractionFieldsState === RequiredFieldsState.Error || enrichmentFieldsState === RequiredFieldsState.Error) {
        return { message: getFieldsStateErrorMessage(extractionFieldsState, enrichmentFieldsState), type: MessageBarType.blocked };
    }
    return { message: 'ERROR_REQUIRED_EXTRACTED_FIELDS_APPROVAL', type: MessageBarType.blocked };
};

export const useExtractionDetails = (pipelineSteps: IStepResultWithDefinition[]) => {
    const extractInformationStep = useMemo(() => getValidDefinedStepByType(pipelineSteps, StepTypes.Extraction), [pipelineSteps]);
    const enrichmentInformationStep = useMemo(() => getValidDefinedStepByType(pipelineSteps, StepTypes.Enrichment), [pipelineSteps]);
    const hasEmptyRequiredExtractedFields = useMemo(() => hasEmptyRequiredFields(extractInformationStep), [extractInformationStep]);
    const hasEmptyRequiredEnrichmentFields = useMemo(() => hasEmptyRequiredFields(enrichmentInformationStep), [enrichmentInformationStep]);

    const messageBar = useMemo(() => {
        return getErrorMessageByStepStatus({
            extraction: extractInformationStep,
            enrichment: enrichmentInformationStep,
            hasEmptyRequiredEnrichmentFields,
            hasEmptyRequiredExtractedFields,
        });
    }, [enrichmentInformationStep, extractInformationStep, hasEmptyRequiredEnrichmentFields, hasEmptyRequiredExtractedFields]);

    return {
        extractInformationStep,
        enrichmentInformationStep,
        hasEmptyRequiredExtractedFields,
        hasEmptyRequiredEnrichmentFields,
        messageBar,
    };
};

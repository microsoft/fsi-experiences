import { renderHook } from '@testing-library/react-hooks';
import { stepDefinitionEnrichment } from './../interfaces/mocks/StepsDefinitions.mock';
import { stepResultSuccessMock, stepRunningMock } from '../interfaces/mocks/PipelineStepData.mock';
import { DocumentPipelineStatus } from './../constants/PipelineStatuses.const';
import { IStepResultWithDefinition } from '../interfaces';
import { stepDefinitionExtract, stepsDefinitions } from '../interfaces/mocks/StepsDefinitions.mock';
import { getValidDefinedStepByType, hasEmptyRequiredFields, useExtractionDetails, getErrorMessageByStepStatus } from './useExtractionDetails';
import { StepTypes } from '../constants/StepTypes.const';
import { StepStatuses } from '../constants/StepStatuses.const';
import { MessageBarType } from '@fluentui/react/lib/components/MessageBar/MessageBar.types';

describe('useExtractionDetails', () => {
    it('should return all fields', () => {
        const mockSteps = [
            {
                ...stepDefinitionExtract,
                ...stepResultSuccessMock,
                fields: stepDefinitionExtract.fields.map(field => ({
                    ...field,
                    ...stepResultSuccessMock.fields[field.id],
                })),
            },
            {
                ...stepDefinitionEnrichment,
                ...stepRunningMock,
            },
        ];
        const { result } = renderHook(() => useExtractionDetails(mockSteps as any as IStepResultWithDefinition[]));
        expect(result.current).toEqual({
            extractInformationStep: mockSteps[0],
            enrichmentInformationStep: undefined,
            hasEmptyRequiredExtractedFields: false,
            hasEmptyRequiredEnrichmentFields: false,
            messageBar: undefined,
        });
    });

    it('should return messageBar with error on failed enrichment and extraction', () => {
        const mockSteps = [
            {
                ...stepDefinitionExtract,
                ...stepResultSuccessMock,
                status: StepStatuses.Failure,
                fields: stepDefinitionExtract.fields.map(field => ({
                    ...field,
                    ...stepResultSuccessMock.fields[field.id],
                    value: '',
                })),
            },
            {
                ...stepDefinitionEnrichment,
                ...stepRunningMock,
                status: StepStatuses.Failure,
                fields: stepDefinitionExtract.fields.map(field => ({
                    ...field,
                    ...stepResultSuccessMock.fields[field.id],
                    value: '',
                })),
            },
        ];

        const { result } = renderHook(() => useExtractionDetails(mockSteps as any as IStepResultWithDefinition[]));
        expect(result.current).toEqual({
            extractInformationStep: {
                ...stepDefinitionExtract,
                ...stepResultSuccessMock,
                status: StepStatuses.Failure,
                fields: stepDefinitionExtract.fields.map(field => ({
                    ...field,
                    ...stepResultSuccessMock.fields[field.id],
                    value: '',
                })),
            },
            enrichmentInformationStep: {
                ...stepDefinitionEnrichment,
                ...stepRunningMock,
                status: StepStatuses.Failure,
                fields: stepDefinitionExtract.fields.map(field => ({
                    ...field,
                    ...stepResultSuccessMock.fields[field.id],
                    value: '',
                })),
            },
            hasEmptyRequiredExtractedFields: true,
            hasEmptyRequiredEnrichmentFields: true,
            messageBar: { message: 'ERROR_ENRICHMENT_OR_EXTRACTION_RESULTS_FAILED', type: MessageBarType.blocked },
        });
    });

    it('should return messageBar for failed extraction step only', () => {
        const mockSteps = [
            {
                ...stepDefinitionExtract,
                ...stepResultSuccessMock,
                status: StepStatuses.Failure,
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
                })),
            },
        ] as any as IStepResultWithDefinition[];

        const { result } = renderHook(() => useExtractionDetails(mockSteps));

        expect(result.current).toEqual({
            extractInformationStep: {
                ...stepDefinitionExtract,
                ...stepResultSuccessMock,
                status: StepStatuses.Failure,
                fields: stepDefinitionExtract.fields.map(field => ({
                    ...field,
                    ...stepResultSuccessMock.fields[field.id],
                    value: '',
                })),
            },
            enrichmentInformationStep: {
                ...stepDefinitionEnrichment,
                ...stepRunningMock,
                fields: stepDefinitionExtract.fields.map(field => ({
                    ...field,
                    ...stepResultSuccessMock.fields[field.id],
                })),
            },
            hasEmptyRequiredExtractedFields: true,
            hasEmptyRequiredEnrichmentFields: false,
            messageBar: { message: 'ERROR_EXTRACTION_RESULTS_FAILED', type: MessageBarType.blocked },
        });
    });

    it('should return messageBar for failed enrichment step only', () => {
        const mockSteps = [
            {
                ...stepDefinitionExtract,
                ...stepResultSuccessMock,
                fields: stepDefinitionExtract.fields.map(field => ({
                    ...field,
                    ...stepResultSuccessMock.fields[field.id],
                })),
            },
            {
                ...stepDefinitionEnrichment,
                ...stepRunningMock,
                status: StepStatuses.Failure,
                fields: stepDefinitionExtract.fields.map(field => ({
                    ...field,
                    ...stepResultSuccessMock.fields[field.id],
                    value: '',
                })),
            },
        ] as any as IStepResultWithDefinition[];
        const { result } = renderHook(() => useExtractionDetails(mockSteps));

        expect(result.current).toEqual({
            extractInformationStep: {
                ...stepDefinitionExtract,
                ...stepResultSuccessMock,
                fields: stepDefinitionExtract.fields.map(field => ({
                    ...field,
                    ...stepResultSuccessMock.fields[field.id],
                })),
            },
            enrichmentInformationStep: {
                ...stepDefinitionEnrichment,
                ...stepRunningMock,
                status: StepStatuses.Failure,
                fields: stepDefinitionExtract.fields.map(field => ({
                    ...field,
                    ...stepResultSuccessMock.fields[field.id],
                    value: '',
                })),
            },
            hasEmptyRequiredExtractedFields: false,
            hasEmptyRequiredEnrichmentFields: true,
            messageBar: { message: 'ERROR_ENRICHMENT_RESULTS_FAILED', type: MessageBarType.blocked },
        });
    });
});

describe('getValidDefinedStepByType', () => {
    it('should return valid step by type', () => {
        expect(getValidDefinedStepByType(stepsDefinitions as any as IStepResultWithDefinition[], StepTypes.Extraction)).toEqual(
            stepDefinitionExtract
        );
    });

    it('should not return step without fields', () => {
        expect(getValidDefinedStepByType(stepsDefinitions as any as IStepResultWithDefinition[], StepTypes.Enrichment)).toEqual(undefined);
    });
});

describe('hasEmptyRequiredFields', () => {
    it('should return false if has no empty required fields', () => {
        expect(
            hasEmptyRequiredFields({
                ...stepDefinitionExtract,
                ...stepResultSuccessMock,
                fields: stepDefinitionExtract.fields.map(field => ({
                    ...field,
                    ...stepResultSuccessMock.fields[field.id],
                })),
            })
        ).toEqual(false);
    });

    it('should return true if has empty required fields', () => {
        expect(
            hasEmptyRequiredFields({
                ...stepDefinitionExtract,
                ...stepResultSuccessMock,
                fields: stepDefinitionExtract.fields.map(field => ({
                    ...field,
                    value: '',
                    originalValue: '',
                })),
            })
        ).toEqual(true);
    });

    it('should return false if there is no step presented', () => {
        expect(hasEmptyRequiredFields()).toEqual(false);
    });
});

describe('getErrorMessageByStepStatus', () => {
    it('should return empty string on with non-empty required fields steps', () => {
        const mockSteps = {
            extraction: {
                ...stepDefinitionExtract,
                ...stepResultSuccessMock,
                status: StepStatuses.Running,
                docStatus: DocumentPipelineStatus.Unclear,
            } as any as IStepResultWithDefinition,
            enrichment: {
                ...stepDefinitionEnrichment,
                ...stepResultSuccessMock,
                docStatus: DocumentPipelineStatus.Unclear,
                status: StepStatuses.Running,
            } as any as IStepResultWithDefinition,
            hasEmptyRequiredExtractedFields: false,
            hasEmptyRequiredEnrichmentFields: false,
        };

        expect(getErrorMessageByStepStatus(mockSteps)).toEqual(undefined);
    });

    it('should return error message for both failed steps with empty fields', () => {
        const mockSteps = {
            extraction: {
                ...stepDefinitionExtract,
                ...stepResultSuccessMock,
                docStatus: DocumentPipelineStatus.Unclear,
                status: StepStatuses.Failure,
            } as any as IStepResultWithDefinition,
            enrichment: {
                ...stepDefinitionEnrichment,
                ...stepResultSuccessMock,
                docStatus: DocumentPipelineStatus.Unclear,
                status: StepStatuses.Failure,
            } as any as IStepResultWithDefinition,
            hasEmptyRequiredExtractedFields: true,
            hasEmptyRequiredEnrichmentFields: true,
        };

        expect(getErrorMessageByStepStatus(mockSteps)).toEqual({
            message: 'ERROR_ENRICHMENT_OR_EXTRACTION_RESULTS_FAILED',
            type: MessageBarType.blocked,
        });
    });

    it('should return error message for both rejected steps', () => {
        const mockSteps = {
            extraction: {
                ...stepDefinitionExtract,
                ...stepResultSuccessMock,
                docStatus: DocumentPipelineStatus.Rejected,
            } as any as IStepResultWithDefinition,
            enrichment: {
                ...stepDefinitionEnrichment,
                ...stepResultSuccessMock,
                docStatus: DocumentPipelineStatus.Rejected,
            } as any as IStepResultWithDefinition,
            hasEmptyRequiredExtractedFields: true,
            hasEmptyRequiredEnrichmentFields: true,
        };

        expect(getErrorMessageByStepStatus(mockSteps)).toEqual({
            message: 'ERROR_ENRICHMENT_OR_EXTRACTION_RESULTS_FAILED',
            type: MessageBarType.blocked,
        });
    });

    it('should return extracted error message for failed extraction step', () => {
        const mockSteps = {
            extraction: {
                ...stepDefinitionExtract,
                ...stepResultSuccessMock,
                status: StepStatuses.Failure,
            } as any as IStepResultWithDefinition,
            enrichment: {
                ...stepDefinitionEnrichment,
                ...stepResultSuccessMock,
                docStatus: DocumentPipelineStatus.Rejected,
            } as any as IStepResultWithDefinition,
            hasEmptyRequiredExtractedFields: true,
            hasEmptyRequiredEnrichmentFields: false,
        };

        expect(getErrorMessageByStepStatus(mockSteps)).toEqual({ message: 'ERROR_EXTRACTION_RESULTS_FAILED', type: MessageBarType.blocked });
    });

    it('should return enriched error message for failed enrichment step', () => {
        const mockSteps = {
            extraction: {
                ...stepDefinitionExtract,
                ...stepResultSuccessMock,
                docStatus: DocumentPipelineStatus.Unclear,
            } as any as IStepResultWithDefinition,
            enrichment: {
                ...stepDefinitionEnrichment,
                ...stepResultSuccessMock,
                status: StepStatuses.Failure,
            } as any as IStepResultWithDefinition,
            hasEmptyRequiredExtractedFields: false,
            hasEmptyRequiredEnrichmentFields: true,
        };

        expect(getErrorMessageByStepStatus(mockSteps)).toEqual({ message: 'ERROR_ENRICHMENT_RESULTS_FAILED', type: MessageBarType.blocked });
    });

    it('should return extracted error message for rejected step', () => {
        const mockSteps = {
            extraction: {
                ...stepDefinitionExtract,
                ...stepResultSuccessMock,
                docStatus: DocumentPipelineStatus.Rejected,
            } as any as IStepResultWithDefinition,
            enrichment: {
                ...stepDefinitionEnrichment,
                ...stepResultSuccessMock,
            } as any as IStepResultWithDefinition,
            hasEmptyRequiredExtractedFields: true,
            hasEmptyRequiredEnrichmentFields: false,
        };

        expect(getErrorMessageByStepStatus(mockSteps)).toEqual({ message: 'ERROR_EXTRACTION_RESULTS_FAILED', type: MessageBarType.blocked });
    });

    it('should return enriched error message for rejected step', () => {
        const mockSteps = {
            extraction: {
                ...stepDefinitionExtract,
                ...stepResultSuccessMock,
            } as any as IStepResultWithDefinition,
            enrichment: {
                ...stepDefinitionEnrichment,
                ...stepResultSuccessMock,
                docStatus: DocumentPipelineStatus.Rejected,
            } as any as IStepResultWithDefinition,
            hasEmptyRequiredExtractedFields: false,
            hasEmptyRequiredEnrichmentFields: true,
        };

        expect(getErrorMessageByStepStatus(mockSteps)).toEqual({ message: 'ERROR_ENRICHMENT_RESULTS_FAILED', type: MessageBarType.blocked });
    });

    it('should return default error message', () => {
        const mockSteps = {
            extraction: {
                ...stepDefinitionExtract,
                ...stepResultSuccessMock,
                status: StepStatuses.Running,
            } as any as IStepResultWithDefinition,
            enrichment: {
                ...stepDefinitionEnrichment,
                ...stepResultSuccessMock,
                docStatus: DocumentPipelineStatus.Unclear,
            } as any as IStepResultWithDefinition,
            hasEmptyRequiredExtractedFields: true,
            hasEmptyRequiredEnrichmentFields: true,
        };

        expect(getErrorMessageByStepStatus(mockSteps)).toEqual({ message: 'INFO_REQUIRED_FIELDS_RUNNING', type: MessageBarType.info });
    });
});

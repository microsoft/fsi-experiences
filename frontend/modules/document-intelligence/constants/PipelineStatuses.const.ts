import { COLORS, IMAGE_SRC } from '@fsi/core-components/dist/constants';
import { DocumentStatus } from '../interfaces/IDocument';
import { StepStatuses } from './StepStatuses.const';

//also in step and also in pipeline
export const PipelineStatus = {
    Running: 104800000,
    Success: 104800001,
    Failure: 104800002,
};

//also in step and also in pipeline
export const DocumentPipelineStatus = {
    Unclear: 104800000,
    Rejected: 104800001,
    Approved: 104800002,
};

export interface IRecommendationProps {
    icon: string;
    color: string;
    messageKey?: string;
    descriptionKey?: string;
    image?: string;
}

interface IRecommendationPropsMap {
    [key: number]: IRecommendationProps;
}

export const PipelineStatusIcon = (themePrimary: string): IRecommendationPropsMap => {
    return {
        [PipelineStatus.Failure]: {
            icon: 'ErrorBadge',
            color: COLORS.red,
            messageKey: 'PIPELINE_FAILURE_MESSAGE',
            descriptionKey: 'PIPELINE_FAILURE_DESC',
            image: 'error100',
        },
        [PipelineStatus.Running]: {
            icon: 'ProgressRingDots',
            color: `${themePrimary}`,
            messageKey: 'PIPELINE_RUNNING_MESSAGE',
            descriptionKey: 'PIPELINE_RUNNING_DESC',
            image: 'emptyFile',
        },
    };
};

export const DocumentPipelineStatusIcon: IRecommendationPropsMap = {
    [DocumentPipelineStatus.Rejected]: { icon: 'Warning', color: COLORS.red },
    [DocumentPipelineStatus.Unclear]: { icon: 'Info', color: COLORS.blue },
    [DocumentPipelineStatus.Approved]: { icon: 'CRMCustomerInsightsApp', color: COLORS.blue },
};

export const StepSuccessIconByDocumentStatus = {
    [DocumentPipelineStatus.Rejected]: { icon: 'ErrorBadge', color: COLORS.red },
    [DocumentPipelineStatus.Approved]: { icon: 'Completed', color: COLORS.successIcon },
    [DocumentPipelineStatus.Unclear]: { icon: 'Unknown', color: COLORS.darkGray },
};

export const StepStatusIcon = {
    [StepStatuses.Failure]: { icon: 'ErrorBadge', color: COLORS.darkGray },
    [StepStatuses.Running]: { icon: 'Recent', color: COLORS.darkGray },
};

export const SkippedStepIcon = {
    icon: 'NavigateForward',
    color: COLORS.darkGray,
};

export const DocumentAutoUpdatedProps: IRecommendationPropsMap = {
    [DocumentStatus.Rejected]: {
        icon: 'ErrorBadge',
        color: COLORS.red,
        messageKey: 'DOCUMENT_REJECTED_AUTO_UPDATED_MESSAGE',
        descriptionKey: 'DOCUMENT_REJECTED_AUTO_UPDATED_DESC',
    },
    [DocumentStatus.Approved]: {
        icon: 'Completed',
        color: COLORS.green,
        messageKey: 'DOCUMENT_APPROVED_AUTO_UPDATED_MESSAGE',
        descriptionKey: 'DOCUMENT_APPROVED_AUTO_UPDATED_DESC',
    },
};

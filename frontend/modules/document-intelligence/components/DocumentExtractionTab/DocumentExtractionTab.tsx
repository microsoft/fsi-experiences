import { Stack } from '@fluentui/react/lib/components/Stack';
import { EmptyState } from '@fsi/core-components/dist/components/atoms/EmptyState';
import { useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import React, { FC } from 'react';
import { DI_NAMESPACE } from '../../constants/DocumentIntelligence.const';
import { PipelineStatusIcon } from '../../constants/PipelineStatuses.const';
import { IMAGE_SRC } from '@fsi/core-components/dist/constants';
import { DocumentExtractedInfo } from './DocumentExtractedInfo';
import { useTheme } from '@fluentui/react/lib/utilities/ThemeProvider/useTheme';
import { StepStatuses } from '../../constants/StepStatuses.const';
import { IStepResultWithDefinition } from '../../interfaces/IDocumentInsight';
import { wrapperStyles, wrapperTokens } from './DocumentExtractionTab.style';
import { IDocumentExtractionTabProps } from './DocumentExtractionTab.interface';

const DocumentExtractedInfoWrapper = ({ children }) => {
    return (
        <Stack styles={wrapperStyles} tokens={wrapperTokens}>
            {children}
        </Stack>
    );
};

const isStepRunning = (step: IStepResultWithDefinition) => (!step.status && !step.skipped) || step.status === StepStatuses.Running;

export const DocumentExtractionTab: FC<IDocumentExtractionTabProps> = ({
    extractedStep,
    enrichmentStep,
    onSave,
    onEditModeChange,
    isErrorLoadingResults,
    isLoadingResults,
    isSavingStepFields,
    editFieldsDisabled,
}) => {
    const t = useTranslation(DI_NAMESPACE);
    const {
        palette: { themePrimary },
    } = useTheme();

    const isInError = isErrorLoadingResults;
    const isInLoading = isStepRunning(extractedStep) || (enrichmentStep && isStepRunning(enrichmentStep));

    let message;

    if (isInLoading && !isLoadingResults) {
        message = PipelineStatusIcon(themePrimary)[StepStatuses.Running];
    } else if (isInError) {
        message = PipelineStatusIcon(themePrimary)[StepStatuses.Failure];
    }

    if (message) {
        return (
            <DocumentExtractedInfoWrapper>
                <EmptyState
                    title={t(message.messageKey as string)}
                    subtitle={t(message.descriptionKey as string)}
                    icon={IMAGE_SRC[message.image]}
                    iconSize={100}
                    isErrorState={isInError}
                />
            </DocumentExtractedInfoWrapper>
        );
    }

    return (
        <DocumentExtractedInfoWrapper>
            <DocumentExtractedInfo
                extractedStep={extractedStep}
                enrichmentStep={enrichmentStep}
                onSave={onSave}
                onEditModeChange={onEditModeChange}
                isLoadingResults={isLoadingResults}
                isSavingStepFields={isSavingStepFields}
                editFieldsDisabled={editFieldsDisabled}
            />
        </DocumentExtractedInfoWrapper>
    );
};

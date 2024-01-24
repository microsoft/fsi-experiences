import React, { FC } from 'react';
import { Stack } from '@fluentui/react/lib/components/Stack/Stack';
import { Text } from '@fluentui/react/lib/components/Text/Text';
import { useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { DocumentPipelineStatus, SkippedStepIcon, StepStatusIcon, StepSuccessIconByDocumentStatus } from '../../constants/PipelineStatuses.const';
import { Icon } from '@fluentui/react/lib/components/Icon/Icon';
import {
    getPipelineStepItemIconStyles,
    pipelineStepItemDescStyles,
    pipelineStepItemLinkStyles,
    pipelineStepItemNameStyles,
    pipelineStepItemTokens,
} from './DocumentPipelineSteps.style';
import { Link } from '@fluentui/react/lib/components/Link/Link';
import { DI_NAMESPACE } from '../../constants/DocumentIntelligence.const';
import { StepStatuses } from '../../constants/StepStatuses.const';
import { IDocumentPipelineStepItemProps } from './DocumentPipelineSteps.interface';

const stepDescriptionMessageOnSuccess = {
    [DocumentPipelineStatus.Rejected]: 'DOCUMENT_PIPELINE_STEP_FAILURE',
    [DocumentPipelineStatus.Unclear]: 'DOCUMENT_PIPELINE_STEP_UNCLEAR',
};

const stepDescriptionMessageOnStatus = {
    [StepStatuses.Failure]: 'DOCUMENT_PIPELINE_STEP_FAIL_TO_RUN',
};

export const getIconPropsOnStatus = ({ docStatus, status, skipped }: { docStatus: number; status?: number; skipped?: boolean }) => {
    if (skipped) {
        return SkippedStepIcon;
    }

    if (!status) return StepStatusIcon[StepStatuses.Running];

    return status === StepStatuses.Success ? StepSuccessIconByDocumentStatus[docStatus] : StepStatusIcon[status];
};

export const getDescriptionKeyOnStatus = ({ docStatus, status, skipped }: { docStatus: number; status?: number; skipped?: boolean }) => {
    if (skipped) {
        return 'DOCUMENT_PIPELINE_STEP_SKIPPED';
    }

    return status === StepStatuses.Success ? stepDescriptionMessageOnSuccess[docStatus] : stepDescriptionMessageOnStatus[status as any];
};

export const DocumentPipelineStepItem: FC<IDocumentPipelineStepItemProps> = ({ pipelineStepResult }) => {
    const { name, docStatus, link, status, skipped } = pipelineStepResult;
    const translate = useTranslation(DI_NAMESPACE);

    const iconProps = getIconPropsOnStatus({ docStatus, status, skipped });

    const descriptionKey = getDescriptionKeyOnStatus({ docStatus, status, skipped });

    if (!iconProps) {
        return null;
    }
    return (
        <Stack tokens={pipelineStepItemTokens}>
            <Stack horizontal verticalAlign="center" data-testid="document-pipeline-step" tokens={pipelineStepItemTokens}>
                <Icon iconName={iconProps.icon} aria-hidden="true" styles={getPipelineStepItemIconStyles(iconProps.color)}></Icon>
                <Text data-testid="pipeline-step-name" styles={pipelineStepItemNameStyles}>
                    {name}
                </Text>
                {link && (
                    <Link target="_blank" href={link} styles={pipelineStepItemLinkStyles}>
                        {translate('LEARN_MORE')}
                    </Link>
                )}
            </Stack>
            {descriptionKey && (
                <Text data-testid="pipeline-step-desc" styles={pipelineStepItemDescStyles}>
                    {translate(descriptionKey, { name })}
                </Text>
            )}
        </Stack>
    );
};

export default DocumentPipelineStepItem;

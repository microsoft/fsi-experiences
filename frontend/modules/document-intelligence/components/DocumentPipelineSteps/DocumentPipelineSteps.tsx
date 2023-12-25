import React, { FC } from 'react';
import { Stack } from '@fluentui/react/lib/components/Stack/Stack';
import DocumentPipelineStepItem from './DocumentPipelineStepItem';
import { documentPipelineStepListStyles, errorStateStyles, pipelineStepsCollapseBtnStyles } from './DocumentPipelineSteps.style';
import { useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import Collapse from '@fsi/core-components/dist/components/atoms/Collapse/Collapse';
import { Loading } from '@fsi/core-components/dist/components/atoms/Loading/Loading';
import { DI_NAMESPACE } from '../../constants/DocumentIntelligence.const';
import { sizeToIcon } from '@fsi/core-components/dist/components/containers/ErrorState';
import { imageStyle } from '@fsi/core-components/dist/components/atoms/EmptyState';
import { Image } from '@fluentui/react/lib/Image';
import { IDocumentPipelineStepsProps } from './DocumentPipelineSteps.interface';

const ErrorState = () => {
    const icon = sizeToIcon(48);
    const translate = useTranslation();
    const title = translate('ERROR_STATE_TITLE');
    const subtitle = translate('ERROR_STATE_SUBTITLE');

    return (
        <Stack
            className={errorStateStyles.container}
            horizontal
            horizontalAlign="start"
            role="alert"
            data-testid="error-state"
            aria-label={translate('ERROR')}
        >
            <Stack.Item className={errorStateStyles.icon} align="center" data-testid="empty-state-icon">
                <Image alt="" src={icon} styles={imageStyle} aria-hidden="true" />
            </Stack.Item>
            <Stack verticalAlign="center" horizontalAlign="center" className={(errorStateStyles as any).detailsWrapper}>
                <Stack.Item className={errorStateStyles.title}>{title}</Stack.Item>
                <Stack.Item data-testid="empty-state-sub-title" className={errorStateStyles.subtitle}>
                    {subtitle}
                </Stack.Item>
            </Stack>
        </Stack>
    );
};

export const DocumentPipelineSteps: FC<IDocumentPipelineStepsProps> = ({ stepResults, isLoading, isError }) => {
    const translate = useTranslation(DI_NAMESPACE);

    if (isLoading) {
        return <Loading styles={{ root: { justifyContent: 'center' } }} />;
    }

    if (isError) {
        return <ErrorState />;
    }
    return (
        <Collapse
            iconButtonStyles={pipelineStepsCollapseBtnStyles}
            defaultOpen
            content={translate('DOCUMENT_SEE_VERIFICATION_STEPS')}
            iconAria={{ 'aria-label': translate('DOC_STEPS_EXPAND_ARIA_LABEL') }}
        >
            <Stack styles={documentPipelineStepListStyles} data-testid="pipeline-steps">
                {stepResults.map(stepResult => (
                    <DocumentPipelineStepItem key={stepResult.id} pipelineStepResult={stepResult} />
                ))}
            </Stack>
        </Collapse>
    );
};

export default DocumentPipelineSteps;

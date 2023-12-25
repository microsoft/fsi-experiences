import React, { FC, useMemo } from 'react';
import {
    DocumentPipelineStatusIcon,
    PipelineStatusIcon,
    DocumentAutoUpdatedProps,
    IRecommendationProps,
    PipelineStatus,
} from '../../constants/PipelineStatuses.const';
import { Stack } from '@fluentui/react/lib/components/Stack/Stack';
import { Icon } from '@fluentui/react/lib/components/Icon';
import { Text } from '@fluentui/react/lib/components/Text/Text';
import { useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import {
    getRecIconStyles,
    getRecTooltipHostStyles,
    getRecTextStyle,
    recDescStyles,
    recStackTokens,
    recWrapperStackTokens,
    tooltipHostBtnStyle,
    recStackStyles,
} from './DocumentRecommendation.style';
import { DocumentStatus } from '../../interfaces';
import { DirectionalHint } from '@fluentui/react/lib/components/ContextualMenu/ContextualMenu.types';
import { Indicator } from '@fsi/core-components/dist/components/atoms/Indicator/Indicator';
import { DI_NAMESPACE } from '../../constants/DocumentIntelligence.const';
import { useTheme } from '@fluentui/react/lib/utilities/ThemeProvider/useTheme';
import { Spinner } from '@fluentui/react/lib/components/Spinner/Spinner';
import { SpinnerSize } from '@fluentui/react/lib/components/Spinner/Spinner.types';
import { IDocumentRecommendationProps } from './DocumentRecommendation.interface';

export const getRecProps = ({
    pipelineStatus,
    docPipelineStatus,
    themePrimary,
    documentStatus,
    autoUpdated,
}: {
    pipelineStatus: number;
    docPipelineStatus: number;
    themePrimary: string;
    documentStatus?: number;
    autoUpdated?: boolean;
}): IRecommendationProps | undefined => {
    if (autoUpdated && (documentStatus === DocumentStatus.Approved || documentStatus === DocumentStatus.Rejected)) {
        return DocumentAutoUpdatedProps[documentStatus];
    }
    return PipelineStatusIcon(themePrimary)[pipelineStatus] || DocumentPipelineStatusIcon[docPipelineStatus];
};

export const DocumentRecommendation: FC<IDocumentRecommendationProps> = ({
    pipelineResult,
    autoUpdated,
    documentStatus,
    showDescription,
    customTextStyles,
    customIconStyles,
}) => {
    const { docStatus, pipelineStatus, docPipelineStatusMessage } = pipelineResult;
    const translate = useTranslation(DI_NAMESPACE);
    const {
        palette: { themePrimary },
    } = useTheme();
    const message = getRecProps({ pipelineStatus, docPipelineStatus: docStatus, themePrimary, documentStatus, autoUpdated });

    const mainRecTextStyles = useMemo(() => getRecTextStyle(customTextStyles || {}), [customTextStyles]);
    const toolTipHostStyles = useMemo(() => getRecTooltipHostStyles(customIconStyles), [customIconStyles]);
    const iconStyles = useMemo(() => getRecIconStyles(message?.color, customIconStyles), [message, customIconStyles]);

    const showTooltip = pipelineStatus !== PipelineStatus.Failure && pipelineStatus !== PipelineStatus.Running;
    const showSpinner = pipelineStatus === PipelineStatus.Running;

    const indicatorTooltip = useMemo(
        () => ({
            content: translate('DOC_REC_MORE_INFO_P1'),
            directionalHint: DirectionalHint.rightCenter,
            styles: toolTipHostStyles,
        }),
        [translate, toolTipHostStyles]
    );

    if (!message) {
        return null;
    }
    const messageText = message.messageKey ? translate(message.messageKey) : docPipelineStatusMessage?.shortText;
    const descText = showDescription && (message.descriptionKey ? translate(message.descriptionKey) : docPipelineStatusMessage?.description);

    return (
        <Stack tokens={recWrapperStackTokens} styles={recStackStyles}>
            <Stack horizontal verticalAlign="center" data-testid="document-rec" tokens={recStackTokens}>
                {showTooltip ? (
                    <Indicator
                        tooltipProps={indicatorTooltip}
                        size={14}
                        color={message?.color}
                        iconName={message.icon}
                        iconAriaLabel={translate('DOC_REC_MORE_INFO_ARIA')}
                        buttonStyles={tooltipHostBtnStyle}
                    />
                ) : showSpinner ? (
                    <Spinner data-testid="pipeline-running-spinner" size={SpinnerSize.xSmall} />
                ) : (
                    <Icon aria-hidden="true" iconName={message.icon} styles={iconStyles}></Icon>
                )}

                <Text styles={mainRecTextStyles}>{messageText}</Text>
            </Stack>
            {descText && <Text styles={recDescStyles}>{descText}</Text>}
        </Stack>
    );
};

export default DocumentRecommendation;

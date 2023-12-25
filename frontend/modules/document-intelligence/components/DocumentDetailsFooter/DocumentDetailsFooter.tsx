import React, { FC } from 'react';
import { Stack } from '@fluentui/react/lib/components/Stack/Stack';
import { documentDetailsFooterStyles, footerButtonsStyles, uploadBtnIconProps, uploadButtonStyles } from './DocumentDetailsFooter.style';
import { useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { DocumentStatus } from '../../interfaces/IDocument';
import UploadFileButton from '../UploadFileButton/UploadFileButton';
import { DefaultButton } from '@fluentui/react/lib/components/Button/DefaultButton/DefaultButton';
import { DocumentPipelineStatus } from '../../constants/PipelineStatuses.const';
import { ActionButton } from '@fluentui/react/lib/components/Button/ActionButton/ActionButton';
import { DI_NAMESPACE } from '../../constants/DocumentIntelligence.const';
import { IDocumentDetailsFooterProps } from './DocumentDetailsFooter.interface';

export const DocumentDetailsFooter: FC<IDocumentDetailsFooterProps> = ({
    disabled,
    onUpload,
    onReject,
    onApprove,
    onCancel,
    onReset,
    document,
    disabledApprove,
}) => {
    const translate = useTranslation(DI_NAMESPACE);

    const { pipelineResult, documentId } = document;

    const docPipelineStatus = pipelineResult?.docStatus;
    const showApproveRejectButtons = document.status !== DocumentStatus.Approved && document.status !== DocumentStatus.Rejected;

    const showResetDocStatus = !showApproveRejectButtons;
    const showRightSideRestButton = showResetDocStatus && document.autoUpdated;

    const isApproveBtnPrimary = docPipelineStatus !== DocumentPipelineStatus.Unclear && docPipelineStatus !== DocumentPipelineStatus.Rejected;
    return (
        <Stack styles={documentDetailsFooterStyles} data-testid="di-details-footer" horizontal horizontalAlign="space-between">
            <Stack data-testid="di-details-footer-left-buttons" verticalAlign="center" horizontal styles={footerButtonsStyles}>
                {documentId && (
                    <UploadFileButton
                        onUpload={onUpload}
                        styles={uploadButtonStyles}
                        iconProps={uploadBtnIconProps}
                        isMissingFile={false}
                        disabled={disabled}
                    />
                )}
                {showResetDocStatus && !showRightSideRestButton && (
                    <ActionButton iconProps={{ iconName: 'Undo' }} data-testid="reset-status-button" onClick={onReset} disabled={disabled}>
                        {translate('DOCUMENT_RESET_STATUS')}
                    </ActionButton>
                )}
            </Stack>
            <Stack data-testid="di-details-footer-right-buttons" horizontal styles={footerButtonsStyles}>
                {showApproveRejectButtons ? (
                    <>
                        <DefaultButton
                            primary={isApproveBtnPrimary}
                            text={translate('APPROVE')}
                            data-testid="approve-button"
                            onClick={onApprove}
                            disabled={disabled || disabledApprove}
                        />
                        <DefaultButton text={translate('REJECT')} data-testid="reject-button" onClick={onReject} disabled={disabled} />
                    </>
                ) : (
                    <>
                        {showRightSideRestButton && (
                            <DefaultButton
                                text={translate('DOCUMENT_RESET_STATUS')}
                                data-testid="reset-status-button-right"
                                onClick={onReset}
                                disabled={disabled}
                            />
                        )}
                        {onCancel && <DefaultButton primary text={translate('CLOSE')} data-testid="close-button" onClick={onCancel} />}
                    </>
                )}
            </Stack>
        </Stack>
    );
};

export default DocumentDetailsFooter;

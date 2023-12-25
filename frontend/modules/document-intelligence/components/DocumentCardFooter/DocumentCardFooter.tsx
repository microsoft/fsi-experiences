import React, { FC, useCallback, useMemo, useRef } from 'react';
import { Stack } from '@fluentui/react/lib/components/Stack/Stack';
import { DocumentStatus } from '../../interfaces/IDocument';
import { useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { IContextualMenuItem, IContextualMenuProps } from '@fluentui/react/lib/components/ContextualMenu/ContextualMenu.types';
import { DefaultButton } from '@fluentui/react/lib/components/Button/DefaultButton/DefaultButton';
import { docFooterCardStyles, footerLeftButtonsTokens, menuButtonStyle, menuIconProps, reviewButtonStyles } from './DocumentCardFooter.style';
import UploadFileButton from '../UploadFileButton/UploadFileButton';
import DocumentStatusTag from '../DocumentStatusTag/DocumentStatusTag';
import { IconButton } from '@fluentui/react/lib/components/Button/IconButton/IconButton';
import { DI_NAMESPACE } from '../../constants/DocumentIntelligence.const';
import { IDocumentCardFooterProps } from './DocumentCardFooter.interface';

export const DocumentCardFooter: FC<IDocumentCardFooterProps> = props => {
    const { document, onDocumentDelete, onFileView, onUpload, disableDelete, disableUpdate } = props;
    const { status, autoUpdated } = document;

    const translate = useTranslation(DI_NAMESPACE);

    const commandButtonRef = useRef<HTMLButtonElement>(null);

    const missingFile = status === DocumentStatus.MissingFile;
    const showReviewButton = !missingFile && status === DocumentStatus.PendingReview;
    const showUploadButton = missingFile || status === DocumentStatus.Rejected;

    const cardMenuProps: IContextualMenuProps = useMemo(() => {
        const deleteRequest = true;
        const items: IContextualMenuItem[] = [
            {
                key: 'removeDocumentRequest',
                text: translate('REMOVE_REQUEST_BUTTON_TEXT'),
                iconProps: { iconName: 'Delete' },
                onClick: () => onDocumentDelete(document, deleteRequest),
                disabled: disableDelete,
                ['data-testid']: 'remove-req-btn',
            },
        ];

        if (!missingFile) {
            items.unshift({
                key: 'removeDocument',
                text: translate('REMOVE_DOCUMENT_BUTTON_TEXT'),
                iconProps: { iconName: 'Delete' },
                onClick: () => onDocumentDelete(document, !deleteRequest),
                disabled: disableDelete,
                ['data-testid']: 'remove-doc-btn',
            });
        }

        return { items };
    }, [disableDelete, document, missingFile, onDocumentDelete, translate]);

    const handleReviewClick = useCallback(() => {
        onFileView(document);
    }, [document, onFileView]);

    const handleUploadClick = useCallback(
        (file: File) => {
            onUpload(document, file);
        },
        [document, onUpload]
    );

    return (
        <Stack horizontal data-testid="document-card-footer" horizontalAlign="space-between" verticalAlign="center" styles={docFooterCardStyles}>
            <Stack horizontal verticalAlign="center" tokens={footerLeftButtonsTokens}>
                <DocumentStatusTag status={status} autoUpdated={autoUpdated} />
                {showReviewButton ? (
                    <DefaultButton onClick={handleReviewClick} text={translate('REVIEW')} data-testid="default-button" styles={reviewButtonStyles} />
                ) : showUploadButton ? (
                    <UploadFileButton disabled={disableUpdate} stopClickPropagation onUpload={handleUploadClick} isMissingFile={missingFile} />
                ) : undefined}
            </Stack>

            <IconButton
                menuIconProps={menuIconProps}
                menuProps={cardMenuProps}
                ariaDescription={translate('MORE_ACTIONS')}
                data-testid="more-button"
                styles={menuButtonStyle}
                onAfterMenuDismiss={() => commandButtonRef.current?.focus()}
                elementRef={commandButtonRef}
            />
        </Stack>
    );
};

export default DocumentCardFooter;

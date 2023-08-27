import React, { FC, useContext, useEffect, useMemo, useState } from 'react';
import { Stack } from '@fluentui/react/lib/components/Stack';
import { ActionButton, DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
import { IconButton } from '@fluentui/react/lib/Button';
import { Text } from '@fluentui/react/lib/Text';
import { FontIcon } from '@fluentui/react/lib/components/Icon';
import { MessageBarType } from '@fluentui/react/lib/components/MessageBar';
import {
    documentFrameStlye,
    footerStyles,
    mainViewerStyle,
    documentContainerStyle,
    resetIconProps,
    cancelIconProps,
    documentIframeContainerStyle,
    headerIconStyle,
    uploadIconProps,
    headerTextStyles,
    documentViewerContainerErrorStyle,
    headerStyles,
} from './DocumentViewer.style';
import { useTranslation, namespaces } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { headerActionStyles } from '@fsi/core-components/dist/components/containers/Wizard/Wizard.style';
import {
    DocumentStatusesIcons,
    DOCUMENT_STATUSES_TYPES,
    MISSING_FILE_OPTION_NAME,
    PENDING_FILE_OPTION_NAME,
    DocumentsFileFormats,
} from '../../../constants/LoanDocument.consts';
import ErrorState from '@fsi/core-components/dist/components/containers/ErrorState/ErrorState';
import HighlightMessageBar from '@fsi/core-components/dist/components/atoms/HighlightMessageBar/HighlightMessageBar';
import Divider from '@fsi/core-components/dist/components/atoms/Divider/Divider';
import { DocumentsContext } from '../../../contexts/Documents/Documents.context';
import Loading from '@fsi/core-components/dist/components/atoms/Loading/Loading';
import { IDocumentFile, IDocument } from '../../../interfaces/ILoanDocument/ILoanDocument';
import { FileUploadField } from '@fsi/core-components/dist/components/atoms/FileUploadField/FileUploadField';
import { useTheme } from '@fluentui/react/lib/utilities/ThemeProvider/useTheme';
import { PrivilegeType } from '@fsi/core-components/dist/enums/PrivilegeType';

export interface IDocumentViewerProps {
    isUploading: boolean;
    onCancel: () => void;
    onAccept: () => void;
    onReject: () => void;
    onReset: () => void;
    onUpload: (document: IDocument, file: File, oldFileId: string) => void;
}

const ViewerHeader: FC<{ onCancel: () => void }> = ({ onCancel }) => {
    const translate = useTranslation(namespaces.LOAN_APPLICATION_FILES_CONTROL);
    const documentsContext = useContext(DocumentsContext);

    return (
        <Stack horizontal horizontalAlign="space-between" styles={headerStyles}>
            <Stack horizontal tokens={{ childrenGap: '10px' }} verticalAlign="center">
                {documentsContext.selectedDocument.status !== DOCUMENT_STATUSES_TYPES[PENDING_FILE_OPTION_NAME] && (
                    <FontIcon
                        data-testid="status-icon"
                        aria-label={translate(
                            `status of this document is ${documentsContext.documentStatuses[documentsContext.selectedDocument.status]}`
                        )}
                        iconName={DocumentStatusesIcons[documentsContext.selectedDocument.status].icon}
                        style={headerIconStyle(documentsContext.selectedDocument.status)}
                    />
                )}
                <Text styles={headerTextStyles}>{`${documentsContext.selectedDocument.name}`}</Text>
            </Stack>
            <IconButton
                aria-label={translate('CLOSE')}
                iconProps={cancelIconProps}
                data-testid="cancel-button"
                className={headerActionStyles}
                onClick={onCancel}
            />
        </Stack>
    );
};

interface ViewerFooterProps {
    documentSrc?: string;
    onAccept: () => void;
    onReject: () => void;
    onCancel: () => void;
    onUpload: (file: File) => void;
    onReset: () => void;
}

const ViewerFooter: FC<ViewerFooterProps> = ({ documentSrc, onAccept, onReject, onCancel, onUpload, onReset }) => {
    const translate = useTranslation(namespaces.LOAN_APPLICATION_FILES_CONTROL);
    const documentsContext = useContext(DocumentsContext);
    const {
        palette: { themePrimary },
    } = useTheme();

    const editDocumentDisabled = !documentsContext.hasDocumentPrivilege(PrivilegeType.Write);

    const renderFooterActionButtons = useMemo(() => {
        switch (documentsContext.selectedDocument.status) {
            case DOCUMENT_STATUSES_TYPES[PENDING_FILE_OPTION_NAME]:
                return (
                    <>
                        <PrimaryButton
                            text={translate('ACCEPT')}
                            data-testid="accept-button"
                            onClick={onAccept}
                            disabled={!documentSrc || editDocumentDisabled}
                            aria-hidden={!documentSrc || undefined}
                        />
                        <DefaultButton
                            text={translate('REJECT')}
                            data-testid="reject-button"
                            onClick={onReject}
                            disabled={!documentSrc || editDocumentDisabled}
                            aria-hidden={!documentSrc || undefined}
                        />
                    </>
                );
            case DOCUMENT_STATUSES_TYPES[MISSING_FILE_OPTION_NAME]:
                return;
            default:
                return <PrimaryButton text={translate('CLOSE')} data-testid="close-button" onClick={onCancel} />;
        }
    }, [documentsContext.selectedDocument.status, documentSrc]);

    return (
        <Stack horizontal horizontalAlign="space-between" styles={footerStyles}>
            <Stack horizontal tokens={{ childrenGap: '23px' }}>
                <FileUploadField
                    id="viewerFileUpload"
                    onUpload={onUpload}
                    disabled={!documentSrc || editDocumentDisabled}
                    iconProps={uploadIconProps(themePrimary)}
                    supportedFileFormats={DocumentsFileFormats}
                >
                    {translate('DOCUMENT_VIEWER_ACTIONS_UPLOAD_NEW_TEXT')}
                </FileUploadField>
                {documentsContext.selectedDocument.status !== DOCUMENT_STATUSES_TYPES[PENDING_FILE_OPTION_NAME] && (
                    <ActionButton
                        iconProps={resetIconProps(themePrimary)}
                        data-testid="reset-button"
                        onClick={onReset}
                        disabled={editDocumentDisabled}
                    >
                        {translate('RESET_STATUS')}
                    </ActionButton>
                )}
            </Stack>
            <Stack horizontal verticalAlign="center" tokens={{ childrenGap: '8px' }}>
                {renderFooterActionButtons}
            </Stack>
        </Stack>
    );
};

const DocumentViewerContainer: FC<{ documentSrc?: string }> = ({ documentSrc }) => {
    const translate = useTranslation(namespaces.LOAN_APPLICATION_FILES_CONTROL);

    return documentSrc ? (
        <div className={documentIframeContainerStyle}>
            <iframe frameBorder="0" src={documentSrc} className={documentFrameStlye} data-testid="document-frame-view" />
        </div>
    ) : (
        <ErrorState
            iconSize={200}
            title={translate('DOCUMENT_VIEWER_PREVIEW_FILE_MAIN_TITLE_ERROR')}
            subtitle={translate('DOCUMENT_VIEWER_PREVIEW_FILE_SUB_TITLE_ERROR')}
            styles={documentViewerContainerErrorStyle}
        />
    );
};

export const DocumentViewer: FC<IDocumentViewerProps> = ({ isUploading, onCancel, onReject, onAccept, onReset, onUpload }) => {
    const documentsContext = useContext(DocumentsContext);
    const [isLoading, setIsLoading] = useState(true);
    const [documentFile, setDocumentFile] = useState<IDocumentFile>({ fileId: '', src: '' });

    useEffect(() => {
        if (!isUploading) {
            getDocumentSrc();
        }
    }, [isUploading]);

    const getDocumentSrc = async () => {
        try {
            const documentFile = await documentsContext.getDocumentSrc();
            setDocumentFile(documentFile);
        } finally {
            setIsLoading(false);
        }
    };

    const onFileUpload = async (file: File) => {
        onUpload(documentsContext.selectedDocument, file, documentFile.fileId);
    };

    const renderDocumentContainer = useMemo(
        () => (
            <Stack styles={documentContainerStyle} verticalAlign="center" horizontalAlign="center">
                {isLoading ? <Loading /> : <DocumentViewerContainer documentSrc={documentFile.src} />}
            </Stack>
        ),
        [documentFile.src, isLoading]
    );

    return (
        <Stack styles={mainViewerStyle}>
            <ViewerHeader onCancel={onCancel} />
            <Divider />
            {documentsContext.errorMessage && (
                <HighlightMessageBar
                    messageBarType={MessageBarType.error}
                    highlight={documentsContext.errorMessage}
                    onDismiss={() => documentsContext.setErrorMessage('')}
                />
            )}
            {renderDocumentContainer}
            <ViewerFooter
                documentSrc={documentFile.src}
                onUpload={onFileUpload}
                onReset={onReset}
                onCancel={onCancel}
                onAccept={onAccept}
                onReject={onReject}
            />
        </Stack>
    );
};

export default DocumentViewer;

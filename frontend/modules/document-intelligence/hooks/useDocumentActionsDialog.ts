import { useState } from 'react';
import { useQuery } from 'react-query';
import { ICustomDialogProps } from '@fsi/core-components/dist/components/containers/Dialog/Dialog.interface';
import { useLocale } from '@fsi/core-components/dist/context/hooks/useLocale';
import { useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { DocumentStatus, IDocumentRequest } from '../interfaces';
import { IDocumentBaseFetcher } from '../interfaces/IDocumentsFetcher';
import { formatNumber } from '@fsi/core-components/dist/utilities/NumberUtils';
import { DEFAULT_MAX_UPLOAD_SIZE, DI_NAMESPACE } from '../constants/DocumentIntelligence.const';
import { useDeleteDocument } from './useDeleteDocument';
import { useUploadDocumentFile } from './useUploadDocumentFile';
import { useLoggerService } from '@fsi/core-components/dist/context/hooks/useLoggerService';
import { useSupportedFileFormats } from './useSupportedFileFormats';

export interface IUseDocumentDialogResponse {
    dialogProps: ICustomDialogProps;
    showDeleteDialog: (document: IDocumentRequest, deleteRequest: boolean) => void;
    showUploadFileDialogs: (document: IDocumentRequest, file: File) => void;
    closeDialog: () => void;
    showAddErrorMessage: () => void;
    showUpdateStatusError: (status: number) => void;
    isDeleting?: boolean;
    isUploading?: boolean;
    isUpdating?: boolean;
    isLoadingFileSize?: boolean;
}

const updateStatusErrorMessage = {
    [DocumentStatus.Rejected]: { title: 'REJECT_DOCUMENT_ERROR_TITLE', description: 'REJECT_DOCUMENT_ERROR_DESCRIPTION' },
    [DocumentStatus.Approved]: { title: 'APPROVE_DOCUMENT_ERROR_TITLE', description: 'APPROVE_DOCUMENT_ERROR_DESCRIPTION' },
    [DocumentStatus.PendingReview]: { title: 'RESET_DOCUMENT_ERROR_TITLE', description: 'RESET_DOCUMENT_ERROR_TITLE' },
};

const bytesToMegabytes = (bytes: number) => {
    return bytes / Math.pow(1024, 2);
};

export const useDocumentActionsDialog = (fetcher: IDocumentBaseFetcher, contextId?: string): IUseDocumentDialogResponse => {
    const [dialogProps, setDialogProps] = useState<ICustomDialogProps>({});
    const translate = useTranslation(DI_NAMESPACE);
    const logger = useLoggerService();
    const locale = useLocale();
    const supportedFileFormats = useSupportedFileFormats();
    const { mutate, isLoading: isDeleting } = useDeleteDocument(fetcher, contextId);

    const uploadMutation = useUploadDocumentFile(fetcher, contextId);
    const { data: maxUploadFileSize, isLoading: isLoadingFileSize } = useQuery(`get-max-file-upload-size`, () => fetcher.getMaxUploadSize(), {
        cacheTime: Infinity,
        staleTime: Infinity,
    });

    const closeDialog = () => setDialogProps(props => ({ ...props, hidden: true }));

    const getErrorDialogProps = (title: string, description: string) => ({
        title,
        dialogContentProps: {
            subText: description,
        },
        hidden: false,
        onDismiss: closeDialog,
        onAccept: closeDialog,
        acceptButtonText: translate('CLOSE'),
    });

    const showDeleteErrorMessage = (deleteRequest: boolean) => {
        const deleteErrorProps = getErrorDialogProps(
            deleteRequest ? translate('REMOVE_DOCUMENT_REQUEST_ERROR_TITLE') : translate('REMOVE_DOCUMENT_ERROR_TITLE'),
            deleteRequest ? translate('REMOVE_DOCUMENT_REQUEST_ERROR_DESCRIPTION') : translate('REMOVE_DOCUMENT_ERROR_DESCRIPTION')
        );
        setDialogProps(deleteErrorProps);
    };

    const showDeleteDialog = (document: IDocumentRequest, deleteRequest: boolean) => {
        setDialogProps({
            title: deleteRequest ? translate('REMOVE_REQUEST_DIALOG_TITLE_TEXT') : translate('REMOVE_DOCUMENT_DIALOG_TITLE_TEXT'),
            dialogContentProps: {
                subText: deleteRequest ? translate('REMOVE_REQUEST_DIALOG_DESCRIPTION_TEXT') : translate('REMOVE_DOCUMENT_DIALOG_DESCRIPTION_TEXT'),
            },
            hidden: false,
            onDismiss: closeDialog,
            onCancel: closeDialog,
            onAccept: () => {
                closeDialog();
                mutate(
                    { document, deleteRequest },
                    {
                        onError: () => showDeleteErrorMessage(deleteRequest),
                    }
                );
            },
            acceptButtonText: translate('DELETE'),
            cancelButtonText: translate('CANCEL'),
        });
    };

    const showAddErrorMessage = () => {
        setDialogProps(getErrorDialogProps(translate('ADD_DOCUMENT_REQUEST_ERROR_TITLE'), translate('ADD_DOCUMENT_REQUEST_ERROR_DESCRIPTION')));
    };

    const showUploadErrorMessage = () => {
        setDialogProps(getErrorDialogProps(translate('UPLOAD_DOCUMENT_ERROR_TITLE'), translate('UPLOAD_DOCUMENT_ERROR_DESCRIPTION')));
    };

    const uploadFile = (document: IDocumentRequest, file: File) =>
        uploadMutation.mutate(
            { document, file },
            {
                onError: () => showUploadErrorMessage(),
            }
        );

    const showReplaceFileMessage = (onAccept: () => void) => {
        setDialogProps({
            title: translate('UPLOAD_DOCUMENT_REPLACE_FILE_TITLE_TEXT'),
            dialogContentProps: {
                subText: translate('UPLOAD_DOCUMENT_REPLACE_FILE_DESCRIPTION_TEXT'),
            },
            hidden: false,
            acceptButtonText: translate('UPLOAD_DOCUMENT_REPLACE_FILE_REPLACE_BUTTON'),
            cancelButtonText: translate('CANCEL'),
            onDismiss: closeDialog,
            onCancel: closeDialog,
            onAccept: () => {
                closeDialog();
                onAccept();
            },
        });
    };

    const showUploadFileDialogs = (document: IDocumentRequest, file: File) => {
        logger.logInteractionOrAction({
            uniqueName: `Upload file`,
        });
        const maxSize = maxUploadFileSize || DEFAULT_MAX_UPLOAD_SIZE;
        const isLargerThanMaxSize = file.size > maxSize;
        if (isLargerThanMaxSize) {
            return setDialogProps(
                getErrorDialogProps(
                    translate('UPLOAD_DOCUMENT_ERROR_MAX_SIZE_TITLE'),
                    translate('UPLOAD_DOCUMENT_MAX_SIZE_ERROR_DESCRIPTION', {
                        maxSize: formatNumber(bytesToMegabytes(maxSize), locale, undefined, { maximumFractionDigits: 2 }),
                    })
                )
            );
        }

        if (document.documentId) {
            return showReplaceFileMessage(() => uploadFile(document, file));
        }

        const extension = file.name.substring(file.name.lastIndexOf('.') + 1).toLowerCase();
        if (!supportedFileFormats.includes(extension)) {
            return setDialogProps(
                getErrorDialogProps(translate('UPLOAD_DOCUMENT_FORMAT_ERROR_TITLE'), translate('UPLOAD_DOCUMENT_FORMAT_ERROR_DESCRIPTION'))
            );
        }

        uploadFile(document, file);
    };

    const showUpdateStatusError = (status: number) => {
        return setDialogProps(
            getErrorDialogProps(translate(updateStatusErrorMessage[status].title), translate(updateStatusErrorMessage[status].description))
        );
    };

    return {
        dialogProps,
        showDeleteDialog,
        showAddErrorMessage,
        closeDialog,
        showUploadFileDialogs,
        showUpdateStatusError,
        isDeleting,
        isUploading: uploadMutation.isLoading,
        isLoadingFileSize,
    };
};

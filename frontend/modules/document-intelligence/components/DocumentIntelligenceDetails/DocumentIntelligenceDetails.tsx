import React, { FC } from 'react';
import { DI_NAMESPACE, DOCUMENT_INTELLIGENCE_FLAGS } from '../../constants/DocumentIntelligence.const';
import DocumentDetailsView from '../DocumentDetailsView/DocumentDetailsView';
import { useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { useIsFeatureEnabled } from '@fsi/core-components/dist/context/hooks/useIsFeatureEnabled';
import { useDocumentActionsDialog } from '../../hooks/useDocumentActionsDialog';
import { useUpdateDocumentStatus } from '../../hooks/useUpdateDocumentStatus';
import { IDocumentRequest } from '../../interfaces/IDocument';
import { useSingleDocument } from '../../hooks/useSingleDocument';
import Widget from '@fsi/core-components/dist/components/atoms/Widget/Widget';
import Dialog from '@fsi/core-components/dist/components/containers/Dialog/Dialog';
import { rootSingleDocumentStyles } from './DocumentIntelligenceDetails.style';
import { IDocumentIntelligenceDetailsProps } from './DocumentIntelligenceDetails.interface';

export const DocumentIntelligenceDetails: FC<IDocumentIntelligenceDetailsProps> = ({ fetcher, documentId }) => {
    const showDescription = useIsFeatureEnabled(DOCUMENT_INTELLIGENCE_FLAGS.SHOW_DESCRIPTION);
    const translate = useTranslation(DI_NAMESPACE);
    const { dialogProps, isDeleting, showUploadFileDialogs, showUpdateStatusError, isUploading } = useDocumentActionsDialog(fetcher);

    const { isLoading: isUpdating, mutate: statusMutate } = useUpdateDocumentStatus(fetcher);
    const { document: documentRequest, isError, isLoading } = useSingleDocument(fetcher, documentId);

    const handleUpdateDocumentStatus = (document: IDocumentRequest, status: number) => {
        statusMutate(
            { document, status },
            {
                onError: () => showUpdateStatusError(status),
            }
        );
    };

    const isDocumentLoading = isLoading || isUploading || isDeleting || isUpdating;

    return (
        <>
            <Widget
                name="doc-details-widget"
                errorIconSize={200}
                isError={isError}
                isLoading={isDocumentLoading}
                styles={rootSingleDocumentStyles}
                loadingLabel={isUploading ? translate('DOCUMENT_UPLOADING') : undefined}
            >
                {documentRequest && (
                    <DocumentDetailsView
                        document={documentRequest}
                        onCancel={() => {}}
                        fetcher={fetcher}
                        onUpload={showUploadFileDialogs}
                        onUpdateDocumentStatus={handleUpdateDocumentStatus}
                        showDescription={showDescription}
                    />
                )}
            </Widget>
            <Dialog {...dialogProps} />
        </>
    );
};

export default DocumentIntelligenceDetails;

import React, { FC, useCallback, useState } from 'react';
import { Stack } from '@fluentui/react/lib/components/Stack/Stack';
import { Text } from '@fluentui/react/lib/components/Text/Text';
import {
    documentDetailsHeaderIconProps,
    documentDetailsHeaderStyles,
    documentDetailsHeaderTextStyles,
    documentDetailsViewInnerStyles,
    documentDetailsViewStyles,
    documentFileContentStyles,
    loadingPaneStyles,
    messageBarErrorStyles,
} from './DocumentDetailsView.style';
import { IDocumentDetailsViewProps } from './DocumentDetailsView.interface';
import { IconButton } from '@fluentui/react/lib/components/Button/IconButton/IconButton';
import { useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { useDocumentFile } from '../../hooks/useDocumentFile';
import DocumentFileContent from '../DocumentFileContent/DocumentFileContent';
import { DocumentDetailsPane } from '../DocumentDetailsPane/DocumentDetailsPane';
import DocumentDetailsFooter from '../DocumentDetailsFooter/DocumentDetailsFooter';
import { DocumentStatus } from '../../interfaces/IDocument';
import { PrivilegeType } from '@fsi/core-components/dist/enums/PrivilegeType';
import { DI_NAMESPACE } from '../../constants/DocumentIntelligence.const';
import DocumentEmptyFileState from '../DocumentEmptyFileState/DocumentEmptyFileState';
import { useUpdateDocumentDescription } from '../../hooks/useUpdateDocumentDescription';
import { MessageBarType } from '@fluentui/react/lib/components/MessageBar/MessageBar.types';
import HighlightMessageBar from '@fsi/core-components/dist/components/atoms/HighlightMessageBar/HighlightMessageBar';
import { useStepsDefinitions } from '../../hooks/useStepsDefinitions';
import { usePipelineStepsResults } from '../../hooks/usePipelineStepsResults';
import { useExtractionDetails } from '../../hooks/useExtractionDetails';
import { IStepResultWithDefinition } from '../../interfaces';
import Loading from '@fsi/core-components/dist/components/atoms/Loading/Loading';
import { useUpdateStepFields } from '../../hooks/useUpdateStepFields';

export const DocumentDetailsView: FC<IDocumentDetailsViewProps> = ({
    document,
    onUpload,
    onUpdateDocumentStatus,
    onCancel,
    fetcher,
    showDescription,
    isModal,
}) => {
    const translate = useTranslation(DI_NAMESPACE);
    const commonTranslate = useTranslation();

    const { file, isError, isLoading } = useDocumentFile(fetcher, document.documentId);
    const {
        stepsDefinitions,
        isLoading: isLoadingSteps,
        isError: isErrorLoadingSteps,
    } = useStepsDefinitions(fetcher, document.documentDefinitionId as string);

    const {
        pipelineSteps,
        isError: isErrorLoadingResults,
        isLoading: isLoadingResults,
    } = usePipelineStepsResults(fetcher, {
        stepsDefinitions: stepsDefinitions || [],
        document,
    });

    const { extractInformationStep, enrichmentInformationStep, messageBar, hasEmptyRequiredEnrichmentFields, hasEmptyRequiredExtractedFields } =
        useExtractionDetails(pipelineSteps);

    const [isInDetailsEditMode, setIsInDetailsEditMode] = useState(false);
    const [updatingFieldsError, setUpdatingFieldsError] = useState<string>('');

    const { mutate: statusMutateDescription } = useUpdateDocumentDescription(fetcher);
    const { isLoading: isSavingStepFields, onSave: onSaveStepFields } = useUpdateStepFields(fetcher, document.pipelineResult?.id, {
        onSuccess: () => setUpdatingFieldsError(''),
        onError: () => setUpdatingFieldsError(translate('ERROR_SAVE_EXTRACTION_FIELDS')),
    });

    const handleUploadClick = useCallback(
        (newFile: File) => {
            onUpload(document!, newFile);
        },
        [document, onUpload]
    );

    const updateStatusAndClose = useCallback(
        (status: number) => {
            onUpdateDocumentStatus(document!, status);
            onCancel();
        },
        [document, onCancel, onUpdateDocumentStatus]
    );

    const handleUpdateDocumentDescription = (description: string) => {
        statusMutateDescription(
            { document: document!, description },
            {
                onSuccess: () => setUpdatingFieldsError(''),
                onError: () => setUpdatingFieldsError(translate('ERROR_EDIT_DESCRIPTION_DIALOG_DOCUMENT')),
            }
        );
    };

    const handleApproveClick = useCallback(() => updateStatusAndClose(DocumentStatus.Approved), [updateStatusAndClose]);

    const handleRejectClick = useCallback(() => updateStatusAndClose(DocumentStatus.Rejected), [updateStatusAndClose]);

    const handleResetClick = useCallback(() => updateStatusAndClose(DocumentStatus.PendingReview), [updateStatusAndClose]);

    const hasWriteAccess = fetcher.hasDocumentPrivilege(PrivilegeType.Write);
    const isFooterDisabled = isLoading || !hasWriteAccess || document.inactive || isInDetailsEditMode || isSavingStepFields;
    const isApproveButtonDisabled = document.pipelineResult && (hasEmptyRequiredEnrichmentFields || hasEmptyRequiredExtractedFields);

    const { name } = document;
    const shouldShowMessageBar = messageBar && !isLoadingResults && document.status === DocumentStatus.PendingReview && document.pipelineResult;

    return (
        <Stack styles={documentDetailsViewStyles}>
            {isModal && (
                <Stack horizontal horizontalAlign="space-between" styles={documentDetailsHeaderStyles}>
                    <Stack horizontal verticalAlign="center">
                        <Text styles={documentDetailsHeaderTextStyles}>{name}</Text>
                    </Stack>
                    <IconButton
                        aria-label={translate('CLOSE')}
                        iconProps={documentDetailsHeaderIconProps}
                        data-testid="cancel-button"
                        onClick={onCancel}
                    />
                </Stack>
            )}
            {shouldShowMessageBar && (
                <HighlightMessageBar
                    styles={messageBarErrorStyles}
                    messageBarType={messageBar.type}
                    regular={translate(messageBar.message)}
                    hidden={!messageBar}
                />
            )}
            {updatingFieldsError && (
                <HighlightMessageBar
                    styles={messageBarErrorStyles}
                    messageBarType={MessageBarType.blocked}
                    regular={updatingFieldsError}
                    hidden={!updatingFieldsError}
                />
            )}
            <Stack horizontal styles={documentDetailsViewInnerStyles} verticalAlign="start">
                <Stack grow={1} verticalAlign="center" verticalFill horizontalAlign="center" styles={documentFileContentStyles}>
                    {document.documentId ? (
                        <DocumentFileContent label={translate('DOCUMENT_FILE_CONTENT_LABEL')} file={file} isError={isError} isLoading={isLoading} />
                    ) : (
                        <DocumentEmptyFileState disabled={!hasWriteAccess || !!document.inactive} onUpload={handleUploadClick} />
                    )}
                </Stack>
                {isLoadingSteps ? (
                    <Loading styles={loadingPaneStyles} label={commonTranslate('LOADING')} />
                ) : (
                    <DocumentDetailsPane
                        document={document}
                        fetcher={fetcher}
                        showDescription={showDescription}
                        updateDescription={handleUpdateDocumentDescription}
                        onEditModeChange={setIsInDetailsEditMode}
                        hasWriteAccess={hasWriteAccess}
                        extractedStep={extractInformationStep as IStepResultWithDefinition}
                        enrichmentStep={enrichmentInformationStep}
                        isErrorLoadingResults={isErrorLoadingResults}
                        isErrorLoadingSteps={isErrorLoadingSteps}
                        isLoadingResults={isLoadingResults}
                        pipelineSteps={pipelineSteps}
                        onSaveStepFields={onSaveStepFields}
                        isSavingStepFields={isSavingStepFields}
                    />
                )}
            </Stack>
            <DocumentDetailsFooter
                document={document}
                onUpload={handleUploadClick}
                onApprove={handleApproveClick}
                onReject={handleRejectClick}
                onReset={handleResetClick}
                onCancel={isModal ? onCancel : undefined}
                disabled={isFooterDisabled}
                disabledApprove={isApproveButtonDisabled}
            />
        </Stack>
    );
};

export default DocumentDetailsView;

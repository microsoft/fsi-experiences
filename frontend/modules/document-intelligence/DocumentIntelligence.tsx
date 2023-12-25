import React, { FC, useMemo, useState } from 'react';
import { IDocumentRequest } from './interfaces/IDocument';
import { IDocumentsFetcher } from './interfaces/IDocumentsFetcher';
import DocumentList from './components/DocumentList/DocumentList';
import DocumentsSection from './components/DocumentsSection/DocumentsSection';
import { DI_NAMESPACE, DocumentSectionKeys, DOCUMENT_INTELLIGENCE_FLAGS } from './constants/DocumentIntelligence.const';
import { useGroupedDocuments } from './hooks/useGroupedDocuments';
import { useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { useLoggerService } from '@fsi/core-components/dist/context/hooks/useLoggerService';
import {
    addButtonStyles,
    addIconProps,
    modalOverlayProps,
    modalContentStyles,
    modalStyles,
    rootDIStyles,
    searchBoxStyles,
    wrapperStyles,
    widgetDIStyles,
} from './DocumentIntelligence.style';
import { Widget } from '@fsi/core-components/dist/components/atoms/Widget/Widget';
import DocumentDetailsView from './components/DocumentDetailsView/DocumentDetailsView';
import { Modal } from '@fluentui/react/lib/components/Modal/Modal';
import Dialog from '@fsi/core-components/dist/components/containers/Dialog/Dialog';
import { useDocumentActionsDialog } from './hooks/useDocumentActionsDialog';
import { ActionButton } from '@fluentui/react/lib/components/Button/ActionButton/ActionButton';
import DocumentCreationDialog from './components/DocumentCreationDialog/DocumentCreationDialog';
import { IDocumentRegarding } from './interfaces/IDocumentRegarding';
import { IDocumentDefinition } from './interfaces/IDocumentDefinition';
import { useDocumentDefinitions } from './hooks/useDocumentDefinitions';
import { useAvailableRegarding } from './hooks/useAvailableRegarding';
import { useCreateDocumentRequest } from './hooks/useCreateDocumentRequest';
import { PrivilegeType } from '@fsi/core-components/dist/enums/PrivilegeType';
import { useUpdateDocumentStatus } from './hooks/useUpdateDocumentStatus';
import { useNotificationService } from '@fsi/core-components/dist/hooks/useNotificationService/useNotificationService';
import { useIsFeatureEnabled } from '@fsi/core-components/dist/context/hooks/useIsFeatureEnabled';
import { Stack } from '@fluentui/react/lib/components/Stack/Stack';
import { useDebounce } from '@fsi/core-components/dist/hooks/useDebounce/useDebounce';
import { SearchBox } from '@fluentui/react/lib/components/SearchBox/SearchBox';
import { useQuery } from 'react-query';
export interface IDocumentIntelligenceProps {
    fetcher: IDocumentsFetcher;
    contextId: string;
    newDocumentFormId?: string | null;
}

export const DocumentIntelligence: FC<IDocumentIntelligenceProps> = ({ fetcher, contextId, newDocumentFormId }) => {
    const showDescription = useIsFeatureEnabled(DOCUMENT_INTELLIGENCE_FLAGS.SHOW_DESCRIPTION);
    const translate = useTranslation(DI_NAMESPACE);
    const logger = useLoggerService();
    const [search, setSearch] = useState<string>('');
    const onChangeSearch = useDebounce((value: string) => setSearch(value), [setSearch], 500);

    const { sections, metadata, allDocuments, isLoading, isError, refetch: refetchDocuments } = useGroupedDocuments(fetcher, contextId, search);

    const { definitions, isLoading: isLoadingDefinitions, isError: isErrorDefinitions } = useDocumentDefinitions(fetcher);

    const { data: isContextInactive = true } = useQuery(['document-is-context-inactive', contextId], () => fetcher.isContextInactive(contextId));
    const {
        regardingEntities,
        isLoading: isLoadingRegardingEntities,
        isError: isErrorRegardingEntities,
        refetch: refetchRegarding,
    } = useAvailableRegarding(fetcher, contextId);

    const createMutation = useCreateDocumentRequest(fetcher);
    const { isLoading: isUpdating, mutate: statusMutate } = useUpdateDocumentStatus(fetcher, contextId);

    const {
        dialogProps,
        showDeleteDialog,
        isDeleting,
        showAddErrorMessage,
        showUploadFileDialogs,
        showUpdateStatusError,
        isUploading,
        isLoadingFileSize,
    } = useDocumentActionsDialog(fetcher, contextId);

    const [showDocCreationDialog, setShowDocCreationDialog] = useState(false);
    const { hide: hideNotification } = useNotificationService();

    const dialogIsVisible = dialogProps.hidden === false;

    const [viewingDocumentId, setViewingDocumentId] = useState<string | undefined>(undefined);

    const onDocumentDelete = (document: IDocumentRequest, deleteRequest: boolean) => {
        showDeleteDialog(document, deleteRequest);

        logger.logInteractionOrAction({
            uniqueName: deleteRequest ? 'Delete document request' : 'Delete document file',
        });
    };
    const onFileView = (document: IDocumentRequest) => {
        setViewingDocumentId(document.id);
        hideNotification();

        logger.logInteractionOrAction({
            uniqueName: `View document details (status=${document.status})`,
        });
    };

    const handleAddDocumentBtn = ({
        regarding,
        documentDefinition,
        description,
    }: {
        regarding: IDocumentRegarding;
        documentDefinition: IDocumentDefinition;
        description?: string;
    }) => {
        createMutation.mutate(
            { regarding, definition: documentDefinition, contextId, descriptionEntity: description },
            {
                onError: showAddErrorMessage,
            }
        );
        setShowDocCreationDialog(false);
    };

    const handleUpdateDocumentStatus = (document: IDocumentRequest, status: number) => {
        statusMutate(
            { document, status },
            {
                onError: () => showUpdateStatusError(status),
            }
        );

        logger.logInteractionOrAction({
            uniqueName: `Update document status to ${status}`,
        });
    };

    const viewingDocument = useMemo(() => {
        if (!viewingDocumentId) {
            return undefined;
        }
        return allDocuments.find(doc => doc.id === viewingDocumentId);
    }, [allDocuments, viewingDocumentId]);

    const isDocumentLoading = isLoading || isUploading || isDeleting || isUpdating || createMutation.isLoading || isLoadingFileSize;

    const showDocDetailsViewModal = !!viewingDocument && !dialogIsVisible && !isUploading;

    const getNewRequestText = (key: string) =>
        metadata?.documentEntityName
            ? translate(`${key}_DYNAMIC`, { documentEntityName: metadata?.documentEntityName.toLocaleLowerCase() })
            : translate(key);

    const openNewDocumentForm = async (formId: string) => {
        try {
            await fetcher.openNewDocumentForm(formId);
        } finally {
            refetchDocuments();
        }
    };
    const handleAddButtonClick = () => {
        logger.logInteractionOrAction({
            uniqueName: 'Add new request button clicked',
        });
        if (newDocumentFormId) {
            openNewDocumentForm(newDocumentFormId);
            return;
        }
        if (!showDocCreationDialog) {
            refetchRegarding();
        }
        setShowDocCreationDialog(true);
    };

    return (
        <Stack styles={rootDIStyles}>
            <Stack.Item styles={wrapperStyles}>
                <SearchBox
                    data-testid="searchbox-di"
                    underlined
                    placeholder={translate('SEARCH')}
                    styles={searchBoxStyles}
                    defaultValue={search}
                    onChange={e => {
                        e ? onChangeSearch(e!.target.value) : setSearch('');
                    }}
                />
                <ActionButton
                    iconProps={addIconProps}
                    data-testid="add-doc-request-button"
                    onClick={handleAddButtonClick}
                    styles={addButtonStyles}
                    disabled={!fetcher.hasDocumentPrivilege(PrivilegeType.Create) || isContextInactive}
                >
                    {getNewRequestText('REQUEST_NEW_DOCUMENT_BTN_TXT')}
                </ActionButton>
            </Stack.Item>
            <Widget
                errorIconSize={200}
                isError={isError}
                isLoading={isDocumentLoading}
                styles={widgetDIStyles}
                loadingLabel={isUploading ? translate('DOCUMENT_UPLOADING') : undefined}
            >
                {DocumentSectionKeys.map(sectionKey => (
                    <DocumentsSection key={sectionKey} count={sections[sectionKey].length} title={translate(`DOCUMENTS_${sectionKey}_TEXT`)}>
                        <DocumentList
                            documents={sections[sectionKey]}
                            onFileView={onFileView}
                            onDocumentDelete={onDocumentDelete}
                            disableUpdate={!fetcher.hasDocumentPrivilege(PrivilegeType.Write)}
                            disableDelete={!fetcher.hasDocumentPrivilege(PrivilegeType.Delete)}
                            onFileUpload={showUploadFileDialogs}
                            showDescription={showDescription}
                        />
                    </DocumentsSection>
                ))}
                <Modal
                    containerClassName={modalContentStyles.container}
                    styles={modalStyles}
                    overlay={modalOverlayProps}
                    isOpen={showDocDetailsViewModal}
                    isBlocking={true}
                    data-testid="document-details-modal"
                    onDismiss={() => setViewingDocumentId(undefined)}
                >
                    {viewingDocument && (
                        <DocumentDetailsView
                            document={viewingDocument}
                            onCancel={() => setViewingDocumentId(undefined)}
                            fetcher={fetcher}
                            onUpload={showUploadFileDialogs}
                            onUpdateDocumentStatus={handleUpdateDocumentStatus}
                            showDescription={showDescription}
                            isModal
                        />
                    )}
                </Modal>
                <Dialog {...dialogProps} />
                {showDocCreationDialog && (
                    <DocumentCreationDialog
                        isLoading={isLoadingDefinitions || isLoadingRegardingEntities}
                        isError={isErrorDefinitions || isErrorRegardingEntities}
                        regardingEntities={regardingEntities || []}
                        regardingDisplayName={metadata?.regardingEntityName}
                        documentDefinitions={definitions || []}
                        isOpen={showDocCreationDialog}
                        onAdd={handleAddDocumentBtn}
                        onCancel={() => setShowDocCreationDialog(false)}
                        onDismiss={() => setShowDocCreationDialog(false)}
                        showDescription={showDescription}
                        header={getNewRequestText('ADD_NEW_DOCUMENT_REQUEST')}
                    />
                )}
            </Widget>
        </Stack>
    );
};

export default DocumentIntelligence;

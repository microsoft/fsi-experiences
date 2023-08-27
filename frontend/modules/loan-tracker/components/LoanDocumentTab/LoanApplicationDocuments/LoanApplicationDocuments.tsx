import React, { FC, useContext, useMemo, useRef, useState } from 'react';
import { Stack } from '@fluentui/react/lib/components/Stack';
import { Modal } from '@fluentui/react/lib/Modal';
import { useTranslation, namespaces } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { MAX_MB_FILE_SIZE, modalContentStyles, rootStyles, seperatorStyles } from './LoanApplicationDocuments.style';
import DocumentDialog from '../DocumentDialog/DocumentDialog';
import DocumentViewer from '../DocumentViewer/DocumentViewer';
import { defaultDocument, DocumentsContext } from '../../../contexts/Documents/Documents.context';
import DocumentsSection from '../DocumentsSection/DocumentsSection';
import { DOCUMENT_STATUSES_TYPES, MISSING_FILE_OPTION_NAME, PENDING_FILE_OPTION_NAME } from '../../../constants/LoanDocument.consts';
import { IApplicant } from '../../../interfaces/ILoanApplicant/ILoanApplicant';
import { ICustomDocument, IDocument } from '../../../interfaces/ILoanDocument/ILoanDocument';
import AddDocumentDialog from '../AddDocumentDialog/AddDocumentDialog';
import { DocumentsFileFormats, DocumentsBigScreenSize } from '../../../constants/LoanDocument.consts';
import { IButton } from '@fluentui/react/lib/components/Button/Button.types';
import { AddDocumentButton } from '../DocumentsSection/AddDocumentButton';
import useMediaQueryListener from '@fsi/core-components/dist/hooks/useMediaQueryListener/useMediaQueryListener';
import { Separator } from '@fluentui/react/lib/components/Separator/Separator';
import { PrivilegeType } from '@fsi/core-components/dist/enums/PrivilegeType';

export interface ILoanApplicationDocumentsProps {}

export interface IDialogOptions {
    title: string;
    description: string;
    isOpen: boolean;
    isLoading: boolean;
    primaryButtonText: string;
    defaultButtonText: string;
    onPrimaryButtonClick: () => void;
    onDefaultButtonClick: () => void;
}

export const initialDialogState = {
    title: '',
    description: '',
    isLoading: false,
    isOpen: false,
    primaryButtonText: '',
    defaultButtonText: '',
    onPrimaryButtonClick: () => {},
    onDefaultButtonClick: () => {},
};

interface documentsByCategory {
    incompleteDocuments: IDocument[];
    pendingDocuments: IDocument[];
    approvedDocuments: IDocument[];
}

export const LoanApplicationDocuments: FC<ILoanApplicationDocumentsProps> = () => {
    const translate = useTranslation(namespaces.LOAN_APPLICATION_FILES_CONTROL);
    const documentsContext = useContext(DocumentsContext);
    const [isAddDocumentOpen, setIsAddDocumentOpen] = useState(false);
    const [isFileViewerOpen, setIsFileViewerOpen] = useState<boolean>(false);
    const [dialogOptions, setDialogOptions] = useState<IDialogOptions>(initialDialogState);
    const [isUploadingFile, setIsUploadingFile] = useState(false);

    const isMediaMatched = useMediaQueryListener(`screen and (max-width: ${DocumentsBigScreenSize})`);

    const cardSectionSelectedRef = useRef<IButton>();

    const dialogLoadingState = useMemo(
        () => ({
            ...initialDialogState,
            title: translate('LOADING'),
            isLoading: true,
            isOpen: true,
        }),
        []
    );

    /* istanbul ignore next */
    const setCardSectionSelectedRef = (cardSectionRef: IButton | null | undefined) => {
        if (cardSectionRef) {
            cardSectionSelectedRef.current = cardSectionRef;
        }
    };

    /* istanbul ignore next */
    const onDocumentViewerCancel = () => {
        setIsFileViewerOpen(false);
        cardSectionSelectedRef?.current?.focus();
    };

    /* istanbul ignore next */
    const onDocumentAccept = async () => {
        setIsFileViewerOpen(false);
        setDialogOptions(dialogLoadingState);
        try {
            await documentsContext.acceptDocument(documentsContext.selectedDocument);
        } catch (e) {
            documentsContext.setErrorMessage(translate('LOAN_APP_DOCUMENTS_ACCEPT_DOCUMENT_ERROR_MESSAGE'));
            setIsFileViewerOpen(true);
        } finally {
            closeDialog();
            documentsContext.setSelectedDocument(defaultDocument);
            cardSectionSelectedRef?.current?.focus();
        }
    };

    /* istanbul ignore next */
    const onDocumentReset = async () => {
        setIsFileViewerOpen(false);
        setDialogOptions(dialogLoadingState);
        try {
            const updatedDocument = await documentsContext.resetDocument(documentsContext.selectedDocument);
            documentsContext.setSelectedDocument(updatedDocument);
        } catch (e) {
            documentsContext.setErrorMessage(translate('LOAN_APP_DOCUMENTS_RESET_DOCUMENT_ERROR_MESSAGE'));
            setIsFileViewerOpen(true);
        } finally {
            closeDialog();
            onFileView();
            cardSectionSelectedRef?.current?.focus();
        }
    };

    /* istanbul ignore next */
    const onDocumentReject = () => {
        setIsFileViewerOpen(false);
        setDialogOptions({
            title: translate('LOAN_APP_DOCUMENTS_DIALOG_REJECT_TITLE_TEXT'),
            description: translate('LOAN_APP_DOCUMENTS_DIALOG_REJECT_DESCRIPTION_TEXT'),
            isLoading: false,
            isOpen: true,
            primaryButtonText: translate('REJECT'),
            defaultButtonText: translate('GO_BACK'),
            onPrimaryButtonClick: rejectDocument,
            onDefaultButtonClick: () => {
                closeDialog();
                onFileView();
            },
        });
    };

    /* istanbul ignore next */
    const rejectDocument = async () => {
        setDialogOptions(dialogLoadingState);
        try {
            await documentsContext.rejectDocument(documentsContext.selectedDocument);
        } catch (e) {
            documentsContext.setErrorMessage(translate('LOAN_APP_DOCUMENTS_REJECT_DOCUMENT_ERROR_MESSAGE'));
            setIsFileViewerOpen(true);
        } finally {
            closeDialog();
            documentsContext.setSelectedDocument(defaultDocument);
            cardSectionSelectedRef?.current?.focus();
        }
    };

    /* istanbul ignore next */
    const closeDialog = () => setDialogOptions(initialDialogState);

    /* istanbul ignore next */
    const onFileView = (cardSectionRef?: IButton | null) => {
        setCardSectionSelectedRef(cardSectionRef);
        setIsFileViewerOpen(true);
    };

    /* istanbul ignore next */
    const onDialogDismiss = () => {
        setDialogOptions(initialDialogState);
        cardSectionSelectedRef?.current?.focus();
    };

    /* istanbul ignore next */
    const onDocumentAdd = async (applicant: IApplicant, customDocument: ICustomDocument) => {
        setIsAddDocumentOpen(false);
        setDialogOptions(dialogLoadingState);
        try {
            const addDocumentData = {
                id: applicant.id,
                name: applicant.name,
                role: applicant.role,
                customDocument: customDocument,
                isPrimary: applicant.isPrimary,
            };
            await documentsContext.addDocument(addDocumentData);
            closeDialog();
            cardSectionSelectedRef?.current?.focus();
        } catch {
            setDialogOptions({
                title: translate('ADD_DOCUMENT_REQUEST_ERROR_TITLE'),
                description: translate('ADD_DOCUMENT_REQUEST_ERROR_DESCRIPTION'),
                isLoading: false,
                isOpen: true,
                primaryButtonText: translate('CLOSE'),
                defaultButtonText: '',
                onPrimaryButtonClick: () => {
                    closeDialog();
                    cardSectionSelectedRef?.current?.focus();
                },
                onDefaultButtonClick: () => {},
            });
        }
    };

    /* istanbul ignore next */
    const onDocumentDelete = async (documentId: string, isMissingFile: boolean, cardSectionRef: IButton | null) => {
        setCardSectionSelectedRef(cardSectionRef);
        setDialogOptions({
            title: isMissingFile ? translate('REMOVE_REQUEST_DIALOG_TITLE_TEXT') : translate('REMOVE_DOCUMENT_DIALOG_TITLE_TEXT'),
            description: isMissingFile ? translate('REMOVE_REQUEST_DIALOG_DESCRIPTION_TEXT') : translate('REMOVE_DOCUMENT_DIALOG_DESCRIPTION_TEXT'),
            isLoading: false,
            isOpen: true,
            primaryButtonText: translate('DELETE'),
            defaultButtonText: translate('CANCEL'),
            onPrimaryButtonClick: () => deleteDocument(documentId, isMissingFile, cardSectionRef),
            onDefaultButtonClick: () => {
                closeDialog();
                cardSectionRef?.focus();
            },
        });
    };

    /* istanbul ignore next */
    const deleteDocument = async (documentId: string, isMissingFile: boolean, cardSectionRef: IButton | null) => {
        setDialogOptions(dialogLoadingState);
        const isSucceeded = await documentsContext.removeDocument(documentId);

        if (!isSucceeded) {
            setDialogOptions({
                title: isMissingFile ? translate('REMOVE_DOCUMENT_REQUEST_ERROR_TITLE') : translate('REMOVE_DOCUMENT_ERROR_TITLE'),
                description: isMissingFile ? translate('REMOVE_DOCUMENT_REQUEST_ERROR_DESCRIPTION') : translate('REMOVE_DOCUMENT_ERROR_DESCRIPTION'),
                isLoading: false,
                isOpen: true,
                primaryButtonText: translate('CLOSE'),
                defaultButtonText: '',
                onPrimaryButtonClick: () => {
                    closeDialog();
                    cardSectionRef?.focus();
                },
                onDefaultButtonClick: () => {},
            });
        } else {
            closeDialog();
            cardSectionRef?.focus();
        }
    };

    /* istanbul ignore next */
    const onFileUpload = (document: IDocument, file: File, cardSectionRef?: IButton | null, oldFileId?: string) => {
        setCardSectionSelectedRef(cardSectionRef);
        const wasFileViewerOpened = isFileViewerOpen;
        setIsFileViewerOpen(false);
        const extension = file.name.substring(file.name.lastIndexOf('.') + 1).toLowerCase();
        const fileSizeInMB = file.size / 1024 / 1024;
        if (DocumentsFileFormats.includes(extension) && fileSizeInMB < MAX_MB_FILE_SIZE) {
            if (wasFileViewerOpened) {
                setDialogOptions({
                    title: translate('UPLOAD_DOCUMENT_REPLACE_FILE_TITLE_TEXT'),
                    description: translate('UPLOAD_DOCUMENT_REPLACE_FILE_DESCRIPTION_TEXT'),
                    isLoading: false,
                    isOpen: true,
                    primaryButtonText: translate('UPLOAD_DOCUMENT_REPLACE_FILE_REPLACE_BUTTON'),
                    defaultButtonText: translate('CANCEL'),
                    onPrimaryButtonClick: () => viewerFileUpload(document, file, oldFileId),
                    onDefaultButtonClick: () => {
                        closeDialog();
                        onFileView();
                    },
                });
            } else {
                cardFileUpload(document, file);
            }
        } else {
            setDialogOptions({
                title: translate(fileSizeInMB > MAX_MB_FILE_SIZE ? 'UPLOAD_DOCUMENT_ERROR_MAX_SIZE_TITLE' : 'UPLOAD_DOCUMENT_FORMAT_ERROR_TITLE'),
                description: translate(
                    fileSizeInMB > MAX_MB_FILE_SIZE ? 'UPLOAD_DOCUMENT_MAX_SIZE_ERROR_DESCRIPTION' : 'UPLOAD_DOCUMENT_FORMAT_ERROR_DESCRIPTION'
                ),
                isLoading: false,
                isOpen: true,
                primaryButtonText: translate('CLOSE'),
                defaultButtonText: '',
                onPrimaryButtonClick: () => {
                    if (wasFileViewerOpened) {
                        onFileView();
                    }
                    closeDialog();
                    cardSectionSelectedRef?.current?.focus();
                },
                onDefaultButtonClick: () => {},
            });
        }
    };

    /* istanbul ignore next */
    const cardFileUpload = async (document: IDocument, file: File) => {
        setDialogOptions(dialogLoadingState);
        try {
            await documentsContext.uploadDocument(document, file);
            closeDialog();
            cardSectionSelectedRef?.current?.focus();
        } catch {
            setDialogOptions({
                title: translate('UPLOAD_DOCUMENT_ERROR_TITLE'),
                description: translate('UPLOAD_DOCUMENT_ERROR_DESCRIPTION'),
                isLoading: false,
                isOpen: true,
                primaryButtonText: translate('CLOSE'),
                defaultButtonText: '',
                onPrimaryButtonClick: () => {
                    closeDialog();
                    cardSectionSelectedRef?.current?.focus();
                },
                onDefaultButtonClick: () => {},
            });
        }
    };

    /* istanbul ignore next */
    const viewerFileUpload = async (document: IDocument, file: File, oldFileId?: string) => {
        closeDialog();
        setIsUploadingFile(true);
        onFileView();
        try {
            await documentsContext.uploadDocument(document, file, oldFileId);
        } finally {
            setIsUploadingFile(false);
        }
    };

    /* istanbul ignore next */
    const changeAddDocumentDialogDisplay = (isOpen: boolean, cardSectionRef?: IButton | null) => {
        setIsAddDocumentOpen(isOpen);
        if (isOpen) {
            setCardSectionSelectedRef(cardSectionRef);
        } else {
            cardSectionSelectedRef?.current?.focus();
        }
    };

    /* istanbul ignore next */
    const onViewerUploadClick = (document: IDocument, file: File, oldFileId: string) =>
        onFileUpload(document, file, cardSectionSelectedRef?.current, oldFileId);

    /* istanbul ignore next */
    const addDocumentButtonClick = (cardSectionRef?: IButton | null) => changeAddDocumentDialogDisplay(true, cardSectionRef);

    const addDocumentDisabled = !documentsContext.hasDocumentPrivilege(PrivilegeType.Create);

    const { incompleteDocuments, pendingDocuments, approvedDocuments }: documentsByCategory = useMemo(
        () =>
            documentsContext.documents.reduce(
                (prevValue: documentsByCategory, currValue: IDocument) => {
                    switch (currValue.status) {
                        case DOCUMENT_STATUSES_TYPES.Rejected:
                            return { ...prevValue, incompleteDocuments: [currValue, ...prevValue.incompleteDocuments] };
                        case DOCUMENT_STATUSES_TYPES[MISSING_FILE_OPTION_NAME]:
                            return { ...prevValue, incompleteDocuments: [...prevValue.incompleteDocuments, currValue] };
                        case DOCUMENT_STATUSES_TYPES[PENDING_FILE_OPTION_NAME]:
                            return { ...prevValue, pendingDocuments: [...prevValue.pendingDocuments, currValue] };
                        case DOCUMENT_STATUSES_TYPES.Approved:
                            return { ...prevValue, approvedDocuments: [...prevValue.approvedDocuments, currValue] };
                        default:
                            return prevValue;
                    }
                },
                { incompleteDocuments: [], pendingDocuments: [], approvedDocuments: [] }
            ),
        [documentsContext.documents]
    );

    return (
        <>
            <Stack styles={rootStyles}>
                {isMediaMatched && (
                    <Stack data-testid="add-new-docment-stack-small-screen">
                        <Stack horizontal horizontalAlign="end" verticalAlign="center" styles={{ root: { background: 'white' } }}>
                            <AddDocumentButton addDocumentDisabled={addDocumentDisabled} addDocument={addDocumentButtonClick} />
                        </Stack>
                        <Separator styles={seperatorStyles} />
                    </Stack>
                )}
                <DocumentsSection
                    documents={incompleteDocuments}
                    onDocumentViewerOpen={onFileView}
                    title={translate('LOAN_APP_DOCUMENTS_INCOMPLETE_TEXT')}
                    onAddDocument={isMediaMatched ? undefined : addDocumentButtonClick}
                    addDocumentDisabled={addDocumentDisabled}
                    onDocumentDelete={onDocumentDelete}
                    onFileUpload={onFileUpload}
                />
                <DocumentsSection
                    documents={pendingDocuments}
                    onDocumentViewerOpen={onFileView}
                    onDocumentDelete={onDocumentDelete}
                    title={translate('LOAN_APP_DOCUMENTS_FOR_REVIEW_TEXT')}
                    onFileUpload={onFileUpload}
                />
                <DocumentsSection
                    documents={approvedDocuments}
                    onDocumentViewerOpen={onFileView}
                    onDocumentDelete={onDocumentDelete}
                    title={translate('APPROVED')}
                    onFileUpload={onFileUpload}
                />
            </Stack>
            <DocumentDialog /* istanbul ignore next */ options={dialogOptions} onDismiss={onDialogDismiss} />
            <Modal
                containerClassName={modalContentStyles.container}
                styles={{ root: { height: '100%' } }}
                titleAriaId="documentViewer"
                isOpen={isFileViewerOpen}
                isBlocking={true}
                data-testid="viewer-modal"
            >
                <DocumentViewer
                    isUploading={isUploadingFile}
                    onCancel={onDocumentViewerCancel}
                    onAccept={onDocumentAccept}
                    onReject={onDocumentReject}
                    onReset={onDocumentReset}
                    onUpload={onViewerUploadClick}
                />
            </Modal>
            <AddDocumentDialog
                applicants={documentsContext.applicants}
                customDocuments={documentsContext.customDocuments}
                title={translate('LOAN_APP_DOCUMENTS_DIALOG_ADD_NEW_DOCUMENT_REQUEST_TITLE')}
                isOpen={isAddDocumentOpen}
                onAdd={onDocumentAdd}
                onCancel={/* istanbul ignore next */ () => changeAddDocumentDialogDisplay(false)}
                onDismiss={/* istanbul ignore next */ () => changeAddDocumentDialogDisplay(false)}
            />
        </>
    );
};

export default LoanApplicationDocuments;

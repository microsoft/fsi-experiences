import React, { createContext, FC, useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import { ILoanApplicationDocumentsFetcher } from '../../interfaces/ILoanDocument/ILoanApplicationDocumentsFetcher';
import { IAddDocumentData, IDocument, ICustomDocument } from '../../interfaces/ILoanDocument/ILoanDocument';
import { IApplicant } from '../../interfaces/ILoanApplicant/ILoanApplicant';
import useBrowserCommunication from '@fsi/core-components/dist/hooks/useBrowserCommunication/useBrowserCommunication';
import { isLoanApplicationLocked } from '../../helpers/loanApplicationsHelper/loanApplicationsHelper';
import { DocumentsStatusChangeQuery, DOCUMENT_STATUSES_TYPES, MISSING_FILE_OPTION_NAME } from '../../constants/LoanDocument.consts';
import { DocumentsActions, DocumentsReducer } from './Documents.reducers';

export const defaultDocument: IDocument = {
    id: '',
    name: '',
    description: '',
    status: DOCUMENT_STATUSES_TYPES[MISSING_FILE_OPTION_NAME],
    lastStatusDate: new Date(),
    ownerName: '',
    ownerRole: '',
    isPrimary: false,
};

/* istanbul ignore next */
export const initialContextDocuments = {
    isLocked: false,
    documents: Array<IDocument>(),
    documentStatuses: {},
    isLoading: true,
    selectedDocument: defaultDocument,
    customDocuments: Array<ICustomDocument>(),
    applicants: Array<IApplicant>(),
    setSelectedDocument: (document: IDocument) => {},
    setErrorMessage: (msg: string) => {},
    errorMessage: '',
    getDocumentSrc: () => Promise.resolve({ fileId: '', src: '' }),
    addDocument: (data: IAddDocumentData) => Promise.resolve(defaultDocument),
    acceptDocument: (document: IDocument) => Promise.resolve(defaultDocument),
    rejectDocument: (document: IDocument) => Promise.resolve(defaultDocument),
    resetDocument: (document: IDocument) => Promise.resolve(defaultDocument),
    uploadDocument: (document: IDocument, file: File, oldFileId?: string) => Promise.resolve(defaultDocument),
    removeDocument: (documentId: string) => Promise.resolve(true),
    hasDocumentPrivilege: (operation: number) => false,
};

export const DocumentsContext = createContext(initialContextDocuments);

export const DocumentsContextProvider: FC<{ fetcher: ILoanApplicationDocumentsFetcher; loanApplicationId: string }> = ({
    fetcher,
    loanApplicationId,
    children,
}) => {
    const [documents, dispatch] = useReducer(DocumentsReducer, []);
    const [documentStatuses, setDocumentStatuses] = useState({});
    const [customDocuments, setCustomDocuments] = useState<ICustomDocument[]>([]);
    const [applicants, setApplicants] = useState<IApplicant[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedDocument, setSelectedDocument] = useState(defaultDocument);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLocked, setIsLocked] = useState(true);
    const { postMessage: postDocumentStatusChange } = useBrowserCommunication(`${DocumentsStatusChangeQuery}-${loanApplicationId}`);

    const initData = async () => {
        setIsLoading(true);
        const choices = initChoices();
        const documents = initDocuments();
        const statuses = initLoanStatuses();
        await Promise.all([choices, documents, statuses]);
        setIsLoading(false);
    };

    useEffect(() => {
        initData();
    }, [fetcher]);

    const getLoanStatusAndState = useCallback(async () => await fetcher.getLoanStausAndState(), [fetcher]);
    const getLoanApplicants = useCallback(async () => await fetcher.getLoanApplicants(), [fetcher]);
    const getCustomDocuments = useCallback(async () => await fetcher.getCustomDocuments(), [fetcher]);
    const getDocumentStatusesMap = useCallback(async () => await fetcher.getDocumentStatusesMap(), [fetcher]);

    /* istanbul ignore next */
    const initLoanStatuses = async () => {
        const loanStateAndStatuses = await getLoanStatusAndState();
        const isLocked = isLoanApplicationLocked(loanStateAndStatuses);
        setIsLocked(isLocked);
    };

    const initChoices = async () => {
        const statusesMapPromise = getDocumentStatusesMap();
        const applicantsPromise = getLoanApplicants();
        const customDocumentsPromise = getCustomDocuments();
        const [statusesMap, applicants, types] = await Promise.all([statusesMapPromise, applicantsPromise, customDocumentsPromise]);
        setDocumentStatuses(statusesMap);
        setApplicants(applicants);
        setCustomDocuments(types);
    };

    const initDocuments = async () => {
        const documentItems = await fetcher.getItems();
        dispatch({ type: DocumentsActions.SET_DOCUMENTS, payload: documentItems });
    };

    const getDocumentSrc = async () => {
        return await fetcher.getDocumentSrc(selectedDocument.id);
    };

    const addDocument = async (data: IAddDocumentData) => {
        const addedDocument = await fetcher.addDocument(data);
        dispatch({ type: DocumentsActions.ADD_DOCUMENT, payload: addedDocument });
        return addedDocument;
    };

    const acceptDocument = async (document: IDocument) => {
        const updatedDocument = await fetcher.acceptDocument(document);
        postDocumentStatusChange(document);
        dispatch({ type: DocumentsActions.UPDATE_DOCUMENT_STATUS, payload: updatedDocument });
        return updatedDocument;
    };

    const rejectDocument = async (document: IDocument) => {
        const updatedDocument = await fetcher.rejectDocument(document);
        dispatch({ type: DocumentsActions.UPDATE_DOCUMENT_STATUS, payload: updatedDocument });
        return updatedDocument;
    };

    const resetDocument = async (document: IDocument) => {
        const updatedDocument = await fetcher.resetDocument(document);
        postDocumentStatusChange(document);
        dispatch({ type: DocumentsActions.UPDATE_DOCUMENT_STATUS, payload: updatedDocument });
        return updatedDocument;
    };

    const uploadDocument = async (document: IDocument, file: File, oldFileId?: string) => {
        const updatedDocument = await fetcher.uploadDocument(document, file, oldFileId);
        dispatch({ type: DocumentsActions.UPDATE_DOCUMENT_STATUS, payload: updatedDocument });
        return updatedDocument;
    };

    const removeDocument = async (documentId: string) => {
        const removeSucceeded = await fetcher.removeDocument(documentId);
        postDocumentStatusChange(documentId);
        if (removeSucceeded) {
            dispatch({ type: DocumentsActions.REMOVE_DOCUMENT, payload: documentId });
        }
        return removeSucceeded;
    };

    const hasDocumentPrivilege = useCallback((operation: number) => fetcher.hasDocumentPrivilege(operation) && !isLocked, [isLocked, fetcher]);

    const value = useMemo(
        () => ({
            isLocked,
            isLoading,
            documents,
            documentStatuses,
            customDocuments,
            applicants,
            selectedDocument,
            setSelectedDocument,
            errorMessage,
            setErrorMessage,
            getDocumentSrc,
            acceptDocument,
            rejectDocument,
            resetDocument,
            uploadDocument,
            addDocument,
            removeDocument,
            hasDocumentPrivilege,
        }),
        [
            isLocked,
            isLoading,
            documents,
            documentStatuses,
            customDocuments,
            applicants,
            selectedDocument,
            errorMessage,
            getDocumentSrc,
            acceptDocument,
            rejectDocument,
            resetDocument,
            uploadDocument,
            addDocument,
            removeDocument,
            hasDocumentPrivilege,
        ]
    );

    return <DocumentsContext.Provider value={value as any}>{children}</DocumentsContext.Provider>;
};

export default DocumentsContextProvider;

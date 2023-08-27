import { IDocument } from '../../interfaces/ILoanDocument/ILoanDocument';

export const DocumentsActions = {
    SET_DOCUMENTS: 'SET_DOCUMENTS',
    UPDATE_DOCUMENT_STATUS: 'UPDATE_DOCUMENT_STATUS',
    ADD_DOCUMENT: 'ADD_DOCUMENT',
    REMOVE_DOCUMENT: 'REMOVE_DOCUMENT',
} as const;

export type IDocumentsReducerAction = {
    type: string;
    payload: any;
};

export const DocumentsReducer = (state: IDocument[], action: IDocumentsReducerAction) => {
    switch (action.type) {
        case DocumentsActions.SET_DOCUMENTS: {
            const documents = action.payload;
            return [...documents];
        }
        case DocumentsActions.UPDATE_DOCUMENT_STATUS: {
            const { id, status, lastStatusDate } = action.payload;
            const updatedState = state.map(item => (item.id === id ? { ...item, status, lastStatusDate } : item));
            return updatedState;
        }
        case DocumentsActions.ADD_DOCUMENT: {
            const documentToAdd = action.payload;
            return [...state, documentToAdd];
        }
        case DocumentsActions.REMOVE_DOCUMENT: {
            const removedDocumentId = action.payload;
            return state.filter(item => item.id !== removedDocumentId);
        }
        default: {
            return state;
        }
    }
};

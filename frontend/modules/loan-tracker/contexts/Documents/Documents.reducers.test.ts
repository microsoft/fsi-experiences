import { mockDocuments } from '../../interfaces/ILoanDocument/mocks/ILoanDocument.mocks';
import { DOCUMENT_STATUSES_TYPES, MISSING_FILE_OPTION_NAME } from '../../constants/LoanDocument.consts';
import { DocumentsActions, DocumentsReducer } from './Documents.reducers';

describe('DocumentsReducer', () => {
    it('should return the current state if document does not exist', () => {
        const missingDocument = { ...mockDocuments[0], id: '6' };
        const newState = DocumentsReducer(mockDocuments, { type: DocumentsActions.UPDATE_DOCUMENT_STATUS, payload: missingDocument });
        expect(newState).toEqual(mockDocuments);
    });

    it('should return the current state', () => {
        const newState = DocumentsReducer(mockDocuments, { type: 'test', payload: {} });
        expect(newState).toEqual(mockDocuments);
    });

    it('should return state with new documents', () => {
        const newState = DocumentsReducer([], { type: DocumentsActions.SET_DOCUMENTS, payload: mockDocuments });
        expect(newState).toEqual(mockDocuments);
    });

    it('should return state with documents after an update', () => {
        const newState = DocumentsReducer(mockDocuments, {
            type: DocumentsActions.UPDATE_DOCUMENT_STATUS,
            payload: { ...mockDocuments[0], status: DOCUMENT_STATUSES_TYPES.Approved },
        });
        const updatedState = [...mockDocuments];
        updatedState[0].status = DOCUMENT_STATUSES_TYPES.Approved;
        expect(newState).toEqual(updatedState);
    });

    it('should return state with an added document', () => {
        const newDocument = { ...mockDocuments[0], id: '7', status: DOCUMENT_STATUSES_TYPES[MISSING_FILE_OPTION_NAME] };
        const newState = DocumentsReducer(mockDocuments, { type: DocumentsActions.ADD_DOCUMENT, payload: newDocument });
        const updatedState = [...mockDocuments, newDocument];
        expect(newState).toEqual(updatedState);
    });

    it('should return state with documents after removal of a document', () => {
        const newState = DocumentsReducer(mockDocuments, { type: DocumentsActions.REMOVE_DOCUMENT, payload: mockDocuments[0].id });
        const updatedState = mockDocuments.filter(item => item.id !== mockDocuments[0].id);
        expect(newState).toEqual(updatedState);
    });

    it('should return current state if deleted document not found', () => {
        const newState = DocumentsReducer(mockDocuments, { type: DocumentsActions.REMOVE_DOCUMENT, payload: 'test' });
        expect(newState).toEqual(mockDocuments);
    });
});

import { IDocumentRequest } from '../../interfaces/IDocument';
export interface IDocumentCardFooterProps {
    document: IDocumentRequest;
    onDocumentDelete: (document: IDocumentRequest, deleteRequest: boolean) => void;
    onFileView: (document: IDocumentRequest) => void;
    onUpload: (document: IDocumentRequest, file: File) => void;
    disableUpdate?: boolean;
    disableDelete?: boolean;
}

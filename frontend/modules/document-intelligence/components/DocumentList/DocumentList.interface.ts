import { IDocumentRequest } from '../../interfaces';
export interface IDocumentListProps {
    documents: IDocumentRequest[];
    onFileView: (document: IDocumentRequest) => void;
    onDocumentDelete: (document: IDocumentRequest, deleteRequest: boolean) => void;
    onFileUpload: (document: IDocumentRequest, file: File) => void;
    disableUpdate?: boolean;
    disableDelete?: boolean;
    showDescription?: boolean;
}

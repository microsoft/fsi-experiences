import { IDocumentRequest } from '../../interfaces/IDocument';
import { IDocumentBaseFetcher } from '../../interfaces/IDocumentsFetcher';

export interface IDocumentDetailsViewProps {
    document: IDocumentRequest;
    fetcher: IDocumentBaseFetcher;
    onUpload: (document: IDocumentRequest, file: File) => void;
    onUpdateDocumentStatus: (document: IDocumentRequest, status: number) => void;
    onCancel: () => void;
    showDescription?: boolean;
    isModal?: boolean;
}

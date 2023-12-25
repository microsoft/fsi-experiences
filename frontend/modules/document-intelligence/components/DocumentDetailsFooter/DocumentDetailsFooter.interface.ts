import { IDocumentRequest } from '../../interfaces/IDocument';

export interface IDocumentDetailsFooterProps {
    disabled?: boolean;
    document: IDocumentRequest;
    onApprove: () => void;
    onReject: () => void;
    onCancel?: () => void;
    onUpload: (file: File) => void;
    onReset: () => void;
    disabledApprove?: boolean;
}

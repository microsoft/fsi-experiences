import { IDocumentFile } from '../../interfaces/IDocumentFile';
export interface IDocumentFileContentProps {
    file?: IDocumentFile;
    isLoading: boolean;
    isError: boolean;
    label: string;
}

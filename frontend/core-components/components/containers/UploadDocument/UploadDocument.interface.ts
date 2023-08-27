import { IFileUploadFieldProps } from '../../atoms/FileUploadField/FileUploadField.interface';

export interface IUploadDocumentProps extends IFileUploadFieldProps {
    label?: string;
    description?: string;
    onUpload: (file: File) => void;
    onRemove: () => void;
    uploadLabel: string;
    removeLabel: string;
}

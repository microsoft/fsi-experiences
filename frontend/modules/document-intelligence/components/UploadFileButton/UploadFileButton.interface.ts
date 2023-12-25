import { IFileUploadFieldProps } from '@fsi/core-components/dist/components/atoms/FileUploadField/FileUploadField.interface';

export interface IUploadFileButtonProps extends Omit<IFileUploadFieldProps, 'id'> {
    isMissingFile: boolean;
    primary?: boolean;
}

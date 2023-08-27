import React, { FC, useMemo } from 'react';
import { useId } from '@fluentui/react-hooks';
import { getUploadButtonStyle } from './UploadFileButton.style';
import { FileUploadField } from '@fsi/core-components/dist/components/atoms/FileUploadField/FileUploadField';
import { useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { useTheme } from '@fluentui/react/lib/utilities/ThemeProvider/useTheme';
import { IFileUploadFieldProps } from '@fsi/core-components/dist/components/atoms/FileUploadField/FileUploadField.interface';
import { DI_NAMESPACE } from '../../constants/DocumentIntelligence.const';
import { useSupportedFileFormats } from '../../hooks/useSupportedFileFormats';

export interface IUploadFileButtonProps extends Omit<IFileUploadFieldProps, 'id'> {
    isMissingFile: boolean;
    primary?: boolean;
}

export const UploadFileButton: FC<IUploadFileButtonProps> = props => {
    const { isMissingFile, styles, primary } = props;
    const translate = useTranslation(DI_NAMESPACE);
    const supportedFileFormats = useSupportedFileFormats();
    const {
        palette: { themePrimary },
    } = useTheme();
    const cardFileUploadID = useId('cardFileUpload');

    const buttonStyles = useMemo(
        () => (primary ? styles : getUploadButtonStyle(themePrimary, isMissingFile, styles)),
        [isMissingFile, primary, styles, themePrimary]
    );
    return (
        <FileUploadField {...props} styles={buttonStyles} id={cardFileUploadID} supportedFileFormats={supportedFileFormats} primary={primary}>
            {isMissingFile ? translate('UPLOAD') : translate('DOCUMENTS_UPLOAD_NEW')}
        </FileUploadField>
    );
};

export default UploadFileButton;

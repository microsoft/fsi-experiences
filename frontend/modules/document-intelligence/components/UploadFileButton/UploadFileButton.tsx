import React, { FC, useMemo } from 'react';
import { useId } from '@fluentui/react-hooks';
import { getUploadButtonStyle } from './UploadFileButton.style';
import { FileUploadField } from '@fsi/core-components/dist/components/atoms/FileUploadField/FileUploadField';
import { useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { useTheme } from '@fluentui/react/lib/utilities/ThemeProvider/useTheme';
import { DI_NAMESPACE } from '../../constants/DocumentIntelligence.const';
import { useSupportedFileFormats } from '../../hooks/useSupportedFileFormats';
import { IUploadFileButtonProps } from './UploadFileButton.interface';

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

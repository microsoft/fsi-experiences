import React, { FC } from 'react';
import { EmptyState } from '@fsi/core-components/dist/components/atoms/EmptyState/EmptyState';
import { useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { IMAGE_SRC } from '@fsi/core-components/dist/constants/ImageSrc';
import { DI_NAMESPACE } from '../../constants/DocumentIntelligence.const';
import { Stack } from '@fluentui/react';
import UploadFileButton from '../UploadFileButton/UploadFileButton';
import { emptyUploadButtonStyles, noFileEmptyStateStyles } from './DocumentEmptyFileState.style';
import { DocumentEmptyFileStateProps } from './DocumentEmptyFileState.interface';

export const DocumentEmptyFileState: FC<DocumentEmptyFileStateProps> = ({ onUpload, disabled }) => {
    const translate = useTranslation(DI_NAMESPACE);
    return (
        <Stack data-testid="document-empty-file-state" horizontalAlign="center">
            <EmptyState
                icon={IMAGE_SRC.create}
                styles={noFileEmptyStateStyles}
                title={translate('EMPTY_DOCUMENT_FILE_TITLE')}
                subtitle={translate('EMPTY_DOCUMENT_FILE_DESCRIPTION')}
                iconSize={200}
            />
            <UploadFileButton primary onUpload={onUpload} styles={emptyUploadButtonStyles} isMissingFile disabled={disabled} />
        </Stack>
    );
};

export default DocumentEmptyFileState;

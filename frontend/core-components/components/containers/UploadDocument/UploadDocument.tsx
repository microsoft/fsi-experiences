import { ActionButton } from '@fluentui/react/lib/components/Button/ActionButton/ActionButton';
import { FontIcon } from '@fluentui/react/lib/components/Icon';
import { Stack } from '@fluentui/react/lib/Stack';
import React, { FC } from 'react';
import { FileUploadField } from '../../atoms/FileUploadField';
import { ActionsTokens } from './UploadDocument.style';
import { RemoveFileIconProps, DocumentsFileFormats } from './UploadDocument.const';
import type { IUploadDocumentProps } from './UploadDocument.interface';
import { UploadDocumentStyles, UploadDocumentTokens } from './UploadDocument.style';

export const UploadDocument: FC<IUploadDocumentProps> = ({ label, onUpload, onRemove, uploadLabel, removeLabel }) => {
    return (
        <Stack tokens={UploadDocumentTokens}>
            {label && <div className={UploadDocumentStyles.label}>{label}</div>}
            <Stack tokens={ActionsTokens} horizontal>
                <FileUploadField id="1" onUpload={onUpload} data-testid="file-update" supportedFileFormats={DocumentsFileFormats}>
                    <Stack tokens={{ childrenGap: 8 }} horizontal verticalAlign="center" horizontalAlign="start">
                        <FontIcon iconName="upload" className={UploadDocumentStyles.icon} />
                        <span>{uploadLabel}</span>
                    </Stack>
                </FileUploadField>
                {label && (
                    <ActionButton iconProps={RemoveFileIconProps} data-testid="delete-file-button" onClick={onRemove}>
                        {removeLabel}
                    </ActionButton>
                )}
            </Stack>
        </Stack>
    );
};

export default UploadDocument;

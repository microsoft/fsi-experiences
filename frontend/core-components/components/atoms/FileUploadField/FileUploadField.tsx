import React, { FC, useRef, useCallback } from 'react';
import { ActionButton } from '@fluentui/react/lib/components/Button/ActionButton/ActionButton';
import { inputFileStyle } from './FileUploadField.style';
import { IFileUploadFieldProps } from './FileUploadField.interface';
import { PrimaryButton } from '@fluentui/react';

export const FileUploadField: FC<IFileUploadFieldProps> = ({
    id,
    onUpload,
    disabled,
    iconProps,
    children,
    styles,
    className,
    supportedFileFormats,
    stopClickPropagation,
    primary,
}) => {
    const inputFile = useRef<HTMLInputElement>(null);

    const onChangeFile = useCallback(
        async (event: React.ChangeEvent<HTMLInputElement>) => {
            event.preventDefault();
            const file = event.target.files?.[0];
            if (file) {
                onUpload(file);
                event.target.value = '';
            }
        },
        [onUpload]
    );

    const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        if (stopClickPropagation) {
            event.stopPropagation();
        }
        inputFile?.current?.click();
    };

    const actionButtonID = `upload-button-${id}`;

    return (
        <div>
            {primary ? (
                <PrimaryButton
                    className={className}
                    styles={styles}
                    id={actionButtonID}
                    iconProps={iconProps || {}}
                    data-testid="upload-button-primary"
                    onClick={handleClick}
                    disabled={disabled}
                >
                    {children}
                </PrimaryButton>
            ) : (
                <ActionButton
                    className={className}
                    styles={styles}
                    id={actionButtonID}
                    iconProps={iconProps || {}}
                    data-testid="upload-button"
                    onClick={handleClick}
                    disabled={disabled}
                >
                    {children}
                </ActionButton>
            )}
            <input
                type="file"
                accept={supportedFileFormats ? supportedFileFormats?.map(extension => `.${extension}`).join(',') : '*'}
                aria-labelledby={actionButtonID}
                id={id}
                data-testid="input-file"
                ref={inputFile}
                className={inputFileStyle}
                onClick={event => stopClickPropagation && event.stopPropagation()}
                onChange={onChangeFile}
            />
        </div>
    );
};

export default FileUploadField;

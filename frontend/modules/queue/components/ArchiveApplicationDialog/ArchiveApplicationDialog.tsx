import React, { FC, useEffect, useMemo, useState } from 'react';
import { IArchiveApplicationDialogProps } from './ArchiveApplicationDialog.interface';
import { Dialog } from '@fsi/core-components/dist/components/containers/Dialog/Dialog';
import { useMutation } from 'react-query';
import { Spinner } from '@fluentui/react/lib/Spinner';
import { IDropdownOption } from '@fluentui/react/lib/components/Dropdown/Dropdown.types';
import { Text } from '@fluentui/react/lib/Text';
import { useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { Dropdown } from '@fsi/core-components/dist/components/atoms/Dropdown/Dropdown';
import { TextField } from '@fsi/core-components/dist/components/atoms/TextField/TextField';
import { commentFieldStyles, dialogErrorTextStyles, dialogBtnStyles, reasonDropdownStyles } from './ArchiveApplicationDialog.style';
import { Stack } from '@fluentui/react/lib/components/Stack/Stack';
import { useId } from '@fluentui/react-hooks';
import { QUEUE_NAMESPACE } from '../../constants';

export const ArchiveApplicationDialog: FC<IArchiveApplicationDialogProps> = ({
    onCancel,
    onDismiss,
    onMoveToArchive,
    isOpen,
    itemName,
    archiveReasons,
}) => {
    const translate = useTranslation(QUEUE_NAMESPACE);

    const [reason, setReason] = useState('');
    const [comment, setComment] = useState('');

    const errorDialogTextID = useId('errorDialogTextId');

    const { isLoading, isError, mutate: onArchiveApplication } = useMutation(() => onMoveToArchive(reason, comment));

    const reasonsKeys = useMemo(() => Object.keys(archiveReasons), [archiveReasons]);

    useEffect(() => {
        if (isOpen) {
            setReason(reasonsKeys[0] || '');
            setComment('');
        }
    }, [isOpen, reasonsKeys]);

    const options = useMemo(() => reasonsKeys.map(key => ({ key, text: archiveReasons[key] })), [reasonsKeys, archiveReasons]);

    const onReasonChanged = (option: IDropdownOption) => setReason(option.key.toString());

    const onCommentChanged = (newValue?: string) => setComment(newValue || '');

    const isOtherReasonChosen = reason === reasonsKeys[reasonsKeys.length - 1];

    if (isLoading) {
        return (
            <Dialog hidden={!isOpen} maxWidth={493} onDismiss={onDismiss} isBlocking dialogContentProps={{ showCloseButton: false }}>
                <Spinner data-testid="spinner" ariaLabel={translate('DATA_LIST_LOADING')} label={translate('DATA_LIST_LOADING')} />
            </Dialog>
        );
    }

    if (isError) {
        return (
            <Dialog
                hidden={!isOpen}
                maxWidth={493}
                title={translate('ARCHIVE_APPLICATION_DIALOG_ERROR_TITLE')}
                acceptButtonText={translate('CLOSE')}
                onAccept={onCancel}
                onDismiss={onDismiss}
                modalProps={{
                    subtitleAriaId: errorDialogTextID,
                }}
            >
                <Text data-testid="dialog-error-text" id={errorDialogTextID} styles={dialogErrorTextStyles}>
                    {translate('ARCHIVE_APPLICATION_DIALOG_ERROR_TEXT', { itemName: itemName || '' })}
                </Text>
            </Dialog>
        );
    }

    return (
        <Dialog
            hidden={!isOpen}
            maxWidth={493}
            title={translate('ARCHIVE_APPLICATION_DIALOG_TITLE')}
            acceptButtonText={translate('ARCHIVE_APPLICATION_DIALOG_MOVE_TO_ARCHIVE_BUTTON')}
            acceptButtonProps={{
                disabled: isOtherReasonChosen && !comment,
                styles: dialogBtnStyles,
            }}
            onAccept={() => onArchiveApplication()}
            onCancel={onCancel}
            onDismiss={onDismiss}
        >
            <Stack tokens={{ childrenGap: 24 }}>
                <Dropdown
                    styles={reasonDropdownStyles}
                    options={options}
                    selectedKey={reason}
                    onChange={onReasonChanged}
                    label={translate('ARCHIVE_APPLICATION_DIALOG_TEXT')}
                    placeholder=""
                    data-testid="reasons-list"
                />
                {isOtherReasonChosen && (
                    <TextField
                        styles={commentFieldStyles}
                        label={translate('ARCHIVE_APPLICATION_DIALOG_ADD_COMMENT_LABEL')}
                        value={comment}
                        placeholder=""
                        multiline
                        rows={4}
                        maxLength={200}
                        required
                        resizable={false}
                        data-testid="comment-field"
                        onChange={onCommentChanged}
                    />
                )}
            </Stack>
        </Dialog>
    );
};

export default ArchiveApplicationDialog;

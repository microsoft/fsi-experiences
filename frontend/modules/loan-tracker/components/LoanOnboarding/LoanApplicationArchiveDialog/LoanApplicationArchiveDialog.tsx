import React, { FC, useContext, useEffect, useMemo, useState } from 'react';
import { useMutation } from 'react-query';
import { Spinner } from '@fluentui/react/lib/Spinner';
import { IDropdownOption } from '@fluentui/react/lib/components/Dropdown/Dropdown.types';
import { Text } from '@fluentui/react/lib/Text';
import { Dialog } from '@fsi/core-components/dist/components/containers/Dialog/Dialog';
import { namespaces, useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import type { ILoanApplicationArchiveDialogProps } from './LoanApplicationArchiveDialog.interface';
import { Dropdown } from '@fsi/core-components/dist/components/atoms/Dropdown/Dropdown';
import { TextField } from '@fsi/core-components/dist/components/atoms/TextField/TextField';
import { LoanOnboardingContext } from '../../../contexts/LoanOnboarding/LoanOnboarding.context';
import { commentFieldStyles, dialogErrorTextStyles, reasonDropdownStyles } from './LoanApplicationArchiveDialog.style';
import { Stack } from '@fluentui/react/lib/components/Stack/Stack';
import { useId } from '@fluentui/react-hooks/lib/useId';

export const LoanApplicationArchiveDialog: FC<ILoanApplicationArchiveDialogProps> = ({ isOpen, onCancel, onDismiss, onMoveToArchive }) => {
    const loanContext = useContext(LoanOnboardingContext);

    const translate = useTranslation(namespaces.LOAN_ONBOARDING_CONTROL);

    const [reason, setReason] = useState('');
    const [comment, setComment] = useState('');

    const errorDialogTextID = useId('errorDialogTextId');

    const { isLoading, isError, mutate: onArchiveLoan } = useMutation(() => onMoveToArchive(reason, comment));

    const reasonsKeys = useMemo(() => Object.keys(loanContext.archiveReasons), [loanContext.archiveReasons]);

    useEffect(() => {
        if (isOpen) {
            setReason(reasonsKeys[0] || '');
            setComment('');
        }
    }, [isOpen, reasonsKeys]);

    const options = useMemo(
        () => reasonsKeys.map(key => ({ key, text: loanContext.archiveReasons[key] })),
        [reasonsKeys, loanContext.archiveReasons]
    );

    const onReasonChanged = (option: IDropdownOption) => setReason(option.key.toString());

    const onCommentChanged = (newValue?: string) => setComment(newValue || '');

    const isOtherReasonChosen = reason === reasonsKeys[reasonsKeys.length - 1];

    if (isLoading) {
        return (
            <Dialog hidden={!isOpen} maxWidth={493} onDismiss={onDismiss} isBlocking dialogContentProps={{ showCloseButton: false }}>
                <Spinner data-testid="spinner" ariaLabel={translate('LOAN_LIST_LOADING')} label={translate('LOAN_LIST_LOADING')} />
            </Dialog>
        );
    }

    if (isError) {
        return (
            <Dialog
                hidden={!isOpen}
                maxWidth={493}
                title={translate('LOAN_ARCHIVE_DIALOG_ERROR_TTTLE')}
                acceptButtonText={translate('CLOSE')}
                onAccept={onCancel}
                onDismiss={onDismiss}
                ariaDescribedById={errorDialogTextID}
            >
                <Text data-testid="dialog-error-text" id={errorDialogTextID} styles={dialogErrorTextStyles}>
                    {translate('LOAN_ARCHIVE_DIALOG_ERROR_TEXT', { loanName: loanContext.selectedApplication?.name || '' })}
                </Text>
            </Dialog>
        );
    }

    return (
        <Dialog
            hidden={!isOpen}
            maxWidth={493}
            title={translate('LOAN_ARCHIVE_DIALOG_TITLE')}
            acceptButtonText={translate('LOAN_ARCHIVE_DIALOG_MOVE_TO_ARCHIVE_BUTTON')}
            acceptButtonProps={{
                disabled: isOtherReasonChosen && !comment,
                styles: {
                    root: {
                        minWidth: 143,
                    },
                },
            }}
            onAccept={() => onArchiveLoan()}
            onCancel={onCancel}
            onDismiss={onDismiss}
        >
            <Stack tokens={{ childrenGap: 24 }}>
                <Dropdown
                    styles={reasonDropdownStyles}
                    options={options}
                    selectedKey={reason}
                    onChange={onReasonChanged}
                    label={translate('LOAN_ARCHIVE_DIALOG_TEXT')}
                    placeholder=""
                    data-testid="reasons-list"
                />
                {isOtherReasonChosen && (
                    <TextField
                        styles={commentFieldStyles}
                        label={translate('LOAN_ARCHIVE_DIALOG_ADD_COMMENT_LABEL')}
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

export default LoanApplicationArchiveDialog;

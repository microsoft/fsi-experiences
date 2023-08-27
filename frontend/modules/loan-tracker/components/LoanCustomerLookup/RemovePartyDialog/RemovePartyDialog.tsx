import React, { FC } from 'react';
import { FormDialog } from '@fsi/core-components/dist/components/containers/FormDialog/FormDialog';
import { namespaces, useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { IRemovePartyDialogProps } from './RemovePartyDialog.interface';
import { Text } from '@fluentui/react/lib/Text';

export const RemovePartyDialog: FC<IRemovePartyDialogProps> = props => {
    const { title, onSubmitMutationFunc, onCancel, onDismiss, applicantToRemove } = props;

    const translate = useTranslation(namespaces.LOAN_CUSTOMER_LOOKUP);

    const onRemoveButtonClick = () => onSubmitMutationFunc(applicantToRemove.id);

    return (
        <FormDialog
            {...props}
            loadingProps={{ text: translate('REMOVE_PARTY_LOADING_TEXT') }}
            errorProps={{
                title: translate('REMOVE_PARTY_ERROR_TITLE'),
                message: translate('REMOVE_PARTY_ERROR_TEXT'),
            }}
            title={title}
            acceptButtonText={translate('DELETE')}
            onSubmit={onRemoveButtonClick}
            onCancel={onCancel}
            onDismiss={onDismiss}
        >
            <Text>
                {translate('REMOVE_PARTY_CONFIRMATION_DIALOG_TEXT', {
                    applicantFullName: applicantToRemove.fullName,
                    role: applicantToRemove.role,
                })}
            </Text>
        </FormDialog>
    );
};

export default RemovePartyDialog;

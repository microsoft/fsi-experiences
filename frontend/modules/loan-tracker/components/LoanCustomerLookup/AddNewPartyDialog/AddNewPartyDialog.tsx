import React, { FC, useEffect, useState } from 'react';
import { IAddNewPartyDialogProps } from './AddNewPartyDialog.interface';
import { namespaces, useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { IDropdownOption } from '@fluentui/react/lib/components/Dropdown/Dropdown.types';
import { acceptButtonStyles } from './AddNewPartyDialog.style';
import { emptyApplicantData } from '../../../constants/LoanCustomer.consts';
import { FormDialog } from '@fsi/core-components/dist/components/containers/FormDialog/FormDialog';
import { FormTextField } from '@fsi/core-components/dist/components/containers/FormTextField/FormTextField';
import { FormDropdown } from '@fsi/core-components/dist/components/containers/FormDropdown/FormDropdown';
import { Stack } from '@fluentui/react/lib/components/Stack/Stack';
import { useId } from '@fluentui/react-hooks/lib/useId';
import { getRules } from '@fsi/core-components/dist/utilities/GetInputRules';
import { hasOnlyDigits, notEmptyString, trimValue } from '@fsi/core-components/dist/utilities/FormUtils';
import {
    addNewPartyFormDialogContentProps,
    addNewPartyFormDialogFooterProps,
    addNewPartyFormDialogModalProps,
    fieldIDPrefix,
    formDialogFormProps,
} from './AddNewPartyDialog.const';

export const AddNewPartyDialog: FC<IAddNewPartyDialogProps> = props => {
    const { roles, isOpen, title, onSubmitMutationFunc, onCancel, onDismiss } = props;

    const [applicantDataCopy, setApplicantDataCopy] = useState(emptyApplicantData);

    const translate = useTranslation(namespaces.LOAN_CUSTOMER_LOOKUP);

    const roleFieldID = useId(`${fieldIDPrefix}Role`);
    const firstNameFieldID = useId(`${fieldIDPrefix}FirstName`);
    const lastNameFieldID = useId(`${fieldIDPrefix}LastName`);
    const phoneFieldID = useId(`${fieldIDPrefix}Phone`);
    const emailFieldID = useId(`${fieldIDPrefix}Email`);

    const roleFieldRules = getRules({ required: true }, translate);
    const firstNameFieldRules = getRules({ required: true, noWhiteSpace: true }, translate);
    const lastNameFieldRules = getRules({ required: true, noWhiteSpace: true }, translate);
    const phoneFieldRules = getRules({ required: true, noWhiteSpace: true, onlyDigits: true }, translate);
    const emailFieldRules = getRules({ validEmail: true }, translate);

    useEffect(() => {
        if (isOpen) {
            setApplicantDataCopy(emptyApplicantData);
        }
    }, [isOpen]);

    /* istanbul ignore next */
    const onSubmitFunc = () => onSubmitMutationFunc(applicantDataCopy);

    const onRoleChanged = (item: IDropdownOption) => setApplicantDataCopy({ ...applicantDataCopy, role: item.key.toString() });

    /* istanbul ignore next */
    const onFirstNameChanged = (newValue?: string) => setApplicantDataCopy({ ...applicantDataCopy, firstName: trimValue(newValue || '') });

    /* istanbul ignore next */
    const onLastNameChanged = (newValue?: string) => setApplicantDataCopy({ ...applicantDataCopy, lastName: trimValue(newValue || '') });

    /* istanbul ignore next */
    const onEmailChanged = (newValue?: string) => setApplicantDataCopy({ ...applicantDataCopy, email: trimValue(newValue || '') });

    /* istanbul ignore next */
    const onPhoneChanged = (newValue?: string) => setApplicantDataCopy({ ...applicantDataCopy, phone: trimValue(newValue || '') });

    const isEnabled = !!(
        applicantDataCopy.role &&
        notEmptyString(applicantDataCopy.firstName) &&
        notEmptyString(applicantDataCopy.lastName) &&
        hasOnlyDigits(applicantDataCopy.phone!)
    );

    return (
        <FormDialog
            {...props}
            loadingProps={{ text: translate('ADD_NEW_PARTY_LOADING_TEXT') }}
            errorProps={{
                title: translate('ADD_NEW_PARTY_ERROR_TITLE'),
                message: translate('ADD_REMOVE_PARTY_ERROR_TEXT'),
            }}
            title={title}
            acceptButtonText={translate('ADD_NEW_PARTY_DIALOG_ADD_BUTTON')}
            acceptButtonProps={{
                disabled: !isEnabled,
                styles: acceptButtonStyles,
            }}
            onSubmit={onSubmitFunc}
            onCancel={onCancel}
            onDismiss={onDismiss}
            modalProps={addNewPartyFormDialogModalProps}
            dialogContentProps={addNewPartyFormDialogContentProps}
            footerProps={addNewPartyFormDialogFooterProps}
            formProps={formDialogFormProps}
        >
            <Stack tokens={{ childrenGap: 24 }} data-testid="add-party-form">
                <FormDropdown
                    placeholder=""
                    options={roles}
                    required
                    selectedKey={applicantDataCopy.role}
                    onChange={onRoleChanged}
                    label={translate('ADD_NEW_PARTY_FORM_ROLE_LABEL')}
                    name="role-field"
                    rules={roleFieldRules}
                    shouldUnregister
                    id={roleFieldID}
                />
                <FormTextField
                    placeholder=""
                    defaultValue={applicantDataCopy.firstName}
                    label={translate('ADD_NEW_PARTY_FORM_FIRST_NAME_LABEL')}
                    required
                    name="first-name-field"
                    onChange={onFirstNameChanged}
                    rules={firstNameFieldRules}
                    shouldUnregister
                    id={firstNameFieldID}
                />
                <FormTextField
                    placeholder=""
                    defaultValue={applicantDataCopy.lastName}
                    label={translate('ADD_NEW_PARTY_FORM_LAST_NAME_LABEL')}
                    required
                    name="last-name-field"
                    onChange={onLastNameChanged}
                    rules={lastNameFieldRules}
                    shouldUnregister
                    id={lastNameFieldID}
                />
                <FormTextField
                    inputMode="tel"
                    placeholder=""
                    defaultValue={applicantDataCopy.phone}
                    label={translate('ADD_NEW_PARTY_FORM_PHONE_LABEL')}
                    required
                    name="telephone-number-field"
                    onChange={onPhoneChanged}
                    rules={phoneFieldRules}
                    shouldUnregister
                    id={phoneFieldID}
                />
                <FormTextField
                    inputMode="email"
                    type="email"
                    placeholder=""
                    defaultValue={applicantDataCopy.email}
                    label={translate('ADD_NEW_PARTY_FORM_EMAIL_LABEL')}
                    name="email-address-field"
                    onChange={onEmailChanged}
                    rules={emailFieldRules}
                    shouldUnregister
                    id={emailFieldID}
                />
            </Stack>
        </FormDialog>
    );
};

export default AddNewPartyDialog;

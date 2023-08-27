import React, { FC, useEffect, useState } from 'react';
import type { ILoanFinancialItemFormDialogProps } from './LoanFinancialItemFormDialog.interface';
import { FormDropdown } from '@fsi/core-components/dist/components/containers/FormDropdown';
import { FormTextField } from '@fsi/core-components/dist/components/containers/FormTextField';
import { IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { Stack } from '@fluentui/react/lib/Stack';
import { useDebounce } from '@fsi/core-components/dist/hooks/useDebounce/useDebounce';
import { namespaces, useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { FormDialog } from '@fsi/core-components/dist/components/containers/FormDialog';
import { getRules } from '@fsi/core-components/dist/utilities/GetInputRules';
import {
    loanFinancialItemFormDialogContentStyles,
    loanFinancialItemFormDialogFooterStyles,
    loanFinancialItemFormDialogStyles,
} from './LoanFinancialItemFormDialog.style';

const loanFinancialItemFormDialogModalProps = {
    styles: loanFinancialItemFormDialogStyles,
};

const loanFinancialItemFormDialogContentProps = {
    styles: loanFinancialItemFormDialogContentStyles,
};

const loanFinancialItemFormDialogFooterProps = { styles: loanFinancialItemFormDialogFooterStyles };

export const LoanFinancialItemFormDialog: FC<ILoanFinancialItemFormDialogProps> = ({ onSubmit, item, itemTypeOptions, category, ...props }) => {
    const [itemType, setItemType] = useState<number | string>(item.type);
    const [itemDescription, setItemDescription] = useState<string>(item.description);
    const [itemValue, setItemValue] = useState<number | null>(item.value);
    const t = useTranslation(namespaces.FINANCIAL_CATEGORIES_FORM_FIELDS);
    const requiredRules = getRules({ required: true }, t);
    const miniumValueRules = getRules({ min: 0 }, t);
    const whiteSpaceRules = getRules({ noWhiteSpace: true }, t);
    const descriptionMaxLengthRules = getRules({ maxLength: 100 }, t);
    const isAddEnabled = itemType && itemDescription?.trim() && itemValue !== null;

    const onChangeDescription = useDebounce((value: string) => setItemDescription(value), [setItemDescription], 500);
    const onChangeValue = useDebounce((value: string) => setItemValue(value !== '' ? +value : null), [setItemValue], 500);
    const actionType = item.id ? 'UPDATE' : 'ADD';
    const formType = `${category}_${actionType}`;
    const dialogTitle = `${formType}_TITLE`;

    useEffect(() => {
        if (!props.isOpen) return;

        setItemType(item.type);
        setItemDescription(item.description);
        setItemValue(item.value);
    }, [props.isOpen, item.type, item.value, item.description]);

    return (
        <FormDialog
            {...props}
            errorProps={{
                title: t(`${formType}_STATUSES_ERROR_TITLE`),
                message: t(`${formType}_STATUSES_ERROR_DESCRIPTION`),
            }}
            loadingProps={{
                text: t(`${formType}_STATUSES_LOADING`),
            }}
            onSubmit={() =>
                onSubmit({
                    id: item.id,
                    type: itemType,
                    description: itemDescription.trim(),
                    name: item.name || itemDescription,
                    value: itemValue || 0,
                    currencyId: item.currencyId,
                    customerId: item.customerId,
                })
            }
            acceptButtonText={t(actionType)}
            title={t(dialogTitle)}
            modalProps={loanFinancialItemFormDialogModalProps}
            dialogContentProps={loanFinancialItemFormDialogContentProps}
            footerProps={loanFinancialItemFormDialogFooterProps}
            acceptButtonProps={{ disabled: !isAddEnabled }}
        >
            <Stack tokens={{ childrenGap: 24 }}>
                <FormDropdown
                    ariaLabel={t(`${category}_FIELDS_TYPE_LABEL`)}
                    options={itemTypeOptions}
                    required
                    defaultValue={itemType}
                    onChange={(option: IDropdownOption) => setItemType(option.key as string)}
                    label={t(`${category}_FIELDS_TYPE_LABEL`)}
                    name="type"
                    rules={requiredRules}
                    shouldUnregister
                />
                <FormTextField
                    label={t(`${category}_FIELDS_DESCRIPTION_LABEL`)}
                    placeholder=""
                    onChange={onChangeDescription}
                    defaultValue={itemDescription}
                    name="description"
                    required
                    rules={{
                        ...requiredRules,
                        ...whiteSpaceRules,
                        ...descriptionMaxLengthRules,
                    }}
                    shouldUnregister
                />
                <FormTextField
                    label={t(`${category}_FIELDS_BALANCE_LABEL`)}
                    placeholder=""
                    onChange={onChangeValue}
                    defaultValue={itemValue}
                    required
                    type="number"
                    min={0}
                    name="balance"
                    rules={{
                        ...requiredRules,
                        ...miniumValueRules,
                    }}
                    id="balance"
                    shouldUnregister
                />
            </Stack>
        </FormDialog>
    );
};

export default LoanFinancialItemFormDialog;

import React, { FC } from 'react';
import { useTranslation, namespaces } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { Text } from '@fluentui/react/lib/Text';
import type { IRemoveLoanFinancialItemDialogProps } from './RemoveLoanFinancialItemDialog.interface';
import FormDialog from '@fsi/core-components/dist/components/containers/FormDialog/FormDialog';

export const REMOVE_FINANCIAL_ITEM_DIALOG = 'REMOVE_FINANCIAL_ITEM_DIALOG';

export const RemoveLoanFinancialItemDialog: FC<IRemoveLoanFinancialItemDialogProps> = ({ category, item, itemIndex, ...props }) => {
    if (!item) return null;

    const t = useTranslation(namespaces.FINANCIAL_CATEGORIES_FORM_FIELDS);
    const formType = `${category}_DELETE`;
    const dialogTitle = `${formType}_TITLE`;

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
            acceptButtonText={t('REMOVE')}
            title={t(dialogTitle)}
            onSubmit={() => props.onSubmit(item, itemIndex)}
        >
            <Text>{t(`${formType}_CONFIRM`, { name: item.name || '' })}</Text>
        </FormDialog>
    );
};

export default RemoveLoanFinancialItemDialog;

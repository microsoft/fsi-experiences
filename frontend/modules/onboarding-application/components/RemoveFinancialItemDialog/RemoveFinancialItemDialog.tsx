import { Text } from '@fluentui/react/lib/Text';
import FormDialog from '@fsi/core-components/dist/components/containers/FormDialog/FormDialog';
import React, { FC } from 'react';
import { useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import type { IRemoveFinancialItemDialogProps } from './RemoveFinancialItemDialog.interface';
import { FINANCIAL_CATEGORIES_FORM_FIELDS } from '../../constants/namespaces.const';

export const RemoveFinancialItemDialog: FC<IRemoveFinancialItemDialogProps> = ({ category, item, itemIndex, ...props }) => {
    if (!item) return null;

    const t = useTranslation(FINANCIAL_CATEGORIES_FORM_FIELDS);
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

export default RemoveFinancialItemDialog;

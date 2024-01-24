import { useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import useDialogService from '@fsi/core-components/dist/hooks/useDialogService/useDialogService';
import { useNotificationService } from '@fsi/core-components/dist/hooks/useNotificationService/useNotificationService';
import { NOTIFICATION_TYPES } from '@fsi/core-components/dist/services/NotificationService';
import useBrowserCommunication from '@fsi/core-components/hooks/useBrowserCommunication';
import React from 'react';
import { Milliseconds } from '../constants/FinancialCategories.const';
import { FINANCIAL_CATEGORIES_FORM_FIELDS } from '../constants/namespaces.const';
import { IFinancialCategory } from '../interfaces/IFinancialCategory';
import { IFinancialCategoryFetcher } from '../interfaces/IFinancialCategoryFetcher';
import useFinancialActions from './useFinancialAction';

export interface IUseFinancialActionDialogProps {
    fetcher: IFinancialCategoryFetcher;
    applicantId: string;
    commandButtonRef: React.RefObject<HTMLButtonElement>;
}
export interface IUseFinancialActionDialogResponse {
    onSubmit: (item: IFinancialCategory) => Promise<boolean | IFinancialCategory>;
    onDelete: (item: IFinancialCategory, index: number) => Promise<boolean>;
}

export const useFinancialActionDialog = ({
    fetcher,
    applicantId,
    commandButtonRef,
}: IUseFinancialActionDialogProps): IUseFinancialActionDialogResponse => {
    const { context, hideDialog } = useDialogService();
    const category = context?.category?.toLowerCase() || '';
    const { show } = useNotificationService();

    const { addItem, updateItem, deleteItem } = useFinancialActions({
        fetcher,
        category,
    });

    const financialFormTranslate = useTranslation(FINANCIAL_CATEGORIES_FORM_FIELDS);
    const { postMessage: postChangeMessage } = useBrowserCommunication(`app-change-${applicantId}`);
    /* istanbul ignore next */
    const hideDialogAndRefresh = ({ notificationMsg, triggerButton }: { notificationMsg: string; triggerButton?: HTMLButtonElement }) => {
        hideDialog();
        show({
            message: notificationMsg,
            type: NOTIFICATION_TYPES.SUCCESS,
        });
        postChangeMessage(applicantId);

        if (triggerButton) {
            // grab a screen reader's/keyboard focus
            setTimeout(() => {
                triggerButton?.focus();
            }, Milliseconds);
        }
    };

    /* istanbul ignore next */
    const onSubmit = async (item: IFinancialCategory) => {
        const res = await (item.id ? updateItem(item, context.index) : addItem(item));
        hideDialogAndRefresh({
            notificationMsg: financialFormTranslate(`${context.category}_${item.id ? 'UPDATE' : 'ADD'}_STATUSES_SUCCESS`, {
                name: item.name || item.description,
            }),
        });
        return res;
    };

    /* istanbul ignore next */
    const onDelete = async (item: IFinancialCategory, index: number) => {
        const res = await deleteItem(item.id, index);
        hideDialogAndRefresh({
            notificationMsg: financialFormTranslate(`${context.category}_DELETE_STATUSES_SUCCESS`, { name: item.name || item.description }),
            triggerButton: commandButtonRef.current!,
        });
        return res;
    };

    return {
        onSubmit,
        onDelete,
    };
};

export default useFinancialActionDialog;

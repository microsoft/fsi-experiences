import { useCallback, useMemo, useRef } from "react";
import { DataMenuOpenAttr, IconEditProps, IconRemoveProps, } from "../components/FinancialGroupedTable/FinancialItemActionsGroupBtn/FinancialItemActionsGroupBtn.const";
import { EDIT_DIALOG_NAMES, REMOVE_FINANCIAL_ITEM_DIALOG } from "../components/FinancialItemFormDialog";
import useDialogService from "@fsi/core-components/dist/hooks/useDialogService/useDialogService";
import { IContextualMenuProps, useTheme } from "@fluentui/react";
import { useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { ApplicantFinancialItemCategories as CATEGORIES } from '../constants/FinancialCategories.const';
import { ASSETS_AND_LIABILITIES, FINANCIAL_CATEGORIES_FORM_FIELDS } from "../constants/namespaces.const";


/* istanbul ignore next */
export const useFinancialItemGroupBtn = (item, index, compactMode, isEditDisabled, isDeleteDisabled) => {

    const { showDialog } = useDialogService();
    const editIconButtonRef = useRef(null);
    const menuIconButtonRef = useRef(null);
    const {
        palette: { themePrimary },
    } = useTheme();

    const t = useTranslation(
        [CATEGORIES.INCOME, CATEGORIES.EXPENSE].includes(item.category as any) ? FINANCIAL_CATEGORIES_FORM_FIELDS : ASSETS_AND_LIABILITIES
    );

    /* istanbul ignore next */
    const onCommandButtonMenuOpened = (contextualMenu?: IContextualMenuProps) => {
        (contextualMenu?.target as HTMLButtonElement)?.parentElement?.setAttribute(DataMenuOpenAttr, 'true');
    };

    /* istanbul ignore next */
    const onCommandButtonMenuDismissed = (contextualMenu?: IContextualMenuProps) => {
        (contextualMenu?.target as HTMLButtonElement)?.parentElement?.removeAttribute(DataMenuOpenAttr);
    };

    /* istanbul ignore next */
    const moreActionsMenuEditTitle = t(`EDIT_${item.category}`);
    /* istanbul ignore next */
    const moreActionsMenuRemoveTitle = t(`REMOVE_${item.category}`);
    /* istanbul ignore next */
    const editTitleARIALabel = t(`EDIT_${item.category}_ARIA_LABEL`, { itemName: item.name || '' });
    /* istanbul ignore next */
    const removeTitleARIALabel = t(`REMOVE_${item.category}_ARIA_LABEL`, { itemName: item.name || '' });
    /* istanbul ignore next */
    const moreActionsMenuARIALabel = t(`SR_MORE_ACTIONS_${item.category}_ARIA_LABEL`, { itemName: item.name || '' });


    const onEditButtonClick = useCallback(() => {
        showDialog(EDIT_DIALOG_NAMES[item.category], {
            category: item.category,
            item: {
                ...item,
                value: Math.abs(item.value),
            },
            index,
            triggerButton: (compactMode ? menuIconButtonRef : editIconButtonRef)?.current,
        });
    }, [item, index, editIconButtonRef, menuIconButtonRef, compactMode]);

    /* istanbul ignore next */
    const onRemoveButtonClick = useCallback(() => {
        showDialog(REMOVE_FINANCIAL_ITEM_DIALOG, {
            category: item.category,
            item,
            index,
        });
    }, [item, index]);

    const menuProps: IContextualMenuProps = useMemo(() => {
        return {
            onMenuOpened: onCommandButtonMenuOpened,
            onMenuDismissed: onCommandButtonMenuDismissed,
            ariaLabel: moreActionsMenuARIALabel,
            items: [
                {
                    key: 'editItem',
                    text: moreActionsMenuEditTitle,
                    ariaLabel: editTitleARIALabel,
                    iconProps: { iconName: IconEditProps.iconName, color: themePrimary },
                    onClick: onEditButtonClick,
                    disabled: isEditDisabled,
                },
                {
                    key: 'removeItem',
                    text: moreActionsMenuRemoveTitle,
                    ariaLabel: removeTitleARIALabel,
                    iconProps: { iconName: IconRemoveProps.iconName, color: themePrimary },
                    onClick: onRemoveButtonClick,
                    disabled: isDeleteDisabled,
                },
            ],
        };
    }, [
        editTitleARIALabel,
        removeTitleARIALabel,
        moreActionsMenuARIALabel,
        moreActionsMenuEditTitle,
        moreActionsMenuRemoveTitle,
        onEditButtonClick,
        onRemoveButtonClick,
        isEditDisabled,
        isDeleteDisabled,
    ]);

    return { onEditButtonClick, onRemoveButtonClick, menuIconButtonRef, editIconButtonRef, menuProps, removeTitleARIALabel, editTitleARIALabel, moreActionsMenuARIALabel }
}
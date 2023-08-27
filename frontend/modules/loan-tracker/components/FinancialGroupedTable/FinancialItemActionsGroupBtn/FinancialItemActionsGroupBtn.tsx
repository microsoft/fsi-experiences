import { CommandButton } from '@fluentui/react/lib/components/Button/CommandButton/CommandButton';
import { IconButton } from '@fluentui/react/lib/components/Button/IconButton/IconButton';
import { IContextualMenuProps } from '@fluentui/react/lib/components/ContextualMenu/ContextualMenu.types';
import { Stack } from '@fluentui/react/lib/Stack';
import { useTheme } from '@fluentui/react/lib/utilities/ThemeProvider/useTheme';
import React, { FC, useCallback, useMemo, useRef } from 'react';
import { namespaces, useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { PrivilegeType } from '@fsi/core-components/dist/enums/PrivilegeType';
import { useDialogService } from '@fsi/core-components/dist/hooks/useDialogService/useDialogService';
import { ApplicantFinancialItemCategories as CATEGORIES } from '../../../constants/ApplicantFinancialItemCategories.consts';
import { INCOME_EXPENSE_ADD_EDIT_DIALOG, ASSET_LIABILITY_ADD_EDIT_DIALOG } from '../../LoanFinancialItemFormDialog/LoanFinancialItemFormDialog.const';
import { REMOVE_FINANCIAL_ITEM_DIALOG } from '../../RemoveLoanFinancialItemDialog/RemoveLoanFinancialItemDialog';
import type { IFinancialItemActionsGroupBtnProps } from './FinancialItemActionsGroupBtn.interface';
import {
    commandButtonMenuIconStyles,
    commandButtonStyles,
    financialItemActionsGroupBtnWrapperStyles,
    financialItemActionsGroupBtn_IconButtonStyles,
} from './FinancialItemActionsGroupBtn.style';

const DataMenuOpenAttr = 'data-menu-is-open';

/* istanbul ignore next */
const onCommandButtonMenuOpened = (contextualMenu?: IContextualMenuProps) => {
    (contextualMenu?.target as HTMLButtonElement)?.parentElement?.setAttribute(DataMenuOpenAttr, 'true');
};
/* istanbul ignore next */
const onCommandButtonMenuDismissed = (contextualMenu?: IContextualMenuProps) => {
    (contextualMenu?.target as HTMLButtonElement)?.parentElement?.removeAttribute(DataMenuOpenAttr);
};

export const EDIT_DIALOG_NAMES = {
    [CATEGORIES.INCOME]: INCOME_EXPENSE_ADD_EDIT_DIALOG,
    [CATEGORIES.EXPENSE]: INCOME_EXPENSE_ADD_EDIT_DIALOG,
    [CATEGORIES.ASSET]: ASSET_LIABILITY_ADD_EDIT_DIALOG,
    [CATEGORIES.LIABILITY]: ASSET_LIABILITY_ADD_EDIT_DIALOG,
};

const iconEditProps = {
    iconName: 'edit',
};

const iconRemoveProps = {
    iconName: 'delete',
};

const commandButtonMenuIconProps = { iconName: 'MoreVertical', style: commandButtonMenuIconStyles };

export const financialItemActionsGroupBtnClassName = 'ms-financialItemActionsGroupBtn';

export const FinancialItemActionsGroupBtn: FC<IFinancialItemActionsGroupBtnProps> = ({ item, index, compactMode, hasPrivilege }) => {
    const { showDialog } = useDialogService();
    const t = useTranslation(
        [CATEGORIES.INCOME, CATEGORIES.EXPENSE].includes(item.category as any)
            ? namespaces.LOAN_CUSTOMER_LOOKUP
            : namespaces.PARTY_ASSETS_AND_LIABILITIES
    );

    const {
        palette: { themePrimary },
    } = useTheme();

    const isEditDisabled = !hasPrivilege(item.category, PrivilegeType.Write);
    const isDeleteDisabled = !hasPrivilege(item.category, PrivilegeType.Delete);

    /* istanbul ignore next */
    const editTitleARIALabel = t(`EDIT_${item.category}_ARIA_LABEL`, { itemName: item.name || '' });
    /* istanbul ignore next */
    const removeTitleARIALabel = t(`REMOVE_${item.category}_ARIA_LABEL`, { itemName: item.name || '' });
    /* istanbul ignore next */
    const moreActionsMenuARIALabel = t(`SR_MORE_ACTIONS_${item.category}_ARIA_LABEL`, { itemName: item.name || '' });
    /* istanbul ignore next */
    const moreActionsMenuEditTitle = t(`EDIT_${item.category}`);
    /* istanbul ignore next */
    const moreActionsMenuRemoveTitle = t(`REMOVE_${item.category}`);

    const editIconButtonRef = useRef(null);
    const menuIconButtonRef = useRef(null);

    /* istanbul ignore next */
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
                    iconProps: { iconName: iconEditProps.iconName, color: themePrimary },
                    onClick: onEditButtonClick,
                    disabled: isEditDisabled,
                },
                {
                    key: 'removeItem',
                    text: moreActionsMenuRemoveTitle,
                    ariaLabel: removeTitleARIALabel,
                    iconProps: { iconName: iconRemoveProps.iconName, color: themePrimary },
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

    return (
        <Stack horizontal className={financialItemActionsGroupBtnClassName} styles={financialItemActionsGroupBtnWrapperStyles}>
            {compactMode ? (
                <CommandButton
                    menuIconProps={commandButtonMenuIconProps}
                    menuProps={menuProps}
                    ariaDescription={moreActionsMenuARIALabel}
                    styles={commandButtonStyles}
                    elementRef={menuIconButtonRef}
                    data-testid={`more-actions-financial-button-${item.id}`}
                />
            ) : (
                <>
                    <IconButton
                        iconProps={iconEditProps}
                        title={editTitleARIALabel}
                        ariaLabel={editTitleARIALabel}
                        onClick={onEditButtonClick}
                        data-testid={`edit-financial-item-${item.id}`}
                        styles={financialItemActionsGroupBtn_IconButtonStyles}
                        elementRef={editIconButtonRef}
                        disabled={isEditDisabled}
                    />
                    <IconButton
                        iconProps={iconRemoveProps}
                        title={removeTitleARIALabel}
                        ariaLabel={removeTitleARIALabel}
                        onClick={onRemoveButtonClick}
                        data-testid={`remove-financial-item-${item.id}`}
                        styles={financialItemActionsGroupBtn_IconButtonStyles}
                        disabled={isDeleteDisabled}
                    />
                </>
            )}
        </Stack>
    );
};

export default FinancialItemActionsGroupBtn;

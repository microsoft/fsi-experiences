import { Stack } from '@fluentui/react/lib/Stack';
import { CommandButton } from '@fluentui/react/lib/components/Button/CommandButton/CommandButton';
import { IconButton } from '@fluentui/react/lib/components/Button/IconButton/IconButton';
import { PrivilegeType } from '@fsi/core-components/dist/enums/PrivilegeType';
import React, { FC } from 'react';
import { useFinancialItemGroupBtn } from '../../../hooks/useEditButtonClick';
import { FinancialItemActionsGroupBtnClassName, IconEditProps, IconRemoveProps } from './FinancialItemActionsGroupBtn.const';
import type { IFinancialItemActionsGroupBtnProps } from './FinancialItemActionsGroupBtn.interface';
import {
    commandButtonMenuIconStyles,
    commandButtonStyles,
    financialItemActionsGroupBtnWrapperStyles,
    financialItemActionsGroupBtn_IconButtonStyles,
} from './FinancialItemActionsGroupBtn.style';

const commandButtonMenuIconProps = { iconName: 'MoreVertical', style: commandButtonMenuIconStyles };

export const FinancialItemActionsGroupBtn: FC<IFinancialItemActionsGroupBtnProps> = ({ item, index, compactMode, hasPrivilege }) => {
    const isEditDisabled = !hasPrivilege(item.category, PrivilegeType.Write);
    const isDeleteDisabled = !hasPrivilege(item.category, PrivilegeType.Delete);
    const { onEditButtonClick, onRemoveButtonClick, menuIconButtonRef, editIconButtonRef, menuProps, removeTitleARIALabel, editTitleARIALabel, moreActionsMenuARIALabel } = useFinancialItemGroupBtn(item, index, compactMode, isEditDisabled, isDeleteDisabled);

    return (
        <Stack horizontal className={FinancialItemActionsGroupBtnClassName} styles={financialItemActionsGroupBtnWrapperStyles}>
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
                        iconProps={IconEditProps}
                        title={editTitleARIALabel}
                        ariaLabel={editTitleARIALabel}
                        onClick={onEditButtonClick}
                        data-testid={`edit-financial-item-${item.id}`}
                        styles={financialItemActionsGroupBtn_IconButtonStyles}
                        elementRef={editIconButtonRef}
                        disabled={isEditDisabled}
                    />
                    <IconButton
                        iconProps={IconRemoveProps}
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

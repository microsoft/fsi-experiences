import { ApplicantFinancialItemCategories as CATEGORIES } from '../../constants/FinancialCategories.const';

export const INCOME_EXPENSE_ADD_EDIT_DIALOG = 'incomeExpenseAddEditDialog' as const;

export const ASSET_LIABILITY_ADD_EDIT_DIALOG = 'loan-financial-add-edit-asset-liability' as const;

export const REMOVE_FINANCIAL_ITEM_DIALOG = 'REMOVE_FINANCIAL_ITEM_DIALOG';

export const EDIT_DIALOG_NAMES = {
    [CATEGORIES.INCOME]: INCOME_EXPENSE_ADD_EDIT_DIALOG,
    [CATEGORIES.EXPENSE]: INCOME_EXPENSE_ADD_EDIT_DIALOG,
    [CATEGORIES.ASSET]: ASSET_LIABILITY_ADD_EDIT_DIALOG,
    [CATEGORIES.LIABILITY]: ASSET_LIABILITY_ADD_EDIT_DIALOG,
};

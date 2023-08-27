export const ApplicantFinancialItemCategories = {
    ASSET: 'ASSET',
    LIABILITY: 'LIABILITY',
    INCOME: 'INCOME',
    EXPENSE: 'EXPENSE',
} as const;

export type ApplicantFinancialCategoryOption = typeof ApplicantFinancialItemCategories[keyof typeof ApplicantFinancialItemCategories];

export const assetsAndLiabilitiesQuery = 'assetsAndLiabilitiesQuery';
export const incomeAndExpensesQuery = 'incomeAndExpensesQuery';

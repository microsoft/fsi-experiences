export const FINANCIAL_CATEGORY_TYPES = {
    asset: 'asset',
    liability: 'liability',
    income: 'income',
    expense: 'expense',
} as const;

export type ILoanFinancialType = typeof FINANCIAL_CATEGORY_TYPES[keyof typeof FINANCIAL_CATEGORY_TYPES];

export interface IFinancialCategory {
    customerId: string;
    description: string;
    name: string;
    value: number;
    type: number | string;
    typeFormattedValue?: string;
    currencyId?: string;
    id: string;
}
export const FINANCIAL_CATEGORY_TYPES = {
    ASSET: 'asset',
    LIABILITY: 'liability',
    INCOME: 'income',
    EXPENSE: 'expense',
} as const;

export type IFinancialType = typeof FINANCIAL_CATEGORY_TYPES[keyof typeof FINANCIAL_CATEGORY_TYPES];

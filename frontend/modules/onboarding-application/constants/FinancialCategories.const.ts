import { ASSETS_AND_LIABILITIES_QUERY, INCOME_AND_EXPENSES_QUERY } from './FinancialCategoriesQueries.const';

export const ApplicantFinancialItemCategories = {
    ASSET: 'ASSET',
    LIABILITY: 'LIABILITY',
    INCOME: 'INCOME',
    EXPENSE: 'EXPENSE',
} as const;
export type ApplicantFinancialCategoryOption = typeof ApplicantFinancialItemCategories[keyof typeof ApplicantFinancialItemCategories];

export const FinancialCategories = {
    incomeAndExpenses: {
        types: ['income', 'expenses'],
        label: 'APPLICANT_INCOME_AND_EXPENSES_HEADER_TITLE',
        query: INCOME_AND_EXPENSES_QUERY,
        name: ['MONTHLY_INCOME', 'MONTHLY_EXPENSES'],
    },
    assetsAndLiabilities: {
        types: ['assets', 'liabilities'],
        label: 'ASSETS_AND_LIABILITIES_SECTION_NAME',
        query: ASSETS_AND_LIABILITIES_QUERY,
        name: ['ASSETS', 'LIABILITIES'],
    },
};

export const FirstGroup = 0;
export const SecondGroup = 1;
export const Milliseconds = 700;

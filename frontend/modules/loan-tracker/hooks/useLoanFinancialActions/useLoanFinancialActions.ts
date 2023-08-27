import { useCallback } from 'react';
import { QueryClient, useQueryClient } from 'react-query';
import { ILoanAssetsAndLiabilitiesFetcher } from '../../interfaces/ILoanFinancialCategory/ILoanAssetsAndLiabilitiesFetcher';
import { ILoanIncomeAndExpensesFetcher } from '../../interfaces/ILoanFinancialCategory/ILoanIncomeAndExpensesFetcher';
import { ILoanFinancialCategory } from '../../interfaces/ILoanFinancialCategory/ILoanFinancialCategory';
import { ILoanApplicationIncomeAndExpenses } from '../../interfaces/ILoanFinancialCategory/ILoanIncomeAndExpenses';
import { ILoanApplicationAssetsAndLiabilities } from '../../interfaces/ILoanFinancialCategory/ILoanAssetsAndLiabilities';
import { assetsAndLiabilitiesQuery, incomeAndExpensesQuery } from '../../constants/ApplicantFinancialItemCategories.consts';
import { FINANCIAL_CATEGORY_TYPES, ILoanFinancialType } from '../../constants/FinancialCategoryTypes.consts';

export interface IUseLoanFinancialActionsProps {
    fetcher: ILoanAssetsAndLiabilitiesFetcher | ILoanIncomeAndExpensesFetcher;
    category: ILoanFinancialType;
}

export interface IUseLoanFinancialActionsResponse {
    addItem: (item: ILoanFinancialCategory) => Promise<ILoanFinancialCategory>;
    updateItem: (item: ILoanFinancialCategory, index: number) => Promise<boolean>;
    deleteItem: (id: string, index: number) => Promise<boolean>;
}

export const updateItemInArray = (array: Array<any>, index: number, newItem?: any) => {
    if (index < 0 || index > array.length) return array;

    if (!newItem) return array.filter((_, i) => i !== index);

    const item = typeof array[index] === 'object' ? { ...array[index], ...newItem } : newItem;

    return [...array.slice(0, index), item, ...array.slice(index + 1)];
};

export const getQueryName = (category: ILoanFinancialType) => {
    switch (category) {
        case FINANCIAL_CATEGORY_TYPES.asset:
        case FINANCIAL_CATEGORY_TYPES.liability:
            return assetsAndLiabilitiesQuery;
        case FINANCIAL_CATEGORY_TYPES.income:
        case FINANCIAL_CATEGORY_TYPES.expense:
            return incomeAndExpensesQuery;
        default:
            return '';
    }
};

export const updateQueryData = (
    category: ILoanFinancialType,
    updatedItem: ILoanFinancialCategory,
    itemIndex: number,
    previousData?: ILoanApplicationAssetsAndLiabilities | ILoanApplicationIncomeAndExpenses
) => {
    if (!previousData) return previousData;

    const newData = { ...previousData };

    switch (category) {
        case FINANCIAL_CATEGORY_TYPES.income: {
            const incomes = (newData as ILoanApplicationIncomeAndExpenses).income || [];
            (newData as ILoanApplicationIncomeAndExpenses).income = updateItemInArray(incomes, itemIndex, updatedItem);
            break;
        }
        case FINANCIAL_CATEGORY_TYPES.expense: {
            const expenses = (newData as ILoanApplicationIncomeAndExpenses).expenses || [];
            (newData as ILoanApplicationIncomeAndExpenses).expenses = updateItemInArray(expenses, itemIndex, updatedItem);
            break;
        }
        case FINANCIAL_CATEGORY_TYPES.asset: {
            const assets = (newData as ILoanApplicationAssetsAndLiabilities).assets || [];
            (newData as ILoanApplicationAssetsAndLiabilities).assets = updateItemInArray(assets, itemIndex, updatedItem);
            break;
        }
        case FINANCIAL_CATEGORY_TYPES.liability: {
            const liabilities = (newData as ILoanApplicationAssetsAndLiabilities).liabilities || [];
            (newData as ILoanApplicationAssetsAndLiabilities).liabilities = updateItemInArray(liabilities, itemIndex, updatedItem);
            break;
        }
        default:
            break;
    }

    return newData;
};

const triggerUpdateQuery = (
    queryClient: QueryClient,
    { item, index, category }: { item: ILoanFinancialCategory; index: number; category: ILoanFinancialType }
) => {
    const queryName = getQueryName(category);
    queryClient.invalidateQueries(queryName);
};

export const useLoanFinancialActions = ({ fetcher, category }: IUseLoanFinancialActionsProps): IUseLoanFinancialActionsResponse => {
    const queryClient = useQueryClient();

    const addItem = useCallback(
        async (item: ILoanFinancialCategory) => {
            const result = await (fetcher as any).addItem(item, category);

            triggerUpdateQuery(queryClient, { item: result, index: 0, category });

            return result;
        },
        [category, fetcher, queryClient]
    );

    const updateItem = useCallback(
        async (item: ILoanFinancialCategory, index: number) => {
            const result = await (fetcher as any).updateItem(item, category);

            triggerUpdateQuery(queryClient, { item, index, category });

            return result;
        },
        [category, fetcher, queryClient]
    );

    const deleteItem = useCallback(
        async (id: string, index: number) => {
            const result = await (fetcher as any).deleteItem(id, category);

            triggerUpdateQuery(queryClient, { item: result, index, category });

            return result;
        },
        [category, fetcher, queryClient]
    );

    return {
        addItem,
        updateItem,
        deleteItem,
    };
};

export default useLoanFinancialActions;

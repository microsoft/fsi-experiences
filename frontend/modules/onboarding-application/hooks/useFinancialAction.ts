import { useCallback } from 'react';
import { QueryClient, useQueryClient } from 'react-query';
import { ASSETS_AND_LIABILITIES_QUERY, INCOME_AND_EXPENSES_QUERY } from '../constants/FinancialCategoriesQueries.const';
import { IFinancialCategory, IFinancialType } from '../interfaces/IFinancialCategory';
import { IFinancialCategoryFetcher } from '../interfaces/IFinancialCategoryFetcher';

export interface IUseFinancialActionsProps {
    fetcher: IFinancialCategoryFetcher;
    category: IFinancialType;
}

const QueryName = {
    asset: ASSETS_AND_LIABILITIES_QUERY,
    liability: ASSETS_AND_LIABILITIES_QUERY,
    income: INCOME_AND_EXPENSES_QUERY,
    expense: INCOME_AND_EXPENSES_QUERY,
};
export interface IUseFinancialActionsResponse {
    addItem: (item: IFinancialCategory) => Promise<IFinancialCategory>;
    updateItem: (item: IFinancialCategory, index: number) => Promise<boolean>;
    deleteItem: (id: string, index: number) => Promise<boolean>;
}

export const updateItemInArray = (array: Array<any>, index: number, newItem?: any) => {
    if (index < 0 || index > array.length) return array;

    if (!newItem) return array.filter((_, i) => i !== index);

    const item = typeof array[index] === 'object' ? { ...array[index], ...newItem } : newItem;

    return [...array.slice(0, index), item, ...array.slice(index + 1)];
};

export const getQueryName = (category: IFinancialType) => {
    return QueryName[category] || '';
};

const triggerUpdateQuery = (
    queryClient: QueryClient,
    { item, index, category }: { item: IFinancialCategory; index: number; category: IFinancialType }
) => {
    const queryName = getQueryName(category);
    queryClient.invalidateQueries(queryName);
};

export const useFinancialActions = ({ fetcher, category }: IUseFinancialActionsProps): IUseFinancialActionsResponse => {
    const queryClient = useQueryClient();

    const addItem = useCallback(
        async (item: IFinancialCategory) => {
            const result = await fetcher.addItem(item);

            triggerUpdateQuery(queryClient, { item: result, index: 0, category });

            return result;
        },
        [category, fetcher, queryClient]
    );

    const updateItem = useCallback(
        async (item: IFinancialCategory, index: number) => {
            const result = await fetcher.updateItem(item);

            triggerUpdateQuery(queryClient, { item, index, category });

            return result;
        },
        [category, fetcher, queryClient]
    );

    const deleteItem = useCallback(
        async (id: string, index: number) => {
            const result = await (fetcher as any).deleteItem(id);

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

export default useFinancialActions;

import { QueryClientWrapper, testingQueryClient } from '@fsi/core-components/dist/utilities/tests/ProviderWrapper';
import { act, waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { ASSETS_AND_LIABILITIES_QUERY, INCOME_AND_EXPENSES_QUERY } from '../constants/FinancialCategoriesQueries.const';
import { IFinancialCategoryFetcher } from '../interfaces/IFinancialCategoryFetcher';
import { MockFinancialCategoryFetcher } from '../interfaces/mocks/FinancialCategoryFetcher.mock';
import { mockFinancialCategoriesApplicants } from '../interfaces/mocks/IApplicant.mock';
import useFinancialActions, { getQueryName, updateItemInArray } from './useFinancialAction';
import { useMutation } from 'react-query';

describe('useFinancialActions tests', () => {
    const FinancialFetcher: IFinancialCategoryFetcher = new MockFinancialCategoryFetcher('asset');

    beforeEach(() => {
        testingQueryClient.clear();
    });

    it('should call fetcher func with asset category', async () => {
        const { result } = renderHook(() => useFinancialActions({ fetcher: FinancialFetcher, category: 'asset' }), {
            wrapper: QueryClientWrapper,
        });

        const addItemSpy = jest.spyOn(FinancialFetcher, 'addItem');
        const mockItem = { name: 'test', value: 100, customerId: mockFinancialCategoriesApplicants[0].id, description: '', type: '', id: '' };

        await waitFor(() => result.current.addItem(mockItem));

        expect(addItemSpy).toHaveBeenCalledWith(mockItem);
    });

    it('should call fetcher func with liability category', async () => {
        const { result } = renderHook(() => useFinancialActions({ fetcher: FinancialFetcher, category: 'liability' }), {
            wrapper: QueryClientWrapper,
        });

        const addItemSpy = jest.spyOn(FinancialFetcher, 'addItem');
        const mockItem = { name: 'test', value: 100, customerId: mockFinancialCategoriesApplicants[0].id, description: '', type: '', id: '' };

        await waitFor(() => result.current.addItem(mockItem));

        expect(addItemSpy).toHaveBeenCalledWith(mockItem);
    });

    it('should call fetcher func with income category', async () => {
        const { result } = renderHook(() => useFinancialActions({ fetcher: FinancialFetcher, category: 'income' }), {
            wrapper: QueryClientWrapper,
        });

        const addItemSpy = jest.spyOn(FinancialFetcher, 'addItem');
        const mockItem = { name: 'test', value: 100, customerId: mockFinancialCategoriesApplicants[0].id, description: '', type: '', id: '' };

        await waitFor(() => result.current.addItem(mockItem));

        expect(addItemSpy).toHaveBeenCalledWith(mockItem);
    });

    it('should call fetcher func with expense category', async () => {
        const { result } = renderHook(() => useFinancialActions({ fetcher: FinancialFetcher, category: 'expense' }), {
            wrapper: QueryClientWrapper,
        });

        const addItemSpy = jest.spyOn(FinancialFetcher, 'addItem');
        const mockItem = { name: 'test', value: 100, customerId: mockFinancialCategoriesApplicants[0].id, description: '', type: '', id: '' };

        await waitFor(() => result.current.addItem(mockItem));

        expect(addItemSpy).toHaveBeenCalledWith(mockItem);
    });

    it('should add an asset', async () => {
        const mockItem = { name: 'test', value: 100, customerId: mockFinancialCategoriesApplicants[0].id, description: '', type: '', id: '' };

        const { result } = renderHook(
            () => {
                const actionHook = useFinancialActions({ fetcher: FinancialFetcher, category: 'asset' });
                const mutationHook = useMutation(() => actionHook.addItem(mockItem));

                return {
                    ...actionHook,
                    mutationHook,
                };
            },
            {
                wrapper: QueryClientWrapper,
            }
        );

        act(() => {
            result.current.mutationHook.mutate();
        });

        const addItemSpy = jest.spyOn(FinancialFetcher, 'addItem');

        expect(addItemSpy).toHaveBeenCalledWith(mockItem);
    });

    it('should update asset', async () => {
        const mockItem = { name: 'test', value: 100, customerId: mockFinancialCategoriesApplicants[0].id, description: '', type: '', id: '1' };
        const { result } = renderHook(() => useFinancialActions({ fetcher: FinancialFetcher, category: 'asset' }), {
            wrapper: QueryClientWrapper,
        });

        const updateItemSpy = jest.spyOn(FinancialFetcher, 'updateItem');

        act(() => {
            result.current.updateItem(mockItem, 0);
        });

        expect(updateItemSpy).toHaveBeenCalledWith(mockItem);
    });

    it('should delete asset', async () => {
        const mockItem = { name: 'test', value: 100, customerId: mockFinancialCategoriesApplicants[0].id, description: '', type: '', id: '1' };
        const { result } = renderHook(() => useFinancialActions({ fetcher: FinancialFetcher, category: 'asset' }), {
            wrapper: QueryClientWrapper,
        });

        const deleteItemSpy = jest.spyOn(FinancialFetcher, 'deleteItem');

        act(() => {
            result.current.deleteItem(mockItem.id, 0);
        });

        expect(deleteItemSpy).toHaveBeenCalledWith(mockItem.id);
    });
});

describe('getQueryName', () => {
    it('should return correct asset query name', () => {
        const queryName = getQueryName('asset');
        expect(queryName).toEqual(ASSETS_AND_LIABILITIES_QUERY);
    });

    it('should return correct liability query name', () => {
        const queryName = getQueryName('liability');
        expect(queryName).toEqual(ASSETS_AND_LIABILITIES_QUERY);
    });

    it('should return correct income query name', () => {
        const queryName = getQueryName('income');
        expect(queryName).toEqual(INCOME_AND_EXPENSES_QUERY);
    });

    it('should return correct expense query name', () => {
        const queryName = getQueryName('expense');
        expect(queryName).toEqual(INCOME_AND_EXPENSES_QUERY);
    });

    it('should return empty string', () => {
        expect(getQueryName('abc' as any)).toEqual('');
    });
});

describe('updateItemInArray', () => {
    it('should return array when index is -1', () => {
        expect(updateItemInArray([1, 2, 3], -1, 4)).toEqual([1, 2, 3]);
    });

    it('should return array when index is not found', () => {
        expect(updateItemInArray([1, 2, 3], 4, 4)).toEqual([1, 2, 3]);
    });

    it('should return new array of object when index is found', () => {
        expect(updateItemInArray([{ id: 1 }, { id: 2 }, { id: 3 }], 1, { id: 4 })).toEqual([{ id: 1 }, { id: 4 }, { id: 3 }]);
    });

    it('should return new array of number when index is found', () => {
        expect(updateItemInArray([1, 2, 3], 1, 4)).toEqual([1, 4, 3]);
    });

    it('should remove item at selected index', () => {
        expect(updateItemInArray([1, 2, 3], 1)).toEqual([1, 3]);
    });
});

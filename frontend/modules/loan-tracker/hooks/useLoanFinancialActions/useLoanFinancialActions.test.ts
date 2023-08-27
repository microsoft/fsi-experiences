import { act, waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { useMutation } from 'react-query';
import { ILoanAssetsAndLiabilitiesFetcher } from '../../interfaces/ILoanFinancialCategory/ILoanAssetsAndLiabilitiesFetcher';
import { assetsAndLiabilitiesMock } from '../../interfaces/ILoanFinancialCategory/mocks/ILoanAssetsAndLiabilities.mocks';
import { mockLoanCustomers } from '../../interfaces/ILoanApplicationCustomer/mocks/ILoanApplicationCustomer.mocks';
import { MockLoanAssetsAndLiabilitiesFetcher } from '../../interfaces/ILoanFinancialCategory/mocks/ILoanAssetsAndLiabilitiesFetcher.mocks';
import { QueryClientWrapper, testingQueryClient } from '@fsi/core-components/dist/utilities/tests/ProviderWrapper';
import { assetsAndLiabilitiesQuery, incomeAndExpensesQuery } from '../../constants/ApplicantFinancialItemCategories.consts';
import useLoanFinancialActions, { getQueryName, updateItemInArray, updateQueryData } from './useLoanFinancialActions';

describe('useLoanFinancialActions tests', () => {
    const loanFinancialFetcher: ILoanAssetsAndLiabilitiesFetcher = new MockLoanAssetsAndLiabilitiesFetcher();

    beforeEach(() => {
        testingQueryClient.clear();
    });

    it('should call fetcher func with asset category', async () => {
        const { result } = renderHook(() => useLoanFinancialActions({ fetcher: loanFinancialFetcher, category: 'asset' }), {
            wrapper: QueryClientWrapper,
        });

        const addItemSpy = jest.spyOn(loanFinancialFetcher, 'addItem');
        const mockItem = { name: 'test', value: 100, customerId: mockLoanCustomers[0].id, description: '', type: '', id: '' };

        await waitFor(() => result.current.addItem(mockItem));

        expect(addItemSpy).toHaveBeenCalledWith(mockItem, 'asset');
    });

    it('should call fetcher func with liability category', async () => {
        const { result } = renderHook(() => useLoanFinancialActions({ fetcher: loanFinancialFetcher, category: 'liability' }), {
            wrapper: QueryClientWrapper,
        });

        const addItemSpy = jest.spyOn(loanFinancialFetcher, 'addItem');
        const mockItem = { name: 'test', value: 100, customerId: mockLoanCustomers[0].id, description: '', type: '', id: '' };

        await waitFor(() => result.current.addItem(mockItem));

        expect(addItemSpy).toHaveBeenCalledWith(mockItem, 'liability');
    });

    it('should call fetcher func with income category', async () => {
        const { result } = renderHook(() => useLoanFinancialActions({ fetcher: loanFinancialFetcher, category: 'income' }), {
            wrapper: QueryClientWrapper,
        });

        const addItemSpy = jest.spyOn(loanFinancialFetcher, 'addItem');
        const mockItem = { name: 'test', value: 100, customerId: mockLoanCustomers[0].id, description: '', type: '', id: '' };

        await waitFor(() => result.current.addItem(mockItem));

        expect(addItemSpy).toHaveBeenCalledWith(mockItem, 'income');
    });

    it('should call fetcher func with expense category', async () => {
        const { result } = renderHook(() => useLoanFinancialActions({ fetcher: loanFinancialFetcher, category: 'expense' }), {
            wrapper: QueryClientWrapper,
        });

        const addItemSpy = jest.spyOn(loanFinancialFetcher, 'addItem');
        const mockItem = { name: 'test', value: 100, customerId: mockLoanCustomers[0].id, description: '', type: '', id: '' };

        await waitFor(() => result.current.addItem(mockItem));

        expect(addItemSpy).toHaveBeenCalledWith(mockItem, 'expense');
    });

    it('should add an asset', async () => {
        const mockItem = { name: 'test', value: 100, customerId: mockLoanCustomers[0].id, description: '', type: '', id: '' };

        const { result } = renderHook(
            () => {
                const actionHook = useLoanFinancialActions({ fetcher: loanFinancialFetcher, category: 'asset' });
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

        const addItemSpy = jest.spyOn(loanFinancialFetcher, 'addItem');

        expect(addItemSpy).toHaveBeenCalledWith(mockItem, 'asset');
    });

    it('should update asset', async () => {
        const mockItem = { name: 'test', value: 100, customerId: mockLoanCustomers[0].id, description: '', type: '', id: '1' };
        const { result } = renderHook(() => useLoanFinancialActions({ fetcher: loanFinancialFetcher, category: 'asset' }), {
            wrapper: QueryClientWrapper,
        });

        const updateItemSpy = jest.spyOn(loanFinancialFetcher, 'updateItem');

        act(() => {
            result.current.updateItem(mockItem, 0);
        });

        expect(updateItemSpy).toHaveBeenCalledWith(mockItem, 'asset');
    });

    it('should delete asset', async () => {
        const mockItem = { name: 'test', value: 100, customerId: mockLoanCustomers[0].id, description: '', type: '', id: '1' };
        const { result } = renderHook(() => useLoanFinancialActions({ fetcher: loanFinancialFetcher, category: 'asset' }), {
            wrapper: QueryClientWrapper,
        });

        const deleteItemSpy = jest.spyOn(loanFinancialFetcher, 'deleteItem');

        act(() => {
            result.current.deleteItem(mockItem.id, 0);
        });

        expect(deleteItemSpy).toHaveBeenCalledWith(mockItem.id, 'asset');
    });
});

describe('getQueryName', () => {
    it('should return correct asset query name', () => {
        const queryName = getQueryName('asset');
        expect(queryName).toEqual(assetsAndLiabilitiesQuery);
    });

    it('should return correct liability query name', () => {
        const queryName = getQueryName('liability');
        expect(queryName).toEqual(assetsAndLiabilitiesQuery);
    });

    it('should return correct income query name', () => {
        const queryName = getQueryName('income');
        expect(queryName).toEqual(incomeAndExpensesQuery);
    });

    it('should return correct expense query name', () => {
        const queryName = getQueryName('expense');
        expect(queryName).toEqual(incomeAndExpensesQuery);
    });

    it('should return empty string', () => {
        expect(getQueryName('abc' as any)).toEqual('');
    });
});

describe('updateQueryData', () => {
    const mockItem = { name: 'test', value: 100, customerId: mockLoanCustomers[0].id, description: '', type: '', id: '', currencyId: '1' };
    it('should return undefined', () => {
        expect(updateQueryData('asset', mockItem, 0)).toBeUndefined();
    });

    it('should return correct liability data', () => {
        const data = updateQueryData('liability', mockItem, 0, {
            assets: [],
            liabilities: [],
            currencyId: '0',
        });
        expect(data).toEqual({
            liabilities: [mockItem],
            assets: [],
            currencyId: '0',
        });
    });

    it('should return correct income data when no income presented', () => {
        const data = updateQueryData('income', mockItem, 0, {
            income: undefined as any,
            expenses: [],
        });
        expect(data).toEqual({
            income: [mockItem],
            expenses: [],
        });
    });

    it('should return correct expense data when no expense presented', () => {
        const data = updateQueryData('expense', mockItem, 0, {
            income: [],
            expenses: undefined as any,
        });
        expect(data).toEqual({
            income: [],
            expenses: [mockItem],
        });
    });

    it('should return correct income data', () => {
        const data = updateQueryData('income', mockItem, 0, {
            income: [],
            expenses: [],
        });
        expect(data).toEqual({
            income: [mockItem],
            expenses: [],
        });
    });

    it('should return correct expense data', () => {
        const data = updateQueryData('expense', mockItem, 0, {
            income: [],
            expenses: [],
        });
        expect(data).toEqual({
            income: [],
            expenses: [mockItem],
        });
    });

    it('should return correct asset data', () => {
        const data = updateQueryData('asset', mockItem, 0, {
            assets: [],
            liabilities: [],
            currencyId: '0',
        });
        expect(data).toEqual({
            liabilities: [],
            assets: [mockItem],
            currencyId: '0',
        });
    });

    it('should return correct asset data when no assets', () => {
        const data = updateQueryData('asset', mockItem, 0, {
            assets: undefined as any,
            liabilities: [],
            currencyId: '0',
        });
        expect(data).toEqual({
            liabilities: [],
            assets: [mockItem],
            currencyId: '0',
        });
    });

    it('should return correct asset data when no liabilities', () => {
        const data = updateQueryData('liability', mockItem, 0, {
            liabilities: undefined as any,
            assets: [],
            currencyId: '0',
        });
        expect(data).toEqual({
            assets: [],
            currencyId: '0',
            liabilities: [mockItem],
        });
    });

    it('should return correct asset data when updating in the middle', () => {
        const data = updateQueryData('asset', mockItem, 1, {
            assets: assetsAndLiabilitiesMock.assets,
            liabilities: [],
            currencyId: '0',
        });
        expect(data).toEqual({
            currencyId: '0',
            liabilities: [],
            assets: [...assetsAndLiabilitiesMock.assets.slice(0, 1), mockItem, ...assetsAndLiabilitiesMock.assets.slice(2)],
        });
    });

    it('should return the input data when no category matches', () => {
        const data = updateQueryData('abc' as any, mockItem, 0, {
            assets: undefined as any,
            liabilities: [],
            currencyId: '0',
        });
        expect(data).toEqual({
            liabilities: [],
            currencyId: '0',
            assets: undefined as any,
        });
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

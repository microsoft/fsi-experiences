import { waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { assetsAndLiabilitiesMock } from '../../interfaces/ILoanFinancialCategory/mocks/ILoanAssetsAndLiabilities.mocks';
import { mockLoanCustomers } from '../../interfaces/ILoanApplicationCustomer/mocks/ILoanApplicationCustomer.mocks';
import { QueryClientWrapper, testingQueryClient } from '@fsi/core-components/dist/utilities/tests/ProviderWrapper';
import useAssetsAndLiabilities from './useAssetsAndLiabilities';

describe('useAssetsAndLiabilities tests', () => {
    const assetsAndLiabilitiesFetcherFunc = jest.fn().mockResolvedValue(assetsAndLiabilitiesMock);

    beforeEach(() => {
        testingQueryClient.clear();
    });

    it('Should call fetcher func', async () => {
        const { result } = renderHook(() => useAssetsAndLiabilities({ assetsAndLiabilitiesFetcherFunc, applicantId: mockLoanCustomers[0].id }), {
            wrapper: QueryClientWrapper,
        });

        await waitFor(() => !result.current.isLoading);

        expect(assetsAndLiabilitiesFetcherFunc).toBeCalled();
    });

    it('Should calculate assets and liabilities', async () => {
        const { result } = renderHook(() => useAssetsAndLiabilities({ assetsAndLiabilitiesFetcherFunc, applicantId: mockLoanCustomers[0].id }), {
            wrapper: QueryClientWrapper,
        });

        await waitFor(() => !result.current.isLoading);
        expect(result.current.loanAssetsAndLiabilities.totalAssets).toEqual(
            assetsAndLiabilitiesMock.assets.map(asset => asset.value).reduce((prevValue, currValue) => prevValue + currValue, 0)
        );
        expect(result.current.loanAssetsAndLiabilities.totalLiabilities).toEqual(
            assetsAndLiabilitiesMock.liabilities.map(liability => liability.value).reduce((prevValue, currValue) => prevValue + currValue, 0)
        );
        expect(result.current.loanAssetsAndLiabilities.applicantTotalAssets).toEqual(
            assetsAndLiabilitiesMock.assets
                .filter(asset => asset.customerId === mockLoanCustomers[0].id)
                .map(asset => asset.value)
                .reduce((prevValue, currValue) => prevValue + currValue, 0)
        );
        expect(result.current.loanAssetsAndLiabilities.applicantTotalLiabilities).toEqual(
            assetsAndLiabilitiesMock.liabilities
                .filter(asset => asset.customerId === mockLoanCustomers[0].id)
                .map(liability => liability.value)
                .reduce((prevValue, currValue) => prevValue + currValue, 0)
        );
    });

    it('Should return an error if fetching data failed', async () => {
        const assetsAndLiabilitiesFetcherErrorFunc = jest.fn().mockRejectedValue('error');

        const { result } = renderHook(
            () =>
                useAssetsAndLiabilities({
                    assetsAndLiabilitiesFetcherFunc: assetsAndLiabilitiesFetcherErrorFunc,
                    applicantId: mockLoanCustomers[0].id,
                }),
            { wrapper: QueryClientWrapper }
        );

        await waitFor(() => result.current.isError);

        expect(result.current.loanAssetsAndLiabilities.totalAssets).toEqual(0);
        expect(result.current.loanAssetsAndLiabilities.totalLiabilities).toEqual(0);
        expect(result.current.loanAssetsAndLiabilities.applicantTotalAssets).toEqual(0);
        expect(result.current.loanAssetsAndLiabilities.applicantTotalLiabilities).toEqual(0);
        expect(result.current.loanAssetsAndLiabilities.currencyId).toEqual('');
    });
});

import { renderHook, act } from '@testing-library/react-hooks';
import { assetsAndLiabilitiesMock } from '../../interfaces/ILoanFinancialCategory/mocks/ILoanAssetsAndLiabilities.mocks';
import { mockLoanCustomers } from '../../interfaces/ILoanApplicationCustomer/mocks/ILoanApplicationCustomer.mocks';
import { MockLoanApplicationAssetsAndLiabilitiesFetcher } from '../../interfaces/ILoanFinancialCategory/mocks/ILoanApplicationAssetsAndLiabilitiesFetcher.mocks';
import { QueryClientWrapper } from '@fsi/core-components/dist/utilities/tests/ProviderWrapper';
import useLoanCustomerAssetsAndLiabilities from './useLoanCustomerAssetsAndLiabilities';

describe('useLoanCustomerAssetsAndLiabilities tests', () => {
    it('Should calculate applicant`s assets and liabilities', async () => {
        const { result, waitFor } = renderHook(
            () =>
                useLoanCustomerAssetsAndLiabilities({
                    fetcher: new MockLoanApplicationAssetsAndLiabilitiesFetcher(),
                    loanApplicationId: '',
                }),
            { wrapper: QueryClientWrapper }
        );

        act(() => {
            result.current.onChangeApplicant(mockLoanCustomers[0].id);
        });

        waitFor(() => {
            expect(result.current.loanAssetsAndLiabilities.applicantTotalAssets).toEqual(
                assetsAndLiabilitiesMock.assets.filter(asset => asset.value).reduce((prevValue, currValue) => prevValue + currValue.value, 0)
            );
            expect(result.current.loanAssetsAndLiabilities.applicantTotalLiabilities).toEqual(
                assetsAndLiabilitiesMock.liabilities
                    .filter(liability => liability.value)
                    .reduce((prevValue, currValue) => prevValue + currValue.value, 0)
            );
        });
    });
});

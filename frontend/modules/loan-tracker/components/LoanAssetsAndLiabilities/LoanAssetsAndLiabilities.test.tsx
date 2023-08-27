import React from 'react';
import { act, render } from '@testing-library/react';
import ProviderWrapper, { testingQueryClient } from '@fsi/core-components/dist/utilities/tests/ProviderWrapper';
import { LoanAssetsAndLiabilities } from './LoanAssetsAndLiabilities';
import { MockLoanAssetsAndLiabilitiesFetcher } from '../../interfaces/ILoanFinancialCategory/mocks/ILoanAssetsAndLiabilitiesFetcher.mocks';

const LoanAssetsAndLiabilitiesWithProvider = ProviderWrapper(LoanAssetsAndLiabilities);

describe('LoanAssetsAndLiabilities', () => {
    beforeEach(() => {
        testingQueryClient.clear();
    });

    it('should render loan assets an liabilities', async () => {
        let component;

        await act(async () => {
            component = render(<LoanAssetsAndLiabilitiesWithProvider fetcher={new MockLoanAssetsAndLiabilitiesFetcher()} />);
        });

        const { getByTestId } = component;

        expect(getByTestId('loan-assets-liabilities')).toBeVisible();
    });

    it('should render error state if cant get assets and liabilties', async () => {
        const customFetcher = new MockLoanAssetsAndLiabilitiesFetcher();
        let component;

        jest.spyOn(customFetcher, 'getAssetsAndLiabilities').mockImplementation(() => Promise.reject());

        await act(async () => {
            component = render(<LoanAssetsAndLiabilitiesWithProvider fetcher={customFetcher} />);
        });

        const { getByTestId } = component;

        expect(getByTestId('error-state')).toBeVisible();
    });

    it('should render error state if cant get primary applicant', async () => {
        const customFetcher = new MockLoanAssetsAndLiabilitiesFetcher();
        let component;

        jest.spyOn(customFetcher, 'getPrimaryApplicantData').mockImplementation(() => Promise.reject());

        await act(async () => {
            component = render(<LoanAssetsAndLiabilitiesWithProvider fetcher={customFetcher} />);
        });

        const { getByTestId } = component;

        expect(getByTestId('error-state')).toBeVisible();
    });

    it('should render loading state', () => {
        const component = render(<LoanAssetsAndLiabilitiesWithProvider fetcher={new MockLoanAssetsAndLiabilitiesFetcher()} />);

        const { getByTestId } = component;
        expect(getByTestId('loading-spinner')).toBeVisible();
    });
});

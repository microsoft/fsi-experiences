import React from 'react';
import { act, render } from '@testing-library/react';
import { MockLoanInformationFetcher } from '../../interfaces/ILoanInformation/mocks/ILoanInformationFetcher.mock';
import ProviderWrapper from '@fsi/core-components/dist/utilities/tests/ProviderWrapper';
import { LoanInformation } from './LoanInformation';

const LoanInformationWithProvider = ProviderWrapper(LoanInformation);

describe('LoanInformation', () => {
    it('should render loan data', async () => {
        let component;

        await act(async () => {
            component = render(<LoanInformationWithProvider fetcher={new MockLoanInformationFetcher()} />);
        });

        const { getByTestId } = component;

        expect(getByTestId('loan-data')).toBeVisible();
    });
});

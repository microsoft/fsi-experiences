import React from 'react';
import { act, render } from '@testing-library/react';
import ProviderWrapper from '@fsi/core-components/dist/utilities/tests/ProviderWrapper';
import { MockLoanProgressOverviewFetcher } from '../../interfaces/ILoanProgressOverview/mocks/ILoanProgressOverviewFetcher.mocks';
import { LoanProgressOverview } from './LoanProgressOverview';

const LoanProgressOverviewWithProvider = ProviderWrapper(LoanProgressOverview);

describe('LoanProgressOverview', () => {
    it('should render loan progress overview', async () => {
        let component;

        await act(async () => {
            component = render(<LoanProgressOverviewWithProvider fetcher={new MockLoanProgressOverviewFetcher()} />);
        });

        const { getByTestId } = component;

        expect(getByTestId('loan-progress-data')).toBeVisible();
    });
});

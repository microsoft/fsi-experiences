import React from 'react';
import { render } from '@testing-library/react';
import { LoanOnboardingWrapper } from './LoanOnboardingWrapper';
import { MockLoanOnboardingFetcher } from '../../interfaces/ILoanOnboarding/mocks/ILoanOnboardingFetcher.mocks';
import ProviderWrapper from '@fsi/core-components/dist/utilities/tests/ProviderWrapper';

const LoanOnboardingWrapperWithProvider = ProviderWrapper(LoanOnboardingWrapper);

describe('LoanOnboardingWrapper', () => {
    it('should render component', async () => {
        const { container } = render(<LoanOnboardingWrapperWithProvider fetcher={new MockLoanOnboardingFetcher()} />);

        expect(container).toBeInTheDocument();
    });
});

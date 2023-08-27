import React from 'react';
import { act, render } from '@testing-library/react';
import LoanOnboardingWidget from './LoanOnboardingWidget';
import ProviderWrapper from '@fsi/core-components/dist/utilities/tests/ProviderWrapper';

const LoanOnboardingWidgetWithProvider = ProviderWrapper(LoanOnboardingWidget);

describe('LoanOnboarding', () => {
    it('should render component', async () => {
        let component;

        await act(async () => {
            component = render(<LoanOnboardingWidgetWithProvider />);
        });

        const { container } = component;

        expect(container).toBeInTheDocument();
    });
});

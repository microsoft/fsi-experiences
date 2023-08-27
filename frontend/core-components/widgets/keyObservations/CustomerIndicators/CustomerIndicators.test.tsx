import React from 'react';
import { render, waitFor } from '@testing-library/react';
import CustomerIndicator from './CustomerIndicators';
import { QueryClientWrapper } from '../../../utilities/tests/ProviderWrapper';
import { MockCustomerIndicatorFetcher } from '../../../dataLayerInterface/service/mocks/MockCustomerIndicatorFetcher';

const props = { fetcher: new MockCustomerIndicatorFetcher() };

describe('CustomerIndicators', () => {
    it('Should render customer indicators', async () => {
        const { getByTestId } = render(<CustomerIndicator {...props} />, { wrapper: QueryClientWrapper });

        expect(getByTestId('customer-indicators-widget')).toBeVisible();
        waitFor(() => {
            expect(getByTestId('subtitle-fields')).toBeVisible();
            expect(getByTestId('loading-spinner')).not.toBeInTheDocument();
        });
    });
});

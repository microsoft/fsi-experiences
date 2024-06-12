import React from 'react';
import { render, waitFor } from '@testing-library/react';
import CustomerSnapshot from './CustomerSnapshot';
import { MockCustomerSnapshotFetcher } from '../../dataLayerInterface/service/mocks/MockCustomerSnapshotFetcher';
import { QueryClientWrapper } from '../../utilities/tests/ProviderWrapper';

const props = { formId: '1', entityId: '1', fetcher: new MockCustomerSnapshotFetcher() };

describe('CustomerSnapshot', () => {
    it('Should render customer snapshot', async () => {
        const { getByTestId } = render(<CustomerSnapshot {...props} />, { wrapper: QueryClientWrapper });

        expect(getByTestId('customer-snapshot-widget')).toBeVisible();
        waitFor(() => {
            expect(getByTestId('subtitle-fields')).toBeVisible();
            expect(getByTestId('loading-spinner')).not.toBeInTheDocument();
        });
    });
});

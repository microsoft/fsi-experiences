import React from 'react';
import { render, waitFor } from '@testing-library/react';
import FinancialHoldingInformation from './FinancialHoldingInformation';
import { QueryClientWrapper } from '@fsi/core-components/dist/utilities/tests/ProviderWrapper';
import commonStrings from '@fsi/core-components/dist/assets/strings/common/common.1033.json';
import { MockFHFetcher } from '../../constants/MockFHFetcher';

const props = { fetcher: new MockFHFetcher() };

describe('FinancialHoldingInformation', () => {
    it('Should render customer snapshot', async () => {
        const { getByTestId } = render(<FinancialHoldingInformation financialHoldingId="" {...props} />, { wrapper: QueryClientWrapper });
        expect(getByTestId('financial-holding-information')).toBeVisible();
        waitFor(() => {
            expect(getByTestId('sid-page-content')).toBeVisible();
            expect(getByTestId('loading-spinner')).not.toBeInTheDocument();
        });
    });
    it('Should render customer snapshot - error state', async () => {
        const fetcher = new MockFHFetcher();
        fetcher.fetchFHById = jest.fn().mockRejectedValue('');
        const { getByTestId } = render(<FinancialHoldingInformation fetcher={fetcher} financialHoldingId="" />, { wrapper: QueryClientWrapper });
        expect(getByTestId('financial-holding-information')).toBeVisible();
        waitFor(() => {
            expect(getByTestId(commonStrings.ERROR)).toBeVisible();
        });
    });
});

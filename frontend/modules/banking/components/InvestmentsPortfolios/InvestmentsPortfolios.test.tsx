import React from 'react';
import { render, waitFor } from '@testing-library/react';
import InvestmentsPortfolios from './InvestmentsPortfolios';
import { QueryClientWrapper } from '@fsi/core-components/dist/utilities/tests/ProviderWrapper';
import commonStrings from '@fsi/core-components/dist/assets/strings/common/common.1033.json';
import fhStrings from '@fsi/core-components/dist/assets/strings/FinancialHoldings/FinancialHoldings.1033.json';
import { MockFHFetcher, MockFHFetcherForbidden } from '../../constants/MockFHFetcher';

const props = { fetcher: new MockFHFetcher() };

describe('InvestmentsPortfolios', () => {
    it('Should render investments portfolios', async () => {
        const { getByTestId } = render(<InvestmentsPortfolios contactId={''} {...props} />, { wrapper: QueryClientWrapper });
        expect(getByTestId('investments-portfolios-widget')).toBeVisible();
        waitFor(() => {
            expect(getByTestId('subtitle-fields')).toBeVisible();
            expect(getByTestId('loading-spinner')).not.toBeInTheDocument();
        });
    });
    it('Should render investments portfolios - error state', async () => {
        const fetcher = new MockFHFetcher();
        fetcher.fetchFinancialHoldingByCategory = jest.fn().mockRejectedValue('');
        const { getByTestId } = render(<InvestmentsPortfolios fetcher={fetcher} contactId={''} />, { wrapper: QueryClientWrapper });
        expect(getByTestId('investments-portfolios-widget')).toBeVisible();
        waitFor(() => {
            expect(getByTestId(commonStrings.ERROR)).toBeVisible();
        });
    });

    it('Should render investments portfolios - empty state', async () => {
        const fetcher = new MockFHFetcher();
        fetcher.fetchFinancialHoldingByCategory = jest.fn().mockResolvedValue([]);
        const { getByTestId } = render(<InvestmentsPortfolios fetcher={fetcher} contactId={''} />, { wrapper: QueryClientWrapper });
        expect(getByTestId('investments-portfolios-widget')).toBeVisible();
        waitFor(() => {
            expect(getByTestId(fhStrings.NO_INVESTMENTS_PORTFOLIOS)).toBeVisible();
        });
    });

    it('Should render investments portfolios - restricted state', async () => {
        const fetcher = new MockFHFetcherForbidden();
        const { getByTestId, getByText } = render(<InvestmentsPortfolios fetcher={fetcher} contactId={''} />, { wrapper: QueryClientWrapper });
        expect(getByTestId('investments-portfolios-widget')).toBeVisible();
        await waitFor(() => {
            expect(getByText(fhStrings.CUSTOMER_INFORMATION_RESTRICTED)).toBeVisible();
        });
    });
});

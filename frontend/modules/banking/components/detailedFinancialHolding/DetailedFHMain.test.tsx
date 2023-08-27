import React from 'react';
import { act, render, waitFor } from '@testing-library/react';
import { emptyFHFetcher } from '../../constants/MockFHFetcher';
import DetailedFHMainUnProvided from './DetailedFHMain';
import { getFHFetcherMock } from './DetailedFHData.mock';
import commonStrings from '@fsi/core-components/dist/assets/strings/common/common.1033.json';
import ProviderWrapper, { testingQueryClient } from '@fsi/core-components/dist/utilities/tests/ProviderWrapper';
import { FHMetadataMock } from '../../interfaces/FHEntity/mocks/FHMetadata.mock';
import { fhOtherCustomersOwnMock } from './CustomerFH.mock';

const DetailedFHMain = ProviderWrapper(DetailedFHMainUnProvided);
jest.mock('./components/DetailedFHBody/DetailedFHBody', () => {
    return {
        DetailedFHBody: params => {
            return <div data-testid={'fh-detailed-pivot-body'} />;
        },
    };
});
describe('DetailedFHMain', () => {
    const contactId = 'test';

    const fetcher = {
        fetchFHOtherCustomersOwn: jest.fn().mockResolvedValue(fhOtherCustomersOwnMock),
        fetchFHData: jest.fn().mockResolvedValue(getFHFetcherMock()),
        fetchFHMetadata: jest.fn().mockResolvedValue(FHMetadataMock),
    };

    const errorFetcher = { ...emptyFHFetcher };

    beforeEach(() => {
        testingQueryClient.clear();
        fetcher.fetchFHData.mockClear();
        fetcher.fetchFHOtherCustomersOwn.mockClear();
    });

    it('Should render main screen with no errors', async () => {
        const { getByTestId } = render(<DetailedFHMain contactId={contactId} fetcher={fetcher} />);

        await act(async () => {
            await fetcher.fetchFHData;
        });
        expect(fetcher.fetchFHData).toHaveBeenCalledTimes(1);
        await act(async () => {
            await fetcher.fetchFHOtherCustomersOwn;
        });

        expect(fetcher.fetchFHOtherCustomersOwn).toHaveBeenCalledTimes(1);
        expect(getByTestId(/fh-detailed-pivot-body/i)).toBeVisible();
    });

    it('Should render main screen with loading spinner', async () => {
        const { getByTestId, queryByTestId } = render(<DetailedFHMain contactId={contactId} fetcher={fetcher} />);

        expect(getByTestId('loading-spinner')).toBeInTheDocument();

        await waitFor(() => expect(queryByTestId('loading-spinner')).toBeNull());
    });

    it('Should render main screen with error state', async () => {
        const { getByTestId, getByText } = render(<DetailedFHMain contactId={contactId} fetcher={errorFetcher} />);

        await act(async () => {
            await errorFetcher.fetchFHData;
        });
        expect(getByTestId('error-state')).toBeVisible();
        expect(getByText(commonStrings.ERROR_STATE_TITLE)).toBeVisible();
    });

    it('Should render main screen with hidden holdings', async () => {
        const mockFhData = {
            ...getFHFetcherMock(),
            requestMetadata: {
                msfsi_FH_Account: 200,
                msfsi_FH_Creditline: 200,
                msfsi_FH_Investment: 200,
                msfsi_FH_Loan: 204,
                msfsi_FH_Saving: 200,
            },
        };
        const fetchFhDataWithMetadata = jest.fn().mockResolvedValue(mockFhData);
        const { getByTestId } = render(<DetailedFHMain contactId={contactId} fetcher={{ ...fetcher, fetchFHData: fetchFhDataWithMetadata }} />);

        await act(async () => {
            await fetcher.fetchFHData;
        });
        expect(fetchFhDataWithMetadata).toHaveBeenCalledTimes(1);
        await act(async () => {
            await fetcher.fetchFHOtherCustomersOwn;
        });
        expect(fetcher.fetchFHOtherCustomersOwn).toHaveBeenCalledTimes(1);

        expect(getByTestId(/hidden-bar/i)).toBeVisible();
    });
});

import React from 'react';
import { render, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import BankingCardsComp from '../../components/bankingCards/BankingCards';
import { BankingCardsMainProps } from './BankingCardsMain/BankingCardsMain.interface';
import { FHMetadataMock } from '../../interfaces/FHEntity/mocks/FHMetadata.mock';
import ProviderWrapper, { testingQueryClient } from '@fsi/core-components/dist/utilities/tests/ProviderWrapper';

const BankingCards = ProviderWrapper(BankingCardsComp);

const MOCK_LOADING_ID = 'credit-card-main-loading';
const MOCK_ERROR_ID = 'credit-card-main-error';
const MOCK_LOADED_ID = 'credit-card-main-loaded';

jest.mock('./BankingCardsMain/BankingCardsMain', () => (params: BankingCardsMainProps) => {
    const { isLoading, isError } = params;
    if (isLoading) {
        return <div data-testid={MOCK_LOADING_ID}></div>;
    }
    if (isError) {
        return <div data-testid={MOCK_ERROR_ID}></div>;
    }
    return <div data-testid={MOCK_LOADED_ID}></div>;
});

describe('BankingCards', () => {
    const contactId = 'test';
    const errorFetcher = {
        fetchFHCardsData: jest.fn().mockRejectedValue(new Error()),
        fetchFHMetadata: jest.fn().mockRejectedValue(new Error()),
    };

    const fetcher = {
        fetchFHCardsData: jest.fn().mockResolvedValue({ financialHoldings: new Map(), hasAccess: true }),
        fetchFHMetadata: jest.fn().mockResolvedValue(FHMetadataMock),
    };

    beforeAll(() => {
        window.HTMLElement.prototype.scrollTo = jest.fn();
    });

    beforeEach(() => {
        fetcher.fetchFHCardsData.mockClear();
        errorFetcher.fetchFHCardsData.mockClear();
        testingQueryClient.clear();
    });

    it('Should render credit cards main with loading state at the first render', async () => {
        const { getByTestId } = render(<BankingCards contactId={contactId} fetcher={fetcher} />);

        expect(getByTestId(MOCK_LOADING_ID)).toBeInTheDocument();

        await waitFor(() => expect(getByTestId(MOCK_LOADED_ID)).toBeInTheDocument());
    });

    it('Should show error state', async () => {
        const { getByTestId } = render(<BankingCards contactId={contactId} fetcher={errorFetcher} />);

        await waitFor(() => expect(getByTestId(MOCK_ERROR_ID)).toBeInTheDocument());
    });

    it('Should call to fetchFHCardsData with contact id', async () => {
        const { getByTestId } = render(<BankingCards contactId={contactId} fetcher={fetcher} />);

        expect(fetcher.fetchFHCardsData).toHaveBeenCalledWith(contactId);

        await waitForElementToBeRemoved(() => getByTestId(MOCK_LOADING_ID));
    });
});

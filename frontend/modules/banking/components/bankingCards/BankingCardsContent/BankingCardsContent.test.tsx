import React from 'react';
import { render } from '@testing-library/react';
import { getFHMock } from '../../../components/bankingCards/BankingCards.mock';
import BankingCardContent from './BankingCardsContent';
import commonStrings from '@fsi/core-components/dist/assets/strings/common/common.1033.json';
import cardsStrings from '@fsi/core-components/dist/assets/strings/Cards/Cards.1033.json';

const fhMockData = getFHMock();

describe('BankingCardsContent', () => {
    it('Should render content loading', async () => {
        const { getByTestId } = render(
            <BankingCardContent cardsNumber={4} carouselIndex={0} entities={fhMockData.financialHoldings} isError={false} isLoading />
        );

        expect(getByTestId('loading-spinner')).toBeInTheDocument();
    });

    it('Should render content error even if loading', async () => {
        const { getByText } = render(
            <BankingCardContent cardsNumber={4} carouselIndex={0} entities={fhMockData.financialHoldings} isError isLoading />
        );

        expect(getByText(commonStrings.ERROR_STATE_TITLE)).toBeInTheDocument();
    });

    it('Should render content no access', async () => {
        const { getByText } = render(
            <BankingCardContent
                cardsNumber={4}
                carouselIndex={0}
                entities={fhMockData.financialHoldings}
                isError={false}
                isLoading={false}
                hasAccess={false}
            />
        );

        expect(getByText(cardsStrings.CUSTOMER_INFORMATION_RESTRICTED)).toBeInTheDocument();
    });

    it('Should render content', async () => {
        const { getByTestId } = render(
            <BankingCardContent
                cardsNumber={4}
                carouselIndex={0}
                entities={fhMockData.financialHoldings}
                isError={false}
                isLoading={false}
                hasAccess={true}
            />
        );

        expect(getByTestId('card-row-4')).toBeInTheDocument();
    });
});

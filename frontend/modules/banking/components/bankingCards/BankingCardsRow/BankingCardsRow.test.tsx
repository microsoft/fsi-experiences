import React from 'react';
import { render } from '@testing-library/react';
import BankingCardsRow from './BankingCardsRow';
import { getFHMock } from '../../../components/bankingCards/BankingCards.mock';
import { FinancialHoldingFields } from '../../../interfaces/FHEntity';
import { IBankingCardProps } from '../BankingCard/BankingCard.interface';
import { FHMetadataMock } from '../../../interfaces/FHEntity/mocks/FHMetadata.mock';

const bankingCardMock = jest.fn();
jest.mock('../BankingCard/BankingCard', () => (params: IBankingCardProps) => {
    bankingCardMock(params);
    return <div data-testid="banking-card-mock-item" />;
});

describe('Cards Row Widget', () => {
    let fhMockData;

    beforeEach(() => {
        bankingCardMock.mockReset();
    });
    beforeAll(() => {
        window.HTMLElement.prototype.scrollTo = jest.fn();

        fhMockData = getFHMock();
    });

    it('Should render cards row with 4 cards', async () => {
        const { queryAllByTestId } = render(
            <BankingCardsRow financialHoldings={fhMockData.financialHoldings} cardsNumber={fhMockData.cardsNumber} focusedIndex={0} />
        );

        expect(queryAllByTestId(/cardRow-item/i).length).toEqual(4);
    });

    it('Should render cards row with 4 cards 2', async () => {
        const { queryAllByTestId } = render(
            <BankingCardsRow financialHoldings={fhMockData.financialHoldings} cardsNumber={fhMockData.cardsNumber} focusedIndex={0} />
        );

        expect(queryAllByTestId(/cardRow-item/i).length).toEqual(4);
    });

    it('Should render empty state row', async () => {
        const { getByTestId, getByText } = render(
            <BankingCardsRow financialHoldings={new Map<string, FinancialHoldingFields>()} cardsNumber={0} focusedIndex={0} />
        );

        expect(getByTestId(/empty-state/i)).toBeVisible();

        expect(getByText('No owned cards')).toBeVisible();
    });

    it('Should call card component with the right props', async () => {
        const { queryAllByTestId } = render(
            <BankingCardsRow
                financialHoldings={fhMockData.financialHoldings}
                cardsNumber={fhMockData.cardsNumber}
                focusedIndex={0}
                metadata={FHMetadataMock}
            />
        );

        expect(queryAllByTestId(/cardRow-item/i).length).toEqual(4);
        expect(bankingCardMock).toHaveBeenLastCalledWith(
            expect.objectContaining({
                cardInfo: fhMockData.financialHoldings.get('c257fe4c-0949-eb11-a813-000d3a3b7031').financialInstruments[0],
                fhRole: 104800000,
                metadata: FHMetadataMock,
            })
        );
    });
});

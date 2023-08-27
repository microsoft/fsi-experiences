import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { getFHMock } from '../../../components/bankingCards/BankingCards.mock';
import BankingCardsMain from './BankingCardsMain';
import commonStrings from '@fsi/core-components/dist/assets/strings/common/common.1033.json';
import cardsStrings from '@fsi/core-components/dist/assets/strings/Cards/Cards.1033.json';
import { FinancialHoldingFields } from '../../../interfaces/FHEntity';

describe('BankingCardsMain', () => {
    let fhMockData;

    beforeAll(() => {
        window.HTMLElement.prototype.scrollTo = jest.fn();

        fhMockData = getFHMock();
    });

    // TODO: make this to unit test - this test test id of inner component
    it('Should render a card row and header', async () => {
        const { getByText, queryByTestId } = render(<BankingCardsMain entities={fhMockData.financialHoldings} isError={false} isLoading={false} />);

        expect(getByText('Cards (4)')).toBeVisible();

        expect(queryByTestId(/card-row/i)).toBeTruthy();
    });

    it('Should disable buttons when edge at edge of screen', async () => {
        const { getAllByRole, getByTestId } = render(<BankingCardsMain entities={fhMockData.financialHoldings} isError={false} isLoading={false} />);

        const rightClick = getByTestId(/right-click-button/i);

        if (rightClick) {
            fireEvent.click(rightClick);

            // eslint-disable-next-line jest/no-conditional-expect
            expect(getAllByRole('button')[1]).toHaveClass('is-disabled');

            // eslint-disable-next-line jest/no-conditional-expect
            expect(getAllByRole('button')[0]).not.toHaveClass('is-disabled');
        }

        const leftClick = getByTestId(/left-click-button/i);

        if (leftClick) {
            fireEvent.click(leftClick);

            // eslint-disable-next-line jest/no-conditional-expect
            expect(getAllByRole('button')[1]).not.toHaveClass('is-disabled');

            // eslint-disable-next-line jest/no-conditional-expect
            expect(getAllByRole('button')[0]).toHaveClass('is-disabled');
        }
    });

    it('Should render error state', async () => {
        const { getByText, queryByTestId } = render(<BankingCardsMain entities={fhMockData.financialHoldings} isError={true} isLoading={false} />);

        expect(getByText(commonStrings.ERROR_STATE_TITLE)).toBeVisible();

        expect(queryByTestId('error-state')).toBeTruthy();
    });

    it('Should render hidden state', async () => {
        const { getByText, queryByTestId } = render(
            <BankingCardsMain entities={fhMockData.financialHoldings} isError={false} isLoading={false} hasAccess={false} />
        );

        expect(getByText(cardsStrings.CUSTOMER_INFORMATION_RESTRICTED)).toBeVisible();

        expect(queryByTestId('empty-state')).toBeTruthy();
    });

    it('Should render 0 cards', async () => {
        const { getByText } = render(
            <BankingCardsMain entities={new Map<string, FinancialHoldingFields>()} isError={false} isLoading={false} hasAccess={false} />
        );

        expect(getByText(cardsStrings.CARDS.replace(' {{cardNumbers}}', ''))).toBeVisible();
    });
});

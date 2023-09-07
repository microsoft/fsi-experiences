import React from 'react';
import { render } from '@testing-library/react';
import BankingCard from './BankingCard';
import { COLORS } from '@fsi/core-components/dist/constants/Colors';
import { IBankingCardProps } from './BankingCard.interface';
import { BANKING_CARDS_STATUS, BANKING_CARDS_TYPE, fhRolesValues } from '../../../constants/FHValueMaps';
import cardsStrings from '@fsi/core-components/dist/assets/strings/Cards/Cards.1033.json';
import { interpolateString } from '@fsi/core-components/dist/context/localization/TranslationFunction';
import startOfToday from 'date-fns/startOfToday';
import addDays from 'date-fns/addDays';
import subDays from 'date-fns/subDays';
import addYears from 'date-fns/addYears';
import { FHMetadataMock } from '../../../interfaces/FHEntity/mocks/FHMetadata.mock';

let creditCardMaskVal;
jest.mock('@fsi/core-components/dist/utilities/CalcUtils', () => {
    return {
        creditCardMask: value => {
            creditCardMaskVal = value;
            return value;
        },
    };
});

const cardNumber = '1245 554786 12353';
const defaultProps: IBankingCardProps = {
    cardInfo: {
        financialHoldingInstrumentType: 104800002,
        fhiActivationDate: new Date('2020-01-23T22:00:00Z'),
        fhiCardNumber: cardNumber,
        fhiCardType: BANKING_CARDS_TYPE.Credit,
        fhiExpiryDate: new Date('2024-01-23T22:00:00Z'),
        fhiIssueDate: new Date('2020-01-23T22:00:00Z'),
        fhiNumberOfCashWithdrawal: 4,
        fhiNumberOfTransactions: 5,
        fhiPurchasingLimit: 1234,
        fhiStatus: BANKING_CARDS_STATUS.NotActive,
        fhiWithdrawalLimit: 500,
        fsiProductName: 'AMEX Gold',
        fsiCardNetwork: 'AMEX',
        fhiEmbossingName: 'Andre Lawson',
    },
    fhRole: fhRolesValues.owner,
    metadata: FHMetadataMock,
};

const getTestProps = (defaultProps): IBankingCardProps => {
    return {
        ...defaultProps,
        // cardInfo: {
        //     ...defaultProps.cardInfo,
        //     ...cardInfo,
        // },
    };
};

const cardDarkHeaderColor = COLORS.primaryTagText;

describe('BankingCard', () => {
    beforeAll(() => {
        creditCardMaskVal = undefined;
    });

    it('Should render card', async () => {
        const { getByText } = render(<BankingCard {...defaultProps} />);

        expect(getByText('Credit • AMEX Gold')).toBeVisible();

        expect(creditCardMaskVal).toEqual(cardNumber);

        expect(getByText('amex')).toBeVisible();

        expect(getByText('Not activated')).toBeVisible();
        expect(getByText('01/24')).toBeVisible();
        expect(getByText('Andre Lawson')).toBeVisible();
    });

    it('Should render card with footer with close expiry date', async () => {
        const testProps = getTestProps({
            fhiStatus: BANKING_CARDS_STATUS.Active,
            fhiExpiryDate: addDays(Date.now(), 1),
        });
        // eslint-disable-next-line no-console
        console.log('---->', testProps);

        const { getByText, getByTestId } = render(<BankingCard {...testProps} />);

        expect(getByTestId('card-wrapper-footer')).toBeVisible();
        expect(getByText('EXPIRES SOON')).toBeVisible();
        expect(getByText('Andre Lawson')).toBeVisible();
    });

    it('Should render card with footer expiring today', async () => {
        const testProps = getTestProps({
            fhiStatus: BANKING_CARDS_STATUS.Active,
            fhiExpiryDate: new Date(startOfToday()),
        });

        const { getByText, getByTestId } = render(<BankingCard {...testProps} />);

        expect(getByTestId('card-wrapper-footer')).toBeVisible();
        expect(getByText('EXPIRES SOON')).toBeVisible();
        expect(getByTestId('card-wrapper-header')).toHaveStyle({ color: COLORS.white });
        expect(getByText('Andre Lawson')).toBeVisible();
    });

    it('Should render card with footer with expiring soon status', async () => {
        const testProps = getTestProps({
            fhiStatus: BANKING_CARDS_STATUS.Active,
            fhiExpiryDate: new Date(),
        });

        const { getByText, getByTestId } = render(<BankingCard {...testProps} />);

        expect(getByTestId('card-wrapper-footer')).toBeVisible();
        expect(getByText('EXPIRES SOON')).toBeVisible();
        expect(getByTestId('card-wrapper-header')).toHaveStyle({ color: COLORS.white });
    });

    it('Should render card with footer with far expiry date', async () => {
        const testProps = getTestProps({
            fhiStatus: BANKING_CARDS_STATUS.Active,
            fhiExpiryDate: addYears(Date.now(), 1),
        });

        const { getByText, getByTestId } = render(<BankingCard {...testProps} />);

        expect(getByTestId('card-wrapper-footer')).toBeVisible();
        expect(getByText('Active')).toBeVisible();
    });

    it('Should render card with footer with expired date when status is active', async () => {
        const testProps = getTestProps({
            fhiStatus: BANKING_CARDS_STATUS.Active,
            fhiExpiryDate: subDays(Date.now(), 1),
        });

        const { getByText, getByTestId } = render(<BankingCard {...testProps} />);

        expect(getByTestId('card-wrapper-footer')).toBeVisible();
        expect(getByText('EXPIRED')).toBeVisible();
        expect(getByTestId('card-wrapper-header')).toHaveStyle({ color: cardDarkHeaderColor });
    });

    it('Should render card with footer with expired date when status is expired', async () => {
        const testProps = getTestProps({
            fhiStatus: BANKING_CARDS_STATUS.Expired,
            fhiExpiryDate: new Date(),
        });

        const { getByText, getByTestId } = render(<BankingCard {...testProps} />);

        expect(getByTestId('card-wrapper-footer')).toBeVisible();
        expect(getByText('EXPIRED', { exact: false })).toBeVisible();
        expect(getByTestId('card-wrapper-footer-status')).toHaveStyle({ textTransform: 'uppercase' });
        expect(getByTestId('card-wrapper-header')).toHaveStyle({ color: cardDarkHeaderColor });
    });

    it('Should render card with footer with a not activated status', async () => {
        const testProps = getTestProps({
            fhiStatus: BANKING_CARDS_STATUS.NotActive,
            fhiExpiryDate: new Date(),
        });

        const { getByText, getByTestId } = render(<BankingCard {...testProps} />);

        expect(getByTestId('card-wrapper-footer')).toBeVisible();
        expect(getByText('Not activated')).toBeVisible();
        expect(getByTestId('card-wrapper-header')).toHaveStyle({ color: cardDarkHeaderColor });
    });

    it('Should render card without status', async () => {
        const testProps = getTestProps({
            ...defaultProps.cardInfo,
            fhiStatus: undefined,
        });

        const { getByTestId } = render(<BankingCard {...testProps} />);

        expect(getByTestId('card-wrapper-header')).toHaveStyle({ color: cardDarkHeaderColor });
    });

    it('Should render card without card type and product', async () => {
        const testProps = getTestProps({
            fhiCardType: undefined,
            fsiCardNetwork: undefined,
            fsiProductName: undefined,
        });

        const { getByTestId } = render(<BankingCard {...testProps} />);

        expect(getByTestId('card-wrapper-header')).toHaveStyle({ color: cardDarkHeaderColor });
        expect(getByTestId('card-wrapper-header')).toHaveTextContent('');
        expect(getByTestId('card-wrapper-product')).toHaveTextContent('');
    });

    it('Should render card without card number', async () => {
        const testProps = getTestProps({
            ...defaultProps.cardInfo,
            fhiCardNumber: undefined,
        });

        const { getByText } = render(<BankingCard {...testProps} />);

        expect(getByText('Not activated')).toBeVisible();

        expect(creditCardMaskVal).toEqual('');
    });

    it('Should render more info icon with card index', async () => {
        const testProps = {
            ...defaultProps,
            index: 3,
        };

        const { getByLabelText, getByTestId } = render(<BankingCard {...testProps} />);

        const cardDescription = interpolateString(cardsStrings.BANKING_CARD_DETAILS, { index: 4 });

        expect(getByLabelText(cardDescription)).toBeVisible();
        expect(getByTestId('indicator-icon-info')).toBeVisible();
    });

    it('Should render empty state', async () => {
        const { container } = render(<BankingCard cardInfo={undefined} fhRole={fhRolesValues.owner} />);

        expect(container).toBeEmptyDOMElement();
    });
});

import { render } from '@testing-library/react';
import { ICardFooterProps } from './BankingCardFooter.interface';
import { BANKING_CARDS_STATUS } from '../../../constants/FHValueMaps';
import { CardFooter } from './BankingCardFooter';
import React from 'react';
import addDays from 'date-fns/addDays';
import { addYears, startOfToday, subDays } from 'date-fns';
import { FHMetadataMock } from '../../../interfaces/FHEntity/mocks/FHMetadata.mock';
import { getOptionSetText } from '../../../utilities/EntityMetadata';

const defaultProps: ICardFooterProps = {
    cardStatus: getOptionSetText(BANKING_CARDS_STATUS.NotActive, FHMetadataMock?.fhiStatus),
    isActive: false,
    fhiStatus: BANKING_CARDS_STATUS.NotActive,
    role: 'owner',
    cardExpiry: new Date('2024-01-23T22:00:00Z'),
    embossingName: 'Andre Lawson',
};
describe('BankingCardFooter', () => {
    const getTestProps = (footerInfo): ICardFooterProps => {
        return {
            ...defaultProps,
            ...footerInfo,
        };
    };

    it('Should render footer', async () => {
        const { getByText } = render(<CardFooter {...defaultProps} />);

        expect(getByText('Not activated')).toBeVisible();
        expect(getByText('01/24')).toBeVisible();
        expect(getByText('Andre Lawson')).toBeVisible();
    });

    it('Should render footer with close expiry date', async () => {
        const testProps = getTestProps({
            cardStatus: 'EXPIRES SOON',
            cardExpiry: addDays(Date.now(), 1),
        });

        const { getByText } = render(<CardFooter {...testProps} />);
        expect(getByText('EXPIRES SOON')).toBeVisible();
        expect(getByText('Andre Lawson')).toBeVisible();
    });

    it('Should render footer expiring today', async () => {
        const testProps = getTestProps({
            cardStatus: 'EXPIRES SOON',
            cardExpiry: new Date(startOfToday()),
        });

        const { getByText, getByTestId } = render(<CardFooter {...testProps} />);

        expect(getByTestId('card-wrapper-footer')).toBeVisible();
        expect(getByText('EXPIRES SOON')).toBeVisible();
        expect(getByText('Andre Lawson')).toBeVisible();
    });

    it('Should render footer with expiring soon status', async () => {
        const testProps = getTestProps({
            cardStatus: 'EXPIRES SOON',
            cardExpiry: new Date(),
        });

        const { getByText, getByTestId } = render(<CardFooter {...testProps} />);

        expect(getByTestId('card-wrapper-footer')).toBeVisible();
        expect(getByText('EXPIRES SOON')).toBeVisible();
    });

    it('Should render footer with far expiry date', async () => {
        const testProps = getTestProps({
            cardStatus: 'Active',
            cardExpiry: addYears(Date.now(), 1),
        });

        const { getByText, getByTestId } = render(<CardFooter {...testProps} />);

        expect(getByTestId('card-wrapper-footer')).toBeVisible();
        expect(getByText('Active')).toBeVisible();
    });

    it('Should render footer with expired date when status is active', async () => {
        const testProps = getTestProps({
            cardStatus: 'EXPIRED',
            cardExpiry: subDays(Date.now(), 1),
        });

        const { getByText, getByTestId } = render(<CardFooter {...testProps} />);

        expect(getByTestId('card-wrapper-footer')).toBeVisible();
        expect(getByText('EXPIRED')).toBeVisible();
    });

    it('Should render footer with expired date when status is expired', async () => {
        const testProps = getTestProps({
            cardStatus: 'EXPIRED',
            cardExpiry: new Date(),
        });

        const { getByText, getByTestId } = render(<CardFooter {...testProps} />);

        expect(getByTestId('card-wrapper-footer')).toBeVisible();
        expect(getByText('EXPIRED', { exact: false })).toBeVisible();
    });

    it('Should render footer with a not activated status', async () => {
        const testProps = getTestProps({
            cardStatus: 'Not activated',
            cardExpiry: new Date(),
        });

        const { getByText, getByTestId } = render(<CardFooter {...testProps} />);

        expect(getByTestId('card-wrapper-footer')).toBeVisible();
        expect(getByText('Not activated')).toBeVisible();
    });
});

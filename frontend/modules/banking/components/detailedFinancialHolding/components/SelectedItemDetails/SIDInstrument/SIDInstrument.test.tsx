import React from 'react';
import { render } from '@testing-library/react';
import { getCard, getDirectDebit, getOverDraft, getStandingOrder } from '../FHInstruments.mock';
import { SIDInstrument } from './SIDInstrument';
import { FH_INSTRUMENT_NAME_TO_TYPE } from '../../../../../constants/FHValueMaps';
import FinancialInstrumentFields from '../../../../../interfaces/FHEntity/FinancialInstrumentFields';
import { FHMetadataMock } from '../../../../../interfaces/FHEntity/mocks/FHMetadata.mock';

describe('SIDInstrument', () => {
    let standingOrder: FinancialInstrumentFields;
    let directDebit: FinancialInstrumentFields;
    let BankingCard: FinancialInstrumentFields;

    beforeEach(() => {
        standingOrder = getStandingOrder();
        directDebit = getDirectDebit();
        BankingCard = getCard();
    });

    it('Should render standing order section', async () => {
        const debtorAccount = 'A345B66';
        const frequency = 'Weekly';

        const { getByText, queryAllByTestId } = render(<SIDInstrument instrument={standingOrder} metadata={FHMetadataMock} />);

        const databoxLabel = queryAllByTestId(/databox-label-/i);
        const databoxValue = queryAllByTestId(/databox-value-/i);
        expect(databoxLabel).toHaveLength(12);
        expect(databoxValue).toHaveLength(12);

        expect(getByText(debtorAccount)).toBeVisible();
        expect(getByText(frequency)).toBeVisible();
    });

    it('Should render direct debit section with status', async () => {
        const creditorName = 'Ben Gold';
        const creditorIdentifier = '33554646';
        const mandateId = '123456789';
        const lastItemStatus = 'Successful';
        const { getByText, queryAllByTestId } = render(<SIDInstrument instrument={directDebit} metadata={FHMetadataMock} />);

        const databoxLabel = queryAllByTestId(/databox-label-/i);
        const databoxValue = queryAllByTestId(/databox-value-/i);
        expect(databoxLabel).toHaveLength(11);
        expect(databoxValue).toHaveLength(11);

        expect(getByText(creditorName)).toBeVisible();
        expect(getByText(creditorIdentifier)).toBeVisible();
        expect(getByText(mandateId)).toBeVisible();
        expect(getByText(lastItemStatus)).toBeVisible();
    });

    it('Should render active card section', async () => {
        const cardNumber = '***3211';
        const subHeader = 'Active • Debit • Freedon Flex';

        const { getByText, queryAllByTestId, queryByTestId } = render(<SIDInstrument instrument={BankingCard} metadata={FHMetadataMock} />);

        const databoxLabel = queryAllByTestId(/databox-label-/i);
        const databoxValue = queryAllByTestId(/databox-value-/i);
        expect(databoxLabel).toHaveLength(9);
        expect(databoxValue).toHaveLength(9);

        expect(getByText(cardNumber)).toBeVisible();

        const cardStatusIcon = queryByTestId(/card-status-icon-/i);
        expect(cardStatusIcon).toHaveAttribute('data-icon-name', 'LocationDot');
        expect(getByText(subHeader)).toBeVisible();
    });

    it('Should render stolen card section', async () => {
        const cardNumber = '***3211';
        BankingCard.fhiStatus = 104800001;
        const subHeader = 'Card stolen • Debit • Freedon Flex';

        const { getByText, queryAllByTestId, queryByTestId } = render(<SIDInstrument instrument={BankingCard} metadata={FHMetadataMock} />);

        const databoxLabel = queryAllByTestId(/databox-label-/i);
        const databoxValue = queryAllByTestId(/databox-value-/i);
        expect(databoxLabel).toHaveLength(9);
        expect(databoxValue).toHaveLength(9);

        expect(getByText(cardNumber)).toBeVisible();

        const cardStatusIcon = queryByTestId(/card-status-icon-/i);
        expect(cardStatusIcon).toHaveAttribute('data-icon-name', 'warning');
        expect(getByText(subHeader)).toBeVisible();
    });

    it('Should render section without sub header', async () => {
        const overdraft = getOverDraft();
        overdraft.financialHoldingInstrumentType = FH_INSTRUMENT_NAME_TO_TYPE['card'];
        const { queryAllByTestId } = render(<SIDInstrument instrument={overdraft} />);

        const cardIcon = queryAllByTestId(/card-status-icon-/i);
        expect(cardIcon).toHaveLength(0);
    });

    it('Should render empty section', async () => {
        BankingCard.financialHoldingInstrumentType = 1;
        const { queryAllByTestId } = render(<SIDInstrument instrument={BankingCard} metadata={FHMetadataMock} />);

        const databoxLabel = queryAllByTestId(/databox-label-/i);
        const databoxValue = queryAllByTestId(/databox-value-/i);
        expect(databoxLabel).toHaveLength(0);
        expect(databoxValue).toHaveLength(0);
    });

    it('Should render section without name and type in sub header', async () => {
        const subHeader = 'Active';
        BankingCard.fsiProductName = undefined;
        const { getByText } = render(<SIDInstrument instrument={BankingCard} metadata={FHMetadataMock} />);

        expect(getByText(subHeader)).toBeVisible();
    });

    it('Should render empty section 2', async () => {
        BankingCard.financialHoldingInstrumentType = undefined;
        const { queryAllByTestId } = render(<SIDInstrument instrument={BankingCard} metadata={FHMetadataMock} />);

        const databoxLabel = queryAllByTestId(/databox-label-/i);
        const databoxValue = queryAllByTestId(/databox-value-/i);
        expect(databoxLabel).toHaveLength(0);
        expect(databoxValue).toHaveLength(0);
    });

    it('Should render without throwing when metadata is missing', async () => {
        const { getByTestId } = render(<SIDInstrument instrument={BankingCard} metadata={undefined} />);

        expect(getByTestId('non-overdraft-instrument-section')).toBeVisible();
    });
});

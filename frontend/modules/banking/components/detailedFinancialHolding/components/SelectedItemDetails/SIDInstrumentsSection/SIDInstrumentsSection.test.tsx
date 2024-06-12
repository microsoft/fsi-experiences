import React from 'react';
import { render } from '@testing-library/react';
import { getCard, getDirectDebit, getOverDraft, getStandingOrder } from '../FHInstruments.mock';
import SIDInstrumentsSection from './SIDInstrumentsSection';
import { FinancialInstrumentFields } from '../../../../../interfaces/FHEntity';
import { FHMetadataMock } from '../../../../../interfaces/FHEntity/mocks/FHMetadata.mock';

describe('SIDInstrumentsection', () => {
    let standingOrder: FinancialInstrumentFields;
    let directDebit: FinancialInstrumentFields;
    let BankingCard: FinancialInstrumentFields;
    let overdraft: FinancialInstrumentFields;
    let instruments: FinancialInstrumentFields[];

    beforeEach(() => {
        standingOrder = getStandingOrder();
        directDebit = getDirectDebit();
        BankingCard = getCard();
        overdraft = getOverDraft();
        instruments = [standingOrder, directDebit, BankingCard, overdraft];
    });

    it('Should render 4 instruments of each kind', async () => {
        const { queryAllByTestId } = render(<SIDInstrumentsSection data={instruments} metadata={FHMetadataMock} />);

        const nonOverdraftInstruments = queryAllByTestId('non-overdraft-instrument-section');
        const overdraftSection = queryAllByTestId('overdraft-instrument-section');
        expect(nonOverdraftInstruments).toHaveLength(3);
        expect(overdraftSection).toHaveLength(1);
    });

    it('Should render 4 instruments of each kind extended', async () => {
        const { queryAllByTestId } = render(<SIDInstrumentsSection data={instruments} metadata={FHMetadataMock} isExtended />);

        const nonOverdraftInstruments = queryAllByTestId('non-overdraft-instrument-section');
        const overdraftSection = queryAllByTestId('overdraft-instrument-section');
        expect(nonOverdraftInstruments).toHaveLength(3);
        expect(overdraftSection).toHaveLength(1);
    });

    it('Should render 3 instruments and one defected', async () => {
        standingOrder.financialHoldingInstrumentType = undefined;
        const { queryAllByTestId } = render(<SIDInstrumentsSection data={instruments} metadata={FHMetadataMock} />);

        const nonOverdraftInstruments = queryAllByTestId('non-overdraft-instrument-section');
        const overdraftSection = queryAllByTestId('overdraft-instrument-section');
        expect(nonOverdraftInstruments).toHaveLength(2);
        expect(overdraftSection).toHaveLength(1);
    });

    it('Should render all defected instruments', async () => {
        standingOrder.financialHoldingInstrumentType = undefined;
        directDebit.financialHoldingInstrumentType = undefined;
        BankingCard.financialHoldingInstrumentType = undefined;
        overdraft.financialHoldingInstrumentType = undefined;
        const { queryAllByTestId } = render(<SIDInstrumentsSection data={instruments} metadata={FHMetadataMock} />);

        const nonOverdraftInstruments = queryAllByTestId('non-overdraft-instrument-section');
        const overdraftSection = queryAllByTestId('overdraft-instrument-section');
        expect(nonOverdraftInstruments).toHaveLength(0);
        expect(overdraftSection).toHaveLength(0);
    });

    it('Should render empty section', async () => {
        const { queryAllByTestId } = render(<SIDInstrumentsSection data={[]} />);

        const nonOverdraftInstruments = queryAllByTestId('non-overdraft-instrument-section');
        const overdraftSection = queryAllByTestId('overdraft-instrument-section');
        expect(nonOverdraftInstruments).toHaveLength(0);
        expect(overdraftSection).toHaveLength(0);
    });

    it('Should render empty section 2', async () => {
        const { queryAllByTestId } = render(<SIDInstrumentsSection data={undefined} />);

        const nonOverdraftInstruments = queryAllByTestId(/instrument-section/i);
        const overdraftSection = queryAllByTestId(/overdraft-instrument-section/i);
        expect(nonOverdraftInstruments).toHaveLength(0);
        expect(overdraftSection).toHaveLength(0);
    });
});

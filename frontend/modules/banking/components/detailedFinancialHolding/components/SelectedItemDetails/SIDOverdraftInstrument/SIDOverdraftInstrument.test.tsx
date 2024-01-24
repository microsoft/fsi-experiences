import React from 'react';
import { render } from '@testing-library/react';
import { getOverDraft } from '../FHInstruments.mock';
import { SIDOverdraftInstrument } from './SIDOverdraftInstrument';
import { FinancialInstrumentFields } from '../../../../../interfaces/FHEntity/FinancialInstrumentFields';
import { FHMetadataMock } from '../../../../../interfaces/FHEntity/mocks/FHMetadata.mock';

describe('SIDOverdraft', () => {
    let overdraft: FinancialInstrumentFields;

    beforeEach(() => {
        overdraft = getOverDraft();
    });

    it('Should render overdraft section', async () => {
        const overdraftLimit = '2,000';
        const overdraftLimitUsed = '500';
        const overdraftRate = '10%';

        const { getByText, queryAllByText, queryAllByTestId } = render(<SIDOverdraftInstrument instrument={overdraft} metadata={FHMetadataMock} />);

        const databoxLabel = queryAllByTestId(/databox-label-/i);
        const databoxValue = queryAllByTestId(/databox-value-/i);
        expect(databoxLabel).toHaveLength(3);
        expect(databoxValue).toHaveLength(3);

        expect(queryAllByText('USD')).toHaveLength(2);
        expect(getByText(overdraftLimit)).toBeVisible();
        expect(getByText(overdraftLimitUsed)).toBeVisible();
        expect(getByText(overdraftRate)).toBeVisible();
    });

    it('Should render overdraft section with N/As', async () => {
        const na = 'N/A';
        overdraft.fhiOverdraftLimit = undefined;
        overdraft.fhiOverdraftLimitUsed = undefined;
        overdraft.fhiOverdraftRate = undefined;

        const { queryAllByText, queryAllByTestId } = render(<SIDOverdraftInstrument instrument={overdraft} metadata={FHMetadataMock} />);

        const databoxLabel = queryAllByTestId(/databox-label-/i);
        const databoxValue = queryAllByTestId(/databox-value-/i);
        expect(databoxLabel).toHaveLength(3);
        expect(databoxValue).toHaveLength(3);

        expect(queryAllByText(na)).toHaveLength(3);
    });

    it('Should render empty overdraft section', async () => {
        overdraft.financialHoldingInstrumentType = 1;
        const { queryAllByTestId } = render(<SIDOverdraftInstrument instrument={overdraft} metadata={FHMetadataMock} />);

        const databoxLabel = queryAllByTestId(/databox-label-/i);
        const databoxValue = queryAllByTestId(/databox-value-/i);
        expect(databoxLabel).toHaveLength(0);
        expect(databoxValue).toHaveLength(0);
    });

    it('Should render empty overdraft section 2', async () => {
        overdraft.financialHoldingInstrumentType = undefined;
        const { queryAllByTestId } = render(<SIDOverdraftInstrument instrument={overdraft} metadata={FHMetadataMock} />);

        const databoxLabel = queryAllByTestId(/databox-label-/i);
        const databoxValue = queryAllByTestId(/databox-value-/i);
        expect(databoxLabel).toHaveLength(0);
        expect(databoxValue).toHaveLength(0);
    });

    it('Should render without throwing when metadata is missing', async () => {
        const { getByTestId } = render(<SIDOverdraftInstrument instrument={overdraft} metadata={undefined} />);

        expect(getByTestId('overdraft-instrument-section')).toBeVisible();
    });
});

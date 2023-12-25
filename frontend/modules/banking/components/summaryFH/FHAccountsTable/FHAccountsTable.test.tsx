import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { FHAccountsTable } from './FHAccountsTable';
import { EMPTY_STATE_TEXTS_MOCK, getFHMock, INDICATOR_TO_MESSAGE_MOCK } from '../FHData.mock';
import { FHMetadataMock } from '../../../interfaces/FHEntity/mocks/FHMetadata.mock';
import { IndictableFH } from '../../../interfaces/FHEntity/IndictableFH';
import { FH_NAME_TO_CATEGORY_MAP } from '../../../constants/FHValueMaps';
import { IMAGE_SRC } from '@fsi/core-components/dist/constants/ImageSrc';

describe('FHAccountsTable', () => {
    let fhItems: IndictableFH[];

    beforeEach(() => {
        fhItems = getFHMock();
    });

    it('Should render account table with debit card, direct debit and overdraft', async () => {
        const { getByText, queryByTestId } = render(<FHAccountsTable typesOptionSet={FHMetadataMock.types.optionSet} indictableFHItems={fhItems} />);

        expect(queryByTestId(/debit-card-checkbox-/i)).toBeVisible();
        expect(queryByTestId(/direct-debit-checkbox-/i)).toBeVisible();
        expect(queryByTestId(/overdraft-checkbox-/i)).toBeVisible();
        expect(queryByTestId(/standing-order-checkbox-/i)).toContainHTML('-');
        expect(getByText('4ever (Checking)')).toBeVisible();
    });

    it('Should render account table thats saving', async () => {
        fhItems.forEach(value => {
            if (FH_NAME_TO_CATEGORY_MAP['Account']) {
                value.type = 104800010;
            }
        });
        const { getByText, queryByTestId } = render(<FHAccountsTable typesOptionSet={FHMetadataMock.types.optionSet} indictableFHItems={fhItems} />);
        expect(queryByTestId(/debit-card-checkbox-/i)).toBeVisible();
        expect(queryByTestId(/direct-debit-checkbox-/i)).toBeVisible();
        expect(queryByTestId(/overdraft-checkbox-/i)).toBeVisible();
        expect(queryByTestId(/standing-order-checkbox-/i)).toContainHTML('-');
        expect(getByText('4ever (Saving)')).toBeVisible();
    });

    it('Should render account table with standing order instrument', async () => {
        fhItems.forEach(value => {
            if (FH_NAME_TO_CATEGORY_MAP['Account']) {
                value.financialInstruments.push({ financialHoldingInstrumentType: 104800001, financialHoldingInstrumentName: 'test' });
            }
        });
        const { queryByTestId } = render(<FHAccountsTable typesOptionSet={FHMetadataMock.types.optionSet} indictableFHItems={fhItems} />);

        expect(queryByTestId(/standing-order-checkbox-/i)).toBeVisible();
    });

    it('Should render account table with no instruments', async () => {
        fhItems.forEach(value => {
            if (FH_NAME_TO_CATEGORY_MAP['Account']) {
                value.financialInstruments = [];
            }
        });
        const { queryByTestId } = render(<FHAccountsTable typesOptionSet={FHMetadataMock.types.optionSet} indictableFHItems={fhItems} />);

        expect(queryByTestId(/debit-card-checkbox-/i)).toContainHTML('-');
        expect(queryByTestId(/direct-debit-checkbox-/i)).toContainHTML('-');
        expect(queryByTestId(/overdraft-checkbox-/i)).toContainHTML('-');
        expect(queryByTestId(/standing-order-checkbox-/i)).toContainHTML('-');
    });

    it('Should render account table with indicator', async () => {
        const { queryByText, getByText, queryByTestId } = render(
            <FHAccountsTable typesOptionSet={FHMetadataMock.types.optionSet} indictableFHItems={fhItems} />
        );

        const indicatorWrapper = queryByTestId(/indicator-icon-/i);

        expect(indicatorWrapper).toBeVisible();
        expect(queryByText(INDICATOR_TO_MESSAGE_MOCK['Account Blocked Amount'])).toBeNull();

        fireEvent.mouseOver(indicatorWrapper!);
        expect(await getByText(INDICATOR_TO_MESSAGE_MOCK['Account Blocked Amount'])).toBeInTheDocument();
    });

    it('Should render empty state', async () => {
        const { getByText, queryByTestId } = render(<FHAccountsTable typesOptionSet={FHMetadataMock.types.optionSet} indictableFHItems={[]} />);
        const emptyState = queryByTestId(/summary-empty-state-/i);

        expect(emptyState).toBeVisible();
        expect(getByText(EMPTY_STATE_TEXTS_MOCK['Account'])).toBeVisible();

        const displayedImage = document.querySelector('img') as HTMLImageElement;
        expect(displayedImage.src).toContain(IMAGE_SRC.emptyState100);
    });
});

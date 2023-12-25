import React from 'react';
import { render } from '@testing-library/react';
import { FHInvestmentTable } from './FHInvestmentTable';
import { EMPTY_STATE_TEXTS_MOCK, getFHMock } from './FHData.mock';
import { FHMetadataMock } from '../../interfaces/FHEntity/mocks/FHMetadata.mock';
import { IMAGE_SRC } from '@fsi/core-components/dist/constants/ImageSrc';
import { FH_NAME_TO_TYPE_MAP } from '../../constants/FHValueMaps';
import { IndictableFH } from '../../interfaces/FHEntity/IndictableFH';

describe('FHInvestmentTable', () => {
    let fhItems: IndictableFH[];

    beforeEach(() => {
        fhItems = getFHMock();
    });

    it('Should render investments table with brokerage', async () => {
        const { getByText, getAllByTestId } = render(
            <FHInvestmentTable typesOptionSet={FHMetadataMock.types.optionSet} indictableFHItems={fhItems} />
        );

        expect(getByText('Brokerage')).toBeVisible();
        expect(getByText('1,234')).toBeVisible();
        expect(getByText('Discretionary')).toBeVisible();
        expect(getByText('Retirement')).toBeVisible();
        expect(getByText('Education')).toBeVisible();
        expect(getByText('Custodial')).toBeVisible();

        const nonActiveTypes = getAllByTestId(/blue-icon-inactive/i);
        expect(nonActiveTypes).toHaveLength(4);
        expect(nonActiveTypes[0]).toContainHTML('Discretionary');
        expect(nonActiveTypes[1]).toContainHTML('Retirement');
        expect(nonActiveTypes[2]).toContainHTML('Education');
        expect(nonActiveTypes[3]).toContainHTML('Custodial');

        const activeTypes = getAllByTestId(/blue-icon-active/i);
        expect(activeTypes).toHaveLength(1);
        expect(activeTypes[0]).toContainHTML('Brokerage');
    });

    it('Should render investments table with brokerage - compact', async () => {
        const { getByText, getAllByTestId } = render(
            <FHInvestmentTable isCompact typesOptionSet={FHMetadataMock.types.optionSet} indictableFHItems={fhItems} />
        );

        expect(getByText('Brokerage')).toBeVisible();
        expect(getByText('1,234')).toBeVisible();
        expect(getByText('Discretionary')).toBeVisible();
        expect(getByText('Retirement')).toBeVisible();
        expect(getByText('Education')).toBeVisible();
        expect(getByText('Custodial')).toBeVisible();

        const nonActiveTypes = getAllByTestId(/blue-icon-inactive/i);
        expect(nonActiveTypes).toHaveLength(4);
        expect(nonActiveTypes[0]).toContainHTML('Discretionary');
        expect(nonActiveTypes[1]).toContainHTML('Retirement');
        expect(nonActiveTypes[2]).toContainHTML('Education');
        expect(nonActiveTypes[3]).toContainHTML('Custodial');

        const activeTypes = getAllByTestId(/blue-icon-active/i);
        expect(activeTypes).toHaveLength(1);
        expect(activeTypes[0]).toContainHTML('Brokerage');
    });

    it('Should render investment table with education investment', async () => {
        fhItems.forEach(value => {
            if (value.type === FH_NAME_TO_TYPE_MAP['Brokerage']) {
                value.type = FH_NAME_TO_TYPE_MAP['Education'];
            }
        });
        const { getByText, getAllByTestId } = render(
            <FHInvestmentTable typesOptionSet={FHMetadataMock.types.optionSet} indictableFHItems={fhItems} />
        );

        expect(getByText('Education')).toBeVisible();
        expect(getByText('1,234')).toBeVisible();

        const nonActiveTypes = getAllByTestId(/blue-icon-inactive/i);
        expect(nonActiveTypes).toHaveLength(4);
        expect(nonActiveTypes[0]).toContainHTML('Brokerage');
        expect(nonActiveTypes[1]).toContainHTML('Discretionary');
        expect(nonActiveTypes[2]).toContainHTML('Retirement');
        expect(nonActiveTypes[3]).toContainHTML('Custodial');

        const activeTypes = getAllByTestId(/blue-icon-active-/i);
        expect(activeTypes).toHaveLength(1);
        expect(activeTypes[0]).toContainHTML('Education');
    });

    it('Should render investment table with defect type for one FH', async () => {
        fhItems.forEach(value => {
            if (value.type === FH_NAME_TO_TYPE_MAP['Brokerage']) {
                value.type = 0;
            }
        });
        const { queryByText } = render(<FHInvestmentTable typesOptionSet={FHMetadataMock.types.optionSet} indictableFHItems={fhItems} />);

        expect(queryByText('Brokerage')).toBeNull();
        expect(queryByText('1,234')).toBeNull();
    });

    it('Should render empty state', async () => {
        const { getByText, queryByTestId } = render(<FHInvestmentTable typesOptionSet={FHMetadataMock.types.optionSet} indictableFHItems={[]} />);
        const emptyState = queryByTestId(/summary-empty-state-/i);

        expect(emptyState).toBeVisible();
        expect(getByText(EMPTY_STATE_TEXTS_MOCK['Investment'])).toBeVisible();

        const displayedImage = document.querySelector('img') as HTMLImageElement;
        expect(displayedImage.src).toContain(IMAGE_SRC.emptyState100);
    });
});

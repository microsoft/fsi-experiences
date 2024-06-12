import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { FHLongTermSavingTable } from './FHLongTermSavingTable';
import { EMPTY_STATE_TEXTS_MOCK, getFHMock, INDICATOR_TO_MESSAGE_MOCK } from './FHData.mock';
import { FHMetadataMock } from '../../interfaces/FHEntity/mocks/FHMetadata.mock';
import { IMAGE_SRC } from '@fsi/core-components/dist/constants/ImageSrc';
import { FH_NAME_TO_TYPE_MAP } from '../../constants/FHValueMaps';
import { IndictableFH } from '../../interfaces/FHEntity/IndictableFH';
import { OptionSetMap } from '@fsi/core-components/dist/dataLayerInterface/entity/Metadata/OptionSet';
import { formatNumber } from '@fsi/core-components/dist/utilities/NumberUtils';

describe('FHLongTermSavingTable', () => {
    let fhItems: IndictableFH[];

    beforeEach(() => {
        fhItems = getFHMock();
    });

    it('Should render savings table with both types', async () => {
        const { getByText, getAllByTestId, queryAllByTestId } = render(
            <FHLongTermSavingTable typesOptionSet={FHMetadataMock.types.optionSet} indictableFHItems={fhItems} />
        );

        expect(getByText('Deposit')).toBeVisible();
        expect(getByText('Provident fund')).toBeVisible();
        expect(getByText('5,555')).toBeVisible();
        expect(getByText('15,000')).toBeVisible();

        const nonActiveTypes = queryAllByTestId(/blue-icon-inactive/i);
        expect(nonActiveTypes).toHaveLength(0);

        const activeTypes = getAllByTestId(/blue-icon-active/i);
        expect(activeTypes).toHaveLength(2);
        expect(activeTypes[0].lastChild?.textContent).toEqual('Deposit');
        expect(activeTypes[1].lastChild?.textContent).toEqual('Provident fund');
    });

    it('Should render savings table with both types - compact', async () => {
        const { getByText, getAllByTestId, queryAllByTestId } = render(
            <FHLongTermSavingTable isCompact typesOptionSet={FHMetadataMock.types.optionSet} indictableFHItems={fhItems} />
        );

        expect(getByText('Deposit')).toBeVisible();
        expect(getByText('Provident fund')).toBeVisible();
        expect(getByText('5,555')).toBeVisible();
        expect(getByText('15,000')).toBeVisible();

        const nonActiveTypes = queryAllByTestId(/blue-icon-inactive/i);
        expect(nonActiveTypes).toHaveLength(0);

        const activeTypes = getAllByTestId(/blue-icon-active/i);
        expect(activeTypes).toHaveLength(2);
        expect(activeTypes[0]).toContainHTML('Deposit');
        expect(activeTypes[1]).toContainHTML('Provident fund');
    });

    it('Should render savings table with indicators', async () => {
        const withoutTimeSensitiveIndicators = fhItems.map(fh => {
            fh.indicator = fh.indicator.filter(indicator => {
                return indicator.type() !== 'timeSensitive';
            });
            return fh;
        });
        const { queryByText, getByText, queryAllByTestId } = render(
            <FHLongTermSavingTable typesOptionSet={FHMetadataMock.types.optionSet} indictableFHItems={withoutTimeSensitiveIndicators} />
        );

        const indicatorWrapper = queryAllByTestId(/indicator-icon-/i)[0];

        expect(indicatorWrapper).toBeVisible();
        expect(queryByText(INDICATOR_TO_MESSAGE_MOCK['Savings Blocked'])).toBeNull();

        fireEvent.mouseOver(indicatorWrapper!);
        await waitFor(() => {
            expect(getByText(INDICATOR_TO_MESSAGE_MOCK['Savings Blocked'])).toBeInTheDocument();
        });
    });

    it('Should render savings table with custom type for one FH', async () => {
        let sum = 0;
        fhItems.forEach(value => {
            if (value.type === FH_NAME_TO_TYPE_MAP.Deposit) {
                value.type = 105800001;
                sum += value.balanceDefault;
            }
        });
        const customOptionSet: OptionSetMap = {
            ...FHMetadataMock.types.optionSet,
            105800001: {
                text: 'Custom type',
                value: 105800001,
            },
        };
        const { queryAllByTestId, getByText } = render(<FHLongTermSavingTable typesOptionSet={customOptionSet} indictableFHItems={fhItems} />);

        const nonActiveTypes = queryAllByTestId(/blue-icon-inactive/i);
        expect(nonActiveTypes).toHaveLength(1);
        expect(getByText('Custom type')).toBeVisible();
        expect(getByText(formatNumber(sum))).toBeVisible();
    });

    it('Should render savings table with custom type for one FH 2', async () => {
        let sum = 0;
        fhItems.forEach(value => {
            if (value.type === FH_NAME_TO_TYPE_MAP.Deposit) {
                value.type = 105800001;
                sum += value.balanceDefault;
            }
        });
        const { queryAllByTestId, getByText } = render(
            <FHLongTermSavingTable typesOptionSet={FHMetadataMock.types.optionSet} indictableFHItems={fhItems} />
        );

        const nonActiveTypes = queryAllByTestId(/blue-icon-inactive/i);
        expect(nonActiveTypes).toHaveLength(1);
        expect(getByText(formatNumber(sum))).toBeVisible();
    });

    it('Should render empty state', async () => {
        const { getByText, queryByTestId } = render(<FHLongTermSavingTable typesOptionSet={FHMetadataMock.types.optionSet} indictableFHItems={[]} />);
        const emptyState = queryByTestId(/summary-empty-state-/i);

        expect(emptyState).toBeVisible();
        expect(getByText(EMPTY_STATE_TEXTS_MOCK['Saving'])).toBeVisible();

        const displayedImage = document.querySelector('img') as HTMLImageElement;
        expect(displayedImage.src).toContain(IMAGE_SRC.emptyState100);
    });
});

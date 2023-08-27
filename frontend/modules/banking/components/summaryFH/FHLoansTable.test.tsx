import React from 'react';
import { render } from '@testing-library/react';
import { FHLoansTable } from './FHLoansTable';
import { EMPTY_STATE_TEXTS_MOCK, getFHMock } from './FHData.mock';
import { FHMetadataMock } from '../../interfaces/FHEntity/mocks/FHMetadata.mock';
import { IMAGE_SRC } from '@fsi/core-components/dist/constants/ImageSrc';
import { IndictableFH } from '../../interfaces/FHEntity/IndictableFH';
import { FH_NAME_TO_TYPE_MAP } from '../../constants/FHValueMaps';
import { OptionSetMap } from '@fsi/core-components/dist/dataLayerInterface/entity/Metadata/OptionSet';

describe('FHLoansTable', () => {
    let fhItems: IndictableFH[];

    beforeEach(() => {
        fhItems = getFHMock();
    });

    it('Should render loans table with secured loan', async () => {
        const { getByText, getAllByTestId } = render(<FHLoansTable typesOptionSet={FHMetadataMock.types.optionSet} indictableFHItems={fhItems} />);

        expect(getByText('Secured')).toBeVisible();
        expect(getByText('7,245')).toBeVisible();
        expect(getByText('Unsecured')).toBeVisible();
        expect(getByText('Mortgage')).toBeVisible();

        const nonActiveTypes = getAllByTestId(/blue-icon-inactive/i);
        expect(nonActiveTypes).toHaveLength(2);
        expect(nonActiveTypes[0].lastChild?.textContent).toEqual('Mortgage');
        expect(nonActiveTypes[1].lastChild?.textContent).toEqual('Unsecured');

        const activeTypes = getAllByTestId(/blue-icon-active-/i);
        expect(activeTypes).toHaveLength(1);
        expect(activeTypes[0].lastChild?.textContent).toEqual('Secured');
    });
    it('Should render loans table with secured loan -compact', async () => {
        const { getByText, getAllByTestId } = render(
            <FHLoansTable isCompact typesOptionSet={FHMetadataMock.types.optionSet} indictableFHItems={fhItems} />
        );

        expect(getByText('Secured')).toBeVisible();
        expect(getByText('7,245')).toBeVisible();
        expect(getByText('Unsecured')).toBeVisible();
        expect(getByText('Mortgage')).toBeVisible();

        const nonActiveTypes = getAllByTestId(/blue-icon-inactive/i);
        expect(nonActiveTypes).toHaveLength(2);
        expect(nonActiveTypes[0]).toContainHTML('Mortgage');
        expect(nonActiveTypes[1]).toContainHTML('Unsecured');

        const activeTypes = getAllByTestId(/blue-icon-active-/i);
        expect(activeTypes).toHaveLength(1);
        expect(activeTypes[0]).toContainHTML('Secured');
    });

    it('Should render loans table with unsecured loan', async () => {
        fhItems.forEach(value => {
            if (value.type === FH_NAME_TO_TYPE_MAP.Secured) {
                value.type = FH_NAME_TO_TYPE_MAP.Unsecured;
            }
        });
        const { getByText, getAllByTestId } = render(<FHLoansTable typesOptionSet={FHMetadataMock.types.optionSet} indictableFHItems={fhItems} />);

        expect(getByText('Unsecured')).toBeVisible();
        expect(getByText('7,245')).toBeVisible();

        const nonActiveTypes = getAllByTestId(/blue-icon-inactive/i);
        expect(nonActiveTypes).toHaveLength(2);
        expect(nonActiveTypes[0]).toContainHTML('Mortgage');
        expect(nonActiveTypes[1]).toContainHTML('Secured');

        const activeTypes = getAllByTestId(/blue-icon-active-/i);
        expect(activeTypes).toHaveLength(1);
        expect(activeTypes[0]).toContainHTML('Unsecured');
    });

    it('Should render loans table with mortgage loan', async () => {
        fhItems.forEach(value => {
            if (value.type === FH_NAME_TO_TYPE_MAP.Secured) {
                value.type = FH_NAME_TO_TYPE_MAP.Mortgage;
            }
        });
        const { getByText, getAllByTestId } = render(<FHLoansTable typesOptionSet={FHMetadataMock.types.optionSet} indictableFHItems={fhItems} />);

        expect(getByText('Mortgage')).toBeVisible();
        expect(getByText('7,245')).toBeVisible();

        const nonActiveTypes = getAllByTestId(/blue-icon-inactive/i);
        expect(nonActiveTypes).toHaveLength(2);
        expect(nonActiveTypes[0].lastChild?.textContent).toEqual('Secured');
        expect(nonActiveTypes[1].lastChild?.textContent).toEqual('Unsecured');

        const activeTypes = getAllByTestId(/blue-icon-active-/i);
        expect(activeTypes).toHaveLength(1);
        expect(activeTypes[0].lastChild?.textContent).toEqual('Mortgage');
    });

    it('Should render loans table with custom type for one FH', async () => {
        fhItems.forEach(value => {
            if (value.type === FH_NAME_TO_TYPE_MAP.Secured) {
                value.type = 105800001;
            }
        });
        const customOptionSet: OptionSetMap = {
            ...FHMetadataMock.types.optionSet,
            105800001: {
                text: 'Custom type',
                value: 105800001,
            },
        };
        const { getByText } = render(<FHLoansTable typesOptionSet={customOptionSet} indictableFHItems={fhItems} />);

        expect(getByText('Custom type')).toBeVisible();
        expect(getByText('7,245')).toBeVisible();
    });

    it('Should render loans table with custom type without option set', async () => {
        fhItems.forEach(value => {
            if (value.type === FH_NAME_TO_TYPE_MAP.Secured) {
                value.type = 105800001;
            }
        });
        const { queryByText, getByText } = render(<FHLoansTable typesOptionSet={FHMetadataMock.types.optionSet} indictableFHItems={fhItems} />);

        expect(queryByText('Custom type')).toBeNull();
        expect(getByText('7,245')).toBeVisible();
    });

    it('Should render empty state', async () => {
        const { getByText, queryByTestId } = render(<FHLoansTable typesOptionSet={FHMetadataMock.types.optionSet} indictableFHItems={[]} />);
        const emptyState = queryByTestId(/summary-empty-state-/i);

        expect(emptyState).toBeVisible();
        expect(getByText(EMPTY_STATE_TEXTS_MOCK['Loan'])).toBeVisible();

        const displayedImage = document.querySelector('img') as HTMLImageElement;
        expect(displayedImage.src).toContain(IMAGE_SRC.emptyState100);
    });
});

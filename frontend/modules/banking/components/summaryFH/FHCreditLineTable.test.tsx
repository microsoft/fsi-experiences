import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { FHCreditLinesTable } from './FHCreditLineTable';
import { EMPTY_STATE_TEXTS_MOCK, getFHMock, INDICATOR_TO_MESSAGE_MOCK, getFHMapMock } from './FHData.mock';
import { FHMetadataMock } from '../../interfaces/FHEntity/mocks/FHMetadata.mock';
import { IMAGE_SRC } from '@fsi/core-components/dist/constants/ImageSrc';
import { FH_NAME_TO_CATEGORY_MAP } from '../../constants/FHValueMaps';
import { IndictableFH } from '../../interfaces/FHEntity/IndictableFH';
import { toIndictableFinancialHoldings } from '../../hooks/financialHoldings/useFHIndicator';

describe('FH credit line table Widget', () => {
    let fhItems: IndictableFH[];

    beforeAll(() => {
        fhItems = getFHMock();
    });

    it('Should render credit line table', async () => {
        const { getByText } = render(<FHCreditLinesTable typesOptionSet={FHMetadataMock.types.optionSet} indictableFHItems={fhItems} />);

        expect(getByText('rock st3r')).toBeVisible();
        expect(getByText('1,000')).toBeVisible();
    });

    it('Should render credit line table - compact', async () => {
        const { getByText } = render(<FHCreditLinesTable isCompact typesOptionSet={FHMetadataMock.types.optionSet} indictableFHItems={fhItems} />);

        expect(getByText('rock st3r')).toBeVisible();
        expect(getByText('1,000')).toBeVisible();
    });

    it('Should render credit line table with indicator', async () => {
        const mockedFHMap = getFHMapMock();

        mockedFHMap.forEach((value, key) => {
            if (value.category === FH_NAME_TO_CATEGORY_MAP['Credit']) {
                value.balance = 1000;
                value.balanceDisplay = 1000;
            }
        });

        const testItems = toIndictableFinancialHoldings({ data: mockedFHMap }, FHMetadataMock);
        const { queryByText, getByText, queryByTestId } = render(
            <FHCreditLinesTable typesOptionSet={FHMetadataMock.types.optionSet} indictableFHItems={testItems} />
        );

        const indicatorWrapper = queryByTestId(/indicator-icon-/i);

        expect(indicatorWrapper).toBeVisible();
        expect(queryByText(INDICATOR_TO_MESSAGE_MOCK['Credit Outstanding Balance'])).toBeNull();

        fireEvent.mouseOver(indicatorWrapper!);
        expect(await getByText(INDICATOR_TO_MESSAGE_MOCK['Credit Outstanding Balance'])).toBeInTheDocument();
    });

    it('Should render empty state', async () => {
        const { getByText, queryByTestId } = render(<FHCreditLinesTable typesOptionSet={FHMetadataMock.types.optionSet} indictableFHItems={[]} />);
        const emptyState = queryByTestId(/summary-empty-state-/i);

        expect(emptyState).toBeVisible();
        expect(getByText(EMPTY_STATE_TEXTS_MOCK['Credit'])).toBeVisible();

        const displayedImage = document.querySelector('img') as HTMLImageElement;
        expect(displayedImage.src).toContain(IMAGE_SRC.emptyState100);
    });
});

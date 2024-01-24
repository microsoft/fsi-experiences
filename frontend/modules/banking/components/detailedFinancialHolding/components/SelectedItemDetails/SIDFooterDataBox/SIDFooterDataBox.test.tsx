import React from 'react';
import { render } from '@testing-library/react';
import SIDFooterDataBox from './SIDFooterDataBox';
import { FontSizes, FontWeights } from '@fluentui/react/lib/Styling';
import { FHDataBoxDetails, FHDataBoxType } from '../../FHDataBox';

describe('SIDFooterDataBox', () => {
    let dataBoxMock;
    const bookBalance = 'BOOK BALANCE';
    const footer = 'some footer';
    const value = '$1000';

    beforeAll(() => {
        const boxDetails: FHDataBoxDetails = {
            type: FHDataBoxType.Text,
            label: bookBalance,
            value: value,
            footer: { type: FHDataBoxType.Text, value: footer },
        };
        dataBoxMock = { boxDetails: boxDetails };
    });

    it('Should render footer data box with default values', async () => {
        const { getByText, queryByTestId } = render(<SIDFooterDataBox boxDetails={dataBoxMock.boxDetails} />);

        const databox = queryByTestId(/footer-sid-databox/i);
        expect(databox).toBeVisible();
        const databoxValue = queryByTestId(/databox-value-/i);
        expect(databoxValue).toBeVisible();
        expect(databoxValue).toHaveStyle({ fontSize: FontSizes.size16, fontWeight: FontWeights.regular });

        expect(getByText(bookBalance)).toBeVisible();
        expect(getByText(value)).toBeVisible();
        expect(getByText(footer)).toBeVisible();
    });

    it('Should render footer data box in specific styling', async () => {
        const { getByText, queryByTestId } = render(<SIDFooterDataBox boxDetails={dataBoxMock.boxDetails} fontSize={'14px'} />);

        const databox = queryByTestId(/footer-sid-databox/i);
        expect(databox).toBeVisible();
        const databoxValue = queryByTestId(/databox-value-/i);
        expect(databoxValue).toBeVisible();
        expect(databoxValue).toHaveStyle({ fontSize: FontSizes.size14, fontWeight: FontWeights.regular });

        expect(getByText(bookBalance)).toBeVisible();
        expect(getByText(value)).toBeVisible();
        expect(getByText(footer)).toBeVisible();
    });
});

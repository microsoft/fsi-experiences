import React from 'react';
import { render } from '@testing-library/react';
import DataBox from './DataBox';
import { FontSizes, FontWeights } from '@fluentui/react/lib/Styling';
import { COLORS } from '../../../constants/Colors';
import { IBoxDetails, IDataBoxProps } from './DataBox.interface';

describe('DataBox', () => {
    let dataBoxProps: IDataBoxProps;
    const bookBalance = 'BOOK BALANCE';
    const footer = 'some footer';
    const value = '$1000';

    beforeEach(() => {
        const boxDetails: IBoxDetails = { label: bookBalance, value: value };
        dataBoxProps = {
            boxDetails: boxDetails,
            styles: { root: { fontSize: FontSizes.size20, fontWeight: FontWeights.semibold } },
        };
    });

    it('Should render data box in blue color', async () => {
        const { getByText, queryByTestId } = render(<DataBox {...dataBoxProps} />);

        const databoxLabel = queryByTestId(/databox-label-/i);
        const databoxValue = queryByTestId(/databox-value-/i);
        const databoxFooter = queryByTestId(/databox-footer-/i);
        expect(databoxLabel).toBeVisible();
        expect(databoxValue).toBeVisible();
        expect(databoxFooter).toBeNull();
        expect(databoxLabel).toHaveStyle({ color: COLORS.darkGray, overflow: 'hidden', textOverflow: 'ellipsis' });
        expect(databoxValue).toHaveStyle({ fontSize: FontSizes.size20, fontWeight: FontWeights.semibold, color: COLORS.primaryTagText });

        expect(getByText(bookBalance)).toBeVisible();
        expect(getByText(value)).toBeVisible();
    });

    it('Should render data box in red color and footer', async () => {
        dataBoxProps.boxDetails.labelColor = 'black';
        dataBoxProps.boxDetails.footer = footer;

        const { getByText, queryByTestId } = render(<DataBox {...dataBoxProps} />);

        const databoxLabel = queryByTestId(/databox-label-/i);
        const databoxValue = queryByTestId(/databox-value-/i);
        const databoxFooter = queryByTestId(/databox-footer-/i);
        expect(databoxLabel).toBeVisible();
        expect(databoxValue).toBeVisible();
        expect(databoxFooter).toBeVisible();
        expect(databoxFooter).toHaveStyle({ fontSize: `12px`, lineHeight: '16px', textAlign: 'start' });

        expect(getByText(bookBalance)).toBeVisible();
        expect(getByText(value)).toBeVisible();
        expect(getByText(footer)).toBeVisible();
    });

    it('Should render data box with render value/footer function', async () => {
        dataBoxProps.boxDetails.footer = footer;
        dataBoxProps.valueRender = value => <span data-testid="value-renderer">{value}</span>;
        dataBoxProps.footerRender = footer => <span data-testid="footer-renderer">{footer}</span>;

        const { queryByTestId, getByText } = render(<DataBox {...dataBoxProps} />);

        expect(queryByTestId('value-renderer')).toBeVisible();
        expect(queryByTestId('footer-renderer')).toBeVisible();
        expect(getByText(value)).toBeVisible();
        expect(getByText(footer)).toBeVisible();
    });

    it('Should render undefined data box', async () => {
        dataBoxProps.boxDetails.value = undefined;
        const { getByText, queryByTestId } = render(<DataBox {...dataBoxProps} />);

        const databoxLabel = queryByTestId(/databox-label-/i);
        const databoxValue = queryByTestId(/databox-value-/i);
        expect(databoxLabel).toBeVisible();
        expect(databoxValue).toBeVisible();

        expect(getByText(bookBalance)).toBeVisible();
        expect(getByText('N/A')).toBeVisible();
    });

    it('Should render data box with children instead of default text component', async () => {
        const { queryByTestId } = render(
            <DataBox {...dataBoxProps}>
                <div data-testid="children">children</div>
            </DataBox>
        );

        const databoxLabel = queryByTestId(/databox-label-/i);
        const databoxValue = queryByTestId(/databox-value-/i);
        const databoxChildren = queryByTestId('children');

        expect(databoxLabel).toBeVisible();
        expect(databoxChildren).toBeVisible();
        expect(databoxValue).toBeNull();
    });
});

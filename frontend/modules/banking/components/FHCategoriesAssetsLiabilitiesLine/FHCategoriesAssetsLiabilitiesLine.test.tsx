import React from 'react';
import { render, within } from '@testing-library/react';
import FHCategoriesAssetsLiabilitiesLine from './FHCategoriesAssetsLiabilitiesLine';
import { IFHCategoriesAssetsLiabilitiesLineProps } from './FHCategoriesAssetsLiabilitiesLine.interface';

describe('FHCategoriesAssetsLiabilitiesLine', () => {
    it('should render two lines - assets and liabilities', () => {
        const { queryAllByTestId, getByTestId, getByText } = render(<FHCategoriesAssetsLiabilitiesLine {...params} />);

        expect(queryAllByTestId('vertical-line-component')).toHaveLength(2);
        expect(getByText(assetsText)).toBeVisible();
        expect(getByText(liabilitiesText)).toBeVisible();

        const assetsLegend = getByTestId('Assets-legend');
        const liabilitiesLegend = getByTestId('Liabilities-legend');
        expect(within(assetsLegend).getByText('1,000')).toBeVisible();
        expect(within(liabilitiesLegend).getByText('5,000')).toBeVisible();
    });

    it('should render only assets line', () => {
        const currParams = { assets: 1000, liabilities: 0 };
        const { queryAllByTestId, getByText, queryByText, getByTestId } = render(<FHCategoriesAssetsLiabilitiesLine {...currParams} />);

        expect(queryAllByTestId('vertical-line-component')).toHaveLength(1);
        expect(getByText(assetsText)).toBeVisible();
        expect(queryByText(liabilitiesText)).toBeVisible();

        const liabilitiesLegend = getByTestId('Liabilities-legend');
        expect(within(liabilitiesLegend).getByText('0')).toBeVisible();
    });

    it('should render with base currency indication', () => {
        const { queryAllByTestId, getByText, queryByText } = render(<FHCategoriesAssetsLiabilitiesLine {...params} showCurrency={true} />);

        expect(queryAllByTestId('vertical-line-component')).toHaveLength(2);
        expect(getByText('USD')).toBeVisible();
        expect(getByText(assetsText)).toBeVisible();
        expect(queryByText(liabilitiesText)).toBeVisible();
    });

    const params: IFHCategoriesAssetsLiabilitiesLineProps = {
        assets: 1000,
        liabilities: 5000,
    };
    const assetsText = 'Assets';
    const liabilitiesText = 'Liabilities';
});

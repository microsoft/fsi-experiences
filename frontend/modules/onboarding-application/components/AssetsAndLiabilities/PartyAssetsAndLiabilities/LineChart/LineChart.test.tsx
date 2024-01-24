import { render } from '@testing-library/react';
import React from 'react';
import LineChart from './LineChart';

describe('PartyAssetsLiabilities - LineChart', () => {
    it('Should render LineChart', () => {
        const { getByTestId, getByText } = render(<LineChart color="black" value={50233} percent={0.3} />);
        expect(getByTestId('line-chart-component')).toHaveStyle({ flex: 0.3 });
        expect(getByText('50,233')).toBeInTheDocument();
    });

    it('Should visually hide <CurrencyCode> component when hideCurrencyCode property is provided', () => {
        const { getByTestId } = render(<LineChart color="black" value={50233} percent={0.3} hideCurrencyCode />);
        expect(getByTestId('currency-code')).toHaveStyle({
            position: 'fixed',
            overflow: 'hidden',
            clip: 'rect(1px, 1px, 1px, 1px)',
            width: '1px',
            height: '1px',
            whiteSpace: 'nowrap',
        });
    });
});

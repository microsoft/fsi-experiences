import React from 'react';
import { render } from '@testing-library/react';
import CustomerIndicator from './CustomerIndicator';

const mockData = {
    value: 100,
    label: 'label!',
    staleness: new Date('2022-03-08'),
    currencyId: 'USD',
};

describe('Indicators', () => {
    it('Should render Indicators', () => {
        const { getByText } = render(<CustomerIndicator {...mockData} />);

        expect(getByText('100.00')).toBeVisible();
        expect(getByText(mockData.label)).toBeVisible();
        expect(getByText('USD')).toBeVisible();
        expect(getByText(mockData.staleness.toLocaleDateString())).toBeVisible();
    });

    it('Should render Indicators without staleness,currencyId', () => {
        const { getByText } = render(<CustomerIndicator value={mockData.value} label={mockData.label} />);

        expect(getByText(mockData.value)).toBeVisible();
        expect(getByText(mockData.value)).not.toHaveAttribute('staleness');
    });
});

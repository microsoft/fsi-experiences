import React from 'react';
import { render } from '@testing-library/react';
import LegendItem from './LegendItem';
import { ILegendItemStyles } from './LegendItem.interface';

describe('LegendItem', () => {
    it('should render legend item correctly', () => {
        const { getByTestId, getByText } = render(<LegendItem color="red" label="test" />);

        expect(getByTestId(`legend-category-color-test`)).toHaveStyle({ backgroundColor: 'red' });
        expect(getByText('test')).toBeVisible();
    });

    it('should render legend item with different style', () => {
        const styles: ILegendItemStyles = {
            label: {
                fontSize: '20px',
            },
            marker: {
                borderRadius: '10px',
            },
        };
        const { getByTestId, getByText } = render(<LegendItem color="red" label="test" styles={styles} />);

        expect(getByTestId(`legend-category-color-test`)).toHaveStyle({ borderRadius: '10px' });

        expect(getByText('test')).toHaveStyle({ fontSize: '20px' });
    });
});

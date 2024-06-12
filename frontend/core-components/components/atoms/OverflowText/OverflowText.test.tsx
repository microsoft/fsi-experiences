import React from 'react';
import { render } from '@testing-library/react';
import OverflowText from './OverflowText';

describe('OverflowText', () => {
    it('should render text', () => {
        const { getByText } = render(<OverflowText text="overflow text" />);

        expect(getByText('overflow text')).toBeVisible();
    });

    it('should render text with tooltip host styles', async () => {
        const { getByText } = render(<OverflowText styles={{ root: { color: 'red' } }} text="overflow text" />);
        const text = getByText('overflow text');

        expect(text).toBeVisible();
        expect(text).toHaveStyle({
            color: 'red',
            textOverflow: 'ellipsis',
        });
    });
});

import React from 'react';
import { render } from '@testing-library/react';
import FocusIndicator from './FocusIndicator';

describe('LifeEvent FocusIndicator', () => {
    it('Should change visibility according to hide flag', () => {
        const { container, rerender } = render(<FocusIndicator hide={true} />);

        expect(container.querySelector('div')).not.toBeVisible();

        rerender(<FocusIndicator hide={false} />);

        expect(container.querySelector('div')).toBeVisible();
    });
});

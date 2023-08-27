import React from 'react';
import { render } from '@testing-library/react';
import Divider from './Divider';

describe('Divider', () => {
    it('should render divider', () => {
        const { container } = render(<Divider />);

        expect(container).toBeInTheDocument();
    });
});

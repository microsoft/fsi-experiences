import React from 'react';
import { render } from '@testing-library/react';
import ListSearchBox from './ListSearchBox';

describe('ListSearchBox', () => {
    it('should render component', () => {
        const { container } = render(<ListSearchBox />);

        expect(container).toBeInTheDocument();
    });
});

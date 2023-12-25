import React from 'react';
import { render } from '@testing-library/react';
import Search from './Search';
import queueStrings from '../../assets/strings/Queue/Queue.1033.json';

describe('Search', () => {
    const mockProps = {
        wrapperAriaAttributes: { 'aria-label': queueStrings.QUEUE_SEARCH_WRAPPER_ARIA_LABEL_TEXT },
    };

    it('should render component', () => {
        const { container } = render(<Search {...mockProps} />);

        expect(container).toBeInTheDocument();
    });

    it('should change role attribute', () => {
        const { getByRole } = render(<Search {...mockProps} wrapperRole="presentation" />);

        expect(getByRole('presentation')).toBeInTheDocument();
    });
});

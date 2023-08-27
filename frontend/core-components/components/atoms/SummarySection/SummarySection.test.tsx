import React from 'react';
import { render } from '@testing-library/react';
import SummarySection from './SummarySection';

const mockProps = {
    title: 'Test',
};

describe('SummarySection', () => {
    it('should render section', () => {
        const { container } = render(<SummarySection {...mockProps} />);

        expect(container).toBeInTheDocument();
    });

    it('should render without icon', () => {
        const { queryByTestId } = render(<SummarySection {...mockProps} />);

        expect(queryByTestId('summary-section-icon')).toBeNull();
    });

    it('should render without sub', () => {
        const { getByTestId } = render(<SummarySection {...mockProps} />);

        expect(getByTestId('summary-section-subinfo').children.length).toBe(0);
    });

    it('should render with sub info broken into lines', () => {
        const props = {
            ...mockProps,
            subtitle: 'Line 1\nLine 2',
        };
        const { getByTestId } = render(<SummarySection {...props} />);
        const subinfo = getByTestId('summary-section-subinfo').children;
        expect(subinfo.length).toBe(2);
        expect(subinfo[0].textContent).toBe('Line 1');
        expect(subinfo[1].textContent).toBe('Line 2');
    });

    it('should render icon', () => {
        const props = {
            ...mockProps,
            icon: 'savings',
        };
        const { getByTestId } = render(<SummarySection {...props} />);

        expect(getByTestId('summary-section-icon')).toBeVisible();
    });
});

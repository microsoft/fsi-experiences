import React from 'react';
import { render } from '@testing-library/react';
import LoanEntityWidget from './LoanEntityWidget';

const mockGetCurrentAppUrl = jest.fn(() => 'https://example.com');

describe('LoanEntityWidget', () => {
    it('should render component', () => {
        // eslint-disable-next-line no-undef
        (global as any).Xrm = {
            Utility: {
                getGlobalContext: () => ({
                    getCurrentAppUrl: mockGetCurrentAppUrl,
                }),
            },
        };

        const { container } = render(<LoanEntityWidget />);

        expect(container).toBeInTheDocument();
        expect(mockGetCurrentAppUrl).toBeCalled();
    });
});

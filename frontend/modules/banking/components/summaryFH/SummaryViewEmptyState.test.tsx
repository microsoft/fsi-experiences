import React from 'react';
import { render } from '@testing-library/react';
import SummaryViewEmptyState from './SummaryViewEmptyState';
import { IMAGE_SRC } from '@fsi/core-components/dist/constants';

describe('Empty state for summary FH', () => {
    it('Should render empty state', async () => {
        const emptyString = 'No owned financial holdings';
        const { getByText, queryByTestId } = render(<SummaryViewEmptyState text={emptyString} />);

        expect(queryByTestId(/summary-empty-state-/i)).toBeVisible();
        expect(getByText(emptyString)).toBeVisible();

        const displayedImage = document.querySelector('img') as HTMLImageElement;
        expect(displayedImage.src).toContain(IMAGE_SRC.emptyState100);
    });

    it('Should render empty state with selected image', async () => {
        const emptyString = 'No owned financial holdings';
        const { getByText, queryByTestId } = render(<SummaryViewEmptyState text={emptyString} image={IMAGE_SRC.no_access100} />);

        expect(queryByTestId(/summary-empty-state-/i)).toBeVisible();
        expect(getByText(emptyString)).toBeVisible();

        const displayedImage = document.querySelector('img') as HTMLImageElement;
        expect(displayedImage.src).toContain(IMAGE_SRC.no_access100);
    });
});

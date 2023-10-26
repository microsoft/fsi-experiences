import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import InfoCallout from './InfoCallout';

describe('InfoCallout', () => {
    it('should render icon info with basic callout functionality', async () => {
        const { queryByTestId, queryByText, getByRole } = render(<InfoCallout>TEST</InfoCallout>);

        expect(queryByTestId('info-callout-icon')).toBeVisible();
        expect(queryByText('TEST')).toBeNull();

        fireEvent.click(getByRole('button'));

        waitFor(() => expect(queryByText('TEST')).toBeVisible());
    });

    it('should render callout with styles and aria label', async () => {
        const { queryByText, getByLabelText, getByText } = render(
            <InfoCallout calloutStyles={{ root: { '.inner-callout-div': { color: 'red' } } }} iconAriaLabel="Test icon aria">
                <div className="inner-callout-div">TEST</div>
            </InfoCallout>
        );

        expect(getByLabelText('Test icon aria')).toBeVisible();

        fireEvent.click(getByLabelText('Test icon aria'));

        waitFor(() => expect(queryByText('TEST')).toBeVisible());
        expect(getByText('TEST')).toHaveStyle({ color: 'red' });
    });
});

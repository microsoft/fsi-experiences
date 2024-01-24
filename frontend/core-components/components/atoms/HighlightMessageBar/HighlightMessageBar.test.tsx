import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import HighlightMessageBar from './HighlightMessageBar';
import { FontWeights } from '@fluentui/react/lib/Styling';
import { MessageBarType } from '@fluentui/react';

describe('HighlightMessageBar', () => {
    it('should render Message bar with regular text only', async () => {
        render(<HighlightMessageBar regular="regular" styles={{}} />);
        await waitFor(() => expect(screen.getByText('regular')).toBeVisible());
    });

    it('should render Message bar with highlight text only', async () => {
        render(<HighlightMessageBar highlight="highlight" />);
        await waitFor(() => expect(screen.getByText('highlight')).toBeVisible());
        expect(screen.getByText('highlight')).toHaveStyle({
            fontWeight: FontWeights.semibold,
        });
    });

    it('should render Message bar with highlight text and regular text', async () => {
        render(<HighlightMessageBar highlight="highlight" regular="regular" />);
        await waitFor(() => expect(screen.getByText('highlight')).toBeVisible());
        expect(screen.getByText('highlight')).toHaveStyle({
            fontWeight: FontWeights.semibold,
        });
        expect(screen.getByText('regular')).toBeVisible();
    });

    it('should render Message bar with error type', async () => {
        const { container } = render(<HighlightMessageBar messageBarType={MessageBarType.error} regular="regular" />);
        await waitFor(() => expect(screen.getByText('regular')).toBeVisible());
        expect(container.getElementsByClassName('ms-MessageBar--error')).toHaveLength(1);
    });
});

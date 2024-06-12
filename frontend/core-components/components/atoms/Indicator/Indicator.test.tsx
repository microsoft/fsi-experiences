import React from 'react';
import { screen, render, waitFor } from '@testing-library/react';
import Indicator from './Indicator';
import userEvent from '@testing-library/user-event';

describe('Indicator', () => {
    it('Should render indicator without tooltip', async () => {
        render(<Indicator iconName="warning" />);

        expect(screen.getByTestId('indicator-icon-warning')).toBeVisible();
    });

    it('Should render indicator with size and color', async () => {
        render(<Indicator iconName="warning" size={20} color="red" />);

        const icon = screen.getByTestId('indicator-icon-warning');
        expect(icon).toBeVisible();
        expect(icon.getElementsByTagName('i')[0]).toHaveStyle({ color: 'red', fontSize: 20 });
    });

    it('Should render indicator with tooltip text', async () => {
        const { getByRole } = render(<Indicator iconName="warning" tooltipProps={{ content: 'test' }} />);

        const icon = screen.getByTestId('indicator-icon-warning');
        expect(icon).toBeVisible();
        userEvent.hover(icon);
        await waitFor(() => expect(getByRole('tooltip')).toBeInTheDocument());

        expect(getByRole('tooltip')).toContainHTML('test');
    });

    it('Should render indicator with icon aria label', async () => {
        const { getByLabelText } = render(<Indicator iconName="warning" tooltipProps={{ content: 'test' }} iconAriaLabel="warning indicator" />);

        const icon = screen.getByTestId('indicator-icon-warning');
        expect(icon).toBeVisible();
        expect(getByLabelText('warning indicator')).toBeVisible();
    });

    it('Should render indicator with different button styles', async () => {
        const { getByRole } = render(<Indicator iconName="info" size={20} color="red" buttonStyles={{ root: { opacity: 0.5 } }} />);

        const icon = screen.getByTestId('indicator-icon-info');
        expect(icon).toBeVisible();
        expect(icon.getElementsByTagName('i')[0]).toHaveStyle({ color: 'red', fontSize: 20 });
        expect(getByRole('button')).toHaveStyle({ opacity: 0.5 });
    });
});

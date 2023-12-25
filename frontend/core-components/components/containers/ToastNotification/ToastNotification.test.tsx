import React from 'react';
import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import { ToastNotification } from './ToastNotification';

const mockProps = {
    isOpen: true,
    onClose: jest.fn(),
};

describe('ToastNotification', () => {
    afterEach(() => {
        cleanup();
    });

    it('should render archive toast notification', () => {
        const { getByTestId } = render(<ToastNotification {...mockProps} />);

        expect(getByTestId('popup-message')).toBeInTheDocument();
    });

    it('should not render archive toast notification if not opened', () => {
        const { queryByTestId } = render(<ToastNotification {...mockProps} isOpen={false} />);

        expect(queryByTestId('popup-message')).toBeNull();
    });

    it('should call onClose when onDismiss clicked', () => {
        const { getByRole } = render(<ToastNotification {...mockProps} />);

        const dismissButton = getByRole('button');
        fireEvent.click(dismissButton);

        expect(mockProps.onClose).toBeCalled();
    });

    it('should call onClose when toast is closed after few seconds', async () => {
        const disappearTime = 2000;
        render(<ToastNotification {...mockProps} disappearTime={disappearTime} />);

        await waitFor(() => expect(mockProps.onClose).toBeCalled());
    });
});

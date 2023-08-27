import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import FormDialog from './FormDialog';
import ProviderWrapper from '../../../utilities/tests/ProviderWrapper';
import commonStrings from '../../../assets/strings/common/common.1033.json';

const ProvidedFormDialog = ProviderWrapper(FormDialog);

describe('FormDialog', () => {
    const mockProps = {
        onSubmit: jest.fn(),
        onCancel: jest.fn(),
        onDismiss: jest.fn(),
        isOpen: true,
        errorProps: {
            title: 'Error',
        },
        loadingProps: {
            text: 'Loading...',
        },
        acceptButtonText: 'ADD',
    };

    it('should render dialog', () => {
        const { container } = render(<ProvidedFormDialog {...mockProps} />);

        expect(container).toBeInTheDocument();
    });

    it('should show error dialog', async () => {
        const customProps = { ...mockProps, onSubmit: jest.fn().mockImplementation(() => Promise.reject()) };
        const { getByText } = render(<ProvidedFormDialog {...customProps} />);

        const acceptBtn = getByText(mockProps.acceptButtonText);
        fireEvent.click(acceptBtn);

        await waitFor(() => expect(getByText(mockProps.errorProps.title)).toBeInTheDocument());
    });

    it('should show error dialog with message', async () => {
        const customProps = {
            ...mockProps,
            onSubmit: jest.fn().mockImplementation(() => Promise.reject()),
            errorProps: { ...mockProps.errorProps, message: 'This is error message' },
        };
        const { getByText } = render(<ProvidedFormDialog {...customProps} />);

        const acceptBtn = getByText(mockProps.acceptButtonText);
        fireEvent.click(acceptBtn);

        await waitFor(() => expect(getByText(customProps.errorProps.message)).toBeInTheDocument());
    });

    it('should close error dialog and reset error state', async () => {
        const customProps = {
            ...mockProps,
            onSubmit: jest.fn().mockImplementation(() => Promise.reject()),
            errorProps: { ...mockProps.errorProps, message: 'This is error message' },
        };
        const { getByText, findByText } = render(<ProvidedFormDialog {...customProps} />);

        const acceptBtn = getByText(mockProps.acceptButtonText);
        fireEvent.click(acceptBtn);

        const closeErrorDialogBtn = await findByText(commonStrings.CLOSE);
        fireEvent.click(closeErrorDialogBtn);

        expect(mockProps.onDismiss).toBeCalled();
    });

    it('should reset error state when close button clicked and onDissmiss is undefined', async () => {
        const customProps = {
            ...mockProps,
            onDismiss: undefined,
            onSubmit: jest.fn().mockImplementation(() => Promise.reject()),
            errorProps: { ...mockProps.errorProps, message: 'This is error message' },
        };
        const { getByText, findByText } = render(<ProvidedFormDialog {...customProps} />);

        const acceptBtn = getByText(mockProps.acceptButtonText);
        fireEvent.click(acceptBtn);

        const closeErrorDialogBtn = await findByText(commonStrings.CLOSE);
        fireEvent.click(closeErrorDialogBtn);

        expect(customProps.onDismiss).toBeFalsy();
    });

    it('should show loading dialog', async () => {
        const { getByTestId, getByText } = render(<ProvidedFormDialog {...mockProps} />);

        const acceptBtn = getByText(mockProps.acceptButtonText);
        fireEvent.click(acceptBtn);

        await waitFor(() => expect(getByTestId('spinner')).toBeInTheDocument());
    });
});

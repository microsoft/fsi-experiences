import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import AsyncOperationsDialog from './AsyncOperationsDialog';

describe('Group dialog', () => {
    it('should render group dialog', async () => {
        const { getByRole } = render(<AsyncOperationsDialog {...params} />);

        expect(getByRole('alertdialog')).toBeInTheDocument();
    });

    it('should render spinner when loading', async () => {
        const currParams = { ...params, isOpen: true, isLoading: true };
        const { getByTestId } = render(<AsyncOperationsDialog {...currParams} />);

        expect(getByTestId('group-dialog-spinner')).toBeInTheDocument();
    });

    it('should render info footer', () => {
        const currParams = { ...params, isOpen: true, isLoading: false, onDeleteClick: undefined };
        const { getByText } = render(<AsyncOperationsDialog {...currParams} />);

        expect(getByText('Ok')).toBeInTheDocument();
    });

    it('should render delete footer', () => {
        const currParams = { ...params, isOpen: true, isLoading: false, onDeleteClick: () => {} };
        const { getByText } = render(<AsyncOperationsDialog {...currParams} />);

        expect(getByText('Delete')).toBeInTheDocument();
    });

    it('should call dismiss button', () => {
        const onDialogDismiss = jest.fn();
        const { getByRole } = render(<AsyncOperationsDialog {...params} onDismiss={onDialogDismiss} />);

        const dialog = getByRole('button');
        expect(dialog).toBeInTheDocument();
        fireEvent.click(dialog);

        expect(onDialogDismiss).toHaveBeenCalledTimes(1);
    });

    it('should call dismiss button from info', () => {
        const onDialogDismiss = jest.fn();
        const currParams = { ...params, isOpen: true, isLoading: false, onDeleteClick: undefined, onDismiss: onDialogDismiss };
        const { getByText } = render(<AsyncOperationsDialog {...currParams} />);

        const dialog = getByText('Ok');
        expect(dialog).toBeInTheDocument();
        fireEvent.click(dialog);

        expect(onDialogDismiss).toHaveBeenCalledTimes(1);
    });

    it('should call dismiss button from delete', () => {
        const onDialogDismiss = jest.fn();
        const currParams = { ...params, isOpen: true, isLoading: false, onDismiss: onDialogDismiss };
        const { getByText } = render(<AsyncOperationsDialog {...currParams} />);

        const dialog = getByText('Cancel');
        expect(dialog).toBeInTheDocument();
        fireEvent.click(dialog);

        expect(onDialogDismiss).toHaveBeenCalledTimes(1);
    });

    it('should call delete button from delete', () => {
        const onDialogDelete = jest.fn();
        const currParams = { ...params, isOpen: true, isLoading: false, onDeleteClick: onDialogDelete };
        const { getByText } = render(<AsyncOperationsDialog {...currParams} />);

        const dialog = getByText('Delete');
        expect(dialog).toBeInTheDocument();
        fireEvent.click(dialog);

        expect(onDialogDelete).toHaveBeenCalledTimes(1);
    });

    const params = {
        isOpen: true,
        isLoading: true,
        header: 'mock',
        text: 'mockText',
        onDismiss: () => {},
        onDeleteClick: () => {},
    };
});

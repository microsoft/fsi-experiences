import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import DocumentDialog from './DocumentDialog';

const defaultOptions = {
    title: '',
    description: '',
    isOpen: false,
    isLoading: false,
    primaryButtonText: '',
    defaultButtonText: '',
    onPrimaryButtonClick: jest.fn(),
    onDefaultButtonClick: jest.fn(),
};

const defaultParams = {
    options: defaultOptions,
    onDismiss: jest.fn(),
};

describe('DocumentDialog', () => {
    it('should not render the dialog if not open', () => {
        const { queryByTestId } = render(<DocumentDialog {...defaultParams} />);

        expect(queryByTestId('dialog')).toBeNull();
    });

    it('should render the dialog if open', () => {
        const newOptions = { ...defaultOptions, isOpen: true, title: 'test' };
        const { getByText } = render(<DocumentDialog {...defaultParams} options={newOptions} />);

        expect(getByText('test')).toBeInTheDocument();
    });

    it('should call onDismiss if the dialog if open', () => {
        const newOptions = { ...defaultOptions, isOpen: true };
        const { getByRole } = render(<DocumentDialog {...defaultParams} options={newOptions} />);

        const dialog = getByRole('button');
        expect(dialog).toBeInTheDocument();
        fireEvent.click(dialog);

        expect(defaultParams.onDismiss).toBeCalled();
    });

    it('should call primary button if the dialog if open with primary button text', () => {
        const newOptions = { ...defaultOptions, isOpen: true, primaryButtonText: 'test' };
        const params = { options: newOptions, onDismiss: defaultParams.onDismiss };
        const { getByTestId, getByText } = render(<DocumentDialog {...params} />);

        const primaryButton = getByTestId('primary-button');
        expect(primaryButton).toBeInTheDocument();
        expect(getByText(newOptions.primaryButtonText)).toBeInTheDocument();
        fireEvent.click(primaryButton);

        expect(newOptions.onPrimaryButtonClick).toBeCalled();
    });

    it('should call default button if the dialog is open with default button text', () => {
        const newOptions = { ...defaultOptions, isOpen: true, defaultButtonText: 'test' };
        const { getByTestId, getByText } = render(<DocumentDialog {...defaultParams} options={newOptions} />);

        const defaultButton = getByTestId('default-button');
        expect(defaultButton).toBeInTheDocument();
        fireEvent.click(defaultButton);

        expect(getByText(newOptions.defaultButtonText)).toBeInTheDocument();
        expect(newOptions.onDefaultButtonClick).toBeCalled();
    });

    it('should render spinner if dialog is loading', () => {
        const newOptions = { ...defaultOptions, isOpen: true, isLoading: true };
        const { getByTestId } = render(<DocumentDialog {...defaultParams} options={newOptions} />);

        expect(getByTestId('loading-spinner')).toBeInTheDocument();
    });
});

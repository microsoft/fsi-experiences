import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import TextField from './TextField';
import userEvent from '@testing-library/user-event';

describe('TextField', () => {
    const label = 'test field label';
    const placeholder = 'test field placeholder';
    const inputValues = {
        invalid: 'invalid',
    };
    const mockErrorMessage = 'Has error';

    const onValidationHandler = jest.fn((value: string) => (value === inputValues.invalid ? mockErrorMessage : ''));
    const mockOnValidationComplete = jest.fn();
    const mockProps = {
        onValidationComplete: mockOnValidationComplete,
        label,
        placeholder,
        onValidate: onValidationHandler,
    };

    it('should be rendered in DOM without any default value', () => {
        const { getByLabelText } = render(<TextField {...mockProps} />);

        const textField = getByLabelText(label);
        expect(textField).toBeVisible();
    });

    it('should render the default value', () => {
        const defaultValue = 'test default value';
        const { getByDisplayValue } = render(<TextField label={mockProps.label} placeholder={mockProps.placeholder} defaultValue={defaultValue} />);

        expect(getByDisplayValue(defaultValue)).toBeVisible();
    });

    it('should have aria-invalid="true"', () => {
        const { getByLabelText } = render(<TextField {...mockProps} />);
        const textField = getByLabelText(label);

        userEvent.paste(textField, inputValues.invalid);
        userEvent.tab();

        expect(textField).toBeInvalid();
    });

    it('should not have aria-invalid="true" if validateOnFocusOut is off', () => {
        const { getByLabelText } = render(<TextField {...mockProps} validateOnFocusOut={false} />);

        const textField = getByLabelText(label);

        userEvent.paste(textField, inputValues.invalid);
        userEvent.tab();

        expect(textField).toBeValid();
    });

    it('should have `type` attribute set', () => {
        const { getByLabelText } = render(<TextField {...mockProps} type="number" />);
        const textField = getByLabelText(label);
        expect(textField).toHaveAttribute('type', 'number');
    });

    it('should have `required` attribute set', () => {
        const { getByLabelText } = render(<TextField {...mockProps} required />);
        const textField = getByLabelText(label);
        expect(textField).toBeRequired();
    });

    it('should call `onValidate` function on page load, if validateOnLoad={true}', () => {
        render(<TextField {...mockProps} validateOnLoad defaultValue="test default value" />);

        expect(onValidationHandler).toBeCalled();
    });

    it('should call `onValidationComplete` function` at least once', () => {
        const { getByTestId } = render(<TextField {...mockProps} data-testid="textfield" />);

        const textField = getByTestId('textfield');

        userEvent.paste(textField, inputValues.invalid);
        userEvent.tab();

        expect(mockOnValidationComplete).toBeCalled();
    });

    it('should trigger onChange', async () => {
        const mockOnChange = jest.fn();
        const { getByTestId } = render(<TextField {...mockProps} onChange={mockOnChange} data-testid="textfield" />);

        const textField = getByTestId('textfield');
        await act(async () => {
            await fireEvent.change(textField, { target: { value: 'test value' } });
        });

        // jest.runAllTimers();

        expect(mockOnChange).toBeCalled();
    });

    afterEach(() => {
        onValidationHandler.mockClear();
        mockOnValidationComplete.mockClear();
    });
});

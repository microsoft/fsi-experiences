import React from 'react';
import { fireEvent, getByTestId, render, screen } from '@testing-library/react';
import ComboBox from './ComboBox';
import userEvent from '@testing-library/user-event';
import { underlinedBaseClass } from './ComboBox.style';

describe('ComboBox', () => {
    const options = [
        { text: 'Option A', key: 'Option A' },
        { text: 'My Option B', key: 'My Option B' },
    ];

    const selectedOptionIndex = 1;
    const selectedOption = options[selectedOptionIndex].text;
    const customFreeformValue = 'custom value';

    const mockProps = {
        label: 'test combobox label',
        placeholder: 'test combobox placeholder',
        options,
        onChange: jest.fn(),
        'data-testid': 'comboxbox',
    };

    it('Should be rendered in DOM', () => {
        const { getByLabelText } = render(<ComboBox {...mockProps} />);

        const comboboxField = getByLabelText(mockProps.label);
        expect(comboboxField).toBeVisible();
    });

    it('Should have `required` attribute set', () => {
        const { getByRole, debug } = render(<ComboBox {...mockProps} required />);

        const comboboxFieldInput = getByRole('combobox');
        expect(comboboxFieldInput).toBeRequired();
    });

    it('Should have selected value', async () => {
        const { getByLabelText, queryAllByRole, findByDisplayValue } = render(<ComboBox {...mockProps} />);

        const comboboxField = getByLabelText(mockProps.label);

        fireEvent.click(comboboxField);

        const comboboxOptionsButtons = await queryAllByRole('option');

        fireEvent.click(comboboxOptionsButtons[selectedOptionIndex]);

        const comboboxInput = await findByDisplayValue(selectedOption);

        const expectedOptionParameterObject = {
            text: selectedOption,
            key: selectedOption,
        };

        expect(mockProps.onChange).toHaveBeenCalledWith(expectedOptionParameterObject, expect.anything());

        expect(comboboxInput).toHaveValue(selectedOption);
    });

    it('Should NOT have value, if autoComplete = "off"', async () => {
        const { getByLabelText, getByRole } = render(<ComboBox {...mockProps} autoComplete={false} />);

        const comboboxField = getByLabelText(mockProps.label);

        fireEvent.click(comboboxField);

        const comboboxFieldInput = getByRole('combobox');

        userEvent.paste(comboboxFieldInput, customFreeformValue);
        userEvent.tab();
        fireEvent.blur(comboboxFieldInput);

        expect(comboboxFieldInput).not.toHaveValue();
    });

    it('Should NOT have value, if allowFreeform = false', async () => {
        const { getByRole } = render(<ComboBox {...mockProps} />);

        const comboboxFieldInput = getByRole('combobox');

        userEvent.paste(comboboxFieldInput, customFreeformValue);
        userEvent.tab();
        fireEvent.blur(comboboxFieldInput);

        expect(comboboxFieldInput).not.toHaveValue(customFreeformValue);
    });

    it('Should have custom value, if allowFreeform = true', async () => {
        const { getByRole } = render(<ComboBox {...mockProps} allowFreeform />);

        const comboboxFieldInput = getByRole('combobox');

        userEvent.paste(comboboxFieldInput, customFreeformValue);
        userEvent.tab();

        expect(comboboxFieldInput).toHaveValue(customFreeformValue);
    });

    it('should have underline class', () => {
        const { container } = render(<ComboBox {...mockProps} underlined />);

        expect(container.getElementsByClassName(underlinedBaseClass)).toHaveLength(1);
    });
});

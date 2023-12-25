import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Dropdown from './Dropdown';
import { underlinedBaseClass } from './Dropdown.style';

describe('Dropdown', () => {
    const label = 'test dropdown label';
    const placeholder = 'test dropdown placeholder';
    const options = [
        { text: 'Option A', key: 'Option A' },
        { text: 'Option B', key: 'Option B' },
    ];

    const mockProps = {
        label,
        placeholder,
        options,
        onChange: jest.fn(),
        'data-testid': 'dropdown',
    };

    it('should be rendered in DOM', () => {
        const { getByLabelText } = render(<Dropdown {...mockProps} />);

        const dropdownField = getByLabelText(label);
        expect(dropdownField).toBeVisible();
    });

    it('should have selected value', async () => {
        const selectedOption = options[0].text;

        const { getByLabelText, getAllByText } = render(<Dropdown {...mockProps} />);

        const dropdownField = getByLabelText(label);

        fireEvent.click(dropdownField);

        const dropdownOptionsButtons = await getAllByText((content, element) => {
            // hack we use `classList.contains` to find elements by a class name
            return element?.classList.contains('ms-Dropdown-item')!;
        });

        fireEvent.click(dropdownOptionsButtons[0]);

        expect(mockProps.onChange).toHaveBeenCalledWith(options[0], expect.anything());

        expect(dropdownField.querySelector('.ms-Dropdown-title')).toHaveTextContent(selectedOption);
    });

    it('should have `required` attribute set', async () => {
        const { getByTestId } = render(<Dropdown {...mockProps} required />);

        const dropdownField = await getByTestId(mockProps['data-testid']);

        expect(dropdownField).toHaveAttribute('aria-required', 'true');
    });

    it('should call `onChange` function` at least once', async () => {
        const { getByTestId, getAllByText } = render(<Dropdown {...mockProps} />);

        const dropdownField = getByTestId(mockProps['data-testid']);

        fireEvent.click(dropdownField);

        const dropdownOptionsButtons = getAllByText((content, element) => {
            // hack we use `classList.contains` to find elements by a class name
            return element?.classList.contains('ms-Dropdown-item')!;
        });

        fireEvent.click(dropdownOptionsButtons[1]);

        expect(mockProps.onChange).toBeCalled();
    });

    it('should have underline class', () => {
        const { container } = render(<Dropdown {...mockProps} underlined />);

        expect(container.getElementsByClassName(underlinedBaseClass)).toHaveLength(1);
    });

    afterEach(() => {
        mockProps.onChange.mockClear();
    });
});

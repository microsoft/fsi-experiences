import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import FormDropdown from './FormDropdown';
import { FormProvider, useForm } from 'react-hook-form';

const MockComponent = props => {
    const methods = useForm();

    return (
        <FormProvider {...methods}>
            <FormDropdown control={methods.control} {...props} />;
        </FormProvider>
    );
};

describe('FormDropdown', () => {
    const mockProps = {
        onChange: jest.fn(),
        options: [
            {
                key: 0,
                text: 'an',
            },
            {
                key: 1,
                text: 'ab',
            },
        ],
    };

    it('should render category list after loading', () => {
        const { container } = render(<MockComponent {...mockProps} />);

        expect(container).toBeInTheDocument();
    });

    it('should trigger onChange', async () => {
        const { getByTestId, getAllByText } = render(<MockComponent {...mockProps} name="test" rules={{ required: true }} />);
        const typeField = getByTestId('test');

        await act(async () => {
            await fireEvent.click(typeField);
        });

        const dropdownOptionsButtons = getAllByText((content, element) => {
            // hack we use `classList.contains` to find elements by a class name
            return element?.classList.contains('ms-Dropdown-item')!;
        });

        await act(async () => {
            fireEvent.click(dropdownOptionsButtons[1]);
        });

        expect(mockProps.onChange).toHaveBeenCalled();
    });
});

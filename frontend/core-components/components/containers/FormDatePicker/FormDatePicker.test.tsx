import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import FormDatePicker from './FormDatePicker';
import { FormProvider, useForm } from 'react-hook-form';

const MockComponent = props => {
    const methods = useForm();

    return (
        <FormProvider {...methods}>
            <FormDatePicker control={methods.control} {...props} />;
        </FormProvider>
    );
};

describe('FormDatePicker', () => {
    const mockProps = {
        name: 'test',
        onSelectedDate: jest.fn(),
    };

    it('should render category list after loading', () => {
        const { container } = render(<MockComponent {...mockProps} />);

        expect(container).toBeInTheDocument();
    });

    it('should render empty name', () => {
        const { container } = render(<MockComponent onSelectedDate={mockProps.onSelectedDate} />);

        expect(container).toBeInTheDocument();
    });

    it('should trigger onSelectedDate', async () => {
        const { getByTestId } = render(<MockComponent {...mockProps} />);

        const field = getByTestId(mockProps.name);
        const input = field.getElementsByTagName('input')[0];

        await act(async () => {
            await fireEvent.change(input, { target: { value: '04/01/2021' } });
            await fireEvent.blur(input);
        });

        expect(mockProps.onSelectedDate).toHaveBeenCalledWith(new Date('04/01/2021'));
    });
});

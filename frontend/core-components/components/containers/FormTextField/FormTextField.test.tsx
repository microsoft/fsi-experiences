import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import FormTextField from './FormTextField';
import { FormProvider, useForm } from 'react-hook-form';

const MockComponent = props => {
    const methods = useForm();

    return (
        <FormProvider {...methods}>
            <FormTextField control={methods.control} {...props} />;
        </FormProvider>
    );
};

describe('FormTextField', () => {
    const mockProps = {
        name: 'test',
        label: '1',
        placeholder: '2',
        onChange: jest.fn(),
    };

    it('should render category list after loading', () => {
        const { container } = render(<MockComponent {...mockProps} />);

        expect(container).toBeInTheDocument();
    });

    it('should trigger onChange', async () => {
        const { getByTestId } = render(<MockComponent {...mockProps} />);
        const typeField = getByTestId(mockProps.name);

        await act(async () => {
            await fireEvent.change(typeField, { target: { value: '1' } });
        });

        expect(mockProps.onChange).toHaveBeenCalled();
    });

    it('should trigger onBlur', async () => {
        const onBlurMock = jest.fn();
        const { getByTestId } = render(<MockComponent {...mockProps} onBlur={onBlurMock} />);
        const typeField = getByTestId(mockProps.name);

        await act(async () => {
            await fireEvent.change(typeField, { target: { value: '1' } });
            await fireEvent.blur(typeField);
        });

        expect(onBlurMock).toHaveBeenCalled();
    });

    it('should render default name', async () => {
        const localProps = {
            label: '1',
            placeholder: '2',
            rules: {
                required: true,
            },
        };

        const { container } = render(<MockComponent {...localProps} />);

        expect(container).toBeInTheDocument();
    });

    it('should render custom label renderer', async () => {
        const localProps = {
            label: '1',
            placeholder: '2',
            rules: {
                required: true,
            },
            onRenderLabel: props => <div data-testid="label-div"></div>,
        };

        const { getByTestId } = render(<MockComponent {...localProps} />);

        expect(getByTestId('label-div')).toBeInTheDocument();
    });

    it('should render label with additional info', async () => {
        const localProps = {
            label: '1',
            placeholder: '2',
            rules: {
                required: true,
            },
        };

        const { getByText } = render(<MockComponent {...localProps} />);

        expect(getByText(localProps.label)).toBeInTheDocument();
    });
});

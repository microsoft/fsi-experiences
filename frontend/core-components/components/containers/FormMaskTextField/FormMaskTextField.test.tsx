import React from 'react';
import { render } from '@testing-library/react';
import FormMaskTextField from './FormMaskTextField';
import { FormProvider, useForm } from 'react-hook-form';

const MockComponent = props => {
    const methods = useForm();

    return (
        <FormProvider {...methods}>
            <FormMaskTextField control={methods.control} {...props} />;
        </FormProvider>
    );
};

describe('FormMaskTextField', () => {
    const mockProps = {};

    it('should render category list after loading', () => {
        const { container } = render(<MockComponent {...mockProps} />);

        expect(container).toBeInTheDocument();
    });
});

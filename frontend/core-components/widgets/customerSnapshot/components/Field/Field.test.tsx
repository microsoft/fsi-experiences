import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Field from './Field';
import { FieldType } from '../../../../dataLayerInterface/entity/CustomerSnapshot/CustomerSnapshot';

const mockData = {
    fieldData: {
        fieldName: 'birthdate',
        formattedValue: '1/11/1970',
        value: '1970-01-11',
    },
    fieldMetadata: {
        displayName: 'Birthday',
        type: FieldType.DateTime,
    },
};

describe('Field', () => {
    it('Should render Field', () => {
        const { getByText } = render(<Field fieldLabel="Birthdate" fieldData={mockData.fieldData} metadata={mockData.fieldMetadata} />);

        expect(getByText('Birthdate')).toBeVisible();
        expect(getByText(mockData.fieldData.formattedValue)).toBeVisible();
    });

    it('Should render Field with icon', () => {
        const { getByText, container } = render(
            <Field icon="Mail" fieldLabel="Birthdate" fieldData={mockData.fieldData} metadata={mockData.fieldMetadata} />
        );

        expect(container.querySelector(`i[data-icon-name="Mail"]`)).toBeVisible();
        expect(getByText('Birthdate')).toBeVisible();
        expect(getByText(mockData.fieldData.formattedValue)).toBeVisible();
    });

    it('Should render Field with custom content', () => {
        const { getByText } = render(
            <Field fieldLabel="Birthdate" fieldData={mockData.fieldData} metadata={mockData.fieldMetadata}>
                Custom content
            </Field>
        );

        expect(getByText('Custom content')).toBeVisible();
    });

    it('Should render Field with custom link', () => {
        const { getByText } = render(
            <Field href="mailto:example@example.com" fieldLabel="Birthdate" fieldData={mockData.fieldData} metadata={mockData.fieldMetadata} />
        );

        expect(getByText(mockData.fieldData.formattedValue)).toHaveAttribute('href');
    });

    it('Should render Field with tags', () => {
        const { getByText } = render(
            <Field tags={['My Tag']} fieldLabel="Birthdate" fieldData={mockData.fieldData} metadata={mockData.fieldMetadata} />
        );
        expect(getByText('My Tag')).toBeVisible();
    });

    it('Should render Field with N/A', () => {
        const { getByText } = render(
            <Field
                fieldLabel="Birthdate"
                fieldData={{ ...mockData.fieldData, value: undefined, formattedValue: undefined }}
                metadata={mockData.fieldMetadata}
            />
        );
        expect(getByText('N/A')).toBeVisible();
    });

    it('Should render Field as different tag', () => {
        const { getByRole } = render(<Field as="ul" fieldLabel="Birthdate" fieldData={mockData.fieldData} metadata={mockData.fieldMetadata} />);

        expect(getByRole('list')).toBeVisible();
    });

    it('Should invoke onClick method if provided and Field has fieldValue', () => {
        const onClickMethod = jest.fn();
        const { getByTestId } = render(
            <Field href="//www.microsoft.com" onClick={onClickMethod} fieldData={mockData.fieldData} metadata={mockData.fieldMetadata} />
        );

        const fieldElem = getByTestId('field-text');

        fireEvent.click(fieldElem);

        expect(onClickMethod).toBeCalled();
    });
});

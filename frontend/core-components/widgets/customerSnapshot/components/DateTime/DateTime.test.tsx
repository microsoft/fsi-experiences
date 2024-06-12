import React from 'react';
import { render } from '@testing-library/react';
import DateTime from './DateTime';
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

describe('Datetime', () => {
    it('Should render DateTime', () => {
        const { getByTestId } = render(<DateTime fieldLabel="Birthdate" fieldData={mockData.fieldData} metadata={mockData.fieldMetadata} />);
        expect(getByTestId('date-time-text')).toBeVisible();
    });

    it('Should render DateTime without data', () => {
        const { getByText } = render(
            <DateTime
                fieldLabel="Birthdate"
                fieldData={{ ...mockData.fieldData, formattedValue: undefined, value: undefined }}
                metadata={mockData.fieldMetadata}
            />
        );
        expect(getByText('N/A')).toBeVisible();
    });
});

import React from 'react';
import { render } from '@testing-library/react';
import Currency from './Currency';
import { FieldType } from '../../../../dataLayerInterface/entity/CustomerSnapshot/CustomerSnapshot';

const mockData = {
    fieldData: {
        fieldName: 'currency',
        formattedValue: '1050',
        value: '1050',
    },
    fieldMetadata: {
        displayName: 'currency',
        type: FieldType.Currency,
    },
};

describe('Currency', () => {
    it('Should render Currency', () => {
        const { getByTestId } = render(<Currency fieldLabel="currency" fieldData={mockData.fieldData} metadata={mockData.fieldMetadata} />);

        expect(getByTestId('currency-wrapper')).toBeVisible();
    });

    it('Should render Currency without data', () => {
        const { getByText } = render(
            <Currency
                fieldLabel="currency"
                fieldData={{ ...mockData.fieldData, value: undefined, formattedValue: undefined }}
                metadata={mockData.fieldMetadata}
            />
        );

        expect(getByText('N/A')).toBeVisible();
    });
});

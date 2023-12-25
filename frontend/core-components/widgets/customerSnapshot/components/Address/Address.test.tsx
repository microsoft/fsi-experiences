import React from 'react';
import { render } from '@testing-library/react';
import Address from './Address';
import { FieldType } from '../../../../dataLayerInterface/entity/CustomerSnapshot/CustomerSnapshot';

const mockData = {
    fieldData: {
        fieldName: 'address',
        value: 'Tel aviv - Israel',
    },
    fieldMetadata: {
        displayName: 'Address',
        type: FieldType.Address,
    },
};

describe('Address', () => {
    it('Should render Address', () => {
        const { container } = render(<Address fieldLabel="address" fieldData={mockData.fieldData} metadata={mockData.fieldMetadata} />);
        expect(container.querySelector(`i[data-icon-name="Home"]`)).toBeVisible();
    });
    it('Should render Address without data', () => {
        const { getByText } = render(
            <Address fieldLabel="address" fieldData={{ ...mockData.fieldData, value: undefined }} metadata={mockData.fieldMetadata} />
        );
        expect(getByText('N/A')).toBeVisible();
    });
});

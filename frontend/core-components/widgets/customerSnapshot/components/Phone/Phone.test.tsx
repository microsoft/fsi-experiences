import React from 'react';
import { render } from '@testing-library/react';
import Phone from './Phone';
import { FieldType } from '../../../../dataLayerInterface/entity/CustomerSnapshot/CustomerSnapshot';

const mockData = {
    fieldData: {
        fieldName: 'mobilephone',
        value: '(912) 555-0430',
    },
    fieldMetadata: {
        displayName: 'Mobile Phone',
        type: FieldType.Phone,
    },
};

describe('Phone', () => {
    it('Should render Phone', () => {
        const { container, getByText } = render(
            <Phone icon="Phone" fieldLabel="phone" fieldData={mockData.fieldData} metadata={mockData.fieldMetadata} />
        );

        expect(container.querySelector(`i[data-icon-name="Phone"]`)).toBeVisible();
        expect(getByText(mockData.fieldData.value)).toHaveAttribute('href');
    });

    it('Should render Phone without data', () => {
        const { getByText } = render(
            <Phone icon="Phone" fieldLabel="phone" fieldData={{ ...mockData.fieldData, value: undefined }} metadata={mockData.fieldMetadata} />
        );

        expect(getByText('N/A')).toBeVisible();
    });
});

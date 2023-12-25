import React from 'react';
import { render } from '@testing-library/react';
import Email from './Email';
import { FieldType } from '../../../../dataLayerInterface/entity/CustomerSnapshot/CustomerSnapshot';

const mockData = {
    fieldData: {
        fieldName: 'emailaddress1',
        value: 'Abigail@example.com',
    },
    fieldMetadata: {
        displayName: 'Email',
        type: FieldType.Email,
    },
};

describe('Email', () => {
    it('Should render Email', () => {
        const { container, getByText } = render(<Email fieldLabel="Mail" fieldData={mockData.fieldData} metadata={mockData.fieldMetadata} />);
        expect(container.querySelector(`i[data-icon-name="Mail"]`)).toBeVisible();
        expect(getByText(mockData.fieldData.value)).toHaveAttribute('href');
    });

    it('Should render Email without data', () => {
        const { getByText } = render(
            <Email fieldLabel="Mail" fieldData={{ ...mockData.fieldData, value: undefined }} metadata={mockData.fieldMetadata} />
        );
        expect(getByText('N/A')).toBeVisible();
    });
});

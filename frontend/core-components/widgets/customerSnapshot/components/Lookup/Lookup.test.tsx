import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Lookup from './Lookup';
import { FieldType } from '../../../../dataLayerInterface/entity/CustomerSnapshot/CustomerSnapshot';
import FSIContext, { FSIDefaultContextValue } from '../../../../context/FSIContext';

const mockData = {
    fieldLabel: 'Branch',
    fieldData: {
        fieldName: 'msfsi_branch',
        formattedValue: 'Woodgrove Savannah branch',
        value: '3c21950b-6ed9-4334-857b-4cc663c8c953',
    },
    metadata: {
        displayName: 'Branch',
        target: 'msfsi_branch',
        type: FieldType.Lookup,
    },
};

describe('Lookup', () => {
    it('Should render Lookup', () => {
        const { getByText } = render(<Lookup fieldLabel={mockData.fieldLabel} fieldData={mockData.fieldData} metadata={mockData.metadata} />);

        expect(getByText(mockData.fieldData.formattedValue)).toBeVisible();
    });

    it('Should call navigation when clicking link', () => {
        const currContext = {
            value: {
                ...FSIDefaultContextValue,
                navigation: { openForm: jest.fn() },
            },
        };

        const { getByTestId } = render(
            <FSIContext.Provider {...currContext}>
                <Lookup fieldLabel={mockData.fieldLabel} fieldData={mockData.fieldData} metadata={mockData.metadata} />
            </FSIContext.Provider>
        );

        const link = getByTestId('field-text');
        expect(link).toBeVisible();
        fireEvent.click(link);
        expect(currContext.value.navigation.openForm).toHaveBeenCalledTimes(1);
    });
});

import React from 'react';
import { render } from '@testing-library/react';
import SectionField from './SectionField';
import { FieldType } from '../../../../dataLayerInterface/entity/CustomerSnapshot/CustomerSnapshot';
import { PreferredContactMethod } from '../../../../enums/PreferredContactMethod';
import customerSnapshotControlStrings from '../../../../assets/strings/CustomerSnapshotControl/CustomerSnapshotControl.1033.json';

const mockData = {
    field: {
        name: 'emailaddress1',
        label: 'Email',
    },
    fieldData: {
        fieldName: 'emailaddress1',
        value: 'Abigail@example.com',
    },
    fieldMetadata: {
        displayName: 'Email',
        type: FieldType.Email,
    },
    type: FieldType.Email,
};

describe('SectionField', () => {
    it('Should render SectionField - Email', () => {
        const { getByText } = render(<SectionField {...mockData} />);

        expect(getByText(mockData.fieldData.value)).toBeVisible();
    });

    it('Should render SectionField - Email with prefered', () => {
        const { getByText } = render(<SectionField {...mockData} preferredContactMethod={PreferredContactMethod.Email} />);

        expect(getByText(mockData.fieldData.value)).toBeVisible();
        expect(getByText(customerSnapshotControlStrings.PREFERRED)).toBeVisible();
    });

    it('Should render SectionField - Phone with prefered', () => {
        const { getByText } = render(<SectionField {...mockData} type={FieldType.Phone} preferredContactMethod={PreferredContactMethod.Phone} />);

        expect(getByText(mockData.fieldData.value)).toBeVisible();
        expect(getByText(customerSnapshotControlStrings.PREFERRED)).toBeVisible();
    });

    it('Should render SectionField - Address with prefered', () => {
        const { getByText } = render(<SectionField {...mockData} type={FieldType.Address} preferredContactMethod={PreferredContactMethod.Mail} />);

        expect(getByText(mockData.fieldData.value)).toBeVisible();
        expect(getByText(customerSnapshotControlStrings.PREFERRED)).toBeVisible();
    });
});

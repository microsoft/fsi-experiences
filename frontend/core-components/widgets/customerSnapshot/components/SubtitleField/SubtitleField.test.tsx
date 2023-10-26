import React from 'react';
import { render } from '@testing-library/react';
import SubtitleField from './SubtitleField';
import { FieldType } from '../../../../dataLayerInterface/entity/CustomerSnapshot/CustomerSnapshot';

const mockData = {
    field: {
        name: 'familystatuscode',
        label: 'Marital Status',
    },
    fieldData: {
        fieldName: 'familystatuscode',
        formattedValue: 'Divorced',
        value: 3,
    },
    fieldMetadata: {
        displayName: 'Marital Status',
        type: FieldType.Text,
    },
    type: FieldType.Text,
};

describe('SubtitleField', () => {
    it('Should render SubtitleField', () => {
        const { getByTestId } = render(<SubtitleField {...mockData} />);

        expect(getByTestId(`subtitle-field-${mockData.field.name}`)).toBeVisible();
    });
});

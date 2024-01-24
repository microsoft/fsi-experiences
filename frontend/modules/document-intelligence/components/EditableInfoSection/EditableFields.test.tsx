import React from 'react';
import { render } from '@testing-library/react';
import { EditableFields } from './EditableFields';

const fields = [
    {
        displayName: 'Consumption start date',
        value: '2020-01-01',
        labelTagProps: {
            text: '80% confidence',
        },
        required: true,
        placeholder: 'Consumption start date',
        id: 'startDate',
    },
    {
        displayName: 'Consumption end date',
        value: '2020-01-01',
        required: true,
        placeholder: 'Consumption end date',
        id: 'endDate',
    },
];

describe('EditableFields', () => {
    it('should render successfully', () => {
        const { container } = render(<EditableFields fields={fields} />);
        expect(container).toBeInTheDocument();
        expect(container.querySelectorAll('input[readonly]')).toHaveLength(fields.length);
    });

    it('should render editable fields when editMode is true', () => {
        const { container } = render(<EditableFields fields={fields} editMode />);
        expect(container.querySelectorAll('input:not([readonly])')).toHaveLength(fields.length);
    });
});

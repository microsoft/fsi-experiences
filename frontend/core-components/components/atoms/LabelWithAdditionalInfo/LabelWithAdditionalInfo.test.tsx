import React from 'react';
import { render } from '@testing-library/react';
import LabelWithAdditionalInfo from './LabelWithAdditionalInfo';

describe('LabelWithAdditionalInfo', () => {
    it('should render label with description', () => {
        const { getByText } = render(<LabelWithAdditionalInfo label="Test" isRequired fieldId="test-id" description="test" />);

        expect(getByText('Test')).toBeVisible();
        expect(getByText('(test)')).toBeVisible();
    });

    it('should render label without description', () => {
        const { queryByTestId } = render(<LabelWithAdditionalInfo label="Test" isRequired fieldId="test-id" description="" />);

        expect(queryByTestId('label--additional-info')).toBeNull();
    });
});

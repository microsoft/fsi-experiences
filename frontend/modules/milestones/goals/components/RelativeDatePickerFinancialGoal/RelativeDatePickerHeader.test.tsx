import { render } from '@testing-library/react';
import React from 'react';
import RelativeDatePickerHeader from './RelativeDatePickerHeader';
import lifeEventStrings from '@fsi/core-components/dist/assets/strings/LifeEventBar/LifeEventBar.1033.json';

describe('RelativeDatePickerHeader', () => {
    it('Should pick financial goal header', async () => {
        const { getByText } = render(<RelativeDatePickerHeader financialGoalFutureOnly={false} labelId={'testLabelId'} />);

        expect(getByText(lifeEventStrings.EVENT_DATE)).toBeInTheDocument();
        expect(getByText(lifeEventStrings.ADD_SPECIFIC_DATE)).toBeInTheDocument();
    });
    it('Should pick regular life event header - non financial goal', async () => {
        const { getByText } = render(<RelativeDatePickerHeader financialGoalFutureOnly labelId={'testLabelId'} />);

        expect(getByText(lifeEventStrings.GOAL_DATE)).toBeInTheDocument();
    });
});

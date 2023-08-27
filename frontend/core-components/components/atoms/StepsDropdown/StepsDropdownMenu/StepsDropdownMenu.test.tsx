import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import StepsDropdownMenu from './StepsDropdownMenu';

const options = [
    {
        name: 'step 1',
        isCompleted: true,
    },
    {
        name: 'step 2',
        isCompleted: false,
    },
    {
        name: 'step 3',
        isCompleted: false,
        isDisabled: true,
    },
];

const mockProps = {
    options,
    selected: options[0],
};

describe('StepsdropdownMenu', () => {
    it('should render the component', () => {
        const { getByTestId } = render(<StepsDropdownMenu {...mockProps} onStepClick={() => {}} />);

        expect(getByTestId('steps-dropdown-menu')).toBeInTheDocument();
    });
    it('should not render the component when closed', () => {
        const { queryByTestId } = render(<StepsDropdownMenu {...mockProps} onStepClick={() => {}} isOpen={false} />);

        expect(queryByTestId('steps-dropdown-menu')).not.toBeInTheDocument();
    });
});

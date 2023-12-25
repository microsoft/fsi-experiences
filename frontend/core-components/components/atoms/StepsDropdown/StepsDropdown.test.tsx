import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import StepsDropdown from './StepsDropdown';

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

describe('Stepsdropdown', () => {
    it('should render the component', () => {
        const { getByTestId } = render(<StepsDropdown {...mockProps} onChange={() => {}} />);

        expect(getByTestId('steps-dropdown-control')).toBeInTheDocument();
    });

    it('should open the component menu', () => {
        const { getByTestId } = render(<StepsDropdown {...mockProps} onChange={() => {}} />);
        fireEvent.click(getByTestId('steps-dropdown-control'));

        expect(getByTestId('steps-dropdown-menu')).toBeInTheDocument();
    });

    it('should close the component menu after clicking step', () => {
        const { queryByTestId, getByTestId, getByText } = render(<StepsDropdown {...mockProps} onChange={() => {}} />);
        fireEvent.click(getByTestId('steps-dropdown-control'));

        expect(getByTestId('steps-dropdown-menu')).toBeInTheDocument();
        fireEvent.click(getByText('step 2'));
        expect(queryByTestId('steps-dropdown-menu')).not.toBeInTheDocument();
    });

    it('should trigger onChange with clicked step', () => {
        const onChange = jest.fn();
        const { getByTestId, getByText } = render(<StepsDropdown {...mockProps} onChange={onChange} />);
        fireEvent.click(getByTestId('steps-dropdown-control'));
        fireEvent.click(getByText('step 2'));

        expect(onChange).toBeCalledWith(options[1]);
    });

    it('should not trigger onChange with clicked disabled step', () => {
        const onChange = jest.fn();
        const { getByTestId, getByText } = render(<StepsDropdown {...mockProps} onChange={onChange} />);
        fireEvent.click(getByTestId('steps-dropdown-control'));
        fireEvent.click(getByText('step 3'));

        expect(onChange).not.toBeCalled();
    });
});

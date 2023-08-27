import React from 'react';
import { Selection } from '@fluentui/react/lib/Selection';
import { fireEvent, render } from '@testing-library/react';
import TimeSlot from './TimeSlot';
import { ITimeSlotProps } from './TimeSlot.interface';
import { DEFAULT_FORMAT } from './TimeSlot.const';
import { toDate } from '../../../utilities';

describe('TimeSlot', () => {
    it('should render component', () => {
        const mockProps: ITimeSlotProps = {
            time: new Date(),
            itemIndex: 0,
            isSelected: false,
            onSelect: jest.fn(),
        };
        const { container, getByTestId } = render(<TimeSlot {...mockProps} />);

        expect(container).toBeInTheDocument();
        const timeslot = getByTestId('timeslot');
        expect(timeslot).toBeVisible();
        expect(timeslot.getAttribute('data-is-selected')).toEqual('false');
    });

    it('should render component as selected', () => {
        const selection = new Selection({
            items: [
                {
                    key: 0,
                },
            ],
        });
        selection.selectToIndex(0, true);

        const mockProps: ITimeSlotProps = {
            time: new Date(),
            itemIndex: 0,
            isSelected: true,
            onSelect: jest.fn(),
        };
        const { getByTestId } = render(<TimeSlot {...mockProps} />);

        expect(getByTestId('timeslot').getAttribute('data-is-selected')).toEqual('true');
    });

    it('should render component with different time format', () => {
        const mockProps = {
            time: new Date(),
            itemIndex: 0,
            isSelected: false,
            onSelect: jest.fn(),
            timeFormat: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' } as Intl.DateTimeFormatOptions,
        };
        const { queryByText } = render(<TimeSlot {...mockProps} />);
        expect(queryByText(toDate(mockProps.time, mockProps.timeFormat))).toBeVisible();
    });

    it('should trigger onSelect', () => {
        const mockProps: ITimeSlotProps = {
            time: new Date(),
            itemIndex: 0,
            isSelected: false,
            onSelect: jest.fn(),
        };
        const { getByTestId } = render(<TimeSlot {...mockProps} />);

        fireEvent.click(getByTestId('timeslot'));

        expect(mockProps.onSelect).toBeCalled();
    });
});

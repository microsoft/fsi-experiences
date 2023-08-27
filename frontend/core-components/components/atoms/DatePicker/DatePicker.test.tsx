import React from 'react';
import { screen, fireEvent, render } from '@testing-library/react';
import { DatePicker } from './DatePicker';
import { FSIContainer } from '../../../context/FSIContext';
import { defaultDateGridString } from './DatePicker.const';

describe('DatePicker', () => {
    const handleSelectedDate = jest.fn();

    const PICKER_PLACE_HOLDER = 'picker-place-holder';
    const CONTROL_ROLE = 'combobox';

    const initialDate = '11/12/1985';
    const initialDateStr = new Date(initialDate).toLocaleDateString();

    beforeEach(() => {
        handleSelectedDate.mockClear();
    });

    it('Should render empty date combobox with placeholder', () => {
        render(<DatePicker onSelectedDate={handleSelectedDate} placeholder={PICKER_PLACE_HOLDER} />);

        expect(screen.getByPlaceholderText(PICKER_PLACE_HOLDER)).toBeVisible();

        expect(screen.getByRole(CONTROL_ROLE)).toBeVisible();
    });

    it('Should render invalid date combobox with placeholder', () => {
        render(<DatePicker selectedDate={new Date('TEST')} onSelectedDate={handleSelectedDate} placeholder={PICKER_PLACE_HOLDER} />);

        expect(screen.getByPlaceholderText(PICKER_PLACE_HOLDER)).toBeVisible();

        expect(screen.getByRole(CONTROL_ROLE)).toBeVisible();
    });

    it('Should render date combobox with initial date', () => {
        render(<DatePicker selectedDate={new Date(initialDate)} onSelectedDate={handleSelectedDate} placeholder={PICKER_PLACE_HOLDER} />);

        expect(screen.getByDisplayValue(initialDateStr)).toBeVisible();
    });

    it('Should call handleSelectedDate with null when date was cleared', () => {
        render(<DatePicker selectedDate={new Date(initialDate)} onSelectedDate={handleSelectedDate} placeholder={PICKER_PLACE_HOLDER} />);

        fireEvent.change(screen.getByRole(CONTROL_ROLE), { target: { value: '' } });
        fireEvent.blur(screen.getByRole(CONTROL_ROLE));

        expect(handleSelectedDate).toBeCalledWith(null);
    });

    it('Should call handleSelectedDate with date value when typing new date', () => {
        render(<DatePicker selectedDate={new Date(initialDate)} onSelectedDate={handleSelectedDate} placeholder={PICKER_PLACE_HOLDER} />);
        const newDate = '04/01/2021';
        fireEvent.change(screen.getByRole(CONTROL_ROLE), { target: { value: newDate } });
        fireEvent.blur(screen.getByRole(CONTROL_ROLE));

        expect(handleSelectedDate).toBeCalledWith(new Date(newDate));
    });

    it('Should call handleSelectedDate when selecting new date from picker', () => {
        render(<DatePicker selectedDate={new Date(initialDate)} onSelectedDate={handleSelectedDate} placeholder={PICKER_PLACE_HOLDER} />);
        const newDate = '13, November, 1985';
        fireEvent.click(screen.getByRole(CONTROL_ROLE));
        fireEvent.click(screen.getByLabelText(newDate));

        expect(handleSelectedDate).toBeCalledWith(new Date(newDate));
    });

    it('Should disable dates before min date', () => {
        const minDate = 'November 11, 1985';
        const testDate = '10, November, 1985';

        render(
            <DatePicker
                selectedDate={new Date(initialDate)}
                minDate={new Date(minDate)}
                onSelectedDate={handleSelectedDate}
                placeholder={PICKER_PLACE_HOLDER}
            />
        );

        fireEvent.click(screen.getByRole(CONTROL_ROLE));

        expect(screen.getByLabelText(testDate)).toBeDisabled();
    });

    it('Should disable dates after max date', () => {
        const maxDate = 'November 13, 1985';
        const testDate = '14, November, 1985';

        render(
            <DatePicker
                selectedDate={new Date(initialDate)}
                maxDate={new Date(maxDate)}
                onSelectedDate={handleSelectedDate}
                placeholder={PICKER_PLACE_HOLDER}
            />
        );

        fireEvent.click(screen.getByRole(CONTROL_ROLE));

        expect(screen.getByLabelText(testDate)).toBeDisabled();
    });

    it('Should render date picker with formatting info', () => {
        const dateGridStrings = {
            ...defaultDateGridString,
            shortDays: ['1-D', '2-D', '3-D', '4-D', '5-D', '6-D', '7-D'],
        };
        render(
            <FSIContainer
                dateFormattingInfo={{
                    firstDayOfTheWeek: 1,
                    dateGridStrings: dateGridStrings,
                }}
            >
                <DatePicker selectedDate={new Date(initialDate)} onSelectedDate={handleSelectedDate} placeholder={PICKER_PLACE_HOLDER} />
            </FSIContainer>
        );

        fireEvent.click(screen.getByRole(CONTROL_ROLE));

        const headerCells = screen.getAllByRole('columnheader');
        expect(headerCells[0]).toHaveTextContent('2-D');
    });

    it('Should render label with additional info component', () => {
        const labelText = 'label';
        const { getByText } = render(<DatePicker onSelectedDate={handleSelectedDate} label={labelText} />);

        expect(getByText(labelText)).toBeInTheDocument();
    });

    it('Should render date picker without a label', () => {
        const labelText = 'label';
        const { queryByText } = render(<DatePicker onSelectedDate={handleSelectedDate} />);

        expect(queryByText(labelText)).toBeNull();
    });
});

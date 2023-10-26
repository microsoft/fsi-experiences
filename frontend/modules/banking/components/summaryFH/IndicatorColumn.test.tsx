import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import IIndicatorColumn from './IndicatorColumn';
import { IIndicatorFields } from '../../interfaces/FHEntity/IndictableFH';

describe('Indicator Widget', () => {
    let indicatorMock: IIndicatorFields;
    const indicatorMessageText = 'Maturity date is within 2 weeks';
    beforeEach(() => {
        indicatorMock = {
            order: 1,
            messageKey: 'INDICATOR_MATURITY_TIME_IN_RANGE_MESSAGE_PLURAL',
            messageProps: {
                weekDiff: 2,
            },
            type: () => 'fyi',
        };
    });

    it('Should render indicator', async () => {
        const { getByText, queryByTestId, queryByText, getByLabelText } = render(<IIndicatorColumn indicator={indicatorMock} size={14} />);
        const indicatorWrapper = queryByTestId(/indicator-icon-/i);

        expect(indicatorWrapper).toBeVisible();
        expect(queryByText(indicatorMessageText)).toBeNull();

        fireEvent.mouseOver(indicatorWrapper!);
        expect(await getByText(indicatorMessageText)).toBeInTheDocument();
        expect(getByLabelText('Info')).toBeVisible();
    });

    it('Should render empty indicator', async () => {
        const { queryByTestId } = render(<IIndicatorColumn indicator={undefined} size={14} />);

        expect(queryByTestId(/indicator-icon-/i)).not.toBeTruthy();
    });

    it('Should render empty indicator 2', async () => {
        indicatorMock.type = () => 'null';
        const { queryByTestId } = render(<IIndicatorColumn indicator={indicatorMock} size={14} />);

        expect(queryByTestId(/indicator-icon-/i)).not.toBeTruthy();
    });
});

import React from 'react';
import { render } from '@testing-library/react';
import FHIndicatorMessageBar from './FHIndicatorMessageBar';
import { IIndicatorFields } from '../../../../interfaces/FHEntity/IndictableFH';

describe('FHIndicatorMessageBar', () => {
    const indicatorMessageText = 'Maturity date is within 2 weeks';
    let indicator: IIndicatorFields;

    beforeEach(() => {
        indicator = {
            order: 2,
            messageKey: 'INDICATOR_MATURITY_TIME_IN_RANGE_MESSAGE_PLURAL',
            messageProps: {
                weekDiff: 2,
            },
            type: () => 'warning',
        };
    });

    it('Should render warning indicator bar', async () => {
        const { findByText, queryByTestId, debug } = render(<FHIndicatorMessageBar indicator={indicator} show={true} />);

        const indicatorBar = queryByTestId(/indicator-bar-/i);
        expect(indicatorBar).toBeVisible();

        expect(indicatorBar?.firstChild).toHaveClass('ms-MessageBar--severeWarning');

        expect(await findByText(indicatorMessageText)).toBeVisible();
    });

    it('Should render warning indicator bar 2', async () => {
        indicator.type = () => 'fyi';
        const { queryByTestId } = render(<FHIndicatorMessageBar indicator={indicator} show={true} />);

        const indicatorBar = queryByTestId(/indicator-bar-/i);
        expect(indicatorBar).toBeVisible();

        expect(indicatorBar?.firstChild).not.toHaveClass('ms-MessageBar--severeWarning');
    });

    it('Should render empty indicator bar', async () => {
        const { queryByTestId } = render(<FHIndicatorMessageBar indicator={indicator} show={false} />);

        const indicatorBar = queryByTestId(/indicator-bar-/i);
        expect(indicatorBar).toBeNull();
    });

    it('Should render empty indicator bar 2', async () => {
        const { queryByTestId } = render(<FHIndicatorMessageBar indicator={undefined} show={true} />);

        const indicatorBar = queryByTestId(/indicator-bar-/i);
        expect(indicatorBar).toBeNull();
    });

    it('Should render empty indicator bar 3', async () => {
        indicator.type = () => 'rubish';
        const { queryByTestId } = render(<FHIndicatorMessageBar indicator={indicator} show={true} />);

        const indicatorBar = queryByTestId(/indicator-bar-/i);
        expect(indicatorBar).toBeNull();
    });
});

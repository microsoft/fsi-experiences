import React from 'react';
import { act, render } from '@testing-library/react';
import { LoanProgressOverviewBar } from './LoanProgressOverviewBar';

const mockProps = {
    inProgressValue: 40,
    completedValue: 60,
};

describe('LoanProgressOverviewBar', () => {
    it('should render two vertical lines', async () => {
        let component;

        await act(async () => {
            component = render(<LoanProgressOverviewBar {...mockProps} />);
        });

        const { getAllByTestId } = component;

        expect(getAllByTestId('vertical-line-component')).toHaveLength(2);
    });

    it('should render legeng item for completed', async () => {
        let component;

        await act(async () => {
            component = render(<LoanProgressOverviewBar {...mockProps} />);
        });

        const { getByTestId } = component;

        expect(getByTestId(`legend-category-color-Completed`)).toBeVisible();
    });

    it('should render legeng item for in progress', async () => {
        let component;

        await act(async () => {
            component = render(<LoanProgressOverviewBar {...mockProps} />);
        });

        const { getByTestId } = component;

        expect(getByTestId(`legend-category-color-In progress`)).toBeVisible();
    });
});

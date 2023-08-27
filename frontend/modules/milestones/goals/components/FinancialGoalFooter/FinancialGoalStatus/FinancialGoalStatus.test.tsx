import React from 'react';
import { render } from '@testing-library/react';
import FinancialGoalStatus from './FinancialGoalStatus';
import lifeEventStrings from '@fsi/core-components/dist/assets/strings/LifeEventBar/LifeEventBar.1033.json';
import { IFinancialGoal } from '../../../interfaces/FinancialGoal.interface';

const financialGoalMock: IFinancialGoal = {
    targetName: 'Purchased a Tesla',
    targetDate: new Date('2021-08-11'),
    targetValue: 55000,
    progressValue: 55000,
    isCompleted: false,
    id: '',
    lifeEventId: 'fc251559-f153-eb11-a812-0022481eaf0f',
};

describe('FinancialGoalStatus', () => {
    it('Should render FinancialGoalStatus completed correctly', async () => {
        const financialGoal = { ...financialGoalMock, isCompleted: true };
        const { getByText } = render(<FinancialGoalStatus financialGoal={financialGoal} />);

        expect(getByText(lifeEventStrings.COMPLETED)).toBeVisible();
    });

    it('Should render FinancialGoalStatus complete from sidepanel', async () => {
        const { getByText } = render(<FinancialGoalStatus financialGoal={financialGoalMock} isSidePanel />);

        expect(getByText(lifeEventStrings.GOAL)).toBeVisible();
    });

    it('Should render FinancialGoalStatus not completed correctly', async () => {
        const { getByText } = render(<FinancialGoalStatus financialGoal={financialGoalMock} />);

        expect(getByText(lifeEventStrings.REVIEW_DATE)).toBeVisible();
    });
});

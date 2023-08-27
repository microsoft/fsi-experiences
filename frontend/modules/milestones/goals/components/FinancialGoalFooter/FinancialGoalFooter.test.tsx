import React from 'react';
import { render } from '@testing-library/react';
import FinancialGoalFooter from './FinancialGoalFooter';

describe('FinancialGoalFooter of LifeEventCategory', () => {
    const testCategoryCode = 104800006;
    const testTypeCode = 104800015;

    const lastEventMock = {
        id: 'fc251559-f153-eb11-a812-0022481eaf0f',
        created_on: new Date('2021-01-11T09:42:51.000Z'),
        title: 'Purchased a Tesla',
        date: new Date('2021-01-10T22:00:00.000Z'),
        categoryCode: testCategoryCode,
        typeCode: testTypeCode,
        financialGoal: {
            targetName: 'Purchased a Tesla',
            targetDate: new Date('2023-08-11'),
            targetValue: 55000,
            progressValue: 55000,
            isCompleted: false,
            id: '',
            lifeEventId: 'fc251559-f153-eb11-a812-0022481eaf0f',
        },
    };

    it('Should render FinancialGoalFooter correctly', async () => {
        const { getByText } = render(<FinancialGoalFooter financialGoal={lastEventMock.financialGoal} />);

        expect(getByText('55,000')).toBeVisible();
    });

    it('Shouldnt render date of FinancialGoalFooter with invalid date', async () => {
        lastEventMock.financialGoal.targetDate = new Date('352352');

        const { getByText, queryByTestId } = render(<FinancialGoalFooter financialGoal={lastEventMock.financialGoal} />);

        expect(getByText('55,000')).toBeVisible();
        const date = queryByTestId('event-relative-time-financial-goal');
        expect(date).toBeNull();
    });

    it('Should show a goal that is completed', async () => {
        lastEventMock.financialGoal.isCompleted = true;
        const { getByTestId } = render(<FinancialGoalFooter financialGoal={lastEventMock.financialGoal} />);
        expect(getByTestId('completed-financial-goal')).toBeVisible();
    });
});

import React from 'react';
import { render } from '@testing-library/react';
import FinancialGoalSidePanel from './FinancialGoalSidePanel';
import { IFinancialGoal } from '../../interfaces/FinancialGoal.interface';
import lifeEventStrings from '@fsi/core-components/dist/assets/strings/LifeEventBar/LifeEventBar.1033.json';
import { addDays } from 'date-fns';
import { LifeEvent } from '../../../interfaces/LifeEvent';

describe('FinancialGoalSidePanel status', () => {
    const mockTranslateTime = 'within 5 months';

    const testFinancialGoal: IFinancialGoal = {
        lifeEventId: 'test-life-event',
        id: 'fc251559-f153-eb11-1108-0022481eaf0f',
        targetName: 'test financial goal',
        targetDate: new Date('1999-09-09'),
        targetValue: 1800,
        isCompleted: false,
    };

    const testEvent = {
        id: 'test-life-event',
        created_on: new Date('1985-01-11T09:42:51.000Z'),
        title: 'Purchased a Tesla',
        date: new Date('2021-01-10T22:00:00.000Z'),
        categoryCode: 104800005,
        typeCode: 104800015,
        financialGoal: testFinancialGoal,
    };

    const type = 'Purchase';

    it('Should render FinancialGoalSidePanel and show: goal- within X days', async () => {
        const newFinancialGoalTest: IFinancialGoal = { ...testFinancialGoal, targetDate: addDays(new Date(), 367) };
        const newEventTest: LifeEvent = { ...testEvent, financialGoal: newFinancialGoalTest };
        const { getByText } = render(
            <FinancialGoalSidePanel relativeDateString={mockTranslateTime} isExternal={true} type={type} lifeEvent={newEventTest} />
        );

        expect(getByText(lifeEventStrings.GOAL)).toBeVisible();
        expect(getByText(lifeEventStrings.RELATED_EVENT_OF_GOAL.replace('{{type}}', type))).toBeVisible();
        expect(getByText(lifeEventStrings.EXTERNAL_SOURCE)).toBeVisible();
    });

    it('Should render FinancialGoalSidePanel and show: complete- by date', async () => {
        const newFinancialGoalTest: IFinancialGoal = { ...testFinancialGoal, isCompleted: true };
        const newEventTest: LifeEvent = { ...testEvent, financialGoal: newFinancialGoalTest };
        const { getByText } = render(<FinancialGoalSidePanel relativeDateString={mockTranslateTime} isExternal={false} lifeEvent={newEventTest} />);

        expect(getByText(lifeEventStrings.COMPLETED)).toBeVisible();
    });
});

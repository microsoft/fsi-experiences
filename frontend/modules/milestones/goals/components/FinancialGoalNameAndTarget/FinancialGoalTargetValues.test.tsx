import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import { lifeEventsToCategories } from '../../../utilities/LifeEventsUtils';
import mockLifeEventsConf from '../../../interfaces/mocks/LifeEventsConfigurations.mock';
import mockLifeEvents from '../../../interfaces/mocks/LifeEvents.mock';
import { LifeEvent } from '../../../interfaces';
import { LifeEventContext, lifeEventContextInitialValue } from '../../../LifeEvent.context';
import lifeEventStrings from '@fsi/core-components/dist/assets/strings/LifeEventBar/LifeEventBar.1033.json';
import commonStrings from '@fsi/core-components/dist/assets/strings/common/common.1033.json';
import addDays from 'date-fns/addDays';
import { IFinancialGoal } from '../../interfaces/FinancialGoal.interface';
import FinancialGoalNameAndTarget from './FinancialGoalTargetValues';
import { IStateFinancialGoal } from '../../../hooks/useEventForm';
import { goalValueLimit } from '../../../constants/EditEventDialog.consts';

describe('FinancialGoalTargetValues', () => {
    const onChangeFinancialGoalName = jest.fn();
    const onChangeFinancialGoalTargetAmount = jest.fn();

    const categories = lifeEventsToCategories(mockLifeEvents, mockLifeEventsConf);

    const testCategoryCode = 104800006;
    const testTypeCode = 104800015;

    const testLifeEvent: Partial<LifeEvent> = {
        categoryCode: testCategoryCode,
        id: 'test-id',
        title: 'test-title',
        typeCode: testTypeCode,
        date: addDays(new Date(), 365),
    };

    const testFinancialGoal: IFinancialGoal = {
        lifeEventId: 'test-id',
        id: '4c0ab1e4-5534-eb11-a812-000d3a5ba768',
        targetName: 'buy child tesla',
        targetDate: new Date('2040-08-11T18:00:00.000Z'),
        targetValue: 130000,
        isCompleted: false,
    };

    const demoStateFinancialGoals: IStateFinancialGoal = {
        financialGoalNameInfo: testFinancialGoal.targetName,
        financialGoalTargetValue: testFinancialGoal.targetValue.toString(),
        financialGoalTargetDate: testFinancialGoal.targetDate,
        financialGoalProgressInfo: testFinancialGoal.progressValue,
        financialGoalCompleted: testFinancialGoal.isCompleted,
    };

    const valuesToRender = (lifeEvent: Partial<LifeEvent>, stateFinancialGoals: IStateFinancialGoal) => {
        const lifeEventWithFinancialGoal: Partial<LifeEvent> = { ...lifeEvent, financialGoal: testFinancialGoal };
        const fetchLifeEventById = jest.fn().mockResolvedValue(lifeEventWithFinancialGoal);

        const getContextValue = () => {
            return {
                ...lifeEventContextInitialValue,
                configuration: mockLifeEventsConf,
                fetchLifeEventById,
                categoriesCollection: categories,
            };
        };

        return render(
            <LifeEventContext.Provider value={getContextValue()}>
                <FinancialGoalNameAndTarget
                    onChangeFinancialGoalName={onChangeFinancialGoalName}
                    onChangeFinancialGoalTargetAmount={onChangeFinancialGoalTargetAmount}
                    stateFinancialGoals={stateFinancialGoals}
                />
            </LifeEventContext.Provider>
        );
    };

    beforeEach(() => {
        onChangeFinancialGoalName.mockClear();
        onChangeFinancialGoalTargetAmount.mockClear();
    });

    it('Should change name to invalid input', async () => {
        const invalidName = 'not buy child tesla not buy child tesla not buy child tesla ';
        const invalidStateFinancialGoals = { ...demoStateFinancialGoals, financialGoalNameInfo: invalidName };
        const { getByPlaceholderText, getByRole } = valuesToRender(testLifeEvent, invalidStateFinancialGoals);

        fireEvent.change(getByPlaceholderText(lifeEventStrings.FINANCIAL_GOAL_NAME_EXAMPLE), {
            target: { value: invalidName },
        });

        expect(getByRole('alert')).toBeVisible();
    });

    it('Should change target name', async () => {
        const { getByPlaceholderText } = valuesToRender(testLifeEvent, demoStateFinancialGoals);

        fireEvent.change(getByPlaceholderText(lifeEventStrings.FINANCIAL_GOAL_NAME_EXAMPLE), { target: { value: 'not buy child tesla' } });
        expect(onChangeFinancialGoalName).toBeCalled();

        fireEvent.change(getByPlaceholderText(commonStrings.AMOUNT_IN.replace('{{code}}', 'USD')), { target: { value: 130001 } });
        expect(onChangeFinancialGoalTargetAmount).toBeCalled();
    });

    it('Should change target value to negative value', async () => {
        const negativeValue = '-9';
        const invalidStateFinancialGoals = { ...demoStateFinancialGoals, financialGoalTargetValue: negativeValue };

        const { getByPlaceholderText, getByRole } = valuesToRender(testLifeEvent, invalidStateFinancialGoals);

        fireEvent.change(getByPlaceholderText(commonStrings.AMOUNT_IN.replace('{{code}}', 'USD')), {
            target: { value: negativeValue },
        });

        expect(getByRole('alert')).toBeVisible();
    });

    it(`Should change target value to greater than max limit - ${goalValueLimit}`, async () => {
        const negativeValue = (goalValueLimit + 2).toString();
        const invalidStateFinancialGoals = { ...demoStateFinancialGoals, financialGoalTargetValue: negativeValue };

        const { getByPlaceholderText, getByRole } = valuesToRender(testLifeEvent, invalidStateFinancialGoals);

        fireEvent.change(getByPlaceholderText(commonStrings.AMOUNT_IN.replace('{{code}}', 'USD')), {
            target: { value: negativeValue },
        });

        expect(getByRole('alert')).toBeVisible();
    });
});

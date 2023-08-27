import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { LifeEventContext, lifeEventContextInitialValue } from '../../../LifeEvent.context';
import { FinancialGoalContext, financialGoalContextInitialValue } from '../../FinancialGoal.context';
import lifeEventsConfigurations from '../../../interfaces/mocks/LifeEventsConfigurations.mock';
import lifeEventStrings from '@fsi/core-components/dist/assets/strings/LifeEventBar/LifeEventBar.1033.json';
import commonStrings from '@fsi/core-components/dist/assets/strings/common/common.1033.json';
import { addDays } from '@fluentui/react';
import { IFinancialGoal } from '../../interfaces/FinancialGoal.interface';
import { LifeEvent } from '../../../interfaces/LifeEvent';
import FGoalElementInSidePanel from './FGoalElementInSidePanel';

describe('FGoalElementInSidePanel', () => {
    const todayDate = new Date('2021-07-27T21:00:00.000Z');
    beforeAll(() => {
        jest.useFakeTimers('modern');
        jest.setSystemTime(todayDate);
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    const setOpenSidePanelCategory = jest.fn();
    const onDelete = jest.fn();
    const setEditDialogConfig = jest.fn();
    const editFinancialGoalCallback = jest.fn();
    const deleteFinancialGoalCallback = jest.fn();
    const editFunctionMock = jest.fn();

    const contextValue = {
        ...lifeEventContextInitialValue,
        deleteLifeEventCallback: onDelete,
        setOpenSidePanelCategory,
        setEditDialogConfig,
        configuration: lifeEventsConfigurations,
    };

    const contextValueGoals = {
        ...financialGoalContextInitialValue,
        deleteLifeEventCallback: onDelete,
        setOpenSidePanelCategory,
        setEditDialogConfig,
        configuration: lifeEventsConfigurations,
        editFinancialGoalCallback,
        deleteFinancialGoalCallback,
    };

    const testCategoryCode = 104800005;
    const testTypeCode = 104800015;

    const testEvent = {
        id: 'fc251559-f153-eb11-a812-0022481eaf0f',
        created_on: new Date('1985-01-11T09:42:51.000Z'),
        title: 'Purchased a Tesla',
        date: new Date('2021-01-10T22:00:00.000Z'),
        categoryCode: testCategoryCode,
        typeCode: testTypeCode,
    };

    const testFinancialGoalEvent: IFinancialGoal = {
        lifeEventId: testEvent.id,
        id: 'fc251559-f153-eb11-1108-0022481eaf0f',
        targetName: 'test financial goal',
        targetDate: addDays(todayDate, 18),
        targetValue: 1800,
        isCompleted: false,
    };

    const testFinancialGoalEventCompleted: IFinancialGoal = {
        ...testFinancialGoalEvent,
        isCompleted: true,
    };

    const ACTION_BUTTON_TEST_ID = `financial-goals-action-button-${testFinancialGoalEvent.targetName}-${testFinancialGoalEvent.targetValue}`;

    const renderEventTestElementGoals = (eventToRender, readonly?, hideModifyButtons?) => {
        return render(
            <LifeEventContext.Provider value={contextValue}>
                <FinancialGoalContext.Provider value={contextValueGoals}>
                    <FGoalElementInSidePanel index={0} lifeEvent={eventToRender} readonly={readonly} hideModifyButtons={hideModifyButtons} />
                </FinancialGoalContext.Provider>
            </LifeEventContext.Provider>
        );
    };

    beforeEach(() => {
        onDelete.mockClear();
        setOpenSidePanelCategory.mockClear();
        setEditDialogConfig.mockClear();
        editFinancialGoalCallback.mockClear();
        deleteFinancialGoalCallback.mockClear();
    });

    it('Should mark financial goal as complete', async () => {
        const lifeEventToTest: LifeEvent = { ...testEvent, financialGoal: testFinancialGoalEvent };
        const { getByText, getByTestId } = renderEventTestElementGoals(lifeEventToTest);

        fireEvent.click(getByTestId(ACTION_BUTTON_TEST_ID));
        fireEvent.click(getByText(lifeEventStrings.MARK_GOAL_AS_COMPLETE));

        const updatedFinancialGoal: IFinancialGoal = { ...lifeEventToTest.financialGoal!, isCompleted: true };

        expect(editFinancialGoalCallback).toHaveBeenCalledWith(updatedFinancialGoal);
        // request to hide side panel
        expect(setOpenSidePanelCategory).toHaveBeenCalledWith(0);
    });

    it('Should mark financial goal as not complete', async () => {
        const lifeEventToTest: LifeEvent = { ...testEvent, financialGoal: testFinancialGoalEventCompleted };
        const { getByText, getByTestId } = renderEventTestElementGoals(lifeEventToTest);

        fireEvent.click(getByTestId(ACTION_BUTTON_TEST_ID));
        fireEvent.click(getByText(lifeEventStrings.CHANGE_GOAL_TO_INCOMPLETE));

        const updatedFinancialGoal: IFinancialGoal = { ...lifeEventToTest.financialGoal!, isCompleted: false };

        expect(editFinancialGoalCallback).toHaveBeenCalledWith(updatedFinancialGoal);
        // request to hide side panel
        expect(setOpenSidePanelCategory).toHaveBeenCalledWith(0);
    });

    it('Should show edit dialog of financial goal', async () => {
        contextValueGoals.setFinancialGoalsDialog = editFunctionMock;
        const lifeEventToTest: LifeEvent = { ...testEvent, financialGoal: testFinancialGoalEvent };
        const { getByText, getByTestId } = renderEventTestElementGoals(lifeEventToTest);

        fireEvent.click(getByTestId(ACTION_BUTTON_TEST_ID));
        fireEvent.click(getByText(commonStrings.EDIT));
        expect(editFunctionMock).toBeCalled();
    });

    it('Should show delete dialog of financial goal', async () => {
        const lifeEventToTest: LifeEvent = { ...testEvent, financialGoal: testFinancialGoalEvent };
        const { getByText, getByTestId } = renderEventTestElementGoals(lifeEventToTest);

        fireEvent.click(getByTestId(ACTION_BUTTON_TEST_ID));
        fireEvent.click(getByText(commonStrings.REMOVE));
        fireEvent.click(getByText(commonStrings.DELETE));
        await waitFor(() => expect(deleteFinancialGoalCallback).toHaveBeenCalledWith(testFinancialGoalEvent.id, lifeEventToTest.categoryCode));

        // request to hide side panel
        expect(setOpenSidePanelCategory).toHaveBeenCalledWith(0);
    });

    it('Should not show edit and delete buttons in disabled modify mode', async () => {
        const lifeEventToTest: LifeEvent = { ...testEvent, financialGoal: testFinancialGoalEvent };
        const { queryByTestId } = renderEventTestElementGoals(lifeEventToTest, undefined, true);

        expect(queryByTestId(ACTION_BUTTON_TEST_ID)).not.toBeInTheDocument();
    });
});

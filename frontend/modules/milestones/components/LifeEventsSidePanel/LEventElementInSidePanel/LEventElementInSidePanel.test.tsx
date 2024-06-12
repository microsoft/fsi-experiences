import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { LifeEventContext, lifeEventContextInitialValue } from '../../../LifeEvent.context';
import lifeEventsConfigurations from '../../../interfaces/mocks/LifeEventsConfigurations.mock';
import LEventElementInSidePanel from './LEventElementInSidePanel';
import lifeEventStrings from '@fsi/core-components/dist/assets/strings/LifeEventBar/LifeEventBar.1033.json';
import commonStrings from '@fsi/core-components/dist/assets/strings/common/common.1033.json';
import { addDays } from '@fluentui/react';
import { FinancialGoalContext, financialGoalContextInitialValue } from '../../../goals/FinancialGoal.context';
import { LifeEvent } from '../../../interfaces';

describe('LEventElementInSidePanel', () => {
    const todayDate = new Date('2021-07-27T21:00:00.000Z');
    beforeAll(() => {
        jest.useFakeTimers('modern');
        jest.setSystemTime(todayDate);
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    const setOpenSidePanelCategory = jest.fn();
    const setEditDialogConfig = jest.fn();
    const editFinancialGoalCallback = jest.fn();
    const deleteFinancialGoalCallback = jest.fn();
    const deleteLifeEventCallback = jest.fn();

    const contextValue = {
        ...lifeEventContextInitialValue,
        deleteLifeEventCallback,
        setOpenSidePanelCategory,
        setEditDialogConfig,
        configuration: lifeEventsConfigurations,
    };
    const contextValueGoals = {
        ...financialGoalContextInitialValue,
        deleteLifeEventCallback,
        setOpenSidePanelCategory,
        setEditDialogConfig,
        configuration: lifeEventsConfigurations,
        editFinancialGoalCallback,
        deleteFinancialGoalCallback,
    };

    const testCategoryCode = 104800006;
    const testTypeCode = 104800015;
    const testCategory = lifeEventsConfigurations.categoriesMap[testCategoryCode];
    const birthDayEvent = {
        id: 'e5268ba8-3153-eb11-a812-000d3a5ba768',
        created_on: new Date('2021-01-10T19:02:45.000Z'),
        title: '',
        date: todayDate,
        categoryCode: 104800000,
        typeCode: 104800000,
        isExternal: true,
    };

    // get test type display name
    const testTypeName = testCategory?.types.find(t => t.typeCode === testTypeCode)?.typeName || '';

    const testEvent = {
        id: 'fc251559-f153-eb11-a812-0022481eaf0f',
        created_on: new Date('1985-01-11T09:42:51.000Z'),
        title: 'Purchased a Tesla',
        date: new Date('2021-01-10T22:00:00.000Z'),
        categoryCode: testCategoryCode,
        typeCode: testTypeCode,
    };

    const testLifeEventWithGoalSameDate: LifeEvent = {
        ...testEvent,
        financialGoal: {
            lifeEventId: testEvent.id,
            id: 'fc251559-f153-eb11-1108-0022481eaf0f',
            targetName: 'test financial goal',
            targetDate: testEvent.date,
            targetValue: 1800,
            isCompleted: false,
        },
    };

    const ACTION_BUTTON_TEST_ID_LE = `life-events-action-button-${testTypeName}-false`;
    const ACTION_BUTTON_TEST_ID_EVENT = `life-events-action-button-${testTypeName}-true`;

    const renderEventTestElement = (eventToRender, readonly?, hideModifyButtons?) => {
        return render(
            <LifeEventContext.Provider value={contextValue}>
                <FinancialGoalContext.Provider value={contextValueGoals}>
                    <LEventElementInSidePanel index={0} lifeEvent={eventToRender} readonly={readonly} hideModifyButtons={hideModifyButtons} />
                </FinancialGoalContext.Provider>
            </LifeEventContext.Provider>
        );
    };

    beforeEach(() => {
        deleteLifeEventCallback.mockClear();
        deleteFinancialGoalCallback.mockClear();
        setOpenSidePanelCategory.mockClear();
        setEditDialogConfig.mockClear();
        editFinancialGoalCallback.mockClear();
    });

    it('Should render life event element correctly', async () => {
        const { getByText, getByTestId } = renderEventTestElement(testEvent);

        expect(getByText(testEvent.title)).toBeVisible();
        expect(getByText(testTypeName)).toBeVisible();
        expect(getByTestId(ACTION_BUTTON_TEST_ID_LE)).toBeVisible();
    });

    it('Should render life event birthday correctly of today', async () => {
        const { getByText } = renderEventTestElement(birthDayEvent);

        expect(getByText(lifeEventStrings.CONTACT_BIRTHDAY_TODAY)).toBeVisible();
    });

    it('Should render life event birthday correctly of tomorrow', async () => {
        const { getByText } = renderEventTestElement({ ...birthDayEvent, date: addDays(todayDate, 1) });

        expect(getByText(lifeEventStrings.CONTACT_BIRTHDAY_IS_TOMORROW.replace('{{days}}', '1'))).toBeVisible();
    });

    it('Should call edit event actions', async () => {
        const { getByText, getByTestId } = renderEventTestElement(testEvent);

        fireEvent.click(getByTestId(ACTION_BUTTON_TEST_ID_LE));
        fireEvent.click(getByText(commonStrings.EDIT));

        // get event without created_on property
        const { created_on, ...initialDialogValue } = testEvent;
        // request to show edit dialog
        expect(setEditDialogConfig).toHaveBeenCalledWith({ initialValue: initialDialogValue, enableEdit: true });
        // request to hide side panel
        expect(setOpenSidePanelCategory).toHaveBeenCalledWith(0);
    });

    it('Should be readonly', async () => {
        const { getByTestId } = renderEventTestElement(testEvent, true);

        expect(getByTestId(ACTION_BUTTON_TEST_ID_LE)).toBeDisabled();
    });

    it('Should show external indicator', async () => {
        const { getByText } = renderEventTestElement({
            ...testEvent,
            isExternal: true,
        });

        expect(getByText('External source')).toBeVisible();
    });

    it('Should show delete dialog and delete the event', async () => {
        const { getByText, getByTestId } = renderEventTestElement(testEvent);

        fireEvent.click(getByTestId(ACTION_BUTTON_TEST_ID_LE));
        fireEvent.click(getByText(commonStrings.REMOVE));

        // check delete dialog exists toBeVisible is no able to detect visibility of the dialog
        expect(getByText(lifeEventStrings.REMOVE_EVENT_TEXT)).toBeTruthy();
        fireEvent.click(getByText(commonStrings.DELETE));

        expect(deleteLifeEventCallback).toHaveBeenCalledWith(testEvent.id, testEvent.categoryCode);
    });

    it('Should show delete dialog and delete both event and its goal', async () => {
        const { getByText, getByTestId } = renderEventTestElement(testLifeEventWithGoalSameDate);

        fireEvent.click(getByTestId(ACTION_BUTTON_TEST_ID_EVENT));
        fireEvent.click(getByText(commonStrings.REMOVE));

        // check delete dialog exists toBeVisible is no able to detect visibility of the dialog
        expect(getByText(lifeEventStrings.REMOVE_EVENT_AND_GOAL_TITLE)).toBeTruthy();

        fireEvent.click(getByText(commonStrings.DELETE));

        await waitFor(() =>
            expect(deleteFinancialGoalCallback).toHaveBeenCalledWith(
                testLifeEventWithGoalSameDate.financialGoal!.id,
                testLifeEventWithGoalSameDate.categoryCode
            )
        );
        await waitFor(() => {
            expect(deleteLifeEventCallback).toHaveBeenCalledWith(testLifeEventWithGoalSameDate.id, testLifeEventWithGoalSameDate.categoryCode);
        });
    });

    it('Should not show edit and delete buttons in disabled modify mode', async () => {
        const { queryByTestId } = renderEventTestElement(testEvent, undefined, true);

        expect(queryByTestId(ACTION_BUTTON_TEST_ID_LE)).not.toBeInTheDocument();
    });
});

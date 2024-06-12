import React from 'react';
import { render } from '@testing-library/react';
import Content from './Content';
import { LifeEventContext, lifeEventContextInitialValue } from '../../LifeEvent.context';
import mockLifeEventsConf from '../../interfaces/mocks/LifeEventsConfigurations.mock';
import mockFinancialGoals from '../../goals/interfaces/mocks/FinancialGoal.mock';
import { lifeEventsToCategories } from '../../utilities/LifeEventsUtils';
import { LifeEventCategory } from '../../interfaces';
import cloneDeep from 'lodash/cloneDeep';
import set from 'lodash/set';
import lifeEventStrings from '@fsi/core-components/dist/assets/strings/LifeEventBar/LifeEventBar.1033.json';

describe('Content of LifeEventsSidePanel', () => {
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
    const fetchLifeEvents = jest.fn();
    const addNewEvent = jest.fn();
    const CAR_CATEGORY_CODE = 104800006;
    const BIRTHDAY_CATEGORY_CODE = 104800000;
    const EMPTY_CATEGORY_CODE = 104800007;
    const categories = lifeEventsToCategories(mockFinancialGoals, mockLifeEventsConf);

    const getContextValue = (code: number, currCategories: LifeEventCategory[]) => {
        return {
            ...lifeEventContextInitialValue,
            setOpenSidePanelCategory,
            setEditDialogConfig,
            fetchLifeEvents,
            openSidePanelCategory: code,
            configuration: mockLifeEventsConf,
            categoriesCollection: currCategories || categories,
        };
    };

    const renderContentTestElement = (code: number, currCategories?: LifeEventCategory[], readonly?, hideModifyButtons?) => {
        return render(
            <LifeEventContext.Provider value={getContextValue(code, currCategories || categories)}>
                <Content
                    categoriesCollection={currCategories || categories}
                    configuration={mockLifeEventsConf}
                    openSidePanelCategory={code}
                    hideModifyButtons={hideModifyButtons}
                    readonly={readonly}
                    addNewEvent={addNewEvent}
                />
            </LifeEventContext.Provider>
        );
    };

    beforeEach(() => {
        setOpenSidePanelCategory.mockClear();
        setEditDialogConfig.mockClear();
        fetchLifeEvents.mockClear();
        addNewEvent.mockClear();
    });

    it('Should render content correctly', async () => {
        const { getByText } = renderContentTestElement(CAR_CATEGORY_CODE);
        categories
            .find(category => category.categoryCode === CAR_CATEGORY_CODE)!
            .lifeEvents.forEach(lifeEvent => {
                expect(getByText(lifeEvent.title)).toBeInTheDocument();
            });
    });

    it('Should not render add event button', async () => {
        const { queryByText } = renderContentTestElement(CAR_CATEGORY_CODE, undefined, undefined, true);
        expect(queryByText(lifeEventStrings.ADD)).toBeNull();
    });

    it('Should show empty state for category with no events', async () => {
        const { getByTestId, getByText } = renderContentTestElement(EMPTY_CATEGORY_CODE);

        expect(getByTestId('empty-state')).toBeInTheDocument();
        expect(getByText(lifeEventStrings.LIFE_EVENT_EMPTY_STATE_SIDE_PANEL_TITLE)).toBeInTheDocument();
    });

    it('Should show empty state for category birthday', async () => {
        const currCategories = cloneDeep(categories);
        const birthdayCategory = currCategories.find(c => c.categoryCode === BIRTHDAY_CATEGORY_CODE);
        set(birthdayCategory as object, 'lifeEvents', []);
        const { getByTestId, getByText } = renderContentTestElement(BIRTHDAY_CATEGORY_CODE, currCategories);

        expect(getByTestId('empty-state')).toBeInTheDocument();
        expect(getByText(lifeEventStrings.LIFE_EVENT_EMPTY_STATE_BIRTHDAY_TITLE)).toBeInTheDocument();
    });

    it('Should call show one today date under past events and another past event with modified date', async () => {
        const { getByText } = renderContentTestElement(CAR_CATEGORY_CODE);

        expect(getByText(lifeEventStrings.PAST_EVENTS_AND_GOALS_TITLE)).toBeInTheDocument();
    });

    it('Should call show one today date under future events', async () => {
        const { getByText } = renderContentTestElement(CAR_CATEGORY_CODE);

        expect(getByText(lifeEventStrings.PLANNED_EVENTS_AND_GOALS_TITLE)).toBeInTheDocument();
    });

    it('Should render empty state if didnt find category', async () => {
        const { getByText, getByTestId } = renderContentTestElement(1);

        expect(getByTestId('empty-state')).toBeInTheDocument();
        expect(getByText(lifeEventStrings.LIFE_EVENT_EMPTY_STATE_SIDE_PANEL_TITLE)).toBeInTheDocument();
    });

    it('Should render planned, past, expired events', async () => {
        const { getByText } = renderContentTestElement(CAR_CATEGORY_CODE);
        const plannedEvents = getByText(lifeEventStrings.PLANNED_EVENTS_AND_GOALS_TITLE);
        const pastEvents = getByText(lifeEventStrings.PAST_EVENTS_AND_GOALS_TITLE);
        const expiredEvents = getByText(lifeEventStrings.PAST_EVENTS_AND_GOALS_TITLE);
        expect(plannedEvents).toBeInTheDocument();
        expect(pastEvents).toBeInTheDocument();
        expect(expiredEvents).toBeInTheDocument();
    });

    it('Should not show grouping for birthday', async () => {
        const { getByTestId, getByText, queryByText } = renderContentTestElement(BIRTHDAY_CATEGORY_CODE);

        expect(queryByText(lifeEventStrings.PAST_EVENTS_AND_GOALS_TITLE)).toBeNull();
        expect(queryByText(lifeEventStrings.LIFE_EVENT_EMPTY_STATE_BIRTHDAY_TITLE)).toBeNull();

        expect(getByTestId('life-events-details-side-panel')).toBeVisible();
        expect(getByText('Birth date')).toBeVisible();
    });
});

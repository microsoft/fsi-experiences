import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import { LifeEventsDetailsSidePanel } from './LifeEventsSidePanel';
import { LifeEventContext, lifeEventContextInitialValue } from '../../LifeEvent.context';
import mockLifeEventsConf from '../../interfaces/mocks/LifeEventsConfigurations.mock';
import mockFinancialGoals from '../../goals/interfaces/mocks/FinancialGoal.mock';
import { ILifeEventConfigurations } from '../../interfaces/Configuration';
import { LifeEventCategory } from '../../interfaces/Category';
import cloneDeep from 'lodash/cloneDeep';
import set from 'lodash/set';
import { lifeEventsToCategories } from '../../utilities/LifeEventsUtils';
import lifeEventStrings from '@fsi/core-components/dist/assets/strings/LifeEventBar/LifeEventBar.1033.json';

describe('LifeEventsDetailsSidePanel', () => {
    const setOpenSidePanelCategory = jest.fn();
    const setEditDialogConfig = jest.fn();
    const fetchLifeEvents = jest.fn();

    const CAR_CATEGORY_CODE = 104800006;
    const BIRTHDAY_CATEGORY_CODE = 104800000;
    const EMPTY_CATEGORY_CODE = 104800004;

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

    const getTestCategory = (code: number) => mockLifeEventsConf.categoriesMap[code];

    const renderSidePanelTestElement = (code: number, currCategories: LifeEventCategory[] | undefined = undefined) => {
        return render(
            <LifeEventContext.Provider value={getContextValue(code, currCategories || categories)}>
                <LifeEventsDetailsSidePanel />
            </LifeEventContext.Provider>
        );
    };

    beforeEach(() => {
        setOpenSidePanelCategory.mockClear();
        setEditDialogConfig.mockClear();
        fetchLifeEvents.mockClear();
    });

    it('Should render side panel correctly', async () => {
        const { getByRole, getAllByTestId } = renderSidePanelTestElement(CAR_CATEGORY_CODE);

        const testCategory = getTestCategory(CAR_CATEGORY_CODE);
        // test panel header
        expect(getByRole('heading', { name: testCategory.name })).toBeInTheDocument();

        // test list size
        expect(getAllByTestId('life-events-side-panel-element').length).toEqual(mockFinancialGoals[CAR_CATEGORY_CODE].length);

        // test fetching new data on load
        expect(fetchLifeEvents).toHaveBeenCalled();
    });

    it('Should render side panel that includes all sections - [PLANNED, PAST]', async () => {
        const { getByText } = renderSidePanelTestElement(CAR_CATEGORY_CODE);

        const titles = [lifeEventStrings.PLANNED_EVENTS_AND_GOALS_TITLE, lifeEventStrings.PAST_EVENTS_AND_GOALS_TITLE];

        titles.map(title => {
            expect(getByText(title)).toBeInTheDocument();
        });
    });

    it('Should render side panel correctly and dismiss it', async () => {
        const { getByRole, getByTitle } = renderSidePanelTestElement(CAR_CATEGORY_CODE);

        const testCategory = getTestCategory(CAR_CATEGORY_CODE);
        // test panel header
        expect(getByRole('heading', { name: testCategory.name })).toBeInTheDocument();

        const closeButton = getByTitle('Close');
        expect(closeButton).toBeInTheDocument();

        await act(async () => {
            await fireEvent.click(closeButton);
        });

        expect(getByRole('heading', { name: testCategory.name })).toBeInTheDocument();
    });

    it('Should show empty state for category with no events', async () => {
        const { getByTestId, getByRole, getByText } = renderSidePanelTestElement(EMPTY_CATEGORY_CODE);

        const testCategory = getTestCategory(EMPTY_CATEGORY_CODE);
        // test panel header
        expect(getByRole('heading', { name: testCategory.name })).toBeInTheDocument();

        // test EmptyState comp exists
        expect(getByTestId('empty-state')).toBeInTheDocument();

        expect(getByText(lifeEventStrings.LIFE_EVENT_EMPTY_STATE_SIDE_PANEL_TITLE)).toBeInTheDocument();
    });

    it('Should show empty state for category with no configurations', async () => {
        const currContext = getContextValue(EMPTY_CATEGORY_CODE, categories);
        currContext.configuration = {} as ILifeEventConfigurations;
        const { queryByRole } = render(
            <LifeEventContext.Provider value={currContext}>
                <LifeEventsDetailsSidePanel />
            </LifeEventContext.Provider>
        );

        expect(queryByRole('heading')).toBeNull();
    });

    it('Should show empty state for category birthday', async () => {
        const currCategories = cloneDeep(categories);
        const birthdayCategory = currCategories.find(c => c.categoryCode === BIRTHDAY_CATEGORY_CODE);
        set(birthdayCategory as object, 'lifeEvents', []);
        const { getByTestId, getByRole, getByText } = renderSidePanelTestElement(BIRTHDAY_CATEGORY_CODE, currCategories);

        const testCategory = getTestCategory(BIRTHDAY_CATEGORY_CODE);
        // test panel header
        expect(getByRole('heading', { name: testCategory.name })).toBeInTheDocument();

        // test EmptyState comp exists
        expect(getByTestId('empty-state')).toBeInTheDocument();

        expect(getByText(lifeEventStrings.LIFE_EVENT_EMPTY_STATE_BIRTHDAY_TITLE)).toBeInTheDocument();
    });

    it('Should call new event actions', async () => {
        const { getByText } = renderSidePanelTestElement(CAR_CATEGORY_CODE);

        // click the add event button
        fireEvent.click(getByText(lifeEventStrings.ADD));

        // request to show edit dialog
        expect(setEditDialogConfig).toHaveBeenCalledWith({ initialValue: { categoryCode: CAR_CATEGORY_CODE } });
        // request to hide side panel
        expect(setOpenSidePanelCategory).toHaveBeenCalledWith(0);
    });
});

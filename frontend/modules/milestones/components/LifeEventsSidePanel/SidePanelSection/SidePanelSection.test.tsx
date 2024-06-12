import React from 'react';
import { render } from '@testing-library/react';
import SidePanelSection from './SidePanelSection';
import { LifeEventContext, lifeEventContextInitialValue } from '../../../LifeEvent.context';
import mockLifeEventsConf from '../../../interfaces/mocks/LifeEventsConfigurations.mock';
import mockFinancialGoal from '../../../goals/interfaces/mocks/FinancialGoal.mock';
import { lifeEventsToCategories } from '../../../utilities/LifeEventsUtils';
import { LifeEventCategory } from '../../../interfaces';
import { LifeEvent } from '../../../interfaces/LifeEvent';
import { EVENTS_TYPES } from '../../../constants/LifeEvent.consts';

describe('LifeEventsDetailsSidePanel', () => {
    const setOpenSidePanelCategory = jest.fn();
    const setEditDialogConfig = jest.fn();
    const fetchLifeEvents = jest.fn();

    const testCategoryCode = 104800006;
    const testTypeCode = 104800015;

    const testEvent: LifeEvent = {
        id: 'fc251559-f153-eb11-a812-0022481eaf0f',
        created_on: new Date('1985-01-11T09:42:51.000Z'),
        title: 'Purchased a Tesla',
        date: new Date('2021-01-10T22:00:00.000Z'),
        categoryCode: testCategoryCode,
        typeCode: testTypeCode,
    };

    const testEvent2: LifeEvent = {
        id: 'fc251559-f153-eb11-a812-0022481eaf2d',
        created_on: new Date('2007-11-03T12:43:12.000Z'),
        title: 'Purchased a mercedes',
        date: new Date('2007-11-03T12:43:12.000Z'),
        categoryCode: testCategoryCode,
        typeCode: testTypeCode,
        financialGoal: {
            targetName: 'test goal!!!',
            targetDate: new Date('2007-11-03T12:43:12.000Z'),
            targetValue: 55333200,
            progressValue: 22,
            lifeEventId: 'fc251559-f153-eb11-a812-0022481eaf2d',
            id: '7ce1e71c-1111-5381-a813-000d3a347bb9',
            isCompleted: true,
        },
    };

    const eventsTypes = [
        { event: testEvent, type: EVENTS_TYPES.LIFE_EVENT },
        { event: testEvent2, type: EVENTS_TYPES.FINANCIAL_GOAL },
    ];
    const CAR_CATEGORY_CODE = 104800006;

    const categories = lifeEventsToCategories(mockFinancialGoal, mockLifeEventsConf);

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

    const renderSidePanelTestElement = (code: number, currCategories?: LifeEventCategory[], isEmpty?) => {
        return render(
            <LifeEventContext.Provider value={getContextValue(code, currCategories || categories)}>
                <SidePanelSection title="Past" lifeEvents={isEmpty ? [] : eventsTypes} />
            </LifeEventContext.Provider>
        );
    };

    beforeEach(() => {
        setOpenSidePanelCategory.mockClear();
        setEditDialogConfig.mockClear();
        fetchLifeEvents.mockClear();
    });

    it('Should render side panel section correctly', async () => {
        const { getByText } = renderSidePanelTestElement(CAR_CATEGORY_CODE);

        expect(getByText('Past')).toBeInTheDocument();

        expect(getByText('Purchased a Tesla')).toBeInTheDocument();
    });

    it('Shouldnt render side panel section without life events correctly', async () => {
        const { queryByText } = renderSidePanelTestElement(CAR_CATEGORY_CODE, [], true);

        expect(queryByText('Past')).toBeNull();

        expect(queryByText('Purchase')).toBeNull();

        expect(queryByText('Purchased a Tesla')).toBeNull();
    });
});

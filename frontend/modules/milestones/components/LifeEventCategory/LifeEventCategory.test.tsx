import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import LifeEventCategory from './LifeEventCategory';
import { LifeEventContext, lifeEventContextInitialValue } from '../../LifeEvent.context';
import lifeEventsConfigurations from '../../interfaces/mocks/LifeEventsConfigurations.mock';
import lifeEventStrings from '@fsi/core-components/dist/assets/strings/LifeEventBar/LifeEventBar.1033.json';
import differenceInYears from 'date-fns/differenceInYears';
import addDays from 'date-fns/addDays';

describe('LifeEventCategory', () => {
    const todayDate = new Date('2021-07-27T21:00:00.000Z');
    beforeAll(() => {
        jest.useFakeTimers('modern');
        jest.setSystemTime(todayDate);
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    const onClick = jest.fn();

    const testCategoryCode = 104800006;
    const testTypeCode = 104800015;

    const testCategory = lifeEventsConfigurations.categoriesMap[testCategoryCode];

    const contextValue = {
        ...lifeEventContextInitialValue,
        configuration: lifeEventsConfigurations,
    };

    const pastSecondEvent = {
        id: 'fc251559-f153-eb11-a812-0022481eaf0f',
        created_on: todayDate,
        title: 'Purchased a Tesla',
        date: addDays(todayDate, -2),
        categoryCode: testCategoryCode,
        typeCode: testTypeCode,
    };

    const pastFirstEvent = {
        id: 'fc251559-f153-eb11-a812-0022481eaf0f',
        created_on: todayDate,
        title: 'Purchased a Tesla',
        date: addDays(todayDate, -1),
        categoryCode: testCategoryCode,
        typeCode: testTypeCode,
    };

    const todayEvent = {
        id: 'fc251559-f153-eb11-a812-0022481eaf0f',
        created_on: todayDate,
        title: 'Purchased a Tesla',
        date: todayDate,
        categoryCode: testCategoryCode,
        typeCode: testTypeCode,
    };

    const futureFirstEvent = {
        id: 'fc251559-f153-eb11-a812-0022481eaf0f',
        created_on: todayDate,
        title: 'Purchased a Tesla',
        date: addDays(todayDate, 1),
        categoryCode: testCategoryCode,
        typeCode: testTypeCode,
    };

    const futureSecondEvent = {
        id: 'fc251559-f153-eb11-a812-0022481eaf0f',
        created_on: todayDate,
        title: 'Purchased a Tesla',
        date: addDays(todayDate, 2),
        categoryCode: testCategoryCode,
        typeCode: testTypeCode,
    };

    const categoryWithContext = events => (
        <LifeEventContext.Provider value={contextValue}>
            <LifeEventCategory
                categoryName={testCategory.name}
                categoryCode={testCategoryCode}
                lifeEvents={events || []}
                displayOrder={1}
                onClick={onClick}
                icon={testCategory.icon}
            />
        </LifeEventContext.Provider>
    );

    it('Should render category correctly', async () => {
        const { getByText, rerender } = render(categoryWithContext([pastFirstEvent, futureSecondEvent]));

        expect(getByText(testCategory.name)).toBeVisible();

        expect(getByText('Purchase')).toBeVisible();

        expect(getByText(lifeEventStrings.EVENTS_PLURAL.replace('{{pluralCount}}', '2'))).toBeVisible();

        rerender(categoryWithContext([pastFirstEvent]));

        expect(getByText(lifeEventStrings.EVENTS.replace('{{pluralCount}}', '1'))).toBeVisible();
    });

    it('Should render closest future date which is tomorrow', async () => {
        const { getByText } = render(categoryWithContext([pastSecondEvent, pastFirstEvent, futureFirstEvent, futureSecondEvent]));

        expect(getByText(lifeEventStrings.LIFE_EVENT_PERIOD_FUTURE_DAY)).toBeVisible();
    });

    it('Should render today date', async () => {
        const { getByText } = render(categoryWithContext([pastSecondEvent, pastFirstEvent, todayEvent, futureFirstEvent, futureSecondEvent]));

        expect(getByText(lifeEventStrings.LIFE_EVENT_PERIOD_FUTURE_NONE)).toBeVisible();
    });

    it('Should render closest past date which is yesterday', async () => {
        const { getByText } = render(categoryWithContext([pastSecondEvent, pastFirstEvent]));

        expect(getByText(lifeEventStrings.LIFE_EVENT_PERIOD_DAY)).toBeVisible();
    });

    it('Should call click handle with the category code', async () => {
        const { getByTestId } = render(categoryWithContext([pastFirstEvent]));

        fireEvent.click(getByTestId(/life-event-category-wrapper-/i));

        expect(onClick).toHaveBeenCalledWith(testCategoryCode);
    });

    it('Should render empty category', async () => {
        const { getByText, getByTestId } = render(categoryWithContext(undefined));

        expect(getByText(testCategory.name)).toBeVisible();
        expect(getByTestId(/life-event-icon-button-/i)).toBeVisible();
    });

    it('Should render age category with date time', async () => {
        const event = {
            ...pastFirstEvent,
            date: new Date('1985-11-12'),
            categoryCode: 104800000,
        };
        const { getByText, getByTestId } = render(categoryWithContext([event]));

        expect(getByTestId('event-relative-time')).toBeVisible();
        expect(getByTestId('date-time-text')).toBeVisible();

        const years = differenceInYears(new Date(), event.date).toString();
        expect(getByText(lifeEventStrings.AGE_YEARS.replace('{{time}}', years))).toBeVisible();

        expect(getByText('Nov 12')).toBeVisible();
    });

    it('Should render category with invalid date event', async () => {
        const event = {
            ...pastFirstEvent,
            date: new Date('invalid date'),
        };
        const { queryByTestId } = render(categoryWithContext([event]));

        expect(queryByTestId('event-relative-time')).toBeNull();
        expect(queryByTestId('date-time-text')).toBeNull();
    });

    it('Should render category with empty date event', async () => {
        const event = {
            ...pastFirstEvent,
            date: undefined,
        };
        const { queryByTestId } = render(categoryWithContext([event]));

        expect(queryByTestId('event-relative-time')).toBeNull();
        expect(queryByTestId('date-time-text')).toBeNull();
    });
});

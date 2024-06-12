import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Footer from './Footer';
import lifeEventsConfigurations from '../../../interfaces/mocks/LifeEventsConfigurations.mock';
import lifeEventStrings from '@fsi/core-components/dist/assets/strings/LifeEventBar/LifeEventBar.1033.json';

const openAddEvent = jest.fn();

jest.mock('../../../hooks/useDialog', () => ({
    __esModule: true,
    default: () => ({ openAddEvent }),
}));

describe('Footer of LifeEventCategory', () => {
    const todayDate = new Date('2021-07-27T21:00:00.000Z');
    beforeAll(() => {
        jest.useFakeTimers('modern');
        jest.setSystemTime(todayDate);
    });

    afterAll(() => {
        jest.useRealTimers();
        jest.unmock('../../../hooks/useDialog');
    });

    const testCategoryCode = 104800006;
    const testTypeCode = 104800015;

    const lastEvent = {
        id: 'fc251559-f153-eb11-a812-0022481eaf0f',
        created_on: new Date('2021-01-11T09:42:51.000Z'),
        title: 'Purchased a Tesla',
        date: new Date('2021-01-10T22:00:00.000Z'),
        categoryCode: testCategoryCode,
        typeCode: testTypeCode,
    };

    const lastFutureEvent = {
        ...lastEvent,
        date: new Date('2030-01-10T22:00:00.000Z'),
    };

    const birthdayEvent = {
        id: 'e5268ba8-3153-eb11-a812-000d3a5ba768',
        created_on: new Date('2021-01-10T19:02:45.000Z'),
        title: '',
        date: new Date('1985-02-16T20:00:00.000Z'),
        categoryCode: 104800000,
        typeCode: 104800000,
        isExternal: true,
    };

    it('Should render footer correctly', async () => {
        const { getByText } = render(
            <Footer
                categoryCode={testCategoryCode}
                configuration={lifeEventsConfigurations}
                lastLifeEvent={lastEvent}
                isEmpty={false}
                isNew={false}
            />
        );

        expect(getByText('Purchase')).toBeVisible();
    });

    it('Should render footer of today', async () => {
        const todayLifeEvent = { ...lastEvent, date: new Date('2021-07-27T23:00:00.000Z') };
        const { getByText, queryByTestId } = render(
            <Footer
                categoryCode={testCategoryCode}
                configuration={lifeEventsConfigurations}
                lastLifeEvent={todayLifeEvent}
                isEmpty={false}
                isNew={false}
            />
        );

        expect(getByText('Purchase')).toBeVisible();
        expect(getByText(lifeEventStrings.LIFE_EVENT_PERIOD_NONE)).toBeVisible();
        expect(queryByTestId('future-indicator')).toBeNull();
    });

    it('Should render future event', async () => {
        const { getByText, getByTestId } = render(
            <Footer categoryCode={testCategoryCode} configuration={lifeEventsConfigurations} lastLifeEvent={lastFutureEvent} isEmpty={true} />
        );

        expect(getByText('Purchase')).toBeVisible();
        expect(getByTestId('event-relative-time')).toHaveTextContent(lifeEventStrings.LIFE_EVENT_PERIOD_FUTURE_YEARS.replace('{{time}}', '8'));
    });

    it('Should render footer correctly with new', async () => {
        const { getByText } = render(
            <Footer categoryCode={testCategoryCode} configuration={lifeEventsConfigurations} lastLifeEvent={lastEvent} isEmpty={false} isNew={true} />
        );

        expect(getByText('Purchase')).toBeVisible();
    });

    it('Should render footer with empty state', async () => {
        const { getByText } = render(
            <Footer categoryCode={testCategoryCode} configuration={lifeEventsConfigurations} lastLifeEvent={lastEvent} isEmpty={true} />
        );

        expect(getByText(lifeEventStrings.ADD_EVENT)).toBeVisible();
    });

    it('Should render footer age category', async () => {
        const { getByText } = render(
            <Footer categoryCode={birthdayEvent.categoryCode} configuration={lifeEventsConfigurations} lastLifeEvent={birthdayEvent} />
        );

        expect(getByText('Feb 16')).toBeVisible();
        expect(getByText('36 years old')).toBeVisible();
    });

    it('Should disable add event', async () => {
        const { getByText } = render(
            <Footer
                categoryCode={testCategoryCode}
                configuration={lifeEventsConfigurations}
                lastLifeEvent={lastEvent}
                isEmpty={true}
                readonly={true}
            />
        );

        const addEventButton = getByText(lifeEventStrings.ADD_EVENT);

        fireEvent.click(addEventButton);

        expect(openAddEvent).not.toBeCalled();
    });
    it('Should hide add event button', async () => {
        const { queryByText } = render(
            <Footer
                categoryCode={testCategoryCode}
                configuration={lifeEventsConfigurations}
                lastLifeEvent={lastEvent}
                isEmpty={true}
                hideModifyButtons={true}
            />
        );

        expect(queryByText(lifeEventStrings.ADD_EVENT)).toBeNull();
    });

    it('Should click add event', async () => {
        const { getByText } = render(
            <Footer categoryCode={testCategoryCode} configuration={lifeEventsConfigurations} lastLifeEvent={lastEvent} isEmpty={true} />
        );

        const addEventButton = getByText(lifeEventStrings.ADD_EVENT);

        fireEvent.click(addEventButton);

        expect(openAddEvent).toBeCalled();
    });

    it('Should render nothing with categoryCode that doesnt exist', async () => {
        const notExistCategorylastEvent = { ...lastEvent, categoryCode: 1, date: undefined };
        const { queryByTestId } = render(
            <Footer categoryCode={1} configuration={lifeEventsConfigurations} lastLifeEvent={notExistCategorylastEvent} />
        );

        const date = queryByTestId('event-relative-time');
        expect(date).toBeNull();
    });

    it('Should render nothing without lastLifeEvent', async () => {
        const { queryByTestId } = render(<Footer categoryCode={1} configuration={lifeEventsConfigurations} />);

        const date = queryByTestId('event-relative-time');
        expect(date).toBeNull();
    });

    it('Shouldnt render date with invalid date', async () => {
        const invalidDateLifeMomen = { ...lastEvent, date: new Date('352352') };

        const { getByText, queryByTestId } = render(
            <Footer
                categoryCode={testCategoryCode}
                configuration={lifeEventsConfigurations}
                lastLifeEvent={invalidDateLifeMomen}
                isEmpty={false}
                isNew={false}
            />
        );

        expect(getByText('Purchase')).toBeVisible();
        const date = queryByTestId('event-relative-time');
        expect(date).toBeNull();
    });
});

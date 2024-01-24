import { ILifeEventConfigurations, PeriodReference } from '../interfaces/Configuration';
import { LifeEvent, LifeEventByCategory, LifeEventCategory } from '../interfaces';
import differenceInMonths from 'date-fns/differenceInMonths';
import differenceInDays from 'date-fns/differenceInDays';
import differenceInWeeks from 'date-fns/differenceInWeeks';
import differenceInYears from 'date-fns/differenceInYears';
import { EVENTS_TYPES, FINANCIAL_GOAL_PERIOD_MAP, MAX_COMPACT_NUMBER } from '../constants/LifeEvent.consts';
import isAfter from 'date-fns/isAfter';
import isToday from 'date-fns/isToday';
import setYear from 'date-fns/setYear';
import { isDateValid, toDate } from '@fsi/core-components/dist/utilities';
import { TranslationFunction } from '@fsi/core-components/dist/context/localization/TranslationFunction';
import { IFinancialGoal } from '../goals/interfaces/FinancialGoal.interface';
import { useLocale } from '@fsi/core-components/dist/context/hooks/useLocale';
import { DateTimePredefinedFormat, quickFormatsOptions } from '@fsi/core-components/dist/components/atoms/DateTime/DateTime.interface';
import isSameDay from 'date-fns/isSameDay';
import isBefore from 'date-fns/isBefore';
import { IEventTypes } from '../interfaces/LifeEvents.interface';

export const periodToStringKey = (period: PeriodReference, isFuture: boolean) => {
    return `LIFE_EVENT_PERIOD_${isFuture ? 'FUTURE_' : ''}${PeriodReference[period]}`;
};

export const interpolatePeriodString = (periodString: string, time: number) => {
    return periodString.replace('{{time}}', `${time}`);
};

export function getPeriod(date: Date): { time: number; period: PeriodReference } {
    const now: Date = new Date(new Date().setHours(0, 0, 0, 0));
    const dateToCompare = new Date(new Date(date).setHours(0, 0, 0, 0));

    const days = Math.abs(differenceInDays(now, dateToCompare));
    const weeks = Math.abs(differenceInWeeks(now, dateToCompare));
    const months = Math.abs(differenceInMonths(now, dateToCompare));
    const years = Math.abs(differenceInYears(now, dateToCompare));

    // TODO check original (and refactor)
    if (days === 0) {
        return { time: 0, period: PeriodReference.NONE };
    } else if (days <= 1) {
        return { time: 1, period: PeriodReference.DAY };
    } else if (days < 7) {
        return { time: Math.round(days), period: PeriodReference.DAYS };
    } else if (weeks <= 1) {
        return { time: weeks, period: PeriodReference.WEEK };
    } else if (weeks <= 4 && months === 0) {
        return { time: weeks, period: PeriodReference.WEEKS };
    } else if (months <= 1) {
        return { time: months, period: PeriodReference.MONTH };
    } else if (months < 12) {
        return { time: months, period: PeriodReference.MONTHS };
    } else if (years <= 1) {
        return { time: years, period: PeriodReference.YEAR };
    } else {
        return { time: years, period: PeriodReference.YEARS };
    }
}

export function isNewIndication(lifeEvent: LifeEvent | undefined, configuration: ILifeEventConfigurations): boolean {
    if (!lifeEvent) return false;

    const now: Date = new Date();
    const timeDifferenceMs = now.getTime() - lifeEvent.created_on.getTime();
    const days = timeDifferenceMs / (1000 * 60 * 60 * 24);

    return days <= configuration.newIndicationDisplayInDays;
}

export function isFocusIndication(lifeEvent: LifeEvent | undefined, configuration: ILifeEventConfigurations): boolean {
    if (!lifeEvent || lifeEvent.categoryCode !== configuration.birthdayCategoryCode || !lifeEvent.date) return false;

    const now: Date = new Date();
    const timeDifferenceMs = Math.abs(now.getTime() - setYear(lifeEvent.date, now.getFullYear()).getTime());

    const daysDiff = timeDifferenceMs / (1000 * 60 * 60 * 24);

    return daysDiff <= configuration.focusIndicationDisplayInDays;
}

export function sortObjectByDateProperty<T>(arr: T[], propName: keyof T, order: 'ASC' | 'DESC'): T[] {
    if (!arr) return arr;
    arr.sort((a, b) => {
        const aTime = (a[propName] as unknown as Date)?.getTime() || 0;
        const bTime = (b[propName] as unknown as Date)?.getTime() || 0;
        if (aTime < bTime) return -1 * (order === 'ASC' ? 1 : -1);
        if (aTime > bTime) return 1 * (order === 'ASC' ? 1 : -1);
        return 0;
    });

    return arr;
}

export function sortObjectByProperty<T>(arr: T[], propName: keyof T, order: 'ASC' | 'DESC'): T[] {
    if (!arr) return arr;
    arr.sort((a, b) => {
        if (a[propName] < b[propName]) return -1 * (order === 'ASC' ? 1 : -1);
        if (a[propName] > b[propName]) return 1 * (order === 'ASC' ? 1 : -1);
        return 0;
    });

    return arr;
}

export function isCompactNumber(number: number): boolean {
    return number > MAX_COMPACT_NUMBER;
}

export const relativeGoalDateString = (financialGoal: IFinancialGoal, translateFunc: TranslationFunction) => {
    if (!financialGoal.targetDate || !isDateValid(financialGoal.targetDate)) {
        return;
    }

    const { period, time } = getPeriod(financialGoal.targetDate as Date);
    return interpolatePeriodString(translateFunc(FINANCIAL_GOAL_PERIOD_MAP[period]), time);
};

/** Returns searched Category or Error Message*/
export function findCategoryByCode(categories: LifeEventCategory[], categoryCode: number): LifeEventCategory | undefined {
    return categories.find(category => category.categoryCode === categoryCode);
}

export function lifeEventsToCategories(lifeEvents: LifeEventByCategory, configuration: ILifeEventConfigurations) {
    const categories: LifeEventCategory[] = [];
    configuration.categoryConfig.forEach(category => {
        let lifeEventsForCategory: LifeEvent[] = lifeEvents[category.categoryCode];
        if (!lifeEventsForCategory) lifeEventsForCategory = [];

        lifeEventsForCategory = sortObjectByDateProperty(lifeEventsForCategory, 'date', 'DESC');

        categories.push({
            categoryName: category.name,
            categoryCode: category.categoryCode,
            icon: category.icon,
            displayOrder: category.displayOrder,
            lifeEvents: lifeEventsForCategory,
        });
    });

    return sortObjectByProperty(categories, 'displayOrder', 'ASC');
}

export const orderEventsInSectionByTime = (eventsSection: IEventTypes[], order: 'ASC' | 'DESC') => {
    return eventsSection.sort((a, b) => {
        const aTime =
            a.type != EVENTS_TYPES.LIFE_EVENT
                ? (a.event.financialGoal?.targetDate as unknown as Date)?.getTime()
                : (a.event.date as unknown as Date)?.getTime() || 0;
        const bTime =
            b.type != EVENTS_TYPES.LIFE_EVENT
                ? (b.event.financialGoal?.targetDate as unknown as Date)?.getTime()
                : (b.event.date as unknown as Date)?.getTime() || 0;
        if (aTime < bTime) return -1 * (order === 'ASC' ? 1 : -1);
        if (aTime > bTime) return 1 * (order === 'ASC' ? 1 : -1);
        return 0;
    });
};

interface ILifeEventByTime {
    planned: IEventTypes[];
    past: IEventTypes[];
    actionNeeded: IEventTypes[];
}

export type EventSection = keyof ILifeEventByTime;
const initialLifeEventByCategory = { planned: [], past: [], actionNeeded: [] };

export const arrangeByDates = (lifeEvents: LifeEvent[], enableFinancialGoals?: boolean): ILifeEventByTime => {
    if (!lifeEvents) {
        return initialLifeEventByCategory;
    }

    const sortedByDate = sortObjectByDateProperty(lifeEvents || [], 'date', 'DESC');

    const sortedByCategory: ILifeEventByTime =
        sortedByDate?.reduce((prevValue: ILifeEventByTime, currValue: LifeEvent) => {
            if (currValue.date) {
                const goalExist = enableFinancialGoals && currValue.financialGoal;
                const goalSection = goalExist ? getGoalSection(currValue) : '';
                const lifeEventSection = getLifeEventSection(currValue, enableFinancialGoals);

                return reduceEvents(prevValue, currValue, lifeEventSection, goalSection);
            }

            return prevValue;
        }, initialLifeEventByCategory) || initialLifeEventByCategory;

    const eventsSortedByDate: ILifeEventByTime = {
        actionNeeded: orderEventsInSectionByTime(sortedByCategory.actionNeeded, 'DESC'),
        planned: orderEventsInSectionByTime(sortedByCategory.planned, 'DESC'),
        past: orderEventsInSectionByTime(sortedByCategory.past, 'DESC'),
    };
    return eventsSortedByDate;
};

const getLifeEventSection = (currValue: LifeEvent, enableFinancialGoals?: boolean): EventSection => {
    if (!isPastElement(currValue.date)) {
        return 'planned';
    }
    if (!currValue.financialGoal && isExpiredLifeEvent(currValue, enableFinancialGoals)) {
        return 'actionNeeded';
    }
    return 'past';
};

const getGoalSection = (currValue: LifeEvent): EventSection => {
    if (isActionNeededElement(currValue)) {
        return 'actionNeeded';
    }
    if (currValue.financialGoal && !isPastElement(currValue.financialGoal.targetDate) && !goalIsCompleted(currValue)) {
        return 'planned';
    }
    return 'past';
};

const reduceEvents = (prevValue: ILifeEventByTime, currValue: LifeEvent, lifeEventSection: string, goalSection?: string) => {
    if (!goalSection) {
        return {
            ...prevValue,
            [lifeEventSection]: [...prevValue[lifeEventSection], { event: currValue, type: EVENTS_TYPES.LIFE_EVENT }],
        };
    }
    if (goalSameDateAsEvent(currValue)) {
        return {
            ...prevValue,
            [goalSection]: [...prevValue[goalSection], { event: currValue, type: EVENTS_TYPES.EVENT }],
        };
    }
    if (lifeEventSection === goalSection) {
        return {
            ...prevValue,
            [goalSection]: [
                ...prevValue[goalSection],
                { event: currValue, type: EVENTS_TYPES.LIFE_EVENT },
                { event: currValue, type: EVENTS_TYPES.FINANCIAL_GOAL },
            ],
        };
    }
    return {
        ...prevValue,
        [goalSection]: [...prevValue[goalSection], { event: currValue, type: EVENTS_TYPES.FINANCIAL_GOAL }],
        [lifeEventSection]: [...prevValue[lifeEventSection], { event: currValue, type: EVENTS_TYPES.LIFE_EVENT }],
    };
};

export const filterLifeEvents = (lifeEventsByDate: IEventTypes[]) => {
    return lifeEventsByDate.filter(event => event.type !== EVENTS_TYPES.FINANCIAL_GOAL);
};

export const filterGoals = (lifeEventsByDate: IEventTypes[]) => {
    return lifeEventsByDate.filter(event => event.type !== EVENTS_TYPES.LIFE_EVENT);
};

export const isTodayElement = (date?: Date) => {
    return date && isToday(date);
};
export const isPlannedElement = (date?: Date) => {
    return date && isAfter(date, new Date());
};
export const isPastElement = (date?: Date) => {
    return date && !isTodayElement(date) && !isPlannedElement(date);
};

export const goalIsCompleted = (event: LifeEvent) => {
    return event.financialGoal && event.financialGoal?.isCompleted;
};

export const isActionNeededElement = (event: LifeEvent) => {
    return event.financialGoal && event.financialGoal.targetDate && isPastElement(event.financialGoal.targetDate) && !goalIsCompleted(event);
};

export const isExpiredLifeEvent = (event: LifeEvent, enableFinancialGoals?: boolean) => {
    return !enableFinancialGoals && event.date && isAfter(event.date.setHours(0, 0, 0, 0), event.modified_on || event.created_on);
};

export const goalSameDateAsEvent = (event: LifeEvent) => {
    return event.financialGoal && event.financialGoal?.targetDate && event.date && isSameDay(event.date, event.financialGoal.targetDate);
};

export const convertShortDateFormat = (date: Date) => {
    const locale = useLocale();
    const dateFormat = quickFormatsOptions[DateTimePredefinedFormat.DefaultDate];
    return toDate(date, dateFormat, locale);
};

export const isGoalBeforeLifeEventPlanned = (event: LifeEvent) => {
    const lifeEventDate = event.date;
    const goalDate = event.financialGoal?.targetDate;
    if (!lifeEventDate || !goalDate) {
        return false;
    }
    const goalIncomplete = (isPastElement(lifeEventDate) || isPastElement(goalDate)) && !goalIsCompleted(event);
    const pastGoal = goalIsCompleted(event) && isPastElement(lifeEventDate) && isAfter(goalDate, lifeEventDate);
    const plannedEvent = !isPastElement(lifeEventDate) && !isPastElement(goalDate) && !goalIsCompleted(event) && isBefore(goalDate, lifeEventDate);
    return goalSameDateAsEvent(event) || goalIncomplete || pastGoal || plannedEvent;
};
